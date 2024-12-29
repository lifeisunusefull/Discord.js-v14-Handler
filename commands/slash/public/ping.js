// Slash command

module.exports = {
  name: "ping", // set the command name
  description: "Replies with Pong!", // Set a description for the command
  cooldown: 5, // Set your preferred cooldown
  async execute(interaction) { // Execute the command
    // Pefrom the actions
    await interaction.reply('Pong!'); // Replies with Pong!
  },
};