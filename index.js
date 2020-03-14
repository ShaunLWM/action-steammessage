const core = require("@actions/core");
const SteamUser = require("steam-user");
const SteamTotp = require("steam-totp");

const REQUIRED_ENV = [
	'STEAM_USERNAME',
	'STEAM_PASSWORD',
	'STEAM_SECRET',
];

const missing = [];
REQUIRED_ENV.forEach(key => {
	if (!process.env[key] || process.env[key].length < 1) missing.push(key);
});

if (missing.length > 0) throw new Error(`Missing required environment variables ${missing.join(', ')}`);

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const client = new SteamUser();
client.logOn({
	"accountName": process.env.STEAM_USERNAME,
	"password": process.env.STEAM_PASSWORD,
	"twoFactorCode": SteamTotp.generateAuthCode(process.env.STEAM_SECRET)
});

client.on("loggedOn", async (details) => {
	console.log("Logged into Steam as " + client.steamID.getSteam3RenderedID());
	client.setPersona(SteamUser.EPersonaState.Online);
	client.chatTyping(core.getInput("steamAdminId"))
	client.chatMessage(core.getInput("steamAdminId"), core.getInput("steamMessage"));
	console.log(`Done sending message to ${core.getInput("steamAdminId")}`);
	await sleep(2000);
	client.logOff();
	process.exit();
});