/**
 * Created by Baka Killer on 21/06/2017.
 */
const jsonfile = require('jsonfile');

class Settings {
    constructor() {
        this.Adminusers = {};
        this.Prefix = ';';
        let self = this;
        jsonfile.readFile('settings.json', function (err, obj) {
                if (err) {
                    console.log(err.message);
                } else {
                    self.Adminusers = obj.adminusers;
                    self.Prefix = obj.prefix;
                }
        });
    }

    save() {
        let settings = {
            "prefix": this.Prefix,
            "adminusers": this.Adminusers
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
}

let settings = new Settings();

module.exports = settings;