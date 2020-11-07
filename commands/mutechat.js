const { Client } = require("discord.js");
let { owners } = require("../config.json");
let mutePlayers = require("../functions/Silence");

module.exports = function (msg, Client) {
    let author = msg.author;
    
    mutePlayers(Client, msg);
}