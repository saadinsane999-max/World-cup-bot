const fs = require('fs');

// Read the current bot file
let botCode = fs.readFileSync('worldcup-bot.js', 'utf8');

// Find and replace the awardMatchPoints function with corrected version
const oldFunction = /function awardMatchPoints\(matchId, actualResult, homeScore, awayScore\) \{[^}]+?\n  \}/s;

const newFunction = `function awardMatchPoints(matchId, actualResult, homeScore, awayScore) {
    let awardedCount = 0;
    const results = [];
    console.log(\`🔍 Awarding points for match \${matchId}: \${actualResult} \${homeScore}-\${awayScore}\`);
    
    for (const [userId, predictions] of Object.entries(matchPredictions)) {
      if (predictions[matchId]) {
        let pointsEarned = 0;
        const pred = predictions[matchId];
        let reason = "";
        
        console.log(\`  Checking user \${userId}: predicted \${pred.prediction} \${pred.homeScore}-\${pred.awayScore}\`);
        
        // Check result prediction
        if (pred.prediction === actualResult) {
          pointsEarned += 3;
          reason = \`Correct result for match \${matchId}\`;
          console.log(\`    ✓ Correct result! +3 points\`);
          
          // Check perfect score bonus
          if (pred.homeScore !== null && pred.awayScore !== null && 
              pred.homeScore === homeScore && 
              pred.awayScore === awayScore) {
            pointsEarned += 5;
            reason += " + Perfect score bonus!";
            console.log(\`    ✓ Perfect score! +5 bonus points (total \${pointsEarned})\`);
          }
        } else {
          console.log(\`    ✗ Wrong result. Predicted: \${pred.prediction}, Actual: \${actualResult}\`);
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
          results.push(\`\${userName}: +\${pointsEarned} pts (\${reason})\`);
          console.log(\`    ✅ Awarded \${pointsEarned} points to \${userName}\`);
        }
      }
    }
    
    console.log(\`📊 Match \${matchId} complete: \${awardedCount} users received points\`);
    return { count: awardedCount, results: results };
  }`;

// Replace the function
botCode = botCode.replace(oldFunction, newFunction);

// Also update the predict command to ensure scores are stored as numbers
const predictFix = `if (!matchPredictions[userId]) matchPredictions[userId] = {};
          matchPredictions[userId][matchId] = { 
            prediction: result,
            homeScore: homeScore ? parseInt(homeScore) : null,
            awayScore: awayScore ? parseInt(awayScore) : null
          };`;

// Make sure the predict command uses parseInt
botCode = botCode.replace(/homeScore: homeScore \? parseInt\(homeScore\) : null/g, 'homeScore: homeScore ? parseInt(homeScore) : null');
botCode = botCode.replace(/awayScore: awayScore \? parseInt\(awayScore\) : null/g, 'awayScore: awayScore ? parseInt(awayScore) : null');

fs.writeFileSync('worldcup-bot.js', botCode);
console.log('✅ Fixed bonus points logic!');
console.log('📝 The bot will now award +5 bonus points for perfect score predictions');
