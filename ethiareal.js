const Discord = require('discord.js');
const client = new Discord.Client();
const jsonfile = require('jsonfile');
const fs = require('fs');
const request = require('request');
const help = "Bonjour ! Voici l'aide de ce bot.\n\nPour exécuter une commande, entrez le préfixe défini par les " +
    "administrateurs immédiatement suivi par la commande de votre choix parmi les suivantes :\n" +
    "`help`       affiche cette aide.\n" +
    "`ping`       envoie \"Pong !\"\n" +
    "`pong`       envoie \"Ping !\"\n" +
    "`setprefix`  definit le préfixe des commandes (réservé aux administrateurs du bot)\n" +
    "`hug`        fait un câlin. Vous pouvez marquer quelqu'un en suivant pour une petite phrase spéciale !\n" +
    "`pat`        fait un headpat\n" +
    "`blanked`    fout un gros vent\n" +
    "`nimunimu`   tire les joues\n" +
    "`slap`       fait preuve de violence\n" +
    "`cry`        pleure\n" +
    "`nyan`       fait le chat\n" +
    "`muahaha`    rit de façon diabolique\n" +
    "`owo`        est circonspect\n" +
    "`poke`       est quelque peu éprouvant pour les nerfs\n" +
    "`kiss`       montre un amour démesuré mais toujours sincère\n" +
    "`lick`       montre un amour démesuré mais pas toujours sain ?\n" +
    "`jojo`       exprime son bon goût par l'intermédiaire de memes de bon aloi\n" +
    "`nibble`     exprime son attirance pour le goût de quelqu'un\n" +
    "`facepalm`   exprime sa désapointance sur un sujet quelconque\n" +
    "`clap`       montre une admiration sans égale mais tout à fait placide et platonique\n" +
    "`blush`      montre une timidité certaine\n" +
    "`pout`       montre un d�saccord peu cordial\n" +
    "\nEn cas de questions, n'hésite pas à t'adresser à <@139512885679357953> !\n\n" +
    "Une suggestion ? Envoie ça dans <#326780349793435648>\n" +
    "Une proposition ? Un énième gif ou groupe de gif à ajouter ? Ça se passe à l'adresse suivante :\n" +
    "Ajouter une ou des catégorie(s) : http://149.91.81.118/newcat.php\n" +
    "Ajouter un ou des gif(s) :        http://149.91.81.118/newgif.php";
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

function getgif(type) {
    return gifs[type][Math.floor(Math.random() * gifs[type].length)];
}

client.on('messageDelete', function(msg) {
    if (msg.author.id === "130453221331173386") {
        msg.channel.send('<@' + msg.author.id + '> a écrit mais n\'a pas assumé :\n```\n' + msg.content + '\n```')
    } else if (msg.author.id === "139512885679357953" && msg.content === "test de fou") {
        msg.channel.send('<@' + msg.author.id + '> a réussi un test ! \n```\n' + msg.content + '\n```');
    }
});

client.on('message', msg => {
    if (msg.content.substr(0, prefix.length) === prefix) {
        if (msg.author.id === "163688614205718528") {
            msg.channel.send('Très bien, ô grande maîtresse, je m\'exécute sur le champs.');
        }
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
                msg.channel.send(getgif(messageparts[0]));
                break;
            case 'help':
                msg.author.send(help);
                break;
        }
    }
});

client.login('MzI2ODM2MDEwODgzMzUwNTI4.DCslRg.InNrqnYQwXL-anU0eydP_xcuvRc');
