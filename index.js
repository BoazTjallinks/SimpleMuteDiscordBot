let config = require('./config.json');
let expressApi = require('./functions/Siri');

const Discord = require('discord.js');
const express = require("express");
const { readdirSync } = require('fs');

var bodyParser = require('body-parser')

const client = new Discord.Client();

const app = express()
const port = 38457

let msgId;

module.exports = {
    chatMuted : [
        {
            "serverId": null,
            "channelId": null,
            "ismuted": false
        }
    ],
    updateChatMuted : function (param) {
        this.ChatMuted = param;
    }
}




client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

expressApi(app, client);


client.on('message', msg => {
    if (msg.cleanContent.startsWith("~bot ")) {
        let splitmsg = msg.cleanContent.split(" ");
        console.log(msg.cleanContent);
        if (splitmsg.length > 1) {
            let command = splitmsg[1].toLowerCase();

            const commands = readdirSync(`./commands/`).filter(file => file.endsWith(".js"))
            let x = 0;
            for (let file of commands) {
                if (command + ".js" === file) {
                    x++;
                    let pull = require(`./commands/${file}`)(msg, client);
                }
            }

            if (x === 0) {
                msg.reply("Maaybe not today. Also not tmr!");
            }
        } else {
            msg.reply("Maaybe not today. Also not tmr!");
        }
    }
});

client.login(config.DiscordToken);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
