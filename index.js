const request = require("request");

// import settings
// discord
const config = require("./config.json");
const token = config.token;
const prefix = config.prefix;
// scam detect
links = ["app-nitro.com"] // blank array of links to begin with (except one demo link)
const regex = /(?:http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))/g // TODO: move to config
const sampleString = "http://www.google.com/, http://yahoo.com, http://www."
const url = config.apiURL
const interval = config.updateLinksInterval * 1000
// set link auto updater
function updateLinks() {
	console.log("Updating links..." + url)
	request(url, {"json": "true"}, ((err, res, json) => {
		if (err) { // catch for error
			console.log("Unable to update links! Error: " + err)
			return
		}
		if (res.statusCode != 200) { // catch for non-200 status code
			console.log("Unable to update links! Status code: " + res.statusCode)
			return
		}
		links = json
		console.log(`Links updated! Count: ${json.length}`)
	}))
}
console.log(updateLinks())
setInterval(updateLinks, interval)

// prepare discord client
const Discord = require("discord.js");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});


client.on("messageCreate", async function(message) {
	// non-breaking module: ping command
	if (message.content.startsWith(prefix + "ping")) {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.channel.send(`Pong! It took me ${timeTaken}ms to respond.`);
	}

	// non-breaking module: scan for scams
	for (const url of message.content.matchAll(regex)) { // iterate urls in message
		domain = url[1] // get domain from url
		console.log(domain)
		// check if url is in links
		if (links.includes(domain)) {
			console.log("Found scam!")
			await message.reply("Scam detected > message removed!")
			message.delete()
			break
		}
	}

});



client.login(token);