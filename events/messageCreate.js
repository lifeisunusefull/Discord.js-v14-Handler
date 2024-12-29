const { prefix, defaultCooldown } = require("../config.json");

// MessageCreate Event Handler

module.exports.run = (client, message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  // Cooldowns and aliases adientifiers

  const { cooldowns } = client;
  const { aliases } = command;

  // Mapping cooldowns

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Map());
  }

  // Cooldowns handler

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || defaultCooldown) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // Aliases Set Handler

  if (command.aliases && !args.length) {
    args.push(command.aliases);
    for (const alias of command.aliases) {
      client.commands.set(alias, command);
    }
  }

  try {
    // Command execution
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error while executing that command!");
  }
};