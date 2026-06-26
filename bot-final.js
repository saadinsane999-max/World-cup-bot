const groupCommands = require("./group-commands.js");
const groupCommands = require("./group-commands.js");
const { login } = require('biar-fca');
const fs = require('fs');
const axios = require('axios');
const { Innertube, UniversalCache } = require('youtubei.js');

const appState = [
    {
        "key": "dbln",
        "value": "%7B%2261584875078482%22%3A%22CkJu45aQ%22%2C%2261556644568192%22%3A%22US2tbwoW%22%2C%2261556823209358%22%3A%22udsXp6OK%22%2C%2261591124140307%22%3A%22JoyVQu5g%22%2C%2261591169738139%22%3A%220uIPsN35%22%2C%22100074347234893%22%3A%223bF6iQOu%22%7D",
        "domain": "facebook.com",
        "path": "/login/device-based/",
        "hostOnly": false,
        "creation": "2026-06-24T15:10:18.140Z",
        "lastAccessed": "2026-06-24T15:10:18.140Z"
    },
    {
        "key": "sb",
        "value": "4XMAaivHmstfzDZ2HHL4I3zd",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2026-06-24T15:10:18.140Z",
        "lastAccessed": "2026-06-24T15:10:18.140Z"
    },
    {
        "key": "ps_l",
        "value": "1",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2026-06-24T15:10:18.140Z",
        "lastAccessed": "2026-06-24T15:10:18.140Z"
    },
    {
        "key": "ps_n",
        "value": "1",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2026-06-24T15:10:18.140Z",
        "lastAccessed": "2026-06-24T15:10:18.140Z"
    },
    {
        "key": "vpd",
        "value": "v1%3B1003x503x1.436152458190918",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2026-06-24T15:10:18.140Z",
        "lastAccessed": "2026-06-24T15:10:18.140Z"
    },
    {
        "key": "datr",
        "value": "1xstakacfhlDwxs1hHdQ2MfA",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2026-06-24T15:10:18.140Z",
        "lastAccessed": "2026-06-24T15:10:18.140Z"
    },
    {
        "key": "pas",
        "value": "61584875078482%3A439zHIpMGF%2C61556823209358%3AjQwELwKb0B%2C61556962287705%3AaGgshBBcLn%2C61556644568192%3A2CFWiP01ed%2C61590581497167%3AyRHqSBoXEO%2C61591124140307%3AtWUl99wHLI%2C61591565780994%3AeJlnoWSCbI%2C100074347234893%3A7Wb3QZZZsg",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2026-06-24T15:10:18.140Z",
        "lastAccessed": "2026-06-24T15:10:18.140Z"
    },
    {
        "key": "m_pixel_ratio",
        "value": "1.436152458190918",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2026-06-24T15:10:18.140Z",
        "lastAccessed": "2026-06-24T15:10:18.140Z"
    },
    {
        "key": "wd",
        "value": "552x1225",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2026-06-24T15:10:18.140Z",
        "lastAccessed": "2026-06-24T15:10:18.140Z"
    },
    {
        "key": "c_user",
        "value": "61556823209358",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2026-06-24T15:10:18.140Z",
        "lastAccessed": "2026-06-24T15:10:18.140Z"
    },
    {
        "key": "xs",
        "value": "4%3ApgFSbwu5C_3NDQ%3A2%3A1782313795%3A-1%3A-1",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2026-06-24T15:10:18.140Z",
        "lastAccessed": "2026-06-24T15:10:18.140Z"
    },
    {
        "key": "fr",
        "value": "0LSpSWrESs2N6rhOh.AWeNSTrEJE0W5UXXLY2fTfSJRctYOcr0NC3m5b7a8Ng18Yi_EFE.BqAHPh..AAA.0.0.BqO_NF.AWckhnzk4UwFocVh-7dvn2NL3kU",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2026-06-24T15:10:18.141Z",
        "lastAccessed": "2026-06-24T15:10:18.141Z"
    },
    {
        "key": "locale",
        "value": "en_US",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2026-06-24T15:10:18.141Z",
        "lastAccessed": "2026-06-24T15:10:18.141Z"
    },
    {
        "key": "wl_cbv",
        "value": "v2%3Bclient_version%3A3197%3Btimestamp%3A1782313797",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2026-06-24T15:10:18.141Z",
        "lastAccessed": "2026-06-24T15:10:18.141Z"
    },
    {
        "key": "fbl_st",
        "value": "101232465%3BT%3A29705229",
        "domain": "facebook.com",
        "path": "/",
        "hostOnly": false,
        "creation": "2026-06-24T15:10:18.141Z",
        "lastAccessed": "2026-06-24T15:10:18.141Z"
    }
];

const ADMIN_ID = "61558103812205";

console.log('🔄 Starting Saad\'s World Cup Bot with Music...');

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
  let motmPredictions = {};
  let matches = {};
  let awardedMatches = {};
  let awardedMotm = {};
  
  if (fs.existsSync('matches.json')) matches = JSON.parse(fs.readFileSync('matches.json'));
  if (fs.existsSync('users.json')) users = JSON.parse(fs.readFileSync('users.json'));
  if (fs.existsSync('matchPredictions.json')) matchPredictions = JSON.parse(fs.readFileSync('matchPredictions.json'));
  if (fs.existsSync('awardPredictions.json')) awardPredictions = JSON.parse(fs.readFileSync('awardPredictions.json'));
  if (fs.existsSync('winnerPredictions.json')) winnerPredictions = JSON.parse(fs.readFileSync('winnerPredictions.json'));
  if (fs.existsSync('awardedMatches.json')) awardedMatches = JSON.parse(fs.readFileSync('awardedMatches.json'));
  if (fs.existsSync('motmPredictions.json')) motmPredictions = JSON.parse(fs.readFileSync('motmPredictions.json'));
  if (fs.existsSync('awardedMotm.json')) awardedMotm = JSON.parse(fs.readFileSync('awardedMotm.json'));
  
  function saveAll() {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    fs.writeFileSync('matchPredictions.json', JSON.stringify(matchPredictions, null, 2));
    fs.writeFileSync('awardPredictions.json', JSON.stringify(awardPredictions, null, 2));
    fs.writeFileSync('winnerPredictions.json', JSON.stringify(winnerPredictions, null, 2));
    fs.writeFileSync('matches.json', JSON.stringify(matches, null, 2));
    fs.writeFileSync('awardedMatches.json', JSON.stringify(awardedMatches, null, 2));
    fs.writeFileSync('motmPredictions.json', JSON.stringify(motmPredictions, null, 2));
    fs.writeFileSync('awardedMotm.json', JSON.stringify(awardedMotm, null, 2));
  }
  
  const teams = ["Argentina", "Brazil", "France", "Germany", "Spain", "England", "Netherlands", "Portugal", "Belgium", "Italy", "USA", "Mexico"];

  // ========== MUSIC FUNCTION ==========
  async function musicCommand(songTitle, threadId, api) {
    if (!songTitle) {
      api.sendMessage("🎵 Usage: /music [song title]\nExample: /music Shape of You", threadId);
      return;
    }
    api.sendMessage(`🔍 Searching for: ${songTitle}...`, threadId);
    try {
      const yt = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true });
      const search = await yt.music.search(songTitle, { type: 'video' });
      if (!search.results || !search.results[0]) {
        api.sendMessage("⚠️ Song not found!", threadId);
        return;
      }
      const stream = await yt.download(search.results[0].id, { type: 'audio', quality: 'best', format: 'mp4' });
      if (!fs.existsSync('./temp')) fs.mkdirSync('./temp');
      const filePath = `./temp/music_${Date.now()}.mp3`;
      const file = fs.createWriteStream(filePath);
      for await (const chunk of stream) {
        await new Promise((resolve, reject) => {
          file.write(chunk, (error) => error ? reject(error) : resolve());
        });
      }
      await new Promise(resolve => file.end(resolve));
      api.sendMessage({ body: `🎵 Here's your song: ${songTitle}`, attachment: fs.createReadStream(filePath) }, threadId);
      setTimeout(() => fs.unlink(filePath, () => {}), 3000);
    } catch (error) {
      api.sendMessage(`❌ Error: ${error.message || 'Could not fetch music'}`, threadId);
    }
  }
  // ========== END MUSIC FUNCTION ==========

  function awardMatchPoints(matchId, actualResult, homeScore, awayScore) {
    if (awardedMatches[matchId]) return { count: 0, alreadyAwarded: true };
    let awardedCount = 0;
    const results = [];
    for (const [userId, predictions] of Object.entries(matchPredictions)) {
      if (predictions[matchId]) {
        let points = 0;
        const pred = predictions[matchId];
        if (pred.prediction === actualResult) {
          points += 3;
          if (pred.homeScore !== null && pred.homeScore === homeScore && pred.awayScore === awayScore) points += 5;
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
  
  function awardMotmPoints(matchId, actualMotm) {
    if (awardedMotm[matchId]) return { count: 0, alreadyAwarded: true };
    let awardedCount = 0;
    const results = [];
    for (const [userId, prediction] of Object.entries(motmPredictions)) {
      if (prediction[matchId] && prediction[matchId].toLowerCase() === actualMotm.toLowerCase()) {
        users[userId].points += 3;
        awardedCount++;
        results.push(`${users[userId].name || userId}: +3 pts (MOTM)`);
      }
    }
    awardedMotm[matchId] = new Date().toISOString();
    saveAll();
    return { count: awardedCount, results: results };
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
      
      // MUSIC COMMAND
      if (cmd.startsWith('/music ')) {
        const songTitle = msg.replace('/music ', '').trim();
        musicCommand(songTitle, threadId, api);
        return;
      }
      
      else if (cmd === '/ping') {
        api.sendMessage('🏓 Pong! Bot is alive!', threadId);
      }
      
      else if (cmd === '/start' || cmd === '/help') {
        api.sendMessage(`⚽ WORLD CUP BOT 2026 ⚽

COMMANDS:
\n👑 GROUP MANAGEMENT:
/kick - Remove mentioned/replied user
/adduser [id/url] - Add user to group
/pfp - Get profile pic of mentioned/replied user
/tag [name] - Mention a user by name
\n👑 GROUP MANAGEMENT:
/kick - Remove mentioned/replied user
/adduser [id/url] - Add user to group
/pfp - Get profile pic of mentioned/replied user
/tag [name] - Mention a user by name
/antichange - Lock group settings (theme, pic, nicknames)
/ping - Check bot
/myid - Get your ID
/points - Points table
/mypoints - Your points
/mypredictions - Your predictions
/predict [id] [win/lose/draw] [score1] [score2]
/motm [match_id] [player_name]
/winner [team]
/award [type] [name]
/matches
/matches2-7 for more
/top
/rules

🎵 MUSIC: /music [song title]

ADMIN:
/result [id] [win/lose/draw] [score1] [score2]
/motmresult [match_id] [player_name]
/setpoints [user_id] [points]
/setname [user_id] [name]
/resetaward [match_id]
/resetmotm [match_id]
/status`, threadId);
      }
      
      else if (cmd === '/myid') {
        api.sendMessage(`🆔 Your ID: ${userId}`, threadId);
      }
      
      else if (cmd === '/points') {
        const table = Object.entries(users).map(([id, data]) => ({ name: data.name, points: data.points })).sort((a, b) => b.points - a.points);
        let reply = "🏆 POINTS TABLE 🏆\n\n";
        table.slice(0, 15).forEach((u, i) => reply += `${i+1}. ${u.name}: ${u.points} pts\n`);
        api.sendMessage(reply, threadId);
      }
      
      else if (cmd === '/mypoints') {
        api.sendMessage(`📊 You have ${users[userId].points} points!`, threadId);
      }
      
      else if (cmd === '/mypredictions') {
        let reply = "📝 YOUR PREDICTIONS\n\n";
        let has = false;
        if (matchPredictions[userId]) {
          Object.entries(matchPredictions[userId]).forEach(([id, data]) => {
            const match = matches[id];
            if (match) {
              reply += `⚽ Match ${id}: ${match.team1} vs ${match.team2}\n`;
              reply += `   → ${data.prediction.toUpperCase()}`;
              if (data.homeScore) reply += ` (${data.homeScore}-${data.awayScore})`;
              reply += `\n`;
              has = true;
            }
          });
        }
        if (motmPredictions[userId]) {
          Object.entries(motmPredictions[userId]).forEach(([id, player]) => {
            const match = matches[id];
            if (match) {
              reply += `⭐ Match ${id} MOTM: ${player}\n`;
              has = true;
            }
          });
        }
        if (winnerPredictions[userId]) {
          reply += `\n🏆 Winner: ${winnerPredictions[userId]}\n`;
          has = true;
        }
        if (awardPredictions[userId]) {
          Object.entries(awardPredictions[userId]).forEach(([award, pred]) => {
            reply += `\n⭐ ${award.replace('_', ' ')}: ${pred}\n`;
            has = true;
          });
        }
        if (!has) reply += "No predictions yet!";
        api.sendMessage(reply, threadId);
      }
      
      else if (cmd === '/matches') {
        let reply = "📅 WORLD CUP 2026 MATCHES (1-15)\n\n";
        let count = 0;
        for (const [id, m] of Object.entries(matches)) {
          if (count >= 15) break;
          const icon = m.status === 'completed' ? '✅' : '⏳';
          reply += `${icon} Match ${id}: ${m.team1} vs ${m.team2}\n`;
          reply += `   📍 ${m.stage || 'Group Stage'} | 📅 ${m.date || 'TBD'}\n`;
          if (m.status === 'completed') reply += `   📊 Result: ${m.homeScore} - ${m.awayScore}\n`;
          reply += `\n`;
          count++;
        }
        reply += `📌 Use /matches2 for next page`;
        api.sendMessage(reply, threadId);
      }
      
      else if (cmd === '/matches2') {
        let reply = "📅 WORLD CUP 2026 MATCHES (16-30)\n\n";
        const matchList = Object.entries(matches).slice(15, 30);
        for (const [id, m] of matchList) {
          const icon = m.status === 'completed' ? '✅' : '⏳';
          reply += `${icon} Match ${id}: ${m.team1} vs ${m.team2}\n`;
          reply += `   📍 ${m.stage || 'Group Stage'} | 📅 ${m.date || 'TBD'}\n`;
          if (m.status === 'completed') reply += `   📊 Result: ${m.homeScore} - ${m.awayScore}\n`;
          reply += `\n`;
        }
        api.sendMessage(reply, threadId);
      }
      
      else if (cmd === '/matches3') {
        let reply = "📅 WORLD CUP 2026 MATCHES (31-45)\n\n";
        const matchList = Object.entries(matches).slice(30, 45);
        for (const [id, m] of matchList) {
          const icon = m.status === 'completed' ? '✅' : '⏳';
          reply += `${icon} Match ${id}: ${m.team1} vs ${m.team2}\n`;
          reply += `   📍 ${m.stage || 'Group Stage'} | 📅 ${m.date || 'TBD'}\n`;
          if (m.status === 'completed') reply += `   📊 Result: ${m.homeScore} - ${m.awayScore}\n`;
          reply += `\n`;
        }
        api.sendMessage(reply, threadId);
      }
      
      else if (cmd === '/matches4') {
        let reply = "📅 WORLD CUP 2026 MATCHES (46-60)\n\n";
        const matchList = Object.entries(matches).slice(45, 60);
        for (const [id, m] of matchList) {
          const icon = m.status === 'completed' ? '✅' : '⏳';
          reply += `${icon} Match ${id}: ${m.team1} vs ${m.team2}\n`;
          reply += `   📍 ${m.stage || 'Group Stage'} | 📅 ${m.date || 'TBD'}\n`;
          if (m.status === 'completed') reply += `   📊 Result: ${m.homeScore} - ${m.awayScore}\n`;
          reply += `\n`;
        }
        api.sendMessage(reply, threadId);
      }
      
      else if (cmd === '/matches5') {
        let reply = "📅 WORLD CUP 2026 MATCHES (61-75)\n\n";
        const matchList = Object.entries(matches).slice(60, 75);
        for (const [id, m] of matchList) {
          const icon = m.status === 'completed' ? '✅' : '⏳';
          reply += `${icon} Match ${id}: ${m.team1} vs ${m.team2}\n`;
          reply += `   📍 ${m.stage || 'Group Stage'} | 📅 ${m.date || 'TBD'}\n`;
          if (m.status === 'completed') reply += `   📊 Result: ${m.homeScore} - ${m.awayScore}\n`;
          reply += `\n`;
        }
        api.sendMessage(reply, threadId);
      }
      
      else if (cmd === '/matches6') {
        let reply = "📅 WORLD CUP 2026 MATCHES (76-90)\n\n";
        const matchList = Object.entries(matches).slice(75, 90);
        for (const [id, m] of matchList) {
          const icon = m.status === 'completed' ? '✅' : '⏳';
          reply += `${icon} Match ${id}: ${m.team1} vs ${m.team2}\n`;
          reply += `   📍 ${m.stage || 'Group Stage'} | 📅 ${m.date || 'TBD'}\n`;
          if (m.status === 'completed') reply += `   📊 Result: ${m.homeScore} - ${m.awayScore}\n`;
          reply += `\n`;
        }
        api.sendMessage(reply, threadId);
      }
      
      else if (cmd === '/matches7') {
        let reply = "📅 WORLD CUP 2026 MATCHES (91-104)\n\n";
        const matchList = Object.entries(matches).slice(90, 104);
        for (const [id, m] of matchList) {
          const icon = m.status === 'completed' ? '✅' : '⏳';
          reply += `${icon} Match ${id}: ${m.team1} vs ${m.team2}\n`;
          reply += `   📍 ${m.stage || 'Group Stage'} | 📅 ${m.date || 'TBD'}\n`;
          if (m.status === 'completed') reply += `   📊 Result: ${m.homeScore} - ${m.awayScore}\n`;
          reply += `\n`;
        }
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

      // ========== GROUP MANAGEMENT COMMANDS ==========
      else if (cmd.startsWith('/kick')) {
        const input = cmd.replace('/kick', '').trim();
        groupCommands.kickUser(api, event, input, ADMIN_ID);
        return;
      }
      
      else if (cmd.startsWith('/adduser')) {
        const input = cmd.replace('/adduser', '').trim();
        groupCommands.addUser(api, event, input, ADMIN_ID);
        return;
      }
      
      else if (cmd === '/pfp') {
        groupCommands.pfpUser(api, event);
        return;
      }
      
      else if (cmd.startsWith('/tag')) {
        const name = cmd.replace('/tag', '').trim();
        groupCommands.tagUser(api, event, name);
        return;
      }
      // ========== END GROUP MANAGEMENT COMMANDS ==========
        api.sendMessage(`📖 RULES\n\nMatch: Correct result = 3 pts | Perfect score = +5 bonus (8 total)\nMOTM: Correct prediction = 3 pts\nAwards: 5 pts each\nWorld Cup Winner: 20 pts`, threadId);

      // ========== GROUP MANAGEMENT COMMANDS ==========
      else if (cmd.startsWith('/kick')) {
        const input = cmd.replace('/kick', '').trim();
        groupCommands.kickUser(api, event, input, ADMIN_ID);
        return;
      }
      
      else if (cmd.startsWith('/adduser')) {
        const input = cmd.replace('/adduser', '').trim();
        groupCommands.addUser(api, event, input, ADMIN_ID);
        return;
      }
      
      else if (cmd === '/pfp') {
        groupCommands.pfpUser(api, event);
        return;
      }
      
      else if (cmd.startsWith('/tag')) {
        const name = cmd.replace('/tag', '').trim();
        groupCommands.tagUser(api, event, name);
        return;
      }
      // ========== END GROUP MANAGEMENT COMMANDS ==========
      }

      // ========== GROUP MANAGEMENT COMMANDS ==========
      else if (cmd.startsWith('/kick')) {
        const input = cmd.replace('/kick', '').trim();
        groupCommands.kickUser(api, event, input, ADMIN_ID);
        return;
      }
      
      else if (cmd.startsWith('/adduser')) {
        const input = cmd.replace('/adduser', '').trim();
        groupCommands.addUser(api, event, input, ADMIN_ID);
        return;
      }
      
      else if (cmd === '/pfp') {
        groupCommands.pfpUser(api, event);
        return;
      }
      
      else if (cmd.startsWith('/tag')) {
        const name = cmd.replace('/tag', '').trim();
        groupCommands.tagUser(api, event, name);
        return;
      }
      // ========== END GROUP MANAGEMENT COMMANDS ==========
      
      else if (cmd.startsWith('/motm ')) {
        const parts = cmd.replace('/motm ', '').trim().split(' ');
        const matchId = parts[0];
        const playerName = parts.slice(1).join(' ');
        if (!matches[matchId]) {
          api.sendMessage("❌ Invalid match ID", threadId);
        } else if (matches[matchId].status === 'completed') {
          api.sendMessage(`❌ Match ${matchId} already completed!`, threadId);
        } else if (!playerName) {
          api.sendMessage(`❌ Example: /motm 1 Messi`, threadId);
        } else {
          if (!motmPredictions[userId]) motmPredictions[userId] = {};
          motmPredictions[userId][matchId] = playerName;
          saveAll();
          api.sendMessage(`✅ ${users[userId].name} predicted MOTM for Match ${matchId}: ${playerName}\n\n⭐ Possible points: 3 points`, threadId);
        }
      }
      
      else if (cmd.startsWith('/predict ')) {
        const parts = cmd.replace('/predict ', '').trim().split(' ');
        const matchId = parts[0];
        const result = parts[1];
        const homeScore = parts[2] ? parseInt(parts[2]) : null;
        const awayScore = parts[3] ? parseInt(parts[3]) : null;
        if (!matches[matchId]) {
          api.sendMessage("❌ Invalid match ID", threadId);
        } else if (!['win', 'lose', 'draw'].includes(result)) {
          api.sendMessage("❌ Result must be: win, lose, or draw", threadId);
        } else if (matches[matchId].status === 'completed') {
          api.sendMessage("❌ Match already completed!", threadId);
        } else {
          if (!matchPredictions[userId]) matchPredictions[userId] = {};
          matchPredictions[userId][matchId] = { prediction: result, homeScore, awayScore };
          saveAll();
          const match = matches[matchId];
          let text = result === 'win' ? match.team1 + " will win" : (result === 'lose' ? match.team2 + " will win" : "Draw");
          let reply = `✅ ${users[userId].name} predicted ${text}`;
          if (homeScore) reply += ` (${homeScore}-${awayScore})`;
          reply += `\n\n🎯 Possible points: 3 (or 8 if perfect)`;
          api.sendMessage(reply, threadId);
        }
      }
      
      else if (cmd.startsWith('/winner ')) {
        const team = cmd.replace('/winner ', '').trim();
        const properTeam = team.charAt(0).toUpperCase() + team.slice(1).toLowerCase();
        if (teams.includes(properTeam)) {
          winnerPredictions[userId] = properTeam;
          saveAll();
          api.sendMessage(`✅ ${users[userId].name} predicted ${properTeam} to win!\n🏆 20 points if correct`, threadId);
        } else {
          api.sendMessage("❌ Invalid team", threadId);
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
          api.sendMessage(`✅ ${users[userId].name} predicted ${award.replace('_', ' ')}: ${name}\n⭐ 5 points if correct`, threadId);
        } else {
          api.sendMessage("❌ Invalid award", threadId);
        }
      }
      
      // ADMIN COMMANDS
      else if (userId === ADMIN_ID) {
        if (cmd.startsWith('/result ')) {
          const parts = cmd.replace('/result ', '').trim().split(' ');
          const matchId = parts[0];
          const result = parts[1];
          const homeScore = parseInt(parts[2]);
          const awayScore = parseInt(parts[3]);
          if (!matches[matchId]) {
            api.sendMessage("❌ Invalid match", threadId);
          } else if (awardedMatches[matchId]) {
            api.sendMessage(`⚠️ Match already awarded! Use /resetaward ${matchId} first.`, threadId);
          } else {
            matches[matchId].result = result;
            matches[matchId].homeScore = homeScore;
            matches[matchId].awayScore = awayScore;
            matches[matchId].status = "completed";
            const award = awardMatchPoints(matchId, result, homeScore, awayScore);
            saveAll();
            api.sendMessage(`✅ Match ${matchId}: ${homeScore}-${awayScore}\n🎯 ${award.count} users received points!`, threadId);
          }
        }
        else if (cmd.startsWith('/motmresult ')) {
          const parts = cmd.replace('/motmresult ', '').trim().split(' ');
          const matchId = parts[0];
          const playerName = parts.slice(1).join(' ');
          if (!matches[matchId]) {
            api.sendMessage("❌ Invalid match ID", threadId);
          } else if (!playerName) {
            api.sendMessage(`❌ Example: /motmresult 1 Messi`, threadId);
          } else {
            const award = awardMotmPoints(matchId, playerName);
            saveAll();
            api.sendMessage(`✅ Match ${matchId} MOTM: ${playerName}\n⭐ ${award.count} users received 3 points!`, threadId);
          }
        }
        else if (cmd.startsWith('/setpoints ')) {
          const parts = cmd.replace('/setpoints ', '').trim().split(' ');
          const targetUserId = parts[0];
          const newPoints = parseInt(parts[1]);
          if (!users[targetUserId]) {
            api.sendMessage(`❌ User ${targetUserId} not found`, threadId);
          } else {
            const oldPoints = users[targetUserId].points;
            users[targetUserId].points = newPoints;
            saveAll();
            api.sendMessage(`✅ Set points for ${users[targetUserId].name} from ${oldPoints} to ${newPoints} points`, threadId);
          }
        }
        else if (cmd.startsWith('/setname ')) {
          const parts = cmd.replace('/setname ', '').trim().split(' ');
          const targetUserId = parts[0];
          const newName = parts.slice(1).join(' ');
          if (!users[targetUserId]) {
            api.sendMessage(`❌ User ${targetUserId} not found`, threadId);
          } else {
            const oldName = users[targetUserId].name;
            users[targetUserId].name = newName;
            saveAll();
            api.sendMessage(`✅ Set name for ${targetUserId} from ${oldName} to ${newName}`, threadId);
          }
        }
        else if (cmd.startsWith('/resetaward ')) {
          const matchId = cmd.replace('/resetaward ', '').trim();
          if (!awardedMatches[matchId]) {
            api.sendMessage(`⚠️ Match ${matchId} hasn't been awarded yet!`, threadId);
          } else {
            delete awardedMatches[matchId];
            if (matches[matchId]) {
              matches[matchId].status = "upcoming";
              matches[matchId].result = null;
              matches[matchId].homeScore = null;
              matches[matchId].awayScore = null;
            }
            saveAll();
            api.sendMessage(`✅ Reset award for Match ${matchId}. You can now re-run /result.`, threadId);
          }
        }
        else if (cmd.startsWith('/resetmotm ')) {
          const matchId = cmd.replace('/resetmotm ', '').trim();
          if (!awardedMotm[matchId]) {
            api.sendMessage(`⚠️ Match ${matchId} MOTM hasn't been awarded yet!`, threadId);
          } else {
            delete awardedMotm[matchId];
            saveAll();
            api.sendMessage(`✅ Reset MOTM award for Match ${matchId}.`, threadId);
          }
        }
        else if (cmd === '/status') {
          const completed = Object.values(matches).filter(m => m.status === 'completed').length;
          api.sendMessage(`📊 STATUS\nUsers: ${Object.keys(users).length}\nMatch Predictions: ${Object.keys(matchPredictions).length}\nMOTM Predictions: ${Object.keys(motmPredictions).length}\nCompleted: ${completed}/${Object.keys(matches).length}\nAwarded Matches: ${Object.keys(awardedMatches).length}\nAwarded MOTM: ${Object.keys(awardedMotm).length}`, threadId);
        }
      }
    }
  });
});
      
      // ADMIN COMMANDS
      else if (userId === ADMIN_ID) {
        if (cmd.startsWith('/result ')) {
          const parts = cmd.replace('/result ', '').trim().split(' ');
          const matchId = parts[0];
          const result = parts[1];
          const homeScore = parseInt(parts[2]);
          const awayScore = parseInt(parts[3]);
          if (!matches[matchId]) {
            api.sendMessage("❌ Invalid match", threadId);
          } else if (awardedMatches[matchId]) {
            api.sendMessage(`⚠️ Match already awarded! Use /resetaward ${matchId} first.`, threadId);
          } else {
            matches[matchId].result = result;
            matches[matchId].homeScore = homeScore;
            matches[matchId].awayScore = awayScore;
            matches[matchId].status = "completed";
            const award = awardMatchPoints(matchId, result, homeScore, awayScore);
            saveAll();
            api.sendMessage(`✅ Match ${matchId}: ${homeScore}-${awayScore}\n🎯 ${award.count} users received points!`, threadId);
          }
        }
        else if (cmd.startsWith('/motmresult ')) {
          const parts = cmd.replace('/motmresult ', '').trim().split(' ');
          const matchId = parts[0];
          const playerName = parts.slice(1).join(' ');
          if (!matches[matchId]) {
            api.sendMessage("❌ Invalid match ID", threadId);
          } else if (!playerName) {
            api.sendMessage(`❌ Example: /motmresult 1 Messi`, threadId);
          } else {
            const award = awardMotmPoints(matchId, playerName);
            saveAll();
            api.sendMessage(`✅ Match ${matchId} MOTM: ${playerName}\n⭐ ${award.count} users received 3 points!`, threadId);
          }
        }
        else if (cmd.startsWith('/setpoints ')) {
          const parts = cmd.replace('/setpoints ', '').trim().split(' ');
          const targetUserId = parts[0];
          const newPoints = parseInt(parts[1]);
          if (!users[targetUserId]) {
            api.sendMessage(`❌ User ${targetUserId} not found`, threadId);
          } else {
            const oldPoints = users[targetUserId].points;
            users[targetUserId].points = newPoints;
            saveAll();
            api.sendMessage(`✅ Set points for ${users[targetUserId].name} from ${oldPoints} to ${newPoints} points`, threadId);
          }
        }
        else if (cmd.startsWith('/setname ')) {
          const parts = cmd.replace('/setname ', '').trim().split(' ');
          const targetUserId = parts[0];
          const newName = parts.slice(1).join(' ');
          if (!users[targetUserId]) {
            api.sendMessage(`❌ User ${targetUserId} not found`, threadId);
          } else {
            const oldName = users[targetUserId].name;
            users[targetUserId].name = newName;
            saveAll();
            api.sendMessage(`✅ Set name for ${targetUserId} from ${oldName} to ${newName}`, threadId);
          }
        }
        else if (cmd.startsWith('/resetaward ')) {
          const matchId = cmd.replace('/resetaward ', '').trim();
          if (!awardedMatches[matchId]) {
            api.sendMessage(`⚠️ Match ${matchId} hasn't been awarded yet!`, threadId);
          } else {
            delete awardedMatches[matchId];
            if (matches[matchId]) {
              matches[matchId].status = "upcoming";
              matches[matchId].result = null;
              matches[matchId].homeScore = null;
              matches[matchId].awayScore = null;
            }
            saveAll();
            api.sendMessage(`✅ Reset award for Match ${matchId}. You can now re-run /result.`, threadId);
          }
        }
        else if (cmd.startsWith('/resetmotm ')) {
          const matchId = cmd.replace('/resetmotm ', '').trim();
          if (!awardedMotm[matchId]) {
            api.sendMessage(`⚠️ Match ${matchId} MOTM hasn't been awarded yet!`, threadId);
          } else {
            delete awardedMotm[matchId];
            saveAll();
            api.sendMessage(`✅ Reset MOTM award for Match ${matchId}.`, threadId);
          }
        }
        else if (cmd === '/status') {
          const completed = Object.values(matches).filter(m => m.status === 'completed').length;
          api.sendMessage(`📊 STATUS\nUsers: ${Object.keys(users).length}\nMatch Predictions: ${Object.keys(matchPredictions).length}\nMOTM Predictions: ${Object.keys(motmPredictions).length}\nCompleted: ${completed}/${Object.keys(matches).length}\nAwarded Matches: ${Object.keys(awardedMatches).length}\nAwarded MOTM: ${Object.keys(awardedMotm).length}`, threadId);
        }
      }
    }
  });
});

// Import group commands
const { kickUser, addUser, getPfp, tagUser, toggleAntiChange, antiChangeEnabled } = require('./group-commands.js');

// Add these inside your message handler (after the music command, before /ping)

      // ========== GROUP MANAGEMENT COMMANDS ==========
      
      // KICK - Remove a user
      else if (cmd.startsWith('/kick')) {
        const input = cmd.replace('/kick', '').trim();
        kickUser(api, event, input);
        return;
      }
      
      // ADDUSER - Add a user
      else if (cmd.startsWith('/adduser')) {
        const input = cmd.replace('/adduser', '').trim();
        addUser(api, event, input);
        return;
      }
      
      // PFP - Get profile picture
      else if (cmd === '/pfp') {
        getPfp(api, event);
        return;
      }
      
      // TAG - Mention a user
      else if (cmd.startsWith('/tag')) {
        const name = cmd.replace('/tag', '').trim();
        tagUser(api, event, name);
        return;
      }
      
      // ANTICHANGE - Toggle anti-change mode
      else if (cmd === '/antichange') {
        toggleAntiChange(api, event);
        return;
      }
