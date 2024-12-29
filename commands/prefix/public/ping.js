// Prefix command
module.exports = {
  name: 'ping', // set the command name
  description: 'Replies with Pong!', // Set a description for the command
  cooldown: 5, // Set your preferred cooldown
  aliases: ['po'], // Set your preferred aliases
  execute(message) { // Execute the command
    // Pefrom the actions
    message.channel.send('Pong!');
  },
};