/**
 * Created by Baka Killer on 21/06/2017.
 */
const jsonfile = require('jsonfile');
const EventEmitter = require('events');

class Settings extends EventEmitter{
    constructor() {
        super();
        this.Adminusers = {};
        this.Prefix = ';';
        this.Token = '';
        this.Welcomechan = '';
        this.Helpintro = '';
        this.Helpoutro = '';
        this.Jsonaddress = '';
        this.Welcome = '';
        this.Goodbye = '';
        let self = this;
        jsonfile.readFile('settings.json', function (err, obj) {
            console.log(obj);
                if (err) {
                    console.log(err.message);
                } else {
                    self.Adminusers = obj.adminusers;
                    self.Prefix = obj.prefix;
                    self.Token = obj.token;
                    self.Welcomechan = obj.welcomechan;
                    self.Helpintro = obj.helpintro;
                    self.Helpoutro = obj.helpoutro;
                    self.Jsonaddress = obj.jsonaddress;
                    self.Welcome = obj.welcomemessage;
                    self.Goodbye = obj.goodbyemessage;
                    self.emit('ready');
                }
        });
    }

    save() {
        let settings = {
            "prefix": this.Prefix,
            "adminusers": this.Adminusers,
            "token": this.Token,
            "welcomechan": this.Welcomechan,
            "helpintro": this.Helpintro,
            "helpoutro": this.Helpoutro,
            "jsonaddress": this.Jsonaddress,
            "welcomemessage": this.Welcome,
            "goodbyemessage": this.Goodbye
        };
        jsonfile.writeFile('settings.json', settings, function (err) {
            if (err) {
                console.log(err.message);
            }
        });
    }

    set prefix(value) {
        this.Prefix = value;
        this.save();
    }

    get prefix() {
        return this.Prefix;
    }

    set adminusers(value) {
        this.Adminusers = value;
        this.save();
    }

    get adminusers() {
        return this.Adminusers;
    }

    set token(value) {
        this.Token = value;
        this.save();
    }

    get token() {
        return this.Token;
    }

    set welcomechan(value) {
        this.Welcomechan = value;
        this.save();
    }

    get welcomechan() {
        return this.Welcomechan;
    }

    set helpintro(value) {
        this.Helpintro = value;
        this.save();
    }

    get helpintro() {
        return this.Helpintro;
    }

    set helpoutro(value) {
        this.Helpoutro = value;
        this.save();
    }

    get helpoutro() {
        return this.Helpoutro;
    }

    set jsonaddress(value) {
        this.Jsonaddress = value;
        this.save();
    }

    get jsonaddress() {
        return this.Jsonaddress;
    }

    set welcome(value) {
        this.Welcome = value;
        this.save();
    }

    get welcome() {
        return this.Welcome;
    }

    set goodbye(value) {
        this.Goodbye = value;
        this.save();
    }

    get goodbye() {
        return this.Goodbye;
    }
}

let settings = new Settings();

module.exports = settings;