/**
 * This is meant to add custom functions with hardcoded features.
 * Complete and rename this file as custom.js
 */
class CustomFunctions {

    /**
     * @param cli (Discord.Client object)
     * @param conf (Settings object)
     */
    constructor(cli, conf) {
        // Then, call your custom functionalities here the same way it is in main js
        cli.on('message', msg => {
            if (msg.content.substr(0, conf.prefix.length) === conf.prefix) {
                if (msg.author.id === "00000000000000000") {
                    msg.channel.send('I KNEW IT WAS YOU BRO');
                }
            }
        });
    }
}

module.exports = CustomFunctions;