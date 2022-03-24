const math = require("mathjs");
module.exports = (msg) => {
	let idx = msg.content.indexOf(' ');

	if(idx == -1) {
		msg.reply("kei ta lekh");
	}
	else {
		let filtered = msg.content.substring(idx + 1);
	try {	
		msg.reply(math.evaluate(filtered).toString());
	}
	catch(_) {
		msg.reply("Jepaite na lekh")
	}
	}
}