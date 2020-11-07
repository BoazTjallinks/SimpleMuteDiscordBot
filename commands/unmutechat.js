const { Client } = require("discord.js");
let { owners } = require("../config.json");
let unmutePlayers = require("../functions/unmute");

module.exports = function (msg, Client) {
    let author = msg.author;
    
    unmutePlayers(Client, msg);
}