'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Set = require('babel-runtime/core-js/set')['default'];

var _Object$values = require('babel-runtime/core-js/object/values')['default'];

var _Symbol$toStringTag = require('babel-runtime/core-js/symbol/to-string-tag')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = Loggle;

var _zanaCheck = require('zana-check');

var _zanaCheck2 = _interopRequireDefault(_zanaCheck);

var requiredMethods = ['log'];

var LEVELS = {
    OFF: 0,
    ERROR: 1,
    WARN: 2,
    STANDARD: 3,
    INFO: 4,
    DEBUG: 5,
    SILLY: 6
};

exports.LEVELS = LEVELS;
var levelSet = new _Set(_Object$values(LEVELS));

var LogError = (function (_Error) {
    function LogError(message) {
        _classCallCheck(this, LogError);

        _get(Object.getPrototypeOf(LogError.prototype), 'constructor', this).call(this);
        if (Error.captureStackTrace && _zanaCheck2['default'].instance(Error.captureStackTrace, Function)) Error.captureStackTrace(this, this.constructor);else {
            var stack = new Error().stack;
            Object.defineProperty(this, 'stack', {
                value: stack
            });
        }
        Object.defineProperty(this, 'message', {
            value: message
        });
    }

    _inherits(LogError, _Error);

    _createClass(LogError, [{
        key: 'name',
        get: function get() {
            return this.constructor.name;
        }
    }, {
        key: _Symbol$toStringTag,
        get: function get() {
            return 'LogError';
        }
    }]);

    return LogError;
})(Error);

exports.LogError = LogError;

function Loggle(logInterface) {
    var level = arguments[1] === undefined ? LEVELS.STANDARD : arguments[1];

    var _level = level;
    if (!logInterface) throw new LogError('Provided logInterface did not exist!');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = _getIterator(requiredMethods), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var method = _step.value;

            if (!logInterface[method] || !_zanaCheck2['default'].instance(logInterface[method], Function)) throw new LogError('The logInterface provided to Loggle was missing a required method! Required: ' + method);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var transport = {};
    transport.log = logInterface.log.bind(logInterface);
    transport.error = _zanaCheck2['default'].instance(logInterface.error, Function) ? logInterface.error.bind(logInterface) : logInterface.log.bind(logInterface);
    transport.warn = _zanaCheck2['default'].instance(logInterface.warn, Function) ? logInterface.warn.bind(logInterface) : logInterface.log.bind(logInterface);
    transport.info = _zanaCheck2['default'].instance(logInterface.info, Function) ? logInterface.info.bind(logInterface) : logInterface.log.bind(logInterface);
    transport.debug = _zanaCheck2['default'].instance(logInterface.debug, Function) ? logInterface.debug.bind(logInterface) : logInterface.log.bind(logInterface);
    transport.silly = _zanaCheck2['default'].instance(logInterface.silly, Function) ? logInterface.silly.bind(logInterface) : logInterface.log.bind(logInterface);

    var loggle = function loggle() {
        if (loggle.level >= LEVELS.STANDARD) return transport.log.apply(transport, arguments);
    };
    Object.defineProperty(loggle, 'level', {
        get: function get() {
            return _level;
        },
        set: function set(val) {
            if (levelSet.has(val)) _level = val;
        }
    });
    loggle.log = loggle;

    loggle.debug = function () {
        if (loggle.level >= LEVELS.DEBUG) return transport.debug.apply(transport, arguments);
    };

    loggle.error = function () {
        if (loggle.level >= LEVELS.ERROR) return transport.error.apply(transport, arguments);
    };

    loggle.info = function () {
        if (loggle.level >= LEVELS.INFO) return transport.info.apply(transport, arguments);
    };

    loggle.warn = function () {
        if (loggle.level >= LEVELS.WARN) return transport.warn.apply(transport, arguments);
    };

    loggle.silly = function () {
        if (loggle.level >= LEVELS.SILLY) return transport.silly.apply(transport, arguments);
    };

    return loggle;
}