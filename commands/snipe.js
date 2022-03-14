const { MessageAttachment } = require("discord.js");
const snipeModel = require("../models/Snipe");

module.exports = (msg) => {
  snipeModel
    .find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((data) => {
      console.log("hmm", data[0].attachments);
      msg.channel.send({
        content: `${data[0].username} said ${data[0]["content"]}`,
        files: data[0].attachments,
      });
    });
};
