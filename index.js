const { Client, Intents, Collection } = require("discord.js");
const keepAlive = require("./server")
const fs = require("node:fs");
const mongoose = require("mongoose");
require("dotenv").config();
const statModel = require("./models/Stats");
const snipeModel = require("./models/Snipe");
const rank = require("./rank");

(async () => {
  await mongoose.connect(
    process.env.dbtoken,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected");
    }
  );
})();
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

let commands = new Map();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(file.split(".")[0], command);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", async (msg) => {
  rank(msg, statModel);
  if(msg.content.length > 0 && msg.content[0] != ">") return;

  const command = commands.get(msg.content.substring(1).split(" ")[0]);

  if (!command) return;

  await command(msg);
});

client.on("messageDelete", (message) => {
  // console.log(message.attachments);
  if (message.author.username != "GodBot") {
    att = [];
    message.attachments.forEach((value, key) => {
      att.push(value["url"]);
    });
    console.log(att);
    snipeModel.create({
      username: message.author.username,
      content: message.content,
      attachments: att,
    });
  }
});
keepAlive();
client.login(process.env.token);
