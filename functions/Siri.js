const { tokens } = require('../config.json');
const { mutePlayers, unmutePlayers } = require('./Silence');


module.exports = async function setupExpress(app, client) {
    app.get('/muteeverybodynow', (req, res) => {
        let authorid = req.query.authorid;
        let token = req.query.token;
        let guildid = req.query.guildid;

        if (authorid === null || token === null || guildid === null) {
            res.json({
                status: "Fail",
                data: {
                    "title": "Please fill valid params!"
                }
            });
        } else {
            let returnData = false;

            for (let index = 0; index < tokens.length; index++) {
                if (token.toLowerCase() == tokens[index].toLowerCase()) {
                    returnData = mutePlayers(client, null, authorid, guildid);
                }
            }

            if (!returnData) {
                res.json({
                    status: "fail",
                    data: null
                })
            } else {

                res.json({
                    status: "success",
                    data: null
                })
            }
        }
    })

    app.get('/unmuteeverybodynow', (req, res) => {
        let authorid = req.query.authorid;
        let token = req.query.token;
        let guildid = req.query.guildid;

        if (authorid === null || token === null || guildid === null) {
            res.json({
                status: "Fail",
                data: {
                    "title": "Please fill valid params!"
                }
            });
        } else {
            let returnData = false;

            for (let index = 0; index < tokens.length; index++) {
                if (token.toLowerCase() == tokens[index].toLowerCase()) {
                    returnData = unmutePlayers(client, null, authorid, guildid);
                }
            }

            if (!returnData) {

                res.json({
                    status: "fail",
                    data: null
                })
            } else {

                res.json({
                    status: "success",
                    data: null
                })
            }
        }
    })
}