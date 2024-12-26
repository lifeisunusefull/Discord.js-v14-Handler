const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  name: "ping",
  description: "Replies with Pong!",
  cooldown: 5,
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};