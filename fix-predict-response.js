const fs = require('fs');
let code = fs.readFileSync('bot-final.js', 'utf8');

// Find the predict command section and replace it
const oldPredict = `else if (cmd.startsWith('/predict ')) {
        const parts = cmd.replace('/predict ', '').trim().split(' ');
        const matchId = parts[0];
        const result = parts[1];
        const homeScore = parts[2] ? parseInt(parts[2]) : null;
        const awayScore = parts[3] ? parseInt(parts[3]) : null;
        
        if (!matches[matchId]) {
          api.sendMessage(` + '"`' + `❌ Invalid match ID` + '"`' + `, threadId);
        } else if (!['win', 'lose', 'draw'].includes(result)) {
          api.sendMessage(` + '"`' + `❌ Result must be: win, lose, draw` + '"`' + `, threadId);
        } else if (matches[matchId].status === 'completed') {
          api.sendMessage(` + '"`' + `❌ Match ${matchId} already completed!` + '"`' + `, threadId);
        } else {
          if (!matchPredictions[userId]) matchPredictions[userId] = {};
          matchPredictions[userId][matchId] = { prediction: result, homeScore: homeScore, awayScore: awayScore };
          saveAll();
          let reply = ` + '"`' + `✅ Predicted Match ${matchId}: ${result.toUpperCase()}` + '"`' + `;
          if (homeScore !== null) reply += ` + '"`' + ` (${homeScore}-${awayScore}) 🎯` + '"`' + `;
          api.sendMessage(reply, threadId);
        }
      }`;

const newPredict = `else if (cmd.startsWith('/predict ')) {
        const parts = cmd.replace('/predict ', '').trim().split(' ');
        const matchId = parts[0];
        const result = parts[1];
        const homeScore = parts[2] ? parseInt(parts[2]) : null;
        const awayScore = parts[3] ? parseInt(parts[3]) : null;
        
        if (!matches[matchId]) {
          api.sendMessage("❌ Invalid match ID", threadId);
        } else if (!['win', 'lose', 'draw'].includes(result)) {
          api.sendMessage("❌ Result must be: win, lose, draw", threadId);
        } else if (matches[matchId].status === 'completed') {
          api.sendMessage("❌ Match " + matchId + " already completed!", threadId);
        } else {
          if (!matchPredictions[userId]) matchPredictions[userId] = {};
          matchPredictions[userId][matchId] = { prediction: result, homeScore: homeScore, awayScore: awayScore };
          saveAll();
          
          let team1 = matches[matchId].team1;
          let team2 = matches[matchId].team2;
          let predictionText = "";
          let pointsText = "";
          
          if (result === 'win') {
            predictionText = team1 + " will win";
            pointsText = "3 points (or 8 if perfect score)";
          } else if (result === 'lose') {
            predictionText = team2 + " will win";
            pointsText = "3 points (or 8 if perfect score)";
          } else if (result === 'draw') {
            predictionText = "Draw";
            pointsText = "3 points (or 8 if perfect score)";
          }
          
          let reply = "✅ " + users[userId].name + " predicted Match " + matchId + ": " + predictionText;
          if (homeScore !== null && awayScore !== null) {
            reply += " (" + homeScore + "-" + awayScore + ")";
          }
          reply += "\\n\\n🎯 Possible points: " + pointsText;
          
          api.sendMessage(reply, threadId);
        }
      }`;

code = code.replace(oldPredict, newPredict);
fs.writeFileSync('bot-final.js', code);
console.log('✅ Fixed predict response to show team names and possible points!');
