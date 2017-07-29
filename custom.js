class CustomFunctions {
    constructor(cli, conf) {
        cli.on('messageDelete', function(msg) {
            if (msg.author.id === "130453221331173386") {
                msg.channel.send('<@' + msg.author.id + '> a écrit mais n\'a pas assumé :\n```\n' + msg.content + '\n```')
            } else if (msg.author.id === "139512885679357953") {
                msg.channel.send('T\'inquiètes, mec, ça fonctionne :thumbsup:');
            }
        });

        cli.on('message', msg => {
            if (msg.content.substr(0, conf.prefix.length) === conf.prefix) {
                if (msg.author.id === "163688614205718528") {
                    msg.channel.send('Très bien, ô grande maîtresse, je m\'exécute sur le champs.');
                }
            }
        });
    }
}

module.exports = CustomFunctions;