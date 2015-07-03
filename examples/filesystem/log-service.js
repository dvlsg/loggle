import Loggle, { LEVELS } from '../../dist/loggle.js';
import fs from 'fs';
import util from 'util';

function getTimestamp() {
    return (new Date()).toISOString();
}

function getDatetime() {
    return (new Date()).toISOString();
}

function getDate() {
    let d     = new Date(),
        month = (d.getMonth() + 1).toString(),
        day   = d.getDate().toString(),
        year  = d.getFullYear().toString()
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return `${year}-${month}-${day}`;
}

function getLogfile(date) {
    return fs.createWriteStream(`${date}.log`, { flags: 'a' });
}

class Logger {

    constructor() {
        this.currentDate = getDate();
        this.logfile = getLogfile(this.currentDate);
    }

    write(msg) {
        let date = getDate();
        if (date !== this.currentDate) {
            this.logfile.end();
            this.currentDate = date;
            this.logfile = getLogfile(date);
        }
        this.logfile.write(msg + '\n');
    }

    log(msg) {
        let message = `${getDatetime()}   Log: ${msg}`;
        this.write(message);
        return console.log(message);
    }

    error(msg) {
        let message = `${getDatetime()} Error: ${msg}`;
        this.write(message);
        return console.error(message);
    }

    warn(msg) {
        let message = `${getDatetime()}  Warn: ${msg}`;
        this.write(message);
        return console.warn(message);
    }

    info(msg) {
        let message = `${getDatetime()}  Info: ${msg}`;
        this.write(message);
        return console.log(message);
    }

    debug(msg) {
        let message = `${getDatetime()} Debug: ${msg}`;
        this.write(message);
        return console.log(message);
    }

    silly(msg) {
        let message = `${getDatetime()} Silly: ${msg}`;
        this.write(message);
        return console.log(message);
    }
}

const log = new Loggle(new Logger(), LEVELS.SILLY);
export default log;
