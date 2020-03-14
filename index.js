const core = require("@actions/core");
const SteamUser = require("steam-user");

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const client = new SteamUser();
client.logOn({
	"accountName": process.env.STEAM_USERNAME,
	"password": process.env.STEAM_PASSWORD
});

client.on("loggedOn", async (details) {
	console.log("Logged into Steam as " + client.steamID.getSteam3RenderedID());
	client.chatTyping(core.getInput("steamAdminId"))
	client.chatMessage(core.getInput("steamAdminId"), core.getInput("steamMessage"));
	await sleep(2000);
	client.logOff();
});