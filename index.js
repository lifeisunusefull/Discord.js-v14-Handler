const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { token } = require("./config.json");

// Create the client, set the intents that you need

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel]
});

client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
client.aliases = new Collection();

// App Handlers

["command", "event"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

// Login with the token of the client

client.login(token || process.env.token);