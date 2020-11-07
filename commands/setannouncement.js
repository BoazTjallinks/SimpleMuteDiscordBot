let { owners } = require("../config.json");

module.exports = function (msg, client) {
    let author = msg.author;
    let channel = msg.channel;

    for (let index = 0; index < owners.length; index++) {
        if (owners[index] === author.id) {

            channel.send("Hello there & welcome to the official Snapix discord. \n\nOm je role voor specifieke games te krijgen en access tot de channels moet je een reactie geven onder dit post. \n\n:Minecraft: = Minecraft\n:RocketLeague:  = Rocket league\n:AmongUs:  = Among us\n\n\nVeel plezier :) (Als je dit al hebt gedaan hoef je niet alweer een reactie te geven)").then(function (message) {
                message.react("756090050592374825")
                message.react("756089907503562772")
                message.react("756089906618695702")

                msgId = message.id;
                message.pin()
            }).catch(function () {
                console.log("Uhhh this is odd2");
            });
        }
    }
}