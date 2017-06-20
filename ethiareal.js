const Discord = require('discord.js');
const client = new Discord.Client();
const jsonfile = require('jsonfile');

let config = require('./settings.js');

let message;
let messageparts;

let prefix = config.prefix;

client.on('ready', function () {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.substr(0, prefix.length) === prefix) {
        message = (msg.content.substr(prefix.length)).toLowerCase();
        messageparts = message.split(' ');
        switch (messageparts[0]) {
            case 'ping':
                msg.reply('Pong !');
                break;
            case 'pong':
                msg.reply('Ping !');
                break;
            case 'setprefix':
                if (config.adminusers[msg.author.id] !== undefined) {
                    config.prefix = messageparts[1];
                    prefix = config.prefix;
                    msg.reply('Bien reçu ! Maintenant, pour m\'appeler, utilisez le préfixe "' + prefix + '" !');
                } else {
                    msg.reply('Déso pas déso, seuls les admins ont un pouvoir sur moi !');
                }
                break;
        }
    }
});

client.login('MzI2ODM2MDEwODgzMzUwNTI4.DCslRg.InNrqnYQwXL-anU0eydP_xcuvRc');