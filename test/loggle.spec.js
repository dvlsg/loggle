import Loggle, {LEVELS, LogError} from '../src/loggle.js';
import assert from 'zana-assert';
import wrapMocha from './util/wrap-mocha.js'; // executes automatically

function getTracker() {
    return {
        log   : [],
        error : [],
        info  : [],
        warn  : [],
        silly : [],
        debug : []
    };
}

function getLogger(tracker) {
    return {
        log   : (...args) => tracker.log.push(...args),
        error : (...args) => tracker.error.push(...args),
        info  : (...args) => tracker.info.push(...args),
        warn  : (...args) => tracker.warn.push(...args),
        silly : (...args) => tracker.silly.push(...args),
        debug : (...args) => tracker.debug.push(...args),
    };
}

describe('Loggle', () => {

    describe('constructor', () => {

        it('should initialize properly', () => {
            let log = new Loggle({log: () => {}});
            assert.instance(log, Function);
            assert.instance(log.log, Function);
            assert.instance(log.error, Function);
            assert.instance(log.warn, Function);
            assert.instance(log.info, Function);
            assert.instance(log.debug, Function);
            assert.instance(log.silly, Function);
        });

        it('should default to standard level', () => {
            let log = new Loggle({log: () => {}});
            assert.equal(log.level, LEVELS.STANDARD);
        });

        it('should initialize to off level', () => {
            let log = new Loggle({log: () => {}}, LEVELS.OFF);
            assert.equal(log.level, LEVELS.OFF);
        });

        it('should initialize to error level', () => {
            let log = new Loggle({log: () => {}}, LEVELS.ERROR);
            assert.equal(log.level, LEVELS.ERROR);
        });

        it('should initialize to warn level', () => {
            let log = new Loggle({log: () => {}}, LEVELS.WARN);
            assert.equal(log.level, LEVELS.WARN);
        });

        it('should initialize to standard level', () => {
            let log = new Loggle({log: () => {}}, LEVELS.STANDARD);
            assert.equal(log.level, LEVELS.STANDARD);
        });

        it('should initialize to info level', () => {
            let log = new Loggle({log: () => {}}, LEVELS.INFO);
            assert.equal(log.level, LEVELS.INFO);
        });

        it('should initialize to debug level', () => {
            let log = new Loggle({log: () => {}}, LEVELS.DEBUG);
            assert.equal(log.level, LEVELS.DEBUG);
        });

        it('should initialize to silly level', () => {
            let log = new Loggle({log: () => {}}, LEVELS.SILLY);
            assert.equal(log.level, LEVELS.SILLY);
        });

        it('should throw an error when interface is not defined', () => {
            assert.throws(() => { let log = new Loggle(); }, LogError);
        });

        it('should throw an error when interface is missing log()', () => {
            assert.throws(() => { let log = new Loggle({}); }, LogError);
        });

        it('should throw an error when interface.log() is not a function', () => {
            assert.throws(() => { let log = new Loggle({log: 'log'}); }, LogError);
        });
        
    });

    

    describe('error()', () => {

        it('should not log at LEVELS.OFF', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.OFF);
            log.error(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.ERROR', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.ERROR);
            log.error(1);
            expected.error.push(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.WARN', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.WARN);
            log.error(1);
            expected.error.push(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.STANDARD', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.STANDARD);
            log.error(1);
            expected.error.push(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.INFO', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.INFO);
            log.error(1);
            expected.error.push(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.DEBUG', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.DEBUG);
            log.error(1);
            expected.error.push(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.SILLY', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.SILLY);
            log.error(1);
            expected.error.push(1);
            assert.equal(actual, expected);
        });

    });

    describe('warn()', () => {

        it('should not log at LEVELS.OFF', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.OFF);
            log.warn(1);
            assert.equal(actual, expected);
        });

        it('should not log at LEVELS.ERROR', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.ERROR);
            log.warn(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.WARN', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.WARN);
            log.warn(1);
            expected.warn.push(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.STANDARD', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.STANDARD);
            log.warn(1);
            expected.warn.push(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.INFO', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.INFO);
            log.warn(1);
            expected.warn.push(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.DEBUG', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.DEBUG);
            log.warn(1);
            expected.warn.push(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.SILLY', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.SILLY);
            log.warn(1);
            expected.warn.push(1);
            assert.equal(actual, expected);
        });

    });

    describe('log()', () => {

        it('should not log at LEVELS.OFF', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.OFF);
            log.log(1);
            assert.equal(actual, expected);
        });

        it('should not log at LEVELS.ERROR', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.ERROR);
            log.log(1);
            assert.equal(actual, expected);
        });

        it('should not log at LEVELS.WARN', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.WARN);
            log.log(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.STANDARD', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.STANDARD);
            log.log(1);
            expected.log.push(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.INFO', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.INFO);
            log.log(1);
            expected.log.push(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.DEBUG', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.DEBUG);
            log.log(1);
            expected.log.push(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.SILLY', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.SILLY);
            log.log(1);
            expected.log.push(1);
            assert.equal(actual, expected);
        });

    });

    describe('info()', () => {

        it('should not log at LEVELS.OFF', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.OFF);
            log.info(1);
            assert.equal(actual, expected);
        });

        it('should not log at LEVELS.ERROR', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.ERROR);
            log.info(1);
            assert.equal(actual, expected);
        });

        it('should not log at LEVELS.WARN', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.WARN);
            log.info(1);
            assert.equal(actual, expected);
        });

        it('should not log at LEVELS.STANDARD', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.STANDARD);
            log.info(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.INFO', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.INFO);
            log.info(1);
            expected.info.push(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.DEBUG', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.DEBUG);
            log.info(1);
            expected.info.push(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.SILLY', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.SILLY);
            log.info(1);
            expected.info.push(1);
            assert.equal(actual, expected);
        });

    });

    describe('debug()', () => {

        it('should not log at LEVELS.OFF', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.OFF);
            log.debug(1);
            assert.equal(actual, expected);
        });

        it('should not log at LEVELS.ERROR', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.ERROR);
            log.debug(1);
            assert.equal(actual, expected);
        });

        it('should not log at LEVELS.WARN', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.WARN);
            log.debug(1);
            assert.equal(actual, expected);
        });

        it('should not log at LEVELS.STANDARD', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.STANDARD);
            log.debug(1);
            assert.equal(actual, expected);
        });

        it('should not log at LEVELS.INFO', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.INFO);
            log.debug(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.DEBUG', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.DEBUG);
            log.debug(1);
            expected.debug.push(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.SILLY', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.SILLY);
            log.debug(1);
            expected.debug.push(1);
            assert.equal(actual, expected);
        });

    });

    describe('silly()', () => {

        it('should not log at LEVELS.OFF', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.OFF);
            log.silly(1);
            assert.equal(actual, expected);
        });

        it('should not log at LEVELS.ERROR', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.ERROR);
            log.silly(1);
            assert.equal(actual, expected);
        });

        it('should not log at LEVELS.WARN', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.WARN);
            log.silly(1);
            assert.equal(actual, expected);
        });

        it('should not log at LEVELS.STANDARD', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.STANDARD);
            log.silly(1);
            assert.equal(actual, expected);
        });

        it('should not log at LEVELS.INFO', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.INFO);
            log.silly(1);
            assert.equal(actual, expected);
        });

        it('should not log at LEVELS.DEBUG', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.DEBUG);
            log.silly(1);
            assert.equal(actual, expected);
        });

        it('should log at LEVELS.SILLY', () => {
            let actual = getTracker();
            let expected = getTracker();
            let logger = getLogger(actual);
            let log = new Loggle(logger, LEVELS.SILLY);
            log.silly(1);
            expected.silly.push(1);
            assert.equal(actual, expected);
        });

    });

    describe('()', () => {

        it('should be an alias for log()', () => {
            let log = new Loggle({log: () => {}});
            assert.equal(log, log.log);
        });
    });

    describe('.level', () => {

        it('should return the logging level', () => {
            let log = new Loggle({log: () => {}}, LEVELS.SILLY);
            assert.equal(log.level, LEVELS.SILLY);
        });

        it('should change the logging level', () => {
            let log = new Loggle(console, LEVELS.SILLY);
            assert.equal(log.level, LEVELS.SILLY);
            log.level = LEVELS.DEBUG;
            assert.equal(log.level, LEVELS.DEBUG);
        });

        it('should not change to an invalid level', () => {
            let log = new Loggle({log: () => {}}, LEVELS.SILLY);
            assert.equal(log.level, LEVELS.SILLY);
            log.level = LEVELS.WUT;
            assert.equal(log.level, LEVELS.SILLY);
            log.level = 99;
            assert.equal(log.level, LEVELS.SILLY);
        });

    });

});
