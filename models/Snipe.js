const mongoose = require("mongoose");

snipe = new mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  attachments: {
    type: [String],
    required: false,
  },
});

module.exports = mongoose.model("snipe", snipe);
