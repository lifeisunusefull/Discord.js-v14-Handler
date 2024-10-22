const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();

// Handlers
['commandHandler', 'eventHandler'].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.login(token || process.env.token);