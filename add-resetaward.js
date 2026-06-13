const fs = require('fs');
let code = fs.readFileSync('bot-final.js', 'utf8');

// Find where to add the resetaward command (after setpoints)
const setpointsEnd = `      // ADMIN: Set points for a user
      else if (userId === ADMIN_ID && cmd.startsWith('/setpoints ')) {
        const parts = cmd.replace('/setpoints ', '').trim().split(' ');
        const targetUserId = parts[0];
        const newPoints = parseInt(parts[1]);
        
        if (!users[targetUserId]) {
          api.sendMessage(` + '"`' + `❌ User ${targetUserId} not found` + '"`' + `, threadId);
          return;
        }
        
        const oldPoints = users[targetUserId].points;
        users[targetUserId].points = newPoints;
        saveAll();
        
        api.sendMessage(` + '"`' + `✅ Set points for ${users[targetUserId].name} from ${oldPoints} to ${newPoints} points` + '"`' + `, threadId);
      }`;

const resetawardCmd = `
      // ADMIN: Reset awarded match (to allow re-awarding points)
      else if (userId === ADMIN_ID && cmd.startsWith('/resetaward ')) {
        const matchId = cmd.replace('/resetaward ', '').trim();
        
        if (!awardedMatches[matchId]) {
          api.sendMessage(` + '"`' + `⚠️ Match ${matchId} hasn't been awarded yet!` + '"`' + `, threadId);
          return;
        }
        
        delete awardedMatches[matchId];
        
        // Also reset match status if needed
        if (matches[matchId]) {
          matches[matchId].status = "upcoming";
          matches[matchId].result = null;
          matches[matchId].homeScore = null;
          matches[matchId].awayScore = null;
        }
        
        saveAll();
        api.sendMessage(` + '"`' + `✅ Reset award for Match ${matchId}. You can now re-run /result for this match.` + '"`' + `, threadId);
        console.log(` + '"`' + `🔧 Admin reset match ${matchId}` + '"`' + `);
      }`;

// Insert after setpoints
code = code.replace(setpointsEnd, setpointsEnd + resetawardCmd);

// Also update help command to show resetaward
code = code.replace(/\/setpoints \[user_id\] \[new_points\]/, '/setpoints [user_id] [new_points]\n/resetaward [match_id]');

fs.writeFileSync('bot-final.js', code);
console.log('✅ Added /resetaward command!');
