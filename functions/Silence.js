    function getChannel(client, msg, authorID, guildID) {
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
        return channel;
    }

    module.exports = {
        mutePlayers: async function (client, msg, authorID, guildID) {

            let channel = getChannel(client, msg, authorID, guildID);

            if (channel !== null) {
                channel.members.forEach(member => {
                    member.voice.setMute(true)
                    return true;
                });
            }
            else {
                return false;
            }
        },

        unmutePlayers: async function (client, msg, authorID, guildID) {
            let channel = getChannel(client, msg, authorID, guildID);

            if (channel !== null) {
                channel.members.forEach(member => {
                    member.voice.setMute(true)
                    return true;
                });
            }
            else {
                return false;
            }
        }
    }