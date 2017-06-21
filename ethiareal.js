const Discord = require('discord.js');
const client = new Discord.Client();
const jsonfile = require('jsonfile');
const fs = require('fs');
const request = require('request');

let config = require('./settings.js');

let message;
let messageparts;

let prefix = config.prefix;
let gifs;

jsonfile.readFile('gifs.json', function (err, obj) {
    if (err) {
        console.log(err.message);
    } else {
        gifs = obj;
    }
});

client.on('ready', function () {
    console.log(`Logged in as ${client.user.tag}!`);
});

function isadmin(userid) {
    return (config.adminusers[userid] !== undefined);
}

function sendimage(uri, channel) {
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream('temp')).on('close', function () {
            fs.readFile('temp', function (err, data) {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log(channel.type);
                    channel.sendFile(data).catch(function (error) {
                        console.log(error);
                    });
                    console.log(data);
                }
            });
        });
    });
}

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
                if (isadmin(msg.author.id)) {
                    config.prefix = messageparts[1];
                    prefix = config.prefix;
                    msg.reply('Bien reçu ! Maintenant, pour m\'appeler, utilisez le préfixe "' + prefix + '" !');
                } else {
                    msg.reply('Déso pas déso, seuls les admins ont un pouvoir sur moi !');
                }
                break;
            case 'hug':
                let hug;
                if (messageparts[1] !== undefined && messageparts[1].substr(0, 2) === '<@') {
                    hug = '<@!' + msg.author.id + '> a envoyé un câlin à ' + messageparts[1] + ' ! ';
                } else {
                    hug = 'Câlin !';
                }
                msg.channel.send(hug);
                msg.channel.send(gifs.hug[Math.floor(Math.random() * gifs.hug.length)]);
                break;
        }
    }
});

client.login('MzI2ODM2MDEwODgzMzUwNTI4.DCslRg.InNrqnYQwXL-anU0eydP_xcuvRc');