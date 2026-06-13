const { login } = require('biar-fca');
const fs = require('fs');

const appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8'));
const ADMIN_ID = "61558103812205";

console.log('🔄 Starting Saad\'s World Cup Bot...');

login({ 
  appState: appState,
  listenEvents: true,
  selfListen: false,
  online: true,
  advancedProtection: true,
  autoRotateSession: true
}, (err, api) => {
  if (err) {
    console.error("Login failed:", err);
    return;
  }
  
  console.log('\n✅ SAAD\'S WORLD CUP 2026 BOT IS RUNNING!');
  console.log('👑 Admin ID set to:', ADMIN_ID);
  console.log('📱 Bot is listening for commands...\n');
  
  let users = {};
  let matchPredictions = {};
  let awardPredictions = {};
  let winnerPredictions = {};
  let matches = {};
  let awardedMatches = {}; // Track which matches have been awarded
  
  if (fs.existsSync('matches.json')) {
    matches = JSON.parse(fs.readFileSync('matches.json'));
    console.log(`📋 Loaded ${Object.keys(matches).length} matches`);
  }
  
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
  
  const teams = ["Argentina", "Brazil", "France", "Germany", "Spain", "England", "Netherlands", "Portugal", "Belgium", "Croatia", "Italy", "USA", "Mexico", "Japan", "South Korea", "Morocco", "Senegal", "Australia", "Canada", "Qatar", "Switzerland", "Paraguay", "Türkiye", "Uruguay", "Ecuador", "Sweden", "Tunisia", "Iran", "New Zealand", "Norway", "Algeria", "Austria", "Jordan", "Iraq", "Congo DR", "Ghana", "Panama", "Uzbekistan", "Colombia", "South Africa", "Czechia", "Bosnia", "Haiti", "Scotland", "Cabo Verde", "Egypt", "Saudi Arabia", "Ivory Coast"];
  
  function getPointsTable() {
    return Object.entries(users).map(([id, data]) => ({ 
      name: data.name || 'Unknown', 
      points: data.points || 0
    })).sort((a, b) => b.points - a.points);
  }
  
  function fetchAndUpdateUserName(api, userId, callback) {
    api.getUserInfo(userId, (err, ret) => {
      if (!err && ret && ret[userId] && ret[userId].name) {
        const realName = ret[userId].name;
        if (users[userId] && users[userId].name !== realName) {
          users[userId].name = realName;
          saveAll();
          console.log(`📝 Updated user name: ${realName}`);
          if (callback) callback(realName);
        }
      } else if (callback) callback(null);
    });
  }
  
  // FIXED: Only award points if match hasn't been awarded before
  function awardMatchPoints(matchId, actualResult, homeScore, awayScore) {
    // Check if already awarded
    if (awardedMatches[matchId]) {
      console.log(`⚠️ Match ${matchId} already awarded on ${awardedMatches[matchId]}. Skipping.`);
      return { count: 0, results: [], alreadyAwarded: true };
    }
    
    let awardedCount = 0;
    const results = [];
    
    console.log(`\n🔍 Awarding points for Match ${matchId}: ${actualResult} ${homeScore}-${awayScore}`);
    
    for (const [userId, predictions] of Object.entries(matchPredictions)) {
      if (predictions[matchId]) {
        let pointsEarned = 0;
        const pred = predictions[matchId];
        let reason = "";
        
        console.log(`  📝 ${users[userId]?.name || userId}: predicted ${pred.prediction} ${pred.homeScore || '?'}-${pred.awayScore || '?'}`);
        
        // Check result prediction
        if (pred.prediction === actualResult) {
          pointsEarned += 3;
          reason = `Correct result for match ${matchId}`;
          console.log(`    ✓ Correct result! +3 points`);
          
          // Check perfect score bonus (only if both scores were predicted)
          if (pred.homeScore !== null && pred.awayScore !== null && 
              pred.homeScore === homeScore && 
              pred.awayScore === awayScore) {
            pointsEarned += 5;
            reason = `Perfect score for match ${matchId}! +8 points total (3 result + 5 bonus)`;
            console.log(`    ✓ PERFECT SCORE! +5 bonus (total ${pointsEarned})`);
          }
        } else {
          console.log(`    ✗ Wrong result`);
        }
        
        if (pointsEarned > 0) {
          users[userId].points += pointsEarned;
          if (!users[userId].history) users[userId].history = [];
          users[userId].history.push({
            type: "match",
            matchId: matchId,
            points: pointsEarned,
            reason: reason,
            date: new Date().toISOString()
          });
          awardedCount++;
          const userName = users[userId].name || userId;
          results.push(`${userName}: +${pointsEarned} pts`);
          console.log(`    ✅ Awarded ${pointsEarned} points to ${userName}`);
        }
      }
    }
    
    // Mark this match as awarded
    awardedMatches[matchId] = new Date().toISOString();
    saveAll();
    
    console.log(`📊 Match ${matchId} complete: ${awardedCount} users received points\n`);
    return { count: awardedCount, results: results, alreadyAwarded: false };
  }
  
  function awardWinnerPoints(actualWinner) {
    let awardedCount = 0;
    const results = [];
    for (const [userId, predictedWinner] of Object.entries(winnerPredictions)) {
      if (predictedWinner.toLowerCase() === actualWinner.toLowerCase()) {
        users[userId].points += 20;
        awardedCount++;
        results.push(`${users[userId].name || userId}: +20 pts`);
      }
    }
    return { count: awardedCount, results: results };
  }
  
  function awardAwardPoints(awardType, actualWinner) {
    let awardedCount = 0;
    const results = [];
    for (const [userId, awards] of Object.entries(awardPredictions)) {
      if (awards[awardType] && awards[awardType].toLowerCase() === actualWinner.toLowerCase()) {
        users[userId].points += 5;
        awardedCount++;
        results.push(`${users[userId].name || userId}: +5 pts`);
      }
    }
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
        users[userId] = { name: userId, points: 0, history: [] };
        saveAll();
        fetchAndUpdateUserName(api, userId, null);
      }
      
      const command = msg.toLowerCase();
      
      if (command === '/start' || command === '/help') {
        api.sendMessage(`⚽ SAAD'S WORLD CUP 2026 BOT ⚽\n\nCOMMANDS:\n/myid - Get your User ID\n/winner [team] - Predict WC winner (20 pts)\n/points - View points table\n/mypoints - Your points\n/mypredictions - Your predictions\n/matches - See matches\n/top - Top 5 players\n/award [type] [name] - Predict awards (5 pts)\n/rules - Game rules\n\nADMIN:\n/result [id] [win/lose/draw] [score1] [score2]\n/winnerresult [team]\n/awardresult [type] [winner]\n/updatenames\n/status\n\nExample: /predict 1 win 2 1`, threadId);
      }
      
      else if (command === '/myid') {
        api.sendMessage(`🆔 Your Facebook User ID is: ${userId}`, threadId);
      }
      
      // FIXED ADMIN: Update match result (only awards once)
      else if (userId === ADMIN_ID && command.startsWith('/result ')) {
        const parts = command.replace('/result ', '').trim().split(' ');
        const matchId = parts[0];
        const result = parts[1];
        const homeScore = parseInt(parts[2]);
        const awayScore = parseInt(parts[3]);
        
        if (!matches[matchId]) {
          api.sendMessage(`❌ Invalid match ID!`, threadId);
          return;
        }
        
        // Check if already awarded
        if (awardedMatches[matchId]) {
          api.sendMessage(`⚠️ Match ${matchId} was already awarded on ${awardedMatches[matchId]}! Points cannot be awarded again.`, threadId);
          return;
        }
        
        matches[matchId].result = result;
        matches[matchId].homeScore = homeScore;
        matches[matchId].awayScore = awayScore;
        matches[matchId].status = "completed";
        saveAll();
        
        const award = awardMatchPoints(matchId, result, homeScore, awayScore);
        
        let reply = `✅ Match ${matchId}: ${matches[matchId].team1} ${homeScore} - ${awayScore} ${matches[matchId].team2}\n`;
        if (award.alreadyAwarded) {
          reply += `⚠️ This match was already awarded earlier!\n`;
        }
        reply += `🎯 ${award.count} users received points!\n\n`;
        if (award.results.length > 0) {
          reply += award.results.slice(0, 10).join('\n');
        }
        api.sendMessage(reply, threadId);
      }
      
      else if (userId === ADMIN_ID && command === '/status') {
        const completed = Object.values(matches).filter(m => m.status === 'completed').length;
        const awarded = Object.keys(awardedMatches).length;
        api.sendMessage(`📊 STATUS\n\nUsers: ${Object.keys(users).length}\nPredictions: ${Object.keys(matchPredictions).length}\nCompleted: ${completed}/${Object.keys(matches).length}\nAwarded: ${awarded} matches`, threadId);
      }
      
      // USER: Predict match
      else if (command.startsWith('/predict ')) {
        const parts = command.replace('/predict ', '').trim().split(' ');
        const matchId = parts[0];
        const result = parts[1];
        const homeScore = parts[2];
        const awayScore = parts[3];
        
        if (!matches[matchId]) {
          api.sendMessage(`❌ Invalid match! Use 1-104`, threadId);
        } else if (!['win', 'lose', 'draw'].includes(result)) {
          api.sendMessage(`❌ Result must be: win, lose, or draw`, threadId);
        } else if (matches[matchId].status === 'completed') {
          api.sendMessage(`❌ Match ${matchId} is already completed!`, threadId);
        } else {
          if (!matchPredictions[userId]) matchPredictions[userId] = {};
          matchPredictions[userId][matchId] = { 
            prediction: result,
            homeScore: homeScore ? parseInt(homeScore) : null,
            awayScore: awayScore ? parseInt(awayScore) : null
          };
          saveAll();
          
          const displayName = users[userId].name === userId ? 'You' : users[userId].name;
          let reply = `✅ ${displayName} predicted ${matches[matchId].team1} vs ${matches[matchId].team2}: ${result.toUpperCase()}`;
          if (homeScore && awayScore) {
            reply += ` (${homeScore}-${awayScore}) 🎯 +5 bonus if correct!`;
          }
          api.sendMessage(reply, threadId);
        }
      }
      
      // USER: Points table
      else if (command === '/points') {
        const table = getPointsTable();
        if (table.length === 0) {
          api.sendMessage("No points yet!", threadId);
        } else {
          let reply = "🏆 POINTS TABLE 🏆\n\n";
          table.slice(0, 20).forEach((u, i) => {
            let displayName = u.name;
            if (displayName && displayName.length > 15 && !isNaN(displayName)) {
              displayName = `User_${displayName.slice(-6)}`;
            }
            if (displayName.length > 20) displayName = displayName.substring(0, 18) + '..';
            reply += `${i+1}. ${displayName}: ${u.points} pts\n`;
          });
          api.sendMessage(reply, threadId);
        }
      }
      
      // USER: My points
      else if (command === '/mypoints') {
        api.sendMessage(`📊 You have ${users[userId].points} points!`, threadId);
      }
      
      // USER: My predictions
      else if (command === '/mypredictions') {
        let reply = `📝 YOUR PREDICTIONS\n\n`;
        if (matchPredictions[userId] && Object.keys(matchPredictions[userId]).length > 0) {
          Object.entries(matchPredictions[userId]).slice(0, 10).forEach(([id, data]) => {
            const match = matches[id];
            reply += `Match ${id}: ${match?.team1 || 'TBD'} vs ${match?.team2 || 'TBD'} -> ${data.prediction.toUpperCase()}`;
            if (data.homeScore) reply += ` (${data.homeScore}-${data.awayScore})`;
            reply += `\n`;
          });
        }
        if (winnerPredictions[userId]) reply += `\n🏆 Winner: ${winnerPredictions[userId]}\n`;
        api.sendMessage(reply, threadId);
      }
      
      // USER: Matches
      else if (command.startsWith('/matches')) {
        const parts = command.split(' ');
        let page = 1;
        if (parts.length > 1 && !isNaN(parseInt(parts[1]))) page = parseInt(parts[1]);
        
        const matchesPerPage = 15;
        const totalMatches = Object.keys(matches).length;
        const totalPages = Math.ceil(totalMatches / matchesPerPage);
        
        if (page < 1 || page > totalPages) {
          api.sendMessage(`❌ Page ${page} doesn't exist. Total pages: ${totalPages}`, threadId);
          return;
        }
        
        const startIndex = (page - 1) * matchesPerPage;
        const matchList = Object.entries(matches).slice(startIndex, startIndex + matchesPerPage);
        
        let reply = `📅 WORLD CUP 2026 MATCHES (Page ${page}/${totalPages})\n\n`;
        matchList.forEach(([id, m]) => {
          const icon = m.status === 'completed' ? '✅' : '⏳';
          reply += `${icon} Match ${id}: ${m.team1} vs ${m.team2}\n`;
          if (m.status === 'completed') reply += `   📊 Result: ${m.homeScore} - ${m.awayScore}\n`;
          reply += `\n`;
        });
        
        reply += `📌 Use /matches ${page + 1} for next page`;
        if (page > 1) reply += ` | /matches ${page - 1} for previous`;
        
        api.sendMessage(reply, threadId);
      }
      
      // USER: Top 5
      else if (command === '/top') {
        const top5 = getPointsTable().slice(0, 5);
        let reply = "🎮 TOP 5 PLAYERS 🎮\n\n";
        top5.forEach((u, i) => {
          const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "📌";
          reply += `${medal} ${u.name}: ${u.points} pts\n`;
        });
        api.sendMessage(reply, threadId);
      }
      
      // USER: Rules
      else if (command === '/rules') {
        api.sendMessage(`📖 RULES\n\nMatch: Correct result = 3 pts, Perfect score = +5 bonus (8 total)\nAwards: 5 pts each\nWorld Cup Winner: 20 pts`, threadId);
      }
      
      // USER: Predict winner
      else if (command.startsWith('/winner ')) {
        const team = command.replace('/winner ', '').trim();
        const properTeam = team.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        if (teams.includes(properTeam)) {
          winnerPredictions[userId] = properTeam;
          saveAll();
          api.sendMessage(`✅ You predicted ${properTeam} to win the World Cup! (20 pts) 🏆`, threadId);
        } else {
          api.sendMessage(`❌ Invalid team!`, threadId);
        }
      }
      
      // USER: Predict award
      else if (command.startsWith('/award ')) {
        const parts = command.replace('/award ', '').trim().split(' ');
        const award = parts[0];
        const prediction = parts.slice(1).join(' ');
        const valid = ["golden_boot", "golden_ball", "golden_gloves", "fair_play", "emerging_player"];
        if (valid.includes(award) && prediction) {
          if (!awardPredictions[userId]) awardPredictions[userId] = {};
          awardPredictions[userId][award] = prediction;
          saveAll();
          api.sendMessage(`✅ You predicted ${award.replace('_', ' ')}: ${prediction} (5 pts) ⭐`, threadId);
        }
      }
      
      // ADMIN: Update all names
      else if (userId === ADMIN_ID && command === '/updatenames') {
        api.sendMessage(`🔄 Fetching real names...`, threadId);
        const userIds = Object.keys(users);
        let updated = 0;
        let processed = 0;
        userIds.forEach(uid => {
          api.getUserInfo(uid, (err, ret) => {
            processed++;
            if (!err && ret && ret[uid] && ret[uid].name && users[uid].name !== ret[uid].name) {
              users[uid].name = ret[uid].name;
              updated++;
            }
            if (processed === userIds.length) {
              saveAll();
              api.sendMessage(`✅ Updated ${updated} user names!`, threadId);
            }
          });
        });
      }
    }
  });
});
      // ADMIN: Set/Adjust points for a user
      else if (userId === ADMIN_ID && command.startsWith('/setpoints ')) {
        const parts = command.replace('/setpoints ', '').trim().split(' ');
        const targetUserId = parts[0];
        const pointsChange = parseInt(parts[1]);
        
        if (!users[targetUserId]) {
          api.sendMessage(`❌ User ${targetUserId} not found`, threadId);
          return;
        }
        
        const oldPoints = users[targetUserId].points;
        users[targetUserId].points += pointsChange;
        saveAll();
        
        const action = pointsChange >= 0 ? `added +${pointsChange}` : `deducted ${pointsChange}`;
        api.sendMessage(`✅ ${action} points to/from ${users[targetUserId].name}\n📊 Old: ${oldPoints} → New: ${users[targetUserId].points}`, threadId);
        console.log(`🔧 Admin adjusted points for ${targetUserId}: ${pointsChange} points`);
      }
      
      // ADMIN: Reset a match to re-award (if needed)
      else if (userId === ADMIN_ID && command.startsWith('/resetaward ')) {
        const matchId = command.replace('/resetaward ', '').trim();
        
        if (awardedMatches[matchId]) {
          delete awardedMatches[matchId];
          saveAll();
          api.sendMessage(`✅ Reset award status for Match ${matchId}. You can now re-run /result for this match.`, threadId);
          console.log(`🔧 Admin reset award for match ${matchId}`);
        } else {
          api.sendMessage(`❌ Match ${matchId} hasn't been awarded yet.`, threadId);
        }
      }
