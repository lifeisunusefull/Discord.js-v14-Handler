const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  cooldown: 5,
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};