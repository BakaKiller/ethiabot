class CustomFunctions {
    constructor(cli) {
        this.Client = cli;

        this.Client.on('messageDelete', function(msg) {
            if (msg.author.id === "130453221331173386") {
                msg.channel.send('<@' + msg.author.id + '> a écrit mais n\'a pas assumé :\n```\n' + msg.content + '\n```')
            } else if (msg.author.id === "139512885679357953") {
                msg.channel.send('T\'inquiètes, mec, ça fonctionne :thumbsup:');
            }
        });
    }
}

module.exports = CustomFunctions;