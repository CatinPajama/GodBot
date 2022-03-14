function rank(msg, statModel) {
  let query = {
    userid: msg.author["id"],
  };
  if (msg.author.bot) return;
  statModel
    .find(query)

    .then((data) => {
      if (data.length == 0) {
        statModel
          .create({
            username: msg.author["username"],
            userid: msg.author["id"],
            lvl: 1,
            exp: 0,
          })

          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        return;
      }
      let curr = data[0]["exp"] + 20;
      let lvl = data[0]["lvl"];

      if (curr == lvl * 100) {
        lvl++;
        curr = 0;
      }
      let newval = {
        $set: {
          lvl: lvl,
          exp: curr,
        },
      };
      statModel
        .updateOne(query, newval)
        .then((data) => {
          console.log("updata!");
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = rank;
