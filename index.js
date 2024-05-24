const {
  Client,
  Collection
} = require("discord.js-selfbot-v13");
const fs = require("fs");
const client = new Client({
  checkUpdate: false
});
const config = require("./config.json");
const prefix = config.prefix;
const token = config.token;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handlerFile => {
  require("./handlers/" + handlerFile)(client);
});
client.on("ready", () => {
  client.user.setActivity("Aka $B", {
    type: "STREAMING",
    url: "https://www.twitch.tv/ctjraka"
  });
  console.log("Selfbot co sur " + client.user.username + " ");
  console.log("askip dev by aka la pupute");
  console.log("https://github.com/Akalpb ");
  console.log("https://guns.lol/ctjraka ");
});
client.on("messageCreate", async message => {
  if (message.author.bot) {
    return;
  }
  if (message.author.id != client.user.id) {
    return;
  }
  if (!message.content.startsWith(prefix)) {
    return;
  }
  if (!message.guild) {
    return;
  }
  if (!message.member) {
    message.member = await message.guild.fetchMember(message);
  }
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  if (commandName.length == 0) {
    return;
  }
  let command = client.commands.get(commandName);
  if (!command) {
    command = client.commands.get(client.aliases.get(commandName));
  }
  if (command) {
    command.run(message, args, command, client);
    const currentTime = new Date();
    const timeString = currentTime.getHours().toString().padStart(2, "0") + ":" + currentTime.getMinutes().toString().padStart(2, "0") + ":" + currentTime.getSeconds().toString().padStart(2, "0");
    console.log("[" + timeString + "] Command run: " + commandName);
  }
});
client.login(token);
