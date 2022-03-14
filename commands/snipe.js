const { MessageAttachment } = require("discord.js");
const snipeModel = require("../models/Snipe");

module.exports = (msg) => {
  snipeModel
    .find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((data) => {
		content = data[0].username + " : " + data[0].content;
      msg.channel.send({
        content: content,
        files: data[0].attachments,
      });
    });
};
