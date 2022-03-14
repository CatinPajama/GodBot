const fetch = require("node-fetch");

module.exports = (msg) => {
  let weather_url = `http://api.openweathermap.org/data/2.5/weather?q=Kathmandu&appid=${process.env.weatherKey}`;
  fetch(weather_url)
    .then((resp) => {
      if (!resp.ok) msg.reply("cant access api sry");
      else return resp.json();
    })
    .then((data) => {
      console.log(data);
      let temp = Math.round(data["main"]["temp"]) - 273;
      msg.channel.send(
        `${data["weather"][0]["description"]} and temperature is ${temp}°C`
      );
    });
};
