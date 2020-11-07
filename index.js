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

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.text({ type: 'text/html' }))

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

client.on("messageReactionAdd", (reaction, user) => {
    console.log(reaction.emoji.name)
    if (reaction.message.id === msgId) {

        if (reaction.emoji.name === "Minecraft") {
            const role = reaction.message.channel.guild.roles.cache.find(role => role.name == "Minecraft");
            reaction.message.guild.member(user).roles.add(role);
        } else if (reaction.emoji.name === "RocketLeague") {
            const role = reaction.message.channel.guild.roles.cache.find(role => role.name == "Rocket League");
            reaction.message.guild.member(user).roles.add(role);
        } else if (reaction.emoji.name === "AmongUs") {
            const role = reaction.message.channel.guild.roles.cache.find(role => role.name == "Among us");
            reaction.message.guild.member(user).roles.add(role);
        } else {}
    }
});


client.login(config.DiscordToken);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})