import Loggle, { LEVELS } from '../../dist/loggle.js';

function getTime() {
    return (new Date()).getTime();
}

class Logger {

    log(...args) {
        return console.log(`${getTime()}   Log: `, ...args);
    }

    error(...args) {
        return console.error(`${getTime()} Error: `, ...args);
    }

    info(...args) {
        return console.info(`${getTime()}  Info: `, ...args);
    }

    debug(...args) {
        // note that nodejs does not have console.debug
        return console.log(`${getTime()} Debug: `, ...args);
    }

    silly(...args) {
        return console.log(`${getTime()} Silly: `, ...args);
    }

    warn(...args) {
        return console.warn(`${getTime()}  Warn: `, ...args);
    }
}

const log = new Loggle(new Logger(), LEVELS.SILLY);
export default log;
