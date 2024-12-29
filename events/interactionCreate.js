const { defaultCooldown } = require("../config.json");

// InteractionCreate Event Handler

module.exports.run = async (client, interaction) => {
  if (!interaction.isCommand()) return;

  // Gets Slash commands

  const command = client.slashCommands.get(interaction.commandName);
  if (!command) return;

  // Cooldown Identifier

  const { cooldowns } = client;

  // Cooldowns Mapping

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Map());
  }

  // Cooldowns Handler

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || defaultCooldown) * 1000;

  if (timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return interaction.reply({
        content: `Please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`,
        ephemeral: true,
      });
    }
  }

  timestamps.set(interaction.user.id, now);
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

  try {
    // Command Execution
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
};