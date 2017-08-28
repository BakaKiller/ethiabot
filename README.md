# Ethiabot

This is a discord bot who's main purpose is to send different kinds of gifs. It is customisable and has a shared gif library
to use at [json.ethiabot.ovh](http://json.ethiabot.ovh/gifs.json). Run it whenever you want or forever on a server, with your own
profile pic !

## Getting Started

These instructions will make you able to run a wonderful instance of this bot on your local machine or on a remote server ! I assume
you know how to administrate your machine and are able to make your own decisions if you have a doubt, otherwise, message me if you
are not sure about anything !

### Prerequisites

First thing you need is a working node.js server. Download links and install instructions are available on Node's
[official website](https://nodejs.org/en/download/).

Once it is installed, you should also have NPM installed as well. Please check both node and npm are in your system's Path, it will
simplify a lot of things.

Then, you will need build tools for C++ and Python. On Windows, you can install them all by opening a Command Prompt as administrator
and running :

```
npm install windows-build-tools --global --add-python-to-path
```

Once this is done, we are finally able to install this bot !

### Installing

Clone or download this repo into wherever is most convenient for you.

Using a Command Prompt or Terminal instance, go to this bot's folder, where the `package.json` and `bot.js` files are.

Run :
```
npm install
```

NPM will download and install every dependencies it needs to run our magnificent bot.

Then, create a copy of `settings-dist.json` and rename it `settings.json` and open it with your favourite text editor.

Just like any json file, it uses JSON's synthax to set you bot's settings.

`prefix` is what the bot will detect to know you're typing a command and not a regular message. Default is `;`.

`adminusers` is an object which contains every administrator's user ids as `"000000000000000000": 000000000000000000`. There can be
as many admin users as you want. To know a user's id, simply
[turn your discord's Developer Mode on](https://discordia.me/developer-mode), right click on the user and click on `Copy ID`.

`token` is your Bot User's token. It is absolutely required !

`welcomechan` is the chan where you'd like the bot to welcome and say goodbye to new or leaving users. Disable by leaving blank.

`helpintro` is the begining of the help message. Leave blank if you don't want any.

`helpoutro` is the same but at the end.

`jsonaddress` is the address you want the bot to go and find the JSON files. Default is `json.ethiabot.ovh`.

`welcomemessage` is the message you want the bot to send when a new user comes to your Discord. User `{{memberid}}` to display
user's id. It is useful to mark the user by writing `<@{{memberid}}>`.

`goodbyemessage` is the same but when user leaves.

## Built With

* [Discord.js](https://discord.js.org/) - The Discord API made simple !

## Contributing

Well, you're free to fork and have fun with this bot ! If you want me to pull your fork, just message me and we'll talk about it !

## Authors

* **Baka Killer** : *The best developper on this project so far (which isn't hard, I admit)*

## License

This project is licensed under the Beerware License - see the [LICENSE.md](LICENSE.md) file for details
