const fs = require('fs');

module.exports = (client) => {
  const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const event = require(`../events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  }
};