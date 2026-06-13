const { login } = require('biar-fca');
const fs = require('fs');

const appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8'));

console.log('🔄 Testing login with fresh cookies...');

login({ 
  appState: appState,
  listenEvents: true,
  selfListen: false
}, (err, api) => {
  if (err) {
    console.error("❌ Login failed:", err);
    console.log("\n💡 Account is blocked by Facebook.");
    console.log("💡 This account cannot be used for bots anymore.");
    return;
  }
  
  console.log('\n✅ SUCCESS! Bot is running!');
  console.log(`👤 Logged in as: ${api.getCurrentUserID()}`);
  
  api.listenMqtt((err, event) => {
    if (err) return;
    if (event.type === 'message') {
      console.log(`📨 ${event.senderName}: ${event.body}`);
      if (event.body === '/start') {
        api.sendMessage("✅ Bot is working!", event.threadID);
      }
    }
  });
});
