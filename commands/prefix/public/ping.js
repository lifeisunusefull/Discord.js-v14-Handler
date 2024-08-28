module.exports = {
  name: 'ping',
  description: 'Replies with Pong!',
  cooldown: 5,
  execute(message) {
    message.channel.send('Pong!');
  },
};