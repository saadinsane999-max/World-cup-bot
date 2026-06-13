const fs = require('fs');
let code = fs.readFileSync('bot-final.js', 'utf8');

// Find where to add mypredictions (after mypoints)
const insertPoint = `else if (cmd === '/mypoints') {
        api.sendMessage(` + '"`' + `📊 You have ${users[userId].points} points!` + '"`' + `, threadId);
      }`;

const mypredictionsCmd = `
      else if (cmd === '/mypredictions') {
        let reply = "📝 YOUR PREDICTIONS\\n\\n";
        
        // Match predictions
        let hasPredictions = false;
        if (matchPredictions[userId] && Object.keys(matchPredictions[userId]).length > 0) {
          reply += "⚽ MATCH PREDICTIONS:\\n";
          Object.entries(matchPredictions[userId]).forEach(([id, data]) => {
            const match = matches[id];
            if (match) {
              reply += ` + '"`' + `   Match ${id}: ${match.team1} vs ${match.team2}\\n`;
              reply += ` + '"`' + `      → ${data.prediction.toUpperCase()}` + '"`' + `;
              if (data.homeScore !== null) {
                reply += ` + '"`' + ` (${data.homeScore}-${data.awayScore})` + '"`' + `;
              }
              reply += ` + '"`' + `\\n`;
              hasPredictions = true;
            }
          });
          reply += "\\n";
        }
        
        // Winner prediction
        if (winnerPredictions[userId]) {
          reply += ` + '"`' + `🏆 WORLD CUP WINNER:\\n`;
          reply += ` + '"`' + `   ${winnerPredictions[userId]}\\n\\n` + '"`' + `;
          hasPredictions = true;
        }
        
        // Award predictions
        if (awardPredictions[userId] && Object.keys(awardPredictions[userId]).length > 0) {
          reply += ` + '"`' + `⭐ AWARD PREDICTIONS:\\n`;
          Object.entries(awardPredictions[userId]).forEach(([award, pred]) => {
            reply += ` + '"`' + `   ${award.replace('_', ' ')}: ${pred}\\n` + '"`' + `;
          });
          reply += "\\n";
          hasPredictions = true;
        }
        
        if (!hasPredictions) {
          reply += "You haven't made any predictions yet!\\n";
          reply += "Use /predict [match_id] [win/lose/draw] [score1] [score2]\\n";
          reply += "Use /winner [team]\\n";
          reply += "Use /award [type] [player]";
        }
        
        api.sendMessage(reply, threadId);
      }`;

code = code.replace(insertPoint, insertPoint + mypredictionsCmd);
fs.writeFileSync('bot-final.js', code);
console.log('✅ Added /mypredictions command back!');
