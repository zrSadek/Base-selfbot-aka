const { readdirSync } = require('node:fs');

module.exports = (client) => {
  readdirSync('./commands/').forEach((category) => {
    const commandFiles = readdirSync('./commands/' + category + '/').filter(
      (file) => file.endsWith('.js')
    );
    for (let commandFile of commandFiles) {
      let command = require('../commands/' + category + '/' + commandFile);
      if (command.name) {
        client.commands.set(command.name, command);
        console.log('[+] Command loaded successfully: ' + commandFile);
      } else {
        console.log('[-] Error when loading command: ' + commandFile);
        continue;
      }
      if (command.aliases && Array.isArray(command.aliases)) {
        command.aliases.forEach((alias) =>
          client.aliases.set(alias, command.name)
        );
      }
    }
  });
};
