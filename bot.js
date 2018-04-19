#!/usr/bin/env node
const Discord = require('discord.js');
const client = new Discord.Client();
const jsonfile = require('jsonfile');
const fs = require('fs');
const request = require('request');

let config = require('./settings.js');
let message;
let messageparts;
let customfunctions = false;

let text;
let prefix = config.prefix;
let gifs;
let alertnsfw = "Ce chan n'est pas nsfw ! Vous ne voulez quand même pas invoquer de telles choses à la vue de tous ? :open_mouth:";
let search;
let cansearch;
let searcharray;
let forbiddenkeywords = [
    'loli',
    'lolicon',
    'shota',
    'shotacon',
    'underage',
    'child',
    'children',
    'rape',
    'pedo',
    'pedophilia',
    'zoophilia',
    'bestiality',
    'vore'
];


// EVENTS **************************************************************************************************************

config.on('ready', function() {
    // get custom functions if any
    if (fs.existsSync('./custom.js')) {
        const Custom = require('./custom.js');
        customfunctions = new Custom(client, config);
    }

    // get gifs list
    loadgifs();

    // get help
    loadhelp();

    // add guild member add and remove functions
    if (config.welcomechan) {
        client.on('guildMemberAdd', function (member) {
            if (is_custom_functioned('guildMemberAdd')) {
                customfunctions.on('guildmemberadd', function (keepgoing) {
                    if (keepgoing) {
                        guildmemberadd(member);
                    }
                });
            } else {
                guildmemberadd(member);
            }
        });

        client.on('guildMemberRemove', function (member) {
            if (is_custom_functioned('guildMemberRemove')) {
                customfunctions.on('guildmemberremove', function (keepgoing) {
                    if (keepgoing) {
                        guildmemberremove(member);
                    }
                });
            } else {
                guildmemberremove(member);
            }
        });
    }

    client.login(config.token);
});

client.on('ready', function () {
    console.log(`Logged in as ${client.user.tag}!`);
    set_help();
});

client.on('message', msg => {
    if (is_custom_functioned('message')) {
        customfunctions.once('message', function (keepgoing) {
            if (keepgoing) {
                messageaction(msg);
            }
        });
    } else {
        messageaction(msg);
    }
});


// LIB *****************************************************************************************************************

function isadmin(userid) {
    return (config.adminusers[userid] !== undefined);
}

function is_custom_functioned(eventname) {
    eventname = eventname.toLowerCase();
    return (customfunctions !== false && customfunctions['on' + eventname] === true)
}

function guildmemberadd(member) {
    member.guild.channels.get(config.welcomechan).send(config.welcome.replace('{{memberid}}', member.id).replace('{{membertag}}', member.tag));
}

function guildmemberremove(member) {
    member.guild.channels.get(config.welcomechan).send(config.goodbye.replace('{{memberid}}', member.id).replace('{{membertag}}', member.tag));
}

function messageaction(msg) {
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
            case 'sethelp':
                if (isadmin(msg.author.id)) {
                    delete messageparts[0];
                    set_help(messageparts.join(' '));
                } else {
                    msg.reply('Déso pas déso, seuls les admins ont un pouvoir sur moi !');
                }
                break;
            case 'resethelp':
                if (isadmin(msg.author.id)) {
                    set_help();
                } else {
                    msg.reply('Déso pas déso, seuls les admins ont un pouvoir sur moi !');
                }
                break;
            case 'loadhelp':
                if (isadmin(msg.author.id)) {
                    loadhelp(true, msg.channel);
                }
                break;
            case 'loadgifs':
                if (isadmin(msg.author.id)) {
                    loadgifs(true, msg.channel);
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
                msg.channel.send(getgif('hug'));
                break;
            case 'pat':
            case 'blanked':
            case 'nimunimu':
            case 'slap':
            case 'cry':
            case 'nyan':
            case 'muahaha':
            case 'owo':
            case 'poke':
            case 'kiss':
            case 'lick':
            case 'jojo':
            case 'nibble':
            case 'facepalm':
            case 'clap':
            case 'pout':
            case 'blush':
            case 'smile':
            case 'stare':
            case 'pantsu':
            case 'sparkles':
            case 'food':
            case 'highfive':
            case 'idc':
            case 'dance':
            case 'die':
            case 'kill':
            case 'kawaii':
            case 'hide':
                msg.channel.send(getgif(messageparts[0]));
                break;
            case 'nsfw':
                msg.channel.send(getnsfwgif(msg.channel, messageparts[0]));
                break;
            case 'gelbooru':
                if (!msg.channel.nsfw && msg.channel.type !== 'dm') {
                    msg.reply(alertnsfw);
                } else {
                    cansearch = true;
                    search = message.substr(messageparts[0].length);
                    searcharray = search.split(' ');
                    for (let i = 0; i < searcharray.length; i++) {
                        if (forbiddenkeywords.includes(searcharray[i])) {
                            msg.channel.send(msg.guild.roles.find("name", "Admin") + ' C\'est mal, non ?\n```\nMessage de ' + msg.author.tag + ':\n' + msg.content + '```');
                            cansearch = false;
                        }
                    }
                    if (cansearch) {
                        getgelbooru(search, msg.channel);
                    }
                }
                break;
            case 'help':
                sendhelp(msg.author);
                break;
            case 'end':
                msg.channel.send(get_ultimatum());
        }
    }
}
function get_ultimatum() {
    return 'Hein ? Quoi ? Non, cette fonction n\'existe pas non <<';
}

function getgif(type) {
    if (typeof gifs[type] !== 'undefined' && gifs[type].length > 0) {
        return gifs[type][Math.floor(Math.random() * gifs[type].length)];
    } else {
        return 'Il n\'y a pas encore de gifs dans cette catégorie !';
    }
}

function getnsfwgif(chan, type) {
    if (chan.type !== 'text' || (chan.type === 'text' && chan.nsfw)) {
        return getgif(type);
    } else {
        return alertnsfw;
    }
}

function getgelbooru(search, chan) {
    request.get('https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&tags=' + search, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            if (body.length > 0) {
                let images = JSON.parse(body);
                let img = null;
                let id = null;
                let tags = null;
                do {
                    if (images.length < 1) {
                        img = false;
                        break;
                    }
                    id = Math.floor(Math.random() * images.length - 1) + 1;
                    if (id in images) {
                        img = images[id];
                        tags = img.tags.split(' ');
                        if (tags.includes('loli') || tags.includes('child') || tags.includes('children') || tags.includes('underage') || tags.includes('shotacon')) {
                            images.splice(id, 1);
                            img = false;
                        }
                    }
                } while (!img);
                if (!img) {
                    chan.send('Pardonnez-moi, je n\'ai rien trouvé de satisfaisant...');
                } else {
                    img = img.file_url.replace('\\', '');
                    chan.send('http:' + img);
                }
            } else {
                chan.send('Pardonnez-moi, je n\'ai rien trouvé de satisfaisant...');
            }
        }
    });
}

function set_help(text = 'origin') {
    if (text === 'origin') {
        text = config.prefix + 'help pour l\'aide !';
    }
    if (typeof client.user['setActivity'] === 'undefined') {
        client.user.setGame(text);
    } else {
        client.user.setActivity(text);
    }
}

function loadhelp(notify = false, channel = null) {
    request.get(config.jsonaddress + '/help.json', function(error, response, body) {
        if (channel === null) {
            notify = false;
        }
        if (notify === true) {
            channel.send('Mise à jour de l\'aide...');
        }
        if (!error && response.statusCode === 200) {
            let helpjson = JSON.parse(body);
            let localhelp = '';
            for (let key in helpjson) {
                if (!helpjson.hasOwnProperty(key)) {
                    continue;
                }
                localhelp += '`' + key + '`    ' + helpjson[key] + "\n";
            }
            help = localhelp;
            if (notify === true) {
                channel.send('L\'aide a été mise à jour !');
            }
        } else if (notify === true) {
            channel.send('Erreur !');
        }
    });
}

function prepare_help_string(text) {
    return text.replace('{{prefix}}', config.prefix);
}

function sendhelp(user) {
    user.send(prepare_help_string(config.helpintro));
    user.send(prepare_help_string(help));
    user.send(prepare_help_string(config.helpoutro));
}

function loadgifs(notify = false, channel = null) {
    if (channel === null) {
        notify = false;
    }
    if (notify === true) {
        channel.send('Mise à jour des gifs...');
    }
    request.get(config.jsonaddress + '/gifs.json', function(error, response, body) {
        if (!error && response.statusCode === 200) {
            gifs = JSON.parse(body);
            if (notify) {
                channel.send('Les gifs ont été mis à jour !');
            }
        } else if (notify) {
            channel.send('Erreur !');
        }
    });
}