const { Client } = require("discord.js");
let { owners } = require("../config.json");
let {mutePlayers, unmutePlayers} = require("../functions/Silence");
const Unmute = require("../functions/Unmute");
let { chatMuted, updateChatMuted } = require("../index");

module.exports = function (msg, Client) {
    let author = msg.author;
    let channelid = msg.member.voice.channel;
    let serverid = msg.guild.id;
    let x = 0;
    
    for (let index = 0; index < chatMuted.length; index++) {
        if (chatMuted[index].serverId === serverid && chatMuted[index].channelId === channelid) {
            let newChatMuted = chatMuted[index];

            if (chatMuted[index].ismuted) {
                newChatMuted[index].ismuted = false;    
                updateChatMuted(newChatMuted);

                unmutePlayers(client, msg);
            }
            else {
                newChatMuted[index].ismuted = true;    
                updateChatMuted(newChatMuted);

                mutePlayers(client, msg);
            }

            x++;
        }
    }

    if (x <= 0) {
        let newChatMuted = chatMuted.push({
            "serverId": serverid,
            "channelId": channelid,
            "ismuted": true
        })

        updateChatMuted(newChatMuted);
        mutePlayers(Client, msg);
    } 
}