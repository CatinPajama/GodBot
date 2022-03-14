const statModel = require("../models/Stats");

module.exports = (msg) => {
  statModel
    .find({})
    .then((data) => {
      data.sort((a, b) => {
        if (a.lvl > b.lvl) {
          return -1;
        } else if (b.lvl > a.lvl) {
          return 1;
        } else {
          return 0;
        }
      });

      let rankstring = "";
      for (let i = 0; i < 20; i++) {
        if (data[i] === undefined) continue;
        rankstring +=
          (i + 1).toString() +
          ". " +
          data[i]["username"] +
          " ( level: " +
          data[i]["lvl"] +
          ")" +
          "\n";
      }
      msg.channel.send(rankstring);
    })
    .catch((error) => {
      console.log(error);
    });
};
