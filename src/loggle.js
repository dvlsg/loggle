"use strict";

import check from 'zana-check';

const requiredMethods = [
    'log'
];

export const LEVELS = {
      OFF      : 0
    , ERROR    : 1
    , WARN     : 2
    , STANDARD : 3
    , INFO     : 4
    , DEBUG    : 5
    , SILLY    : 6
};

let levelSet = new Set(Object.values(LEVELS));

export class LogError extends Error {

    constructor(message) {
        super();
        if (Error.captureStackTrace && check.instance(Error.captureStackTrace, Function))
            Error.captureStackTrace(this, this.constructor);
        else {
            let stack = (new Error()).stack;
            Object.defineProperty(this, 'stack', {
                value: stack
            });
        }
        Object.defineProperty(this, 'message', {
            value: message
        });
    }

    get name() {
        return this.constructor.name;
    }

    get [Symbol.toStringTag]() {
        return 'LogError';
    }
}

export default function Loggle(logInterface, level = LEVELS.STANDARD) {
    let _level = level;
    if (!logInterface)
        throw new LogError('Provided logInterface did not exist!');
    for (let method of requiredMethods) {
        if (!logInterface[method] || !check.instance(logInterface[method], Function))
            throw new LogError(`The logInterface provided to Loggle was missing a required method! Required: ${method}`);
    }
    let transport   = {};
    transport.log   = ::logInterface.log;
    transport.error = check.instance(logInterface.error, Function) ? ::logInterface.error : ::logInterface.log;
    transport.warn  = check.instance(logInterface.warn,  Function) ? ::logInterface.warn  : ::logInterface.log;
    transport.info  = check.instance(logInterface.info,  Function) ? ::logInterface.info  : ::logInterface.log;
    transport.debug = check.instance(logInterface.debug, Function) ? ::logInterface.debug : ::logInterface.log;
    transport.silly = check.instance(logInterface.silly, Function) ? ::logInterface.silly : ::logInterface.log;

    let loggle = (...args) => {
        if (loggle.level >= LEVELS.STANDARD)
            return transport.log(...args);
    };
    Object.defineProperty(loggle, 'level', {
        get: () => _level,
        set: (val) => {
            if (levelSet.has(val))
                _level = val;
        }
    });
    loggle.log = loggle;

    loggle.debug = (...args) => {
        if (loggle.level >= LEVELS.DEBUG)
            return transport.debug(...args);
    };

    loggle.error = (...args) => {
        if (loggle.level >= LEVELS.ERROR)
            return transport.error(...args);
    };

    loggle.info = (...args) => {
        if (loggle.level >= LEVELS.INFO)
            return transport.info(...args);
    };

    loggle.warn = (...args) => {
        if (loggle.level >= LEVELS.WARN)
            return transport.warn(...args);
    };

    loggle.silly = (...args) => {
        if (loggle.level >= LEVELS.SILLY)
            return transport.silly(...args);
    };

    return loggle;
}
