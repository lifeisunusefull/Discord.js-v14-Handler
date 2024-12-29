const fs = require("fs");
const path = require("path");
const { REST, Routes, Collection } = require("discord.js");
const { token, clientID } = require("../config.json");

// Commands Pathway Handler and Loader

module.exports = (client) => {
  // Prefix Command Loader

  const loadCommands = (dir, collection) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        loadCommands(fullPath, collection);
      } else if (file.endsWith(".js")) {
        try {
          const command = require(fullPath);
          collection.set(command.name, command);
          console.log("Successfully registered prefix commands.");
        } catch (error) {
          console.error(`Failed to load command file ${file}:`, error);
        }
      }
    }
  };

  // Prefix Loader

  client.commands = new Collection();
  loadCommands(path.join(__dirname, "../commands/prefix"), client.commands);

  client.slashCommands = new Collection();
  const slashCommands = [];

  const loadSlashCommands = (dir) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        loadSlashCommands(fullPath);
      } else if (file.endsWith(".js")) {
        try {
          const command = require(fullPath);
          client.slashCommands.set(command.name, command);
          slashCommands.push(command);
        } catch (error) {
          console.error(`Failed to load slash command file ${file}:`, error);
        }
      }
    }
  };

  // Slash Command Loader

  loadSlashCommands(path.join(__dirname, "../commands/slash"));

  const rest = new REST({ version: "10" }).setToken(token || process.env.token);
  (async () => {
    try {
      const existingCommands = await rest.get(
        Routes.applicationCommands(clientID)
      );
      for (const command of existingCommands) {
        await rest.delete(Routes.applicationCommand(clientID, command.id));
      }

      await rest.put(Routes.applicationCommands(clientID), {
        body: slashCommands,
      });
      console.log("Successfully registered slash commands.");
    } catch (error) {
      console.error("Error registering slash commands:", error);
    }
  })();
};
