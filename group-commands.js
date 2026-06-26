// ========== GROUP MANAGEMENT COMMANDS ==========

module.exports = {
  // 1. KICK COMMAND - Remove a user from the group
  kickUser: function(api, event, userIdToKick, ADMIN_ID) {
    const threadId = event.threadID;
    const adminId = event.senderID;
    
    if (adminId !== ADMIN_ID) {
      api.sendMessage("❌ Only admin can use this command!", threadId);
      return;
    }
    
    let targetId = null;
    if (event.messageReply && event.messageReply.senderID) {
      targetId = event.messageReply.senderID;
    } else if (event.mentions) {
      const mentionIds = Object.keys(event.mentions);
      if (mentionIds.length > 0) targetId = mentionIds[0];
    } else if (userIdToKick) {
      targetId = userIdToKick.trim();
    }
    
    if (!targetId) {
      api.sendMessage("❌ Please mention or reply to the user you want to kick!\nExample: /kick @username", threadId);
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
        api.sendMessage(`❌ Failed to kick user. Make sure I'm an admin!`, threadId);
      } else {
        api.sendMessage(`✅ User removed from the group!`, threadId);
      }
    });
  },
  
  // 2. ADDUSER COMMAND - Add a user to the group
  addUser: function(api, event, input, ADMIN_ID) {
    const threadId = event.threadID;
    const adminId = event.senderID;
    
    if (adminId !== ADMIN_ID) {
      api.sendMessage("❌ Only admin can use this command!", threadId);
      return;
    }
    
    let userId = input.trim();
    if (!userId) {
      api.sendMessage("❌ Please provide a Facebook ID or profile URL!\nExample: /adduser 123456789", threadId);
      return;
    }
    
    if (userId.includes('facebook.com')) {
      const matches = userId.match(/\d+/g);
      if (matches && matches.length > 0) userId = matches[0];
    }
    
    api.addUserToGroup(userId, threadId, (err) => {
      if (err) {
        api.sendMessage(`❌ Failed to add user. Make sure I'm an admin!`, threadId);
      } else {
        api.sendMessage(`✅ User added to the group!`, threadId);
      }
    });
  },
  
  // 3. PFP COMMAND - Get profile picture
  pfpUser: function(api, event) {
    const threadId = event.threadID;
    let targetId = null;
    
    if (event.messageReply && event.messageReply.senderID) {
      targetId = event.messageReply.senderID;
    } else if (event.mentions) {
      const mentionIds = Object.keys(event.mentions);
      if (mentionIds.length > 0) targetId = mentionIds[0];
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
  },
  
  // 4. TAG COMMAND - Mention a user by name
  tagUser: function(api, event, name) {
    const threadId = event.threadID;
    if (!name || name.length === 0) {
      api.sendMessage("❌ Please provide a name to tag!\nExample: /tag John Doe", threadId);
      return;
    }
    
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
};
