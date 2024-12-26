module.exports = {
  name: 'ping',
  description: 'Replies with Pong!',
  cooldown: 5,
  aliases: ['po'],
  execute(message) {
    message.channel.send('Pong!');
  },
};