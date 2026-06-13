const { login } = require('biar-fca');
const fs = require('fs');

const appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8'));
const ADMIN_ID = "61558103812205";

console.log('🔄 Starting Saad\'s World Cup Bot...');

login({ 
  appState: appState,
  listenEvents: true,
  selfListen: false,
  online: true
}, (err, api) => {
  if (err) {
    console.error("Login failed:", err);
    return;
  }
  
  console.log('\n✅ BOT IS RUNNING!');
  console.log('👑 Admin ID:', ADMIN_ID);
  console.log('📱 Bot is listening...\n');
  
  let users = {};
  let matchPredictions = {};
  let awardPredictions = {};
  let winnerPredictions = {};
  let matches = {};
  let awardedMatches = {};
  
  if (fs.existsSync('matches.json')) matches = JSON.parse(fs.readFileSync('matches.json'));
  if (fs.existsSync('users.json')) users = JSON.parse(fs.readFileSync('users.json'));
  if (fs.existsSync('matchPredictions.json')) matchPredictions = JSON.parse(fs.readFileSync('matchPredictions.json'));
  if (fs.existsSync('awardPredictions.json')) awardPredictions = JSON.parse(fs.readFileSync('awardPredictions.json'));
  if (fs.existsSync('winnerPredictions.json')) winnerPredictions = JSON.parse(fs.readFileSync('winnerPredictions.json'));
  if (fs.existsSync('awardedMatches.json')) awardedMatches = JSON.parse(fs.readFileSync('awardedMatches.json'));
  
  function saveAll() {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    fs.writeFileSync('matchPredictions.json', JSON.stringify(matchPredictions, null, 2));
    fs.writeFileSync('awardPredictions.json', JSON.stringify(awardPredictions, null, 2));
    fs.writeFileSync('winnerPredictions.json', JSON.stringify(winnerPredictions, null, 2));
    fs.writeFileSync('matches.json', JSON.stringify(matches, null, 2));
    fs.writeFileSync('awardedMatches.json', JSON.stringify(awardedMatches, null, 2));
  }
  
  const teams = ["Argentina", "Brazil", "France", "Germany", "Spain", "England", "Netherlands", "Portugal", "Belgium", "Italy", "USA", "Mexico"];
  
  function awardMatchPoints(matchId, actualResult, homeScore, awayScore) {
    if (awardedMatches[matchId]) {
      return { count: 0, alreadyAwarded: true };
    }
    
    let awardedCount = 0;
    const results = [];
    
    for (const [userId, predictions] of Object.entries(matchPredictions)) {
      if (predictions[matchId]) {
        let points = 0;
        const pred = predictions[matchId];
        
        if (pred.prediction === actualResult) {
          points += 3;
          if (pred.homeScore !== null && pred.homeScore === homeScore && pred.awayScore === awayScore) {
            points += 5;
          }
        }
        
        if (points > 0) {
          users[userId].points += points;
          awardedCount++;
          results.push(`${users[userId].name || userId}: +${points}`);
        }
      }
    }
    
    awardedMatches[matchId] = new Date().toISOString();
    saveAll();
    return { count: awardedCount, results: results };
  }
  
  api.listenMqtt((err, event) => {
    if (err) return;
    
    if (event.type === 'message') {
      const msg = event.body.trim();
      const userId = event.senderID;
      const threadId = event.threadID;
      
      console.log(`💬 ${userId}: ${msg}`);
      
      if (!users[userId]) {
        users[userId] = { name: userId, points: 0 };
        saveAll();
        api.getUserInfo(userId, (err, ret) => {
          if (!err && ret && ret[userId]) {
            users[userId].name = ret[userId].name;
            saveAll();
          }
        });
      }
      
      const cmd = msg.toLowerCase();
      
      // TEST COMMAND - Always works
      if (cmd === '/ping') {
        api.sendMessage('🏓 Pong! Bot is alive!', threadId);
        console.log('✅ Ping response sent');
      }
      
      else if (cmd === '/start' || cmd === '/help') {
        api.sendMessage(`⚽ WORLD CUP BOT 2026 ⚽\n\nCOMMANDS:\n/ping - Check if bot is alive\n/myid - Get your ID\n/points - Points table\n/mypoints - Your points\n/predict [id] [win/lose/draw] [score1] [score2]\n/winner [team]\n/award [type] [name]\n/matches\n/top\n/rules\n\nADMIN:\n/result [id] [win/lose/draw] [score1] [score2]\n/status`, threadId);
        console.log('✅ Help sent');
      }
      
      else if (cmd === '/myid') {
        api.sendMessage(`🆔 Your ID: ${userId}`, threadId);
      }
      
      else if (cmd === '/points') {
        const table = Object.entries(users).map(([id, data]) => ({ name: data.name, points: data.points })).sort((a, b) => b.points - a.points);
        let reply = "🏆 POINTS TABLE 🏆\n\n";
        table.slice(0, 15).forEach((u, i) => {
          reply += `${i+1}. ${u.name}: ${u.points} pts\n`;
        });
        api.sendMessage(reply, threadId);
      }
      
      else if (cmd === '/mypoints') {
        api.sendMessage(`📊 You have ${users[userId].points} points!`, threadId);
      }
      
      else if (cmd === '/matches') {
        let reply = "📅 MATCHES (First 20)\n\n";
        Object.entries(matches).slice(0, 20).forEach(([id, m]) => {
          const icon = m.status === 'completed' ? '✅' : '⏳';
          reply += `${icon} Match ${id}: ${m.team1} vs ${m.team2}\n`;
        });
        api.sendMessage(reply, threadId);
      }
      
      else if (cmd === '/top') {
        const top5 = Object.entries(users).map(([id, data]) => ({ name: data.name, points: data.points })).sort((a, b) => b.points - a.points).slice(0, 5);
        let reply = "🎮 TOP 5 🎮\n\n";
        top5.forEach((u, i) => {
          const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "📌";
          reply += `${medal} ${u.name}: ${u.points} pts\n`;
        });
        api.sendMessage(reply, threadId);
      }
      
      else if (cmd === '/rules') {
        api.sendMessage(`📖 RULES\n\nMatch: Correct result = 3 pts\nPerfect score = +5 bonus (8 total)\nAwards: 5 pts each\nWorld Cup Winner: 20 pts`, threadId);
      }
      
      else if (cmd.startsWith('/predict ')) {
        const parts = cmd.replace('/predict ', '').trim().split(' ');
        const matchId = parts[0];
        const result = parts[1];
        const homeScore = parts[2] ? parseInt(parts[2]) : null;
        const awayScore = parts[3] ? parseInt(parts[3]) : null;
        
        if (!matches[matchId]) {
          api.sendMessage(`❌ Invalid match ID`, threadId);
        } else if (!['win', 'lose', 'draw'].includes(result)) {
          api.sendMessage(`❌ Result must be: win, lose, draw`, threadId);
        } else if (matches[matchId].status === 'completed') {
          api.sendMessage(`❌ Match ${matchId} already completed!`, threadId);
        } else {
          if (!matchPredictions[userId]) matchPredictions[userId] = {};
          matchPredictions[userId][matchId] = { prediction: result, homeScore: homeScore, awayScore: awayScore };
          saveAll();
          let reply = `✅ Predicted Match ${matchId}: ${result.toUpperCase()}`;
          if (homeScore !== null) reply += ` (${homeScore}-${awayScore}) 🎯`;
          api.sendMessage(reply, threadId);
        }
      }
      
      else if (cmd.startsWith('/winner ')) {
        const team = cmd.replace('/winner ', '').trim();
        const properTeam = team.charAt(0).toUpperCase() + team.slice(1).toLowerCase();
        if (teams.includes(properTeam)) {
          winnerPredictions[userId] = properTeam;
          saveAll();
          api.sendMessage(`✅ Predicted ${properTeam} to win the World Cup! (20 pts) 🏆`, threadId);
        } else {
          api.sendMessage(`❌ Invalid team`, threadId);
        }
      }
      
      else if (cmd.startsWith('/award ')) {
        const parts = cmd.replace('/award ', '').trim().split(' ');
        const award = parts[0];
        const name = parts.slice(1).join(' ');
        const valid = ["golden_boot", "golden_ball", "golden_gloves", "fair_play", "emerging_player"];
        if (valid.includes(award) && name) {
          if (!awardPredictions[userId]) awardPredictions[userId] = {};
          awardPredictions[userId][award] = name;
          saveAll();
          api.sendMessage(`✅ Predicted ${award}: ${name} (5 pts) ⭐`, threadId);
        } else {
          api.sendMessage(`❌ Invalid award. Use: golden_boot, golden_ball, golden_gloves, fair_play, emerging_player`, threadId);
        }
      }
      
      // ADMIN COMMANDS
      else if (userId === ADMIN_ID && cmd.startsWith('/result ')) {
        const parts = cmd.replace('/result ', '').trim().split(' ');
        const matchId = parts[0];
        const result = parts[1];
        const homeScore = parseInt(parts[2]);
        const awayScore = parseInt(parts[3]);
        
        if (!matches[matchId]) {
          api.sendMessage(`❌ Invalid match`, threadId);
          return;
        }
        
        if (awardedMatches[matchId]) {
          api.sendMessage(`⚠️ Match ${matchId} already awarded!`, threadId);
          return;
        }
        
        matches[matchId].result = result;
        matches[matchId].homeScore = homeScore;
        matches[matchId].awayScore = awayScore;
        matches[matchId].status = "completed";
        
        const award = awardMatchPoints(matchId, result, homeScore, awayScore);
        saveAll();
        
        api.sendMessage(`✅ Match ${matchId}: ${homeScore}-${awayScore}\n🎯 ${award.count} users received points!`, threadId);
      }
      
      else if (userId === ADMIN_ID && cmd === '/status') {
        api.sendMessage(`📊 STATUS\nUsers: ${Object.keys(users).length}\nPredictions: ${Object.keys(matchPredictions).length}\nAwarded: ${Object.keys(awardedMatches).length} matches`, threadId);
      }
    }
  });
});
