const { Status } = require("discord.js");

// Ready Event Handler

module.exports.run = async (client) => {
  console.log(`Logged in as ${client.user.tag}!`);
  // Set Your App Presence and Activity as you want here
  client.user.setPresence({
    activities: [
      { name: `Discord.js v14 Handler by AmtiXDev & iMorgaSo`, type: 4 },
    ],
    status: "idle",
  });
};
