// ========== GROUP MANAGEMENT COMMANDS ==========

// 1. KICK COMMAND - Remove a user from the group
function kickUser(api, event, userIdToKick) {
  const threadId = event.threadID;
  const adminId = event.senderID;
  
  // Check if admin
  if (adminId !== ADMIN_ID) {
    api.sendMessage("❌ Only admin can use this command!", threadId);
    return;
  }
  
  // Get target user from reply or mention
  let targetId = null;
  
  // Check if replying to a message
  if (event.messageReply && event.messageReply.senderID) {
    targetId = event.messageReply.senderID;
  } 
  // Check if mentioned
  else if (event.mentions) {
    const mentionIds = Object.keys(event.mentions);
    if (mentionIds.length > 0) {
      targetId = mentionIds[0];
    }
  } 
  // Check if userId provided in command
  else if (userIdToKick) {
    targetId = userIdToKick.trim();
  }
  
  if (!targetId) {
    api.sendMessage("❌ Please mention or reply to the user you want to kick!\nExample: /kick @username\nOr reply to their message with /kick", threadId);
    return;
  }
  
  if (targetId === api.getCurrentUserID()) {
    api.sendMessage("❌ I can't kick myself!", threadId);
    return;
  }
  
  if (targetId === adminId) {
    api.sendMessage("❌ You can't kick yourself!", threadId);
    return;
  }
  
  api.removeUserFromGroup(targetId, threadId, (err) => {
    if (err) {
      api.sendMessage(`❌ Failed to kick user. Make sure I'm an admin!\nError: ${err.message}`, threadId);
    } else {
      api.sendMessage(`✅ User removed from the group!`, threadId);
    }
  });
}

// 2. ADDUSER COMMAND - Add a user to the group
function addUser(api, event, input) {
  const threadId = event.threadID;
  const adminId = event.senderID;
  
  if (adminId !== ADMIN_ID) {
    api.sendMessage("❌ Only admin can use this command!", threadId);
    return;
  }
  
  let userId = input.trim();
  
  if (!userId) {
    api.sendMessage("❌ Please provide a Facebook ID or profile URL!\nExample: /adduser 123456789\n/adduser https://www.facebook.com/username", threadId);
    return;
  }
  
  // Extract ID from URL if needed
  if (userId.includes('facebook.com')) {
    // Try to extract ID from URL
    const matches = userId.match(/\d+/g);
    if (matches && matches.length > 0) {
      userId = matches[0];
    } else {
      api.sendMessage("❌ Could not extract ID from URL. Please provide the numeric ID.", threadId);
      return;
    }
  }
  
  api.addUserToGroup(userId, threadId, (err) => {
    if (err) {
      api.sendMessage(`❌ Failed to add user. Make sure I'm an admin!\nError: ${err.message}`, threadId);
    } else {
      api.sendMessage(`✅ User added to the group!`, threadId);
    }
  });
}

// 3. PFP COMMAND - Get profile picture
function getPfp(api, event) {
  const threadId = event.threadID;
  let targetId = null;
  
  // Check if replying to a message
  if (event.messageReply && event.messageReply.senderID) {
    targetId = event.messageReply.senderID;
  } 
  // Check if mentioned
  else if (event.mentions) {
    const mentionIds = Object.keys(event.mentions);
    if (mentionIds.length > 0) {
      targetId = mentionIds[0];
    }
  }
  
  if (!targetId) {
    api.sendMessage("❌ Please mention or reply to a user to get their profile picture!\nExample: /pfp @username", threadId);
    return;
  }
  
  api.getUserInfo(targetId, (err, ret) => {
    if (err) {
      api.sendMessage("❌ Could not fetch user info.", threadId);
      return;
    }
    
    const userInfo = ret[targetId];
    if (userInfo && userInfo.profileUrl) {
      api.sendMessage({
        body: `📸 Profile picture of ${userInfo.name || 'User'}`,
        attachment: await api.getProfilePicture(userInfo.profileUrl)
      }, threadId);
    } else {
      api.sendMessage("❌ Could not find profile picture.", threadId);
    }
  });
}

// 4. TAG COMMAND - Mention a user
function tagUser(api, event, name) {
  const threadId = event.threadID;
  
  if (!name || name.length === 0) {
    api.sendMessage("❌ Please provide a name to tag!\nExample: /tag John Doe", threadId);
    return;
  }
  
  // Search for user by name in the thread
  api.getThreadInfo(threadId, (err, info) => {
    if (err) {
      api.sendMessage("❌ Could not fetch thread info.", threadId);
      return;
    }
    
    let foundUser = null;
    const participants = info.participants || [];
    
    for (const participant of participants) {
      if (participant.name && participant.name.toLowerCase().includes(name.toLowerCase())) {
        foundUser = participant;
        break;
      }
    }
    
    if (foundUser) {
      api.sendMessage(`@${foundUser.name}`, threadId, null, { mention: foundUser.id });
    } else {
      api.sendMessage(`❌ Could not find user with name: ${name}`, threadId);
    }
  });
}

// 5. ANTICHANGEINFO COMMAND - Lock group settings
let antiChangeEnabled = false;

function toggleAntiChange(api, event) {
  const threadId = event.threadID;
  const adminId = event.senderID;
  
  if (adminId !== ADMIN_ID) {
    api.sendMessage("❌ Only admin can use this command!", threadId);
    return;
  }
  
  antiChangeEnabled = !antiChangeEnabled;
  api.sendMessage(`🔒 Anti-change info is now ${antiChangeEnabled ? 'ENABLED' : 'DISABLED'}!\n${antiChangeEnabled ? 'No one can change the group theme, picture, or nicknames.' : 'Settings can now be changed.'}`, threadId);
}

// Export all functions
module.exports = {
  kickUser,
  addUser,
  getPfp,
  tagUser,
  toggleAntiChange,
  antiChangeEnabled
};
