module.exports = async function mutePlayers(client, msg, authorID, guildID) {
    let channel = null;

    if (authorID === "") {
        channel = msg.member.voice.channel;
    } else {
        client.guilds.cache.forEach(guild => {
            if (guild.id == guildID) {
             channel = guild.member(authorID).voice.channel   
            }
        })
    }
    console.log(channel);
    
    if (channel !== null) {
        channel.members.forEach(member => {
            member.voice.setMute(true)
        });
    }
}