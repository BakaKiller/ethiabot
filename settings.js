/**
 * Created by Baka Killer on 21/06/2017.
 */
const jsonfile = require('jsonfile');

class Settings {
    constructor () {
        this.adminusers = {};
        this.prefix = ';';
        jsonfile.readFile('settings.json', function (err, obj) {
            if (err) {
                console.log(err.message);
            } else {
                Settings.adminusers = obj.adminusers;
                Settings.prefix = obj.prefix;
            }
        });
    }
}

let settings = new Settings();

module.exports = settings;