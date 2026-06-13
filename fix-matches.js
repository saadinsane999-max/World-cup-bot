const fs = require('fs');
let code = fs.readFileSync('bot-final.js', 'utf8');

const oldMatches = `      else if (cmd === '/matches') {
        let reply = "📅 MATCHES\\n\\n";
        Object.entries(matches).slice(0, 20).forEach(([id, m]) => {
          const icon = m.status === 'completed' ? '✅' : '⏳';
          reply += `${icon} Match ${id}: ${m.team1} vs ${m.team2}\\n`;
        });
        api.sendMessage(reply, threadId);
      }`;

const newMatches = `      else if (cmd === '/matches') {
        let reply = "📅 WORLD CUP 2026 MATCHES\\n\\n";
        Object.entries(matches).slice(0, 15).forEach(([id, m]) => {
          const icon = m.status === 'completed' ? '✅' : '⏳';
          const stageEmoji = m.stage === 'FINAL' ? '🏆' : 
                             m.stage && m.stage.includes('Semi') ? '⚽' : 
                             m.stage && m.stage.includes('Quarter') ? '🎯' : '';
          reply += `${icon} *Match ${id}* ${stageEmoji}\\n`;
          reply += `   ${m.team1} vs ${m.team2}\\n`;
          reply += `   📍 ${m.stage || 'Group Stage'}\\n`;
          reply += `   📅 ${m.date || 'TBD'}\\n`;
          if (m.status === 'completed') {
            reply += `   📊 Result: ${m.homeScore} - ${m.awayScore}\\n`;
          }
          reply += `\\n`;
        });
        reply += `📌 Showing first 15 matches. Total: ${Object.keys(matches).length} matches\\n`;
        reply += `💡 Use /matches page [2-${Math.ceil(Object.keys(matches).length / 15)}] for more.`;
        api.sendMessage(reply, threadId);
      }

      else if (cmd.startsWith('/matches page ')) {
        const page = parseInt(cmd.replace('/matches page ', '').trim());
        const matchesPerPage = 15;
        const totalMatches = Object.keys(matches).length;
        const totalPages = Math.ceil(totalMatches / matchesPerPage);
        
        if (isNaN(page) || page < 1 || page > totalPages) {
          api.sendMessage(`❌ Invalid page. Use /matches page 1-${totalPages}`, threadId);
          return;
        }
        
        const startIndex = (page - 1) * matchesPerPage;
        const matchList = Object.entries(matches).slice(startIndex, startIndex + matchesPerPage);
        
        let reply = `📅 WORLD CUP 2026 MATCHES (Page ${page}/${totalPages})\\n\\n`;
        
        matchList.forEach(([id, m]) => {
          const icon = m.status === 'completed' ? '✅' : '⏳';
          const stageEmoji = m.stage === 'FINAL' ? '🏆' : 
                             m.stage && m.stage.includes('Semi') ? '⚽' : 
                             m.stage && m.stage.includes('Quarter') ? '🎯' : '';
          reply += `${icon} *Match ${id}* ${stageEmoji}\\n`;
          reply += `   ${m.team1} vs ${m.team2}\\n`;
          reply += `   📍 ${m.stage || 'Group Stage'}\\n`;
          reply += `   📅 ${m.date || 'TBD'}\\n`;
          if (m.status === 'completed') {
            reply += `   📊 Result: ${m.homeScore} - ${m.awayScore}\\n`;
          }
          reply += `\\n`;
        });
        
        reply += `📌 Page ${page}/${totalPages}\\n`;
        if (page < totalPages) reply += `💡 Use /matches page ${page + 1} for next page\\n`;
        if (page > 1) reply += `💡 Use /matches page ${page - 1} for previous page`;
        
        api.sendMessage(reply, threadId);
      }`;

code = code.replace(oldMatches, newMatches);
fs.writeFileSync('bot-final.js', code);
console.log('✅ Restored detailed matches display with pagination!');
