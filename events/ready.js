const { Status } = require("discord.js");

module.exports = async (client) => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ activities: [{ name: `Discord.js v14 Handler by AmtiXDev`, type: 4 }], status: 'idle' });
};