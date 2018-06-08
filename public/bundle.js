/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(18);
} else {
  module.exports = __webpack_require__(19);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(1);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(3);
  var warning = __webpack_require__(6);
  var ReactPropTypesSecret = __webpack_require__(8);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, _typeof(typeSpecs[typeSpecName]));
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var emptyFunction = __webpack_require__(1);

/**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  },

  /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  capture: function capture(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, true);
        }
      };
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
      }
      return {
        remove: emptyFunction
      };
    }
  },

  registerDefault: function registerDefault() {}
};

module.exports = EventListener;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = __webpack_require__(22);

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * @param {DOMElement} node input/textarea to focus
 */

function focusNode(node) {
  // IE8 can throw "Can't move focus to the control because it is invisible,
  // not enabled, or of a type that does not accept the focus." for all kinds of
  // reasons that are too expensive and fragile to test.
  try {
    node.focus();
  } catch (e) {}
}

module.exports = focusNode;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */

function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(41);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(20);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _TalkToYourself = __webpack_require__(34);

__webpack_require__(39);

__webpack_require__(42);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_TalkToYourself.TalkToYourself, null), document.getElementById('root'));

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 React v16.0.0
 react.production.min.js

 Copyright (c) 2013-present, Facebook, Inc.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var f = __webpack_require__(4),
    p = __webpack_require__(5);__webpack_require__(3);var r = __webpack_require__(1);
function t(a) {
  for (var b = arguments.length - 1, d = "Minified React error #" + a + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d" + a, e = 0; e < b; e++) {
    d += "\x26args[]\x3d" + encodeURIComponent(arguments[e + 1]);
  }b = Error(d + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name = "Invariant Violation";b.framesToPop = 1;throw b;
}
var u = { isMounted: function isMounted() {
    return !1;
  }, enqueueForceUpdate: function enqueueForceUpdate() {}, enqueueReplaceState: function enqueueReplaceState() {}, enqueueSetState: function enqueueSetState() {} };function v(a, b, d) {
  this.props = a;this.context = b;this.refs = p;this.updater = d || u;
}v.prototype.isReactComponent = {};v.prototype.setState = function (a, b) {
  "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a)) && "function" !== typeof a && null != a ? t("85") : void 0;this.updater.enqueueSetState(this, a, b, "setState");
};v.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function w(a, b, d) {
  this.props = a;this.context = b;this.refs = p;this.updater = d || u;
}function x() {}x.prototype = v.prototype;var y = w.prototype = new x();y.constructor = w;f(y, v.prototype);y.isPureReactComponent = !0;function z(a, b, d) {
  this.props = a;this.context = b;this.refs = p;this.updater = d || u;
}var A = z.prototype = new x();A.constructor = z;f(A, v.prototype);A.unstable_isAsyncReactComponent = !0;A.render = function () {
  return this.props.children;
};
var B = { Component: v, PureComponent: w, AsyncComponent: z },
    C = { current: null },
    D = Object.prototype.hasOwnProperty,
    E = "function" === typeof Symbol && Symbol["for"] && Symbol["for"]("react.element") || 60103,
    F = { key: !0, ref: !0, __self: !0, __source: !0 };function G(a, b, d, e, c, g, k) {
  return { $$typeof: E, type: a, key: b, ref: d, props: k, _owner: g };
}
G.createElement = function (a, b, d) {
  var e,
      c = {},
      g = null,
      k = null,
      m = null,
      q = null;if (null != b) for (e in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), m = void 0 === b.__self ? null : b.__self, q = void 0 === b.__source ? null : b.__source, b) {
    D.call(b, e) && !F.hasOwnProperty(e) && (c[e] = b[e]);
  }var l = arguments.length - 2;if (1 === l) c.children = d;else if (1 < l) {
    for (var h = Array(l), n = 0; n < l; n++) {
      h[n] = arguments[n + 2];
    }c.children = h;
  }if (a && a.defaultProps) for (e in l = a.defaultProps, l) {
    void 0 === c[e] && (c[e] = l[e]);
  }return G(a, g, k, m, q, C.current, c);
};
G.createFactory = function (a) {
  var b = G.createElement.bind(null, a);b.type = a;return b;
};G.cloneAndReplaceKey = function (a, b) {
  return G(a.type, b, a.ref, a._self, a._source, a._owner, a.props);
};
G.cloneElement = function (a, b, d) {
  var e = f({}, a.props),
      c = a.key,
      g = a.ref,
      k = a._self,
      m = a._source,
      q = a._owner;if (null != b) {
    void 0 !== b.ref && (g = b.ref, q = C.current);void 0 !== b.key && (c = "" + b.key);if (a.type && a.type.defaultProps) var l = a.type.defaultProps;for (h in b) {
      D.call(b, h) && !F.hasOwnProperty(h) && (e[h] = void 0 === b[h] && void 0 !== l ? l[h] : b[h]);
    }
  }var h = arguments.length - 2;if (1 === h) e.children = d;else if (1 < h) {
    l = Array(h);for (var n = 0; n < h; n++) {
      l[n] = arguments[n + 2];
    }e.children = l;
  }return G(a.type, c, g, k, m, q, e);
};
G.isValidElement = function (a) {
  return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && a.$$typeof === E;
};var H = "function" === typeof Symbol && Symbol.iterator,
    I = "function" === typeof Symbol && Symbol["for"] && Symbol["for"]("react.element") || 60103;function escape(a) {
  var b = { "\x3d": "\x3d0", ":": "\x3d2" };return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}var J = /\/+/g,
    K = [];
function L(a, b, d, e) {
  if (K.length) {
    var c = K.pop();c.result = a;c.keyPrefix = b;c.func = d;c.context = e;c.count = 0;return c;
  }return { result: a, keyPrefix: b, func: d, context: e, count: 0 };
}function M(a) {
  a.result = null;a.keyPrefix = null;a.func = null;a.context = null;a.count = 0;10 > K.length && K.push(a);
}
function N(a, b, d, e) {
  var c = typeof a === "undefined" ? "undefined" : _typeof(a);if ("undefined" === c || "boolean" === c) a = null;if (null === a || "string" === c || "number" === c || "object" === c && a.$$typeof === I) return d(e, a, "" === b ? "." + O(a, 0) : b), 1;var g = 0;b = "" === b ? "." : b + ":";if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
    c = a[k];var m = b + O(c, k);g += N(c, m, d, e);
  } else if (m = H && a[H] || a["@@iterator"], "function" === typeof m) for (a = m.call(a), k = 0; !(c = a.next()).done;) {
    c = c.value, m = b + O(c, k++), g += N(c, m, d, e);
  } else "object" === c && (d = "" + a, t("31", "[object Object]" === d ? "object with keys {" + Object.keys(a).join(", ") + "}" : d, ""));return g;
}function O(a, b) {
  return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && null != a.key ? escape(a.key) : b.toString(36);
}function P(a, b) {
  a.func.call(a.context, b, a.count++);
}function Q(a, b, d) {
  var e = a.result,
      c = a.keyPrefix;a = a.func.call(a.context, b, a.count++);Array.isArray(a) ? R(a, e, d, r.thatReturnsArgument) : null != a && (G.isValidElement(a) && (a = G.cloneAndReplaceKey(a, c + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(J, "$\x26/") + "/") + d)), e.push(a));
}
function R(a, b, d, e, c) {
  var g = "";null != d && (g = ("" + d).replace(J, "$\x26/") + "/");b = L(b, g, e, c);null == a || N(a, "", Q, b);M(b);
}var S = { forEach: function forEach(a, b, d) {
    if (null == a) return a;b = L(null, null, b, d);null == a || N(a, "", P, b);M(b);
  }, map: function map(a, b, d) {
    if (null == a) return a;var e = [];R(a, e, null, b, d);return e;
  }, count: function count(a) {
    return null == a ? 0 : N(a, "", r.thatReturnsNull, null);
  }, toArray: function toArray(a) {
    var b = [];R(a, b, null, r.thatReturnsArgument);return b;
  } };
module.exports = { Children: { map: S.map, forEach: S.forEach, count: S.count, toArray: S.toArray, only: function only(a) {
      G.isValidElement(a) ? void 0 : t("143");return a;
    } }, Component: B.Component, PureComponent: B.PureComponent, unstable_AsyncComponent: B.AsyncComponent, createElement: G.createElement, cloneElement: G.cloneElement, isValidElement: G.isValidElement, createFactory: G.createFactory, version: "16.0.0", __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { ReactCurrentOwner: C, assign: f } };

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.0.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (process.env.NODE_ENV !== "production") {
  (function () {

    'use strict';

    var objectAssign$1 = __webpack_require__(4);
    var require$$0 = __webpack_require__(6);
    var emptyObject = __webpack_require__(5);
    var invariant = __webpack_require__(3);
    var emptyFunction = __webpack_require__(1);
    var checkPropTypes = __webpack_require__(7);

    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * @providesModule reactProdInvariant
     * 
     */

    {
      var warning = require$$0;
    }

    function warnNoop(publicInstance, callerName) {
      {
        var constructor = publicInstance.constructor;
        warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass');
      }
    }

    /**
     * This is the abstract API for an update queue.
     */
    var ReactNoopUpdateQueue = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function isMounted(publicInstance) {
        return false;
      },

      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
        warnNoop(publicInstance, 'forceUpdate');
      },

      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
        warnNoop(publicInstance, 'replaceState');
      },

      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };

    var ReactNoopUpdateQueue_1 = ReactNoopUpdateQueue;

    /**
     * Copyright (c) 2014-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * @providesModule lowPriorityWarning
     */

    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var lowPriorityWarning = function lowPriorityWarning() {};

    {
      var printWarning = function printWarning(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        if (typeof console !== 'undefined') {
          console.warn(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      lowPriorityWarning = function lowPriorityWarning(condition, format) {
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }

    var lowPriorityWarning_1 = lowPriorityWarning;

    /**
     * Base class helpers for the updating state of a component.
     */
    function ReactComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue_1;
    }

    ReactComponent.prototype.isReactComponent = {};

    /**
     * Sets a subset of the state. Always use this to mutate
     * state. You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * There is no guarantee that calls to `setState` will run synchronously,
     * as they may eventually be batched together.  You can provide an optional
     * callback that will be executed when the call to setState is actually
     * completed.
     *
     * When a function is provided to setState, it will be called at some point in
     * the future (not synchronously). It will be called with the up to date
     * component arguments (state, props, context). These values can be different
     * from this.* because your function may be called after receiveProps but before
     * shouldComponentUpdate, and this new state, props, and context will not yet be
     * assigned to this.
     *
     * @param {object|function} partialState Next partial state or function to
     *        produce next partial state to be merged with current state.
     * @param {?function} callback Called after state is updated.
     * @final
     * @protected
     */
    ReactComponent.prototype.setState = function (partialState, callback) {
      !((typeof partialState === 'undefined' ? 'undefined' : _typeof(partialState)) === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };

    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {?function} callback Called after update is complete.
     * @final
     * @protected
     */
    ReactComponent.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };

    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */
    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };
      var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(ReactComponent.prototype, methodName, {
          get: function get() {
            lowPriorityWarning_1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };
      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }

    /**
     * Base class helpers for the updating state of a component.
     */
    function ReactPureComponent(props, context, updater) {
      // Duplicated from ReactComponent.
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue_1;
    }

    function ComponentDummy() {}
    ComponentDummy.prototype = ReactComponent.prototype;
    var pureComponentPrototype = ReactPureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = ReactPureComponent;
    // Avoid an extra prototype jump for these methods.
    objectAssign$1(pureComponentPrototype, ReactComponent.prototype);
    pureComponentPrototype.isPureReactComponent = true;

    function ReactAsyncComponent(props, context, updater) {
      // Duplicated from ReactComponent.
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue_1;
    }

    var asyncComponentPrototype = ReactAsyncComponent.prototype = new ComponentDummy();
    asyncComponentPrototype.constructor = ReactAsyncComponent;
    // Avoid an extra prototype jump for these methods.
    objectAssign$1(asyncComponentPrototype, ReactComponent.prototype);
    asyncComponentPrototype.unstable_isAsyncReactComponent = true;
    asyncComponentPrototype.render = function () {
      return this.props.children;
    };

    var ReactBaseClasses = {
      Component: ReactComponent,
      PureComponent: ReactPureComponent,
      AsyncComponent: ReactAsyncComponent
    };

    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * @providesModule ReactCurrentOwner
     * 
     */

    /**
     * Keeps track of the current owner.
     *
     * The current owner is the component who should own any components that are
     * currently being constructed.
     */
    var ReactCurrentOwner = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };

    var ReactCurrentOwner_1 = ReactCurrentOwner;

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    {
      var warning$2 = require$$0;
    }

    // The Symbol used to tag the ReactElement type. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var REACT_ELEMENT_TYPE$1 = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };

    var specialPropKeyWarningShown;
    var specialPropRefWarningShown;

    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }

    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }

    function defineKeyPropWarningGetter(props, displayName) {
      var warnAboutAccessingKey = function warnAboutAccessingKey() {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;
          warning$2(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }

    function defineRefPropWarningGetter(props, displayName) {
      var warnAboutAccessingRef = function warnAboutAccessingRef() {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;
          warning$2(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };
      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }

    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, no instanceof check
     * will work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} key
     * @param {string|object} ref
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @param {*} owner
     * @param {*} props
     * @internal
     */
    var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allow us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE$1,

        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,

        // Record the component responsible for creating this element.
        _owner: owner
      };

      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {};

        // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.
        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        });
        // self and source are DEV only properties.
        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        });
        // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.
        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });
        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }

      return element;
    };

    /**
     * Create and return a new ReactElement of the given type.
     * See https://facebook.github.io/react/docs/react-api.html#createelement
     */
    ReactElement.createElement = function (type, config, children) {
      var propName;

      // Reserved names are extracted
      var props = {};

      var key = null;
      var ref = null;
      var self = null;
      var source = null;

      if (config != null) {
        if (hasValidRef(config)) {
          ref = config.ref;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source;
        // Remaining properties are added to a new props object
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      }

      // Resolve default props
      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;
        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }
      {
        if (key || ref) {
          if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE$1) {
            var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner_1.current, props);
    };

    /**
     * Return a function that produces ReactElements of a given type.
     * See https://facebook.github.io/react/docs/react-api.html#createfactory
     */
    ReactElement.createFactory = function (type) {
      var factory = ReactElement.createElement.bind(null, type);
      // Expose the type on the factory and the prototype so that it can be
      // easily accessed on elements. E.g. `<Foo />.type === Foo`.
      // This should not be named `constructor` since this may not be the function
      // that created the element, and it may not even be a constructor.
      // Legacy hook TODO: Warn if this is accessed
      factory.type = type;
      return factory;
    };

    ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

      return newElement;
    };

    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://facebook.github.io/react/docs/react-api.html#cloneelement
     */
    ReactElement.cloneElement = function (element, config, children) {
      var propName;

      // Original props are copied
      var props = objectAssign$1({}, element.props);

      // Reserved names are extracted
      var key = element.key;
      var ref = element.ref;
      // Self is preserved since the owner is preserved.
      var self = element._self;
      // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.
      var source = element._source;

      // Owner will be preserved, unless ref is overridden
      var owner = element._owner;

      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner_1.current;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        // Remaining properties override existing props
        var defaultProps;
        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              // Resolve default props
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
      }

      return ReactElement(element.type, key, ref, self, source, owner, props);
    };

    /**
     * Verifies the object is a ReactElement.
     * See https://facebook.github.io/react/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a valid component.
     * @final
     */
    ReactElement.isValidElement = function (object) {
      return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE$1;
    };

    var ReactElement_1 = ReactElement;

    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * @providesModule ReactDebugCurrentFrame
     * 
     */

    var ReactDebugCurrentFrame = {};

    {
      // Component that is being worked on
      ReactDebugCurrentFrame.getCurrentStack = null;

      ReactDebugCurrentFrame.getStackAddendum = function () {
        var impl = ReactDebugCurrentFrame.getCurrentStack;
        if (impl) {
          return impl();
        }
        return null;
      };
    }

    var ReactDebugCurrentFrame_1 = ReactDebugCurrentFrame;

    {
      var warning$1 = require$$0;

      var _require = ReactDebugCurrentFrame_1,
          getStackAddendum = _require.getStackAddendum;
    }

    var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
    // The Symbol used to tag the ReactElement type. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';

    /**
     * Escape and wrap key so it is safe to use as a reactid
     *
     * @param {string} key to be escaped.
     * @return {string} the escaped key.
     */
    function escape(key) {
      var escapeRegex = /[=:]/g;
      var escaperLookup = {
        '=': '=0',
        ':': '=2'
      };
      var escapedString = ('' + key).replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });

      return '$' + escapedString;
    }

    /**
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */

    var didWarnAboutMaps = false;

    var userProvidedKeyEscapeRegex = /\/+/g;
    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }

    var POOL_SIZE = 10;
    var traverseContextPool = [];
    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
      if (traverseContextPool.length) {
        var traverseContext = traverseContextPool.pop();
        traverseContext.result = mapResult;
        traverseContext.keyPrefix = keyPrefix;
        traverseContext.func = mapFunction;
        traverseContext.context = mapContext;
        traverseContext.count = 0;
        return traverseContext;
      } else {
        return {
          result: mapResult,
          keyPrefix: keyPrefix,
          func: mapFunction,
          context: mapContext,
          count: 0
        };
      }
    }

    function releaseTraverseContext(traverseContext) {
      traverseContext.result = null;
      traverseContext.keyPrefix = null;
      traverseContext.func = null;
      traverseContext.context = null;
      traverseContext.count = 0;
      if (traverseContextPool.length < POOL_SIZE) {
        traverseContextPool.push(traverseContext);
      }
    }

    /**
     * @param {?*} children Children tree container.
     * @param {!string} nameSoFar Name of the key path so far.
     * @param {!function} callback Callback to invoke with each child found.
     * @param {?*} traverseContext Used to pass information throughout the traversal
     * process.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = typeof children === 'undefined' ? 'undefined' : _typeof(children);

      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }

      if (children === null || type === 'string' || type === 'number' ||
      // The following is inlined from ReactElement. This means we can optimize
      // some checks. React Fiber also inlines this logic for similar purposes.
      type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
        callback(traverseContext, children,
        // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }

      var child;
      var nextName;
      var subtreeCount = 0; // Count of children found in the current subtree.
      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = ITERATOR_SYMBOL && children[ITERATOR_SYMBOL] || children[FAUX_ITERATOR_SYMBOL];
        if (typeof iteratorFn === 'function') {
          {
            // Warn about using Maps as children
            if (iteratorFn === children.entries) {
              warning$1(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', getStackAddendum());
              didWarnAboutMaps = true;
            }
          }

          var iterator = iteratorFn.call(children);
          var step;
          var ii = 0;
          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getComponentKey(child, ii++);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else if (type === 'object') {
          var addendum = '';
          {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + getStackAddendum();
          }
          var childrenString = '' + children;
          invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
        }
      }

      return subtreeCount;
    }

    /**
     * Traverses children that are typically specified as `props.children`, but
     * might also be specified through attributes:
     *
     * - `traverseAllChildren(this.props.children, ...)`
     * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
     *
     * The `traverseContext` is an optional argument that is passed through the
     * entire traversal. It can be used to store accumulations or anything else that
     * the callback might find relevant.
     *
     * @param {?*} children Children tree object.
     * @param {!function} callback To invoke upon traversing each child.
     * @param {?*} traverseContext Context for traversal.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }

      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }

    /**
     * Generate a key string that identifies a component within a set.
     *
     * @param {*} component A component that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */
    function getComponentKey(component, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if ((typeof component === 'undefined' ? 'undefined' : _typeof(component)) === 'object' && component !== null && component.key != null) {
        // Explicit key
        return escape(component.key);
      }
      // Implicit key determined by the index in the set
      return index.toString(36);
    }

    function forEachSingleChild(bookKeeping, child, name) {
      var func = bookKeeping.func,
          context = bookKeeping.context;

      func.call(context, child, bookKeeping.count++);
    }

    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://facebook.github.io/react/docs/react-api.html#react.children.foreach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */
    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }
      var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
      var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context;

      var mappedChild = func.call(context, child, bookKeeping.count++);
      if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
      } else if (mappedChild != null) {
        if (ReactElement_1.isValidElement(mappedChild)) {
          mappedChild = ReactElement_1.cloneAndReplaceKey(mappedChild,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
        }
        result.push(mappedChild);
      }
    }

    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
      var escapedPrefix = '';
      if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + '/';
      }
      var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://facebook.github.io/react/docs/react-api.html#react.children.map
     *
     * The provided mapFunction(child, key, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} func The map function.
     * @param {*} context Context for mapFunction.
     * @return {object} Object containing the ordered map of results.
     */
    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, func, context);
      return result;
    }

    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://facebook.github.io/react/docs/react-api.html#react.children.count
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */
    function countChildren(children, context) {
      return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
    }

    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://facebook.github.io/react/docs/react-api.html#react.children.toarray
     */
    function toArray(children) {
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
      return result;
    }

    var ReactChildren = {
      forEach: forEachChildren,
      map: mapChildren,
      count: countChildren,
      toArray: toArray
    };

    var ReactChildren_1 = ReactChildren;

    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * @providesModule ReactVersion
     */

    var ReactVersion = '16.0.0';

    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://facebook.github.io/react/docs/react-api.html#react.children.only
     *
     * The current implementation of this function assumes that a single child gets
     * passed without a wrapper, but the purpose of this helper function is to
     * abstract away the particular structure of children.
     *
     * @param {?object} children Child collection structure.
     * @return {ReactElement} The first and only `ReactElement` contained in the
     * structure.
     */
    function onlyChild(children) {
      !ReactElement_1.isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
      return children;
    }

    var onlyChild_1 = onlyChild;

    /**
     * Copyright (c) 2016-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     * @providesModule describeComponentFrame
     */

    var describeComponentFrame$1 = function describeComponentFrame$1(name, source, ownerName) {
      return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
    };

    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * @providesModule getComponentName
     * 
     */

    function getComponentName$1(instanceOrFiber) {
      if (typeof instanceOrFiber.getName === 'function') {
        // Stack reconciler
        var instance = instanceOrFiber;
        return instance.getName();
      }
      if (typeof instanceOrFiber.tag === 'number') {
        // Fiber reconciler
        var fiber = instanceOrFiber;
        var type = fiber.type;

        if (typeof type === 'string') {
          return type;
        }
        if (typeof type === 'function') {
          return type.displayName || type.name;
        }
      }
      return null;
    }

    var getComponentName_1 = getComponentName$1;

    {
      var checkPropTypes$1 = checkPropTypes;
      var lowPriorityWarning$1 = lowPriorityWarning_1;
      var ReactDebugCurrentFrame$1 = ReactDebugCurrentFrame_1;
      var warning$3 = require$$0;
      var describeComponentFrame = describeComponentFrame$1;
      var getComponentName = getComponentName_1;

      var currentlyValidatingElement = null;

      var getDisplayName = function getDisplayName(element) {
        if (element == null) {
          return '#empty';
        } else if (typeof element === 'string' || typeof element === 'number') {
          return '#text';
        } else if (typeof element.type === 'string') {
          return element.type;
        } else {
          return element.type.displayName || element.type.name || 'Unknown';
        }
      };

      var getStackAddendum$1 = function getStackAddendum$1() {
        var stack = '';
        if (currentlyValidatingElement) {
          var name = getDisplayName(currentlyValidatingElement);
          var owner = currentlyValidatingElement._owner;
          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
        }
        stack += ReactDebugCurrentFrame$1.getStackAddendum() || '';
        return stack;
      };
    }

    var ITERATOR_SYMBOL$1 = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL$1 = '@@iterator'; // Before Symbol spec.

    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner_1.current) {
        var name = getComponentName(ReactCurrentOwner_1.current);
        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }
      return '';
    }

    function getSourceInfoErrorAddendum(elementProps) {
      if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
        var source = elementProps.__source;
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }
      return '';
    }

    /**
     * Warn if there's no key explicitly set on dynamic arrays of children or
     * object keys are not valid. This allows us to keep track of children between
     * updates.
     */
    var ownerHasKeyUseWarning = {};

    function getCurrentComponentErrorInfo(parentType) {
      var info = getDeclarationErrorAddendum();

      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
        if (parentName) {
          info = '\n\nCheck the top-level render call using <' + parentName + '>.';
        }
      }
      return info;
    }

    /**
     * Warn if the element doesn't have an explicit key assigned to it.
     * This element is in an array. The array could grow and shrink or be
     * reordered. All children that haven't already been validated are required to
     * have a "key" property assigned to it. Error statuses are cached so a warning
     * will only be shown once.
     *
     * @internal
     * @param {ReactElement} element Element that requires a key.
     * @param {*} parentType element's parent's type.
     */
    function validateExplicitKey(element, parentType) {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }
      element._store.validated = true;

      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }
      ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

      // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.
      var childOwner = '';
      if (element && element._owner && element._owner !== ReactCurrentOwner_1.current) {
        // Give the component that originally created this child.
        childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
      }

      currentlyValidatingElement = element;
      {
        warning$3(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum$1());
      }
      currentlyValidatingElement = null;
    }

    /**
     * Ensure that every element either is passed in a static location, in an
     * array with an explicit keys property defined, or in an object literal
     * with valid key property.
     *
     * @internal
     * @param {ReactNode} node Statically passed child of any type.
     * @param {*} parentType node's parent's type.
     */
    function validateChildKeys(node, parentType) {
      if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object') {
        return;
      }
      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];
          if (ReactElement_1.isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (ReactElement_1.isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = ITERATOR_SYMBOL$1 && node[ITERATOR_SYMBOL$1] || node[FAUX_ITERATOR_SYMBOL$1];
        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step;
            while (!(step = iterator.next()).done) {
              if (ReactElement_1.isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }

    /**
     * Given an element, validate that its props follow the propTypes definition,
     * provided by the type.
     *
     * @param {ReactElement} element
     */
    function validatePropTypes(element) {
      var componentClass = element.type;
      if (typeof componentClass !== 'function') {
        return;
      }
      var name = componentClass.displayName || componentClass.name;
      var propTypes = componentClass.propTypes;

      if (propTypes) {
        currentlyValidatingElement = element;
        checkPropTypes$1(propTypes, element.props, 'prop', name, getStackAddendum$1);
        currentlyValidatingElement = null;
      }
      if (typeof componentClass.getDefaultProps === 'function') {
        warning$3(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
      }
    }

    var ReactElementValidator$1 = {
      createElement: function createElement(type, props, children) {
        var validType = typeof type === 'string' || typeof type === 'function';
        // We warn in this case but don't throw. We expect the element creation to
        // succeed and there will likely be errors in render.
        if (!validType) {
          var info = '';
          if (type === undefined || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && Object.keys(type).length === 0) {
            info += ' You likely forgot to export your component from the file ' + "it's defined in.";
          }

          var sourceInfo = getSourceInfoErrorAddendum(props);
          if (sourceInfo) {
            info += sourceInfo;
          } else {
            info += getDeclarationErrorAddendum();
          }

          info += ReactDebugCurrentFrame$1.getStackAddendum() || '';

          warning$3(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type === 'undefined' ? 'undefined' : _typeof(type), info);
        }

        var element = ReactElement_1.createElement.apply(this, arguments);

        // The result can be nullish if a mock or a custom function is used.
        // TODO: Drop this when these are no longer allowed as the type argument.
        if (element == null) {
          return element;
        }

        // Skip key warning if the type isn't valid since our key validation logic
        // doesn't expect a non-string/function type and can throw confusing errors.
        // We don't want exception behavior to differ between dev and prod.
        // (Rendering will throw with a helpful message and as soon as the type is
        // fixed, the key warnings will appear.)
        if (validType) {
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], type);
          }
        }

        validatePropTypes(element);

        return element;
      },

      createFactory: function createFactory(type) {
        var validatedFactory = ReactElementValidator$1.createElement.bind(null, type);
        // Legacy hook TODO: Warn if this is accessed
        validatedFactory.type = type;

        {
          Object.defineProperty(validatedFactory, 'type', {
            enumerable: false,
            get: function get() {
              lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
              Object.defineProperty(this, 'type', {
                value: type
              });
              return type;
            }
          });
        }

        return validatedFactory;
      },

      cloneElement: function cloneElement(element, props, children) {
        var newElement = ReactElement_1.cloneElement.apply(this, arguments);
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], newElement.type);
        }
        validatePropTypes(newElement);
        return newElement;
      }
    };

    var ReactElementValidator_1 = ReactElementValidator$1;

    {
      var warning$4 = require$$0;
    }

    function isNative(fn) {
      // Based on isNative() from Lodash
      var funcToString = Function.prototype.toString;
      var reIsNative = RegExp('^' + funcToString
      // Take an example native function source for comparison
      .call(Object.prototype.hasOwnProperty)
      // Strip regex characters so we can use it for regex
      .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
      // Remove hasOwnProperty from the template to make it generic
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
      try {
        var source = funcToString.call(fn);
        return reIsNative.test(source);
      } catch (err) {
        return false;
      }
    }

    var canUseCollections =
    // Array.from
    typeof Array.from === 'function' &&
    // Map
    typeof Map === 'function' && isNative(Map) &&
    // Map.prototype.keys
    Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
    // Set
    typeof Set === 'function' && isNative(Set) &&
    // Set.prototype.keys
    Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

    var setItem;
    var getItem;
    var removeItem;
    var getItemIDs;
    var addRoot;
    var removeRoot;
    var getRootIDs;

    if (canUseCollections) {
      var itemMap = new Map();
      var rootIDSet = new Set();

      setItem = function setItem(id, item) {
        itemMap.set(id, item);
      };
      getItem = function getItem(id) {
        return itemMap.get(id);
      };
      removeItem = function removeItem(id) {
        itemMap['delete'](id);
      };
      getItemIDs = function getItemIDs() {
        return Array.from(itemMap.keys());
      };

      addRoot = function addRoot(id) {
        rootIDSet.add(id);
      };
      removeRoot = function removeRoot(id) {
        rootIDSet['delete'](id);
      };
      getRootIDs = function getRootIDs() {
        return Array.from(rootIDSet.keys());
      };
    } else {
      var itemByKey = {};
      var rootByKey = {};

      // Use non-numeric keys to prevent V8 performance issues:
      // https://github.com/facebook/react/pull/7232
      var getKeyFromID = function getKeyFromID(id) {
        return '.' + id;
      };
      var getIDFromKey = function getIDFromKey(key) {
        return parseInt(key.substr(1), 10);
      };

      setItem = function setItem(id, item) {
        var key = getKeyFromID(id);
        itemByKey[key] = item;
      };
      getItem = function getItem(id) {
        var key = getKeyFromID(id);
        return itemByKey[key];
      };
      removeItem = function removeItem(id) {
        var key = getKeyFromID(id);
        delete itemByKey[key];
      };
      getItemIDs = function getItemIDs() {
        return Object.keys(itemByKey).map(getIDFromKey);
      };

      addRoot = function addRoot(id) {
        var key = getKeyFromID(id);
        rootByKey[key] = true;
      };
      removeRoot = function removeRoot(id) {
        var key = getKeyFromID(id);
        delete rootByKey[key];
      };
      getRootIDs = function getRootIDs() {
        return Object.keys(rootByKey).map(getIDFromKey);
      };
    }

    var unmountedIDs = [];

    function purgeDeep(id) {
      var item = getItem(id);
      if (item) {
        var childIDs = item.childIDs;

        removeItem(id);
        childIDs.forEach(purgeDeep);
      }
    }

    function getDisplayName$1(element) {
      if (element == null) {
        return '#empty';
      } else if (typeof element === 'string' || typeof element === 'number') {
        return '#text';
      } else if (typeof element.type === 'string') {
        return element.type;
      } else {
        return element.type.displayName || element.type.name || 'Unknown';
      }
    }

    function describeID(id) {
      var name = ReactComponentTreeHook.getDisplayName(id);
      var element = ReactComponentTreeHook.getElement(id);
      var ownerID = ReactComponentTreeHook.getOwnerID(id);
      var ownerName = void 0;

      if (ownerID) {
        ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
      }
      warning$4(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id);
      return describeComponentFrame$1(name || '', element && element._source, ownerName || '');
    }

    var ReactComponentTreeHook = {
      onSetChildren: function onSetChildren(id, nextChildIDs) {
        var item = getItem(id);
        !item ? invariant(false, 'Item must have been set') : void 0;
        item.childIDs = nextChildIDs;

        for (var i = 0; i < nextChildIDs.length; i++) {
          var nextChildID = nextChildIDs[i];
          var nextChild = getItem(nextChildID);
          !nextChild ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : void 0;
          !(nextChild.childIDs != null || _typeof(nextChild.element) !== 'object' || nextChild.element == null) ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : void 0;
          !nextChild.isMounted ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : void 0;
          if (nextChild.parentID == null) {
            nextChild.parentID = id;
            // TODO: This shouldn't be necessary but mounting a new root during in
            // componentWillMount currently causes not-yet-mounted components to
            // be purged from our tree data so their parent id is missing.
          }
          !(nextChild.parentID === id) ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : void 0;
        }
      },
      onBeforeMountComponent: function onBeforeMountComponent(id, element, parentID) {
        var item = {
          element: element,
          parentID: parentID,
          text: null,
          childIDs: [],
          isMounted: false,
          updateCount: 0
        };
        setItem(id, item);
      },
      onBeforeUpdateComponent: function onBeforeUpdateComponent(id, element) {
        var item = getItem(id);
        if (!item || !item.isMounted) {
          // We may end up here as a result of setState() in componentWillUnmount().
          // In this case, ignore the element.
          return;
        }
        item.element = element;
      },
      onMountComponent: function onMountComponent(id) {
        var item = getItem(id);
        !item ? invariant(false, 'Item must have been set') : void 0;
        item.isMounted = true;
        var isRoot = item.parentID === 0;
        if (isRoot) {
          addRoot(id);
        }
      },
      onUpdateComponent: function onUpdateComponent(id) {
        var item = getItem(id);
        if (!item || !item.isMounted) {
          // We may end up here as a result of setState() in componentWillUnmount().
          // In this case, ignore the element.
          return;
        }
        item.updateCount++;
      },
      onUnmountComponent: function onUnmountComponent(id) {
        var item = getItem(id);
        if (item) {
          // We need to check if it exists.
          // `item` might not exist if it is inside an error boundary, and a sibling
          // error boundary child threw while mounting. Then this instance never
          // got a chance to mount, but it still gets an unmounting event during
          // the error boundary cleanup.
          item.isMounted = false;
          var isRoot = item.parentID === 0;
          if (isRoot) {
            removeRoot(id);
          }
        }
        unmountedIDs.push(id);
      },
      purgeUnmountedComponents: function purgeUnmountedComponents() {
        if (ReactComponentTreeHook._preventPurging) {
          // Should only be used for testing.
          return;
        }

        for (var i = 0; i < unmountedIDs.length; i++) {
          var id = unmountedIDs[i];
          purgeDeep(id);
        }
        unmountedIDs.length = 0;
      },
      isMounted: function isMounted(id) {
        var item = getItem(id);
        return item ? item.isMounted : false;
      },
      getCurrentStackAddendum: function getCurrentStackAddendum() {
        var info = '';
        var currentOwner = ReactCurrentOwner_1.current;
        if (currentOwner) {
          !(typeof currentOwner.tag !== 'number') ? invariant(false, 'Fiber owners should not show up in Stack stack traces.') : void 0;
          if (typeof currentOwner._debugID === 'number') {
            info += ReactComponentTreeHook.getStackAddendumByID(currentOwner._debugID);
          }
        }
        return info;
      },
      getStackAddendumByID: function getStackAddendumByID(id) {
        var info = '';
        while (id) {
          info += describeID(id);
          id = ReactComponentTreeHook.getParentID(id);
        }
        return info;
      },
      getChildIDs: function getChildIDs(id) {
        var item = getItem(id);
        return item ? item.childIDs : [];
      },
      getDisplayName: function getDisplayName(id) {
        var element = ReactComponentTreeHook.getElement(id);
        if (!element) {
          return null;
        }
        return getDisplayName$1(element);
      },
      getElement: function getElement(id) {
        var item = getItem(id);
        return item ? item.element : null;
      },
      getOwnerID: function getOwnerID(id) {
        var element = ReactComponentTreeHook.getElement(id);
        if (!element || !element._owner) {
          return null;
        }
        return element._owner._debugID;
      },
      getParentID: function getParentID(id) {
        var item = getItem(id);
        return item ? item.parentID : null;
      },
      getSource: function getSource(id) {
        var item = getItem(id);
        var element = item ? item.element : null;
        var source = element != null ? element._source : null;
        return source;
      },
      getText: function getText(id) {
        var element = ReactComponentTreeHook.getElement(id);
        if (typeof element === 'string') {
          return element;
        } else if (typeof element === 'number') {
          return '' + element;
        } else {
          return null;
        }
      },
      getUpdateCount: function getUpdateCount(id) {
        var item = getItem(id);
        return item ? item.updateCount : 0;
      },

      getRootIDs: getRootIDs,
      getRegisteredIDs: getItemIDs
    };

    var ReactComponentTreeHook_1 = ReactComponentTreeHook;

    var createElement = ReactElement_1.createElement;
    var createFactory = ReactElement_1.createFactory;
    var cloneElement = ReactElement_1.cloneElement;

    {
      var ReactElementValidator = ReactElementValidator_1;
      createElement = ReactElementValidator.createElement;
      createFactory = ReactElementValidator.createFactory;
      cloneElement = ReactElementValidator.cloneElement;
    }

    var React = {
      Children: {
        map: ReactChildren_1.map,
        forEach: ReactChildren_1.forEach,
        count: ReactChildren_1.count,
        toArray: ReactChildren_1.toArray,
        only: onlyChild_1
      },

      Component: ReactBaseClasses.Component,
      PureComponent: ReactBaseClasses.PureComponent,
      unstable_AsyncComponent: ReactBaseClasses.AsyncComponent,

      createElement: createElement,
      cloneElement: cloneElement,
      isValidElement: ReactElement_1.isValidElement,

      createFactory: createFactory,

      version: ReactVersion,

      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        ReactCurrentOwner: ReactCurrentOwner_1,
        // Used by renderers to avoid bundling object-assign twice in UMD bundles:
        assign: objectAssign$1
      }
    };

    {
      objectAssign$1(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
        // These should not be included in production.
        ReactComponentTreeHook: ReactComponentTreeHook_1,
        ReactDebugCurrentFrame: ReactDebugCurrentFrame_1
      });
    }

    var ReactEntry = React;

    module.exports = ReactEntry;
  })();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }
  if (process.env.NODE_ENV !== 'production') {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (process.env.NODE_ENV === 'production') {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(21);
} else {
  module.exports = __webpack_require__(24);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 React v16.0.0
 react-dom.production.min.js

 Copyright (c) 2013-present, Facebook, Inc.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
 Modernizr 3.0.0pre (Custom Build) | MIT
*/


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var aa = __webpack_require__(2);__webpack_require__(3);var l = __webpack_require__(9),
    n = __webpack_require__(4),
    ba = __webpack_require__(10),
    ca = __webpack_require__(1),
    da = __webpack_require__(5),
    ea = __webpack_require__(11),
    fa = __webpack_require__(12),
    ha = __webpack_require__(13),
    ia = __webpack_require__(14);
function w(a) {
  for (var b = arguments.length - 1, c = "Minified React error #" + a + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d" + a, d = 0; d < b; d++) {
    c += "\x26args[]\x3d" + encodeURIComponent(arguments[d + 1]);
  }b = Error(c + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name = "Invariant Violation";b.framesToPop = 1;throw b;
}aa ? void 0 : w("227");
function ja(a) {
  switch (a) {case "svg":
      return "http://www.w3.org/2000/svg";case "math":
      return "http://www.w3.org/1998/Math/MathML";default:
      return "http://www.w3.org/1999/xhtml";}
}
var ka = { Namespaces: { html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg" }, getIntrinsicNamespace: ja, getChildNamespace: function getChildNamespace(a, b) {
    return null == a || "http://www.w3.org/1999/xhtml" === a ? ja(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
  } },
    la = null,
    oa = {};
function pa() {
  if (la) for (var a in oa) {
    var b = oa[a],
        c = la.indexOf(a);-1 < c ? void 0 : w("96", a);if (!qa.plugins[c]) {
      b.extractEvents ? void 0 : w("97", a);qa.plugins[c] = b;c = b.eventTypes;for (var d in c) {
        var e = void 0;var f = c[d],
            g = b,
            h = d;qa.eventNameDispatchConfigs.hasOwnProperty(h) ? w("99", h) : void 0;qa.eventNameDispatchConfigs[h] = f;var k = f.phasedRegistrationNames;if (k) {
          for (e in k) {
            k.hasOwnProperty(e) && ra(k[e], g, h);
          }e = !0;
        } else f.registrationName ? (ra(f.registrationName, g, h), e = !0) : e = !1;e ? void 0 : w("98", d, a);
      }
    }
  }
}
function ra(a, b, c) {
  qa.registrationNameModules[a] ? w("100", a) : void 0;qa.registrationNameModules[a] = b;qa.registrationNameDependencies[a] = b.eventTypes[c].dependencies;
}
var qa = { plugins: [], eventNameDispatchConfigs: {}, registrationNameModules: {}, registrationNameDependencies: {}, possibleRegistrationNames: null, injectEventPluginOrder: function injectEventPluginOrder(a) {
    la ? w("101") : void 0;la = Array.prototype.slice.call(a);pa();
  }, injectEventPluginsByName: function injectEventPluginsByName(a) {
    var b = !1,
        c;for (c in a) {
      if (a.hasOwnProperty(c)) {
        var d = a[c];oa.hasOwnProperty(c) && oa[c] === d || (oa[c] ? w("102", c) : void 0, oa[c] = d, b = !0);
      }
    }b && pa();
  } },
    sa = qa,
    ta = { children: !0, dangerouslySetInnerHTML: !0, autoFocus: !0, defaultValue: !0, defaultChecked: !0,
  innerHTML: !0, suppressContentEditableWarning: !0, style: !0 };function ua(a, b) {
  return (a & b) === b;
}
var wa = { MUST_USE_PROPERTY: 1, HAS_BOOLEAN_VALUE: 4, HAS_NUMERIC_VALUE: 8, HAS_POSITIVE_NUMERIC_VALUE: 24, HAS_OVERLOADED_BOOLEAN_VALUE: 32, HAS_STRING_BOOLEAN_VALUE: 64, injectDOMPropertyConfig: function injectDOMPropertyConfig(a) {
    var b = wa,
        c = a.Properties || {},
        d = a.DOMAttributeNamespaces || {},
        e = a.DOMAttributeNames || {};a = a.DOMMutationMethods || {};for (var f in c) {
      xa.properties.hasOwnProperty(f) ? w("48", f) : void 0;var g = f.toLowerCase(),
          h = c[f];g = { attributeName: g, attributeNamespace: null, propertyName: f, mutationMethod: null, mustUseProperty: ua(h, b.MUST_USE_PROPERTY),
        hasBooleanValue: ua(h, b.HAS_BOOLEAN_VALUE), hasNumericValue: ua(h, b.HAS_NUMERIC_VALUE), hasPositiveNumericValue: ua(h, b.HAS_POSITIVE_NUMERIC_VALUE), hasOverloadedBooleanValue: ua(h, b.HAS_OVERLOADED_BOOLEAN_VALUE), hasStringBooleanValue: ua(h, b.HAS_STRING_BOOLEAN_VALUE) };1 >= g.hasBooleanValue + g.hasNumericValue + g.hasOverloadedBooleanValue ? void 0 : w("50", f);e.hasOwnProperty(f) && (g.attributeName = e[f]);d.hasOwnProperty(f) && (g.attributeNamespace = d[f]);a.hasOwnProperty(f) && (g.mutationMethod = a[f]);xa.properties[f] = g;
    }
  } },
    xa = { ID_ATTRIBUTE_NAME: "data-reactid", ROOT_ATTRIBUTE_NAME: "data-reactroot", ATTRIBUTE_NAME_START_CHAR: ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ATTRIBUTE_NAME_CHAR: ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",
  properties: {}, shouldSetAttribute: function shouldSetAttribute(a, b) {
    if (xa.isReservedProp(a) || !("o" !== a[0] && "O" !== a[0] || "n" !== a[1] && "N" !== a[1])) return !1;if (null === b) return !0;switch (typeof b === "undefined" ? "undefined" : _typeof(b)) {case "boolean":
        return xa.shouldAttributeAcceptBooleanValue(a);case "undefined":case "number":case "string":case "object":
        return !0;default:
        return !1;}
  }, getPropertyInfo: function getPropertyInfo(a) {
    return xa.properties.hasOwnProperty(a) ? xa.properties[a] : null;
  }, shouldAttributeAcceptBooleanValue: function shouldAttributeAcceptBooleanValue(a) {
    if (xa.isReservedProp(a)) return !0;var b = xa.getPropertyInfo(a);
    if (b) return b.hasBooleanValue || b.hasStringBooleanValue || b.hasOverloadedBooleanValue;a = a.toLowerCase().slice(0, 5);return "data-" === a || "aria-" === a;
  }, isReservedProp: function isReservedProp(a) {
    return ta.hasOwnProperty(a);
  }, injection: wa },
    A = xa,
    E = { IndeterminateComponent: 0, FunctionalComponent: 1, ClassComponent: 2, HostRoot: 3, HostPortal: 4, HostComponent: 5, HostText: 6, CoroutineComponent: 7, CoroutineHandlerPhase: 8, YieldComponent: 9, Fragment: 10 },
    F = { ELEMENT_NODE: 1, TEXT_NODE: 3, COMMENT_NODE: 8, DOCUMENT_NODE: 9, DOCUMENT_FRAGMENT_NODE: 11 },
    ya = E.HostComponent,
    za = E.HostText,
    Aa = F.ELEMENT_NODE,
    Ba = F.COMMENT_NODE,
    Ea = A.ID_ATTRIBUTE_NAME,
    Fa = { hasCachedChildNodes: 1 },
    Ga = Math.random().toString(36).slice(2),
    Ha = "__reactInternalInstance$" + Ga,
    Ia = "__reactEventHandlers$" + Ga;function La(a) {
  for (var b; b = a._renderedComponent;) {
    a = b;
  }return a;
}function Ma(a, b) {
  a = La(a);a._hostNode = b;b[Ha] = a;
}
function Na(a, b) {
  if (!(a._flags & Fa.hasCachedChildNodes)) {
    var c = a._renderedChildren;b = b.firstChild;var d;a: for (d in c) {
      if (c.hasOwnProperty(d)) {
        var e = c[d],
            f = La(e)._domID;if (0 !== f) {
          for (; null !== b; b = b.nextSibling) {
            var g = b,
                h = f;if (g.nodeType === Aa && g.getAttribute(Ea) === "" + h || g.nodeType === Ba && g.nodeValue === " react-text: " + h + " " || g.nodeType === Ba && g.nodeValue === " react-empty: " + h + " ") {
              Ma(e, b);continue a;
            }
          }w("32", f);
        }
      }
    }a._flags |= Fa.hasCachedChildNodes;
  }
}
function Oa(a) {
  if (a[Ha]) return a[Ha];for (var b = []; !a[Ha];) {
    if (b.push(a), a.parentNode) a = a.parentNode;else return null;
  }var c = a[Ha];if (c.tag === ya || c.tag === za) return c;for (; a && (c = a[Ha]); a = b.pop()) {
    var d = c;b.length && Na(c, a);
  }return d;
}
var G = { getClosestInstanceFromNode: Oa, getInstanceFromNode: function getInstanceFromNode(a) {
    var b = a[Ha];if (b) return b.tag === ya || b.tag === za ? b : b._hostNode === a ? b : null;b = Oa(a);return null != b && b._hostNode === a ? b : null;
  }, getNodeFromInstance: function getNodeFromInstance(a) {
    if (a.tag === ya || a.tag === za) return a.stateNode;void 0 === a._hostNode ? w("33") : void 0;if (a._hostNode) return a._hostNode;for (var b = []; !a._hostNode;) {
      b.push(a), a._hostParent ? void 0 : w("34"), a = a._hostParent;
    }for (; b.length; a = b.pop()) {
      Na(a, a._hostNode);
    }return a._hostNode;
  }, precacheChildNodes: Na,
  precacheNode: Ma, uncacheNode: function uncacheNode(a) {
    var b = a._hostNode;b && (delete b[Ha], a._hostNode = null);
  }, precacheFiberNode: function precacheFiberNode(a, b) {
    b[Ha] = a;
  }, getFiberCurrentPropsFromNode: function getFiberCurrentPropsFromNode(a) {
    return a[Ia] || null;
  }, updateFiberProps: function updateFiberProps(a, b) {
    a[Ia] = b;
  } },
    Pa = { remove: function remove(a) {
    a._reactInternalFiber = void 0;
  }, get: function get(a) {
    return a._reactInternalFiber;
  }, has: function has(a) {
    return void 0 !== a._reactInternalFiber;
  }, set: function set(a, b) {
    a._reactInternalFiber = b;
  } },
    Qa = { ReactCurrentOwner: aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner };
function Ra(a) {
  if ("function" === typeof a.getName) return a.getName();if ("number" === typeof a.tag) {
    a = a.type;if ("string" === typeof a) return a;if ("function" === typeof a) return a.displayName || a.name;
  }return null;
}var J = { NoEffect: 0, PerformedWork: 1, Placement: 2, Update: 4, PlacementAndUpdate: 6, Deletion: 8, ContentReset: 16, Callback: 32, Err: 64, Ref: 128 },
    Sa = E.HostComponent,
    Ta = E.HostRoot,
    Ua = E.HostPortal,
    Va = E.HostText,
    Wa = J.NoEffect,
    Xa = J.Placement;
function Za(a) {
  var b = a;if (a.alternate) for (; b["return"];) {
    b = b["return"];
  } else {
    if ((b.effectTag & Xa) !== Wa) return 1;for (; b["return"];) {
      if (b = b["return"], (b.effectTag & Xa) !== Wa) return 1;
    }
  }return b.tag === Ta ? 2 : 3;
}function $a(a) {
  2 !== Za(a) ? w("188") : void 0;
}
function ab(a) {
  var b = a.alternate;if (!b) return b = Za(a), 3 === b ? w("188") : void 0, 1 === b ? null : a;for (var c = a, d = b;;) {
    var e = c["return"],
        f = e ? e.alternate : null;if (!e || !f) break;if (e.child === f.child) {
      for (var g = e.child; g;) {
        if (g === c) return $a(e), a;if (g === d) return $a(e), b;g = g.sibling;
      }w("188");
    }if (c["return"] !== d["return"]) c = e, d = f;else {
      g = !1;for (var h = e.child; h;) {
        if (h === c) {
          g = !0;c = e;d = f;break;
        }if (h === d) {
          g = !0;d = e;c = f;break;
        }h = h.sibling;
      }if (!g) {
        for (h = f.child; h;) {
          if (h === c) {
            g = !0;c = f;d = e;break;
          }if (h === d) {
            g = !0;d = f;c = e;break;
          }h = h.sibling;
        }g ? void 0 : w("189");
      }
    }c.alternate !== d ? w("190") : void 0;
  }c.tag !== Ta ? w("188") : void 0;return c.stateNode.current === c ? a : b;
}
var bb = { isFiberMounted: function isFiberMounted(a) {
    return 2 === Za(a);
  }, isMounted: function isMounted(a) {
    return (a = Pa.get(a)) ? 2 === Za(a) : !1;
  }, findCurrentFiberUsingSlowPath: ab, findCurrentHostFiber: function findCurrentHostFiber(a) {
    a = ab(a);if (!a) return null;for (var b = a;;) {
      if (b.tag === Sa || b.tag === Va) return b;if (b.child) b.child["return"] = b, b = b.child;else {
        if (b === a) break;for (; !b.sibling;) {
          if (!b["return"] || b["return"] === a) return null;b = b["return"];
        }b.sibling["return"] = b["return"];b = b.sibling;
      }
    }return null;
  }, findCurrentHostFiberWithNoPortals: function findCurrentHostFiberWithNoPortals(a) {
    a = ab(a);
    if (!a) return null;for (var b = a;;) {
      if (b.tag === Sa || b.tag === Va) return b;if (b.child && b.tag !== Ua) b.child["return"] = b, b = b.child;else {
        if (b === a) break;for (; !b.sibling;) {
          if (!b["return"] || b["return"] === a) return null;b = b["return"];
        }b.sibling["return"] = b["return"];b = b.sibling;
      }
    }return null;
  } },
    K = { _caughtError: null, _hasCaughtError: !1, _rethrowError: null, _hasRethrowError: !1, injection: { injectErrorUtils: function injectErrorUtils(a) {
      "function" !== typeof a.invokeGuardedCallback ? w("197") : void 0;cb = a.invokeGuardedCallback;
    } }, invokeGuardedCallback: function invokeGuardedCallback(a, b, c, d, e, f, g, h, k) {
    cb.apply(K, arguments);
  }, invokeGuardedCallbackAndCatchFirstError: function invokeGuardedCallbackAndCatchFirstError(a, b, c, d, e, f, g, h, k) {
    K.invokeGuardedCallback.apply(this, arguments);if (K.hasCaughtError()) {
      var p = K.clearCaughtError();K._hasRethrowError || (K._hasRethrowError = !0, K._rethrowError = p);
    }
  }, rethrowCaughtError: function rethrowCaughtError() {
    return db.apply(K, arguments);
  }, hasCaughtError: function hasCaughtError() {
    return K._hasCaughtError;
  }, clearCaughtError: function clearCaughtError() {
    if (K._hasCaughtError) {
      var a = K._caughtError;K._caughtError = null;K._hasCaughtError = !1;return a;
    }w("198");
  } };
function cb(a, b, c, d, e, f, g, h, k) {
  K._hasCaughtError = !1;K._caughtError = null;var p = Array.prototype.slice.call(arguments, 3);try {
    b.apply(c, p);
  } catch (x) {
    K._caughtError = x, K._hasCaughtError = !0;
  }
}function db() {
  if (K._hasRethrowError) {
    var a = K._rethrowError;K._rethrowError = null;K._hasRethrowError = !1;throw a;
  }
}var eb = K,
    fb;function gb(a, b, c, d) {
  b = a.type || "unknown-event";a.currentTarget = hb.getNodeFromInstance(d);eb.invokeGuardedCallbackAndCatchFirstError(b, c, void 0, a);a.currentTarget = null;
}
var hb = { isEndish: function isEndish(a) {
    return "topMouseUp" === a || "topTouchEnd" === a || "topTouchCancel" === a;
  }, isMoveish: function isMoveish(a) {
    return "topMouseMove" === a || "topTouchMove" === a;
  }, isStartish: function isStartish(a) {
    return "topMouseDown" === a || "topTouchStart" === a;
  }, executeDirectDispatch: function executeDirectDispatch(a) {
    var b = a._dispatchListeners,
        c = a._dispatchInstances;Array.isArray(b) ? w("103") : void 0;a.currentTarget = b ? hb.getNodeFromInstance(c) : null;b = b ? b(a) : null;a.currentTarget = null;a._dispatchListeners = null;a._dispatchInstances = null;return b;
  }, executeDispatchesInOrder: function executeDispatchesInOrder(a, b) {
    var c = a._dispatchListeners,
        d = a._dispatchInstances;if (Array.isArray(c)) for (var e = 0; e < c.length && !a.isPropagationStopped(); e++) {
      gb(a, b, c[e], d[e]);
    } else c && gb(a, b, c, d);a._dispatchListeners = null;a._dispatchInstances = null;
  }, executeDispatchesInOrderStopAtTrue: function executeDispatchesInOrderStopAtTrue(a) {
    a: {
      var b = a._dispatchListeners;var c = a._dispatchInstances;if (Array.isArray(b)) for (var d = 0; d < b.length && !a.isPropagationStopped(); d++) {
        if (b[d](a, c[d])) {
          b = c[d];break a;
        }
      } else if (b && b(a, c)) {
        b = c;break a;
      }b = null;
    }a._dispatchInstances = null;a._dispatchListeners = null;return b;
  }, hasDispatches: function hasDispatches(a) {
    return !!a._dispatchListeners;
  }, getFiberCurrentPropsFromNode: function getFiberCurrentPropsFromNode(a) {
    return fb.getFiberCurrentPropsFromNode(a);
  }, getInstanceFromNode: function getInstanceFromNode(a) {
    return fb.getInstanceFromNode(a);
  }, getNodeFromInstance: function getNodeFromInstance(a) {
    return fb.getNodeFromInstance(a);
  }, injection: { injectComponentTree: function injectComponentTree(a) {
      fb = a;
    } } },
    ib = hb,
    jb = null,
    kb = null,
    lb = null;
function mb(a) {
  if (a = ib.getInstanceFromNode(a)) if ("number" === typeof a.tag) {
    jb && "function" === typeof jb.restoreControlledState ? void 0 : w("194");var b = ib.getFiberCurrentPropsFromNode(a.stateNode);jb.restoreControlledState(a.stateNode, a.type, b);
  } else "function" !== typeof a.restoreControlledState ? w("195") : void 0, a.restoreControlledState();
}
var nb = { injection: { injectFiberControlledHostComponent: function injectFiberControlledHostComponent(a) {
      jb = a;
    } }, enqueueStateRestore: function enqueueStateRestore(a) {
    kb ? lb ? lb.push(a) : lb = [a] : kb = a;
  }, restoreStateIfNeeded: function restoreStateIfNeeded() {
    if (kb) {
      var a = kb,
          b = lb;lb = kb = null;mb(a);if (b) for (a = 0; a < b.length; a++) {
        mb(b[a]);
      }
    }
  } };function ob(a, b, c, d, e, f) {
  return a(b, c, d, e, f);
}function pb(a, b) {
  return a(b);
}function qb(a, b) {
  return pb(a, b);
}
var rb = !1,
    sb = { batchedUpdates: function batchedUpdates(a, b) {
    if (rb) return ob(qb, a, b);rb = !0;try {
      return ob(qb, a, b);
    } finally {
      rb = !1, nb.restoreStateIfNeeded();
    }
  }, injection: { injectStackBatchedUpdates: function injectStackBatchedUpdates(a) {
      ob = a;
    }, injectFiberBatchedUpdates: function injectFiberBatchedUpdates(a) {
      pb = a;
    } } },
    tb = F.TEXT_NODE;function ub(a) {
  a = a.target || a.srcElement || window;a.correspondingUseElement && (a = a.correspondingUseElement);return a.nodeType === tb ? a.parentNode : a;
}var vb = E.HostRoot,
    wb = [];
function xb(a) {
  var b = a.targetInst;do {
    if (!b) {
      a.ancestors.push(b);break;
    }var c = b;if ("number" === typeof c.tag) {
      for (; c["return"];) {
        c = c["return"];
      }c = c.tag !== vb ? null : c.stateNode.containerInfo;
    } else {
      for (; c._hostParent;) {
        c = c._hostParent;
      }c = G.getNodeFromInstance(c).parentNode;
    }if (!c) break;a.ancestors.push(b);b = G.getClosestInstanceFromNode(c);
  } while (b);for (c = 0; c < a.ancestors.length; c++) {
    b = a.ancestors[c], yb._handleTopLevel(a.topLevelType, b, a.nativeEvent, ub(a.nativeEvent));
  }
}
var yb = { _enabled: !0, _handleTopLevel: null, setHandleTopLevel: function setHandleTopLevel(a) {
    yb._handleTopLevel = a;
  }, setEnabled: function setEnabled(a) {
    yb._enabled = !!a;
  }, isEnabled: function isEnabled() {
    return yb._enabled;
  }, trapBubbledEvent: function trapBubbledEvent(a, b, c) {
    return c ? ba.listen(c, b, yb.dispatchEvent.bind(null, a)) : null;
  }, trapCapturedEvent: function trapCapturedEvent(a, b, c) {
    return c ? ba.capture(c, b, yb.dispatchEvent.bind(null, a)) : null;
  }, dispatchEvent: function dispatchEvent(a, b) {
    if (yb._enabled) {
      var c = ub(b);c = G.getClosestInstanceFromNode(c);null === c || "number" !== typeof c.tag || bb.isFiberMounted(c) || (c = null);if (wb.length) {
        var d = wb.pop();d.topLevelType = a;d.nativeEvent = b;d.targetInst = c;a = d;
      } else a = { topLevelType: a, nativeEvent: b, targetInst: c, ancestors: [] };try {
        sb.batchedUpdates(xb, a);
      } finally {
        a.topLevelType = null, a.nativeEvent = null, a.targetInst = null, a.ancestors.length = 0, 10 > wb.length && wb.push(a);
      }
    }
  } },
    L = yb;function Cb(a, b) {
  null == b ? w("30") : void 0;if (null == a) return b;if (Array.isArray(a)) {
    if (Array.isArray(b)) return a.push.apply(a, b), a;a.push(b);return a;
  }return Array.isArray(b) ? [a].concat(b) : [a, b];
}
function Db(a, b, c) {
  Array.isArray(a) ? a.forEach(b, c) : a && b.call(c, a);
}var Eb = null;function Fb(a, b) {
  a && (ib.executeDispatchesInOrder(a, b), a.isPersistent() || a.constructor.release(a));
}function Gb(a) {
  return Fb(a, !0);
}function Hb(a) {
  return Fb(a, !1);
}
function Ib(a, b, c) {
  switch (a) {case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":
      return !(!c.disabled || "button" !== b && "input" !== b && "select" !== b && "textarea" !== b);default:
      return !1;}
}
var Jb = { injection: { injectEventPluginOrder: sa.injectEventPluginOrder, injectEventPluginsByName: sa.injectEventPluginsByName }, getListener: function getListener(a, b) {
    if ("number" === typeof a.tag) {
      var c = a.stateNode;if (!c) return null;var d = ib.getFiberCurrentPropsFromNode(c);if (!d) return null;c = d[b];if (Ib(b, a.type, d)) return null;
    } else {
      d = a._currentElement;if ("string" === typeof d || "number" === typeof d || !a._rootNodeID) return null;a = d.props;c = a[b];if (Ib(b, d.type, a)) return null;
    }c && "function" !== typeof c ? w("231", b, typeof c === "undefined" ? "undefined" : _typeof(c)) : void 0;
    return c;
  }, extractEvents: function extractEvents(a, b, c, d) {
    for (var e, f = sa.plugins, g = 0; g < f.length; g++) {
      var h = f[g];h && (h = h.extractEvents(a, b, c, d)) && (e = Cb(e, h));
    }return e;
  }, enqueueEvents: function enqueueEvents(a) {
    a && (Eb = Cb(Eb, a));
  }, processEventQueue: function processEventQueue(a) {
    var b = Eb;Eb = null;a ? Db(b, Gb) : Db(b, Hb);Eb ? w("95") : void 0;eb.rethrowCaughtError();
  } },
    Kb;l.canUseDOM && (Kb = document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", ""));
function Lb(a, b) {
  if (!l.canUseDOM || b && !("addEventListener" in document)) return !1;b = "on" + a;var c = b in document;c || (c = document.createElement("div"), c.setAttribute(b, "return;"), c = "function" === typeof c[b]);!c && Kb && "wheel" === a && (c = document.implementation.hasFeature("Events.wheel", "3.0"));return c;
}function Mb(a, b) {
  var c = {};c[a.toLowerCase()] = b.toLowerCase();c["Webkit" + a] = "webkit" + b;c["Moz" + a] = "moz" + b;c["ms" + a] = "MS" + b;c["O" + a] = "o" + b.toLowerCase();return c;
}
var Nb = { animationend: Mb("Animation", "AnimationEnd"), animationiteration: Mb("Animation", "AnimationIteration"), animationstart: Mb("Animation", "AnimationStart"), transitionend: Mb("Transition", "TransitionEnd") },
    Ob = {},
    Pb = {};l.canUseDOM && (Pb = document.createElement("div").style, "AnimationEvent" in window || (delete Nb.animationend.animation, delete Nb.animationiteration.animation, delete Nb.animationstart.animation), "TransitionEvent" in window || delete Nb.transitionend.transition);
function Qb(a) {
  if (Ob[a]) return Ob[a];if (!Nb[a]) return a;var b = Nb[a],
      c;for (c in b) {
    if (b.hasOwnProperty(c) && c in Pb) return Ob[a] = b[c];
  }return "";
}
var Rb = { topAbort: "abort", topAnimationEnd: Qb("animationend") || "animationend", topAnimationIteration: Qb("animationiteration") || "animationiteration", topAnimationStart: Qb("animationstart") || "animationstart", topBlur: "blur", topCancel: "cancel", topCanPlay: "canplay", topCanPlayThrough: "canplaythrough", topChange: "change", topClick: "click", topClose: "close", topCompositionEnd: "compositionend", topCompositionStart: "compositionstart", topCompositionUpdate: "compositionupdate", topContextMenu: "contextmenu", topCopy: "copy",
  topCut: "cut", topDoubleClick: "dblclick", topDrag: "drag", topDragEnd: "dragend", topDragEnter: "dragenter", topDragExit: "dragexit", topDragLeave: "dragleave", topDragOver: "dragover", topDragStart: "dragstart", topDrop: "drop", topDurationChange: "durationchange", topEmptied: "emptied", topEncrypted: "encrypted", topEnded: "ended", topError: "error", topFocus: "focus", topInput: "input", topKeyDown: "keydown", topKeyPress: "keypress", topKeyUp: "keyup", topLoadedData: "loadeddata", topLoad: "load", topLoadedMetadata: "loadedmetadata", topLoadStart: "loadstart",
  topMouseDown: "mousedown", topMouseMove: "mousemove", topMouseOut: "mouseout", topMouseOver: "mouseover", topMouseUp: "mouseup", topPaste: "paste", topPause: "pause", topPlay: "play", topPlaying: "playing", topProgress: "progress", topRateChange: "ratechange", topScroll: "scroll", topSeeked: "seeked", topSeeking: "seeking", topSelectionChange: "selectionchange", topStalled: "stalled", topSuspend: "suspend", topTextInput: "textInput", topTimeUpdate: "timeupdate", topToggle: "toggle", topTouchCancel: "touchcancel", topTouchEnd: "touchend", topTouchMove: "touchmove",
  topTouchStart: "touchstart", topTransitionEnd: Qb("transitionend") || "transitionend", topVolumeChange: "volumechange", topWaiting: "waiting", topWheel: "wheel" },
    Sb = {},
    Tb = 0,
    Ub = "_reactListenersID" + ("" + Math.random()).slice(2);function Vb(a) {
  Object.prototype.hasOwnProperty.call(a, Ub) || (a[Ub] = Tb++, Sb[a[Ub]] = {});return Sb[a[Ub]];
}
var M = n({}, { handleTopLevel: function handleTopLevel(a, b, c, d) {
    a = Jb.extractEvents(a, b, c, d);Jb.enqueueEvents(a);Jb.processEventQueue(!1);
  } }, { setEnabled: function setEnabled(a) {
    L && L.setEnabled(a);
  }, isEnabled: function isEnabled() {
    return !(!L || !L.isEnabled());
  }, listenTo: function listenTo(a, b) {
    var c = Vb(b);a = sa.registrationNameDependencies[a];for (var d = 0; d < a.length; d++) {
      var e = a[d];c.hasOwnProperty(e) && c[e] || ("topWheel" === e ? Lb("wheel") ? L.trapBubbledEvent("topWheel", "wheel", b) : Lb("mousewheel") ? L.trapBubbledEvent("topWheel", "mousewheel", b) : L.trapBubbledEvent("topWheel", "DOMMouseScroll", b) : "topScroll" === e ? L.trapCapturedEvent("topScroll", "scroll", b) : "topFocus" === e || "topBlur" === e ? (L.trapCapturedEvent("topFocus", "focus", b), L.trapCapturedEvent("topBlur", "blur", b), c.topBlur = !0, c.topFocus = !0) : "topCancel" === e ? (Lb("cancel", !0) && L.trapCapturedEvent("topCancel", "cancel", b), c.topCancel = !0) : "topClose" === e ? (Lb("close", !0) && L.trapCapturedEvent("topClose", "close", b), c.topClose = !0) : Rb.hasOwnProperty(e) && L.trapBubbledEvent(e, Rb[e], b), c[e] = !0);
    }
  }, isListeningToAllDependencies: function isListeningToAllDependencies(a, b) {
    b = Vb(b);a = sa.registrationNameDependencies[a];for (var c = 0; c < a.length; c++) {
      var d = a[c];if (!b.hasOwnProperty(d) || !b[d]) return !1;
    }return !0;
  }, trapBubbledEvent: function trapBubbledEvent(a, b, c) {
    return L.trapBubbledEvent(a, b, c);
  }, trapCapturedEvent: function trapCapturedEvent(a, b, c) {
    return L.trapCapturedEvent(a, b, c);
  } }),
    Wb = { animationIterationCount: !0, borderImageOutset: !0, borderImageSlice: !0, borderImageWidth: !0, boxFlex: !0, boxFlexGroup: !0, boxOrdinalGroup: !0, columnCount: !0, columns: !0, flex: !0, flexGrow: !0, flexPositive: !0, flexShrink: !0, flexNegative: !0,
  flexOrder: !0, gridRow: !0, gridRowEnd: !0, gridRowSpan: !0, gridRowStart: !0, gridColumn: !0, gridColumnEnd: !0, gridColumnSpan: !0, gridColumnStart: !0, fontWeight: !0, lineClamp: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, tabSize: !0, widows: !0, zIndex: !0, zoom: !0, fillOpacity: !0, floodOpacity: !0, stopOpacity: !0, strokeDasharray: !0, strokeDashoffset: !0, strokeMiterlimit: !0, strokeOpacity: !0, strokeWidth: !0 },
    Xb = ["Webkit", "ms", "Moz", "O"];
Object.keys(Wb).forEach(function (a) {
  Xb.forEach(function (b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);Wb[b] = Wb[a];
  });
});
var Yb = { isUnitlessNumber: Wb, shorthandPropertyExpansions: { background: { backgroundAttachment: !0, backgroundColor: !0, backgroundImage: !0, backgroundPositionX: !0, backgroundPositionY: !0, backgroundRepeat: !0 }, backgroundPosition: { backgroundPositionX: !0, backgroundPositionY: !0 }, border: { borderWidth: !0, borderStyle: !0, borderColor: !0 }, borderBottom: { borderBottomWidth: !0, borderBottomStyle: !0, borderBottomColor: !0 }, borderLeft: { borderLeftWidth: !0, borderLeftStyle: !0, borderLeftColor: !0 }, borderRight: { borderRightWidth: !0, borderRightStyle: !0,
      borderRightColor: !0 }, borderTop: { borderTopWidth: !0, borderTopStyle: !0, borderTopColor: !0 }, font: { fontStyle: !0, fontVariant: !0, fontWeight: !0, fontSize: !0, lineHeight: !0, fontFamily: !0 }, outline: { outlineWidth: !0, outlineStyle: !0, outlineColor: !0 } } },
    Zb = Yb.isUnitlessNumber,
    $b = !1;if (l.canUseDOM) {
  var ac = document.createElement("div").style;try {
    ac.font = "";
  } catch (a) {
    $b = !0;
  }
}
var bc = { createDangerousStringForStyles: function createDangerousStringForStyles() {}, setValueForStyles: function setValueForStyles(a, b) {
    a = a.style;for (var c in b) {
      if (b.hasOwnProperty(c)) {
        var d = 0 === c.indexOf("--");var e = c;var f = b[c];e = null == f || "boolean" === typeof f || "" === f ? "" : d || "number" !== typeof f || 0 === f || Zb.hasOwnProperty(e) && Zb[e] ? ("" + f).trim() : f + "px";"float" === c && (c = "cssFloat");if (d) a.setProperty(c, e);else if (e) a[c] = e;else if (d = $b && Yb.shorthandPropertyExpansions[c]) for (var g in d) {
          a[g] = "";
        } else a[c] = "";
      }
    }
  } },
    cc = new RegExp("^[" + A.ATTRIBUTE_NAME_START_CHAR + "][" + A.ATTRIBUTE_NAME_CHAR + "]*$"),
    dc = {},
    ec = {};function fc(a) {
  if (ec.hasOwnProperty(a)) return !0;if (dc.hasOwnProperty(a)) return !1;if (cc.test(a)) return ec[a] = !0;dc[a] = !0;return !1;
}
var gc = { setAttributeForID: function setAttributeForID(a, b) {
    a.setAttribute(A.ID_ATTRIBUTE_NAME, b);
  }, setAttributeForRoot: function setAttributeForRoot(a) {
    a.setAttribute(A.ROOT_ATTRIBUTE_NAME, "");
  }, getValueForProperty: function getValueForProperty() {}, getValueForAttribute: function getValueForAttribute() {}, setValueForProperty: function setValueForProperty(a, b, c) {
    var d = A.getPropertyInfo(b);if (d && A.shouldSetAttribute(b, c)) {
      var e = d.mutationMethod;e ? e(a, c) : null == c || d.hasBooleanValue && !c || d.hasNumericValue && isNaN(c) || d.hasPositiveNumericValue && 1 > c || d.hasOverloadedBooleanValue && !1 === c ? gc.deleteValueForProperty(a, b) : d.mustUseProperty ? a[d.propertyName] = c : (b = d.attributeName, (e = d.attributeNamespace) ? a.setAttributeNS(e, b, "" + c) : d.hasBooleanValue || d.hasOverloadedBooleanValue && !0 === c ? a.setAttribute(b, "") : a.setAttribute(b, "" + c));
    } else gc.setValueForAttribute(a, b, A.shouldSetAttribute(b, c) ? c : null);
  }, setValueForAttribute: function setValueForAttribute(a, b, c) {
    fc(b) && (null == c ? a.removeAttribute(b) : a.setAttribute(b, "" + c));
  }, deleteValueForAttribute: function deleteValueForAttribute(a, b) {
    a.removeAttribute(b);
  }, deleteValueForProperty: function deleteValueForProperty(a, b) {
    var c = A.getPropertyInfo(b);
    c ? (b = c.mutationMethod) ? b(a, void 0) : c.mustUseProperty ? a[c.propertyName] = c.hasBooleanValue ? !1 : "" : a.removeAttribute(c.attributeName) : a.removeAttribute(b);
  } },
    hc = gc,
    ic = Qa.ReactDebugCurrentFrame;function jc() {
  return null;
}
var kc = { current: null, phase: null, resetCurrentFiber: function resetCurrentFiber() {
    ic.getCurrentStack = null;kc.current = null;kc.phase = null;
  }, setCurrentFiber: function setCurrentFiber(a, b) {
    ic.getCurrentStack = jc;kc.current = a;kc.phase = b;
  }, getCurrentFiberOwnerName: function getCurrentFiberOwnerName() {
    return null;
  }, getCurrentFiberStackAddendum: jc },
    lc = kc,
    mc = { getHostProps: function getHostProps(a, b) {
    var c = b.value,
        d = b.checked;return n({ type: void 0, step: void 0, min: void 0, max: void 0 }, b, { defaultChecked: void 0, defaultValue: void 0, value: null != c ? c : a._wrapperState.initialValue, checked: null != d ? d : a._wrapperState.initialChecked });
  }, initWrapperState: function initWrapperState(a, b) {
    var c = b.defaultValue;a._wrapperState = { initialChecked: null != b.checked ? b.checked : b.defaultChecked, initialValue: null != b.value ? b.value : c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
  }, updateWrapper: function updateWrapper(a, b) {
    var c = b.checked;null != c && hc.setValueForProperty(a, "checked", c || !1);c = b.value;if (null != c) {
      if (0 === c && "" === a.value) a.value = "0";else if ("number" === b.type) {
        if (b = parseFloat(a.value) || 0, c != b || c == b && a.value != c) a.value = "" + c;
      } else a.value !== "" + c && (a.value = "" + c);
    } else null == b.value && null != b.defaultValue && a.defaultValue !== "" + b.defaultValue && (a.defaultValue = "" + b.defaultValue), null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
  }, postMountWrapper: function postMountWrapper(a, b) {
    switch (b.type) {case "submit":case "reset":
        break;case "color":case "date":case "datetime":case "datetime-local":case "month":case "time":case "week":
        a.value = "";a.value = a.defaultValue;break;default:
        a.value = a.value;}b = a.name;"" !== b && (a.name = "");a.defaultChecked = !a.defaultChecked;a.defaultChecked = !a.defaultChecked;"" !== b && (a.name = b);
  }, restoreControlledState: function restoreControlledState(a, b) {
    mc.updateWrapper(a, b);var c = b.name;if ("radio" === b.type && null != c) {
      for (b = a; b.parentNode;) {
        b = b.parentNode;
      }c = b.querySelectorAll("input[name\x3d" + JSON.stringify("" + c) + '][type\x3d"radio"]');for (b = 0; b < c.length; b++) {
        var d = c[b];if (d !== a && d.form === a.form) {
          var e = G.getFiberCurrentPropsFromNode(d);e ? void 0 : w("90");mc.updateWrapper(d, e);
        }
      }
    }
  } },
    qc = mc;
function rc(a) {
  var b = "";aa.Children.forEach(a, function (a) {
    null == a || "string" !== typeof a && "number" !== typeof a || (b += a);
  });return b;
}var sc = { validateProps: function validateProps() {}, postMountWrapper: function postMountWrapper(a, b) {
    null != b.value && a.setAttribute("value", b.value);
  }, getHostProps: function getHostProps(a, b) {
    a = n({ children: void 0 }, b);if (b = rc(b.children)) a.children = b;return a;
  } };
function tc(a, b, c) {
  a = a.options;if (b) {
    b = {};for (var d = 0; d < c.length; d++) {
      b["$" + c[d]] = !0;
    }for (c = 0; c < a.length; c++) {
      d = b.hasOwnProperty("$" + a[c].value), a[c].selected !== d && (a[c].selected = d);
    }
  } else {
    c = "" + c;b = null;for (d = 0; d < a.length; d++) {
      if (a[d].value === c) {
        a[d].selected = !0;return;
      }null !== b || a[d].disabled || (b = a[d]);
    }null !== b && (b.selected = !0);
  }
}
var uc = { getHostProps: function getHostProps(a, b) {
    return n({}, b, { value: void 0 });
  }, initWrapperState: function initWrapperState(a, b) {
    var c = b.value;a._wrapperState = { initialValue: null != c ? c : b.defaultValue, wasMultiple: !!b.multiple };
  }, postMountWrapper: function postMountWrapper(a, b) {
    a.multiple = !!b.multiple;var c = b.value;null != c ? tc(a, !!b.multiple, c) : null != b.defaultValue && tc(a, !!b.multiple, b.defaultValue);
  }, postUpdateWrapper: function postUpdateWrapper(a, b) {
    a._wrapperState.initialValue = void 0;var c = a._wrapperState.wasMultiple;a._wrapperState.wasMultiple = !!b.multiple;var d = b.value;
    null != d ? tc(a, !!b.multiple, d) : c !== !!b.multiple && (null != b.defaultValue ? tc(a, !!b.multiple, b.defaultValue) : tc(a, !!b.multiple, b.multiple ? [] : ""));
  }, restoreControlledState: function restoreControlledState(a, b) {
    var c = b.value;null != c && tc(a, !!b.multiple, c);
  } },
    vc = { getHostProps: function getHostProps(a, b) {
    null != b.dangerouslySetInnerHTML ? w("91") : void 0;return n({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
  }, initWrapperState: function initWrapperState(a, b) {
    var c = b.value,
        d = c;null == c && (c = b.defaultValue, b = b.children, null != b && (null != c ? w("92") : void 0, Array.isArray(b) && (1 >= b.length ? void 0 : w("93"), b = b[0]), c = "" + b), null == c && (c = ""), d = c);a._wrapperState = { initialValue: "" + d };
  }, updateWrapper: function updateWrapper(a, b) {
    var c = b.value;null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && (a.defaultValue = c));null != b.defaultValue && (a.defaultValue = b.defaultValue);
  }, postMountWrapper: function postMountWrapper(a) {
    var b = a.textContent;b === a._wrapperState.initialValue && (a.value = b);
  }, restoreControlledState: function restoreControlledState(a, b) {
    vc.updateWrapper(a, b);
  } },
    wc = vc,
    xc = n({ menuitem: !0 }, { area: !0,
  base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });function yc(a, b) {
  b && (xc[a] && (null != b.children || null != b.dangerouslySetInnerHTML ? w("137", a, "") : void 0), null != b.dangerouslySetInnerHTML && (null != b.children ? w("60") : void 0, "object" === _typeof(b.dangerouslySetInnerHTML) && "__html" in b.dangerouslySetInnerHTML ? void 0 : w("61")), null != b.style && "object" !== _typeof(b.style) ? w("62", "") : void 0);
}
function zc(a) {
  var b = a.type;return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ac(a) {
  var b = zc(a) ? "checked" : "value",
      c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b),
      d = "" + a[b];if (!a.hasOwnProperty(b) && "function" === typeof c.get && "function" === typeof c.set) return Object.defineProperty(a, b, { enumerable: c.enumerable, configurable: !0, get: function get() {
      return c.get.call(this);
    }, set: function set(a) {
      d = "" + a;c.set.call(this, a);
    } }), { getValue: function getValue() {
      return d;
    }, setValue: function setValue(a) {
      d = "" + a;
    }, stopTracking: function stopTracking() {
      a._valueTracker = null;delete a[b];
    } };
}
var Bc = { _getTrackerFromNode: function _getTrackerFromNode(a) {
    return a._valueTracker;
  }, track: function track(a) {
    a._valueTracker || (a._valueTracker = Ac(a));
  }, updateValueIfChanged: function updateValueIfChanged(a) {
    if (!a) return !1;var b = a._valueTracker;if (!b) return !0;var c = b.getValue();var d = "";a && (d = zc(a) ? a.checked ? "true" : "false" : a.value);a = d;return a !== c ? (b.setValue(a), !0) : !1;
  }, stopTracking: function stopTracking(a) {
    (a = a._valueTracker) && a.stopTracking();
  } };
function Cc(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;switch (a) {case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":
      return !1;default:
      return !0;}
}
var Dc = ka.Namespaces,
    Ec,
    Fc = function (a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function () {
      return a(b, c, d, e);
    });
  } : a;
}(function (a, b) {
  if (a.namespaceURI !== Dc.svg || "innerHTML" in a) a.innerHTML = b;else for (Ec = Ec || document.createElement("div"), Ec.innerHTML = "\x3csvg\x3e" + b + "\x3c/svg\x3e", b = Ec.firstChild; b.firstChild;) {
    a.appendChild(b.firstChild);
  }
}),
    Gc = /["'&<>]/,
    Hc = F.TEXT_NODE;
function Ic(a, b) {
  if (b) {
    var c = a.firstChild;if (c && c === a.lastChild && c.nodeType === Hc) {
      c.nodeValue = b;return;
    }
  }a.textContent = b;
}
l.canUseDOM && ("textContent" in document.documentElement || (Ic = function Ic(a, b) {
  if (a.nodeType === Hc) a.nodeValue = b;else {
    if ("boolean" === typeof b || "number" === typeof b) b = "" + b;else {
      b = "" + b;var c = Gc.exec(b);if (c) {
        var d = "",
            e,
            f = 0;for (e = c.index; e < b.length; e++) {
          switch (b.charCodeAt(e)) {case 34:
              c = "\x26quot;";break;case 38:
              c = "\x26amp;";break;case 39:
              c = "\x26#x27;";break;case 60:
              c = "\x26lt;";break;case 62:
              c = "\x26gt;";break;default:
              continue;}f !== e && (d += b.substring(f, e));f = e + 1;d += c;
        }b = f !== e ? d + b.substring(f, e) : d;
      }
    }Fc(a, b);
  }
}));
var Jc = Ic,
    Kc = lc.getCurrentFiberOwnerName,
    Lc = F.DOCUMENT_NODE,
    Mc = F.DOCUMENT_FRAGMENT_NODE,
    Nc = M.listenTo,
    Oc = sa.registrationNameModules,
    Pc = ka.Namespaces.html,
    Qc = ka.getIntrinsicNamespace;function Rc(a, b) {
  Nc(b, a.nodeType === Lc || a.nodeType === Mc ? a : a.ownerDocument);
}
var Sc = { topAbort: "abort", topCanPlay: "canplay", topCanPlayThrough: "canplaythrough", topDurationChange: "durationchange", topEmptied: "emptied", topEncrypted: "encrypted", topEnded: "ended", topError: "error", topLoadedData: "loadeddata", topLoadedMetadata: "loadedmetadata", topLoadStart: "loadstart", topPause: "pause", topPlay: "play", topPlaying: "playing", topProgress: "progress", topRateChange: "ratechange", topSeeked: "seeked", topSeeking: "seeking", topStalled: "stalled", topSuspend: "suspend", topTimeUpdate: "timeupdate", topVolumeChange: "volumechange",
  topWaiting: "waiting" },
    N = { createElement: function createElement(a, b, c, d) {
    c = c.nodeType === Lc ? c : c.ownerDocument;d === Pc && (d = Qc(a));d === Pc ? "script" === a ? (a = c.createElement("div"), a.innerHTML = "\x3cscript\x3e\x3c/script\x3e", a = a.removeChild(a.firstChild)) : a = "string" === typeof b.is ? c.createElement(a, { is: b.is }) : c.createElement(a) : a = c.createElementNS(d, a);return a;
  }, createTextNode: function createTextNode(a, b) {
    return (b.nodeType === Lc ? b : b.ownerDocument).createTextNode(a);
  }, setInitialProperties: function setInitialProperties(a, b, c, d) {
    var e = Cc(b, c);switch (b) {case "iframe":case "object":
        M.trapBubbledEvent("topLoad", "load", a);var f = c;break;case "video":case "audio":
        for (f in Sc) {
          Sc.hasOwnProperty(f) && M.trapBubbledEvent(f, Sc[f], a);
        }f = c;break;case "source":
        M.trapBubbledEvent("topError", "error", a);f = c;break;case "img":case "image":
        M.trapBubbledEvent("topError", "error", a);M.trapBubbledEvent("topLoad", "load", a);f = c;break;case "form":
        M.trapBubbledEvent("topReset", "reset", a);M.trapBubbledEvent("topSubmit", "submit", a);f = c;break;case "details":
        M.trapBubbledEvent("topToggle", "toggle", a);f = c;break;case "input":
        qc.initWrapperState(a, c);f = qc.getHostProps(a, c);M.trapBubbledEvent("topInvalid", "invalid", a);Rc(d, "onChange");break;case "option":
        sc.validateProps(a, c);f = sc.getHostProps(a, c);break;case "select":
        uc.initWrapperState(a, c);f = uc.getHostProps(a, c);M.trapBubbledEvent("topInvalid", "invalid", a);Rc(d, "onChange");break;case "textarea":
        wc.initWrapperState(a, c);f = wc.getHostProps(a, c);M.trapBubbledEvent("topInvalid", "invalid", a);Rc(d, "onChange");break;default:
        f = c;}yc(b, f, Kc);var g = f,
        h;for (h in g) {
      if (g.hasOwnProperty(h)) {
        var k = g[h];"style" === h ? bc.setValueForStyles(a, k) : "dangerouslySetInnerHTML" === h ? (k = k ? k.__html : void 0, null != k && Fc(a, k)) : "children" === h ? "string" === typeof k ? Jc(a, k) : "number" === typeof k && Jc(a, "" + k) : "suppressContentEditableWarning" !== h && (Oc.hasOwnProperty(h) ? null != k && Rc(d, h) : e ? hc.setValueForAttribute(a, h, k) : null != k && hc.setValueForProperty(a, h, k));
      }
    }switch (b) {case "input":
        Bc.track(a);qc.postMountWrapper(a, c);break;case "textarea":
        Bc.track(a);wc.postMountWrapper(a, c);break;case "option":
        sc.postMountWrapper(a, c);break;case "select":
        uc.postMountWrapper(a, c);break;default:
        "function" === typeof f.onClick && (a.onclick = ca);}
  }, diffProperties: function diffProperties(a, b, c, d, e) {
    var f = null;switch (b) {case "input":
        c = qc.getHostProps(a, c);d = qc.getHostProps(a, d);f = [];break;case "option":
        c = sc.getHostProps(a, c);d = sc.getHostProps(a, d);f = [];break;case "select":
        c = uc.getHostProps(a, c);d = uc.getHostProps(a, d);f = [];break;case "textarea":
        c = wc.getHostProps(a, c);d = wc.getHostProps(a, d);f = [];break;default:
        "function" !== typeof c.onClick && "function" === typeof d.onClick && (a.onclick = ca);}yc(b, d, Kc);
    var g, h;a = null;for (g in c) {
      if (!d.hasOwnProperty(g) && c.hasOwnProperty(g) && null != c[g]) if ("style" === g) for (h in b = c[g], b) {
        b.hasOwnProperty(h) && (a || (a = {}), a[h] = "");
      } else "dangerouslySetInnerHTML" !== g && "children" !== g && "suppressContentEditableWarning" !== g && (Oc.hasOwnProperty(g) ? f || (f = []) : (f = f || []).push(g, null));
    }for (g in d) {
      var k = d[g];b = null != c ? c[g] : void 0;if (d.hasOwnProperty(g) && k !== b && (null != k || null != b)) if ("style" === g) {
        if (b) {
          for (h in b) {
            !b.hasOwnProperty(h) || k && k.hasOwnProperty(h) || (a || (a = {}), a[h] = "");
          }for (h in k) {
            k.hasOwnProperty(h) && b[h] !== k[h] && (a || (a = {}), a[h] = k[h]);
          }
        } else a || (f || (f = []), f.push(g, a)), a = k;
      } else "dangerouslySetInnerHTML" === g ? (k = k ? k.__html : void 0, b = b ? b.__html : void 0, null != k && b !== k && (f = f || []).push(g, "" + k)) : "children" === g ? b === k || "string" !== typeof k && "number" !== typeof k || (f = f || []).push(g, "" + k) : "suppressContentEditableWarning" !== g && (Oc.hasOwnProperty(g) ? (null != k && Rc(e, g), f || b === k || (f = [])) : (f = f || []).push(g, k));
    }a && (f = f || []).push("style", a);return f;
  }, updateProperties: function updateProperties(a, b, c, d, e) {
    Cc(c, d);d = Cc(c, e);for (var f = 0; f < b.length; f += 2) {
      var g = b[f],
          h = b[f + 1];"style" === g ? bc.setValueForStyles(a, h) : "dangerouslySetInnerHTML" === g ? Fc(a, h) : "children" === g ? Jc(a, h) : d ? null != h ? hc.setValueForAttribute(a, g, h) : hc.deleteValueForAttribute(a, g) : null != h ? hc.setValueForProperty(a, g, h) : hc.deleteValueForProperty(a, g);
    }switch (c) {case "input":
        qc.updateWrapper(a, e);Bc.updateValueIfChanged(a);break;case "textarea":
        wc.updateWrapper(a, e);break;case "select":
        uc.postUpdateWrapper(a, e);}
  }, diffHydratedProperties: function diffHydratedProperties(a, b, c, d, e) {
    switch (b) {case "iframe":case "object":
        M.trapBubbledEvent("topLoad", "load", a);break;case "video":case "audio":
        for (var f in Sc) {
          Sc.hasOwnProperty(f) && M.trapBubbledEvent(f, Sc[f], a);
        }break;case "source":
        M.trapBubbledEvent("topError", "error", a);break;case "img":case "image":
        M.trapBubbledEvent("topError", "error", a);M.trapBubbledEvent("topLoad", "load", a);break;case "form":
        M.trapBubbledEvent("topReset", "reset", a);M.trapBubbledEvent("topSubmit", "submit", a);break;case "details":
        M.trapBubbledEvent("topToggle", "toggle", a);break;case "input":
        qc.initWrapperState(a, c);M.trapBubbledEvent("topInvalid", "invalid", a);Rc(e, "onChange");break;case "option":
        sc.validateProps(a, c);break;case "select":
        uc.initWrapperState(a, c);M.trapBubbledEvent("topInvalid", "invalid", a);Rc(e, "onChange");break;case "textarea":
        wc.initWrapperState(a, c), M.trapBubbledEvent("topInvalid", "invalid", a), Rc(e, "onChange");}yc(b, c, Kc);d = null;for (var g in c) {
      c.hasOwnProperty(g) && (f = c[g], "children" === g ? "string" === typeof f ? a.textContent !== f && (d = ["children", f]) : "number" === typeof f && a.textContent !== "" + f && (d = ["children", "" + f]) : Oc.hasOwnProperty(g) && null != f && Rc(e, g));
    }switch (b) {case "input":
        Bc.track(a);qc.postMountWrapper(a, c);break;case "textarea":
        Bc.track(a);wc.postMountWrapper(a, c);break;case "select":case "option":
        break;default:
        "function" === typeof c.onClick && (a.onclick = ca);}return d;
  }, diffHydratedText: function diffHydratedText(a, b) {
    return a.nodeValue !== b;
  }, warnForDeletedHydratableElement: function warnForDeletedHydratableElement() {}, warnForDeletedHydratableText: function warnForDeletedHydratableText() {}, warnForInsertedHydratedElement: function warnForInsertedHydratedElement() {}, warnForInsertedHydratedText: function warnForInsertedHydratedText() {}, restoreControlledState: function restoreControlledState(a, b, c) {
    switch (b) {case "input":
        qc.restoreControlledState(a, c);break;case "textarea":
        wc.restoreControlledState(a, c);break;case "select":
        uc.restoreControlledState(a, c);}
  } },
    Tc = void 0;
if (l.canUseDOM) {
  if ("function" !== typeof requestIdleCallback) {
    var Uc = null,
        Vc = null,
        Wc = !1,
        Xc = !1,
        Yc = 0,
        Zc = 33,
        $c = 33,
        ad = { timeRemaining: "object" === (typeof performance === "undefined" ? "undefined" : _typeof(performance)) && "function" === typeof performance.now ? function () {
        return Yc - performance.now();
      } : function () {
        return Yc - Date.now();
      } },
        bd = "__reactIdleCallback$" + Math.random().toString(36).slice(2);window.addEventListener("message", function (a) {
      a.source === window && a.data === bd && (Wc = !1, a = Vc, Vc = null, null !== a && a(ad));
    }, !1);var cd = function cd(a) {
      Xc = !1;var b = a - Yc + $c;b < $c && Zc < $c ? (8 > b && (b = 8), $c = b < Zc ? Zc : b) : Zc = b;Yc = a + $c;Wc || (Wc = !0, window.postMessage(bd, "*"));b = Uc;Uc = null;null !== b && b(a);
    };Tc = function Tc(a) {
      Vc = a;Xc || (Xc = !0, requestAnimationFrame(cd));return 0;
    };
  } else Tc = requestIdleCallback;
} else Tc = function Tc(a) {
  setTimeout(function () {
    a({ timeRemaining: function timeRemaining() {
        return Infinity;
      } });
  });return 0;
};
var dd = { rIC: Tc },
    ed = { enableAsyncSubtreeAPI: !0 },
    Q = { NoWork: 0, SynchronousPriority: 1, TaskPriority: 2, HighPriority: 3, LowPriority: 4, OffscreenPriority: 5 },
    fd = J.Callback,
    gd = Q.NoWork,
    hd = Q.SynchronousPriority,
    id = Q.TaskPriority,
    jd = E.ClassComponent,
    kd = E.HostRoot,
    md = void 0,
    nd = void 0;function od(a, b) {
  return a !== id && a !== hd || b !== id && b !== hd ? a === gd && b !== gd ? -255 : a !== gd && b === gd ? 255 : a - b : 0;
}function pd() {
  return { first: null, last: null, hasForceUpdate: !1, callbackList: null };
}
function qd(a, b, c, d) {
  null !== c ? c.next = b : (b.next = a.first, a.first = b);null !== d ? b.next = d : a.last = b;
}function rd(a, b) {
  b = b.priorityLevel;var c = null;if (null !== a.last && 0 >= od(a.last.priorityLevel, b)) c = a.last;else for (a = a.first; null !== a && 0 >= od(a.priorityLevel, b);) {
    c = a, a = a.next;
  }return c;
}
function sd(a, b) {
  var c = a.alternate,
      d = a.updateQueue;null === d && (d = a.updateQueue = pd());null !== c ? (a = c.updateQueue, null === a && (a = c.updateQueue = pd())) : a = null;md = d;nd = a !== d ? a : null;var e = md;c = nd;var f = rd(e, b),
      g = null !== f ? f.next : e.first;if (null === c) return qd(e, b, f, g), null;d = rd(c, b);a = null !== d ? d.next : c.first;qd(e, b, f, g);if (g === a && null !== g || f === d && null !== f) return null === d && (c.first = b), null === a && (c.last = null), null;b = { priorityLevel: b.priorityLevel, partialState: b.partialState, callback: b.callback, isReplace: b.isReplace,
    isForced: b.isForced, isTopLevelUnmount: b.isTopLevelUnmount, next: null };qd(c, b, d, a);return b;
}function td(a, b, c, d) {
  a = a.partialState;return "function" === typeof a ? a.call(b, c, d) : a;
}
var ud = { addUpdate: function addUpdate(a, b, c, d) {
    sd(a, { priorityLevel: d, partialState: b, callback: c, isReplace: !1, isForced: !1, isTopLevelUnmount: !1, next: null });
  }, addReplaceUpdate: function addReplaceUpdate(a, b, c, d) {
    sd(a, { priorityLevel: d, partialState: b, callback: c, isReplace: !0, isForced: !1, isTopLevelUnmount: !1, next: null });
  }, addForceUpdate: function addForceUpdate(a, b, c) {
    sd(a, { priorityLevel: c, partialState: null, callback: b, isReplace: !1, isForced: !0, isTopLevelUnmount: !1, next: null });
  }, getUpdatePriority: function getUpdatePriority(a) {
    var b = a.updateQueue;return null === b || a.tag !== jd && a.tag !== kd ? gd : null !== b.first ? b.first.priorityLevel : gd;
  }, addTopLevelUpdate: function addTopLevelUpdate(a, b, c, d) {
    var e = null === b.element;b = { priorityLevel: d, partialState: b, callback: c, isReplace: !1, isForced: !1, isTopLevelUnmount: e, next: null };a = sd(a, b);e && (e = md, c = nd, null !== e && null !== b.next && (b.next = null, e.last = b), null !== c && null !== a && null !== a.next && (a.next = null, c.last = b));
  }, beginUpdateQueue: function beginUpdateQueue(a, b, c, d, e, f, g) {
    null !== a && a.updateQueue === c && (c = b.updateQueue = { first: c.first, last: c.last, callbackList: null, hasForceUpdate: !1 });
    a = c.callbackList;for (var h = c.hasForceUpdate, k = !0, p = c.first; null !== p && 0 >= od(p.priorityLevel, g);) {
      c.first = p.next;null === c.first && (c.last = null);var x;if (p.isReplace) e = td(p, d, e, f), k = !0;else if (x = td(p, d, e, f)) e = k ? n({}, e, x) : n(e, x), k = !1;p.isForced && (h = !0);null === p.callback || p.isTopLevelUnmount && null !== p.next || (a = null !== a ? a : [], a.push(p.callback), b.effectTag |= fd);p = p.next;
    }c.callbackList = a;c.hasForceUpdate = h;null !== c.first || null !== a || h || (b.updateQueue = null);return e;
  }, commitCallbacks: function commitCallbacks(a, b, c) {
    a = b.callbackList;
    if (null !== a) for (b.callbackList = null, b = 0; b < a.length; b++) {
      var d = a[b];"function" !== typeof d ? w("191", d) : void 0;d.call(c);
    }
  } },
    vd = [],
    wd = -1,
    xd = { createCursor: function createCursor(a) {
    return { current: a };
  }, isEmpty: function isEmpty() {
    return -1 === wd;
  }, pop: function pop(a) {
    0 > wd || (a.current = vd[wd], vd[wd] = null, wd--);
  }, push: function push(a, b) {
    wd++;vd[wd] = a.current;a.current = b;
  }, reset: function reset() {
    for (; -1 < wd;) {
      vd[wd] = null, wd--;
    }
  } },
    yd = bb.isFiberMounted,
    zd = E.ClassComponent,
    Ad = E.HostRoot,
    Bd = xd.createCursor,
    Cd = xd.pop,
    Dd = xd.push,
    Ed = Bd(da),
    Fd = Bd(!1),
    Ld = da;
function Md(a, b, c) {
  a = a.stateNode;a.__reactInternalMemoizedUnmaskedChildContext = b;a.__reactInternalMemoizedMaskedChildContext = c;
}function Nd(a) {
  return a.tag === zd && null != a.type.childContextTypes;
}function Od(a, b) {
  var c = a.stateNode,
      d = a.type.childContextTypes;if ("function" !== typeof c.getChildContext) return b;c = c.getChildContext();for (var e in c) {
    e in d ? void 0 : w("108", Ra(a) || "Unknown", e);
  }return n({}, b, c);
}
var R = { getUnmaskedContext: function getUnmaskedContext(a) {
    return Nd(a) ? Ld : Ed.current;
  }, cacheContext: Md, getMaskedContext: function getMaskedContext(a, b) {
    var c = a.type.contextTypes;if (!c) return da;var d = a.stateNode;if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;var e = {},
        f;for (f in c) {
      e[f] = b[f];
    }d && Md(a, b, e);return e;
  }, hasContextChanged: function hasContextChanged() {
    return Fd.current;
  }, isContextConsumer: function isContextConsumer(a) {
    return a.tag === zd && null != a.type.contextTypes;
  }, isContextProvider: Nd, popContextProvider: function popContextProvider(a) {
    Nd(a) && (Cd(Fd, a), Cd(Ed, a));
  }, popTopLevelContextObject: function popTopLevelContextObject(a) {
    Cd(Fd, a);Cd(Ed, a);
  }, pushTopLevelContextObject: function pushTopLevelContextObject(a, b, c) {
    null != Ed.cursor ? w("168") : void 0;Dd(Ed, b, a);Dd(Fd, c, a);
  }, processChildContext: Od, pushContextProvider: function pushContextProvider(a) {
    if (!Nd(a)) return !1;var b = a.stateNode;b = b && b.__reactInternalMemoizedMergedChildContext || da;Ld = Ed.current;Dd(Ed, b, a);Dd(Fd, Fd.current, a);return !0;
  }, invalidateContextProvider: function invalidateContextProvider(a, b) {
    var c = a.stateNode;c ? void 0 : w("169");if (b) {
      var d = Od(a, Ld, !0);c.__reactInternalMemoizedMergedChildContext = d;Cd(Fd, a);Cd(Ed, a);Dd(Ed, d, a);
    } else Cd(Fd, a);Dd(Fd, b, a);
  }, resetContext: function resetContext() {
    Ld = da;Ed.current = da;Fd.current = !1;
  }, findCurrentUnmaskedContext: function findCurrentUnmaskedContext(a) {
    for (yd(a) && a.tag === zd ? void 0 : w("170"); a.tag !== Ad;) {
      if (Nd(a)) return a.stateNode.__reactInternalMemoizedMergedChildContext;(a = a["return"]) ? void 0 : w("171");
    }return a.stateNode.context;
  } },
    Pd = { NoContext: 0, AsyncUpdates: 1 },
    Qd = E.IndeterminateComponent,
    Rd = E.ClassComponent,
    Sd = E.HostRoot,
    Td = E.HostComponent,
    Ud = E.HostText,
    Vd = E.HostPortal,
    Wd = E.CoroutineComponent,
    Xd = E.YieldComponent,
    Yd = E.Fragment,
    Zd = Q.NoWork,
    $d = Pd.NoContext,
    ae = J.NoEffect;function be(a, b, c) {
  this.tag = a;this.key = b;this.stateNode = this.type = null;this.sibling = this.child = this["return"] = null;this.index = 0;this.memoizedState = this.updateQueue = this.memoizedProps = this.pendingProps = this.ref = null;this.internalContextTag = c;this.effectTag = ae;this.lastEffect = this.firstEffect = this.nextEffect = null;this.pendingWorkPriority = Zd;this.alternate = null;
}
function ce(a, b, c) {
  var d = void 0;"function" === typeof a ? (d = a.prototype && a.prototype.isReactComponent ? new be(Rd, b, c) : new be(Qd, b, c), d.type = a) : "string" === typeof a ? (d = new be(Td, b, c), d.type = a) : "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && "number" === typeof a.tag ? d = a : w("130", null == a ? a : typeof a === "undefined" ? "undefined" : _typeof(a), "");return d;
}
var de = { createWorkInProgress: function createWorkInProgress(a, b) {
    var c = a.alternate;null === c ? (c = new be(a.tag, a.key, a.internalContextTag), c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.effectTag = ae, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);c.pendingWorkPriority = b;c.child = a.child;c.memoizedProps = a.memoizedProps;c.memoizedState = a.memoizedState;c.updateQueue = a.updateQueue;c.sibling = a.sibling;c.index = a.index;c.ref = a.ref;return c;
  }, createHostRootFiber: function createHostRootFiber() {
    return new be(Sd, null, $d);
  },
  createFiberFromElement: function createFiberFromElement(a, b, c) {
    b = ce(a.type, a.key, b, null);b.pendingProps = a.props;b.pendingWorkPriority = c;return b;
  }, createFiberFromFragment: function createFiberFromFragment(a, b, c) {
    b = new be(Yd, null, b);b.pendingProps = a;b.pendingWorkPriority = c;return b;
  }, createFiberFromText: function createFiberFromText(a, b, c) {
    b = new be(Ud, null, b);b.pendingProps = a;b.pendingWorkPriority = c;return b;
  }, createFiberFromElementType: ce, createFiberFromHostInstanceForDeletion: function createFiberFromHostInstanceForDeletion() {
    var a = new be(Td, null, $d);a.type = "DELETED";return a;
  }, createFiberFromCoroutine: function createFiberFromCoroutine(a, b, c) {
    b = new be(Wd, a.key, b);b.type = a.handler;b.pendingProps = a;b.pendingWorkPriority = c;return b;
  }, createFiberFromYield: function createFiberFromYield(a, b) {
    return new be(Xd, null, b);
  }, createFiberFromPortal: function createFiberFromPortal(a, b, c) {
    b = new be(Vd, a.key, b);b.pendingProps = a.children || [];b.pendingWorkPriority = c;b.stateNode = { containerInfo: a.containerInfo, implementation: a.implementation };return b;
  }, largerPriority: function largerPriority(a, b) {
    return a !== Zd && (b === Zd || b > a) ? a : b;
  } },
    ee = de.createHostRootFiber,
    fe = E.IndeterminateComponent,
    ge = E.FunctionalComponent,
    he = E.ClassComponent,
    ie = E.HostComponent,
    je,
    ke;"function" === typeof Symbol && Symbol["for"] ? (je = Symbol["for"]("react.coroutine"), ke = Symbol["for"]("react.yield")) : (je = 60104, ke = 60105);
var le = { createCoroutine: function createCoroutine(a, b, c) {
    var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;return { $$typeof: je, key: null == d ? null : "" + d, children: a, handler: b, props: c };
  }, createYield: function createYield(a) {
    return { $$typeof: ke, value: a };
  }, isCoroutine: function isCoroutine(a) {
    return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && a.$$typeof === je;
  }, isYield: function isYield(a) {
    return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && a.$$typeof === ke;
  }, REACT_YIELD_TYPE: ke, REACT_COROUTINE_TYPE: je },
    me = "function" === typeof Symbol && Symbol["for"] && Symbol["for"]("react.portal") || 60106,
    ne = { createPortal: function createPortal(a, b, c) {
    var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;return { $$typeof: me, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
  }, isPortal: function isPortal(a) {
    return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && a.$$typeof === me;
  }, REACT_PORTAL_TYPE: me },
    oe = le.REACT_COROUTINE_TYPE,
    pe = le.REACT_YIELD_TYPE,
    qe = ne.REACT_PORTAL_TYPE,
    re = de.createWorkInProgress,
    se = de.createFiberFromElement,
    te = de.createFiberFromFragment,
    ue = de.createFiberFromText,
    ve = de.createFiberFromCoroutine,
    we = de.createFiberFromYield,
    xe = de.createFiberFromPortal,
    ye = Array.isArray,
    ze = E.FunctionalComponent,
    Ae = E.ClassComponent,
    Be = E.HostText,
    Ce = E.HostPortal,
    De = E.CoroutineComponent,
    Ee = E.YieldComponent,
    Fe = E.Fragment,
    Ge = J.NoEffect,
    He = J.Placement,
    Ie = J.Deletion,
    Je = "function" === typeof Symbol && Symbol.iterator,
    Ke = "function" === typeof Symbol && Symbol["for"] && Symbol["for"]("react.element") || 60103;
function Le(a) {
  if (null === a || "undefined" === typeof a) return null;a = Je && a[Je] || a["@@iterator"];return "function" === typeof a ? a : null;
}
function Me(a, b) {
  var c = b.ref;if (null !== c && "function" !== typeof c) {
    if (b._owner) {
      b = b._owner;var d = void 0;b && ("number" === typeof b.tag ? (b.tag !== Ae ? w("110") : void 0, d = b.stateNode) : d = b.getPublicInstance());d ? void 0 : w("147", c);var e = "" + c;if (null !== a && null !== a.ref && a.ref._stringRef === e) return a.ref;a = function a(_a) {
        var b = d.refs === da ? d.refs = {} : d.refs;null === _a ? delete b[e] : b[e] = _a;
      };a._stringRef = e;return a;
    }"string" !== typeof c ? w("148") : void 0;b._owner ? void 0 : w("149", c);
  }return c;
}
function Ne(a, b) {
  "textarea" !== a.type && w("31", "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b, "");
}
function Oe(a, b) {
  function c(c, d) {
    if (b) {
      if (!a) {
        if (null === d.alternate) return;d = d.alternate;
      }var m = c.lastEffect;null !== m ? (m.nextEffect = d, c.lastEffect = d) : c.firstEffect = c.lastEffect = d;d.nextEffect = null;d.effectTag = Ie;
    }
  }function d(a, d) {
    if (!b) return null;for (; null !== d;) {
      c(a, d), d = d.sibling;
    }return null;
  }function e(a, b) {
    for (a = new Map(); null !== b;) {
      null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
    }return a;
  }function f(b, c) {
    if (a) return b = re(b, c), b.index = 0, b.sibling = null, b;b.pendingWorkPriority = c;b.effectTag = Ge;
    b.index = 0;b.sibling = null;return b;
  }function g(a, c, d) {
    a.index = d;if (!b) return c;d = a.alternate;if (null !== d) return d = d.index, d < c ? (a.effectTag = He, c) : d;a.effectTag = He;return c;
  }function h(a) {
    b && null === a.alternate && (a.effectTag = He);return a;
  }function k(a, b, c, d) {
    if (null === b || b.tag !== Be) return c = ue(c, a.internalContextTag, d), c["return"] = a, c;b = f(b, d);b.pendingProps = c;b["return"] = a;return b;
  }function p(a, b, c, d) {
    if (null === b || b.type !== c.type) return d = se(c, a.internalContextTag, d), d.ref = Me(b, c), d["return"] = a, d;d = f(b, d);d.ref = Me(b, c);d.pendingProps = c.props;d["return"] = a;return d;
  }function x(a, b, c, d) {
    if (null === b || b.tag !== De) return c = ve(c, a.internalContextTag, d), c["return"] = a, c;b = f(b, d);b.pendingProps = c;b["return"] = a;return b;
  }function S(a, b, c, d) {
    if (null === b || b.tag !== Ee) return b = we(c, a.internalContextTag, d), b.type = c.value, b["return"] = a, b;b = f(b, d);b.type = c.value;b["return"] = a;return b;
  }function D(a, b, c, d) {
    if (null === b || b.tag !== Ce || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return c = xe(c, a.internalContextTag, d), c["return"] = a, c;b = f(b, d);b.pendingProps = c.children || [];b["return"] = a;return b;
  }function y(a, b, c, d) {
    if (null === b || b.tag !== Fe) return c = te(c, a.internalContextTag, d), c["return"] = a, c;b = f(b, d);b.pendingProps = c;b["return"] = a;return b;
  }function B(a, b, c) {
    if ("string" === typeof b || "number" === typeof b) return b = ue("" + b, a.internalContextTag, c), b["return"] = a, b;if ("object" === (typeof b === "undefined" ? "undefined" : _typeof(b)) && null !== b) {
      switch (b.$$typeof) {case Ke:
          return c = se(b, a.internalContextTag, c), c.ref = Me(null, b), c["return"] = a, c;case oe:
          return b = ve(b, a.internalContextTag, c), b["return"] = a, b;case pe:
          return c = we(b, a.internalContextTag, c), c.type = b.value, c["return"] = a, c;case qe:
          return b = xe(b, a.internalContextTag, c), b["return"] = a, b;}if (ye(b) || Le(b)) return b = te(b, a.internalContextTag, c), b["return"] = a, b;Ne(a, b);
    }return null;
  }function H(a, b, c, d) {
    var e = null !== b ? b.key : null;if ("string" === typeof c || "number" === typeof c) return null !== e ? null : k(a, b, "" + c, d);if ("object" === (typeof c === "undefined" ? "undefined" : _typeof(c)) && null !== c) {
      switch (c.$$typeof) {case Ke:
          return c.key === e ? p(a, b, c, d) : null;case oe:
          return c.key === e ? x(a, b, c, d) : null;case pe:
          return null === e ? S(a, b, c, d) : null;case qe:
          return c.key === e ? D(a, b, c, d) : null;}if (ye(c) || Le(c)) return null !== e ? null : y(a, b, c, d);Ne(a, c);
    }return null;
  }function C(a, b, c, d, e) {
    if ("string" === typeof d || "number" === typeof d) return a = a.get(c) || null, k(b, a, "" + d, e);if ("object" === (typeof d === "undefined" ? "undefined" : _typeof(d)) && null !== d) {
      switch (d.$$typeof) {case Ke:
          return a = a.get(null === d.key ? c : d.key) || null, p(b, a, d, e);case oe:
          return a = a.get(null === d.key ? c : d.key) || null, x(b, a, d, e);case pe:
          return a = a.get(c) || null, S(b, a, d, e);case qe:
          return a = a.get(null === d.key ? c : d.key) || null, D(b, a, d, e);}if (ye(d) || Le(d)) return a = a.get(c) || null, y(b, a, d, e);Ne(b, d);
    }return null;
  }function Ca(a, f, h, k) {
    for (var m = null, t = null, q = f, r = f = 0, p = null; null !== q && r < h.length; r++) {
      q.index > r ? (p = q, q = null) : p = q.sibling;var v = H(a, q, h[r], k);if (null === v) {
        null === q && (q = p);break;
      }b && q && null === v.alternate && c(a, q);f = g(v, f, r);null === t ? m = v : t.sibling = v;t = v;q = p;
    }if (r === h.length) return d(a, q), m;if (null === q) {
      for (; r < h.length; r++) {
        if (q = B(a, h[r], k)) f = g(q, f, r), null === t ? m = q : t.sibling = q, t = q;
      }return m;
    }for (q = e(a, q); r < h.length; r++) {
      if (p = C(q, a, r, h[r], k)) {
        if (b && null !== p.alternate) q["delete"](null === p.key ? r : p.key);f = g(p, f, r);null === t ? m = p : t.sibling = p;t = p;
      }
    }b && q.forEach(function (b) {
      return c(a, b);
    });return m;
  }function r(a, f, h, r) {
    var m = Le(h);"function" !== typeof m ? w("150") : void 0;h = m.call(h);null == h ? w("151") : void 0;for (var t = m = null, q = f, k = f = 0, p = null, v = h.next(); null !== q && !v.done; k++, v = h.next()) {
      q.index > k ? (p = q, q = null) : p = q.sibling;var V = H(a, q, v.value, r);if (null === V) {
        q || (q = p);break;
      }b && q && null === V.alternate && c(a, q);f = g(V, f, k);null === t ? m = V : t.sibling = V;t = V;q = p;
    }if (v.done) return d(a, q), m;if (null === q) {
      for (; !v.done; k++, v = h.next()) {
        v = B(a, v.value, r), null !== v && (f = g(v, f, k), null === t ? m = v : t.sibling = v, t = v);
      }return m;
    }for (q = e(a, q); !v.done; k++, v = h.next()) {
      if (v = C(q, a, k, v.value, r), null !== v) {
        if (b && null !== v.alternate) q["delete"](null === v.key ? k : v.key);f = g(v, f, k);null === t ? m = v : t.sibling = v;t = v;
      }
    }b && q.forEach(function (b) {
      return c(a, b);
    });return m;
  }return function (a, b, e, g) {
    var m = "object" === (typeof e === "undefined" ? "undefined" : _typeof(e)) && null !== e;if (m) switch (e.$$typeof) {case Ke:
        a: {
          var C = e.key;for (m = b; null !== m;) {
            if (m.key === C) {
              if (m.type === e.type) {
                d(a, m.sibling);b = f(m, g);b.ref = Me(m, e);b.pendingProps = e.props;b["return"] = a;a = b;break a;
              } else {
                d(a, m);break;
              }
            } else c(a, m);m = m.sibling;
          }g = se(e, a.internalContextTag, g);g.ref = Me(b, e);g["return"] = a;a = g;
        }return h(a);case oe:
        a: {
          for (m = e.key; null !== b;) {
            if (b.key === m) {
              if (b.tag === De) {
                d(a, b.sibling);b = f(b, g);b.pendingProps = e;b["return"] = a;a = b;break a;
              } else {
                d(a, b);break;
              }
            } else c(a, b);b = b.sibling;
          }e = ve(e, a.internalContextTag, g);e["return"] = a;a = e;
        }return h(a);case pe:
        a: {
          if (null !== b) if (b.tag === Ee) {
            d(a, b.sibling);b = f(b, g);b.type = e.value;b["return"] = a;a = b;break a;
          } else d(a, b);b = we(e, a.internalContextTag, g);b.type = e.value;b["return"] = a;a = b;
        }return h(a);case qe:
        a: {
          for (m = e.key; null !== b;) {
            if (b.key === m) {
              if (b.tag === Ce && b.stateNode.containerInfo === e.containerInfo && b.stateNode.implementation === e.implementation) {
                d(a, b.sibling);b = f(b, g);b.pendingProps = e.children || [];b["return"] = a;a = b;break a;
              } else {
                d(a, b);break;
              }
            } else c(a, b);b = b.sibling;
          }e = xe(e, a.internalContextTag, g);e["return"] = a;a = e;
        }return h(a);}if ("string" === typeof e || "number" === typeof e) return e = "" + e, null !== b && b.tag === Be ? (d(a, b.sibling), b = f(b, g), b.pendingProps = e, b["return"] = a, a = b) : (d(a, b), e = ue(e, a.internalContextTag, g), e["return"] = a, a = e), h(a);if (ye(e)) return Ca(a, b, e, g);if (Le(e)) return r(a, b, e, g);m && Ne(a, e);if ("undefined" === typeof e) switch (a.tag) {case Ae:case ze:
        e = a.type, w("152", e.displayName || e.name || "Component");}return d(a, b);
  };
}
var Pe = Oe(!0, !0),
    Qe = Oe(!1, !0),
    Re = Oe(!1, !1),
    Se = { reconcileChildFibers: Pe, reconcileChildFibersInPlace: Qe, mountChildFibersInPlace: Re, cloneChildFibers: function cloneChildFibers(a, b) {
    null !== a && b.child !== a.child ? w("153") : void 0;if (null !== b.child) {
      a = b.child;var c = re(a, a.pendingWorkPriority);c.pendingProps = a.pendingProps;b.child = c;for (c["return"] = b; null !== a.sibling;) {
        a = a.sibling, c = c.sibling = re(a, a.pendingWorkPriority), c.pendingProps = a.pendingProps, c["return"] = b;
      }c.sibling = null;
    }
  } },
    Te = J.Update,
    Ue = Pd.AsyncUpdates,
    Ve = R.cacheContext,
    We = R.getMaskedContext,
    Xe = R.getUnmaskedContext,
    Ye = R.isContextConsumer,
    Ze = ud.addUpdate,
    $e = ud.addReplaceUpdate,
    af = ud.addForceUpdate,
    bf = ud.beginUpdateQueue,
    cf = R.hasContextChanged,
    df = bb.isMounted;
function ef(a, b, c, d) {
  function e(a, b) {
    b.updater = f;a.stateNode = b;Pa.set(b, a);
  }var f = { isMounted: df, enqueueSetState: function enqueueSetState(c, d, e) {
      c = Pa.get(c);var f = b(c, !1);Ze(c, d, void 0 === e ? null : e, f);a(c, f);
    }, enqueueReplaceState: function enqueueReplaceState(c, d, e) {
      c = Pa.get(c);var f = b(c, !1);$e(c, d, void 0 === e ? null : e, f);a(c, f);
    }, enqueueForceUpdate: function enqueueForceUpdate(c, d) {
      c = Pa.get(c);var e = b(c, !1);af(c, void 0 === d ? null : d, e);a(c, e);
    } };return { adoptClassInstance: e, constructClassInstance: function constructClassInstance(a, b) {
      var c = a.type,
          d = Xe(a),
          f = Ye(a),
          g = f ? We(a, d) : da;b = new c(b, g);
      e(a, b);f && Ve(a, d, g);return b;
    }, mountClassInstance: function mountClassInstance(a, b) {
      var c = a.alternate,
          d = a.stateNode,
          e = d.state || null,
          g = a.pendingProps;g ? void 0 : w("158");var h = Xe(a);d.props = g;d.state = e;d.refs = da;d.context = We(a, h);ed.enableAsyncSubtreeAPI && null != a.type && null != a.type.prototype && !0 === a.type.prototype.unstable_isAsyncReactComponent && (a.internalContextTag |= Ue);"function" === typeof d.componentWillMount && (h = d.state, d.componentWillMount(), h !== d.state && f.enqueueReplaceState(d, d.state, null), h = a.updateQueue, null !== h && (d.state = bf(c, a, h, d, e, g, b)));"function" === typeof d.componentDidMount && (a.effectTag |= Te);
    }, updateClassInstance: function updateClassInstance(a, b, e) {
      var g = b.stateNode;g.props = b.memoizedProps;g.state = b.memoizedState;var h = b.memoizedProps,
          k = b.pendingProps;k || (k = h, null == k ? w("159") : void 0);var D = g.context,
          y = Xe(b);y = We(b, y);"function" !== typeof g.componentWillReceiveProps || h === k && D === y || (D = g.state, g.componentWillReceiveProps(k, y), g.state !== D && f.enqueueReplaceState(g, g.state, null));D = b.memoizedState;e = null !== b.updateQueue ? bf(a, b, b.updateQueue, g, D, k, e) : D;if (!(h !== k || D !== e || cf() || null !== b.updateQueue && b.updateQueue.hasForceUpdate)) return "function" !== typeof g.componentDidUpdate || h === a.memoizedProps && D === a.memoizedState || (b.effectTag |= Te), !1;var B = k;if (null === h || null !== b.updateQueue && b.updateQueue.hasForceUpdate) B = !0;else {
        var H = b.stateNode,
            C = b.type;B = "function" === typeof H.shouldComponentUpdate ? H.shouldComponentUpdate(B, e, y) : C.prototype && C.prototype.isPureReactComponent ? !ea(h, B) || !ea(D, e) : !0;
      }B ? ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(k, e, y), "function" === typeof g.componentDidUpdate && (b.effectTag |= Te)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && D === a.memoizedState || (b.effectTag |= Te), c(b, k), d(b, e));g.props = k;g.state = e;g.context = y;return B;
    } };
}
var ff = Se.mountChildFibersInPlace,
    gf = Se.reconcileChildFibers,
    hf = Se.reconcileChildFibersInPlace,
    jf = Se.cloneChildFibers,
    kf = ud.beginUpdateQueue,
    lf = R.getMaskedContext,
    mf = R.getUnmaskedContext,
    nf = R.hasContextChanged,
    of = R.pushContextProvider,
    pf = R.pushTopLevelContextObject,
    qf = R.invalidateContextProvider,
    rf = E.IndeterminateComponent,
    sf = E.FunctionalComponent,
    tf = E.ClassComponent,
    uf = E.HostRoot,
    wf = E.HostComponent,
    xf = E.HostText,
    yf = E.HostPortal,
    zf = E.CoroutineComponent,
    Af = E.CoroutineHandlerPhase,
    Bf = E.YieldComponent,
    Cf = E.Fragment,
    Df = Q.NoWork,
    Ef = Q.OffscreenPriority,
    Ff = J.PerformedWork,
    Gf = J.Placement,
    Hf = J.ContentReset,
    If = J.Err,
    Jf = J.Ref,
    Kf = Qa.ReactCurrentOwner;
function Lf(a, b, c, d, e) {
  function f(a, b, c) {
    g(a, b, c, b.pendingWorkPriority);
  }function g(a, b, c, d) {
    b.child = null === a ? ff(b, b.child, c, d) : a.child === b.child ? gf(b, b.child, c, d) : hf(b, b.child, c, d);
  }function h(a, b) {
    var c = b.ref;null === c || a && a.ref === c || (b.effectTag |= Jf);
  }function k(a, b, c, d) {
    h(a, b);if (!c) return d && qf(b, !1), x(a, b);c = b.stateNode;Kf.current = b;var e = c.render();b.effectTag |= Ff;f(a, b, e);b.memoizedState = c.state;b.memoizedProps = c.props;d && qf(b, !0);return b.child;
  }function p(a) {
    var b = a.stateNode;b.pendingContext ? pf(a, b.pendingContext, b.pendingContext !== b.context) : b.context && pf(a, b.context, !1);C(a, b.containerInfo);
  }function x(a, b) {
    jf(a, b);return b.child;
  }function S(a, b) {
    switch (b.tag) {case uf:
        p(b);break;case tf:
        of(b);break;case yf:
        C(b, b.stateNode.containerInfo);}return null;
  }var D = a.shouldSetTextContent,
      y = a.useSyncScheduling,
      B = a.shouldDeprioritizeSubtree,
      H = b.pushHostContext,
      C = b.pushHostContainer,
      Ca = c.enterHydrationState,
      r = c.resetHydrationState,
      m = c.tryToClaimNextHydratableInstance;a = ef(d, e, function (a, b) {
    a.memoizedProps = b;
  }, function (a, b) {
    a.memoizedState = b;
  });var t = a.adoptClassInstance,
      v = a.constructClassInstance,
      V = a.mountClassInstance,
      ld = a.updateClassInstance;return { beginWork: function beginWork(a, b, c) {
      if (b.pendingWorkPriority === Df || b.pendingWorkPriority > c) return S(a, b);switch (b.tag) {case rf:
          null !== a ? w("155") : void 0;var d = b.type,
              e = b.pendingProps,
              g = mf(b);g = lf(b, g);d = d(e, g);b.effectTag |= Ff;"object" === (typeof d === "undefined" ? "undefined" : _typeof(d)) && null !== d && "function" === typeof d.render ? (b.tag = tf, e = of(b), t(b, d), V(b, c), b = k(a, b, !0, e)) : (b.tag = sf, f(a, b, d), b.memoizedProps = e, b = b.child);return b;case sf:
          a: {
            e = b.type;c = b.pendingProps;d = b.memoizedProps;if (nf()) null === c && (c = d);else if (null === c || d === c) {
              b = x(a, b);break a;
            }d = mf(b);d = lf(b, d);e = e(c, d);b.effectTag |= Ff;f(a, b, e);b.memoizedProps = c;b = b.child;
          }return b;case tf:
          return e = of(b), d = void 0, null === a ? b.stateNode ? w("153") : (v(b, b.pendingProps), V(b, c), d = !0) : d = ld(a, b, c), k(a, b, d, e);case uf:
          return p(b), d = b.updateQueue, null !== d ? (e = b.memoizedState, d = kf(a, b, d, null, e, null, c), e === d ? (r(), b = x(a, b)) : (e = d.element, null !== a && null !== a.child || !Ca(b) ? (r(), f(a, b, e)) : (b.effectTag |= Gf, b.child = ff(b, b.child, e, c)), b.memoizedState = d, b = b.child)) : (r(), b = x(a, b)), b;case wf:
          H(b);null === a && m(b);e = b.type;var q = b.memoizedProps;d = b.pendingProps;null === d && (d = q, null === d ? w("154") : void 0);g = null !== a ? a.memoizedProps : null;nf() || null !== d && q !== d ? (q = d.children, D(e, d) ? q = null : g && D(e, g) && (b.effectTag |= Hf), h(a, b), c !== Ef && !y && B(e, d) ? (b.pendingWorkPriority = Ef, b = null) : (f(a, b, q), b.memoizedProps = d, b = b.child)) : b = x(a, b);return b;case xf:
          return null === a && m(b), a = b.pendingProps, null === a && (a = b.memoizedProps), b.memoizedProps = a, null;case Af:
          b.tag = zf;case zf:
          c = b.pendingProps;if (nf()) null === c && (c = a && a.memoizedProps, null === c ? w("154") : void 0);else if (null === c || b.memoizedProps === c) c = b.memoizedProps;e = c.children;d = b.pendingWorkPriority;b.stateNode = null === a ? ff(b, b.stateNode, e, d) : a.child === b.child ? gf(b, b.stateNode, e, d) : hf(b, b.stateNode, e, d);b.memoizedProps = c;return b.stateNode;case Bf:
          return null;case yf:
          a: {
            C(b, b.stateNode.containerInfo);c = b.pendingWorkPriority;e = b.pendingProps;if (nf()) null === e && (e = a && a.memoizedProps, null == e ? w("154") : void 0);else if (null === e || b.memoizedProps === e) {
              b = x(a, b);break a;
            }null === a ? b.child = hf(b, b.child, e, c) : f(a, b, e);b.memoizedProps = e;b = b.child;
          }return b;case Cf:
          a: {
            c = b.pendingProps;if (nf()) null === c && (c = b.memoizedProps);else if (null === c || b.memoizedProps === c) {
              b = x(a, b);break a;
            }f(a, b, c);b.memoizedProps = c;b = b.child;
          }return b;default:
          w("156");}
    }, beginFailedWork: function beginFailedWork(a, b, c) {
      switch (b.tag) {case tf:
          of(b);break;case uf:
          p(b);break;default:
          w("157");}b.effectTag |= If;null === a ? b.child = null : b.child !== a.child && (b.child = a.child);if (b.pendingWorkPriority === Df || b.pendingWorkPriority > c) return S(a, b);b.firstEffect = null;b.lastEffect = null;g(a, b, null, c);b.tag === tf && (a = b.stateNode, b.memoizedProps = a.props, b.memoizedState = a.state);return b.child;
    } };
}
var Mf = Se.reconcileChildFibers,
    Nf = R.popContextProvider,
    Of = R.popTopLevelContextObject,
    Pf = E.IndeterminateComponent,
    Qf = E.FunctionalComponent,
    Rf = E.ClassComponent,
    Sf = E.HostRoot,
    Tf = E.HostComponent,
    Uf = E.HostText,
    Vf = E.HostPortal,
    Wf = E.CoroutineComponent,
    Xf = E.CoroutineHandlerPhase,
    Yf = E.YieldComponent,
    Zf = E.Fragment,
    ag = J.Placement,
    bg = J.Ref,
    cg = J.Update,
    dg = Q.OffscreenPriority;
function eg(a, b, c) {
  var d = a.createInstance,
      e = a.createTextInstance,
      f = a.appendInitialChild,
      g = a.finalizeInitialChildren,
      h = a.prepareUpdate,
      k = b.getRootHostContainer,
      p = b.popHostContext,
      x = b.getHostContext,
      S = b.popHostContainer,
      D = c.prepareToHydrateHostInstance,
      y = c.prepareToHydrateHostTextInstance,
      B = c.popHydrationState;return { completeWork: function completeWork(a, b, c) {
      var r = b.pendingProps;if (null === r) r = b.memoizedProps;else if (b.pendingWorkPriority !== dg || c === dg) b.pendingProps = null;switch (b.tag) {case Qf:
          return null;case Rf:
          return Nf(b), null;case Sf:
          S(b);Of(b);r = b.stateNode;r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null);if (null === a || null === a.child) B(b), b.effectTag &= ~ag;return null;case Tf:
          p(b);c = k();var m = b.type;if (null !== a && null != b.stateNode) {
            var t = a.memoizedProps,
                C = b.stateNode,
                V = x();r = h(C, m, t, r, c, V);if (b.updateQueue = r) b.effectTag |= cg;a.ref !== b.ref && (b.effectTag |= bg);
          } else {
            if (!r) return null === b.stateNode ? w("166") : void 0, null;a = x();if (B(b)) D(b, c, a) && (b.effectTag |= cg);else {
              a = d(m, r, c, a, b);a: for (t = b.child; null !== t;) {
                if (t.tag === Tf || t.tag === Uf) f(a, t.stateNode);else if (t.tag !== Vf && null !== t.child) {
                  t = t.child;continue;
                }if (t === b) break a;for (; null === t.sibling;) {
                  if (null === t["return"] || t["return"] === b) break a;t = t["return"];
                }t = t.sibling;
              }g(a, m, r, c) && (b.effectTag |= cg);b.stateNode = a;
            }null !== b.ref && (b.effectTag |= bg);
          }return null;case Uf:
          if (a && null != b.stateNode) a.memoizedProps !== r && (b.effectTag |= cg);else {
            if ("string" !== typeof r) return null === b.stateNode ? w("166") : void 0, null;a = k();c = x();B(b) ? y(b) && (b.effectTag |= cg) : b.stateNode = e(r, a, c, b);
          }return null;case Wf:
          (r = b.memoizedProps) ? void 0 : w("165");b.tag = Xf;c = [];a: for ((m = b.stateNode) && (m["return"] = b); null !== m;) {
            if (m.tag === Tf || m.tag === Uf || m.tag === Vf) w("164");else if (m.tag === Yf) c.push(m.type);else if (null !== m.child) {
              m.child["return"] = m;m = m.child;continue;
            }for (; null === m.sibling;) {
              if (null === m["return"] || m["return"] === b) break a;m = m["return"];
            }m.sibling["return"] = m["return"];m = m.sibling;
          }m = r.handler;r = m(r.props, c);b.child = Mf(b, null !== a ? a.child : null, r, b.pendingWorkPriority);return b.child;
        case Xf:
          return b.tag = Wf, null;case Yf:
          return null;case Zf:
          return null;case Vf:
          return b.effectTag |= cg, S(b), null;case Pf:
          w("167");default:
          w("156");}
    } };
}var fg = null,
    gg = null;function hg(a) {
  return function (b) {
    try {
      return a(b);
    } catch (c) {}
  };
}
var ig = { injectInternals: function injectInternals(a) {
    if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;if (!b.supportsFiber) return !0;try {
      var c = b.inject(a);fg = hg(function (a) {
        return b.onCommitFiberRoot(c, a);
      });gg = hg(function (a) {
        return b.onCommitFiberUnmount(c, a);
      });
    } catch (d) {}return !0;
  }, onCommitRoot: function onCommitRoot(a) {
    "function" === typeof fg && fg(a);
  }, onCommitUnmount: function onCommitUnmount(a) {
    "function" === typeof gg && gg(a);
  } },
    jg = E.ClassComponent,
    kg = E.HostRoot,
    lg = E.HostComponent,
    mg = E.HostText,
    ng = E.HostPortal,
    og = E.CoroutineComponent,
    pg = ud.commitCallbacks,
    qg = ig.onCommitUnmount,
    rg = J.Placement,
    sg = J.Update,
    tg = J.Callback,
    ug = J.ContentReset;
function vg(a, b) {
  function c(a) {
    var c = a.ref;if (null !== c) try {
      c(null);
    } catch (t) {
      b(a, t);
    }
  }function d(a) {
    return a.tag === lg || a.tag === kg || a.tag === ng;
  }function e(a) {
    for (var b = a;;) {
      if (g(b), null !== b.child && b.tag !== ng) b.child["return"] = b, b = b.child;else {
        if (b === a) break;for (; null === b.sibling;) {
          if (null === b["return"] || b["return"] === a) return;b = b["return"];
        }b.sibling["return"] = b["return"];b = b.sibling;
      }
    }
  }function f(a) {
    for (var b = a, c = !1, d = void 0, f = void 0;;) {
      if (!c) {
        c = b["return"];a: for (;;) {
          null === c ? w("160") : void 0;switch (c.tag) {case lg:
              d = c.stateNode;f = !1;break a;case kg:
              d = c.stateNode.containerInfo;f = !0;break a;case ng:
              d = c.stateNode.containerInfo;f = !0;break a;}c = c["return"];
        }c = !0;
      }if (b.tag === lg || b.tag === mg) e(b), f ? C(d, b.stateNode) : H(d, b.stateNode);else if (b.tag === ng ? d = b.stateNode.containerInfo : g(b), null !== b.child) {
        b.child["return"] = b;b = b.child;continue;
      }if (b === a) break;for (; null === b.sibling;) {
        if (null === b["return"] || b["return"] === a) return;b = b["return"];b.tag === ng && (c = !1);
      }b.sibling["return"] = b["return"];b = b.sibling;
    }
  }function g(a) {
    "function" === typeof qg && qg(a);switch (a.tag) {case jg:
        c(a);var d = a.stateNode;if ("function" === typeof d.componentWillUnmount) try {
          d.props = a.memoizedProps, d.state = a.memoizedState, d.componentWillUnmount();
        } catch (t) {
          b(a, t);
        }break;case lg:
        c(a);break;case og:
        e(a.stateNode);break;case ng:
        f(a);}
  }var h = a.commitMount,
      k = a.commitUpdate,
      p = a.resetTextContent,
      x = a.commitTextUpdate,
      S = a.appendChild,
      D = a.appendChildToContainer,
      y = a.insertBefore,
      B = a.insertInContainerBefore,
      H = a.removeChild,
      C = a.removeChildFromContainer,
      Ca = a.getPublicInstance;
  return { commitPlacement: function commitPlacement(a) {
      a: {
        for (var b = a["return"]; null !== b;) {
          if (d(b)) {
            var c = b;break a;
          }b = b["return"];
        }w("160");c = void 0;
      }var e = b = void 0;switch (c.tag) {case lg:
          b = c.stateNode;e = !1;break;case kg:
          b = c.stateNode.containerInfo;e = !0;break;case ng:
          b = c.stateNode.containerInfo;e = !0;break;default:
          w("161");}c.effectTag & ug && (p(b), c.effectTag &= ~ug);a: b: for (c = a;;) {
        for (; null === c.sibling;) {
          if (null === c["return"] || d(c["return"])) {
            c = null;break a;
          }c = c["return"];
        }c.sibling["return"] = c["return"];for (c = c.sibling; c.tag !== lg && c.tag !== mg;) {
          if (c.effectTag & rg) continue b;if (null === c.child || c.tag === ng) continue b;else c.child["return"] = c, c = c.child;
        }if (!(c.effectTag & rg)) {
          c = c.stateNode;break a;
        }
      }for (var f = a;;) {
        if (f.tag === lg || f.tag === mg) c ? e ? B(b, f.stateNode, c) : y(b, f.stateNode, c) : e ? D(b, f.stateNode) : S(b, f.stateNode);else if (f.tag !== ng && null !== f.child) {
          f.child["return"] = f;f = f.child;continue;
        }if (f === a) break;for (; null === f.sibling;) {
          if (null === f["return"] || f["return"] === a) return;f = f["return"];
        }f.sibling["return"] = f["return"];f = f.sibling;
      }
    },
    commitDeletion: function commitDeletion(a) {
      f(a);a["return"] = null;a.child = null;a.alternate && (a.alternate.child = null, a.alternate["return"] = null);
    }, commitWork: function commitWork(a, b) {
      switch (b.tag) {case jg:
          break;case lg:
          var c = b.stateNode;if (null != c) {
            var d = b.memoizedProps;a = null !== a ? a.memoizedProps : d;var e = b.type,
                f = b.updateQueue;b.updateQueue = null;null !== f && k(c, f, e, a, d, b);
          }break;case mg:
          null === b.stateNode ? w("162") : void 0;c = b.memoizedProps;x(b.stateNode, null !== a ? a.memoizedProps : c, c);break;case kg:
          break;case ng:
          break;default:
          w("163");}
    },
    commitLifeCycles: function commitLifeCycles(a, b) {
      switch (b.tag) {case jg:
          var c = b.stateNode;if (b.effectTag & sg) if (null === a) c.props = b.memoizedProps, c.state = b.memoizedState, c.componentDidMount();else {
            var d = a.memoizedProps;a = a.memoizedState;c.props = b.memoizedProps;c.state = b.memoizedState;c.componentDidUpdate(d, a);
          }b.effectTag & tg && null !== b.updateQueue && pg(b, b.updateQueue, c);break;case kg:
          a = b.updateQueue;null !== a && pg(b, a, b.child && b.child.stateNode);break;case lg:
          c = b.stateNode;null === a && b.effectTag & sg && h(c, b.type, b.memoizedProps, b);break;case mg:
          break;case ng:
          break;default:
          w("163");}
    }, commitAttachRef: function commitAttachRef(a) {
      var b = a.ref;if (null !== b) {
        var c = a.stateNode;switch (a.tag) {case lg:
            b(Ca(c));break;default:
            b(c);}
      }
    }, commitDetachRef: function commitDetachRef(a) {
      a = a.ref;null !== a && a(null);
    } };
}var wg = xd.createCursor,
    xg = xd.pop,
    yg = xd.push,
    zg = {};
function Ag(a) {
  function b(a) {
    a === zg ? w("174") : void 0;return a;
  }var c = a.getChildHostContext,
      d = a.getRootHostContext,
      e = wg(zg),
      f = wg(zg),
      g = wg(zg);return { getHostContext: function getHostContext() {
      return b(e.current);
    }, getRootHostContainer: function getRootHostContainer() {
      return b(g.current);
    }, popHostContainer: function popHostContainer(a) {
      xg(e, a);xg(f, a);xg(g, a);
    }, popHostContext: function popHostContext(a) {
      f.current === a && (xg(e, a), xg(f, a));
    }, pushHostContainer: function pushHostContainer(a, b) {
      yg(g, b, a);b = d(b);yg(f, a, a);yg(e, b, a);
    }, pushHostContext: function pushHostContext(a) {
      var d = b(g.current),
          h = b(e.current);d = c(h, a.type, d);h !== d && (yg(f, a, a), yg(e, d, a));
    }, resetHostContainer: function resetHostContainer() {
      e.current = zg;g.current = zg;
    } };
}var Bg = E.HostComponent,
    Cg = E.HostText,
    Dg = E.HostRoot,
    Eg = J.Deletion,
    Fg = J.Placement,
    Gg = de.createFiberFromHostInstanceForDeletion;
function Hg(a) {
  function b(a, b) {
    var c = Gg();c.stateNode = b;c["return"] = a;c.effectTag = Eg;null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
  }function c(a, b) {
    switch (a.tag) {case Bg:
        return f(b, a.type, a.pendingProps);case Cg:
        return g(b, a.pendingProps);default:
        return !1;}
  }function d(a) {
    for (a = a["return"]; null !== a && a.tag !== Bg && a.tag !== Dg;) {
      a = a["return"];
    }y = a;
  }var e = a.shouldSetTextContent,
      f = a.canHydrateInstance,
      g = a.canHydrateTextInstance,
      h = a.getNextHydratableSibling,
      k = a.getFirstHydratableChild,
      p = a.hydrateInstance,
      x = a.hydrateTextInstance,
      S = a.didNotHydrateInstance,
      D = a.didNotFindHydratableInstance;a = a.didNotFindHydratableTextInstance;if (!(f && g && h && k && p && x && S && D && a)) return { enterHydrationState: function enterHydrationState() {
      return !1;
    }, resetHydrationState: function resetHydrationState() {}, tryToClaimNextHydratableInstance: function tryToClaimNextHydratableInstance() {}, prepareToHydrateHostInstance: function prepareToHydrateHostInstance() {
      w("175");
    }, prepareToHydrateHostTextInstance: function prepareToHydrateHostTextInstance() {
      w("176");
    }, popHydrationState: function popHydrationState() {
      return !1;
    } };var y = null,
      B = null,
      H = !1;return { enterHydrationState: function enterHydrationState(a) {
      B = k(a.stateNode.containerInfo);y = a;return H = !0;
    }, resetHydrationState: function resetHydrationState() {
      B = y = null;H = !1;
    }, tryToClaimNextHydratableInstance: function tryToClaimNextHydratableInstance(a) {
      if (H) {
        var d = B;if (d) {
          if (!c(a, d)) {
            d = h(d);if (!d || !c(a, d)) {
              a.effectTag |= Fg;H = !1;y = a;return;
            }b(y, B);
          }a.stateNode = d;y = a;B = k(d);
        } else a.effectTag |= Fg, H = !1, y = a;
      }
    }, prepareToHydrateHostInstance: function prepareToHydrateHostInstance(a, b, c) {
      b = p(a.stateNode, a.type, a.memoizedProps, b, c, a);a.updateQueue = b;return null !== b ? !0 : !1;
    }, prepareToHydrateHostTextInstance: function prepareToHydrateHostTextInstance(a) {
      return x(a.stateNode, a.memoizedProps, a);
    },
    popHydrationState: function popHydrationState(a) {
      if (a !== y) return !1;if (!H) return d(a), H = !0, !1;var c = a.type;if (a.tag !== Bg || "head" !== c && "body" !== c && !e(c, a.memoizedProps)) for (c = B; c;) {
        b(a, c), c = h(c);
      }d(a);B = y ? h(a.stateNode) : null;return !0;
    } };
}
var Ig = R.popContextProvider,
    Jg = xd.reset,
    Kg = Qa.ReactCurrentOwner,
    Lg = de.createWorkInProgress,
    Mg = de.largerPriority,
    Ng = ig.onCommitRoot,
    T = Q.NoWork,
    Og = Q.SynchronousPriority,
    U = Q.TaskPriority,
    Pg = Q.HighPriority,
    Qg = Q.LowPriority,
    Rg = Q.OffscreenPriority,
    Sg = Pd.AsyncUpdates,
    Tg = J.PerformedWork,
    Ug = J.Placement,
    Vg = J.Update,
    Wg = J.PlacementAndUpdate,
    Xg = J.Deletion,
    Yg = J.ContentReset,
    Zg = J.Callback,
    $g = J.Err,
    ah = J.Ref,
    bh = E.HostRoot,
    ch = E.HostComponent,
    dh = E.HostPortal,
    eh = E.ClassComponent,
    fh = ud.getUpdatePriority,
    gh = R.resetContext;
function hh(a) {
  function b() {
    for (; null !== ma && ma.current.pendingWorkPriority === T;) {
      ma.isScheduled = !1;var a = ma.nextScheduledRoot;ma.nextScheduledRoot = null;if (ma === zb) return zb = ma = null, z = T, null;ma = a;
    }a = ma;for (var b = null, c = T; null !== a;) {
      a.current.pendingWorkPriority !== T && (c === T || c > a.current.pendingWorkPriority) && (c = a.current.pendingWorkPriority, b = a), a = a.nextScheduledRoot;
    }null !== b ? (z = c, Jg(), gh(), t(), I = Lg(b.current, c), b !== nc && (oc = 0, nc = b)) : (z = T, nc = I = null);
  }function c(c) {
    Hd = !0;na = null;var d = c.stateNode;d.current === c ? w("177") : void 0;z !== Og && z !== U || oc++;Kg.current = null;if (c.effectTag > Tg) {
      if (null !== c.lastEffect) {
        c.lastEffect.nextEffect = c;var e = c.firstEffect;
      } else e = c;
    } else e = c.firstEffect;Ui();for (u = e; null !== u;) {
      var f = !1,
          g = void 0;try {
        for (; null !== u;) {
          var h = u.effectTag;h & Yg && a.resetTextContent(u.stateNode);if (h & ah) {
            var k = u.alternate;null !== k && Ph(k);
          }switch (h & ~(Zg | $g | Yg | ah | Tg)) {case Ug:
              q(u);u.effectTag &= ~Ug;break;case Wg:
              q(u);u.effectTag &= ~Ug;vf(u.alternate, u);break;case Vg:
              vf(u.alternate, u);break;case Xg:
              Id = !0, Mh(u), Id = !1;}u = u.nextEffect;
        }
      } catch (Jd) {
        f = !0, g = Jd;
      }f && (null === u ? w("178") : void 0, x(u, g), null !== u && (u = u.nextEffect));
    }Vi();d.current = c;for (u = e; null !== u;) {
      d = !1;e = void 0;try {
        for (; null !== u;) {
          var Gd = u.effectTag;Gd & (Vg | Zg) && Nh(u.alternate, u);Gd & ah && Oh(u);if (Gd & $g) switch (f = u, g = void 0, null !== P && (g = P.get(f), P["delete"](f), null == g && null !== f.alternate && (f = f.alternate, g = P.get(f), P["delete"](f))), null == g ? w("184") : void 0, f.tag) {case eh:
              f.stateNode.componentDidCatch(g.error, { componentStack: g.componentStack });break;case bh:
              null === Ja && (Ja = g.error);break;default:
              w("157");}var m = u.nextEffect;u.nextEffect = null;u = m;
        }
      } catch (Jd) {
        d = !0, e = Jd;
      }d && (null === u ? w("178") : void 0, x(u, e), null !== u && (u = u.nextEffect));
    }Hd = !1;"function" === typeof Ng && Ng(c.stateNode);va && (va.forEach(H), va = null);b();
  }function d(a) {
    for (;;) {
      var b = Lh(a.alternate, a, z),
          c = a["return"],
          d = a.sibling;var e = a;if (!(e.pendingWorkPriority !== T && e.pendingWorkPriority > z)) {
        for (var f = fh(e), g = e.child; null !== g;) {
          f = Mg(f, g.pendingWorkPriority), g = g.sibling;
        }e.pendingWorkPriority = f;
      }if (null !== b) return b;
      null !== c && (null === c.firstEffect && (c.firstEffect = a.firstEffect), null !== a.lastEffect && (null !== c.lastEffect && (c.lastEffect.nextEffect = a.firstEffect), c.lastEffect = a.lastEffect), a.effectTag > Tg && (null !== c.lastEffect ? c.lastEffect.nextEffect = a : c.firstEffect = a, c.lastEffect = a));if (null !== d) return d;if (null !== c) a = c;else {
        na = a;break;
      }
    }return null;
  }function e(a) {
    var b = V(a.alternate, a, z);null === b && (b = d(a));Kg.current = null;return b;
  }function f(a) {
    var b = ld(a.alternate, a, z);null === b && (b = d(a));Kg.current = null;return b;
  }
  function g(a) {
    p(Rg, a);
  }function h() {
    if (null !== P && 0 < P.size && z === U) for (; null !== I;) {
      var a = I;I = null !== P && (P.has(a) || null !== a.alternate && P.has(a.alternate)) ? f(I) : e(I);if (null === I && (null === na ? w("179") : void 0, O = U, c(na), O = z, null === P || 0 === P.size || z !== U)) break;
    }
  }function k(a, d) {
    null !== na ? (O = U, c(na), h()) : null === I && b();if (!(z === T || z > a)) {
      O = z;a: do {
        if (z <= U) for (; null !== I && !(I = e(I), null === I && (null === na ? w("179") : void 0, O = U, c(na), O = z, h(), z === T || z > a || z > U));) {} else if (null !== d) for (; null !== I && !Ab;) {
          if (1 < d.timeRemaining()) {
            if (I = e(I), null === I) if (null === na ? w("179") : void 0, 1 < d.timeRemaining()) {
              if (O = U, c(na), O = z, h(), z === T || z > a || z < Pg) break;
            } else Ab = !0;
          } else Ab = !0;
        }switch (z) {case Og:case U:
            if (z <= a) continue a;break a;case Pg:case Qg:case Rg:
            if (null === d) break a;if (!Ab && z <= a) continue a;break a;case T:
            break a;default:
            w("181");}
      } while (1);
    }
  }function p(a, b) {
    Da ? w("182") : void 0;Da = !0;var c = O,
        d = !1,
        e = null;try {
      k(a, b);
    } catch (Kd) {
      d = !0, e = Kd;
    }for (; d;) {
      if (Ya) {
        Ja = e;break;
      }var h = I;if (null === h) Ya = !0;else {
        var p = x(h, e);null === p ? w("183") : void 0;if (!Ya) {
          try {
            d = p;e = a;p = b;for (var q = d; null !== h;) {
              switch (h.tag) {case eh:
                  Ig(h);break;case ch:
                  m(h);break;case bh:
                  r(h);break;case dh:
                  r(h);}if (h === q || h.alternate === q) break;h = h["return"];
            }I = f(d);k(e, p);
          } catch (Kd) {
            d = !0;e = Kd;continue;
          }break;
        }
      }
    }O = c;null !== b && (Bb = !1);z > U && !Bb && ($f(g), Bb = !0);a = Ja;Ya = Ab = Da = !1;nc = Ka = P = Ja = null;oc = 0;if (null !== a) throw a;
  }function x(a, b) {
    var c = Kg.current = null,
        d = !1,
        e = !1,
        f = null;if (a.tag === bh) c = a, S(a) && (Ya = !0);else for (var g = a["return"]; null !== g && null === c;) {
      g.tag === eh ? "function" === typeof g.stateNode.componentDidCatch && (d = !0, f = Ra(g), c = g, e = !0) : g.tag === bh && (c = g);if (S(g)) {
        if (Id || null !== va && (va.has(g) || null !== g.alternate && va.has(g.alternate))) return null;c = null;e = !1;
      }g = g["return"];
    }if (null !== c) {
      null === Ka && (Ka = new Set());Ka.add(c);var h = "";g = a;do {
        a: switch (g.tag) {case fe:case ge:case he:case ie:
            var k = g._debugOwner,
                m = g._debugSource;var p = Ra(g);var q = null;k && (q = Ra(k));k = m;p = "\n    in " + (p || "Unknown") + (k ? " (at " + k.fileName.replace(/^.*[\\\/]/, "") + ":" + k.lineNumber + ")" : q ? " (created by " + q + ")" : "");break a;default:
            p = "";}h += p;g = g["return"];
      } while (g);
      g = h;a = Ra(a);null === P && (P = new Map());b = { componentName: a, componentStack: g, error: b, errorBoundary: d ? c.stateNode : null, errorBoundaryFound: d, errorBoundaryName: f, willRetry: e };P.set(c, b);try {
        console.error(b.error);
      } catch (Wi) {
        console.error(Wi);
      }Hd ? (null === va && (va = new Set()), va.add(c)) : H(c);return c;
    }null === Ja && (Ja = b);return null;
  }function S(a) {
    return null !== Ka && (Ka.has(a) || null !== a.alternate && Ka.has(a.alternate));
  }function D(a, b) {
    return y(a, b, !1);
  }function y(a, b) {
    oc > Xi && (Ya = !0, w("185"));!Da && b <= z && (I = null);for (var c = !0; null !== a && c;) {
      c = !1;if (a.pendingWorkPriority === T || a.pendingWorkPriority > b) c = !0, a.pendingWorkPriority = b;null !== a.alternate && (a.alternate.pendingWorkPriority === T || a.alternate.pendingWorkPriority > b) && (c = !0, a.alternate.pendingWorkPriority = b);if (null === a["return"]) if (a.tag === bh) {
        var d = a.stateNode;b === T || d.isScheduled || (d.isScheduled = !0, zb ? zb.nextScheduledRoot = d : ma = d, zb = d);if (!Da) switch (b) {case Og:
            pc ? p(Og, null) : p(U, null);break;case U:
            W ? void 0 : w("186");break;default:
            Bb || ($f(g), Bb = !0);}
      } else break;a = a["return"];
    }
  }
  function B(a, b) {
    var c = O;c === T && (c = !Yi || a.internalContextTag & Sg || b ? Qg : Og);return c === Og && (Da || W) ? U : c;
  }function H(a) {
    y(a, U, !0);
  }var C = Ag(a),
      Ca = Hg(a),
      r = C.popHostContainer,
      m = C.popHostContext,
      t = C.resetHostContainer,
      v = Lf(a, C, Ca, D, B),
      V = v.beginWork,
      ld = v.beginFailedWork,
      Lh = eg(a, C, Ca).completeWork;C = vg(a, x);var q = C.commitPlacement,
      Mh = C.commitDeletion,
      vf = C.commitWork,
      Nh = C.commitLifeCycles,
      Oh = C.commitAttachRef,
      Ph = C.commitDetachRef,
      $f = a.scheduleDeferredCallback,
      Yi = a.useSyncScheduling,
      Ui = a.prepareForCommit,
      Vi = a.resetAfterCommit,
      O = T,
      Da = !1,
      Ab = !1,
      W = !1,
      pc = !1,
      I = null,
      z = T,
      u = null,
      na = null,
      ma = null,
      zb = null,
      Bb = !1,
      P = null,
      Ka = null,
      va = null,
      Ja = null,
      Ya = !1,
      Hd = !1,
      Id = !1,
      Xi = 1E3,
      oc = 0,
      nc = null;return { scheduleUpdate: D, getPriorityContext: B, batchedUpdates: function batchedUpdates(a, b) {
      var c = W;W = !0;try {
        return a(b);
      } finally {
        W = c, Da || W || p(U, null);
      }
    }, unbatchedUpdates: function unbatchedUpdates(a) {
      var b = pc,
          c = W;pc = W;W = !1;try {
        return a();
      } finally {
        W = c, pc = b;
      }
    }, flushSync: function flushSync(a) {
      var b = W,
          c = O;W = !0;O = Og;try {
        return a();
      } finally {
        W = b, O = c, Da ? w("187") : void 0, p(U, null);
      }
    }, deferredUpdates: function deferredUpdates(a) {
      var b = O;O = Qg;try {
        return a();
      } finally {
        O = b;
      }
    } };
}function ih() {
  w("196");
}function jh(a) {
  if (!a) return da;a = Pa.get(a);return "number" === typeof a.tag ? ih(a) : a._processChildContext(a._context);
}jh._injectFiber = function (a) {
  ih = a;
};var kh = ud.addTopLevelUpdate,
    lh = R.findCurrentUnmaskedContext,
    mh = R.isContextProvider,
    nh = R.processChildContext,
    oh = E.HostComponent,
    ph = bb.findCurrentHostFiber,
    qh = bb.findCurrentHostFiberWithNoPortals;jh._injectFiber(function (a) {
  var b = lh(a);return mh(a) ? nh(a, b, !1) : b;
});var rh = F.TEXT_NODE;
function sh(a) {
  for (; a && a.firstChild;) {
    a = a.firstChild;
  }return a;
}function th(a, b) {
  var c = sh(a);a = 0;for (var d; c;) {
    if (c.nodeType === rh) {
      d = a + c.textContent.length;if (a <= b && d >= b) return { node: c, offset: b - a };a = d;
    }a: {
      for (; c;) {
        if (c.nextSibling) {
          c = c.nextSibling;break a;
        }c = c.parentNode;
      }c = void 0;
    }c = sh(c);
  }
}var uh = null;function vh() {
  !uh && l.canUseDOM && (uh = "textContent" in document.documentElement ? "textContent" : "innerText");return uh;
}
var wh = { getOffsets: function getOffsets(a) {
    var b = window.getSelection && window.getSelection();if (!b || 0 === b.rangeCount) return null;var c = b.anchorNode,
        d = b.anchorOffset,
        e = b.focusNode,
        f = b.focusOffset,
        g = b.getRangeAt(0);try {
      g.startContainer.nodeType, g.endContainer.nodeType;
    } catch (k) {
      return null;
    }b = b.anchorNode === b.focusNode && b.anchorOffset === b.focusOffset ? 0 : g.toString().length;var h = g.cloneRange();h.selectNodeContents(a);h.setEnd(g.startContainer, g.startOffset);a = h.startContainer === h.endContainer && h.startOffset === h.endOffset ? 0 : h.toString().length;g = a + b;b = document.createRange();b.setStart(c, d);b.setEnd(e, f);c = b.collapsed;return { start: c ? g : a, end: c ? a : g };
  }, setOffsets: function setOffsets(a, b) {
    if (window.getSelection) {
      var c = window.getSelection(),
          d = a[vh()].length,
          e = Math.min(b.start, d);b = void 0 === b.end ? e : Math.min(b.end, d);!c.extend && e > b && (d = b, b = e, e = d);d = th(a, e);a = th(a, b);if (d && a) {
        var f = document.createRange();f.setStart(d.node, d.offset);c.removeAllRanges();e > b ? (c.addRange(f), c.extend(a.node, a.offset)) : (f.setEnd(a.node, a.offset), c.addRange(f));
      }
    }
  } },
    xh = F.ELEMENT_NODE,
    yh = { hasSelectionCapabilities: function hasSelectionCapabilities(a) {
    var b = a && a.nodeName && a.nodeName.toLowerCase();return b && ("input" === b && "text" === a.type || "textarea" === b || "true" === a.contentEditable);
  }, getSelectionInformation: function getSelectionInformation() {
    var a = ia();return { focusedElem: a, selectionRange: yh.hasSelectionCapabilities(a) ? yh.getSelection(a) : null };
  }, restoreSelection: function restoreSelection(a) {
    var b = ia(),
        c = a.focusedElem;a = a.selectionRange;if (b !== c && fa(document.documentElement, c)) {
      yh.hasSelectionCapabilities(c) && yh.setSelection(c, a);b = [];for (a = c; a = a.parentNode;) {
        a.nodeType === xh && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
      }ha(c);for (c = 0; c < b.length; c++) {
        a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
      }
    }
  }, getSelection: function getSelection(a) {
    return ("selectionStart" in a ? { start: a.selectionStart, end: a.selectionEnd } : wh.getOffsets(a)) || { start: 0, end: 0 };
  }, setSelection: function setSelection(a, b) {
    var c = b.start,
        d = b.end;void 0 === d && (d = c);"selectionStart" in a ? (a.selectionStart = c, a.selectionEnd = Math.min(d, a.value.length)) : wh.setOffsets(a, b);
  } },
    zh = yh,
    Ah = F.ELEMENT_NODE;function Bh() {
  w("211");
}function Ch() {
  w("212");
}function Dh(a) {
  if (null == a) return null;if (a.nodeType === Ah) return a;var b = Pa.get(a);if (b) return "number" === typeof b.tag ? Bh(b) : Ch(b);"function" === typeof a.render ? w("188") : w("213", Object.keys(a));
}Dh._injectFiber = function (a) {
  Bh = a;
};Dh._injectStack = function (a) {
  Ch = a;
};var Eh = E.HostComponent;function Fh(a) {
  if (void 0 !== a._hostParent) return a._hostParent;if ("number" === typeof a.tag) {
    do {
      a = a["return"];
    } while (a && a.tag !== Eh);if (a) return a;
  }return null;
}
function Gh(a, b) {
  for (var c = 0, d = a; d; d = Fh(d)) {
    c++;
  }d = 0;for (var e = b; e; e = Fh(e)) {
    d++;
  }for (; 0 < c - d;) {
    a = Fh(a), c--;
  }for (; 0 < d - c;) {
    b = Fh(b), d--;
  }for (; c--;) {
    if (a === b || a === b.alternate) return a;a = Fh(a);b = Fh(b);
  }return null;
}
var Hh = { isAncestor: function isAncestor(a, b) {
    for (; b;) {
      if (a === b || a === b.alternate) return !0;b = Fh(b);
    }return !1;
  }, getLowestCommonAncestor: Gh, getParentInstance: function getParentInstance(a) {
    return Fh(a);
  }, traverseTwoPhase: function traverseTwoPhase(a, b, c) {
    for (var d = []; a;) {
      d.push(a), a = Fh(a);
    }for (a = d.length; 0 < a--;) {
      b(d[a], "captured", c);
    }for (a = 0; a < d.length; a++) {
      b(d[a], "bubbled", c);
    }
  }, traverseEnterLeave: function traverseEnterLeave(a, b, c, d, e) {
    for (var f = a && b ? Gh(a, b) : null, g = []; a && a !== f;) {
      g.push(a), a = Fh(a);
    }for (a = []; b && b !== f;) {
      a.push(b), b = Fh(b);
    }for (b = 0; b < g.length; b++) {
      c(g[b], "bubbled", d);
    }for (b = a.length; 0 < b--;) {
      c(a[b], "captured", e);
    }
  } },
    Ih = Jb.getListener;function Jh(a, b, c) {
  if (b = Ih(a, c.dispatchConfig.phasedRegistrationNames[b])) c._dispatchListeners = Cb(c._dispatchListeners, b), c._dispatchInstances = Cb(c._dispatchInstances, a);
}function Kh(a) {
  a && a.dispatchConfig.phasedRegistrationNames && Hh.traverseTwoPhase(a._targetInst, Jh, a);
}function Qh(a) {
  if (a && a.dispatchConfig.phasedRegistrationNames) {
    var b = a._targetInst;b = b ? Hh.getParentInstance(b) : null;Hh.traverseTwoPhase(b, Jh, a);
  }
}
function Rh(a, b, c) {
  a && c && c.dispatchConfig.registrationName && (b = Ih(a, c.dispatchConfig.registrationName)) && (c._dispatchListeners = Cb(c._dispatchListeners, b), c._dispatchInstances = Cb(c._dispatchInstances, a));
}function Sh(a) {
  a && a.dispatchConfig.registrationName && Rh(a._targetInst, null, a);
}
var Th = { accumulateTwoPhaseDispatches: function accumulateTwoPhaseDispatches(a) {
    Db(a, Kh);
  }, accumulateTwoPhaseDispatchesSkipTarget: function accumulateTwoPhaseDispatchesSkipTarget(a) {
    Db(a, Qh);
  }, accumulateDirectDispatches: function accumulateDirectDispatches(a) {
    Db(a, Sh);
  }, accumulateEnterLeaveDispatches: function accumulateEnterLeaveDispatches(a, b, c, d) {
    Hh.traverseEnterLeave(c, d, Rh, a, b);
  } },
    X = { _root: null, _startText: null, _fallbackText: null },
    Uh = { initialize: function initialize(a) {
    X._root = a;X._startText = Uh.getText();return !0;
  }, reset: function reset() {
    X._root = null;X._startText = null;X._fallbackText = null;
  }, getData: function getData() {
    if (X._fallbackText) return X._fallbackText;
    var a,
        b = X._startText,
        c = b.length,
        d,
        e = Uh.getText(),
        f = e.length;for (a = 0; a < c && b[a] === e[a]; a++) {}var g = c - a;for (d = 1; d <= g && b[c - d] === e[f - d]; d++) {}X._fallbackText = e.slice(a, 1 < d ? 1 - d : void 0);return X._fallbackText;
  }, getText: function getText() {
    return "value" in X._root ? X._root.value : X._root[vh()];
  } },
    Vh = Uh,
    Wh = "dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),
    Xh = { type: null, target: null, currentTarget: ca.thatReturnsNull, eventPhase: null, bubbles: null,
  cancelable: null, timeStamp: function timeStamp(a) {
    return a.timeStamp || Date.now();
  }, defaultPrevented: null, isTrusted: null };
function Y(a, b, c, d) {
  this.dispatchConfig = a;this._targetInst = b;this.nativeEvent = c;a = this.constructor.Interface;for (var e in a) {
    a.hasOwnProperty(e) && ((b = a[e]) ? this[e] = b(c) : "target" === e ? this.target = d : this[e] = c[e]);
  }this.isDefaultPrevented = (null != c.defaultPrevented ? c.defaultPrevented : !1 === c.returnValue) ? ca.thatReturnsTrue : ca.thatReturnsFalse;this.isPropagationStopped = ca.thatReturnsFalse;return this;
}
n(Y.prototype, { preventDefault: function preventDefault() {
    this.defaultPrevented = !0;var a = this.nativeEvent;a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = ca.thatReturnsTrue);
  }, stopPropagation: function stopPropagation() {
    var a = this.nativeEvent;a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = ca.thatReturnsTrue);
  }, persist: function persist() {
    this.isPersistent = ca.thatReturnsTrue;
  }, isPersistent: ca.thatReturnsFalse,
  destructor: function destructor() {
    var a = this.constructor.Interface,
        b;for (b in a) {
      this[b] = null;
    }for (a = 0; a < Wh.length; a++) {
      this[Wh[a]] = null;
    }
  } });Y.Interface = Xh;Y.augmentClass = function (a, b) {
  function c() {}c.prototype = this.prototype;var d = new c();n(d, a.prototype);a.prototype = d;a.prototype.constructor = a;a.Interface = n({}, this.Interface, b);a.augmentClass = this.augmentClass;Yh(a);
};Yh(Y);function Zh(a, b, c, d) {
  if (this.eventPool.length) {
    var e = this.eventPool.pop();this.call(e, a, b, c, d);return e;
  }return new this(a, b, c, d);
}
function $h(a) {
  a instanceof this ? void 0 : w("223");a.destructor();10 > this.eventPool.length && this.eventPool.push(a);
}function Yh(a) {
  a.eventPool = [];a.getPooled = Zh;a.release = $h;
}function ai(a, b, c, d) {
  return Y.call(this, a, b, c, d);
}Y.augmentClass(ai, { data: null });function bi(a, b, c, d) {
  return Y.call(this, a, b, c, d);
}Y.augmentClass(bi, { data: null });var ci = [9, 13, 27, 32],
    di = l.canUseDOM && "CompositionEvent" in window,
    ei = null;l.canUseDOM && "documentMode" in document && (ei = document.documentMode);var fi;
if (fi = l.canUseDOM && "TextEvent" in window && !ei) {
  var gi = window.opera;fi = !("object" === (typeof gi === "undefined" ? "undefined" : _typeof(gi)) && "function" === typeof gi.version && 12 >= parseInt(gi.version(), 10));
}
var hi = fi,
    ii = l.canUseDOM && (!di || ei && 8 < ei && 11 >= ei),
    ji = String.fromCharCode(32),
    ki = { beforeInput: { phasedRegistrationNames: { bubbled: "onBeforeInput", captured: "onBeforeInputCapture" }, dependencies: ["topCompositionEnd", "topKeyPress", "topTextInput", "topPaste"] }, compositionEnd: { phasedRegistrationNames: { bubbled: "onCompositionEnd", captured: "onCompositionEndCapture" }, dependencies: "topBlur topCompositionEnd topKeyDown topKeyPress topKeyUp topMouseDown".split(" ") }, compositionStart: { phasedRegistrationNames: { bubbled: "onCompositionStart",
      captured: "onCompositionStartCapture" }, dependencies: "topBlur topCompositionStart topKeyDown topKeyPress topKeyUp topMouseDown".split(" ") }, compositionUpdate: { phasedRegistrationNames: { bubbled: "onCompositionUpdate", captured: "onCompositionUpdateCapture" }, dependencies: "topBlur topCompositionUpdate topKeyDown topKeyPress topKeyUp topMouseDown".split(" ") } },
    li = !1;
function mi(a, b) {
  switch (a) {case "topKeyUp":
      return -1 !== ci.indexOf(b.keyCode);case "topKeyDown":
      return 229 !== b.keyCode;case "topKeyPress":case "topMouseDown":case "topBlur":
      return !0;default:
      return !1;}
}function ni(a) {
  a = a.detail;return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && "data" in a ? a.data : null;
}var oi = !1;function pi(a, b) {
  switch (a) {case "topCompositionEnd":
      return ni(b);case "topKeyPress":
      if (32 !== b.which) return null;li = !0;return ji;case "topTextInput":
      return a = b.data, a === ji && li ? null : a;default:
      return null;}
}
function qi(a, b) {
  if (oi) return "topCompositionEnd" === a || !di && mi(a, b) ? (a = Vh.getData(), Vh.reset(), oi = !1, a) : null;switch (a) {case "topPaste":
      return null;case "topKeyPress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;if (b.which) return String.fromCharCode(b.which);
      }return null;case "topCompositionEnd":
      return ii ? null : b.data;default:
      return null;}
}
var ri = { eventTypes: ki, extractEvents: function extractEvents(a, b, c, d) {
    var e;if (di) b: {
      switch (a) {case "topCompositionStart":
          var f = ki.compositionStart;break b;case "topCompositionEnd":
          f = ki.compositionEnd;break b;case "topCompositionUpdate":
          f = ki.compositionUpdate;break b;}f = void 0;
    } else oi ? mi(a, c) && (f = ki.compositionEnd) : "topKeyDown" === a && 229 === c.keyCode && (f = ki.compositionStart);f ? (ii && (oi || f !== ki.compositionStart ? f === ki.compositionEnd && oi && (e = Vh.getData()) : oi = Vh.initialize(d)), f = ai.getPooled(f, b, c, d), e ? f.data = e : (e = ni(c), null !== e && (f.data = e)), Th.accumulateTwoPhaseDispatches(f), e = f) : e = null;(a = hi ? pi(a, c) : qi(a, c)) ? (b = bi.getPooled(ki.beforeInput, b, c, d), b.data = a, Th.accumulateTwoPhaseDispatches(b)) : b = null;return [e, b];
  } },
    si = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };function ti(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();return "input" === b ? !!si[a.type] : "textarea" === b ? !0 : !1;
}
var ui = { change: { phasedRegistrationNames: { bubbled: "onChange", captured: "onChangeCapture" }, dependencies: "topBlur topChange topClick topFocus topInput topKeyDown topKeyUp topSelectionChange".split(" ") } };function vi(a, b, c) {
  a = Y.getPooled(ui.change, a, b, c);a.type = "change";nb.enqueueStateRestore(c);Th.accumulateTwoPhaseDispatches(a);return a;
}var wi = null,
    xi = null;function yi(a) {
  Jb.enqueueEvents(a);Jb.processEventQueue(!1);
}
function zi(a) {
  var b = G.getNodeFromInstance(a);if (Bc.updateValueIfChanged(b)) return a;
}function Ai(a, b) {
  if ("topChange" === a) return b;
}var Bi = !1;l.canUseDOM && (Bi = Lb("input") && (!document.documentMode || 9 < document.documentMode));function Ci() {
  wi && (wi.detachEvent("onpropertychange", Di), xi = wi = null);
}function Di(a) {
  "value" === a.propertyName && zi(xi) && (a = vi(xi, a, ub(a)), sb.batchedUpdates(yi, a));
}function Ei(a, b, c) {
  "topFocus" === a ? (Ci(), wi = b, xi = c, wi.attachEvent("onpropertychange", Di)) : "topBlur" === a && Ci();
}
function Fi(a) {
  if ("topSelectionChange" === a || "topKeyUp" === a || "topKeyDown" === a) return zi(xi);
}function Gi(a, b) {
  if ("topClick" === a) return zi(b);
}function Hi(a, b) {
  if ("topInput" === a || "topChange" === a) return zi(b);
}
var Ii = { eventTypes: ui, _isInputEventSupported: Bi, extractEvents: function extractEvents(a, b, c, d) {
    var e = b ? G.getNodeFromInstance(b) : window,
        f = e.nodeName && e.nodeName.toLowerCase();if ("select" === f || "input" === f && "file" === e.type) var g = Ai;else if (ti(e)) {
      if (Bi) g = Hi;else {
        g = Fi;var h = Ei;
      }
    } else f = e.nodeName, !f || "input" !== f.toLowerCase() || "checkbox" !== e.type && "radio" !== e.type || (g = Gi);if (g && (g = g(a, b))) return vi(g, c, d);h && h(a, e, b);"topBlur" === a && null != b && (a = b._wrapperState || e._wrapperState) && a.controlled && "number" === e.type && (a = "" + e.value, e.getAttribute("value") !== a && e.setAttribute("value", a));
  } };function Ji(a, b, c, d) {
  return Y.call(this, a, b, c, d);
}Y.augmentClass(Ji, { view: function view(a) {
    if (a.view) return a.view;a = ub(a);return a.window === a ? a : (a = a.ownerDocument) ? a.defaultView || a.parentWindow : window;
  }, detail: function detail(a) {
    return a.detail || 0;
  } });var Ki = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };function Li(a) {
  var b = this.nativeEvent;return b.getModifierState ? b.getModifierState(a) : (a = Ki[a]) ? !!b[a] : !1;
}function Mi() {
  return Li;
}
function Ni(a, b, c, d) {
  return Y.call(this, a, b, c, d);
}Ji.augmentClass(Ni, { screenX: null, screenY: null, clientX: null, clientY: null, pageX: null, pageY: null, ctrlKey: null, shiftKey: null, altKey: null, metaKey: null, getModifierState: Mi, button: null, buttons: null, relatedTarget: function relatedTarget(a) {
    return a.relatedTarget || (a.fromElement === a.srcElement ? a.toElement : a.fromElement);
  } });
var Oi = { mouseEnter: { registrationName: "onMouseEnter", dependencies: ["topMouseOut", "topMouseOver"] }, mouseLeave: { registrationName: "onMouseLeave", dependencies: ["topMouseOut", "topMouseOver"] } },
    Pi = { eventTypes: Oi, extractEvents: function extractEvents(a, b, c, d) {
    if ("topMouseOver" === a && (c.relatedTarget || c.fromElement) || "topMouseOut" !== a && "topMouseOver" !== a) return null;var e = d.window === d ? d : (e = d.ownerDocument) ? e.defaultView || e.parentWindow : window;"topMouseOut" === a ? (a = b, b = (b = c.relatedTarget || c.toElement) ? G.getClosestInstanceFromNode(b) : null) : a = null;if (a === b) return null;var f = null == a ? e : G.getNodeFromInstance(a);e = null == b ? e : G.getNodeFromInstance(b);var g = Ni.getPooled(Oi.mouseLeave, a, c, d);g.type = "mouseleave";g.target = f;g.relatedTarget = e;c = Ni.getPooled(Oi.mouseEnter, b, c, d);c.type = "mouseenter";c.target = e;c.relatedTarget = f;Th.accumulateEnterLeaveDispatches(g, c, a, b);return [g, c];
  } },
    Qi = F.DOCUMENT_NODE,
    Ri = l.canUseDOM && "documentMode" in document && 11 >= document.documentMode,
    Si = { select: { phasedRegistrationNames: { bubbled: "onSelect", captured: "onSelectCapture" },
    dependencies: "topBlur topContextMenu topFocus topKeyDown topKeyUp topMouseDown topMouseUp topSelectionChange".split(" ") } },
    Ti = null,
    Zi = null,
    $i = null,
    aj = !1,
    bj = M.isListeningToAllDependencies;
function cj(a, b) {
  if (aj || null == Ti || Ti !== ia()) return null;var c = Ti;"selectionStart" in c && zh.hasSelectionCapabilities(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : window.getSelection ? (c = window.getSelection(), c = { anchorNode: c.anchorNode, anchorOffset: c.anchorOffset, focusNode: c.focusNode, focusOffset: c.focusOffset }) : c = void 0;return $i && ea($i, c) ? null : ($i = c, a = Y.getPooled(Si.select, Zi, a, b), a.type = "select", a.target = Ti, Th.accumulateTwoPhaseDispatches(a), a);
}
var dj = { eventTypes: Si, extractEvents: function extractEvents(a, b, c, d) {
    var e = d.window === d ? d.document : d.nodeType === Qi ? d : d.ownerDocument;if (!e || !bj("onSelect", e)) return null;e = b ? G.getNodeFromInstance(b) : window;switch (a) {case "topFocus":
        if (ti(e) || "true" === e.contentEditable) Ti = e, Zi = b, $i = null;break;case "topBlur":
        $i = Zi = Ti = null;break;case "topMouseDown":
        aj = !0;break;case "topContextMenu":case "topMouseUp":
        return aj = !1, cj(c, d);case "topSelectionChange":
        if (Ri) break;case "topKeyDown":case "topKeyUp":
        return cj(c, d);}return null;
  } };
function ej(a, b, c, d) {
  return Y.call(this, a, b, c, d);
}Y.augmentClass(ej, { animationName: null, elapsedTime: null, pseudoElement: null });function fj(a, b, c, d) {
  return Y.call(this, a, b, c, d);
}Y.augmentClass(fj, { clipboardData: function clipboardData(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  } });function gj(a, b, c, d) {
  return Y.call(this, a, b, c, d);
}Ji.augmentClass(gj, { relatedTarget: null });function hj(a) {
  var b = a.keyCode;"charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;return 32 <= a || 13 === a ? a : 0;
}
var ij = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" },
    jj = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4",
  116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" };function kj(a, b, c, d) {
  return Y.call(this, a, b, c, d);
}
Ji.augmentClass(kj, { key: function key(a) {
    if (a.key) {
      var b = ij[a.key] || a.key;if ("Unidentified" !== b) return b;
    }return "keypress" === a.type ? (a = hj(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? jj[a.keyCode] || "Unidentified" : "";
  }, location: null, ctrlKey: null, shiftKey: null, altKey: null, metaKey: null, repeat: null, locale: null, getModifierState: Mi, charCode: function charCode(a) {
    return "keypress" === a.type ? hj(a) : 0;
  }, keyCode: function keyCode(a) {
    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  }, which: function which(a) {
    return "keypress" === a.type ? hj(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  } });function lj(a, b, c, d) {
  return Y.call(this, a, b, c, d);
}Ni.augmentClass(lj, { dataTransfer: null });function mj(a, b, c, d) {
  return Y.call(this, a, b, c, d);
}Ji.augmentClass(mj, { touches: null, targetTouches: null, changedTouches: null, altKey: null, metaKey: null, ctrlKey: null, shiftKey: null, getModifierState: Mi });function nj(a, b, c, d) {
  return Y.call(this, a, b, c, d);
}Y.augmentClass(nj, { propertyName: null, elapsedTime: null, pseudoElement: null });
function oj(a, b, c, d) {
  return Y.call(this, a, b, c, d);
}Ni.augmentClass(oj, { deltaX: function deltaX(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  }, deltaY: function deltaY(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  }, deltaZ: null, deltaMode: null });var pj = {},
    qj = {};
"abort animationEnd animationIteration animationStart blur cancel canPlay canPlayThrough click close contextMenu copy cut doubleClick drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error focus input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing progress rateChange reset scroll seeked seeking stalled submit suspend timeUpdate toggle touchCancel touchEnd touchMove touchStart transitionEnd volumeChange waiting wheel".split(" ").forEach(function (a) {
  var b = a[0].toUpperCase() + a.slice(1),
      c = "on" + b;b = "top" + b;c = { phasedRegistrationNames: { bubbled: c, captured: c + "Capture" }, dependencies: [b] };pj[a] = c;qj[b] = c;
});
var rj = { eventTypes: pj, extractEvents: function extractEvents(a, b, c, d) {
    var e = qj[a];if (!e) return null;switch (a) {case "topAbort":case "topCancel":case "topCanPlay":case "topCanPlayThrough":case "topClose":case "topDurationChange":case "topEmptied":case "topEncrypted":case "topEnded":case "topError":case "topInput":case "topInvalid":case "topLoad":case "topLoadedData":case "topLoadedMetadata":case "topLoadStart":case "topPause":case "topPlay":case "topPlaying":case "topProgress":case "topRateChange":case "topReset":case "topSeeked":case "topSeeking":case "topStalled":case "topSubmit":case "topSuspend":case "topTimeUpdate":case "topToggle":case "topVolumeChange":case "topWaiting":
        var f = Y;
        break;case "topKeyPress":
        if (0 === hj(c)) return null;case "topKeyDown":case "topKeyUp":
        f = kj;break;case "topBlur":case "topFocus":
        f = gj;break;case "topClick":
        if (2 === c.button) return null;case "topDoubleClick":case "topMouseDown":case "topMouseMove":case "topMouseUp":case "topMouseOut":case "topMouseOver":case "topContextMenu":
        f = Ni;break;case "topDrag":case "topDragEnd":case "topDragEnter":case "topDragExit":case "topDragLeave":case "topDragOver":case "topDragStart":case "topDrop":
        f = lj;break;case "topTouchCancel":case "topTouchEnd":case "topTouchMove":case "topTouchStart":
        f = mj;break;case "topAnimationEnd":case "topAnimationIteration":case "topAnimationStart":
        f = ej;break;case "topTransitionEnd":
        f = nj;break;case "topScroll":
        f = Ji;break;case "topWheel":
        f = oj;break;case "topCopy":case "topCut":case "topPaste":
        f = fj;}f ? void 0 : w("86", a);a = f.getPooled(e, b, c, d);Th.accumulateTwoPhaseDispatches(a);return a;
  } };L.setHandleTopLevel(M.handleTopLevel);Jb.injection.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));
ib.injection.injectComponentTree(G);Jb.injection.injectEventPluginsByName({ SimpleEventPlugin: rj, EnterLeaveEventPlugin: Pi, ChangeEventPlugin: Ii, SelectEventPlugin: dj, BeforeInputEventPlugin: ri });
var sj = A.injection.MUST_USE_PROPERTY,
    Z = A.injection.HAS_BOOLEAN_VALUE,
    tj = A.injection.HAS_NUMERIC_VALUE,
    uj = A.injection.HAS_POSITIVE_NUMERIC_VALUE,
    vj = A.injection.HAS_STRING_BOOLEAN_VALUE,
    wj = { Properties: { allowFullScreen: Z, allowTransparency: vj, async: Z, autoPlay: Z, capture: Z, checked: sj | Z, cols: uj, contentEditable: vj, controls: Z, "default": Z, defer: Z, disabled: Z, download: A.injection.HAS_OVERLOADED_BOOLEAN_VALUE, draggable: vj, formNoValidate: Z, hidden: Z, loop: Z, multiple: sj | Z, muted: sj | Z, noValidate: Z, open: Z, playsInline: Z,
    readOnly: Z, required: Z, reversed: Z, rows: uj, rowSpan: tj, scoped: Z, seamless: Z, selected: sj | Z, size: uj, start: tj, span: uj, spellCheck: vj, style: 0, itemScope: Z, acceptCharset: 0, className: 0, htmlFor: 0, httpEquiv: 0, value: vj }, DOMAttributeNames: { acceptCharset: "accept-charset", className: "class", htmlFor: "for", httpEquiv: "http-equiv" }, DOMMutationMethods: { value: function value(a, b) {
      if (null == b) return a.removeAttribute("value");"number" !== a.type || !1 === a.hasAttribute("value") ? a.setAttribute("value", "" + b) : a.validity && !a.validity.badInput && a.ownerDocument.activeElement !== a && a.setAttribute("value", "" + b);
    } } },
    xj = A.injection.HAS_STRING_BOOLEAN_VALUE,
    yj = { xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace" },
    zj = { Properties: { autoReverse: xj, externalResourcesRequired: xj, preserveAlpha: xj }, DOMAttributeNames: { autoReverse: "autoReverse", externalResourcesRequired: "externalResourcesRequired", preserveAlpha: "preserveAlpha" }, DOMAttributeNamespaces: { xlinkActuate: yj.xlink, xlinkArcrole: yj.xlink, xlinkHref: yj.xlink, xlinkRole: yj.xlink,
    xlinkShow: yj.xlink, xlinkTitle: yj.xlink, xlinkType: yj.xlink, xmlBase: yj.xml, xmlLang: yj.xml, xmlSpace: yj.xml } },
    Aj = /[\-\:]([a-z])/g;function Bj(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode x-height xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xmlns:xlink xml:lang xml:space".split(" ").forEach(function (a) {
  var b = a.replace(Aj, Bj);zj.Properties[b] = 0;zj.DOMAttributeNames[b] = a;
});A.injection.injectDOMPropertyConfig(wj);A.injection.injectDOMPropertyConfig(zj);
var Cj = ig.injectInternals,
    Dj = F.ELEMENT_NODE,
    Ej = F.TEXT_NODE,
    Fj = F.COMMENT_NODE,
    Gj = F.DOCUMENT_NODE,
    Hj = F.DOCUMENT_FRAGMENT_NODE,
    Ij = A.ROOT_ATTRIBUTE_NAME,
    Jj = ka.getChildNamespace,
    Kj = N.createElement,
    Lj = N.createTextNode,
    Mj = N.setInitialProperties,
    Nj = N.diffProperties,
    Oj = N.updateProperties,
    Pj = N.diffHydratedProperties,
    Qj = N.diffHydratedText,
    Rj = N.warnForDeletedHydratableElement,
    Sj = N.warnForDeletedHydratableText,
    Tj = N.warnForInsertedHydratedElement,
    Uj = N.warnForInsertedHydratedText,
    Vj = G.precacheFiberNode,
    Wj = G.updateFiberProps;
nb.injection.injectFiberControlledHostComponent(N);Dh._injectFiber(function (a) {
  return Xj.findHostInstance(a);
});var Yj = null,
    Zj = null;function ak(a) {
  return !(!a || a.nodeType !== Dj && a.nodeType !== Gj && a.nodeType !== Hj && (a.nodeType !== Fj || " react-mount-point-unstable " !== a.nodeValue));
}function bk(a) {
  a = a ? a.nodeType === Gj ? a.documentElement : a.firstChild : null;return !(!a || a.nodeType !== Dj || !a.hasAttribute(Ij));
}
var Xj = function (a) {
  var b = a.getPublicInstance;a = hh(a);var c = a.scheduleUpdate,
      d = a.getPriorityContext;return { createContainer: function createContainer(a) {
      var b = ee();a = { current: b, containerInfo: a, isScheduled: !1, nextScheduledRoot: null, context: null, pendingContext: null };return b.stateNode = a;
    }, updateContainer: function updateContainer(a, b, g, h) {
      var e = b.current;g = jh(g);null === b.context ? b.context = g : b.pendingContext = g;b = h;h = d(e, ed.enableAsyncSubtreeAPI && null != a && null != a.type && null != a.type.prototype && !0 === a.type.prototype.unstable_isAsyncReactComponent);
      a = { element: a };kh(e, a, void 0 === b ? null : b, h);c(e, h);
    }, batchedUpdates: a.batchedUpdates, unbatchedUpdates: a.unbatchedUpdates, deferredUpdates: a.deferredUpdates, flushSync: a.flushSync, getPublicRootInstance: function getPublicRootInstance(a) {
      a = a.current;if (!a.child) return null;switch (a.child.tag) {case oh:
          return b(a.child.stateNode);default:
          return a.child.stateNode;}
    }, findHostInstance: function findHostInstance(a) {
      a = ph(a);return null === a ? null : a.stateNode;
    }, findHostInstanceWithNoPortals: function findHostInstanceWithNoPortals(a) {
      a = qh(a);return null === a ? null : a.stateNode;
    } };
}({ getRootHostContext: function getRootHostContext(a) {
    if (a.nodeType === Gj) a = (a = a.documentElement) ? a.namespaceURI : Jj(null, "");else {
      var b = a.nodeType === Fj ? a.parentNode : a;a = b.namespaceURI || null;b = b.tagName;a = Jj(a, b);
    }return a;
  }, getChildHostContext: function getChildHostContext(a, b) {
    return Jj(a, b);
  }, getPublicInstance: function getPublicInstance(a) {
    return a;
  }, prepareForCommit: function prepareForCommit() {
    Yj = M.isEnabled();Zj = zh.getSelectionInformation();M.setEnabled(!1);
  }, resetAfterCommit: function resetAfterCommit() {
    zh.restoreSelection(Zj);Zj = null;M.setEnabled(Yj);Yj = null;
  }, createInstance: function createInstance(a, b, c, d, e) {
    a = Kj(a, b, c, d);Vj(e, a);Wj(a, b);return a;
  }, appendInitialChild: function appendInitialChild(a, b) {
    a.appendChild(b);
  }, finalizeInitialChildren: function finalizeInitialChildren(a, b, c, d) {
    Mj(a, b, c, d);a: {
      switch (b) {case "button":case "input":case "select":case "textarea":
          a = !!c.autoFocus;break a;}a = !1;
    }return a;
  }, prepareUpdate: function prepareUpdate(a, b, c, d, e) {
    return Nj(a, b, c, d, e);
  }, commitMount: function commitMount(a) {
    a.focus();
  }, commitUpdate: function commitUpdate(a, b, c, d, e) {
    Wj(a, e);Oj(a, b, c, d, e);
  }, shouldSetTextContent: function shouldSetTextContent(a, b) {
    return "textarea" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === _typeof(b.dangerouslySetInnerHTML) && null !== b.dangerouslySetInnerHTML && "string" === typeof b.dangerouslySetInnerHTML.__html;
  }, resetTextContent: function resetTextContent(a) {
    a.textContent = "";
  }, shouldDeprioritizeSubtree: function shouldDeprioritizeSubtree(a, b) {
    return !!b.hidden;
  }, createTextInstance: function createTextInstance(a, b, c, d) {
    a = Lj(a, b);Vj(d, a);return a;
  }, commitTextUpdate: function commitTextUpdate(a, b, c) {
    a.nodeValue = c;
  }, appendChild: function appendChild(a, b) {
    a.appendChild(b);
  }, appendChildToContainer: function appendChildToContainer(a, b) {
    a.nodeType === Fj ? a.parentNode.insertBefore(b, a) : a.appendChild(b);
  }, insertBefore: function insertBefore(a, b, c) {
    a.insertBefore(b, c);
  }, insertInContainerBefore: function insertInContainerBefore(a, b, c) {
    a.nodeType === Fj ? a.parentNode.insertBefore(b, c) : a.insertBefore(b, c);
  }, removeChild: function removeChild(a, b) {
    a.removeChild(b);
  }, removeChildFromContainer: function removeChildFromContainer(a, b) {
    a.nodeType === Fj ? a.parentNode.removeChild(b) : a.removeChild(b);
  }, canHydrateInstance: function canHydrateInstance(a, b) {
    return a.nodeType === Dj && b === a.nodeName.toLowerCase();
  }, canHydrateTextInstance: function canHydrateTextInstance(a, b) {
    return "" === b ? !1 : a.nodeType === Ej;
  }, getNextHydratableSibling: function getNextHydratableSibling(a) {
    for (a = a.nextSibling; a && a.nodeType !== Dj && a.nodeType !== Ej;) {
      a = a.nextSibling;
    }return a;
  }, getFirstHydratableChild: function getFirstHydratableChild(a) {
    for (a = a.firstChild; a && a.nodeType !== Dj && a.nodeType !== Ej;) {
      a = a.nextSibling;
    }return a;
  }, hydrateInstance: function hydrateInstance(a, b, c, d, e, f) {
    Vj(f, a);Wj(a, c);return Pj(a, b, c, e, d);
  }, hydrateTextInstance: function hydrateTextInstance(a, b, c) {
    Vj(c, a);return Qj(a, b);
  }, didNotHydrateInstance: function didNotHydrateInstance(a, b) {
    1 === b.nodeType ? Rj(a, b) : Sj(a, b);
  }, didNotFindHydratableInstance: function didNotFindHydratableInstance(a, b, c) {
    Tj(a, b, c);
  }, didNotFindHydratableTextInstance: function didNotFindHydratableTextInstance(a, b) {
    Uj(a, b);
  }, scheduleDeferredCallback: dd.rIC, useSyncScheduling: !0 });sb.injection.injectFiberBatchedUpdates(Xj.batchedUpdates);
function ck(a, b, c, d, e) {
  ak(c) ? void 0 : w("200");var f = c._reactRootContainer;if (f) Xj.updateContainer(b, f, a, e);else {
    if (!d && !bk(c)) for (d = void 0; d = c.lastChild;) {
      c.removeChild(d);
    }var g = Xj.createContainer(c);f = c._reactRootContainer = g;Xj.unbatchedUpdates(function () {
      Xj.updateContainer(b, g, a, e);
    });
  }return Xj.getPublicRootInstance(f);
}function dk(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;ak(b) ? void 0 : w("200");return ne.createPortal(a, b, null, c);
}
var ek = { createPortal: dk, hydrate: function hydrate(a, b, c) {
    return ck(null, a, b, !0, c);
  }, render: function render(a, b, c) {
    return ck(null, a, b, !1, c);
  }, unstable_renderSubtreeIntoContainer: function unstable_renderSubtreeIntoContainer(a, b, c, d) {
    null != a && Pa.has(a) ? void 0 : w("38");return ck(a, b, c, !1, d);
  }, unmountComponentAtNode: function unmountComponentAtNode(a) {
    ak(a) ? void 0 : w("40");return a._reactRootContainer ? (Xj.unbatchedUpdates(function () {
      ck(null, null, a, !1, function () {
        a._reactRootContainer = null;
      });
    }), !0) : !1;
  }, findDOMNode: Dh, unstable_createPortal: dk, unstable_batchedUpdates: sb.batchedUpdates,
  unstable_deferredUpdates: Xj.deferredUpdates, flushSync: Xj.flushSync, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { EventPluginHub: Jb, EventPluginRegistry: sa, EventPropagators: Th, ReactControlledComponent: nb, ReactDOMComponentTree: G, ReactDOMEventListener: L } };Cj({ findFiberByHostInstance: G.getClosestInstanceFromNode, findHostInstanceByFiber: Xj.findHostInstance, bundleType: 0, version: "16.0.0", rendererPackageName: "react-dom" });module.exports = ek;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = __webpack_require__(23);

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.0.0
 * react-dom.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};if(process.env.NODE_ENV!=="production"){(function(){'use strict';var react=__webpack_require__(2);var invariant=__webpack_require__(3);var ExecutionEnvironment=__webpack_require__(9);var _assign=__webpack_require__(4);var EventListener=__webpack_require__(10);var require$$0=__webpack_require__(6);var hyphenateStyleName=__webpack_require__(25);var emptyFunction=__webpack_require__(1);var camelizeStyleName=__webpack_require__(27);var performanceNow=__webpack_require__(29);var propTypes=__webpack_require__(31);var emptyObject=__webpack_require__(5);var checkPropTypes=__webpack_require__(7);var shallowEqual=__webpack_require__(11);var containsNode=__webpack_require__(12);var focusNode=__webpack_require__(13);var getActiveElement=__webpack_require__(14);/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule reactProdInvariant
 * 
 *//**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule checkReact
 * 
 */!react?invariant(false,'ReactDOM was loaded before React. Make sure you load the React package before loading ReactDOM.'):void 0;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule DOMNamespaces
 */var HTML_NAMESPACE='http://www.w3.org/1999/xhtml';var MATH_NAMESPACE='http://www.w3.org/1998/Math/MathML';var SVG_NAMESPACE='http://www.w3.org/2000/svg';var Namespaces={html:HTML_NAMESPACE,mathml:MATH_NAMESPACE,svg:SVG_NAMESPACE};// Assumes there is no parent namespace.
function getIntrinsicNamespace(type){switch(type){case'svg':return SVG_NAMESPACE;case'math':return MATH_NAMESPACE;default:return HTML_NAMESPACE;}}function getChildNamespace$1(parentNamespace,type){if(parentNamespace==null||parentNamespace===HTML_NAMESPACE){// No (or default) parent namespace: potential entry point.
return getIntrinsicNamespace(type);}if(parentNamespace===SVG_NAMESPACE&&type==='foreignObject'){// We're leaving SVG.
return HTML_NAMESPACE;}// By default, pass namespace below.
return parentNamespace;}var Namespaces_1=Namespaces;var getIntrinsicNamespace_1=getIntrinsicNamespace;var getChildNamespace_1=getChildNamespace$1;var DOMNamespaces={Namespaces:Namespaces_1,getIntrinsicNamespace:getIntrinsicNamespace_1,getChildNamespace:getChildNamespace_1};/**
 * Injectable ordering of event plugins.
 */var eventPluginOrder=null;/**
 * Injectable mapping from names to event plugin modules.
 */var namesToPlugins={};/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */function recomputePluginOrdering(){if(!eventPluginOrder){// Wait until an `eventPluginOrder` is injected.
return;}for(var pluginName in namesToPlugins){var pluginModule=namesToPlugins[pluginName];var pluginIndex=eventPluginOrder.indexOf(pluginName);!(pluginIndex>-1)?invariant(false,'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.',pluginName):void 0;if(EventPluginRegistry.plugins[pluginIndex]){continue;}!pluginModule.extractEvents?invariant(false,'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.',pluginName):void 0;EventPluginRegistry.plugins[pluginIndex]=pluginModule;var publishedEvents=pluginModule.eventTypes;for(var eventName in publishedEvents){!publishEventForPlugin(publishedEvents[eventName],pluginModule,eventName)?invariant(false,'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',eventName,pluginName):void 0;}}}/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */function publishEventForPlugin(dispatchConfig,pluginModule,eventName){!!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName)?invariant(false,'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.',eventName):void 0;EventPluginRegistry.eventNameDispatchConfigs[eventName]=dispatchConfig;var phasedRegistrationNames=dispatchConfig.phasedRegistrationNames;if(phasedRegistrationNames){for(var phaseName in phasedRegistrationNames){if(phasedRegistrationNames.hasOwnProperty(phaseName)){var phasedRegistrationName=phasedRegistrationNames[phaseName];publishRegistrationName(phasedRegistrationName,pluginModule,eventName);}}return true;}else if(dispatchConfig.registrationName){publishRegistrationName(dispatchConfig.registrationName,pluginModule,eventName);return true;}return false;}/**
 * Publishes a registration name that is used to identify dispatched events.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */function publishRegistrationName(registrationName,pluginModule,eventName){!!EventPluginRegistry.registrationNameModules[registrationName]?invariant(false,'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.',registrationName):void 0;EventPluginRegistry.registrationNameModules[registrationName]=pluginModule;EventPluginRegistry.registrationNameDependencies[registrationName]=pluginModule.eventTypes[eventName].dependencies;{var lowerCasedName=registrationName.toLowerCase();EventPluginRegistry.possibleRegistrationNames[lowerCasedName]=registrationName;if(registrationName==='onDoubleClick'){EventPluginRegistry.possibleRegistrationNames.ondblclick=registrationName;}}}/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */var EventPluginRegistry={/**
   * Ordered list of injected plugins.
   */plugins:[],/**
   * Mapping from event name to dispatch config
   */eventNameDispatchConfigs:{},/**
   * Mapping from registration name to plugin module
   */registrationNameModules:{},/**
   * Mapping from registration name to event name
   */registrationNameDependencies:{},/**
   * Mapping from lowercase registration names to the properly cased version,
   * used to warn in the case of missing event handlers. Available
   * only in true.
   * @type {Object}
   */possibleRegistrationNames:{},// Trust the developer to only use possibleRegistrationNames in true
/**
   * Injects an ordering of plugins (by plugin name). This allows the ordering
   * to be decoupled from injection of the actual plugins so that ordering is
   * always deterministic regardless of packaging, on-the-fly injection, etc.
   *
   * @param {array} InjectedEventPluginOrder
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginOrder}
   */injectEventPluginOrder:function injectEventPluginOrder(injectedEventPluginOrder){!!eventPluginOrder?invariant(false,'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.'):void 0;// Clone the ordering so it cannot be dynamically mutated.
eventPluginOrder=Array.prototype.slice.call(injectedEventPluginOrder);recomputePluginOrdering();},/**
   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
   * in the ordering injected by `injectEventPluginOrder`.
   *
   * Plugins can be injected as part of page initialization or on-the-fly.
   *
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginsByName}
   */injectEventPluginsByName:function injectEventPluginsByName(injectedNamesToPlugins){var isOrderingDirty=false;for(var pluginName in injectedNamesToPlugins){if(!injectedNamesToPlugins.hasOwnProperty(pluginName)){continue;}var pluginModule=injectedNamesToPlugins[pluginName];if(!namesToPlugins.hasOwnProperty(pluginName)||namesToPlugins[pluginName]!==pluginModule){!!namesToPlugins[pluginName]?invariant(false,'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.',pluginName):void 0;namesToPlugins[pluginName]=pluginModule;isOrderingDirty=true;}}if(isOrderingDirty){recomputePluginOrdering();}}};var EventPluginRegistry_1=EventPluginRegistry;// These attributes should be all lowercase to allow for
// case insensitive checks
var RESERVED_PROPS={children:true,dangerouslySetInnerHTML:true,autoFocus:true,defaultValue:true,defaultChecked:true,innerHTML:true,suppressContentEditableWarning:true,style:true};function checkMask(value,bitmask){return(value&bitmask)===bitmask;}var DOMPropertyInjection={/**
   * Mapping from normalized, camelcased property names to a configuration that
   * specifies how the associated DOM property should be accessed or rendered.
   */MUST_USE_PROPERTY:0x1,HAS_BOOLEAN_VALUE:0x4,HAS_NUMERIC_VALUE:0x8,HAS_POSITIVE_NUMERIC_VALUE:0x10|0x8,HAS_OVERLOADED_BOOLEAN_VALUE:0x20,HAS_STRING_BOOLEAN_VALUE:0x40,/**
   * Inject some specialized knowledge about the DOM. This takes a config object
   * with the following properties:
   *
   * Properties: object mapping DOM property name to one of the
   * DOMPropertyInjection constants or null. If your attribute isn't in here,
   * it won't get written to the DOM.
   *
   * DOMAttributeNames: object mapping React attribute name to the DOM
   * attribute name. Attribute names not specified use the **lowercase**
   * normalized name.
   *
   * DOMAttributeNamespaces: object mapping React attribute name to the DOM
   * attribute namespace URL. (Attribute names not specified use no namespace.)
   *
   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
   * Property names not specified use the normalized name.
   *
   * DOMMutationMethods: Properties that require special mutation methods. If
   * `value` is undefined, the mutation method should unset the property.
   *
   * @param {object} domPropertyConfig the config as described above.
   */injectDOMPropertyConfig:function injectDOMPropertyConfig(domPropertyConfig){var Injection=DOMPropertyInjection;var Properties=domPropertyConfig.Properties||{};var DOMAttributeNamespaces=domPropertyConfig.DOMAttributeNamespaces||{};var DOMAttributeNames=domPropertyConfig.DOMAttributeNames||{};var DOMMutationMethods=domPropertyConfig.DOMMutationMethods||{};for(var propName in Properties){!!DOMProperty.properties.hasOwnProperty(propName)?invariant(false,'injectDOMPropertyConfig(...): You\'re trying to inject DOM property \'%s\' which has already been injected. You may be accidentally injecting the same DOM property config twice, or you may be injecting two configs that have conflicting property names.',propName):void 0;var lowerCased=propName.toLowerCase();var propConfig=Properties[propName];var propertyInfo={attributeName:lowerCased,attributeNamespace:null,propertyName:propName,mutationMethod:null,mustUseProperty:checkMask(propConfig,Injection.MUST_USE_PROPERTY),hasBooleanValue:checkMask(propConfig,Injection.HAS_BOOLEAN_VALUE),hasNumericValue:checkMask(propConfig,Injection.HAS_NUMERIC_VALUE),hasPositiveNumericValue:checkMask(propConfig,Injection.HAS_POSITIVE_NUMERIC_VALUE),hasOverloadedBooleanValue:checkMask(propConfig,Injection.HAS_OVERLOADED_BOOLEAN_VALUE),hasStringBooleanValue:checkMask(propConfig,Injection.HAS_STRING_BOOLEAN_VALUE)};!(propertyInfo.hasBooleanValue+propertyInfo.hasNumericValue+propertyInfo.hasOverloadedBooleanValue<=1)?invariant(false,'DOMProperty: Value can be one of boolean, overloaded boolean, or numeric value, but not a combination: %s',propName):void 0;if(DOMAttributeNames.hasOwnProperty(propName)){var attributeName=DOMAttributeNames[propName];propertyInfo.attributeName=attributeName;}if(DOMAttributeNamespaces.hasOwnProperty(propName)){propertyInfo.attributeNamespace=DOMAttributeNamespaces[propName];}if(DOMMutationMethods.hasOwnProperty(propName)){propertyInfo.mutationMethod=DOMMutationMethods[propName];}// Downcase references to whitelist properties to check for membership
// without case-sensitivity. This allows the whitelist to pick up
// `allowfullscreen`, which should be written using the property configuration
// for `allowFullscreen`
DOMProperty.properties[propName]=propertyInfo;}}};/* eslint-disable max-len */var ATTRIBUTE_NAME_START_CHAR=':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';/* eslint-enable max-len *//**
 * DOMProperty exports lookup objects that can be used like functions:
 *
 *   > DOMProperty.isValid['id']
 *   true
 *   > DOMProperty.isValid['foobar']
 *   undefined
 *
 * Although this may be confusing, it performs better in general.
 *
 * @see http://jsperf.com/key-exists
 * @see http://jsperf.com/key-missing
 */var DOMProperty={ID_ATTRIBUTE_NAME:'data-reactid',ROOT_ATTRIBUTE_NAME:'data-reactroot',ATTRIBUTE_NAME_START_CHAR:ATTRIBUTE_NAME_START_CHAR,ATTRIBUTE_NAME_CHAR:ATTRIBUTE_NAME_START_CHAR+'\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040',/**
   * Map from property "standard name" to an object with info about how to set
   * the property in the DOM. Each object contains:
   *
   * attributeName:
   *   Used when rendering markup or with `*Attribute()`.
   * attributeNamespace
   * propertyName:
   *   Used on DOM node instances. (This includes properties that mutate due to
   *   external factors.)
   * mutationMethod:
   *   If non-null, used instead of the property or `setAttribute()` after
   *   initial render.
   * mustUseProperty:
   *   Whether the property must be accessed and mutated as an object property.
   * hasBooleanValue:
   *   Whether the property should be removed when set to a falsey value.
   * hasNumericValue:
   *   Whether the property must be numeric or parse as a numeric and should be
   *   removed when set to a falsey value.
   * hasPositiveNumericValue:
   *   Whether the property must be positive numeric or parse as a positive
   *   numeric and should be removed when set to a falsey value.
   * hasOverloadedBooleanValue:
   *   Whether the property can be used as a flag as well as with a value.
   *   Removed when strictly equal to false; present without a value when
   *   strictly equal to true; present with a value otherwise.
   */properties:{},/**
   * Checks whether a property name is a writeable attribute.
   * @method
   */shouldSetAttribute:function shouldSetAttribute(name,value){if(DOMProperty.isReservedProp(name)){return false;}if((name[0]==='o'||name[0]==='O')&&(name[1]==='n'||name[1]==='N')){return false;}if(value===null){return true;}switch(typeof value==='undefined'?'undefined':_typeof(value)){case'boolean':return DOMProperty.shouldAttributeAcceptBooleanValue(name);case'undefined':case'number':case'string':case'object':return true;default:// function, symbol
return false;}},getPropertyInfo:function getPropertyInfo(name){return DOMProperty.properties.hasOwnProperty(name)?DOMProperty.properties[name]:null;},shouldAttributeAcceptBooleanValue:function shouldAttributeAcceptBooleanValue(name){if(DOMProperty.isReservedProp(name)){return true;}var propertyInfo=DOMProperty.getPropertyInfo(name);if(propertyInfo){return propertyInfo.hasBooleanValue||propertyInfo.hasStringBooleanValue||propertyInfo.hasOverloadedBooleanValue;}var prefix=name.toLowerCase().slice(0,5);return prefix==='data-'||prefix==='aria-';},/**
   * Checks to see if a property name is within the list of properties
   * reserved for internal React operations. These properties should
   * not be set on an HTML element.
   *
   * @private
   * @param {string} name
   * @return {boolean} If the name is within reserved props
   */isReservedProp:function isReservedProp(name){return RESERVED_PROPS.hasOwnProperty(name);},injection:DOMPropertyInjection};var DOMProperty_1=DOMProperty;/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactDOMComponentFlags
 */var ReactDOMComponentFlags={hasCachedChildNodes:1<<0};var ReactDOMComponentFlags_1=ReactDOMComponentFlags;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactTypeOfWork
 * 
 */var ReactTypeOfWork={IndeterminateComponent:0,// Before we know whether it is functional or class
FunctionalComponent:1,ClassComponent:2,HostRoot:3,// Root of a host tree. Could be nested inside another node.
HostPortal:4,// A subtree. Could be an entry point to a different renderer.
HostComponent:5,HostText:6,CoroutineComponent:7,CoroutineHandlerPhase:8,YieldComponent:9,Fragment:10};/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule HTMLNodeType
 *//**
 * HTML nodeType values that represent the type of the node
 */var HTMLNodeType={ELEMENT_NODE:1,TEXT_NODE:3,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_FRAGMENT_NODE:11};var HTMLNodeType_1=HTMLNodeType;var HostComponent=ReactTypeOfWork.HostComponent;var HostText=ReactTypeOfWork.HostText;var ELEMENT_NODE$1=HTMLNodeType_1.ELEMENT_NODE;var COMMENT_NODE$1=HTMLNodeType_1.COMMENT_NODE;var ATTR_NAME=DOMProperty_1.ID_ATTRIBUTE_NAME;var Flags=ReactDOMComponentFlags_1;var randomKey=Math.random().toString(36).slice(2);var internalInstanceKey='__reactInternalInstance$'+randomKey;var internalEventHandlersKey='__reactEventHandlers$'+randomKey;/**
 * Check if a given node should be cached.
 */function shouldPrecacheNode(node,nodeID){return node.nodeType===ELEMENT_NODE$1&&node.getAttribute(ATTR_NAME)===''+nodeID||node.nodeType===COMMENT_NODE$1&&node.nodeValue===' react-text: '+nodeID+' '||node.nodeType===COMMENT_NODE$1&&node.nodeValue===' react-empty: '+nodeID+' ';}/**
 * Drill down (through composites and empty components) until we get a host or
 * host text component.
 *
 * This is pretty polymorphic but unavoidable with the current structure we have
 * for `_renderedChildren`.
 */function getRenderedHostOrTextFromComponent(component){var rendered;while(rendered=component._renderedComponent){component=rendered;}return component;}/**
 * Populate `_hostNode` on the rendered host/text component with the given
 * DOM node. The passed `inst` can be a composite.
 */function precacheNode(inst,node){var hostInst=getRenderedHostOrTextFromComponent(inst);hostInst._hostNode=node;node[internalInstanceKey]=hostInst;}function precacheFiberNode$1(hostInst,node){node[internalInstanceKey]=hostInst;}function uncacheNode(inst){var node=inst._hostNode;if(node){delete node[internalInstanceKey];inst._hostNode=null;}}/**
 * Populate `_hostNode` on each child of `inst`, assuming that the children
 * match up with the DOM (element) children of `node`.
 *
 * We cache entire levels at once to avoid an n^2 problem where we access the
 * children of a node sequentially and have to walk from the start to our target
 * node every time.
 *
 * Since we update `_renderedChildren` and the actual DOM at (slightly)
 * different times, we could race here and see a newer `_renderedChildren` than
 * the DOM nodes we see. To avoid this, ReactMultiChild calls
 * `prepareToManageChildren` before we change `_renderedChildren`, at which
 * time the container's child nodes are always cached (until it unmounts).
 */function precacheChildNodes(inst,node){if(inst._flags&Flags.hasCachedChildNodes){return;}var children=inst._renderedChildren;var childNode=node.firstChild;outer:for(var name in children){if(!children.hasOwnProperty(name)){continue;}var childInst=children[name];var childID=getRenderedHostOrTextFromComponent(childInst)._domID;if(childID===0){// We're currently unmounting this child in ReactMultiChild; skip it.
continue;}// We assume the child nodes are in the same order as the child instances.
for(;childNode!==null;childNode=childNode.nextSibling){if(shouldPrecacheNode(childNode,childID)){precacheNode(childInst,childNode);continue outer;}}// We reached the end of the DOM children without finding an ID match.
invariant(false,'Unable to find element with ID %s.',childID);}inst._flags|=Flags.hasCachedChildNodes;}/**
 * Given a DOM node, return the closest ReactDOMComponent or
 * ReactDOMTextComponent instance ancestor.
 */function getClosestInstanceFromNode(node){if(node[internalInstanceKey]){return node[internalInstanceKey];}// Walk up the tree until we find an ancestor whose instance we have cached.
var parents=[];while(!node[internalInstanceKey]){parents.push(node);if(node.parentNode){node=node.parentNode;}else{// Top of the tree. This node must not be part of a React tree (or is
// unmounted, potentially).
return null;}}var closest;var inst=node[internalInstanceKey];if(inst.tag===HostComponent||inst.tag===HostText){// In Fiber, this will always be the deepest root.
return inst;}for(;node&&(inst=node[internalInstanceKey]);node=parents.pop()){closest=inst;if(parents.length){precacheChildNodes(inst,node);}}return closest;}/**
 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
 * instance, or null if the node was not rendered by this React.
 */function getInstanceFromNode(node){var inst=node[internalInstanceKey];if(inst){if(inst.tag===HostComponent||inst.tag===HostText){return inst;}else if(inst._hostNode===node){return inst;}else{return null;}}inst=getClosestInstanceFromNode(node);if(inst!=null&&inst._hostNode===node){return inst;}else{return null;}}/**
 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
 * DOM node.
 */function getNodeFromInstance(inst){if(inst.tag===HostComponent||inst.tag===HostText){// In Fiber this, is just the state node right now. We assume it will be
// a host component or host text.
return inst.stateNode;}// Without this first invariant, passing a non-DOM-component triggers the next
// invariant for a missing parent, which is super confusing.
!(inst._hostNode!==undefined)?invariant(false,'getNodeFromInstance: Invalid argument.'):void 0;if(inst._hostNode){return inst._hostNode;}// Walk up the tree until we find an ancestor whose DOM node we have cached.
var parents=[];while(!inst._hostNode){parents.push(inst);!inst._hostParent?invariant(false,'React DOM tree root should always have a node reference.'):void 0;inst=inst._hostParent;}// Now parents contains each ancestor that does *not* have a cached native
// node, and `inst` is the deepest ancestor that does.
for(;parents.length;inst=parents.pop()){precacheChildNodes(inst,inst._hostNode);}return inst._hostNode;}function getFiberCurrentPropsFromNode(node){return node[internalEventHandlersKey]||null;}function updateFiberProps$1(node,props){node[internalEventHandlersKey]=props;}var ReactDOMComponentTree={getClosestInstanceFromNode:getClosestInstanceFromNode,getInstanceFromNode:getInstanceFromNode,getNodeFromInstance:getNodeFromInstance,precacheChildNodes:precacheChildNodes,precacheNode:precacheNode,uncacheNode:uncacheNode,precacheFiberNode:precacheFiberNode$1,getFiberCurrentPropsFromNode:getFiberCurrentPropsFromNode,updateFiberProps:updateFiberProps$1};var ReactDOMComponentTree_1=ReactDOMComponentTree;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactInstanceMap
 *//**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 */// TODO: Replace this with ES6: var ReactInstanceMap = new Map();
var ReactInstanceMap={/**
   * This API should be called `delete` but we'd have to make sure to always
   * transform these to strings for IE support. When this transform is fully
   * supported we can rename it.
   */remove:function remove(key){key._reactInternalFiber=undefined;},get:function get(key){return key._reactInternalFiber;},has:function has(key){return key._reactInternalFiber!==undefined;},set:function set(key,value){key._reactInternalFiber=value;}};var ReactInstanceMap_1=ReactInstanceMap;var ReactInternals=react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;var ReactGlobalSharedState={ReactCurrentOwner:ReactInternals.ReactCurrentOwner};{_assign(ReactGlobalSharedState,{ReactComponentTreeHook:ReactInternals.ReactComponentTreeHook,ReactDebugCurrentFrame:ReactInternals.ReactDebugCurrentFrame});}var ReactGlobalSharedState_1=ReactGlobalSharedState;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule getComponentName
 * 
 */function getComponentName(instanceOrFiber){if(typeof instanceOrFiber.getName==='function'){// Stack reconciler
var instance=instanceOrFiber;return instance.getName();}if(typeof instanceOrFiber.tag==='number'){// Fiber reconciler
var fiber=instanceOrFiber;var type=fiber.type;if(typeof type==='string'){return type;}if(typeof type==='function'){return type.displayName||type.name;}}return null;}var getComponentName_1=getComponentName;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactTypeOfSideEffect
 * 
 */var ReactTypeOfSideEffect={// Don't change these two values:
NoEffect:0,//           0b00000000
PerformedWork:1,//      0b00000001
// You can change the rest (and add more).
Placement:2,//          0b00000010
Update:4,//             0b00000100
PlacementAndUpdate:6,// 0b00000110
Deletion:8,//           0b00001000
ContentReset:16,//      0b00010000
Callback:32,//          0b00100000
Err:64,//               0b01000000
Ref:128};var ReactCurrentOwner=ReactGlobalSharedState_1.ReactCurrentOwner;{var warning$1=require$$0;}var ClassComponent=ReactTypeOfWork.ClassComponent;var HostComponent$1=ReactTypeOfWork.HostComponent;var HostRoot$1=ReactTypeOfWork.HostRoot;var HostPortal=ReactTypeOfWork.HostPortal;var HostText$1=ReactTypeOfWork.HostText;var NoEffect=ReactTypeOfSideEffect.NoEffect;var Placement=ReactTypeOfSideEffect.Placement;var MOUNTING=1;var MOUNTED=2;var UNMOUNTED=3;function isFiberMountedImpl(fiber){var node=fiber;if(!fiber.alternate){// If there is no alternate, this might be a new tree that isn't inserted
// yet. If it is, then it will have a pending insertion effect on it.
if((node.effectTag&Placement)!==NoEffect){return MOUNTING;}while(node['return']){node=node['return'];if((node.effectTag&Placement)!==NoEffect){return MOUNTING;}}}else{while(node['return']){node=node['return'];}}if(node.tag===HostRoot$1){// TODO: Check if this was a nested HostRoot when used with
// renderContainerIntoSubtree.
return MOUNTED;}// If we didn't hit the root, that means that we're in an disconnected tree
// that has been unmounted.
return UNMOUNTED;}var isFiberMounted=function isFiberMounted(fiber){return isFiberMountedImpl(fiber)===MOUNTED;};var isMounted=function isMounted(component){{var owner=ReactCurrentOwner.current;if(owner!==null&&owner.tag===ClassComponent){var ownerFiber=owner;var instance=ownerFiber.stateNode;warning$1(instance._warnedAboutRefsInRender,'%s is accessing isMounted inside its render() function. '+'render() should be a pure function of props and state. It should '+'never access something that requires stale data from the previous '+'render, such as refs. Move this logic to componentDidMount and '+'componentDidUpdate instead.',getComponentName_1(ownerFiber)||'A component');instance._warnedAboutRefsInRender=true;}}var fiber=ReactInstanceMap_1.get(component);if(!fiber){return false;}return isFiberMountedImpl(fiber)===MOUNTED;};function assertIsMounted(fiber){!(isFiberMountedImpl(fiber)===MOUNTED)?invariant(false,'Unable to find node on an unmounted component.'):void 0;}function findCurrentFiberUsingSlowPath(fiber){var alternate=fiber.alternate;if(!alternate){// If there is no alternate, then we only need to check if it is mounted.
var state=isFiberMountedImpl(fiber);!(state!==UNMOUNTED)?invariant(false,'Unable to find node on an unmounted component.'):void 0;if(state===MOUNTING){return null;}return fiber;}// If we have two possible branches, we'll walk backwards up to the root
// to see what path the root points to. On the way we may hit one of the
// special cases and we'll deal with them.
var a=fiber;var b=alternate;while(true){var parentA=a['return'];var parentB=parentA?parentA.alternate:null;if(!parentA||!parentB){// We're at the root.
break;}// If both copies of the parent fiber point to the same child, we can
// assume that the child is current. This happens when we bailout on low
// priority: the bailed out fiber's child reuses the current child.
if(parentA.child===parentB.child){var child=parentA.child;while(child){if(child===a){// We've determined that A is the current branch.
assertIsMounted(parentA);return fiber;}if(child===b){// We've determined that B is the current branch.
assertIsMounted(parentA);return alternate;}child=child.sibling;}// We should never have an alternate for any mounting node. So the only
// way this could possibly happen is if this was unmounted, if at all.
invariant(false,'Unable to find node on an unmounted component.');}if(a['return']!==b['return']){// The return pointer of A and the return pointer of B point to different
// fibers. We assume that return pointers never criss-cross, so A must
// belong to the child set of A.return, and B must belong to the child
// set of B.return.
a=parentA;b=parentB;}else{// The return pointers point to the same fiber. We'll have to use the
// default, slow path: scan the child sets of each parent alternate to see
// which child belongs to which set.
//
// Search parent A's child set
var didFindChild=false;var _child=parentA.child;while(_child){if(_child===a){didFindChild=true;a=parentA;b=parentB;break;}if(_child===b){didFindChild=true;b=parentA;a=parentB;break;}_child=_child.sibling;}if(!didFindChild){// Search parent B's child set
_child=parentB.child;while(_child){if(_child===a){didFindChild=true;a=parentB;b=parentA;break;}if(_child===b){didFindChild=true;b=parentB;a=parentA;break;}_child=_child.sibling;}!didFindChild?invariant(false,'Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.'):void 0;}}!(a.alternate===b)?invariant(false,'Return fibers should always be each others\' alternates. This error is likely caused by a bug in React. Please file an issue.'):void 0;}// If the root is not a host container, we're in a disconnected tree. I.e.
// unmounted.
!(a.tag===HostRoot$1)?invariant(false,'Unable to find node on an unmounted component.'):void 0;if(a.stateNode.current===a){// We've determined that A is the current branch.
return fiber;}// Otherwise B has to be current branch.
return alternate;}var findCurrentFiberUsingSlowPath_1=findCurrentFiberUsingSlowPath;var findCurrentHostFiber=function findCurrentHostFiber(parent){var currentParent=findCurrentFiberUsingSlowPath(parent);if(!currentParent){return null;}// Next we'll drill down this component to find the first HostComponent/Text.
var node=currentParent;while(true){if(node.tag===HostComponent$1||node.tag===HostText$1){return node;}else if(node.child){node.child['return']=node;node=node.child;continue;}if(node===currentParent){return null;}while(!node.sibling){if(!node['return']||node['return']===currentParent){return null;}node=node['return'];}node.sibling['return']=node['return'];node=node.sibling;}// Flow needs the return null here, but ESLint complains about it.
// eslint-disable-next-line no-unreachable
return null;};var findCurrentHostFiberWithNoPortals=function findCurrentHostFiberWithNoPortals(parent){var currentParent=findCurrentFiberUsingSlowPath(parent);if(!currentParent){return null;}// Next we'll drill down this component to find the first HostComponent/Text.
var node=currentParent;while(true){if(node.tag===HostComponent$1||node.tag===HostText$1){return node;}else if(node.child&&node.tag!==HostPortal){node.child['return']=node;node=node.child;continue;}if(node===currentParent){return null;}while(!node.sibling){if(!node['return']||node['return']===currentParent){return null;}node=node['return'];}node.sibling['return']=node['return'];node=node.sibling;}// Flow needs the return null here, but ESLint complains about it.
// eslint-disable-next-line no-unreachable
return null;};var ReactFiberTreeReflection={isFiberMounted:isFiberMounted,isMounted:isMounted,findCurrentFiberUsingSlowPath:findCurrentFiberUsingSlowPath_1,findCurrentHostFiber:findCurrentHostFiber,findCurrentHostFiberWithNoPortals:findCurrentHostFiberWithNoPortals};var ReactErrorUtils={// Used by Fiber to simulate a try-catch.
_caughtError:null,_hasCaughtError:false,// Used by event system to capture/rethrow the first error.
_rethrowError:null,_hasRethrowError:false,injection:{injectErrorUtils:function injectErrorUtils(injectedErrorUtils){!(typeof injectedErrorUtils.invokeGuardedCallback==='function')?invariant(false,'Injected invokeGuardedCallback() must be a function.'):void 0;_invokeGuardedCallback=injectedErrorUtils.invokeGuardedCallback;}},/**
   * Call a function while guarding against errors that happens within it.
   * Returns an error if it throws, otherwise null.
   *
   * In production, this is implemented using a try-catch. The reason we don't
   * use a try-catch directly is so that we can swap out a different
   * implementation in DEV mode.
   *
   * @param {String} name of the guard to use for logging or debugging
   * @param {Function} func The function to invoke
   * @param {*} context The context to use when calling the function
   * @param {...*} args Arguments for function
   */invokeGuardedCallback:function invokeGuardedCallback(name,func,context,a,b,c,d,e,f){_invokeGuardedCallback.apply(ReactErrorUtils,arguments);},/**
   * Same as invokeGuardedCallback, but instead of returning an error, it stores
   * it in a global so it can be rethrown by `rethrowCaughtError` later.
   * TODO: See if _caughtError and _rethrowError can be unified.
   *
   * @param {String} name of the guard to use for logging or debugging
   * @param {Function} func The function to invoke
   * @param {*} context The context to use when calling the function
   * @param {...*} args Arguments for function
   */invokeGuardedCallbackAndCatchFirstError:function invokeGuardedCallbackAndCatchFirstError(name,func,context,a,b,c,d,e,f){ReactErrorUtils.invokeGuardedCallback.apply(this,arguments);if(ReactErrorUtils.hasCaughtError()){var error=ReactErrorUtils.clearCaughtError();if(!ReactErrorUtils._hasRethrowError){ReactErrorUtils._hasRethrowError=true;ReactErrorUtils._rethrowError=error;}}},/**
   * During execution of guarded functions we will capture the first error which
   * we will rethrow to be handled by the top level error handler.
   */rethrowCaughtError:function rethrowCaughtError(){return _rethrowCaughtError.apply(ReactErrorUtils,arguments);},hasCaughtError:function hasCaughtError(){return ReactErrorUtils._hasCaughtError;},clearCaughtError:function clearCaughtError(){if(ReactErrorUtils._hasCaughtError){var error=ReactErrorUtils._caughtError;ReactErrorUtils._caughtError=null;ReactErrorUtils._hasCaughtError=false;return error;}else{invariant(false,'clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.');}}};var _invokeGuardedCallback=function _invokeGuardedCallback(name,func,context,a,b,c,d,e,f){ReactErrorUtils._hasCaughtError=false;ReactErrorUtils._caughtError=null;var funcArgs=Array.prototype.slice.call(arguments,3);try{func.apply(context,funcArgs);}catch(error){ReactErrorUtils._caughtError=error;ReactErrorUtils._hasCaughtError=true;}};{// In DEV mode, we swap out invokeGuardedCallback for a special version
// that plays more nicely with the browser's DevTools. The idea is to preserve
// "Pause on exceptions" behavior. Because React wraps all user-provided
// functions in invokeGuardedCallback, and the production version of
// invokeGuardedCallback uses a try-catch, all user exceptions are treated
// like caught exceptions, and the DevTools won't pause unless the developer
// takes the extra step of enabling pause on caught exceptions. This is
// untintuitive, though, because even though React has caught the error, from
// the developer's perspective, the error is uncaught.
//
// To preserve the expected "Pause on exceptions" behavior, we don't use a
// try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
// DOM node, and call the user-provided callback from inside an event handler
// for that fake event. If the callback throws, the error is "captured" using
// a global event handler. But because the error happens in a different
// event loop context, it does not interrupt the normal program flow.
// Effectively, this gives us try-catch behavior without actually using
// try-catch. Neat!
// Check that the browser supports the APIs we need to implement our special
// DEV version of invokeGuardedCallback
if(typeof window!=='undefined'&&typeof window.dispatchEvent==='function'&&typeof document!=='undefined'&&typeof document.createEvent==='function'){var fakeNode=document.createElement('react');var invokeGuardedCallbackDev=function invokeGuardedCallbackDev(name,func,context,a,b,c,d,e,f){// Keeps track of whether the user-provided callback threw an error. We
// set this to true at the beginning, then set it to false right after
// calling the function. If the function errors, `didError` will never be
// set to false. This strategy works even if the browser is flaky and
// fails to call our global error handler, because it doesn't rely on
// the error event at all.
var didError=true;// Create an event handler for our fake event. We will synchronously
// dispatch our fake event using `dispatchEvent`. Inside the handler, we
// call the user-provided callback.
var funcArgs=Array.prototype.slice.call(arguments,3);function callCallback(){// We immediately remove the callback from event listeners so that
// nested `invokeGuardedCallback` calls do not clash. Otherwise, a
// nested call would trigger the fake event handlers of any call higher
// in the stack.
fakeNode.removeEventListener(evtType,callCallback,false);func.apply(context,funcArgs);didError=false;}// Create a global error event handler. We use this to capture the value
// that was thrown. It's possible that this error handler will fire more
// than once; for example, if non-React code also calls `dispatchEvent`
// and a handler for that event throws. We should be resilient to most of
// those cases. Even if our error event handler fires more than once, the
// last error event is always used. If the callback actually does error,
// we know that the last error event is the correct one, because it's not
// possible for anything else to have happened in between our callback
// erroring and the code that follows the `dispatchEvent` call below. If
// the callback doesn't error, but the error event was fired, we know to
// ignore it because `didError` will be false, as described above.
var error=void 0;// Use this to track whether the error event is ever called.
var didSetError=false;var isCrossOriginError=false;function onError(event){error=event.error;didSetError=true;if(error===null&&event.colno===0&&event.lineno===0){isCrossOriginError=true;}}// Create a fake event type.
var evtType='react-'+(name?name:'invokeguardedcallback');// Attach our event handlers
window.addEventListener('error',onError);fakeNode.addEventListener(evtType,callCallback,false);// Synchronously dispatch our fake event. If the user-provided function
// errors, it will trigger our global error handler.
var evt=document.createEvent('Event');evt.initEvent(evtType,false,false);fakeNode.dispatchEvent(evt);if(didError){if(!didSetError){// The callback errored, but the error event never fired.
error=new Error('An error was thrown inside one of your components, but React '+"doesn't know what it was. This is likely due to browser "+'flakiness. React does its best to preserve the "Pause on '+'exceptions" behavior of the DevTools, which requires some '+"DEV-mode only tricks. It's possible that these don't work in "+'your browser. Try triggering the error in production mode, '+'or switching to a modern browser. If you suspect that this is '+'actually an issue with React, please file an issue.');}else if(isCrossOriginError){error=new Error("A cross-origin error was thrown. React doesn't have access to "+'the actual error object in development. '+'See https://fb.me/react-crossorigin-error for more information.');}ReactErrorUtils._hasCaughtError=true;ReactErrorUtils._caughtError=error;}else{ReactErrorUtils._hasCaughtError=false;ReactErrorUtils._caughtError=null;}// Remove our event listeners
window.removeEventListener('error',onError);};_invokeGuardedCallback=invokeGuardedCallbackDev;}}var _rethrowCaughtError=function _rethrowCaughtError(){if(ReactErrorUtils._hasRethrowError){var error=ReactErrorUtils._rethrowError;ReactErrorUtils._rethrowError=null;ReactErrorUtils._hasRethrowError=false;throw error;}};var ReactErrorUtils_1=ReactErrorUtils;{var warning$2=require$$0;}/**
 * Injected dependencies:
 *//**
 * - `ComponentTree`: [required] Module that can convert between React instances
 *   and actual node references.
 */var ComponentTree;var injection={injectComponentTree:function injectComponentTree(Injected){ComponentTree=Injected;{warning$2(Injected&&Injected.getNodeFromInstance&&Injected.getInstanceFromNode,'EventPluginUtils.injection.injectComponentTree(...): Injected '+'module is missing getNodeFromInstance or getInstanceFromNode.');}}};function isEndish(topLevelType){return topLevelType==='topMouseUp'||topLevelType==='topTouchEnd'||topLevelType==='topTouchCancel';}function isMoveish(topLevelType){return topLevelType==='topMouseMove'||topLevelType==='topTouchMove';}function isStartish(topLevelType){return topLevelType==='topMouseDown'||topLevelType==='topTouchStart';}var validateEventDispatches;{validateEventDispatches=function validateEventDispatches(event){var dispatchListeners=event._dispatchListeners;var dispatchInstances=event._dispatchInstances;var listenersIsArr=Array.isArray(dispatchListeners);var listenersLen=listenersIsArr?dispatchListeners.length:dispatchListeners?1:0;var instancesIsArr=Array.isArray(dispatchInstances);var instancesLen=instancesIsArr?dispatchInstances.length:dispatchInstances?1:0;warning$2(instancesIsArr===listenersIsArr&&instancesLen===listenersLen,'EventPluginUtils: Invalid `event`.');};}/**
 * Dispatch the event to the listener.
 * @param {SyntheticEvent} event SyntheticEvent to handle
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @param {function} listener Application-level callback
 * @param {*} inst Internal component instance
 */function executeDispatch(event,simulated,listener,inst){var type=event.type||'unknown-event';event.currentTarget=EventPluginUtils.getNodeFromInstance(inst);ReactErrorUtils_1.invokeGuardedCallbackAndCatchFirstError(type,listener,undefined,event);event.currentTarget=null;}/**
 * Standard/simple iteration through an event's collected dispatches.
 */function executeDispatchesInOrder(event,simulated){var dispatchListeners=event._dispatchListeners;var dispatchInstances=event._dispatchInstances;{validateEventDispatches(event);}if(Array.isArray(dispatchListeners)){for(var i=0;i<dispatchListeners.length;i++){if(event.isPropagationStopped()){break;}// Listeners and Instances are two parallel arrays that are always in sync.
executeDispatch(event,simulated,dispatchListeners[i],dispatchInstances[i]);}}else if(dispatchListeners){executeDispatch(event,simulated,dispatchListeners,dispatchInstances);}event._dispatchListeners=null;event._dispatchInstances=null;}/**
 * Standard/simple iteration through an event's collected dispatches, but stops
 * at the first dispatch execution returning true, and returns that id.
 *
 * @return {?string} id of the first dispatch execution who's listener returns
 * true, or null if no listener returned true.
 */function executeDispatchesInOrderStopAtTrueImpl(event){var dispatchListeners=event._dispatchListeners;var dispatchInstances=event._dispatchInstances;{validateEventDispatches(event);}if(Array.isArray(dispatchListeners)){for(var i=0;i<dispatchListeners.length;i++){if(event.isPropagationStopped()){break;}// Listeners and Instances are two parallel arrays that are always in sync.
if(dispatchListeners[i](event,dispatchInstances[i])){return dispatchInstances[i];}}}else if(dispatchListeners){if(dispatchListeners(event,dispatchInstances)){return dispatchInstances;}}return null;}/**
 * @see executeDispatchesInOrderStopAtTrueImpl
 */function executeDispatchesInOrderStopAtTrue(event){var ret=executeDispatchesInOrderStopAtTrueImpl(event);event._dispatchInstances=null;event._dispatchListeners=null;return ret;}/**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return {*} The return value of executing the single dispatch.
 */function executeDirectDispatch(event){{validateEventDispatches(event);}var dispatchListener=event._dispatchListeners;var dispatchInstance=event._dispatchInstances;!!Array.isArray(dispatchListener)?invariant(false,'executeDirectDispatch(...): Invalid `event`.'):void 0;event.currentTarget=dispatchListener?EventPluginUtils.getNodeFromInstance(dispatchInstance):null;var res=dispatchListener?dispatchListener(event):null;event.currentTarget=null;event._dispatchListeners=null;event._dispatchInstances=null;return res;}/**
 * @param {SyntheticEvent} event
 * @return {boolean} True iff number of dispatches accumulated is greater than 0.
 */function hasDispatches(event){return!!event._dispatchListeners;}/**
 * General utilities that are useful in creating custom Event Plugins.
 */var EventPluginUtils={isEndish:isEndish,isMoveish:isMoveish,isStartish:isStartish,executeDirectDispatch:executeDirectDispatch,executeDispatchesInOrder:executeDispatchesInOrder,executeDispatchesInOrderStopAtTrue:executeDispatchesInOrderStopAtTrue,hasDispatches:hasDispatches,getFiberCurrentPropsFromNode:function getFiberCurrentPropsFromNode(node){return ComponentTree.getFiberCurrentPropsFromNode(node);},getInstanceFromNode:function getInstanceFromNode(node){return ComponentTree.getInstanceFromNode(node);},getNodeFromInstance:function getNodeFromInstance(node){return ComponentTree.getNodeFromInstance(node);},injection:injection};var EventPluginUtils_1=EventPluginUtils;// Use to restore controlled state after a change event has fired.
var fiberHostComponent=null;var ReactControlledComponentInjection={injectFiberControlledHostComponent:function injectFiberControlledHostComponent(hostComponentImpl){// The fiber implementation doesn't use dynamic dispatch so we need to
// inject the implementation.
fiberHostComponent=hostComponentImpl;}};var restoreTarget=null;var restoreQueue=null;function restoreStateOfTarget(target){// We perform this translation at the end of the event loop so that we
// always receive the correct fiber here
var internalInstance=EventPluginUtils_1.getInstanceFromNode(target);if(!internalInstance){// Unmounted
return;}if(typeof internalInstance.tag==='number'){!(fiberHostComponent&&typeof fiberHostComponent.restoreControlledState==='function')?invariant(false,'Fiber needs to be injected to handle a fiber target for controlled events. This error is likely caused by a bug in React. Please file an issue.'):void 0;var props=EventPluginUtils_1.getFiberCurrentPropsFromNode(internalInstance.stateNode);fiberHostComponent.restoreControlledState(internalInstance.stateNode,internalInstance.type,props);return;}!(typeof internalInstance.restoreControlledState==='function')?invariant(false,'The internal instance must be a React host component. This error is likely caused by a bug in React. Please file an issue.'):void 0;// If it is not a Fiber, we can just use dynamic dispatch.
internalInstance.restoreControlledState();}var ReactControlledComponent={injection:ReactControlledComponentInjection,enqueueStateRestore:function enqueueStateRestore(target){if(restoreTarget){if(restoreQueue){restoreQueue.push(target);}else{restoreQueue=[target];}}else{restoreTarget=target;}},restoreStateIfNeeded:function restoreStateIfNeeded(){if(!restoreTarget){return;}var target=restoreTarget;var queuedTargets=restoreQueue;restoreTarget=null;restoreQueue=null;restoreStateOfTarget(target);if(queuedTargets){for(var i=0;i<queuedTargets.length;i++){restoreStateOfTarget(queuedTargets[i]);}}}};var ReactControlledComponent_1=ReactControlledComponent;// Used as a way to call batchedUpdates when we don't know if we're in a Fiber
// or Stack context. Such as when we're dispatching events or if third party
// libraries need to call batchedUpdates. Eventually, this API will go away when
// everything is batched by default. We'll then have a similar API to opt-out of
// scheduled work and instead do synchronous work.
// Defaults
var stackBatchedUpdates=function stackBatchedUpdates(fn,a,b,c,d,e){return fn(a,b,c,d,e);};var fiberBatchedUpdates=function fiberBatchedUpdates(fn,bookkeeping){return fn(bookkeeping);};function performFiberBatchedUpdates(fn,bookkeeping){// If we have Fiber loaded, we need to wrap this in a batching call so that
// Fiber can apply its default priority for this call.
return fiberBatchedUpdates(fn,bookkeeping);}function batchedUpdates(fn,bookkeeping){// We first perform work with the stack batching strategy, by passing our
// indirection to it.
return stackBatchedUpdates(performFiberBatchedUpdates,fn,bookkeeping);}var isNestingBatched=false;function batchedUpdatesWithControlledComponents(fn,bookkeeping){if(isNestingBatched){// If we are currently inside another batch, we need to wait until it
// fully completes before restoring state. Therefore, we add the target to
// a queue of work.
return batchedUpdates(fn,bookkeeping);}isNestingBatched=true;try{return batchedUpdates(fn,bookkeeping);}finally{// Here we wait until all updates have propagated, which is important
// when using controlled components within layers:
// https://github.com/facebook/react/issues/1698
// Then we restore state of any controlled component.
isNestingBatched=false;ReactControlledComponent_1.restoreStateIfNeeded();}}var ReactGenericBatchingInjection={injectStackBatchedUpdates:function injectStackBatchedUpdates(_batchedUpdates){stackBatchedUpdates=_batchedUpdates;},injectFiberBatchedUpdates:function injectFiberBatchedUpdates(_batchedUpdates){fiberBatchedUpdates=_batchedUpdates;}};var ReactGenericBatching={batchedUpdates:batchedUpdatesWithControlledComponents,injection:ReactGenericBatchingInjection};var ReactGenericBatching_1=ReactGenericBatching;var TEXT_NODE$1=HTMLNodeType_1.TEXT_NODE;/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */function getEventTarget(nativeEvent){var target=nativeEvent.target||nativeEvent.srcElement||window;// Normalize SVG <use> element events #4963
if(target.correspondingUseElement){target=target.correspondingUseElement;}// Safari may fire events on text nodes (Node.TEXT_NODE is 3).
// @see http://www.quirksmode.org/js/events_properties.html
return target.nodeType===TEXT_NODE$1?target.parentNode:target;}var getEventTarget_1=getEventTarget;var HostRoot=ReactTypeOfWork.HostRoot;var CALLBACK_BOOKKEEPING_POOL_SIZE=10;var callbackBookkeepingPool=[];/**
 * Find the deepest React component completely containing the root of the
 * passed-in instance (for use when entire React trees are nested within each
 * other). If React trees are not nested, returns null.
 */function findRootContainerNode(inst){// TODO: It may be a good idea to cache this to prevent unnecessary DOM
// traversal, but caching is difficult to do correctly without using a
// mutation observer to listen for all DOM changes.
if(typeof inst.tag==='number'){while(inst['return']){inst=inst['return'];}if(inst.tag!==HostRoot){// This can happen if we're in a detached tree.
return null;}return inst.stateNode.containerInfo;}else{while(inst._hostParent){inst=inst._hostParent;}var rootNode=ReactDOMComponentTree_1.getNodeFromInstance(inst);return rootNode.parentNode;}}// Used to store ancestor hierarchy in top level callback
function getTopLevelCallbackBookKeeping(topLevelType,nativeEvent,targetInst){if(callbackBookkeepingPool.length){var instance=callbackBookkeepingPool.pop();instance.topLevelType=topLevelType;instance.nativeEvent=nativeEvent;instance.targetInst=targetInst;return instance;}return{topLevelType:topLevelType,nativeEvent:nativeEvent,targetInst:targetInst,ancestors:[]};}function releaseTopLevelCallbackBookKeeping(instance){instance.topLevelType=null;instance.nativeEvent=null;instance.targetInst=null;instance.ancestors.length=0;if(callbackBookkeepingPool.length<CALLBACK_BOOKKEEPING_POOL_SIZE){callbackBookkeepingPool.push(instance);}}function handleTopLevelImpl(bookKeeping){var targetInst=bookKeeping.targetInst;// Loop through the hierarchy, in case there's any nested components.
// It's important that we build the array of ancestors before calling any
// event handlers, because event handlers can modify the DOM, leading to
// inconsistencies with ReactMount's node cache. See #1105.
var ancestor=targetInst;do{if(!ancestor){bookKeeping.ancestors.push(ancestor);break;}var root=findRootContainerNode(ancestor);if(!root){break;}bookKeeping.ancestors.push(ancestor);ancestor=ReactDOMComponentTree_1.getClosestInstanceFromNode(root);}while(ancestor);for(var i=0;i<bookKeeping.ancestors.length;i++){targetInst=bookKeeping.ancestors[i];ReactDOMEventListener._handleTopLevel(bookKeeping.topLevelType,targetInst,bookKeeping.nativeEvent,getEventTarget_1(bookKeeping.nativeEvent));}}var ReactDOMEventListener={_enabled:true,_handleTopLevel:null,setHandleTopLevel:function setHandleTopLevel(handleTopLevel){ReactDOMEventListener._handleTopLevel=handleTopLevel;},setEnabled:function setEnabled(enabled){ReactDOMEventListener._enabled=!!enabled;},isEnabled:function isEnabled(){return ReactDOMEventListener._enabled;},/**
   * Traps top-level events by using event bubbling.
   *
   * @param {string} topLevelType Record from `BrowserEventConstants`.
   * @param {string} handlerBaseName Event name (e.g. "click").
   * @param {object} element Element on which to attach listener.
   * @return {?object} An object with a remove function which will forcefully
   *                  remove the listener.
   * @internal
   */trapBubbledEvent:function trapBubbledEvent(topLevelType,handlerBaseName,element){if(!element){return null;}return EventListener.listen(element,handlerBaseName,ReactDOMEventListener.dispatchEvent.bind(null,topLevelType));},/**
   * Traps a top-level event by using event capturing.
   *
   * @param {string} topLevelType Record from `BrowserEventConstants`.
   * @param {string} handlerBaseName Event name (e.g. "click").
   * @param {object} element Element on which to attach listener.
   * @return {?object} An object with a remove function which will forcefully
   *                  remove the listener.
   * @internal
   */trapCapturedEvent:function trapCapturedEvent(topLevelType,handlerBaseName,element){if(!element){return null;}return EventListener.capture(element,handlerBaseName,ReactDOMEventListener.dispatchEvent.bind(null,topLevelType));},dispatchEvent:function dispatchEvent(topLevelType,nativeEvent){if(!ReactDOMEventListener._enabled){return;}var nativeEventTarget=getEventTarget_1(nativeEvent);var targetInst=ReactDOMComponentTree_1.getClosestInstanceFromNode(nativeEventTarget);if(targetInst!==null&&typeof targetInst.tag==='number'&&!ReactFiberTreeReflection.isFiberMounted(targetInst)){// If we get an event (ex: img onload) before committing that
// component's mount, ignore it for now (that is, treat it as if it was an
// event on a non-React tree). We might also consider queueing events and
// dispatching them after the mount.
targetInst=null;}var bookKeeping=getTopLevelCallbackBookKeeping(topLevelType,nativeEvent,targetInst);try{// Event queue being processed in the same cycle allows
// `preventDefault`.
ReactGenericBatching_1.batchedUpdates(handleTopLevelImpl,bookKeeping);}finally{releaseTopLevelCallbackBookKeeping(bookKeeping);}}};var ReactDOMEventListener_1=ReactDOMEventListener;/**
 * Accumulates items that must not be null or undefined into the first one. This
 * is used to conserve memory by avoiding array allocations, and thus sacrifices
 * API cleanness. Since `current` can be null before being passed in and not
 * null after this function, make sure to assign it back to `current`:
 *
 * `a = accumulateInto(a, b);`
 *
 * This API should be sparingly used. Try `accumulate` for something cleaner.
 *
 * @return {*|array<*>} An accumulation of items.
 */function accumulateInto(current,next){!(next!=null)?invariant(false,'accumulateInto(...): Accumulated items must not be null or undefined.'):void 0;if(current==null){return next;}// Both are not empty. Warning: Never call x.concat(y) when you are not
// certain that x is an Array (x could be a string with concat method).
if(Array.isArray(current)){if(Array.isArray(next)){current.push.apply(current,next);return current;}current.push(next);return current;}if(Array.isArray(next)){// A bit too dangerous to mutate `next`.
return[current].concat(next);}return[current,next];}var accumulateInto_1=accumulateInto;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule forEachAccumulated
 * 
 *//**
 * @param {array} arr an "accumulation" of items which is either an Array or
 * a single item. Useful when paired with the `accumulate` module. This is a
 * simple utility that allows us to reason about a collection of items, but
 * handling the case when there is exactly one item (and we do not need to
 * allocate an array).
 * @param {function} cb Callback invoked with each element or a collection.
 * @param {?} [scope] Scope used as `this` in a callback.
 */function forEachAccumulated(arr,cb,scope){if(Array.isArray(arr)){arr.forEach(cb,scope);}else if(arr){cb.call(scope,arr);}}var forEachAccumulated_1=forEachAccumulated;/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */var eventQueue=null;/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @private
 */var executeDispatchesAndRelease=function executeDispatchesAndRelease(event,simulated){if(event){EventPluginUtils_1.executeDispatchesInOrder(event,simulated);if(!event.isPersistent()){event.constructor.release(event);}}};var executeDispatchesAndReleaseSimulated=function executeDispatchesAndReleaseSimulated(e){return executeDispatchesAndRelease(e,true);};var executeDispatchesAndReleaseTopLevel=function executeDispatchesAndReleaseTopLevel(e){return executeDispatchesAndRelease(e,false);};function isInteractive(tag){return tag==='button'||tag==='input'||tag==='select'||tag==='textarea';}function shouldPreventMouseEvent(name,type,props){switch(name){case'onClick':case'onClickCapture':case'onDoubleClick':case'onDoubleClickCapture':case'onMouseDown':case'onMouseDownCapture':case'onMouseMove':case'onMouseMoveCapture':case'onMouseUp':case'onMouseUpCapture':return!!(props.disabled&&isInteractive(type));default:return false;}}/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 */var EventPluginHub={/**
   * Methods for injecting dependencies.
   */injection:{/**
     * @param {array} InjectedEventPluginOrder
     * @public
     */injectEventPluginOrder:EventPluginRegistry_1.injectEventPluginOrder,/**
     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
     */injectEventPluginsByName:EventPluginRegistry_1.injectEventPluginsByName},/**
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @return {?function} The stored callback.
   */getListener:function getListener(inst,registrationName){var listener;// TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
// live here; needs to be moved to a better place soon
if(typeof inst.tag==='number'){var stateNode=inst.stateNode;if(!stateNode){// Work in progress (ex: onload events in incremental mode).
return null;}var props=EventPluginUtils_1.getFiberCurrentPropsFromNode(stateNode);if(!props){// Work in progress.
return null;}listener=props[registrationName];if(shouldPreventMouseEvent(registrationName,inst.type,props)){return null;}}else{var currentElement=inst._currentElement;if(typeof currentElement==='string'||typeof currentElement==='number'){// Text node, let it bubble through.
return null;}if(!inst._rootNodeID){// If the instance is already unmounted, we have no listeners.
return null;}var _props=currentElement.props;listener=_props[registrationName];if(shouldPreventMouseEvent(registrationName,currentElement.type,_props)){return null;}}!(!listener||typeof listener==='function')?invariant(false,'Expected `%s` listener to be a function, instead got a value of `%s` type.',registrationName,typeof listener==='undefined'?'undefined':_typeof(listener)):void 0;return listener;},/**
   * Allows registered plugins an opportunity to extract events from top-level
   * native browser events.
   *
   * @return {*} An accumulation of synthetic events.
   * @internal
   */extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){var events;var plugins=EventPluginRegistry_1.plugins;for(var i=0;i<plugins.length;i++){// Not every plugin in the ordering may be loaded at runtime.
var possiblePlugin=plugins[i];if(possiblePlugin){var extractedEvents=possiblePlugin.extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget);if(extractedEvents){events=accumulateInto_1(events,extractedEvents);}}}return events;},/**
   * Enqueues a synthetic event that should be dispatched when
   * `processEventQueue` is invoked.
   *
   * @param {*} events An accumulation of synthetic events.
   * @internal
   */enqueueEvents:function enqueueEvents(events){if(events){eventQueue=accumulateInto_1(eventQueue,events);}},/**
   * Dispatches all synthetic events on the event queue.
   *
   * @internal
   */processEventQueue:function processEventQueue(simulated){// Set `eventQueue` to null before processing it so that we can tell if more
// events get enqueued while processing.
var processingEventQueue=eventQueue;eventQueue=null;if(simulated){forEachAccumulated_1(processingEventQueue,executeDispatchesAndReleaseSimulated);}else{forEachAccumulated_1(processingEventQueue,executeDispatchesAndReleaseTopLevel);}!!eventQueue?invariant(false,'processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented.'):void 0;// This would be a good time to rethrow if any of the event handlers threw.
ReactErrorUtils_1.rethrowCaughtError();}};var EventPluginHub_1=EventPluginHub;function runEventQueueInBatch(events){EventPluginHub_1.enqueueEvents(events);EventPluginHub_1.processEventQueue(false);}var ReactEventEmitterMixin={/**
   * Streams a fired top-level event to `EventPluginHub` where plugins have the
   * opportunity to create `ReactEvent`s to be dispatched.
   */handleTopLevel:function handleTopLevel(topLevelType,targetInst,nativeEvent,nativeEventTarget){var events=EventPluginHub_1.extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget);runEventQueueInBatch(events);}};var ReactEventEmitterMixin_1=ReactEventEmitterMixin;var useHasFeature;if(ExecutionEnvironment.canUseDOM){useHasFeature=document.implementation&&document.implementation.hasFeature&&// always returns true in newer browsers as per the standard.
// @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
document.implementation.hasFeature('','')!==true;}/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */function isEventSupported(eventNameSuffix,capture){if(!ExecutionEnvironment.canUseDOM||capture&&!('addEventListener'in document)){return false;}var eventName='on'+eventNameSuffix;var isSupported=eventName in document;if(!isSupported){var element=document.createElement('div');element.setAttribute(eventName,'return;');isSupported=typeof element[eventName]==='function';}if(!isSupported&&useHasFeature&&eventNameSuffix==='wheel'){// This is the only way to test support for the `wheel` event in IE9+.
isSupported=document.implementation.hasFeature('Events.wheel','3.0');}return isSupported;}var isEventSupported_1=isEventSupported;/**
 * Generate a mapping of standard vendor prefixes using the defined style property and event name.
 *
 * @param {string} styleProp
 * @param {string} eventName
 * @returns {object}
 */function makePrefixMap(styleProp,eventName){var prefixes={};prefixes[styleProp.toLowerCase()]=eventName.toLowerCase();prefixes['Webkit'+styleProp]='webkit'+eventName;prefixes['Moz'+styleProp]='moz'+eventName;prefixes['ms'+styleProp]='MS'+eventName;prefixes['O'+styleProp]='o'+eventName.toLowerCase();return prefixes;}/**
 * A list of event names to a configurable list of vendor prefixes.
 */var vendorPrefixes={animationend:makePrefixMap('Animation','AnimationEnd'),animationiteration:makePrefixMap('Animation','AnimationIteration'),animationstart:makePrefixMap('Animation','AnimationStart'),transitionend:makePrefixMap('Transition','TransitionEnd')};/**
 * Event names that have already been detected and prefixed (if applicable).
 */var prefixedEventNames={};/**
 * Element to check for prefixes on.
 */var style={};/**
 * Bootstrap if a DOM exists.
 */if(ExecutionEnvironment.canUseDOM){style=document.createElement('div').style;// On some platforms, in particular some releases of Android 4.x,
// the un-prefixed "animation" and "transition" properties are defined on the
// style object but the events that fire will still be prefixed, so we need
// to check if the un-prefixed events are usable, and if not remove them from the map.
if(!('AnimationEvent'in window)){delete vendorPrefixes.animationend.animation;delete vendorPrefixes.animationiteration.animation;delete vendorPrefixes.animationstart.animation;}// Same as above
if(!('TransitionEvent'in window)){delete vendorPrefixes.transitionend.transition;}}/**
 * Attempts to determine the correct vendor prefixed event name.
 *
 * @param {string} eventName
 * @returns {string}
 */function getVendorPrefixedEventName(eventName){if(prefixedEventNames[eventName]){return prefixedEventNames[eventName];}else if(!vendorPrefixes[eventName]){return eventName;}var prefixMap=vendorPrefixes[eventName];for(var styleProp in prefixMap){if(prefixMap.hasOwnProperty(styleProp)&&styleProp in style){return prefixedEventNames[eventName]=prefixMap[styleProp];}}return'';}var getVendorPrefixedEventName_1=getVendorPrefixedEventName;/**
 * Types of raw signals from the browser caught at the top level.
 *
 * For events like 'submit' which don't consistently bubble (which we
 * trap at a lower node than `document`), binding at `document` would
 * cause duplicate events so we don't include them here.
 */var topLevelTypes$1={topAbort:'abort',topAnimationEnd:getVendorPrefixedEventName_1('animationend')||'animationend',topAnimationIteration:getVendorPrefixedEventName_1('animationiteration')||'animationiteration',topAnimationStart:getVendorPrefixedEventName_1('animationstart')||'animationstart',topBlur:'blur',topCancel:'cancel',topCanPlay:'canplay',topCanPlayThrough:'canplaythrough',topChange:'change',topClick:'click',topClose:'close',topCompositionEnd:'compositionend',topCompositionStart:'compositionstart',topCompositionUpdate:'compositionupdate',topContextMenu:'contextmenu',topCopy:'copy',topCut:'cut',topDoubleClick:'dblclick',topDrag:'drag',topDragEnd:'dragend',topDragEnter:'dragenter',topDragExit:'dragexit',topDragLeave:'dragleave',topDragOver:'dragover',topDragStart:'dragstart',topDrop:'drop',topDurationChange:'durationchange',topEmptied:'emptied',topEncrypted:'encrypted',topEnded:'ended',topError:'error',topFocus:'focus',topInput:'input',topKeyDown:'keydown',topKeyPress:'keypress',topKeyUp:'keyup',topLoadedData:'loadeddata',topLoad:'load',topLoadedMetadata:'loadedmetadata',topLoadStart:'loadstart',topMouseDown:'mousedown',topMouseMove:'mousemove',topMouseOut:'mouseout',topMouseOver:'mouseover',topMouseUp:'mouseup',topPaste:'paste',topPause:'pause',topPlay:'play',topPlaying:'playing',topProgress:'progress',topRateChange:'ratechange',topScroll:'scroll',topSeeked:'seeked',topSeeking:'seeking',topSelectionChange:'selectionchange',topStalled:'stalled',topSuspend:'suspend',topTextInput:'textInput',topTimeUpdate:'timeupdate',topToggle:'toggle',topTouchCancel:'touchcancel',topTouchEnd:'touchend',topTouchMove:'touchmove',topTouchStart:'touchstart',topTransitionEnd:getVendorPrefixedEventName_1('transitionend')||'transitionend',topVolumeChange:'volumechange',topWaiting:'waiting',topWheel:'wheel'};var BrowserEventConstants={topLevelTypes:topLevelTypes$1};var BrowserEventConstants_1=BrowserEventConstants;var topLevelTypes=BrowserEventConstants_1.topLevelTypes;/**
 * Summary of `ReactBrowserEventEmitter` event handling:
 *
 *  - Top-level delegation is used to trap most native browser events. This
 *    may only occur in the main thread and is the responsibility of
 *    ReactDOMEventListener, which is injected and can therefore support
 *    pluggable event sources. This is the only work that occurs in the main
 *    thread.
 *
 *  - We normalize and de-duplicate events to account for browser quirks. This
 *    may be done in the worker thread.
 *
 *  - Forward these native events (with the associated top-level type used to
 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
 *    to extract any synthetic events.
 *
 *  - The `EventPluginHub` will then process each event by annotating them with
 *    "dispatches", a sequence of listeners and IDs that care about that event.
 *
 *  - The `EventPluginHub` then dispatches the events.
 *
 * Overview of React and the event system:
 *
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .
 *       |           .
 *       v           .
 * +------------+    .
 * | ReactEvent |    .
 * |  Listener  |    .
 * +------------+    .                         +-----------+
 *       |           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.--->|              |                    +------------+
 * |     |      |    .    +--------------+
 * +-----|------+    .                ^        +-----------+
 *       |           .                |        |Enter/Leave|
 *       +           .                +-------+|Plugin     |
 * +-------------+   .                         +-----------+
 * | application |   .
 * |-------------|   .
 * |             |   .
 * |             |   .
 * +-------------+   .
 *                   .
 *    React Core     .  General Purpose Event Plugin System
 */var alreadyListeningTo={};var reactTopListenersCounter=0;/**
 * To ensure no conflicts with other potential React instances on the page
 */var topListenersIDKey='_reactListenersID'+(''+Math.random()).slice(2);function getListeningForDocument(mountAt){// In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
// directly.
if(!Object.prototype.hasOwnProperty.call(mountAt,topListenersIDKey)){mountAt[topListenersIDKey]=reactTopListenersCounter++;alreadyListeningTo[mountAt[topListenersIDKey]]={};}return alreadyListeningTo[mountAt[topListenersIDKey]];}var ReactBrowserEventEmitter=_assign({},ReactEventEmitterMixin_1,{/**
   * Sets whether or not any created callbacks should be enabled.
   *
   * @param {boolean} enabled True if callbacks should be enabled.
   */setEnabled:function setEnabled(enabled){if(ReactDOMEventListener_1){ReactDOMEventListener_1.setEnabled(enabled);}},/**
   * @return {boolean} True if callbacks are enabled.
   */isEnabled:function isEnabled(){return!!(ReactDOMEventListener_1&&ReactDOMEventListener_1.isEnabled());},/**
   * We listen for bubbled touch events on the document object.
   *
   * Firefox v8.01 (and possibly others) exhibited strange behavior when
   * mounting `onmousemove` events at some node that was not the document
   * element. The symptoms were that if your mouse is not moving over something
   * contained within that mount point (for example on the background) the
   * top-level listeners for `onmousemove` won't be called. However, if you
   * register the `mousemove` on the document object, then it will of course
   * catch all `mousemove`s. This along with iOS quirks, justifies restricting
   * top-level listeners to the document object only, at least for these
   * movement types of events and possibly all events.
   *
   * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
   *
   * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
   * they bubble to document.
   *
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {object} contentDocumentHandle Document which owns the container
   */listenTo:function listenTo(registrationName,contentDocumentHandle){var mountAt=contentDocumentHandle;var isListening=getListeningForDocument(mountAt);var dependencies=EventPluginRegistry_1.registrationNameDependencies[registrationName];for(var i=0;i<dependencies.length;i++){var dependency=dependencies[i];if(!(isListening.hasOwnProperty(dependency)&&isListening[dependency])){if(dependency==='topWheel'){if(isEventSupported_1('wheel')){ReactDOMEventListener_1.trapBubbledEvent('topWheel','wheel',mountAt);}else if(isEventSupported_1('mousewheel')){ReactDOMEventListener_1.trapBubbledEvent('topWheel','mousewheel',mountAt);}else{// Firefox needs to capture a different mouse scroll event.
// @see http://www.quirksmode.org/dom/events/tests/scroll.html
ReactDOMEventListener_1.trapBubbledEvent('topWheel','DOMMouseScroll',mountAt);}}else if(dependency==='topScroll'){ReactDOMEventListener_1.trapCapturedEvent('topScroll','scroll',mountAt);}else if(dependency==='topFocus'||dependency==='topBlur'){ReactDOMEventListener_1.trapCapturedEvent('topFocus','focus',mountAt);ReactDOMEventListener_1.trapCapturedEvent('topBlur','blur',mountAt);// to make sure blur and focus event listeners are only attached once
isListening.topBlur=true;isListening.topFocus=true;}else if(dependency==='topCancel'){if(isEventSupported_1('cancel',true)){ReactDOMEventListener_1.trapCapturedEvent('topCancel','cancel',mountAt);}isListening.topCancel=true;}else if(dependency==='topClose'){if(isEventSupported_1('close',true)){ReactDOMEventListener_1.trapCapturedEvent('topClose','close',mountAt);}isListening.topClose=true;}else if(topLevelTypes.hasOwnProperty(dependency)){ReactDOMEventListener_1.trapBubbledEvent(dependency,topLevelTypes[dependency],mountAt);}isListening[dependency]=true;}}},isListeningToAllDependencies:function isListeningToAllDependencies(registrationName,mountAt){var isListening=getListeningForDocument(mountAt);var dependencies=EventPluginRegistry_1.registrationNameDependencies[registrationName];for(var i=0;i<dependencies.length;i++){var dependency=dependencies[i];if(!(isListening.hasOwnProperty(dependency)&&isListening[dependency])){return false;}}return true;},trapBubbledEvent:function trapBubbledEvent(topLevelType,handlerBaseName,handle){return ReactDOMEventListener_1.trapBubbledEvent(topLevelType,handlerBaseName,handle);},trapCapturedEvent:function trapCapturedEvent(topLevelType,handlerBaseName,handle){return ReactDOMEventListener_1.trapCapturedEvent(topLevelType,handlerBaseName,handle);}});var ReactBrowserEventEmitter_1=ReactBrowserEventEmitter;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactDOMFeatureFlags
 */var ReactDOMFeatureFlags={fiberAsyncScheduling:false,useFiber:true};var ReactDOMFeatureFlags_1=ReactDOMFeatureFlags;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule CSSProperty
 *//**
 * CSS properties which accept numbers but are not in units of "px".
 */var isUnitlessNumber={animationIterationCount:true,borderImageOutset:true,borderImageSlice:true,borderImageWidth:true,boxFlex:true,boxFlexGroup:true,boxOrdinalGroup:true,columnCount:true,columns:true,flex:true,flexGrow:true,flexPositive:true,flexShrink:true,flexNegative:true,flexOrder:true,gridRow:true,gridRowEnd:true,gridRowSpan:true,gridRowStart:true,gridColumn:true,gridColumnEnd:true,gridColumnSpan:true,gridColumnStart:true,fontWeight:true,lineClamp:true,lineHeight:true,opacity:true,order:true,orphans:true,tabSize:true,widows:true,zIndex:true,zoom:true,// SVG-related properties
fillOpacity:true,floodOpacity:true,stopOpacity:true,strokeDasharray:true,strokeDashoffset:true,strokeMiterlimit:true,strokeOpacity:true,strokeWidth:true};/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */function prefixKey(prefix,key){return prefix+key.charAt(0).toUpperCase()+key.substring(1);}/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */var prefixes=['Webkit','ms','Moz','O'];// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function(prop){prefixes.forEach(function(prefix){isUnitlessNumber[prefixKey(prefix,prop)]=isUnitlessNumber[prop];});});/**
 * Most style properties can be unset by doing .style[prop] = '' but IE8
 * doesn't like doing that with shorthand properties so for the properties that
 * IE8 breaks on, which are listed here, we instead unset each of the
 * individual properties. See http://bugs.jquery.com/ticket/12385.
 * The 4-value 'clock' properties like margin, padding, border-width seem to
 * behave without any problems. Curiously, list-style works too without any
 * special prodding.
 */var shorthandPropertyExpansions={background:{backgroundAttachment:true,backgroundColor:true,backgroundImage:true,backgroundPositionX:true,backgroundPositionY:true,backgroundRepeat:true},backgroundPosition:{backgroundPositionX:true,backgroundPositionY:true},border:{borderWidth:true,borderStyle:true,borderColor:true},borderBottom:{borderBottomWidth:true,borderBottomStyle:true,borderBottomColor:true},borderLeft:{borderLeftWidth:true,borderLeftStyle:true,borderLeftColor:true},borderRight:{borderRightWidth:true,borderRightStyle:true,borderRightColor:true},borderTop:{borderTopWidth:true,borderTopStyle:true,borderTopColor:true},font:{fontStyle:true,fontVariant:true,fontWeight:true,fontSize:true,lineHeight:true,fontFamily:true},outline:{outlineWidth:true,outlineStyle:true,outlineColor:true}};var CSSProperty={isUnitlessNumber:isUnitlessNumber,shorthandPropertyExpansions:shorthandPropertyExpansions};var CSSProperty_1=CSSProperty;var isUnitlessNumber$1=CSSProperty_1.isUnitlessNumber;/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @return {string} Normalized style value with dimensions applied.
 */function dangerousStyleValue(name,value,isCustomProperty){// Note that we've removed escapeTextForBrowser() calls here since the
// whole string will be escaped when the attribute is injected into
// the markup. If you provide unsafe user data here they can inject
// arbitrary CSS which may be problematic (I couldn't repro this):
// https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
// http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
// This is not an XSS hole but instead a potential CSS injection issue
// which has lead to a greater discussion about how we're going to
// trust URLs moving forward. See #2115901
var isEmpty=value==null||typeof value==='boolean'||value==='';if(isEmpty){return'';}if(!isCustomProperty&&typeof value==='number'&&value!==0&&!(isUnitlessNumber$1.hasOwnProperty(name)&&isUnitlessNumber$1[name])){return value+'px';// Presumes implicit 'px' suffix for unitless numbers
}return(''+value).trim();}var dangerousStyleValue_1=dangerousStyleValue;/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @providesModule describeComponentFrame
 */var describeComponentFrame=function describeComponentFrame(name,source,ownerName){return'\n    in '+(name||'Unknown')+(source?' (at '+source.fileName.replace(/^.*[\\\/]/,'')+':'+source.lineNumber+')':ownerName?' (created by '+ownerName+')':'');};var IndeterminateComponent=ReactTypeOfWork.IndeterminateComponent;var FunctionalComponent=ReactTypeOfWork.FunctionalComponent;var ClassComponent$1=ReactTypeOfWork.ClassComponent;var HostComponent$2=ReactTypeOfWork.HostComponent;function describeFiber(fiber){switch(fiber.tag){case IndeterminateComponent:case FunctionalComponent:case ClassComponent$1:case HostComponent$2:var owner=fiber._debugOwner;var source=fiber._debugSource;var name=getComponentName_1(fiber);var ownerName=null;if(owner){ownerName=getComponentName_1(owner);}return describeComponentFrame(name,source,ownerName);default:return'';}}// This function can only be called with a work-in-progress fiber and
// only during begin or complete phase. Do not call it under any other
// circumstances.
function getStackAddendumByWorkInProgressFiber$1(workInProgress){var info='';var node=workInProgress;do{info+=describeFiber(node);// Otherwise this return pointer might point to the wrong tree:
node=node['return'];}while(node);return info;}var ReactFiberComponentTreeHook={getStackAddendumByWorkInProgressFiber:getStackAddendumByWorkInProgressFiber$1};var ReactDebugCurrentFrame=ReactGlobalSharedState_1.ReactDebugCurrentFrame;{var getComponentName$3=getComponentName_1;var _require2$2=ReactFiberComponentTreeHook,getStackAddendumByWorkInProgressFiber=_require2$2.getStackAddendumByWorkInProgressFiber;}function getCurrentFiberOwnerName$2(){{var fiber=ReactDebugCurrentFiber.current;if(fiber===null){return null;}if(fiber._debugOwner!=null){return getComponentName$3(fiber._debugOwner);}}return null;}function getCurrentFiberStackAddendum$1(){{var fiber=ReactDebugCurrentFiber.current;if(fiber===null){return null;}// Safe because if current fiber exists, we are reconciling,
// and it is guaranteed to be the work-in-progress version.
return getStackAddendumByWorkInProgressFiber(fiber);}return null;}function resetCurrentFiber(){ReactDebugCurrentFrame.getCurrentStack=null;ReactDebugCurrentFiber.current=null;ReactDebugCurrentFiber.phase=null;}function setCurrentFiber(fiber,phase){ReactDebugCurrentFrame.getCurrentStack=getCurrentFiberStackAddendum$1;ReactDebugCurrentFiber.current=fiber;ReactDebugCurrentFiber.phase=phase;}var ReactDebugCurrentFiber={current:null,phase:null,resetCurrentFiber:resetCurrentFiber,setCurrentFiber:setCurrentFiber,getCurrentFiberOwnerName:getCurrentFiberOwnerName$2,getCurrentFiberStackAddendum:getCurrentFiberStackAddendum$1};var ReactDebugCurrentFiber_1=ReactDebugCurrentFiber;var warnValidStyle$1=emptyFunction;{var camelizeStyleName$1=camelizeStyleName;var getComponentName$2=getComponentName_1;var warning$4=require$$0;var _require$3=ReactDebugCurrentFiber_1,getCurrentFiberOwnerName$1=_require$3.getCurrentFiberOwnerName;// 'msTransform' is correct, but the other prefixes should be capitalized
var badVendoredStyleNamePattern=/^(?:webkit|moz|o)[A-Z]/;// style values shouldn't contain a semicolon
var badStyleValueWithSemicolonPattern=/;\s*$/;var warnedStyleNames={};var warnedStyleValues={};var warnedForNaNValue=false;var warnedForInfinityValue=false;var warnHyphenatedStyleName=function warnHyphenatedStyleName(name,owner){if(warnedStyleNames.hasOwnProperty(name)&&warnedStyleNames[name]){return;}warnedStyleNames[name]=true;warning$4(false,'Unsupported style property %s. Did you mean %s?%s',name,camelizeStyleName$1(name),checkRenderMessage(owner));};var warnBadVendoredStyleName=function warnBadVendoredStyleName(name,owner){if(warnedStyleNames.hasOwnProperty(name)&&warnedStyleNames[name]){return;}warnedStyleNames[name]=true;warning$4(false,'Unsupported vendor-prefixed style property %s. Did you mean %s?%s',name,name.charAt(0).toUpperCase()+name.slice(1),checkRenderMessage(owner));};var warnStyleValueWithSemicolon=function warnStyleValueWithSemicolon(name,value,owner){if(warnedStyleValues.hasOwnProperty(value)&&warnedStyleValues[value]){return;}warnedStyleValues[value]=true;warning$4(false,"Style property values shouldn't contain a semicolon.%s "+'Try "%s: %s" instead.',checkRenderMessage(owner),name,value.replace(badStyleValueWithSemicolonPattern,''));};var warnStyleValueIsNaN=function warnStyleValueIsNaN(name,value,owner){if(warnedForNaNValue){return;}warnedForNaNValue=true;warning$4(false,'`NaN` is an invalid value for the `%s` css style property.%s',name,checkRenderMessage(owner));};var warnStyleValueIsInfinity=function warnStyleValueIsInfinity(name,value,owner){if(warnedForInfinityValue){return;}warnedForInfinityValue=true;warning$4(false,'`Infinity` is an invalid value for the `%s` css style property.%s',name,checkRenderMessage(owner));};var checkRenderMessage=function checkRenderMessage(owner){var ownerName;if(owner!=null){// Stack passes the owner manually all the way to CSSPropertyOperations.
ownerName=getComponentName$2(owner);}else{// Fiber doesn't pass it but uses ReactDebugCurrentFiber to track it.
// It is only enabled in development and tracks host components too.
ownerName=getCurrentFiberOwnerName$1();// TODO: also report the stack.
}if(ownerName){return'\n\nCheck the render method of `'+ownerName+'`.';}return'';};warnValidStyle$1=function warnValidStyle$1(name,value,component){var owner;if(component){// TODO: this only works with Stack. Seems like we need to add unit tests?
owner=component._currentElement._owner;}if(name.indexOf('-')>-1){warnHyphenatedStyleName(name,owner);}else if(badVendoredStyleNamePattern.test(name)){warnBadVendoredStyleName(name,owner);}else if(badStyleValueWithSemicolonPattern.test(value)){warnStyleValueWithSemicolon(name,value,owner);}if(typeof value==='number'){if(isNaN(value)){warnStyleValueIsNaN(name,value,owner);}else if(!isFinite(value)){warnStyleValueIsInfinity(name,value,owner);}}};}var warnValidStyle_1=warnValidStyle$1;{var hyphenateStyleName$1=hyphenateStyleName;var warnValidStyle=warnValidStyle_1;}var hasShorthandPropertyBug=false;if(ExecutionEnvironment.canUseDOM){var tempStyle=document.createElement('div').style;try{// IE8 throws "Invalid argument." if resetting shorthand style properties.
tempStyle.font='';}catch(e){hasShorthandPropertyBug=true;}}/**
 * Operations for dealing with CSS properties.
 */var CSSPropertyOperations={/**
   * This creates a string that is expected to be equivalent to the style
   * attribute generated by server-side rendering. It by-passes warnings and
   * security checks so it's not safe to use this value for anything other than
   * comparison. It is only used in DEV for SSR validation.
   */createDangerousStringForStyles:function createDangerousStringForStyles(styles){{var serialized='';var delimiter='';for(var styleName in styles){if(!styles.hasOwnProperty(styleName)){continue;}var styleValue=styles[styleName];if(styleValue!=null){var isCustomProperty=styleName.indexOf('--')===0;serialized+=delimiter+hyphenateStyleName$1(styleName)+':';serialized+=dangerousStyleValue_1(styleName,styleValue,isCustomProperty);delimiter=';';}}return serialized||null;}},/**
   * Sets the value for multiple styles on a node.  If a value is specified as
   * '' (empty string), the corresponding style property will be unset.
   *
   * @param {DOMElement} node
   * @param {object} styles
   * @param {ReactDOMComponent} component
   */setValueForStyles:function setValueForStyles(node,styles,component){var style=node.style;for(var styleName in styles){if(!styles.hasOwnProperty(styleName)){continue;}var isCustomProperty=styleName.indexOf('--')===0;{if(!isCustomProperty){warnValidStyle(styleName,styles[styleName],component);}}var styleValue=dangerousStyleValue_1(styleName,styles[styleName],isCustomProperty);if(styleName==='float'){styleName='cssFloat';}if(isCustomProperty){style.setProperty(styleName,styleValue);}else if(styleValue){style[styleName]=styleValue;}else{var expansion=hasShorthandPropertyBug&&CSSProperty_1.shorthandPropertyExpansions[styleName];if(expansion){// Shorthand property that IE8 won't like unsetting, so unset each
// component to placate it
for(var individualStyleName in expansion){style[individualStyleName]='';}}else{style[styleName]='';}}}}};var CSSPropertyOperations_1=CSSPropertyOperations;var ReactInvalidSetStateWarningHook={};{var warning$7=require$$0;var processingChildContext=false;var warnInvalidSetState=function warnInvalidSetState(){warning$7(!processingChildContext,'setState(...): Cannot call setState() inside getChildContext()');};ReactInvalidSetStateWarningHook={onBeginProcessingChildContext:function onBeginProcessingChildContext(){processingChildContext=true;},onEndProcessingChildContext:function onEndProcessingChildContext(){processingChildContext=false;},onSetState:function onSetState(){warnInvalidSetState();}};}var ReactInvalidSetStateWarningHook_1=ReactInvalidSetStateWarningHook;/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactHostOperationHistoryHook
 * 
 */// Trust the developer to only use this with a true check
var ReactHostOperationHistoryHook=null;{var history=[];ReactHostOperationHistoryHook={onHostOperation:function onHostOperation(operation){history.push(operation);},clearHistory:function clearHistory(){if(ReactHostOperationHistoryHook._preventClearing){// Should only be used for tests.
return;}history=[];},getHistory:function getHistory(){return history;}};}var ReactHostOperationHistoryHook_1=ReactHostOperationHistoryHook;var ReactComponentTreeHook=ReactGlobalSharedState_1.ReactComponentTreeHook;{var warning$6=require$$0;}// Trust the developer to only use this with a true check
var ReactDebugTool$1=null;{var hooks=[];var didHookThrowForEvent={};var callHook=function callHook(event,fn,context,arg1,arg2,arg3,arg4,arg5){try{fn.call(context,arg1,arg2,arg3,arg4,arg5);}catch(e){warning$6(didHookThrowForEvent[event],'Exception thrown by hook while handling %s: %s',event,e+'\n'+e.stack);didHookThrowForEvent[event]=true;}};var emitEvent=function emitEvent(event,arg1,arg2,arg3,arg4,arg5){for(var i=0;i<hooks.length;i++){var hook=hooks[i];var fn=hook[event];if(fn){callHook(event,fn,hook,arg1,arg2,arg3,arg4,arg5);}}};var _isProfiling=false;var flushHistory=[];var lifeCycleTimerStack=[];var currentFlushNesting=0;var currentFlushMeasurements=[];var currentFlushStartTime=0;var currentTimerDebugID=null;var currentTimerStartTime=0;var currentTimerNestedFlushDuration=0;var currentTimerType=null;var lifeCycleTimerHasWarned=false;var clearHistory=function clearHistory(){ReactComponentTreeHook.purgeUnmountedComponents();ReactHostOperationHistoryHook_1.clearHistory();};var getTreeSnapshot=function getTreeSnapshot(registeredIDs){return registeredIDs.reduce(function(tree,id){var ownerID=ReactComponentTreeHook.getOwnerID(id);var parentID=ReactComponentTreeHook.getParentID(id);tree[id]={displayName:ReactComponentTreeHook.getDisplayName(id),text:ReactComponentTreeHook.getText(id),updateCount:ReactComponentTreeHook.getUpdateCount(id),childIDs:ReactComponentTreeHook.getChildIDs(id),// Text nodes don't have owners but this is close enough.
ownerID:ownerID||parentID&&ReactComponentTreeHook.getOwnerID(parentID)||0,parentID:parentID};return tree;},{});};var resetMeasurements=function resetMeasurements(){var previousStartTime=currentFlushStartTime;var previousMeasurements=currentFlushMeasurements;var previousOperations=ReactHostOperationHistoryHook_1.getHistory();if(currentFlushNesting===0){currentFlushStartTime=0;currentFlushMeasurements=[];clearHistory();return;}if(previousMeasurements.length||previousOperations.length){var registeredIDs=ReactComponentTreeHook.getRegisteredIDs();flushHistory.push({duration:performanceNow()-previousStartTime,measurements:previousMeasurements||[],operations:previousOperations||[],treeSnapshot:getTreeSnapshot(registeredIDs)});}clearHistory();currentFlushStartTime=performanceNow();currentFlushMeasurements=[];};var checkDebugID=function checkDebugID(debugID){var allowRoot=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(allowRoot&&debugID===0){return;}if(!debugID){warning$6(false,'ReactDebugTool: debugID may not be empty.');}};var beginLifeCycleTimer=function beginLifeCycleTimer(debugID,timerType){if(currentFlushNesting===0){return;}if(currentTimerType&&!lifeCycleTimerHasWarned){warning$6(false,'There is an internal error in the React performance measurement code.'+'\n\nDid not expect %s timer to start while %s timer is still in '+'progress for %s instance.',timerType,currentTimerType||'no',debugID===currentTimerDebugID?'the same':'another');lifeCycleTimerHasWarned=true;}currentTimerStartTime=performanceNow();currentTimerNestedFlushDuration=0;currentTimerDebugID=debugID;currentTimerType=timerType;};var endLifeCycleTimer=function endLifeCycleTimer(debugID,timerType){if(currentFlushNesting===0){return;}if(currentTimerType!==timerType&&!lifeCycleTimerHasWarned){warning$6(false,'There is an internal error in the React performance measurement code. '+'We did not expect %s timer to stop while %s timer is still in '+'progress for %s instance. Please report this as a bug in React.',timerType,currentTimerType||'no',debugID===currentTimerDebugID?'the same':'another');lifeCycleTimerHasWarned=true;}if(_isProfiling){currentFlushMeasurements.push({timerType:timerType,instanceID:debugID,duration:performanceNow()-currentTimerStartTime-currentTimerNestedFlushDuration});}currentTimerStartTime=0;currentTimerNestedFlushDuration=0;currentTimerDebugID=null;currentTimerType=null;};var pauseCurrentLifeCycleTimer=function pauseCurrentLifeCycleTimer(){var currentTimer={startTime:currentTimerStartTime,nestedFlushStartTime:performanceNow(),debugID:currentTimerDebugID,timerType:currentTimerType};lifeCycleTimerStack.push(currentTimer);currentTimerStartTime=0;currentTimerNestedFlushDuration=0;currentTimerDebugID=null;currentTimerType=null;};var resumeCurrentLifeCycleTimer=function resumeCurrentLifeCycleTimer(){var _lifeCycleTimerStack$=lifeCycleTimerStack.pop(),startTime=_lifeCycleTimerStack$.startTime,nestedFlushStartTime=_lifeCycleTimerStack$.nestedFlushStartTime,debugID=_lifeCycleTimerStack$.debugID,timerType=_lifeCycleTimerStack$.timerType;var nestedFlushDuration=performanceNow()-nestedFlushStartTime;currentTimerStartTime=startTime;currentTimerNestedFlushDuration+=nestedFlushDuration;currentTimerDebugID=debugID;currentTimerType=timerType;};var lastMarkTimeStamp=0;var canUsePerformanceMeasure=typeof performance!=='undefined'&&typeof performance.mark==='function'&&typeof performance.clearMarks==='function'&&typeof performance.measure==='function'&&typeof performance.clearMeasures==='function';var shouldMark=function shouldMark(debugID){if(!_isProfiling||!canUsePerformanceMeasure){return false;}var element=ReactComponentTreeHook.getElement(debugID);if(element==null||(typeof element==='undefined'?'undefined':_typeof(element))!=='object'){return false;}var isHostElement=typeof element.type==='string';if(isHostElement){return false;}return true;};var markBegin=function markBegin(debugID,markType){if(!shouldMark(debugID)){return;}var markName=debugID+'::'+markType;lastMarkTimeStamp=performanceNow();performance.mark(markName);};var markEnd=function markEnd(debugID,markType){if(!shouldMark(debugID)){return;}var markName=debugID+'::'+markType;var displayName=ReactComponentTreeHook.getDisplayName(debugID)||'Unknown';// Chrome has an issue of dropping markers recorded too fast:
// https://bugs.chromium.org/p/chromium/issues/detail?id=640652
// To work around this, we will not report very small measurements.
// I determined the magic number by tweaking it back and forth.
// 0.05ms was enough to prevent the issue, but I set it to 0.1ms to be safe.
// When the bug is fixed, we can `measure()` unconditionally if we want to.
var timeStamp=performanceNow();if(timeStamp-lastMarkTimeStamp>0.1){var measurementName=displayName+' ['+markType+']';performance.measure(measurementName,markName);}performance.clearMarks(markName);if(measurementName){performance.clearMeasures(measurementName);}};ReactDebugTool$1={addHook:function addHook(hook){hooks.push(hook);},removeHook:function removeHook(hook){for(var i=0;i<hooks.length;i++){if(hooks[i]===hook){hooks.splice(i,1);i--;}}},isProfiling:function isProfiling(){return _isProfiling;},beginProfiling:function beginProfiling(){if(_isProfiling){return;}_isProfiling=true;flushHistory.length=0;resetMeasurements();ReactDebugTool$1.addHook(ReactHostOperationHistoryHook_1);},endProfiling:function endProfiling(){if(!_isProfiling){return;}_isProfiling=false;resetMeasurements();ReactDebugTool$1.removeHook(ReactHostOperationHistoryHook_1);},getFlushHistory:function getFlushHistory(){return flushHistory;},onBeginFlush:function onBeginFlush(){currentFlushNesting++;resetMeasurements();pauseCurrentLifeCycleTimer();emitEvent('onBeginFlush');},onEndFlush:function onEndFlush(){resetMeasurements();currentFlushNesting--;resumeCurrentLifeCycleTimer();emitEvent('onEndFlush');},onBeginLifeCycleTimer:function onBeginLifeCycleTimer(debugID,timerType){checkDebugID(debugID);emitEvent('onBeginLifeCycleTimer',debugID,timerType);markBegin(debugID,timerType);beginLifeCycleTimer(debugID,timerType);},onEndLifeCycleTimer:function onEndLifeCycleTimer(debugID,timerType){checkDebugID(debugID);endLifeCycleTimer(debugID,timerType);markEnd(debugID,timerType);emitEvent('onEndLifeCycleTimer',debugID,timerType);},onBeginProcessingChildContext:function onBeginProcessingChildContext(){emitEvent('onBeginProcessingChildContext');},onEndProcessingChildContext:function onEndProcessingChildContext(){emitEvent('onEndProcessingChildContext');},onHostOperation:function onHostOperation(operation){checkDebugID(operation.instanceID);emitEvent('onHostOperation',operation);},onSetState:function onSetState(){emitEvent('onSetState');},onSetChildren:function onSetChildren(debugID,childDebugIDs){checkDebugID(debugID);childDebugIDs.forEach(checkDebugID);emitEvent('onSetChildren',debugID,childDebugIDs);},onBeforeMountComponent:function onBeforeMountComponent(debugID,element,parentDebugID){checkDebugID(debugID);checkDebugID(parentDebugID,true);emitEvent('onBeforeMountComponent',debugID,element,parentDebugID);markBegin(debugID,'mount');},onMountComponent:function onMountComponent(debugID){checkDebugID(debugID);markEnd(debugID,'mount');emitEvent('onMountComponent',debugID);},onBeforeUpdateComponent:function onBeforeUpdateComponent(debugID,element){checkDebugID(debugID);emitEvent('onBeforeUpdateComponent',debugID,element);markBegin(debugID,'update');},onUpdateComponent:function onUpdateComponent(debugID){checkDebugID(debugID);markEnd(debugID,'update');emitEvent('onUpdateComponent',debugID);},onBeforeUnmountComponent:function onBeforeUnmountComponent(debugID){checkDebugID(debugID);emitEvent('onBeforeUnmountComponent',debugID);markBegin(debugID,'unmount');},onUnmountComponent:function onUnmountComponent(debugID){checkDebugID(debugID);markEnd(debugID,'unmount');emitEvent('onUnmountComponent',debugID);},onTestEvent:function onTestEvent(){emitEvent('onTestEvent');}};ReactDebugTool$1.addHook(ReactInvalidSetStateWarningHook_1);ReactDebugTool$1.addHook(ReactComponentTreeHook);var url=ExecutionEnvironment.canUseDOM&&window.location.href||'';if(/[?&]react_perf\b/.test(url)){ReactDebugTool$1.beginProfiling();}}var ReactDebugTool_1=ReactDebugTool$1;// Trust the developer to only use ReactInstrumentation with a true check
var debugTool=null;{var ReactDebugTool=ReactDebugTool_1;debugTool=ReactDebugTool;}var ReactInstrumentation={debugTool:debugTool};{var warning$5=require$$0;}// isAttributeNameSafe() is currently duplicated in DOMMarkupOperations.
// TODO: Find a better place for this.
var VALID_ATTRIBUTE_NAME_REGEX=new RegExp('^['+DOMProperty_1.ATTRIBUTE_NAME_START_CHAR+']['+DOMProperty_1.ATTRIBUTE_NAME_CHAR+']*$');var illegalAttributeNameCache={};var validatedAttributeNameCache={};function isAttributeNameSafe(attributeName){if(validatedAttributeNameCache.hasOwnProperty(attributeName)){return true;}if(illegalAttributeNameCache.hasOwnProperty(attributeName)){return false;}if(VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)){validatedAttributeNameCache[attributeName]=true;return true;}illegalAttributeNameCache[attributeName]=true;{warning$5(false,'Invalid attribute name: `%s`',attributeName);}return false;}// shouldIgnoreValue() is currently duplicated in DOMMarkupOperations.
// TODO: Find a better place for this.
function shouldIgnoreValue(propertyInfo,value){return value==null||propertyInfo.hasBooleanValue&&!value||propertyInfo.hasNumericValue&&isNaN(value)||propertyInfo.hasPositiveNumericValue&&value<1||propertyInfo.hasOverloadedBooleanValue&&value===false;}/**
 * Operations for dealing with DOM properties.
 */var DOMPropertyOperations={setAttributeForID:function setAttributeForID(node,id){node.setAttribute(DOMProperty_1.ID_ATTRIBUTE_NAME,id);},setAttributeForRoot:function setAttributeForRoot(node){node.setAttribute(DOMProperty_1.ROOT_ATTRIBUTE_NAME,'');},/**
   * Get the value for a property on a node. Only used in DEV for SSR validation.
   * The "expected" argument is used as a hint of what the expected value is.
   * Some properties have multiple equivalent values.
   */getValueForProperty:function getValueForProperty(node,name,expected){{var propertyInfo=DOMProperty_1.getPropertyInfo(name);if(propertyInfo){var mutationMethod=propertyInfo.mutationMethod;if(mutationMethod||propertyInfo.mustUseProperty){return node[propertyInfo.propertyName];}else{var attributeName=propertyInfo.attributeName;var stringValue=null;if(propertyInfo.hasOverloadedBooleanValue){if(node.hasAttribute(attributeName)){var value=node.getAttribute(attributeName);if(value===''){return true;}if(shouldIgnoreValue(propertyInfo,expected)){return value;}if(value===''+expected){return expected;}return value;}}else if(node.hasAttribute(attributeName)){if(shouldIgnoreValue(propertyInfo,expected)){// We had an attribute but shouldn't have had one, so read it
// for the error message.
return node.getAttribute(attributeName);}if(propertyInfo.hasBooleanValue){// If this was a boolean, it doesn't matter what the value is
// the fact that we have it is the same as the expected.
return expected;}// Even if this property uses a namespace we use getAttribute
// because we assume its namespaced name is the same as our config.
// To use getAttributeNS we need the local name which we don't have
// in our config atm.
stringValue=node.getAttribute(attributeName);}if(shouldIgnoreValue(propertyInfo,expected)){return stringValue===null?expected:stringValue;}else if(stringValue===''+expected){return expected;}else{return stringValue;}}}}},/**
   * Get the value for a attribute on a node. Only used in DEV for SSR validation.
   * The third argument is used as a hint of what the expected value is. Some
   * attributes have multiple equivalent values.
   */getValueForAttribute:function getValueForAttribute(node,name,expected){{if(!isAttributeNameSafe(name)){return;}if(!node.hasAttribute(name)){return expected===undefined?undefined:null;}var value=node.getAttribute(name);if(value===''+expected){return expected;}return value;}},/**
   * Sets the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   * @param {*} value
   */setValueForProperty:function setValueForProperty(node,name,value){var propertyInfo=DOMProperty_1.getPropertyInfo(name);if(propertyInfo&&DOMProperty_1.shouldSetAttribute(name,value)){var mutationMethod=propertyInfo.mutationMethod;if(mutationMethod){mutationMethod(node,value);}else if(shouldIgnoreValue(propertyInfo,value)){DOMPropertyOperations.deleteValueForProperty(node,name);return;}else if(propertyInfo.mustUseProperty){// Contrary to `setAttribute`, object properties are properly
// `toString`ed by IE8/9.
node[propertyInfo.propertyName]=value;}else{var attributeName=propertyInfo.attributeName;var namespace=propertyInfo.attributeNamespace;// `setAttribute` with objects becomes only `[object]` in IE8/9,
// ('' + value) makes it output the correct toString()-value.
if(namespace){node.setAttributeNS(namespace,attributeName,''+value);}else if(propertyInfo.hasBooleanValue||propertyInfo.hasOverloadedBooleanValue&&value===true){node.setAttribute(attributeName,'');}else{node.setAttribute(attributeName,''+value);}}}else{DOMPropertyOperations.setValueForAttribute(node,name,DOMProperty_1.shouldSetAttribute(name,value)?value:null);return;}{var payload={};payload[name]=value;ReactInstrumentation.debugTool.onHostOperation({instanceID:ReactDOMComponentTree_1.getInstanceFromNode(node)._debugID,type:'update attribute',payload:payload});}},setValueForAttribute:function setValueForAttribute(node,name,value){if(!isAttributeNameSafe(name)){return;}if(value==null){node.removeAttribute(name);}else{node.setAttribute(name,''+value);}{var payload={};payload[name]=value;ReactInstrumentation.debugTool.onHostOperation({instanceID:ReactDOMComponentTree_1.getInstanceFromNode(node)._debugID,type:'update attribute',payload:payload});}},/**
   * Deletes an attributes from a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   */deleteValueForAttribute:function deleteValueForAttribute(node,name){node.removeAttribute(name);{ReactInstrumentation.debugTool.onHostOperation({instanceID:ReactDOMComponentTree_1.getInstanceFromNode(node)._debugID,type:'remove attribute',payload:name});}},/**
   * Deletes the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   */deleteValueForProperty:function deleteValueForProperty(node,name){var propertyInfo=DOMProperty_1.getPropertyInfo(name);if(propertyInfo){var mutationMethod=propertyInfo.mutationMethod;if(mutationMethod){mutationMethod(node,undefined);}else if(propertyInfo.mustUseProperty){var propName=propertyInfo.propertyName;if(propertyInfo.hasBooleanValue){node[propName]=false;}else{node[propName]='';}}else{node.removeAttribute(propertyInfo.attributeName);}}else{node.removeAttribute(name);}{ReactInstrumentation.debugTool.onHostOperation({instanceID:ReactDOMComponentTree_1.getInstanceFromNode(node)._debugID,type:'remove attribute',payload:name});}}};var DOMPropertyOperations_1=DOMPropertyOperations;var ReactControlledValuePropTypes={checkPropTypes:null};{var warning$9=require$$0;var emptyFunction$2=emptyFunction;var PropTypes=propTypes;var ReactPropTypesSecret='SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';ReactControlledValuePropTypes.checkPropTypes=emptyFunction$2;var hasReadOnlyValue={button:true,checkbox:true,image:true,hidden:true,radio:true,reset:true,submit:true};var propTypes$1={value:function value(props,propName,componentName){if(!props[propName]||hasReadOnlyValue[props.type]||props.onChange||props.readOnly||props.disabled){return null;}return new Error('You provided a `value` prop to a form field without an '+'`onChange` handler. This will render a read-only field. If '+'the field should be mutable use `defaultValue`. Otherwise, '+'set either `onChange` or `readOnly`.');},checked:function checked(props,propName,componentName){if(!props[propName]||props.onChange||props.readOnly||props.disabled){return null;}return new Error('You provided a `checked` prop to a form field without an '+'`onChange` handler. This will render a read-only field. If '+'the field should be mutable use `defaultChecked`. Otherwise, '+'set either `onChange` or `readOnly`.');},onChange:PropTypes.func};var loggedTypeFailures={};/**
   * Provide a linked `value` attribute for controlled forms. You should not use
   * this outside of the ReactDOM controlled form components.
   */ReactControlledValuePropTypes.checkPropTypes=function(tagName,props,getStack){for(var propName in propTypes$1){if(propTypes$1.hasOwnProperty(propName)){var error=propTypes$1[propName](props,propName,tagName,'prop',null,ReactPropTypesSecret);}if(error instanceof Error&&!(error.message in loggedTypeFailures)){// Only monitor this failure once because there tends to be a lot of the
// same error.
loggedTypeFailures[error.message]=true;warning$9(false,'Failed form propType: %s%s',error.message,getStack());}}};}var ReactControlledValuePropTypes_1=ReactControlledValuePropTypes;var getCurrentFiberOwnerName$3=ReactDebugCurrentFiber_1.getCurrentFiberOwnerName;{var _require2$3=ReactDebugCurrentFiber_1,getCurrentFiberStackAddendum$2=_require2$3.getCurrentFiberStackAddendum;var warning$8=require$$0;}var didWarnValueDefaultValue=false;var didWarnCheckedDefaultChecked=false;var didWarnControlledToUncontrolled=false;var didWarnUncontrolledToControlled=false;function isControlled(props){var usesChecked=props.type==='checkbox'||props.type==='radio';return usesChecked?props.checked!=null:props.value!=null;}/**
 * Implements an <input> host component that allows setting these optional
 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
 *
 * If `checked` or `value` are not supplied (or null/undefined), user actions
 * that affect the checked state or value will trigger updates to the element.
 *
 * If they are supplied (and not null/undefined), the rendered element will not
 * trigger updates to the element. Instead, the props must change in order for
 * the rendered element to be updated.
 *
 * The rendered element will be initialized as unchecked (or `defaultChecked`)
 * with an empty value (or `defaultValue`).
 *
 * See http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
 */var ReactDOMInput={getHostProps:function getHostProps(element,props){var node=element;var value=props.value;var checked=props.checked;var hostProps=_assign({// Make sure we set .type before any other properties (setting .value
// before .type means .value is lost in IE11 and below)
type:undefined,// Make sure we set .step before .value (setting .value before .step
// means .value is rounded on mount, based upon step precision)
step:undefined,// Make sure we set .min & .max before .value (to ensure proper order
// in corner cases such as min or max deriving from value, e.g. Issue #7170)
min:undefined,max:undefined},props,{defaultChecked:undefined,defaultValue:undefined,value:value!=null?value:node._wrapperState.initialValue,checked:checked!=null?checked:node._wrapperState.initialChecked});return hostProps;},initWrapperState:function initWrapperState(element,props){{ReactControlledValuePropTypes_1.checkPropTypes('input',props,getCurrentFiberStackAddendum$2);if(props.checked!==undefined&&props.defaultChecked!==undefined&&!didWarnCheckedDefaultChecked){warning$8(false,'%s contains an input of type %s with both checked and defaultChecked props. '+'Input elements must be either controlled or uncontrolled '+'(specify either the checked prop, or the defaultChecked prop, but not '+'both). Decide between using a controlled or uncontrolled input '+'element and remove one of these props. More info: '+'https://fb.me/react-controlled-components',getCurrentFiberOwnerName$3()||'A component',props.type);didWarnCheckedDefaultChecked=true;}if(props.value!==undefined&&props.defaultValue!==undefined&&!didWarnValueDefaultValue){warning$8(false,'%s contains an input of type %s with both value and defaultValue props. '+'Input elements must be either controlled or uncontrolled '+'(specify either the value prop, or the defaultValue prop, but not '+'both). Decide between using a controlled or uncontrolled input '+'element and remove one of these props. More info: '+'https://fb.me/react-controlled-components',getCurrentFiberOwnerName$3()||'A component',props.type);didWarnValueDefaultValue=true;}}var defaultValue=props.defaultValue;var node=element;node._wrapperState={initialChecked:props.checked!=null?props.checked:props.defaultChecked,initialValue:props.value!=null?props.value:defaultValue,controlled:isControlled(props)};},updateWrapper:function updateWrapper(element,props){var node=element;{var controlled=isControlled(props);if(!node._wrapperState.controlled&&controlled&&!didWarnUncontrolledToControlled){warning$8(false,'A component is changing an uncontrolled input of type %s to be controlled. '+'Input elements should not switch from uncontrolled to controlled (or vice versa). '+'Decide between using a controlled or uncontrolled input '+'element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s',props.type,getCurrentFiberStackAddendum$2());didWarnUncontrolledToControlled=true;}if(node._wrapperState.controlled&&!controlled&&!didWarnControlledToUncontrolled){warning$8(false,'A component is changing a controlled input of type %s to be uncontrolled. '+'Input elements should not switch from controlled to uncontrolled (or vice versa). '+'Decide between using a controlled or uncontrolled input '+'element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s',props.type,getCurrentFiberStackAddendum$2());didWarnControlledToUncontrolled=true;}}var checked=props.checked;if(checked!=null){DOMPropertyOperations_1.setValueForProperty(node,'checked',checked||false);}var value=props.value;if(value!=null){if(value===0&&node.value===''){node.value='0';// Note: IE9 reports a number inputs as 'text', so check props instead.
}else if(props.type==='number'){// Simulate `input.valueAsNumber`. IE9 does not support it
var valueAsNumber=parseFloat(node.value)||0;if(// eslint-disable-next-line
value!=valueAsNumber||// eslint-disable-next-line
value==valueAsNumber&&node.value!=value){// Cast `value` to a string to ensure the value is set correctly. While
// browsers typically do this as necessary, jsdom doesn't.
node.value=''+value;}}else if(node.value!==''+value){// Cast `value` to a string to ensure the value is set correctly. While
// browsers typically do this as necessary, jsdom doesn't.
node.value=''+value;}}else{if(props.value==null&&props.defaultValue!=null){// In Chrome, assigning defaultValue to certain input types triggers input validation.
// For number inputs, the display value loses trailing decimal points. For email inputs,
// Chrome raises "The specified value <x> is not a valid email address".
//
// Here we check to see if the defaultValue has actually changed, avoiding these problems
// when the user is inputting text
//
// https://github.com/facebook/react/issues/7253
if(node.defaultValue!==''+props.defaultValue){node.defaultValue=''+props.defaultValue;}}if(props.checked==null&&props.defaultChecked!=null){node.defaultChecked=!!props.defaultChecked;}}},postMountWrapper:function postMountWrapper(element,props){var node=element;// Detach value from defaultValue. We won't do anything if we're working on
// submit or reset inputs as those values & defaultValues are linked. They
// are not resetable nodes so this operation doesn't matter and actually
// removes browser-default values (eg "Submit Query") when no value is
// provided.
switch(props.type){case'submit':case'reset':break;case'color':case'date':case'datetime':case'datetime-local':case'month':case'time':case'week':// This fixes the no-show issue on iOS Safari and Android Chrome:
// https://github.com/facebook/react/issues/7233
node.value='';node.value=node.defaultValue;break;default:node.value=node.value;break;}// Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
// this is needed to work around a chrome bug where setting defaultChecked
// will sometimes influence the value of checked (even after detachment).
// Reference: https://bugs.chromium.org/p/chromium/issues/detail?id=608416
// We need to temporarily unset name to avoid disrupting radio button groups.
var name=node.name;if(name!==''){node.name='';}node.defaultChecked=!node.defaultChecked;node.defaultChecked=!node.defaultChecked;if(name!==''){node.name=name;}},restoreControlledState:function restoreControlledState(element,props){var node=element;ReactDOMInput.updateWrapper(node,props);updateNamedCousins(node,props);}};function updateNamedCousins(rootNode,props){var name=props.name;if(props.type==='radio'&&name!=null){var queryRoot=rootNode;while(queryRoot.parentNode){queryRoot=queryRoot.parentNode;}// If `rootNode.form` was non-null, then we could try `form.elements`,
// but that sometimes behaves strangely in IE8. We could also try using
// `form.getElementsByName`, but that will only return direct children
// and won't include inputs that use the HTML5 `form=` attribute. Since
// the input might not even be in a form. It might not even be in the
// document. Let's just use the local `querySelectorAll` to ensure we don't
// miss anything.
var group=queryRoot.querySelectorAll('input[name='+JSON.stringify(''+name)+'][type="radio"]');for(var i=0;i<group.length;i++){var otherNode=group[i];if(otherNode===rootNode||otherNode.form!==rootNode.form){continue;}// This will throw if radio buttons rendered by different copies of React
// and the same name are rendered into the same form (same as #1939).
// That's probably okay; we don't support it just as we don't support
// mixing React radio buttons with non-React ones.
var otherProps=ReactDOMComponentTree_1.getFiberCurrentPropsFromNode(otherNode);!otherProps?invariant(false,'ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.'):void 0;// If this is a controlled radio button group, forcing the input that
// was previously checked to update will cause it to be come re-checked
// as appropriate.
ReactDOMInput.updateWrapper(otherNode,otherProps);}}}var ReactDOMFiberInput=ReactDOMInput;{var warning$10=require$$0;}function flattenChildren(children){var content='';// Flatten children and warn if they aren't strings or numbers;
// invalid types are ignored.
// We can silently skip them because invalid DOM nesting warning
// catches these cases in Fiber.
react.Children.forEach(children,function(child){if(child==null){return;}if(typeof child==='string'||typeof child==='number'){content+=child;}});return content;}/**
 * Implements an <option> host component that warns when `selected` is set.
 */var ReactDOMOption={validateProps:function validateProps(element,props){// TODO (yungsters): Remove support for `selected` in <option>.
{warning$10(props.selected==null,'Use the `defaultValue` or `value` props on <select> instead of '+'setting `selected` on <option>.');}},postMountWrapper:function postMountWrapper(element,props){// value="" should make a value attribute (#6219)
if(props.value!=null){element.setAttribute('value',props.value);}},getHostProps:function getHostProps(element,props){var hostProps=_assign({children:undefined},props);var content=flattenChildren(props.children);if(content){hostProps.children=content;}return hostProps;}};var ReactDOMFiberOption=ReactDOMOption;var getCurrentFiberOwnerName$4=ReactDebugCurrentFiber_1.getCurrentFiberOwnerName;{var didWarnValueDefaultValue$1=false;var warning$11=require$$0;var _require2$4=ReactDebugCurrentFiber_1,getCurrentFiberStackAddendum$3=_require2$4.getCurrentFiberStackAddendum;}function getDeclarationErrorAddendum(){var ownerName=getCurrentFiberOwnerName$4();if(ownerName){return'\n\nCheck the render method of `'+ownerName+'`.';}return'';}var valuePropNames=['value','defaultValue'];/**
 * Validation function for `value` and `defaultValue`.
 */function checkSelectPropTypes(props){ReactControlledValuePropTypes_1.checkPropTypes('select',props,getCurrentFiberStackAddendum$3);for(var i=0;i<valuePropNames.length;i++){var propName=valuePropNames[i];if(props[propName]==null){continue;}var isArray=Array.isArray(props[propName]);if(props.multiple&&!isArray){warning$11(false,'The `%s` prop supplied to <select> must be an array if '+'`multiple` is true.%s',propName,getDeclarationErrorAddendum());}else if(!props.multiple&&isArray){warning$11(false,'The `%s` prop supplied to <select> must be a scalar '+'value if `multiple` is false.%s',propName,getDeclarationErrorAddendum());}}}function updateOptions(node,multiple,propValue){var options=node.options;if(multiple){var selectedValues=propValue;var selectedValue={};for(var i=0;i<selectedValues.length;i++){// Prefix to avoid chaos with special keys.
selectedValue['$'+selectedValues[i]]=true;}for(var _i=0;_i<options.length;_i++){var selected=selectedValue.hasOwnProperty('$'+options[_i].value);if(options[_i].selected!==selected){options[_i].selected=selected;}}}else{// Do not set `select.value` as exact behavior isn't consistent across all
// browsers for all cases.
var _selectedValue=''+propValue;var defaultSelected=null;for(var _i2=0;_i2<options.length;_i2++){if(options[_i2].value===_selectedValue){options[_i2].selected=true;return;}if(defaultSelected===null&&!options[_i2].disabled){defaultSelected=options[_i2];}}if(defaultSelected!==null){defaultSelected.selected=true;}}}/**
 * Implements a <select> host component that allows optionally setting the
 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
 * stringable. If `multiple` is true, the prop must be an array of stringables.
 *
 * If `value` is not supplied (or null/undefined), user actions that change the
 * selected option will trigger updates to the rendered options.
 *
 * If it is supplied (and not null/undefined), the rendered options will not
 * update in response to user actions. Instead, the `value` prop must change in
 * order for the rendered options to update.
 *
 * If `defaultValue` is provided, any options with the supplied values will be
 * selected.
 */var ReactDOMSelect={getHostProps:function getHostProps(element,props){return _assign({},props,{value:undefined});},initWrapperState:function initWrapperState(element,props){var node=element;{checkSelectPropTypes(props);}var value=props.value;node._wrapperState={initialValue:value!=null?value:props.defaultValue,wasMultiple:!!props.multiple};{if(props.value!==undefined&&props.defaultValue!==undefined&&!didWarnValueDefaultValue$1){warning$11(false,'Select elements must be either controlled or uncontrolled '+'(specify either the value prop, or the defaultValue prop, but not '+'both). Decide between using a controlled or uncontrolled select '+'element and remove one of these props. More info: '+'https://fb.me/react-controlled-components');didWarnValueDefaultValue$1=true;}}},postMountWrapper:function postMountWrapper(element,props){var node=element;node.multiple=!!props.multiple;var value=props.value;if(value!=null){updateOptions(node,!!props.multiple,value);}else if(props.defaultValue!=null){updateOptions(node,!!props.multiple,props.defaultValue);}},postUpdateWrapper:function postUpdateWrapper(element,props){var node=element;// After the initial mount, we control selected-ness manually so don't pass
// this value down
node._wrapperState.initialValue=undefined;var wasMultiple=node._wrapperState.wasMultiple;node._wrapperState.wasMultiple=!!props.multiple;var value=props.value;if(value!=null){updateOptions(node,!!props.multiple,value);}else if(wasMultiple!==!!props.multiple){// For simplicity, reapply `defaultValue` if `multiple` is toggled.
if(props.defaultValue!=null){updateOptions(node,!!props.multiple,props.defaultValue);}else{// Revert the select back to its default unselected state.
updateOptions(node,!!props.multiple,props.multiple?[]:'');}}},restoreControlledState:function restoreControlledState(element,props){var node=element;var value=props.value;if(value!=null){updateOptions(node,!!props.multiple,value);}}};var ReactDOMFiberSelect=ReactDOMSelect;{var warning$12=require$$0;var _require$4=ReactDebugCurrentFiber_1,getCurrentFiberStackAddendum$4=_require$4.getCurrentFiberStackAddendum;}var didWarnValDefaultVal=false;/**
 * Implements a <textarea> host component that allows setting `value`, and
 * `defaultValue`. This differs from the traditional DOM API because value is
 * usually set as PCDATA children.
 *
 * If `value` is not supplied (or null/undefined), user actions that affect the
 * value will trigger updates to the element.
 *
 * If `value` is supplied (and not null/undefined), the rendered element will
 * not trigger updates to the element. Instead, the `value` prop must change in
 * order for the rendered element to be updated.
 *
 * The rendered element will be initialized with an empty value, the prop
 * `defaultValue` if specified, or the children content (deprecated).
 */var ReactDOMTextarea={getHostProps:function getHostProps(element,props){var node=element;!(props.dangerouslySetInnerHTML==null)?invariant(false,'`dangerouslySetInnerHTML` does not make sense on <textarea>.'):void 0;// Always set children to the same thing. In IE9, the selection range will
// get reset if `textContent` is mutated.  We could add a check in setTextContent
// to only set the value if/when the value differs from the node value (which would
// completely solve this IE9 bug), but Sebastian+Sophie seemed to like this
// solution. The value can be a boolean or object so that's why it's forced
// to be a string.
var hostProps=_assign({},props,{value:undefined,defaultValue:undefined,children:''+node._wrapperState.initialValue});return hostProps;},initWrapperState:function initWrapperState(element,props){var node=element;{ReactControlledValuePropTypes_1.checkPropTypes('textarea',props,getCurrentFiberStackAddendum$4);if(props.value!==undefined&&props.defaultValue!==undefined&&!didWarnValDefaultVal){warning$12(false,'Textarea elements must be either controlled or uncontrolled '+'(specify either the value prop, or the defaultValue prop, but not '+'both). Decide between using a controlled or uncontrolled textarea '+'and remove one of these props. More info: '+'https://fb.me/react-controlled-components');didWarnValDefaultVal=true;}}var value=props.value;var initialValue=value;// Only bother fetching default value if we're going to use it
if(value==null){var defaultValue=props.defaultValue;// TODO (yungsters): Remove support for children content in <textarea>.
var children=props.children;if(children!=null){{warning$12(false,'Use the `defaultValue` or `value` props instead of setting '+'children on <textarea>.');}!(defaultValue==null)?invariant(false,'If you supply `defaultValue` on a <textarea>, do not pass children.'):void 0;if(Array.isArray(children)){!(children.length<=1)?invariant(false,'<textarea> can only have at most one child.'):void 0;children=children[0];}defaultValue=''+children;}if(defaultValue==null){defaultValue='';}initialValue=defaultValue;}node._wrapperState={initialValue:''+initialValue};},updateWrapper:function updateWrapper(element,props){var node=element;var value=props.value;if(value!=null){// Cast `value` to a string to ensure the value is set correctly. While
// browsers typically do this as necessary, jsdom doesn't.
var newValue=''+value;// To avoid side effects (such as losing text selection), only set value if changed
if(newValue!==node.value){node.value=newValue;}if(props.defaultValue==null){node.defaultValue=newValue;}}if(props.defaultValue!=null){node.defaultValue=props.defaultValue;}},postMountWrapper:function postMountWrapper(element,props){var node=element;// This is in postMount because we need access to the DOM node, which is not
// available until after the component has mounted.
var textContent=node.textContent;// Only set node.value if textContent is equal to the expected
// initial value. In IE10/IE11 there is a bug where the placeholder attribute
// will populate textContent as well.
// https://developer.microsoft.com/microsoft-edge/platform/issues/101525/
if(textContent===node._wrapperState.initialValue){node.value=textContent;}},restoreControlledState:function restoreControlledState(element,props){// DOM component is still mounted; update
ReactDOMTextarea.updateWrapper(element,props);}};var ReactDOMFiberTextarea=ReactDOMTextarea;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule omittedCloseTags
 */// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.
var omittedCloseTags={area:true,base:true,br:true,col:true,embed:true,hr:true,img:true,input:true,keygen:true,link:true,meta:true,param:true,source:true,track:true,wbr:true};var omittedCloseTags_1=omittedCloseTags;// For HTML, certain tags cannot have children. This has the same purpose as
// `omittedCloseTags` except that `menuitem` should still have its closing tag.
var voidElementTags=_assign({menuitem:true},omittedCloseTags_1);var voidElementTags_1=voidElementTags;{var warning$13=require$$0;}var HTML$1='__html';function getDeclarationErrorAddendum$1(getCurrentOwnerName){{var ownerName=getCurrentOwnerName();if(ownerName){// TODO: also report the stack.
return'\n\nThis DOM node was rendered by `'+ownerName+'`.';}}return'';}function assertValidProps(tag,props,getCurrentOwnerName){if(!props){return;}// Note the use of `==` which checks for null or undefined.
if(voidElementTags_1[tag]){!(props.children==null&&props.dangerouslySetInnerHTML==null)?invariant(false,'%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s',tag,getDeclarationErrorAddendum$1(getCurrentOwnerName)):void 0;}if(props.dangerouslySetInnerHTML!=null){!(props.children==null)?invariant(false,'Can only set one of `children` or `props.dangerouslySetInnerHTML`.'):void 0;!(_typeof(props.dangerouslySetInnerHTML)==='object'&&HTML$1 in props.dangerouslySetInnerHTML)?invariant(false,'`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.'):void 0;}{warning$13(props.suppressContentEditableWarning||!props.contentEditable||props.children==null,'A component is `contentEditable` and contains `children` managed by '+'React. It is now your responsibility to guarantee that none of '+'those nodes are unexpectedly modified or duplicated. This is '+'probably not intentional.');}!(props.style==null||_typeof(props.style)==='object')?invariant(false,'The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + \'em\'}} when using JSX.%s',getDeclarationErrorAddendum$1(getCurrentOwnerName)):void 0;}var assertValidProps_1=assertValidProps;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule inputValueTracking
 * 
 */function isCheckable(elem){var type=elem.type;var nodeName=elem.nodeName;return nodeName&&nodeName.toLowerCase()==='input'&&(type==='checkbox'||type==='radio');}function getTracker(node){return node._valueTracker;}function detachTracker(node){node._valueTracker=null;}function getValueFromNode(node){var value='';if(!node){return value;}if(isCheckable(node)){value=node.checked?'true':'false';}else{value=node.value;}return value;}function trackValueOnNode(node){var valueField=isCheckable(node)?'checked':'value';var descriptor=Object.getOwnPropertyDescriptor(node.constructor.prototype,valueField);var currentValue=''+node[valueField];// if someone has already defined a value or Safari, then bail
// and don't track value will cause over reporting of changes,
// but it's better then a hard failure
// (needed for certain tests that spyOn input values and Safari)
if(node.hasOwnProperty(valueField)||typeof descriptor.get!=='function'||typeof descriptor.set!=='function'){return;}Object.defineProperty(node,valueField,{enumerable:descriptor.enumerable,configurable:true,get:function get(){return descriptor.get.call(this);},set:function set(value){currentValue=''+value;descriptor.set.call(this,value);}});var tracker={getValue:function getValue(){return currentValue;},setValue:function setValue(value){currentValue=''+value;},stopTracking:function stopTracking(){detachTracker(node);delete node[valueField];}};return tracker;}var inputValueTracking={// exposed for testing
_getTrackerFromNode:getTracker,track:function track(node){if(getTracker(node)){return;}// TODO: Once it's just Fiber we can move this to node._wrapperState
node._valueTracker=trackValueOnNode(node);},updateValueIfChanged:function updateValueIfChanged(node){if(!node){return false;}var tracker=getTracker(node);// if there is no tracker at this point it's unlikely
// that trying again will succeed
if(!tracker){return true;}var lastValue=tracker.getValue();var nextValue=getValueFromNode(node);if(nextValue!==lastValue){tracker.setValue(nextValue);return true;}return false;},stopTracking:function stopTracking(node){var tracker=getTracker(node);if(tracker){tracker.stopTracking();}}};var inputValueTracking_1=inputValueTracking;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule isCustomComponent
 * 
 */function isCustomComponent(tagName,props){if(tagName.indexOf('-')===-1){return typeof props.is==='string';}switch(tagName){// These are reserved SVG and MathML elements.
// We don't mind this whitelist too much because we expect it to never grow.
// The alternative is to track the namespace in a few places which is convoluted.
// https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
case'annotation-xml':case'color-profile':case'font-face':case'font-face-src':case'font-face-uri':case'font-face-format':case'font-face-name':case'missing-glyph':return false;default:return true;}}var isCustomComponent_1=isCustomComponent;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule createMicrosoftUnsafeLocalFunction
 *//* globals MSApp *//**
 * Create a function which has 'unsafe' privileges (required by windows8 apps)
 */var createMicrosoftUnsafeLocalFunction=function createMicrosoftUnsafeLocalFunction(func){if(typeof MSApp!=='undefined'&&MSApp.execUnsafeLocalFunction){return function(arg0,arg1,arg2,arg3){MSApp.execUnsafeLocalFunction(function(){return func(arg0,arg1,arg2,arg3);});};}else{return func;}};var createMicrosoftUnsafeLocalFunction_1=createMicrosoftUnsafeLocalFunction;var Namespaces$1=DOMNamespaces.Namespaces;// SVG temp container for IE lacking innerHTML
var reusableSVGContainer;/**
 * Set the innerHTML property of a node
 *
 * @param {DOMElement} node
 * @param {string} html
 * @internal
 */var setInnerHTML=createMicrosoftUnsafeLocalFunction_1(function(node,html){// IE does not have innerHTML for SVG nodes, so instead we inject the
// new markup in a temp node and then move the child nodes across into
// the target node
if(node.namespaceURI===Namespaces$1.svg&&!('innerHTML'in node)){reusableSVGContainer=reusableSVGContainer||document.createElement('div');reusableSVGContainer.innerHTML='<svg>'+html+'</svg>';var svgNode=reusableSVGContainer.firstChild;while(svgNode.firstChild){node.appendChild(svgNode.firstChild);}}else{node.innerHTML=html;}});var setInnerHTML_1=setInnerHTML;/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Based on the escape-html library, which is used under the MIT License below:
 *
 * Copyright (c) 2012-2013 TJ Holowaychuk
 * Copyright (c) 2015 Andreas Lubbe
 * Copyright (c) 2015 Tiancheng "Timothy" Gu
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule escapeTextContentForBrowser
 */// code copied and modified from escape-html
/**
 * Module variables.
 * @private
 */var matchHtmlRegExp=/["'&<>]/;/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */function escapeHtml(string){var str=''+string;var match=matchHtmlRegExp.exec(str);if(!match){return str;}var escape;var html='';var index=0;var lastIndex=0;for(index=match.index;index<str.length;index++){switch(str.charCodeAt(index)){case 34:// "
escape='&quot;';break;case 38:// &
escape='&amp;';break;case 39:// '
escape='&#x27;';// modified from escape-html; used to be '&#39'
break;case 60:// <
escape='&lt;';break;case 62:// >
escape='&gt;';break;default:continue;}if(lastIndex!==index){html+=str.substring(lastIndex,index);}lastIndex=index+1;html+=escape;}return lastIndex!==index?html+str.substring(lastIndex,index):html;}// end code copied and modified from escape-html
/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */function escapeTextContentForBrowser(text){if(typeof text==='boolean'||typeof text==='number'){// this shortcircuit helps perf for types that we know will never have
// special characters, especially given that this function is used often
// for numeric dom ids.
return''+text;}return escapeHtml(text);}var escapeTextContentForBrowser_1=escapeTextContentForBrowser;var TEXT_NODE$2=HTMLNodeType_1.TEXT_NODE;/**
 * Set the textContent property of a node, ensuring that whitespace is preserved
 * even in IE8. innerText is a poor substitute for textContent and, among many
 * issues, inserts <br> instead of the literal newline chars. innerHTML behaves
 * as it should.
 *
 * @param {DOMElement} node
 * @param {string} text
 * @internal
 */var setTextContent=function setTextContent(node,text){if(text){var firstChild=node.firstChild;if(firstChild&&firstChild===node.lastChild&&firstChild.nodeType===TEXT_NODE$2){firstChild.nodeValue=text;return;}}node.textContent=text;};if(ExecutionEnvironment.canUseDOM){if(!('textContent'in document.documentElement)){setTextContent=function setTextContent(node,text){if(node.nodeType===TEXT_NODE$2){node.nodeValue=text;return;}setInnerHTML_1(node,escapeTextContentForBrowser_1(text));};}}var setTextContent_1=setTextContent;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule validAriaProperties
 */var ariaProperties={'aria-current':0,// state
'aria-details':0,'aria-disabled':0,// state
'aria-hidden':0,// state
'aria-invalid':0,// state
'aria-keyshortcuts':0,'aria-label':0,'aria-roledescription':0,// Widget Attributes
'aria-autocomplete':0,'aria-checked':0,'aria-expanded':0,'aria-haspopup':0,'aria-level':0,'aria-modal':0,'aria-multiline':0,'aria-multiselectable':0,'aria-orientation':0,'aria-placeholder':0,'aria-pressed':0,'aria-readonly':0,'aria-required':0,'aria-selected':0,'aria-sort':0,'aria-valuemax':0,'aria-valuemin':0,'aria-valuenow':0,'aria-valuetext':0,// Live Region Attributes
'aria-atomic':0,'aria-busy':0,'aria-live':0,'aria-relevant':0,// Drag-and-Drop Attributes
'aria-dropeffect':0,'aria-grabbed':0,// Relationship Attributes
'aria-activedescendant':0,'aria-colcount':0,'aria-colindex':0,'aria-colspan':0,'aria-controls':0,'aria-describedby':0,'aria-errormessage':0,'aria-flowto':0,'aria-labelledby':0,'aria-owns':0,'aria-posinset':0,'aria-rowcount':0,'aria-rowindex':0,'aria-rowspan':0,'aria-setsize':0};var validAriaProperties$1=ariaProperties;var warnedProperties={};var rARIA=new RegExp('^(aria)-['+DOMProperty_1.ATTRIBUTE_NAME_CHAR+']*$');var rARIACamel=new RegExp('^(aria)[A-Z]['+DOMProperty_1.ATTRIBUTE_NAME_CHAR+']*$');var hasOwnProperty=Object.prototype.hasOwnProperty;{var warning$14=require$$0;var _require$5=ReactGlobalSharedState_1,ReactComponentTreeHook$1=_require$5.ReactComponentTreeHook,ReactDebugCurrentFrame$1=_require$5.ReactDebugCurrentFrame;var getStackAddendumByID=ReactComponentTreeHook$1.getStackAddendumByID;var validAriaProperties=validAriaProperties$1;}function getStackAddendum(debugID){if(debugID!=null){// This can only happen on Stack
return getStackAddendumByID(debugID);}else{// This can only happen on Fiber / Server
var stack=ReactDebugCurrentFrame$1.getStackAddendum();return stack!=null?stack:'';}}function validateProperty(tagName,name,debugID){if(hasOwnProperty.call(warnedProperties,name)&&warnedProperties[name]){return true;}if(rARIACamel.test(name)){var ariaName='aria-'+name.slice(4).toLowerCase();var correctName=validAriaProperties.hasOwnProperty(ariaName)?ariaName:null;// If this is an aria-* attribute, but is not listed in the known DOM
// DOM properties, then it is an invalid aria-* attribute.
if(correctName==null){warning$14(false,'Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.%s',name,getStackAddendum(debugID));warnedProperties[name]=true;return true;}// aria-* attributes should be lowercase; suggest the lowercase version.
if(name!==correctName){warning$14(false,'Invalid ARIA attribute `%s`. Did you mean `%s`?%s',name,correctName,getStackAddendum(debugID));warnedProperties[name]=true;return true;}}if(rARIA.test(name)){var lowerCasedName=name.toLowerCase();var standardName=validAriaProperties.hasOwnProperty(lowerCasedName)?lowerCasedName:null;// If this is an aria-* attribute, but is not listed in the known DOM
// DOM properties, then it is an invalid aria-* attribute.
if(standardName==null){warnedProperties[name]=true;return false;}// aria-* attributes should be lowercase; suggest the lowercase version.
if(name!==standardName){warning$14(false,'Unknown ARIA attribute `%s`. Did you mean `%s`?%s',name,standardName,getStackAddendum(debugID));warnedProperties[name]=true;return true;}}return true;}function warnInvalidARIAProps(type,props,debugID){var invalidProps=[];for(var key in props){var isValid=validateProperty(type,key,debugID);if(!isValid){invalidProps.push(key);}}var unknownPropString=invalidProps.map(function(prop){return'`'+prop+'`';}).join(', ');if(invalidProps.length===1){warning$14(false,'Invalid aria prop %s on <%s> tag. '+'For details, see https://fb.me/invalid-aria-prop%s',unknownPropString,type,getStackAddendum(debugID));}else if(invalidProps.length>1){warning$14(false,'Invalid aria props %s on <%s> tag. '+'For details, see https://fb.me/invalid-aria-prop%s',unknownPropString,type,getStackAddendum(debugID));}}function validateProperties(type,props,debugID/* Stack only */){if(isCustomComponent_1(type,props)){return;}warnInvalidARIAProps(type,props,debugID);}var ReactDOMInvalidARIAHook$1={// Fiber
validateProperties:validateProperties,// Stack
onBeforeMountComponent:function onBeforeMountComponent(debugID,element){if(true&&element!=null&&typeof element.type==='string'){validateProperties(element.type,element.props,debugID);}},onBeforeUpdateComponent:function onBeforeUpdateComponent(debugID,element){if(true&&element!=null&&typeof element.type==='string'){validateProperties(element.type,element.props,debugID);}}};var ReactDOMInvalidARIAHook_1=ReactDOMInvalidARIAHook$1;{var warning$15=require$$0;var _require$6=ReactGlobalSharedState_1,ReactComponentTreeHook$2=_require$6.ReactComponentTreeHook,ReactDebugCurrentFrame$2=_require$6.ReactDebugCurrentFrame;var getStackAddendumByID$1=ReactComponentTreeHook$2.getStackAddendumByID;}var didWarnValueNull=false;function getStackAddendum$1(debugID){if(debugID!=null){// This can only happen on Stack
return getStackAddendumByID$1(debugID);}else{// This can only happen on Fiber / Server
var stack=ReactDebugCurrentFrame$2.getStackAddendum();return stack!=null?stack:'';}}function validateProperties$1(type,props,debugID/* Stack only */){if(type!=='input'&&type!=='textarea'&&type!=='select'){return;}if(props!=null&&props.value===null&&!didWarnValueNull){warning$15(false,'`value` prop on `%s` should not be null. '+'Consider using the empty string to clear the component or `undefined` '+'for uncontrolled components.%s',type,getStackAddendum$1(debugID));didWarnValueNull=true;}}var ReactDOMNullInputValuePropHook$1={// Fiber
validateProperties:validateProperties$1,// Stack
onBeforeMountComponent:function onBeforeMountComponent(debugID,element){if(true&&element!=null&&typeof element.type==='string'){validateProperties$1(element.type,element.props,debugID);}},onBeforeUpdateComponent:function onBeforeUpdateComponent(debugID,element){if(true&&element!=null&&typeof element.type==='string'){validateProperties$1(element.type,element.props,debugID);}}};var ReactDOMNullInputValuePropHook_1=ReactDOMNullInputValuePropHook$1;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule possibleStandardNames
 */// When adding attributes to the HTML or SVG whitelist, be sure to
// also add them to this module to ensure casing and incorrect name
// warnings.
var possibleStandardNames$1={// HTML
accept:'accept',acceptcharset:'acceptCharset','accept-charset':'acceptCharset',accesskey:'accessKey',action:'action',allowfullscreen:'allowFullScreen',allowtransparency:'allowTransparency',alt:'alt',as:'as',async:'async',autocapitalize:'autoCapitalize',autocomplete:'autoComplete',autocorrect:'autoCorrect',autofocus:'autoFocus',autoplay:'autoPlay',autosave:'autoSave',capture:'capture',cellpadding:'cellPadding',cellspacing:'cellSpacing',challenge:'challenge',charset:'charSet',checked:'checked',children:'children',cite:'cite','class':'className',classid:'classID',classname:'className',cols:'cols',colspan:'colSpan',content:'content',contenteditable:'contentEditable',contextmenu:'contextMenu',controls:'controls',controlslist:'controlsList',coords:'coords',crossorigin:'crossOrigin',dangerouslysetinnerhtml:'dangerouslySetInnerHTML',data:'data',datetime:'dateTime','default':'default',defaultchecked:'defaultChecked',defaultvalue:'defaultValue',defer:'defer',dir:'dir',disabled:'disabled',download:'download',draggable:'draggable',enctype:'encType','for':'htmlFor',form:'form',formmethod:'formMethod',formaction:'formAction',formenctype:'formEncType',formnovalidate:'formNoValidate',formtarget:'formTarget',frameborder:'frameBorder',headers:'headers',height:'height',hidden:'hidden',high:'high',href:'href',hreflang:'hrefLang',htmlfor:'htmlFor',httpequiv:'httpEquiv','http-equiv':'httpEquiv',icon:'icon',id:'id',innerhtml:'innerHTML',inputmode:'inputMode',integrity:'integrity',is:'is',itemid:'itemID',itemprop:'itemProp',itemref:'itemRef',itemscope:'itemScope',itemtype:'itemType',keyparams:'keyParams',keytype:'keyType',kind:'kind',label:'label',lang:'lang',list:'list',loop:'loop',low:'low',manifest:'manifest',marginwidth:'marginWidth',marginheight:'marginHeight',max:'max',maxlength:'maxLength',media:'media',mediagroup:'mediaGroup',method:'method',min:'min',minlength:'minLength',multiple:'multiple',muted:'muted',name:'name',nonce:'nonce',novalidate:'noValidate',open:'open',optimum:'optimum',pattern:'pattern',placeholder:'placeholder',playsinline:'playsInline',poster:'poster',preload:'preload',profile:'profile',radiogroup:'radioGroup',readonly:'readOnly',referrerpolicy:'referrerPolicy',rel:'rel',required:'required',reversed:'reversed',role:'role',rows:'rows',rowspan:'rowSpan',sandbox:'sandbox',scope:'scope',scoped:'scoped',scrolling:'scrolling',seamless:'seamless',selected:'selected',shape:'shape',size:'size',sizes:'sizes',span:'span',spellcheck:'spellCheck',src:'src',srcdoc:'srcDoc',srclang:'srcLang',srcset:'srcSet',start:'start',step:'step',style:'style',summary:'summary',tabindex:'tabIndex',target:'target',title:'title',type:'type',usemap:'useMap',value:'value',width:'width',wmode:'wmode',wrap:'wrap',// SVG
about:'about',accentheight:'accentHeight','accent-height':'accentHeight',accumulate:'accumulate',additive:'additive',alignmentbaseline:'alignmentBaseline','alignment-baseline':'alignmentBaseline',allowreorder:'allowReorder',alphabetic:'alphabetic',amplitude:'amplitude',arabicform:'arabicForm','arabic-form':'arabicForm',ascent:'ascent',attributename:'attributeName',attributetype:'attributeType',autoreverse:'autoReverse',azimuth:'azimuth',basefrequency:'baseFrequency',baselineshift:'baselineShift','baseline-shift':'baselineShift',baseprofile:'baseProfile',bbox:'bbox',begin:'begin',bias:'bias',by:'by',calcmode:'calcMode',capheight:'capHeight','cap-height':'capHeight',clip:'clip',clippath:'clipPath','clip-path':'clipPath',clippathunits:'clipPathUnits',cliprule:'clipRule','clip-rule':'clipRule',color:'color',colorinterpolation:'colorInterpolation','color-interpolation':'colorInterpolation',colorinterpolationfilters:'colorInterpolationFilters','color-interpolation-filters':'colorInterpolationFilters',colorprofile:'colorProfile','color-profile':'colorProfile',colorrendering:'colorRendering','color-rendering':'colorRendering',contentscripttype:'contentScriptType',contentstyletype:'contentStyleType',cursor:'cursor',cx:'cx',cy:'cy',d:'d',datatype:'datatype',decelerate:'decelerate',descent:'descent',diffuseconstant:'diffuseConstant',direction:'direction',display:'display',divisor:'divisor',dominantbaseline:'dominantBaseline','dominant-baseline':'dominantBaseline',dur:'dur',dx:'dx',dy:'dy',edgemode:'edgeMode',elevation:'elevation',enablebackground:'enableBackground','enable-background':'enableBackground',end:'end',exponent:'exponent',externalresourcesrequired:'externalResourcesRequired',fill:'fill',fillopacity:'fillOpacity','fill-opacity':'fillOpacity',fillrule:'fillRule','fill-rule':'fillRule',filter:'filter',filterres:'filterRes',filterunits:'filterUnits',floodopacity:'floodOpacity','flood-opacity':'floodOpacity',floodcolor:'floodColor','flood-color':'floodColor',focusable:'focusable',fontfamily:'fontFamily','font-family':'fontFamily',fontsize:'fontSize','font-size':'fontSize',fontsizeadjust:'fontSizeAdjust','font-size-adjust':'fontSizeAdjust',fontstretch:'fontStretch','font-stretch':'fontStretch',fontstyle:'fontStyle','font-style':'fontStyle',fontvariant:'fontVariant','font-variant':'fontVariant',fontweight:'fontWeight','font-weight':'fontWeight',format:'format',from:'from',fx:'fx',fy:'fy',g1:'g1',g2:'g2',glyphname:'glyphName','glyph-name':'glyphName',glyphorientationhorizontal:'glyphOrientationHorizontal','glyph-orientation-horizontal':'glyphOrientationHorizontal',glyphorientationvertical:'glyphOrientationVertical','glyph-orientation-vertical':'glyphOrientationVertical',glyphref:'glyphRef',gradienttransform:'gradientTransform',gradientunits:'gradientUnits',hanging:'hanging',horizadvx:'horizAdvX','horiz-adv-x':'horizAdvX',horizoriginx:'horizOriginX','horiz-origin-x':'horizOriginX',ideographic:'ideographic',imagerendering:'imageRendering','image-rendering':'imageRendering',in2:'in2','in':'in',inlist:'inlist',intercept:'intercept',k1:'k1',k2:'k2',k3:'k3',k4:'k4',k:'k',kernelmatrix:'kernelMatrix',kernelunitlength:'kernelUnitLength',kerning:'kerning',keypoints:'keyPoints',keysplines:'keySplines',keytimes:'keyTimes',lengthadjust:'lengthAdjust',letterspacing:'letterSpacing','letter-spacing':'letterSpacing',lightingcolor:'lightingColor','lighting-color':'lightingColor',limitingconeangle:'limitingConeAngle',local:'local',markerend:'markerEnd','marker-end':'markerEnd',markerheight:'markerHeight',markermid:'markerMid','marker-mid':'markerMid',markerstart:'markerStart','marker-start':'markerStart',markerunits:'markerUnits',markerwidth:'markerWidth',mask:'mask',maskcontentunits:'maskContentUnits',maskunits:'maskUnits',mathematical:'mathematical',mode:'mode',numoctaves:'numOctaves',offset:'offset',opacity:'opacity',operator:'operator',order:'order',orient:'orient',orientation:'orientation',origin:'origin',overflow:'overflow',overlineposition:'overlinePosition','overline-position':'overlinePosition',overlinethickness:'overlineThickness','overline-thickness':'overlineThickness',paintorder:'paintOrder','paint-order':'paintOrder',panose1:'panose1','panose-1':'panose1',pathlength:'pathLength',patterncontentunits:'patternContentUnits',patterntransform:'patternTransform',patternunits:'patternUnits',pointerevents:'pointerEvents','pointer-events':'pointerEvents',points:'points',pointsatx:'pointsAtX',pointsaty:'pointsAtY',pointsatz:'pointsAtZ',prefix:'prefix',preservealpha:'preserveAlpha',preserveaspectratio:'preserveAspectRatio',primitiveunits:'primitiveUnits',property:'property',r:'r',radius:'radius',refx:'refX',refy:'refY',renderingintent:'renderingIntent','rendering-intent':'renderingIntent',repeatcount:'repeatCount',repeatdur:'repeatDur',requiredextensions:'requiredExtensions',requiredfeatures:'requiredFeatures',resource:'resource',restart:'restart',result:'result',results:'results',rotate:'rotate',rx:'rx',ry:'ry',scale:'scale',security:'security',seed:'seed',shaperendering:'shapeRendering','shape-rendering':'shapeRendering',slope:'slope',spacing:'spacing',specularconstant:'specularConstant',specularexponent:'specularExponent',speed:'speed',spreadmethod:'spreadMethod',startoffset:'startOffset',stddeviation:'stdDeviation',stemh:'stemh',stemv:'stemv',stitchtiles:'stitchTiles',stopcolor:'stopColor','stop-color':'stopColor',stopopacity:'stopOpacity','stop-opacity':'stopOpacity',strikethroughposition:'strikethroughPosition','strikethrough-position':'strikethroughPosition',strikethroughthickness:'strikethroughThickness','strikethrough-thickness':'strikethroughThickness',string:'string',stroke:'stroke',strokedasharray:'strokeDasharray','stroke-dasharray':'strokeDasharray',strokedashoffset:'strokeDashoffset','stroke-dashoffset':'strokeDashoffset',strokelinecap:'strokeLinecap','stroke-linecap':'strokeLinecap',strokelinejoin:'strokeLinejoin','stroke-linejoin':'strokeLinejoin',strokemiterlimit:'strokeMiterlimit','stroke-miterlimit':'strokeMiterlimit',strokewidth:'strokeWidth','stroke-width':'strokeWidth',strokeopacity:'strokeOpacity','stroke-opacity':'strokeOpacity',suppresscontenteditablewarning:'suppressContentEditableWarning',surfacescale:'surfaceScale',systemlanguage:'systemLanguage',tablevalues:'tableValues',targetx:'targetX',targety:'targetY',textanchor:'textAnchor','text-anchor':'textAnchor',textdecoration:'textDecoration','text-decoration':'textDecoration',textlength:'textLength',textrendering:'textRendering','text-rendering':'textRendering',to:'to',transform:'transform','typeof':'typeof',u1:'u1',u2:'u2',underlineposition:'underlinePosition','underline-position':'underlinePosition',underlinethickness:'underlineThickness','underline-thickness':'underlineThickness',unicode:'unicode',unicodebidi:'unicodeBidi','unicode-bidi':'unicodeBidi',unicoderange:'unicodeRange','unicode-range':'unicodeRange',unitsperem:'unitsPerEm','units-per-em':'unitsPerEm',unselectable:'unselectable',valphabetic:'vAlphabetic','v-alphabetic':'vAlphabetic',values:'values',vectoreffect:'vectorEffect','vector-effect':'vectorEffect',version:'version',vertadvy:'vertAdvY','vert-adv-y':'vertAdvY',vertoriginx:'vertOriginX','vert-origin-x':'vertOriginX',vertoriginy:'vertOriginY','vert-origin-y':'vertOriginY',vhanging:'vHanging','v-hanging':'vHanging',videographic:'vIdeographic','v-ideographic':'vIdeographic',viewbox:'viewBox',viewtarget:'viewTarget',visibility:'visibility',vmathematical:'vMathematical','v-mathematical':'vMathematical',vocab:'vocab',widths:'widths',wordspacing:'wordSpacing','word-spacing':'wordSpacing',writingmode:'writingMode','writing-mode':'writingMode',x1:'x1',x2:'x2',x:'x',xchannelselector:'xChannelSelector',xheight:'xHeight','x-height':'xHeight',xlinkactuate:'xlinkActuate','xlink:actuate':'xlinkActuate',xlinkarcrole:'xlinkArcrole','xlink:arcrole':'xlinkArcrole',xlinkhref:'xlinkHref','xlink:href':'xlinkHref',xlinkrole:'xlinkRole','xlink:role':'xlinkRole',xlinkshow:'xlinkShow','xlink:show':'xlinkShow',xlinktitle:'xlinkTitle','xlink:title':'xlinkTitle',xlinktype:'xlinkType','xlink:type':'xlinkType',xmlbase:'xmlBase','xml:base':'xmlBase',xmllang:'xmlLang','xml:lang':'xmlLang',xmlns:'xmlns','xml:space':'xmlSpace',xmlnsxlink:'xmlnsXlink','xmlns:xlink':'xmlnsXlink',xmlspace:'xmlSpace',y1:'y1',y2:'y2',y:'y',ychannelselector:'yChannelSelector',z:'z',zoomandpan:'zoomAndPan'};var possibleStandardNames_1=possibleStandardNames$1;{var warning$16=require$$0;var _require$7=ReactGlobalSharedState_1,ReactComponentTreeHook$3=_require$7.ReactComponentTreeHook,ReactDebugCurrentFrame$3=_require$7.ReactDebugCurrentFrame;var getStackAddendumByID$2=ReactComponentTreeHook$3.getStackAddendumByID;}function getStackAddendum$2(debugID){if(debugID!=null){// This can only happen on Stack
return getStackAddendumByID$2(debugID);}else{// This can only happen on Fiber / Server
var stack=ReactDebugCurrentFrame$3.getStackAddendum();return stack!=null?stack:'';}}{var warnedProperties$1={};var hasOwnProperty$1=Object.prototype.hasOwnProperty;var EVENT_NAME_REGEX=/^on[A-Z]/;var rARIA$1=new RegExp('^(aria)-['+DOMProperty_1.ATTRIBUTE_NAME_CHAR+']*$');var rARIACamel$1=new RegExp('^(aria)[A-Z]['+DOMProperty_1.ATTRIBUTE_NAME_CHAR+']*$');var possibleStandardNames=possibleStandardNames_1;var validateProperty$1=function validateProperty$1(tagName,name,value,debugID){if(hasOwnProperty$1.call(warnedProperties$1,name)&&warnedProperties$1[name]){return true;}if(EventPluginRegistry_1.registrationNameModules.hasOwnProperty(name)){return true;}if(EventPluginRegistry_1.plugins.length===0&&EVENT_NAME_REGEX.test(name)){// If no event plugins have been injected, we might be in a server environment.
// Don't check events in this case.
return true;}var lowerCasedName=name.toLowerCase();var registrationName=EventPluginRegistry_1.possibleRegistrationNames.hasOwnProperty(lowerCasedName)?EventPluginRegistry_1.possibleRegistrationNames[lowerCasedName]:null;if(registrationName!=null){warning$16(false,'Invalid event handler property `%s`. Did you mean `%s`?%s',name,registrationName,getStackAddendum$2(debugID));warnedProperties$1[name]=true;return true;}if(lowerCasedName.indexOf('on')===0){warning$16(false,'Unknown event handler property `%s`. It will be ignored.%s',name,getStackAddendum$2(debugID));warnedProperties$1[name]=true;return true;}// Let the ARIA attribute hook validate ARIA attributes
if(rARIA$1.test(name)||rARIACamel$1.test(name)){return true;}if(lowerCasedName==='onfocusin'||lowerCasedName==='onfocusout'){warning$16(false,'React uses onFocus and onBlur instead of onFocusIn and onFocusOut. '+'All React events are normalized to bubble, so onFocusIn and onFocusOut '+'are not needed/supported by React.');warnedProperties$1[name]=true;return true;}if(lowerCasedName==='innerhtml'){warning$16(false,'Directly setting property `innerHTML` is not permitted. '+'For more information, lookup documentation on `dangerouslySetInnerHTML`.');warnedProperties$1[name]=true;return true;}if(lowerCasedName==='aria'){warning$16(false,'The `aria` attribute is reserved for future use in React. '+'Pass individual `aria-` attributes instead.');warnedProperties$1[name]=true;return true;}if(lowerCasedName==='is'&&value!==null&&value!==undefined&&typeof value!=='string'){warning$16(false,'Received a `%s` for string attribute `is`. If this is expected, cast '+'the value to a string.%s',typeof value==='undefined'?'undefined':_typeof(value),getStackAddendum$2(debugID));warnedProperties$1[name]=true;return true;}if(typeof value==='number'&&isNaN(value)){warning$16(false,'Received NaN for numeric attribute `%s`. If this is expected, cast '+'the value to a string.%s',name,getStackAddendum$2(debugID));warnedProperties$1[name]=true;return true;}var isReserved=DOMProperty_1.isReservedProp(name);// Known attributes should match the casing specified in the property config.
if(possibleStandardNames.hasOwnProperty(lowerCasedName)){var standardName=possibleStandardNames[lowerCasedName];if(standardName!==name){warning$16(false,'Invalid DOM property `%s`. Did you mean `%s`?%s',name,standardName,getStackAddendum$2(debugID));warnedProperties$1[name]=true;return true;}}else if(!isReserved&&name!==lowerCasedName){// Unknown attributes should have lowercase casing since that's how they
// will be cased anyway with server rendering.
warning$16(false,'React does not recognize the `%s` prop on a DOM element. If you '+'intentionally want it to appear in the DOM as a custom '+'attribute, spell it as lowercase `%s` instead. '+'If you accidentally passed it from a parent component, remove '+'it from the DOM element.%s',name,lowerCasedName,getStackAddendum$2(debugID));warnedProperties$1[name]=true;return true;}if(typeof value==='boolean'){warning$16(DOMProperty_1.shouldAttributeAcceptBooleanValue(name),'Received `%s` for non-boolean attribute `%s`. If this is expected, cast '+'the value to a string.%s',value,name,getStackAddendum$2(debugID));warnedProperties$1[name]=true;return true;}// Now that we've validated casing, do not validate
// data types for reserved props
if(isReserved){return true;}// Warn when a known attribute is a bad type
if(!DOMProperty_1.shouldSetAttribute(name,value)){warnedProperties$1[name]=true;return false;}return true;};}var warnUnknownProperties=function warnUnknownProperties(type,props,debugID){var unknownProps=[];for(var key in props){var isValid=validateProperty$1(type,key,props[key],debugID);if(!isValid){unknownProps.push(key);}}var unknownPropString=unknownProps.map(function(prop){return'`'+prop+'`';}).join(', ');if(unknownProps.length===1){warning$16(false,'Invalid value for prop %s on <%s> tag. Either remove it from the element, '+'or pass a string or number value to keep it in the DOM. '+'For details, see https://fb.me/react-attribute-behavior%s',unknownPropString,type,getStackAddendum$2(debugID));}else if(unknownProps.length>1){warning$16(false,'Invalid values for props %s on <%s> tag. Either remove them from the element, '+'or pass a string or number value to keep them in the DOM. '+'For details, see https://fb.me/react-attribute-behavior%s',unknownPropString,type,getStackAddendum$2(debugID));}};function validateProperties$2(type,props,debugID/* Stack only */){if(isCustomComponent_1(type,props)){return;}warnUnknownProperties(type,props,debugID);}var ReactDOMUnknownPropertyHook$1={// Fiber
validateProperties:validateProperties$2,// Stack
onBeforeMountComponent:function onBeforeMountComponent(debugID,element){if(true&&element!=null&&typeof element.type==='string'){validateProperties$2(element.type,element.props,debugID);}},onBeforeUpdateComponent:function onBeforeUpdateComponent(debugID,element){if(true&&element!=null&&typeof element.type==='string'){validateProperties$2(element.type,element.props,debugID);}}};var ReactDOMUnknownPropertyHook_1=ReactDOMUnknownPropertyHook$1;var getCurrentFiberOwnerName=ReactDebugCurrentFiber_1.getCurrentFiberOwnerName;var DOCUMENT_NODE$1=HTMLNodeType_1.DOCUMENT_NODE;var DOCUMENT_FRAGMENT_NODE$1=HTMLNodeType_1.DOCUMENT_FRAGMENT_NODE;{var warning$3=require$$0;var _require3$1=ReactDebugCurrentFiber_1,getCurrentFiberStackAddendum=_require3$1.getCurrentFiberStackAddendum;var ReactDOMInvalidARIAHook=ReactDOMInvalidARIAHook_1;var ReactDOMNullInputValuePropHook=ReactDOMNullInputValuePropHook_1;var ReactDOMUnknownPropertyHook=ReactDOMUnknownPropertyHook_1;var validateARIAProperties=ReactDOMInvalidARIAHook.validateProperties;var validateInputProperties=ReactDOMNullInputValuePropHook.validateProperties;var validateUnknownProperties=ReactDOMUnknownPropertyHook.validateProperties;}var didWarnInvalidHydration=false;var didWarnShadyDOM=false;var listenTo=ReactBrowserEventEmitter_1.listenTo;var registrationNameModules=EventPluginRegistry_1.registrationNameModules;var DANGEROUSLY_SET_INNER_HTML='dangerouslySetInnerHTML';var SUPPRESS_CONTENT_EDITABLE_WARNING='suppressContentEditableWarning';var CHILDREN='children';var STYLE='style';var HTML='__html';var HTML_NAMESPACE$1=DOMNamespaces.Namespaces.html;var getIntrinsicNamespace$1=DOMNamespaces.getIntrinsicNamespace;{var warnedUnknownTags={// Chrome is the only major browser not shipping <time>. But as of July
// 2017 it intends to ship it due to widespread usage. We intentionally
// *don't* warn for <time> even if it's unrecognized by Chrome because
// it soon will be, and many apps have been using it anyway.
time:true};var validatePropertiesInDevelopment=function validatePropertiesInDevelopment(type,props){validateARIAProperties(type,props);validateInputProperties(type,props);validateUnknownProperties(type,props);};var warnForTextDifference=function warnForTextDifference(serverText,clientText){if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warning$3(false,'Text content did not match. Server: "%s" Client: "%s"',serverText,clientText);};var warnForPropDifference=function warnForPropDifference(propName,serverValue,clientValue){if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warning$3(false,'Prop `%s` did not match. Server: %s Client: %s',propName,JSON.stringify(serverValue),JSON.stringify(clientValue));};var warnForExtraAttributes=function warnForExtraAttributes(attributeNames){if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;var names=[];attributeNames.forEach(function(name){names.push(name);});warning$3(false,'Extra attributes from the server: %s',names);};var warnForInvalidEventListener=function warnForInvalidEventListener(registrationName,listener){warning$3(false,'Expected `%s` listener to be a function, instead got a value of `%s` type.%s',registrationName,typeof listener==='undefined'?'undefined':_typeof(listener),getCurrentFiberStackAddendum());};var testDocument;// Parse the HTML and read it back to normalize the HTML string so that it
// can be used for comparison.
var normalizeHTML=function normalizeHTML(parent,html){if(!testDocument){testDocument=document.implementation.createHTMLDocument();}var testElement=parent.namespaceURI===HTML_NAMESPACE$1?testDocument.createElement(parent.tagName):testDocument.createElementNS(parent.namespaceURI,parent.tagName);testElement.innerHTML=html;return testElement.innerHTML;};}function ensureListeningTo(rootContainerElement,registrationName){var isDocumentOrFragment=rootContainerElement.nodeType===DOCUMENT_NODE$1||rootContainerElement.nodeType===DOCUMENT_FRAGMENT_NODE$1;var doc=isDocumentOrFragment?rootContainerElement:rootContainerElement.ownerDocument;listenTo(registrationName,doc);}function getOwnerDocumentFromRootContainer(rootContainerElement){return rootContainerElement.nodeType===DOCUMENT_NODE$1?rootContainerElement:rootContainerElement.ownerDocument;}// There are so many media events, it makes sense to just
// maintain a list rather than create a `trapBubbledEvent` for each
var mediaEvents={topAbort:'abort',topCanPlay:'canplay',topCanPlayThrough:'canplaythrough',topDurationChange:'durationchange',topEmptied:'emptied',topEncrypted:'encrypted',topEnded:'ended',topError:'error',topLoadedData:'loadeddata',topLoadedMetadata:'loadedmetadata',topLoadStart:'loadstart',topPause:'pause',topPlay:'play',topPlaying:'playing',topProgress:'progress',topRateChange:'ratechange',topSeeked:'seeked',topSeeking:'seeking',topStalled:'stalled',topSuspend:'suspend',topTimeUpdate:'timeupdate',topVolumeChange:'volumechange',topWaiting:'waiting'};function trapClickOnNonInteractiveElement(node){// Mobile Safari does not fire properly bubble click events on
// non-interactive elements, which means delegated click listeners do not
// fire. The workaround for this bug involves attaching an empty click
// listener on the target node.
// http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
// Just set it using the onclick property so that we don't have to manage any
// bookkeeping for it. Not sure if we need to clear it when the listener is
// removed.
// TODO: Only do this for the relevant Safaris maybe?
node.onclick=emptyFunction;}function setInitialDOMProperties(domElement,rootContainerElement,nextProps,isCustomComponentTag){for(var propKey in nextProps){if(!nextProps.hasOwnProperty(propKey)){continue;}var nextProp=nextProps[propKey];if(propKey===STYLE){{if(nextProp){// Freeze the next style object so that we can assume it won't be
// mutated. We have already warned for this in the past.
Object.freeze(nextProp);}}// Relies on `updateStylesByID` not mutating `styleUpdates`.
CSSPropertyOperations_1.setValueForStyles(domElement,nextProp);}else if(propKey===DANGEROUSLY_SET_INNER_HTML){var nextHtml=nextProp?nextProp[HTML]:undefined;if(nextHtml!=null){setInnerHTML_1(domElement,nextHtml);}}else if(propKey===CHILDREN){if(typeof nextProp==='string'){setTextContent_1(domElement,nextProp);}else if(typeof nextProp==='number'){setTextContent_1(domElement,''+nextProp);}}else if(propKey===SUPPRESS_CONTENT_EDITABLE_WARNING){// Noop
}else if(registrationNameModules.hasOwnProperty(propKey)){if(nextProp!=null){if(true&&typeof nextProp!=='function'){warnForInvalidEventListener(propKey,nextProp);}ensureListeningTo(rootContainerElement,propKey);}}else if(isCustomComponentTag){DOMPropertyOperations_1.setValueForAttribute(domElement,propKey,nextProp);}else if(nextProp!=null){// If we're updating to null or undefined, we should remove the property
// from the DOM node instead of inadvertently setting to a string. This
// brings us in line with the same behavior we have on initial render.
DOMPropertyOperations_1.setValueForProperty(domElement,propKey,nextProp);}}}function updateDOMProperties(domElement,updatePayload,wasCustomComponentTag,isCustomComponentTag){// TODO: Handle wasCustomComponentTag
for(var i=0;i<updatePayload.length;i+=2){var propKey=updatePayload[i];var propValue=updatePayload[i+1];if(propKey===STYLE){CSSPropertyOperations_1.setValueForStyles(domElement,propValue);}else if(propKey===DANGEROUSLY_SET_INNER_HTML){setInnerHTML_1(domElement,propValue);}else if(propKey===CHILDREN){setTextContent_1(domElement,propValue);}else if(isCustomComponentTag){if(propValue!=null){DOMPropertyOperations_1.setValueForAttribute(domElement,propKey,propValue);}else{DOMPropertyOperations_1.deleteValueForAttribute(domElement,propKey);}}else if(propValue!=null){DOMPropertyOperations_1.setValueForProperty(domElement,propKey,propValue);}else{// If we're updating to null or undefined, we should remove the property
// from the DOM node instead of inadvertently setting to a string. This
// brings us in line with the same behavior we have on initial render.
DOMPropertyOperations_1.deleteValueForProperty(domElement,propKey);}}}var ReactDOMFiberComponent={createElement:function createElement(type,props,rootContainerElement,parentNamespace){// We create tags in the namespace of their parent container, except HTML
var ownerDocument=getOwnerDocumentFromRootContainer(rootContainerElement);var domElement;var namespaceURI=parentNamespace;if(namespaceURI===HTML_NAMESPACE$1){namespaceURI=getIntrinsicNamespace$1(type);}if(namespaceURI===HTML_NAMESPACE$1){{var isCustomComponentTag=isCustomComponent_1(type,props);// Should this check be gated by parent namespace? Not sure we want to
// allow <SVG> or <mATH>.
warning$3(isCustomComponentTag||type===type.toLowerCase(),'<%s /> is using uppercase HTML. Always use lowercase HTML tags '+'in React.',type);}if(type==='script'){// Create the script via .innerHTML so its "parser-inserted" flag is
// set to true and it does not execute
var div=ownerDocument.createElement('div');div.innerHTML='<script><'+'/script>';// eslint-disable-line
// This is guaranteed to yield a script element.
var firstChild=div.firstChild;domElement=div.removeChild(firstChild);}else if(typeof props.is==='string'){// $FlowIssue `createElement` should be updated for Web Components
domElement=ownerDocument.createElement(type,{is:props.is});}else{// Separate else branch instead of using `props.is || undefined` above because of a Firefox bug.
// See discussion in https://github.com/facebook/react/pull/6896
// and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
domElement=ownerDocument.createElement(type);}}else{domElement=ownerDocument.createElementNS(namespaceURI,type);}{if(namespaceURI===HTML_NAMESPACE$1){if(!isCustomComponentTag&&Object.prototype.toString.call(domElement)==='[object HTMLUnknownElement]'&&!Object.prototype.hasOwnProperty.call(warnedUnknownTags,type)){warnedUnknownTags[type]=true;warning$3(false,'The tag <%s> is unrecognized in this browser. '+'If you meant to render a React component, start its name with '+'an uppercase letter.',type);}}}return domElement;},createTextNode:function createTextNode(text,rootContainerElement){return getOwnerDocumentFromRootContainer(rootContainerElement).createTextNode(text);},setInitialProperties:function setInitialProperties(domElement,tag,rawProps,rootContainerElement){var isCustomComponentTag=isCustomComponent_1(tag,rawProps);{validatePropertiesInDevelopment(tag,rawProps);if(isCustomComponentTag&&!didWarnShadyDOM&&domElement.shadyRoot){warning$3(false,'%s is using shady DOM. Using shady DOM with React can '+'cause things to break subtly.',getCurrentFiberOwnerName()||'A component');didWarnShadyDOM=true;}}// TODO: Make sure that we check isMounted before firing any of these events.
var props;switch(tag){case'iframe':case'object':ReactBrowserEventEmitter_1.trapBubbledEvent('topLoad','load',domElement);props=rawProps;break;case'video':case'audio':// Create listener for each media event
for(var event in mediaEvents){if(mediaEvents.hasOwnProperty(event)){ReactBrowserEventEmitter_1.trapBubbledEvent(event,mediaEvents[event],domElement);}}props=rawProps;break;case'source':ReactBrowserEventEmitter_1.trapBubbledEvent('topError','error',domElement);props=rawProps;break;case'img':case'image':ReactBrowserEventEmitter_1.trapBubbledEvent('topError','error',domElement);ReactBrowserEventEmitter_1.trapBubbledEvent('topLoad','load',domElement);props=rawProps;break;case'form':ReactBrowserEventEmitter_1.trapBubbledEvent('topReset','reset',domElement);ReactBrowserEventEmitter_1.trapBubbledEvent('topSubmit','submit',domElement);props=rawProps;break;case'details':ReactBrowserEventEmitter_1.trapBubbledEvent('topToggle','toggle',domElement);props=rawProps;break;case'input':ReactDOMFiberInput.initWrapperState(domElement,rawProps);props=ReactDOMFiberInput.getHostProps(domElement,rawProps);ReactBrowserEventEmitter_1.trapBubbledEvent('topInvalid','invalid',domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;case'option':ReactDOMFiberOption.validateProps(domElement,rawProps);props=ReactDOMFiberOption.getHostProps(domElement,rawProps);break;case'select':ReactDOMFiberSelect.initWrapperState(domElement,rawProps);props=ReactDOMFiberSelect.getHostProps(domElement,rawProps);ReactBrowserEventEmitter_1.trapBubbledEvent('topInvalid','invalid',domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;case'textarea':ReactDOMFiberTextarea.initWrapperState(domElement,rawProps);props=ReactDOMFiberTextarea.getHostProps(domElement,rawProps);ReactBrowserEventEmitter_1.trapBubbledEvent('topInvalid','invalid',domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;default:props=rawProps;}assertValidProps_1(tag,props,getCurrentFiberOwnerName);setInitialDOMProperties(domElement,rootContainerElement,props,isCustomComponentTag);switch(tag){case'input':// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
inputValueTracking_1.track(domElement);ReactDOMFiberInput.postMountWrapper(domElement,rawProps);break;case'textarea':// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
inputValueTracking_1.track(domElement);ReactDOMFiberTextarea.postMountWrapper(domElement,rawProps);break;case'option':ReactDOMFiberOption.postMountWrapper(domElement,rawProps);break;case'select':ReactDOMFiberSelect.postMountWrapper(domElement,rawProps);break;default:if(typeof props.onClick==='function'){// TODO: This cast may not be sound for SVG, MathML or custom elements.
trapClickOnNonInteractiveElement(domElement);}break;}},// Calculate the diff between the two objects.
diffProperties:function diffProperties(domElement,tag,lastRawProps,nextRawProps,rootContainerElement){{validatePropertiesInDevelopment(tag,nextRawProps);}var updatePayload=null;var lastProps;var nextProps;switch(tag){case'input':lastProps=ReactDOMFiberInput.getHostProps(domElement,lastRawProps);nextProps=ReactDOMFiberInput.getHostProps(domElement,nextRawProps);updatePayload=[];break;case'option':lastProps=ReactDOMFiberOption.getHostProps(domElement,lastRawProps);nextProps=ReactDOMFiberOption.getHostProps(domElement,nextRawProps);updatePayload=[];break;case'select':lastProps=ReactDOMFiberSelect.getHostProps(domElement,lastRawProps);nextProps=ReactDOMFiberSelect.getHostProps(domElement,nextRawProps);updatePayload=[];break;case'textarea':lastProps=ReactDOMFiberTextarea.getHostProps(domElement,lastRawProps);nextProps=ReactDOMFiberTextarea.getHostProps(domElement,nextRawProps);updatePayload=[];break;default:lastProps=lastRawProps;nextProps=nextRawProps;if(typeof lastProps.onClick!=='function'&&typeof nextProps.onClick==='function'){// TODO: This cast may not be sound for SVG, MathML or custom elements.
trapClickOnNonInteractiveElement(domElement);}break;}assertValidProps_1(tag,nextProps,getCurrentFiberOwnerName);var propKey;var styleName;var styleUpdates=null;for(propKey in lastProps){if(nextProps.hasOwnProperty(propKey)||!lastProps.hasOwnProperty(propKey)||lastProps[propKey]==null){continue;}if(propKey===STYLE){var lastStyle=lastProps[propKey];for(styleName in lastStyle){if(lastStyle.hasOwnProperty(styleName)){if(!styleUpdates){styleUpdates={};}styleUpdates[styleName]='';}}}else if(propKey===DANGEROUSLY_SET_INNER_HTML||propKey===CHILDREN){// Noop. This is handled by the clear text mechanism.
}else if(propKey===SUPPRESS_CONTENT_EDITABLE_WARNING){// Noop
}else if(registrationNameModules.hasOwnProperty(propKey)){// This is a special case. If any listener updates we need to ensure
// that the "current" fiber pointer gets updated so we need a commit
// to update this element.
if(!updatePayload){updatePayload=[];}}else{// For all other deleted properties we add it to the queue. We use
// the whitelist in the commit phase instead.
(updatePayload=updatePayload||[]).push(propKey,null);}}for(propKey in nextProps){var nextProp=nextProps[propKey];var lastProp=lastProps!=null?lastProps[propKey]:undefined;if(!nextProps.hasOwnProperty(propKey)||nextProp===lastProp||nextProp==null&&lastProp==null){continue;}if(propKey===STYLE){{if(nextProp){// Freeze the next style object so that we can assume it won't be
// mutated. We have already warned for this in the past.
Object.freeze(nextProp);}}if(lastProp){// Unset styles on `lastProp` but not on `nextProp`.
for(styleName in lastProp){if(lastProp.hasOwnProperty(styleName)&&(!nextProp||!nextProp.hasOwnProperty(styleName))){if(!styleUpdates){styleUpdates={};}styleUpdates[styleName]='';}}// Update styles that changed since `lastProp`.
for(styleName in nextProp){if(nextProp.hasOwnProperty(styleName)&&lastProp[styleName]!==nextProp[styleName]){if(!styleUpdates){styleUpdates={};}styleUpdates[styleName]=nextProp[styleName];}}}else{// Relies on `updateStylesByID` not mutating `styleUpdates`.
if(!styleUpdates){if(!updatePayload){updatePayload=[];}updatePayload.push(propKey,styleUpdates);}styleUpdates=nextProp;}}else if(propKey===DANGEROUSLY_SET_INNER_HTML){var nextHtml=nextProp?nextProp[HTML]:undefined;var lastHtml=lastProp?lastProp[HTML]:undefined;if(nextHtml!=null){if(lastHtml!==nextHtml){(updatePayload=updatePayload||[]).push(propKey,''+nextHtml);}}else{// TODO: It might be too late to clear this if we have children
// inserted already.
}}else if(propKey===CHILDREN){if(lastProp!==nextProp&&(typeof nextProp==='string'||typeof nextProp==='number')){(updatePayload=updatePayload||[]).push(propKey,''+nextProp);}}else if(propKey===SUPPRESS_CONTENT_EDITABLE_WARNING){// Noop
}else if(registrationNameModules.hasOwnProperty(propKey)){if(nextProp!=null){// We eagerly listen to this even though we haven't committed yet.
if(true&&typeof nextProp!=='function'){warnForInvalidEventListener(propKey,nextProp);}ensureListeningTo(rootContainerElement,propKey);}if(!updatePayload&&lastProp!==nextProp){// This is a special case. If any listener updates we need to ensure
// that the "current" props pointer gets updated so we need a commit
// to update this element.
updatePayload=[];}}else{// For any other property we always add it to the queue and then we
// filter it out using the whitelist during the commit.
(updatePayload=updatePayload||[]).push(propKey,nextProp);}}if(styleUpdates){(updatePayload=updatePayload||[]).push(STYLE,styleUpdates);}return updatePayload;},// Apply the diff.
updateProperties:function updateProperties(domElement,updatePayload,tag,lastRawProps,nextRawProps){var wasCustomComponentTag=isCustomComponent_1(tag,lastRawProps);var isCustomComponentTag=isCustomComponent_1(tag,nextRawProps);// Apply the diff.
updateDOMProperties(domElement,updatePayload,wasCustomComponentTag,isCustomComponentTag);// TODO: Ensure that an update gets scheduled if any of the special props
// changed.
switch(tag){case'input':// Update the wrapper around inputs *after* updating props. This has to
// happen after `updateDOMProperties`. Otherwise HTML5 input validations
// raise warnings and prevent the new value from being assigned.
ReactDOMFiberInput.updateWrapper(domElement,nextRawProps);// We also check that we haven't missed a value update, such as a
// Radio group shifting the checked value to another named radio input.
inputValueTracking_1.updateValueIfChanged(domElement);break;case'textarea':ReactDOMFiberTextarea.updateWrapper(domElement,nextRawProps);break;case'select':// <select> value update needs to occur after <option> children
// reconciliation
ReactDOMFiberSelect.postUpdateWrapper(domElement,nextRawProps);break;}},diffHydratedProperties:function diffHydratedProperties(domElement,tag,rawProps,parentNamespace,rootContainerElement){{var isCustomComponentTag=isCustomComponent_1(tag,rawProps);validatePropertiesInDevelopment(tag,rawProps);if(isCustomComponentTag&&!didWarnShadyDOM&&domElement.shadyRoot){warning$3(false,'%s is using shady DOM. Using shady DOM with React can '+'cause things to break subtly.',getCurrentFiberOwnerName()||'A component');didWarnShadyDOM=true;}}// TODO: Make sure that we check isMounted before firing any of these events.
switch(tag){case'iframe':case'object':ReactBrowserEventEmitter_1.trapBubbledEvent('topLoad','load',domElement);break;case'video':case'audio':// Create listener for each media event
for(var event in mediaEvents){if(mediaEvents.hasOwnProperty(event)){ReactBrowserEventEmitter_1.trapBubbledEvent(event,mediaEvents[event],domElement);}}break;case'source':ReactBrowserEventEmitter_1.trapBubbledEvent('topError','error',domElement);break;case'img':case'image':ReactBrowserEventEmitter_1.trapBubbledEvent('topError','error',domElement);ReactBrowserEventEmitter_1.trapBubbledEvent('topLoad','load',domElement);break;case'form':ReactBrowserEventEmitter_1.trapBubbledEvent('topReset','reset',domElement);ReactBrowserEventEmitter_1.trapBubbledEvent('topSubmit','submit',domElement);break;case'details':ReactBrowserEventEmitter_1.trapBubbledEvent('topToggle','toggle',domElement);break;case'input':ReactDOMFiberInput.initWrapperState(domElement,rawProps);ReactBrowserEventEmitter_1.trapBubbledEvent('topInvalid','invalid',domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;case'option':ReactDOMFiberOption.validateProps(domElement,rawProps);break;case'select':ReactDOMFiberSelect.initWrapperState(domElement,rawProps);ReactBrowserEventEmitter_1.trapBubbledEvent('topInvalid','invalid',domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;case'textarea':ReactDOMFiberTextarea.initWrapperState(domElement,rawProps);ReactBrowserEventEmitter_1.trapBubbledEvent('topInvalid','invalid',domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;}assertValidProps_1(tag,rawProps,getCurrentFiberOwnerName);{var extraAttributeNames=new Set();var attributes=domElement.attributes;for(var i=0;i<attributes.length;i++){var name=attributes[i].name.toLowerCase();switch(name){// Built-in SSR attribute is whitelisted
case'data-reactroot':break;// Controlled attributes are not validated
// TODO: Only ignore them on controlled tags.
case'value':break;case'checked':break;case'selected':break;default:// Intentionally use the original name.
// See discussion in https://github.com/facebook/react/pull/10676.
extraAttributeNames.add(attributes[i].name);}}}var updatePayload=null;for(var propKey in rawProps){if(!rawProps.hasOwnProperty(propKey)){continue;}var nextProp=rawProps[propKey];if(propKey===CHILDREN){// For text content children we compare against textContent. This
// might match additional HTML that is hidden when we read it using
// textContent. E.g. "foo" will match "f<span>oo</span>" but that still
// satisfies our requirement. Our requirement is not to produce perfect
// HTML and attributes. Ideally we should preserve structure but it's
// ok not to if the visible content is still enough to indicate what
// even listeners these nodes might be wired up to.
// TODO: Warn if there is more than a single textNode as a child.
// TODO: Should we use domElement.firstChild.nodeValue to compare?
if(typeof nextProp==='string'){if(domElement.textContent!==nextProp){{warnForTextDifference(domElement.textContent,nextProp);}updatePayload=[CHILDREN,nextProp];}}else if(typeof nextProp==='number'){if(domElement.textContent!==''+nextProp){{warnForTextDifference(domElement.textContent,nextProp);}updatePayload=[CHILDREN,''+nextProp];}}}else if(registrationNameModules.hasOwnProperty(propKey)){if(nextProp!=null){if(true&&typeof nextProp!=='function'){warnForInvalidEventListener(propKey,nextProp);}ensureListeningTo(rootContainerElement,propKey);}}else{// Validate that the properties correspond to their expected values.
var serverValue;var propertyInfo;if(propKey===SUPPRESS_CONTENT_EDITABLE_WARNING||// Controlled attributes are not validated
// TODO: Only ignore them on controlled tags.
propKey==='value'||propKey==='checked'||propKey==='selected'){// Noop
}else if(propKey===DANGEROUSLY_SET_INNER_HTML){var rawHtml=nextProp?nextProp[HTML]||'':'';var serverHTML=domElement.innerHTML;var expectedHTML=normalizeHTML(domElement,rawHtml);if(expectedHTML!==serverHTML){warnForPropDifference(propKey,serverHTML,expectedHTML);}}else if(propKey===STYLE){// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames['delete'](propKey);var expectedStyle=CSSPropertyOperations_1.createDangerousStringForStyles(nextProp);serverValue=domElement.getAttribute('style');if(expectedStyle!==serverValue){warnForPropDifference(propKey,serverValue,expectedStyle);}}else if(isCustomComponentTag){// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames['delete'](propKey.toLowerCase());serverValue=DOMPropertyOperations_1.getValueForAttribute(domElement,propKey,nextProp);if(nextProp!==serverValue){warnForPropDifference(propKey,serverValue,nextProp);}}else if(DOMProperty_1.shouldSetAttribute(propKey,nextProp)){if(propertyInfo=DOMProperty_1.getPropertyInfo(propKey)){// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames['delete'](propertyInfo.attributeName);serverValue=DOMPropertyOperations_1.getValueForProperty(domElement,propKey,nextProp);}else{var ownNamespace=parentNamespace;if(ownNamespace===HTML_NAMESPACE$1){ownNamespace=getIntrinsicNamespace$1(tag);}if(ownNamespace===HTML_NAMESPACE$1){// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames['delete'](propKey.toLowerCase());}else{// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames['delete'](propKey);}serverValue=DOMPropertyOperations_1.getValueForAttribute(domElement,propKey,nextProp);}if(nextProp!==serverValue){warnForPropDifference(propKey,serverValue,nextProp);}}}}{// $FlowFixMe - Should be inferred as not undefined.
if(extraAttributeNames.size>0){// $FlowFixMe - Should be inferred as not undefined.
warnForExtraAttributes(extraAttributeNames);}}switch(tag){case'input':// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
inputValueTracking_1.track(domElement);ReactDOMFiberInput.postMountWrapper(domElement,rawProps);break;case'textarea':// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
inputValueTracking_1.track(domElement);ReactDOMFiberTextarea.postMountWrapper(domElement,rawProps);break;case'select':case'option':// For input and textarea we current always set the value property at
// post mount to force it to diverge from attributes. However, for
// option and select we don't quite do the same thing and select
// is not resilient to the DOM state changing so we don't do that here.
// TODO: Consider not doing this for input and textarea.
break;default:if(typeof rawProps.onClick==='function'){// TODO: This cast may not be sound for SVG, MathML or custom elements.
trapClickOnNonInteractiveElement(domElement);}break;}return updatePayload;},diffHydratedText:function diffHydratedText(textNode,text){var isDifferent=textNode.nodeValue!==text;{if(isDifferent){warnForTextDifference(textNode.nodeValue,text);}}return isDifferent;},warnForDeletedHydratableElement:function warnForDeletedHydratableElement(parentNode,child){{if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warning$3(false,'Did not expect server HTML to contain a <%s> in <%s>.',child.nodeName.toLowerCase(),parentNode.nodeName.toLowerCase());}},warnForDeletedHydratableText:function warnForDeletedHydratableText(parentNode,child){{if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warning$3(false,'Did not expect server HTML to contain the text node "%s" in <%s>.',child.nodeValue,parentNode.nodeName.toLowerCase());}},warnForInsertedHydratedElement:function warnForInsertedHydratedElement(parentNode,tag,props){{if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warning$3(false,'Expected server HTML to contain a matching <%s> in <%s>.',tag,parentNode.nodeName.toLowerCase());}},warnForInsertedHydratedText:function warnForInsertedHydratedText(parentNode,text){{if(text===''){// We expect to insert empty text nodes since they're not represented in
// the HTML.
// TODO: Remove this special case if we can just avoid inserting empty
// text nodes.
return;}if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warning$3(false,'Expected server HTML to contain a matching text node for "%s" in <%s>.',text,parentNode.nodeName.toLowerCase());}},restoreControlledState:function restoreControlledState(domElement,tag,props){switch(tag){case'input':ReactDOMFiberInput.restoreControlledState(domElement,props);return;case'textarea':ReactDOMFiberTextarea.restoreControlledState(domElement,props);return;case'select':ReactDOMFiberSelect.restoreControlledState(domElement,props);return;}}};var ReactDOMFiberComponent_1=ReactDOMFiberComponent;// This is a built-in polyfill for requestIdleCallback. It works by scheduling
// a requestAnimationFrame, storing the time for the start of the frame, then
// scheduling a postMessage which gets scheduled after paint. Within the
// postMessage handler do as much work as possible until time + frame rate.
// By separating the idle call into a separate event tick we ensure that
// layout, paint and other browser work is counted against the available time.
// The frame rate is dynamically adjusted.
{var warning$17=require$$0;if(ExecutionEnvironment.canUseDOM&&typeof requestAnimationFrame!=='function'){warning$17(false,'React depends on requestAnimationFrame. Make sure that you load a '+'polyfill in older browsers. http://fb.me/react-polyfills');}}// TODO: There's no way to cancel, because Fiber doesn't atm.
var rIC=void 0;if(!ExecutionEnvironment.canUseDOM){rIC=function rIC(frameCallback){setTimeout(function(){frameCallback({timeRemaining:function timeRemaining(){return Infinity;}});});return 0;};}else if(typeof requestIdleCallback!=='function'){// Polyfill requestIdleCallback.
var scheduledRAFCallback=null;var scheduledRICCallback=null;var isIdleScheduled=false;var isAnimationFrameScheduled=false;var frameDeadline=0;// We start out assuming that we run at 30fps but then the heuristic tracking
// will adjust this value to a faster fps if we get more frequent animation
// frames.
var previousFrameTime=33;var activeFrameTime=33;var frameDeadlineObject={timeRemaining:(typeof performance==='undefined'?'undefined':_typeof(performance))==='object'&&typeof performance.now==='function'?function(){// We assume that if we have a performance timer that the rAF callback
// gets a performance timer value. Not sure if this is always true.
return frameDeadline-performance.now();}:function(){// As a fallback we use Date.now.
return frameDeadline-Date.now();}};// We use the postMessage trick to defer idle work until after the repaint.
var messageKey='__reactIdleCallback$'+Math.random().toString(36).slice(2);var idleTick=function idleTick(event){if(event.source!==window||event.data!==messageKey){return;}isIdleScheduled=false;var callback=scheduledRICCallback;scheduledRICCallback=null;if(callback!==null){callback(frameDeadlineObject);}};// Assumes that we have addEventListener in this environment. Might need
// something better for old IE.
window.addEventListener('message',idleTick,false);var animationTick=function animationTick(rafTime){isAnimationFrameScheduled=false;var nextFrameTime=rafTime-frameDeadline+activeFrameTime;if(nextFrameTime<activeFrameTime&&previousFrameTime<activeFrameTime){if(nextFrameTime<8){// Defensive coding. We don't support higher frame rates than 120hz.
// If we get lower than that, it is probably a bug.
nextFrameTime=8;}// If one frame goes long, then the next one can be short to catch up.
// If two frames are short in a row, then that's an indication that we
// actually have a higher frame rate than what we're currently optimizing.
// We adjust our heuristic dynamically accordingly. For example, if we're
// running on 120hz display or 90hz VR display.
// Take the max of the two in case one of them was an anomaly due to
// missed frame deadlines.
activeFrameTime=nextFrameTime<previousFrameTime?previousFrameTime:nextFrameTime;}else{previousFrameTime=nextFrameTime;}frameDeadline=rafTime+activeFrameTime;if(!isIdleScheduled){isIdleScheduled=true;window.postMessage(messageKey,'*');}var callback=scheduledRAFCallback;scheduledRAFCallback=null;if(callback!==null){callback(rafTime);}};rIC=function rIC(callback){// This assumes that we only schedule one callback at a time because that's
// how Fiber uses it.
scheduledRICCallback=callback;if(!isAnimationFrameScheduled){// If rAF didn't already schedule one, we need to schedule a frame.
// TODO: If this rAF doesn't materialize because the browser throttles, we
// might want to still have setTimeout trigger rIC as a backup to ensure
// that we keep performing work.
isAnimationFrameScheduled=true;requestAnimationFrame(animationTick);}return 0;};}else{rIC=requestIdleCallback;}var rIC_1=rIC;var ReactDOMFrameScheduling={rIC:rIC_1};/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactFeatureFlags
 * 
 */var ReactFeatureFlags={enableAsyncSubtreeAPI:true};var ReactFeatureFlags_1=ReactFeatureFlags;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactPriorityLevel
 * 
 */var ReactPriorityLevel={NoWork:0,// No work is pending.
SynchronousPriority:1,// For controlled text inputs. Synchronous side-effects.
TaskPriority:2,// Completes at the end of the current tick.
HighPriority:3,// Interaction that needs to complete pretty soon to feel responsive.
LowPriority:4,// Data fetching, or result from updating stores.
OffscreenPriority:5};var CallbackEffect=ReactTypeOfSideEffect.Callback;var NoWork=ReactPriorityLevel.NoWork;var SynchronousPriority=ReactPriorityLevel.SynchronousPriority;var TaskPriority=ReactPriorityLevel.TaskPriority;var ClassComponent$2=ReactTypeOfWork.ClassComponent;var HostRoot$2=ReactTypeOfWork.HostRoot;{var warning$19=require$$0;}// Callbacks are not validated until invocation
// Singly linked-list of updates. When an update is scheduled, it is added to
// the queue of the current fiber and the work-in-progress fiber. The two queues
// are separate but they share a persistent structure.
//
// During reconciliation, updates are removed from the work-in-progress fiber,
// but they remain on the current fiber. That ensures that if a work-in-progress
// is aborted, the aborted updates are recovered by cloning from current.
//
// The work-in-progress queue is always a subset of the current queue.
//
// When the tree is committed, the work-in-progress becomes the current.
var _queue1=void 0;var _queue2=void 0;function comparePriority(a,b){// When comparing update priorities, treat sync and Task work as equal.
// TODO: Could we avoid the need for this by always coercing sync priority
// to Task when scheduling an update?
if((a===TaskPriority||a===SynchronousPriority)&&(b===TaskPriority||b===SynchronousPriority)){return 0;}if(a===NoWork&&b!==NoWork){return-255;}if(a!==NoWork&&b===NoWork){return 255;}return a-b;}function createUpdateQueue(){var queue={first:null,last:null,hasForceUpdate:false,callbackList:null};{queue.isProcessing=false;}return queue;}function cloneUpdate(update){return{priorityLevel:update.priorityLevel,partialState:update.partialState,callback:update.callback,isReplace:update.isReplace,isForced:update.isForced,isTopLevelUnmount:update.isTopLevelUnmount,next:null};}function insertUpdateIntoQueue(queue,update,insertAfter,insertBefore){if(insertAfter!==null){insertAfter.next=update;}else{// This is the first item in the queue.
update.next=queue.first;queue.first=update;}if(insertBefore!==null){update.next=insertBefore;}else{// This is the last item in the queue.
queue.last=update;}}// Returns the update after which the incoming update should be inserted into
// the queue, or null if it should be inserted at beginning.
function findInsertionPosition(queue,update){var priorityLevel=update.priorityLevel;var insertAfter=null;var insertBefore=null;if(queue.last!==null&&comparePriority(queue.last.priorityLevel,priorityLevel)<=0){// Fast path for the common case where the update should be inserted at
// the end of the queue.
insertAfter=queue.last;}else{insertBefore=queue.first;while(insertBefore!==null&&comparePriority(insertBefore.priorityLevel,priorityLevel)<=0){insertAfter=insertBefore;insertBefore=insertBefore.next;}}return insertAfter;}function ensureUpdateQueues(fiber){var alternateFiber=fiber.alternate;var queue1=fiber.updateQueue;if(queue1===null){queue1=fiber.updateQueue=createUpdateQueue();}var queue2=void 0;if(alternateFiber!==null){queue2=alternateFiber.updateQueue;if(queue2===null){queue2=alternateFiber.updateQueue=createUpdateQueue();}}else{queue2=null;}_queue1=queue1;// Return null if there is no alternate queue, or if its queue is the same.
_queue2=queue2!==queue1?queue2:null;}// The work-in-progress queue is a subset of the current queue (if it exists).
// We need to insert the incoming update into both lists. However, it's possible
// that the correct position in one list will be different from the position in
// the other. Consider the following case:
//
//     Current:             3-5-6
//     Work-in-progress:        6
//
// Then we receive an update with priority 4 and insert it into each list:
//
//     Current:             3-4-5-6
//     Work-in-progress:        4-6
//
// In the current queue, the new update's `next` pointer points to the update
// with priority 5. But in the work-in-progress queue, the pointer points to the
// update with priority 6. Because these two queues share the same persistent
// data structure, this won't do. (This can only happen when the incoming update
// has higher priority than all the updates in the work-in-progress queue.)
//
// To solve this, in the case where the incoming update needs to be inserted
// into two different positions, we'll make a clone of the update and insert
// each copy into a separate queue. This forks the list while maintaining a
// persistent structure, because the update that is added to the work-in-progress
// is always added to the front of the list.
//
// However, if incoming update is inserted into the same position of both lists,
// we shouldn't make a copy.
//
// If the update is cloned, it returns the cloned update.
function insertUpdate(fiber,update){// We'll have at least one and at most two distinct update queues.
ensureUpdateQueues(fiber);var queue1=_queue1;var queue2=_queue2;// Warn if an update is scheduled from inside an updater function.
{if(queue1.isProcessing||queue2!==null&&queue2.isProcessing){warning$19(false,'An update (setState, replaceState, or forceUpdate) was scheduled '+'from inside an update function. Update functions should be pure, '+'with zero side-effects. Consider using componentDidUpdate or a '+'callback.');}}// Find the insertion position in the first queue.
var insertAfter1=findInsertionPosition(queue1,update);var insertBefore1=insertAfter1!==null?insertAfter1.next:queue1.first;if(queue2===null){// If there's no alternate queue, there's nothing else to do but insert.
insertUpdateIntoQueue(queue1,update,insertAfter1,insertBefore1);return null;}// If there is an alternate queue, find the insertion position.
var insertAfter2=findInsertionPosition(queue2,update);var insertBefore2=insertAfter2!==null?insertAfter2.next:queue2.first;// Now we can insert into the first queue. This must come after finding both
// insertion positions because it mutates the list.
insertUpdateIntoQueue(queue1,update,insertAfter1,insertBefore1);// See if the insertion positions are equal. Be careful to only compare
// non-null values.
if(insertBefore1===insertBefore2&&insertBefore1!==null||insertAfter1===insertAfter2&&insertAfter1!==null){// The insertion positions are the same, so when we inserted into the first
// queue, it also inserted into the alternate. All we need to do is update
// the alternate queue's `first` and `last` pointers, in case they
// have changed.
if(insertAfter2===null){queue2.first=update;}if(insertBefore2===null){queue2.last=null;}return null;}else{// The insertion positions are different, so we need to clone the update and
// insert the clone into the alternate queue.
var update2=cloneUpdate(update);insertUpdateIntoQueue(queue2,update2,insertAfter2,insertBefore2);return update2;}}function addUpdate(fiber,partialState,callback,priorityLevel){var update={priorityLevel:priorityLevel,partialState:partialState,callback:callback,isReplace:false,isForced:false,isTopLevelUnmount:false,next:null};insertUpdate(fiber,update);}var addUpdate_1=addUpdate;function addReplaceUpdate(fiber,state,callback,priorityLevel){var update={priorityLevel:priorityLevel,partialState:state,callback:callback,isReplace:true,isForced:false,isTopLevelUnmount:false,next:null};insertUpdate(fiber,update);}var addReplaceUpdate_1=addReplaceUpdate;function addForceUpdate(fiber,callback,priorityLevel){var update={priorityLevel:priorityLevel,partialState:null,callback:callback,isReplace:false,isForced:true,isTopLevelUnmount:false,next:null};insertUpdate(fiber,update);}var addForceUpdate_1=addForceUpdate;function getUpdatePriority(fiber){var updateQueue=fiber.updateQueue;if(updateQueue===null){return NoWork;}if(fiber.tag!==ClassComponent$2&&fiber.tag!==HostRoot$2){return NoWork;}return updateQueue.first!==null?updateQueue.first.priorityLevel:NoWork;}var getUpdatePriority_1=getUpdatePriority;function addTopLevelUpdate$1(fiber,partialState,callback,priorityLevel){var isTopLevelUnmount=partialState.element===null;var update={priorityLevel:priorityLevel,partialState:partialState,callback:callback,isReplace:false,isForced:false,isTopLevelUnmount:isTopLevelUnmount,next:null};var update2=insertUpdate(fiber,update);if(isTopLevelUnmount){// TODO: Redesign the top-level mount/update/unmount API to avoid this
// special case.
var queue1=_queue1;var queue2=_queue2;// Drop all updates that are lower-priority, so that the tree is not
// remounted. We need to do this for both queues.
if(queue1!==null&&update.next!==null){update.next=null;queue1.last=update;}if(queue2!==null&&update2!==null&&update2.next!==null){update2.next=null;queue2.last=update;}}}var addTopLevelUpdate_1=addTopLevelUpdate$1;function getStateFromUpdate(update,instance,prevState,props){var partialState=update.partialState;if(typeof partialState==='function'){var updateFn=partialState;return updateFn.call(instance,prevState,props);}else{return partialState;}}function beginUpdateQueue(current,workInProgress,queue,instance,prevState,props,priorityLevel){if(current!==null&&current.updateQueue===queue){// We need to create a work-in-progress queue, by cloning the current queue.
var currentQueue=queue;queue=workInProgress.updateQueue={first:currentQueue.first,last:currentQueue.last,// These fields are no longer valid because they were already committed.
// Reset them.
callbackList:null,hasForceUpdate:false};}{// Set this flag so we can warn if setState is called inside the update
// function of another setState.
queue.isProcessing=true;}// Calculate these using the the existing values as a base.
var callbackList=queue.callbackList;var hasForceUpdate=queue.hasForceUpdate;// Applies updates with matching priority to the previous state to create
// a new state object.
var state=prevState;var dontMutatePrevState=true;var update=queue.first;while(update!==null&&comparePriority(update.priorityLevel,priorityLevel)<=0){// Remove each update from the queue right before it is processed. That way
// if setState is called from inside an updater function, the new update
// will be inserted in the correct position.
queue.first=update.next;if(queue.first===null){queue.last=null;}var _partialState=void 0;if(update.isReplace){state=getStateFromUpdate(update,instance,state,props);dontMutatePrevState=true;}else{_partialState=getStateFromUpdate(update,instance,state,props);if(_partialState){if(dontMutatePrevState){state=_assign({},state,_partialState);}else{state=_assign(state,_partialState);}dontMutatePrevState=false;}}if(update.isForced){hasForceUpdate=true;}// Second condition ignores top-level unmount callbacks if they are not the
// last update in the queue, since a subsequent update will cause a remount.
if(update.callback!==null&&!(update.isTopLevelUnmount&&update.next!==null)){callbackList=callbackList!==null?callbackList:[];callbackList.push(update.callback);workInProgress.effectTag|=CallbackEffect;}update=update.next;}queue.callbackList=callbackList;queue.hasForceUpdate=hasForceUpdate;if(queue.first===null&&callbackList===null&&!hasForceUpdate){// The queue is empty and there are no callbacks. We can reset it.
workInProgress.updateQueue=null;}{// No longer processing.
queue.isProcessing=false;}return state;}var beginUpdateQueue_1=beginUpdateQueue;function commitCallbacks(finishedWork,queue,context){var callbackList=queue.callbackList;if(callbackList===null){return;}// Set the list to null to make sure they don't get called more than once.
queue.callbackList=null;for(var i=0;i<callbackList.length;i++){var _callback=callbackList[i];!(typeof _callback==='function')?invariant(false,'Invalid argument passed as callback. Expected a function. Instead received: %s',_callback):void 0;_callback.call(context);}}var commitCallbacks_1=commitCallbacks;var ReactFiberUpdateQueue={addUpdate:addUpdate_1,addReplaceUpdate:addReplaceUpdate_1,addForceUpdate:addForceUpdate_1,getUpdatePriority:getUpdatePriority_1,addTopLevelUpdate:addTopLevelUpdate_1,beginUpdateQueue:beginUpdateQueue_1,commitCallbacks:commitCallbacks_1};{var warning$21=require$$0;}var valueStack=[];{var fiberStack=[];}var index=-1;var createCursor$1=function createCursor$1(defaultValue){return{current:defaultValue};};var isEmpty=function isEmpty(){return index===-1;};var pop$1=function pop$1(cursor,fiber){if(index<0){{warning$21(false,'Unexpected pop.');}return;}{if(fiber!==fiberStack[index]){warning$21(false,'Unexpected Fiber popped.');}}cursor.current=valueStack[index];valueStack[index]=null;{fiberStack[index]=null;}index--;};var push$1=function push$1(cursor,value,fiber){index++;valueStack[index]=cursor.current;{fiberStack[index]=fiber;}cursor.current=value;};var reset=function reset(){while(index>-1){valueStack[index]=null;{fiberStack[index]=null;}index--;}};var ReactFiberStack={createCursor:createCursor$1,isEmpty:isEmpty,pop:pop$1,push:push$1,reset:reset};// Trust the developer to only use this with a true check
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactDebugFiberPerf
 * 
 */var ReactDebugFiberPerf=null;{var _require$8=ReactTypeOfWork,HostRoot$4=_require$8.HostRoot,HostComponent$4=_require$8.HostComponent,HostText$2=_require$8.HostText,HostPortal$1=_require$8.HostPortal,YieldComponent=_require$8.YieldComponent,Fragment=_require$8.Fragment;var getComponentName$5=getComponentName_1;// Prefix measurements so that it's possible to filter them.
// Longer prefixes are hard to read in DevTools.
var reactEmoji='\u269B';var warningEmoji='\u26D4';var supportsUserTiming=typeof performance!=='undefined'&&typeof performance.mark==='function'&&typeof performance.clearMarks==='function'&&typeof performance.measure==='function'&&typeof performance.clearMeasures==='function';// Keep track of current fiber so that we know the path to unwind on pause.
// TODO: this looks the same as nextUnitOfWork in scheduler. Can we unify them?
var currentFiber=null;// If we're in the middle of user code, which fiber and method is it?
// Reusing `currentFiber` would be confusing for this because user code fiber
// can change during commit phase too, but we don't need to unwind it (since
// lifecycles in the commit phase don't resemble a tree).
var currentPhase=null;var currentPhaseFiber=null;// Did lifecycle hook schedule an update? This is often a performance problem,
// so we will keep track of it, and include it in the report.
// Track commits caused by cascading updates.
var isCommitting=false;var hasScheduledUpdateInCurrentCommit=false;var hasScheduledUpdateInCurrentPhase=false;var commitCountInCurrentWorkLoop=0;var effectCountInCurrentCommit=0;// During commits, we only show a measurement once per method name
// to avoid stretch the commit phase with measurement overhead.
var labelsInCurrentCommit=new Set();var formatMarkName=function formatMarkName(markName){return reactEmoji+' '+markName;};var formatLabel=function formatLabel(label,warning){var prefix=warning?warningEmoji+' ':reactEmoji+' ';var suffix=warning?' Warning: '+warning:'';return''+prefix+label+suffix;};var beginMark=function beginMark(markName){performance.mark(formatMarkName(markName));};var clearMark=function clearMark(markName){performance.clearMarks(formatMarkName(markName));};var endMark=function endMark(label,markName,warning){var formattedMarkName=formatMarkName(markName);var formattedLabel=formatLabel(label,warning);try{performance.measure(formattedLabel,formattedMarkName);}catch(err){}// If previous mark was missing for some reason, this will throw.
// This could only happen if React crashed in an unexpected place earlier.
// Don't pile on with more errors.
// Clear marks immediately to avoid growing buffer.
performance.clearMarks(formattedMarkName);performance.clearMeasures(formattedLabel);};var getFiberMarkName=function getFiberMarkName(label,debugID){return label+' (#'+debugID+')';};var getFiberLabel=function getFiberLabel(componentName,isMounted,phase){if(phase===null){// These are composite component total time measurements.
return componentName+' ['+(isMounted?'update':'mount')+']';}else{// Composite component methods.
return componentName+'.'+phase;}};var beginFiberMark=function beginFiberMark(fiber,phase){var componentName=getComponentName$5(fiber)||'Unknown';var debugID=fiber._debugID;var isMounted=fiber.alternate!==null;var label=getFiberLabel(componentName,isMounted,phase);if(isCommitting&&labelsInCurrentCommit.has(label)){// During the commit phase, we don't show duplicate labels because
// there is a fixed overhead for every measurement, and we don't
// want to stretch the commit phase beyond necessary.
return false;}labelsInCurrentCommit.add(label);var markName=getFiberMarkName(label,debugID);beginMark(markName);return true;};var clearFiberMark=function clearFiberMark(fiber,phase){var componentName=getComponentName$5(fiber)||'Unknown';var debugID=fiber._debugID;var isMounted=fiber.alternate!==null;var label=getFiberLabel(componentName,isMounted,phase);var markName=getFiberMarkName(label,debugID);clearMark(markName);};var endFiberMark=function endFiberMark(fiber,phase,warning){var componentName=getComponentName$5(fiber)||'Unknown';var debugID=fiber._debugID;var isMounted=fiber.alternate!==null;var label=getFiberLabel(componentName,isMounted,phase);var markName=getFiberMarkName(label,debugID);endMark(label,markName,warning);};var shouldIgnoreFiber=function shouldIgnoreFiber(fiber){// Host components should be skipped in the timeline.
// We could check typeof fiber.type, but does this work with RN?
switch(fiber.tag){case HostRoot$4:case HostComponent$4:case HostText$2:case HostPortal$1:case YieldComponent:case Fragment:return true;default:return false;}};var clearPendingPhaseMeasurement=function clearPendingPhaseMeasurement(){if(currentPhase!==null&&currentPhaseFiber!==null){clearFiberMark(currentPhaseFiber,currentPhase);}currentPhaseFiber=null;currentPhase=null;hasScheduledUpdateInCurrentPhase=false;};var pauseTimers=function pauseTimers(){// Stops all currently active measurements so that they can be resumed
// if we continue in a later deferred loop from the same unit of work.
var fiber=currentFiber;while(fiber){if(fiber._debugIsCurrentlyTiming){endFiberMark(fiber,null,null);}fiber=fiber['return'];}};var resumeTimersRecursively=function resumeTimersRecursively(fiber){if(fiber['return']!==null){resumeTimersRecursively(fiber['return']);}if(fiber._debugIsCurrentlyTiming){beginFiberMark(fiber,null);}};var resumeTimers=function resumeTimers(){// Resumes all measurements that were active during the last deferred loop.
if(currentFiber!==null){resumeTimersRecursively(currentFiber);}};ReactDebugFiberPerf={recordEffect:function recordEffect(){effectCountInCurrentCommit++;},recordScheduleUpdate:function recordScheduleUpdate(){if(isCommitting){hasScheduledUpdateInCurrentCommit=true;}if(currentPhase!==null&&currentPhase!=='componentWillMount'&&currentPhase!=='componentWillReceiveProps'){hasScheduledUpdateInCurrentPhase=true;}},startWorkTimer:function startWorkTimer(fiber){if(!supportsUserTiming||shouldIgnoreFiber(fiber)){return;}// If we pause, this is the fiber to unwind from.
currentFiber=fiber;if(!beginFiberMark(fiber,null)){return;}fiber._debugIsCurrentlyTiming=true;},cancelWorkTimer:function cancelWorkTimer(fiber){if(!supportsUserTiming||shouldIgnoreFiber(fiber)){return;}// Remember we shouldn't complete measurement for this fiber.
// Otherwise flamechart will be deep even for small updates.
fiber._debugIsCurrentlyTiming=false;clearFiberMark(fiber,null);},stopWorkTimer:function stopWorkTimer(fiber){if(!supportsUserTiming||shouldIgnoreFiber(fiber)){return;}// If we pause, its parent is the fiber to unwind from.
currentFiber=fiber['return'];if(!fiber._debugIsCurrentlyTiming){return;}fiber._debugIsCurrentlyTiming=false;endFiberMark(fiber,null,null);},stopFailedWorkTimer:function stopFailedWorkTimer(fiber){if(!supportsUserTiming||shouldIgnoreFiber(fiber)){return;}// If we pause, its parent is the fiber to unwind from.
currentFiber=fiber['return'];if(!fiber._debugIsCurrentlyTiming){return;}fiber._debugIsCurrentlyTiming=false;var warning='An error was thrown inside this error boundary';endFiberMark(fiber,null,warning);},startPhaseTimer:function startPhaseTimer(fiber,phase){if(!supportsUserTiming){return;}clearPendingPhaseMeasurement();if(!beginFiberMark(fiber,phase)){return;}currentPhaseFiber=fiber;currentPhase=phase;},stopPhaseTimer:function stopPhaseTimer(){if(!supportsUserTiming){return;}if(currentPhase!==null&&currentPhaseFiber!==null){var warning=hasScheduledUpdateInCurrentPhase?'Scheduled a cascading update':null;endFiberMark(currentPhaseFiber,currentPhase,warning);}currentPhase=null;currentPhaseFiber=null;},startWorkLoopTimer:function startWorkLoopTimer(){if(!supportsUserTiming){return;}commitCountInCurrentWorkLoop=0;// This is top level call.
// Any other measurements are performed within.
beginMark('(React Tree Reconciliation)');// Resume any measurements that were in progress during the last loop.
resumeTimers();},stopWorkLoopTimer:function stopWorkLoopTimer(){if(!supportsUserTiming){return;}var warning=commitCountInCurrentWorkLoop>1?'There were cascading updates':null;commitCountInCurrentWorkLoop=0;// Pause any measurements until the next loop.
pauseTimers();endMark('(React Tree Reconciliation)','(React Tree Reconciliation)',warning);},startCommitTimer:function startCommitTimer(){if(!supportsUserTiming){return;}isCommitting=true;hasScheduledUpdateInCurrentCommit=false;labelsInCurrentCommit.clear();beginMark('(Committing Changes)');},stopCommitTimer:function stopCommitTimer(){if(!supportsUserTiming){return;}var warning=null;if(hasScheduledUpdateInCurrentCommit){warning='Lifecycle hook scheduled a cascading update';}else if(commitCountInCurrentWorkLoop>0){warning='Caused by a cascading update in earlier commit';}hasScheduledUpdateInCurrentCommit=false;commitCountInCurrentWorkLoop++;isCommitting=false;labelsInCurrentCommit.clear();endMark('(Committing Changes)','(Committing Changes)',warning);},startCommitHostEffectsTimer:function startCommitHostEffectsTimer(){if(!supportsUserTiming){return;}effectCountInCurrentCommit=0;beginMark('(Committing Host Effects)');},stopCommitHostEffectsTimer:function stopCommitHostEffectsTimer(){if(!supportsUserTiming){return;}var count=effectCountInCurrentCommit;effectCountInCurrentCommit=0;endMark('(Committing Host Effects: '+count+' Total)','(Committing Host Effects)',null);},startCommitLifeCyclesTimer:function startCommitLifeCyclesTimer(){if(!supportsUserTiming){return;}effectCountInCurrentCommit=0;beginMark('(Calling Lifecycle Methods)');},stopCommitLifeCyclesTimer:function stopCommitLifeCyclesTimer(){if(!supportsUserTiming){return;}var count=effectCountInCurrentCommit;effectCountInCurrentCommit=0;endMark('(Calling Lifecycle Methods: '+count+' Total)','(Calling Lifecycle Methods)',null);}};}var ReactDebugFiberPerf_1=ReactDebugFiberPerf;var isFiberMounted$1=ReactFiberTreeReflection.isFiberMounted;var ClassComponent$3=ReactTypeOfWork.ClassComponent;var HostRoot$3=ReactTypeOfWork.HostRoot;var createCursor=ReactFiberStack.createCursor;var pop=ReactFiberStack.pop;var push=ReactFiberStack.push;{var warning$20=require$$0;var checkPropTypes$1=checkPropTypes;var ReactDebugCurrentFiber$2=ReactDebugCurrentFiber_1;var _require4=ReactDebugFiberPerf_1,startPhaseTimer=_require4.startPhaseTimer,stopPhaseTimer=_require4.stopPhaseTimer;var warnedAboutMissingGetChildContext={};}// A cursor to the current merged context object on the stack.
var contextStackCursor=createCursor(emptyObject);// A cursor to a boolean indicating whether the context has changed.
var didPerformWorkStackCursor=createCursor(false);// Keep track of the previous context object that was on the stack.
// We use this to get access to the parent context after we have already
// pushed the next context provider, and now need to merge their contexts.
var previousContext=emptyObject;function getUnmaskedContext(workInProgress){var hasOwnContext=isContextProvider$1(workInProgress);if(hasOwnContext){// If the fiber is a context provider itself, when we read its context
// we have already pushed its own child context on the stack. A context
// provider should not "see" its own child context. Therefore we read the
// previous (parent) context instead for a context provider.
return previousContext;}return contextStackCursor.current;}var getUnmaskedContext_1=getUnmaskedContext;function cacheContext(workInProgress,unmaskedContext,maskedContext){var instance=workInProgress.stateNode;instance.__reactInternalMemoizedUnmaskedChildContext=unmaskedContext;instance.__reactInternalMemoizedMaskedChildContext=maskedContext;}var cacheContext_1=cacheContext;var getMaskedContext=function getMaskedContext(workInProgress,unmaskedContext){var type=workInProgress.type;var contextTypes=type.contextTypes;if(!contextTypes){return emptyObject;}// Avoid recreating masked context unless unmasked context has changed.
// Failing to do this will result in unnecessary calls to componentWillReceiveProps.
// This may trigger infinite loops if componentWillReceiveProps calls setState.
var instance=workInProgress.stateNode;if(instance&&instance.__reactInternalMemoizedUnmaskedChildContext===unmaskedContext){return instance.__reactInternalMemoizedMaskedChildContext;}var context={};for(var key in contextTypes){context[key]=unmaskedContext[key];}{var name=getComponentName_1(workInProgress)||'Unknown';ReactDebugCurrentFiber$2.setCurrentFiber(workInProgress,null);checkPropTypes$1(contextTypes,context,'context',name,ReactDebugCurrentFiber$2.getCurrentFiberStackAddendum);ReactDebugCurrentFiber$2.resetCurrentFiber();}// Cache unmasked context so we can avoid recreating masked context unless necessary.
// Context is created before the class component is instantiated so check for instance.
if(instance){cacheContext(workInProgress,unmaskedContext,context);}return context;};var hasContextChanged=function hasContextChanged(){return didPerformWorkStackCursor.current;};function isContextConsumer(fiber){return fiber.tag===ClassComponent$3&&fiber.type.contextTypes!=null;}var isContextConsumer_1=isContextConsumer;function isContextProvider$1(fiber){return fiber.tag===ClassComponent$3&&fiber.type.childContextTypes!=null;}var isContextProvider_1=isContextProvider$1;function popContextProvider(fiber){if(!isContextProvider$1(fiber)){return;}pop(didPerformWorkStackCursor,fiber);pop(contextStackCursor,fiber);}var popContextProvider_1=popContextProvider;var popTopLevelContextObject=function popTopLevelContextObject(fiber){pop(didPerformWorkStackCursor,fiber);pop(contextStackCursor,fiber);};var pushTopLevelContextObject=function pushTopLevelContextObject(fiber,context,didChange){!(contextStackCursor.cursor==null)?invariant(false,'Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.'):void 0;push(contextStackCursor,context,fiber);push(didPerformWorkStackCursor,didChange,fiber);};function processChildContext$1(fiber,parentContext,isReconciling){var instance=fiber.stateNode;var childContextTypes=fiber.type.childContextTypes;// TODO (bvaughn) Replace this behavior with an invariant() in the future.
// It has only been added in Fiber to match the (unintentional) behavior in Stack.
if(typeof instance.getChildContext!=='function'){{var componentName=getComponentName_1(fiber)||'Unknown';if(!warnedAboutMissingGetChildContext[componentName]){warnedAboutMissingGetChildContext[componentName]=true;warning$20(false,'%s.childContextTypes is specified but there is no getChildContext() method '+'on the instance. You can either define getChildContext() on %s or remove '+'childContextTypes from it.',componentName,componentName);}}return parentContext;}var childContext=void 0;{ReactDebugCurrentFiber$2.setCurrentFiber(fiber,'getChildContext');startPhaseTimer(fiber,'getChildContext');childContext=instance.getChildContext();stopPhaseTimer();ReactDebugCurrentFiber$2.resetCurrentFiber();}for(var contextKey in childContext){!(contextKey in childContextTypes)?invariant(false,'%s.getChildContext(): key "%s" is not defined in childContextTypes.',getComponentName_1(fiber)||'Unknown',contextKey):void 0;}{var name=getComponentName_1(fiber)||'Unknown';// We can only provide accurate element stacks if we pass work-in-progress tree
// during the begin or complete phase. However currently this function is also
// called from unstable_renderSubtree legacy implementation. In this case it unsafe to
// assume anything about the given fiber. We won't pass it down if we aren't sure.
// TODO: remove this hack when we delete unstable_renderSubtree in Fiber.
var workInProgress=isReconciling?fiber:null;ReactDebugCurrentFiber$2.setCurrentFiber(workInProgress,null);checkPropTypes$1(childContextTypes,childContext,'child context',name,ReactDebugCurrentFiber$2.getCurrentFiberStackAddendum);ReactDebugCurrentFiber$2.resetCurrentFiber();}return _assign({},parentContext,childContext);}var processChildContext_1=processChildContext$1;var pushContextProvider=function pushContextProvider(workInProgress){if(!isContextProvider$1(workInProgress)){return false;}var instance=workInProgress.stateNode;// We push the context as early as possible to ensure stack integrity.
// If the instance does not exist yet, we will push null at first,
// and replace it on the stack later when invalidating the context.
var memoizedMergedChildContext=instance&&instance.__reactInternalMemoizedMergedChildContext||emptyObject;// Remember the parent context so we can merge with it later.
// Inherit the parent's did-perform-work value to avoid inadvertantly blocking updates.
previousContext=contextStackCursor.current;push(contextStackCursor,memoizedMergedChildContext,workInProgress);push(didPerformWorkStackCursor,didPerformWorkStackCursor.current,workInProgress);return true;};var invalidateContextProvider=function invalidateContextProvider(workInProgress,didChange){var instance=workInProgress.stateNode;!instance?invariant(false,'Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.'):void 0;if(didChange){// Merge parent and own context.
// Skip this if we're not updating due to sCU.
// This avoids unnecessarily recomputing memoized values.
var mergedContext=processChildContext$1(workInProgress,previousContext,true);instance.__reactInternalMemoizedMergedChildContext=mergedContext;// Replace the old (or empty) context with the new one.
// It is important to unwind the context in the reverse order.
pop(didPerformWorkStackCursor,workInProgress);pop(contextStackCursor,workInProgress);// Now push the new context and mark that it has changed.
push(contextStackCursor,mergedContext,workInProgress);push(didPerformWorkStackCursor,didChange,workInProgress);}else{pop(didPerformWorkStackCursor,workInProgress);push(didPerformWorkStackCursor,didChange,workInProgress);}};var resetContext=function resetContext(){previousContext=emptyObject;contextStackCursor.current=emptyObject;didPerformWorkStackCursor.current=false;};var findCurrentUnmaskedContext$1=function findCurrentUnmaskedContext$1(fiber){// Currently this is only used with renderSubtreeIntoContainer; not sure if it
// makes sense elsewhere
!(isFiberMounted$1(fiber)&&fiber.tag===ClassComponent$3)?invariant(false,'Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.'):void 0;var node=fiber;while(node.tag!==HostRoot$3){if(isContextProvider$1(node)){return node.stateNode.__reactInternalMemoizedMergedChildContext;}var parent=node['return'];!parent?invariant(false,'Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.'):void 0;node=parent;}return node.stateNode.context;};var ReactFiberContext={getUnmaskedContext:getUnmaskedContext_1,cacheContext:cacheContext_1,getMaskedContext:getMaskedContext,hasContextChanged:hasContextChanged,isContextConsumer:isContextConsumer_1,isContextProvider:isContextProvider_1,popContextProvider:popContextProvider_1,popTopLevelContextObject:popTopLevelContextObject,pushTopLevelContextObject:pushTopLevelContextObject,processChildContext:processChildContext_1,pushContextProvider:pushContextProvider,invalidateContextProvider:invalidateContextProvider,resetContext:resetContext,findCurrentUnmaskedContext:findCurrentUnmaskedContext$1};/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactTypeOfInternalContext
 * 
 */var ReactTypeOfInternalContext={NoContext:0,AsyncUpdates:1};var IndeterminateComponent$1=ReactTypeOfWork.IndeterminateComponent;var ClassComponent$4=ReactTypeOfWork.ClassComponent;var HostRoot$5=ReactTypeOfWork.HostRoot;var HostComponent$5=ReactTypeOfWork.HostComponent;var HostText$3=ReactTypeOfWork.HostText;var HostPortal$2=ReactTypeOfWork.HostPortal;var CoroutineComponent=ReactTypeOfWork.CoroutineComponent;var YieldComponent$1=ReactTypeOfWork.YieldComponent;var Fragment$1=ReactTypeOfWork.Fragment;var NoWork$1=ReactPriorityLevel.NoWork;var NoContext=ReactTypeOfInternalContext.NoContext;var NoEffect$1=ReactTypeOfSideEffect.NoEffect;{var getComponentName$6=getComponentName_1;var hasBadMapPolyfill=false;try{var nonExtensibleObject=Object.preventExtensions({});/* eslint-disable no-new */new Map([[nonExtensibleObject,null]]);new Set([nonExtensibleObject]);/* eslint-enable no-new */}catch(e){// TODO: Consider warning about bad polyfills
hasBadMapPolyfill=true;}}// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.
{var debugCounter=1;}function FiberNode(tag,key,internalContextTag){// Instance
this.tag=tag;this.key=key;this.type=null;this.stateNode=null;// Fiber
this['return']=null;this.child=null;this.sibling=null;this.index=0;this.ref=null;this.pendingProps=null;this.memoizedProps=null;this.updateQueue=null;this.memoizedState=null;this.internalContextTag=internalContextTag;// Effects
this.effectTag=NoEffect$1;this.nextEffect=null;this.firstEffect=null;this.lastEffect=null;this.pendingWorkPriority=NoWork$1;this.alternate=null;{this._debugID=debugCounter++;this._debugSource=null;this._debugOwner=null;this._debugIsCurrentlyTiming=false;if(!hasBadMapPolyfill&&typeof Object.preventExtensions==='function'){Object.preventExtensions(this);}}}// This is a constructor function, rather than a POJO constructor, still
// please ensure we do the following:
// 1) Nobody should add any instance methods on this. Instance methods can be
//    more difficult to predict when they get optimized and they are almost
//    never inlined properly in static compilers.
// 2) Nobody should rely on `instanceof Fiber` for type testing. We should
//    always know when it is a fiber.
// 3) We might want to experiment with using numeric keys since they are easier
//    to optimize in a non-JIT environment.
// 4) We can easily go from a constructor to a createFiber object literal if that
//    is faster.
// 5) It should be easy to port this to a C struct and keep a C implementation
//    compatible.
var createFiber=function createFiber(tag,key,internalContextTag){// $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
return new FiberNode(tag,key,internalContextTag);};function shouldConstruct(Component){return!!(Component.prototype&&Component.prototype.isReactComponent);}// This is used to create an alternate fiber to do work on.
var createWorkInProgress=function createWorkInProgress(current,renderPriority){var workInProgress=current.alternate;if(workInProgress===null){// We use a double buffering pooling technique because we know that we'll
// only ever need at most two versions of a tree. We pool the "other" unused
// node that we're free to reuse. This is lazily created to avoid allocating
// extra objects for things that are never updated. It also allow us to
// reclaim the extra memory if needed.
workInProgress=createFiber(current.tag,current.key,current.internalContextTag);workInProgress.type=current.type;workInProgress.stateNode=current.stateNode;{// DEV-only fields
workInProgress._debugID=current._debugID;workInProgress._debugSource=current._debugSource;workInProgress._debugOwner=current._debugOwner;}workInProgress.alternate=current;current.alternate=workInProgress;}else{// We already have an alternate.
// Reset the effect tag.
workInProgress.effectTag=NoEffect$1;// The effect list is no longer valid.
workInProgress.nextEffect=null;workInProgress.firstEffect=null;workInProgress.lastEffect=null;}workInProgress.pendingWorkPriority=renderPriority;workInProgress.child=current.child;workInProgress.memoizedProps=current.memoizedProps;workInProgress.memoizedState=current.memoizedState;workInProgress.updateQueue=current.updateQueue;// pendingProps is set by the parent during reconciliation.
// TODO: Pass this as an argument.
// These will be overridden during the parent's reconciliation
workInProgress.sibling=current.sibling;workInProgress.index=current.index;workInProgress.ref=current.ref;return workInProgress;};var createHostRootFiber$1=function createHostRootFiber$1(){var fiber=createFiber(HostRoot$5,null,NoContext);return fiber;};var createFiberFromElement=function createFiberFromElement(element,internalContextTag,priorityLevel){var owner=null;{owner=element._owner;}var fiber=createFiberFromElementType(element.type,element.key,internalContextTag,owner);fiber.pendingProps=element.props;fiber.pendingWorkPriority=priorityLevel;{fiber._debugSource=element._source;fiber._debugOwner=element._owner;}return fiber;};var createFiberFromFragment=function createFiberFromFragment(elements,internalContextTag,priorityLevel){// TODO: Consider supporting keyed fragments. Technically, we accidentally
// support that in the existing React.
var fiber=createFiber(Fragment$1,null,internalContextTag);fiber.pendingProps=elements;fiber.pendingWorkPriority=priorityLevel;return fiber;};var createFiberFromText=function createFiberFromText(content,internalContextTag,priorityLevel){var fiber=createFiber(HostText$3,null,internalContextTag);fiber.pendingProps=content;fiber.pendingWorkPriority=priorityLevel;return fiber;};function createFiberFromElementType(type,key,internalContextTag,debugOwner){var fiber=void 0;if(typeof type==='function'){fiber=shouldConstruct(type)?createFiber(ClassComponent$4,key,internalContextTag):createFiber(IndeterminateComponent$1,key,internalContextTag);fiber.type=type;}else if(typeof type==='string'){fiber=createFiber(HostComponent$5,key,internalContextTag);fiber.type=type;}else if((typeof type==='undefined'?'undefined':_typeof(type))==='object'&&type!==null&&typeof type.tag==='number'){// Currently assumed to be a continuation and therefore is a fiber already.
// TODO: The yield system is currently broken for updates in some cases.
// The reified yield stores a fiber, but we don't know which fiber that is;
// the current or a workInProgress? When the continuation gets rendered here
// we don't know if we can reuse that fiber or if we need to clone it.
// There is probably a clever way to restructure this.
fiber=type;}else{var info='';{if(type===undefined||(typeof type==='undefined'?'undefined':_typeof(type))==='object'&&type!==null&&Object.keys(type).length===0){info+=' You likely forgot to export your component from the file '+"it's defined in.";}var ownerName=debugOwner?getComponentName$6(debugOwner):null;if(ownerName){info+='\n\nCheck the render method of `'+ownerName+'`.';}}invariant(false,'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',type==null?type:typeof type==='undefined'?'undefined':_typeof(type),info);}return fiber;}var createFiberFromElementType_1=createFiberFromElementType;var createFiberFromHostInstanceForDeletion=function createFiberFromHostInstanceForDeletion(){var fiber=createFiber(HostComponent$5,null,NoContext);fiber.type='DELETED';return fiber;};var createFiberFromCoroutine=function createFiberFromCoroutine(coroutine,internalContextTag,priorityLevel){var fiber=createFiber(CoroutineComponent,coroutine.key,internalContextTag);fiber.type=coroutine.handler;fiber.pendingProps=coroutine;fiber.pendingWorkPriority=priorityLevel;return fiber;};var createFiberFromYield=function createFiberFromYield(yieldNode,internalContextTag,priorityLevel){var fiber=createFiber(YieldComponent$1,null,internalContextTag);return fiber;};var createFiberFromPortal=function createFiberFromPortal(portal,internalContextTag,priorityLevel){var fiber=createFiber(HostPortal$2,portal.key,internalContextTag);fiber.pendingProps=portal.children||[];fiber.pendingWorkPriority=priorityLevel;fiber.stateNode={containerInfo:portal.containerInfo,implementation:portal.implementation};return fiber;};var largerPriority=function largerPriority(p1,p2){return p1!==NoWork$1&&(p2===NoWork$1||p2>p1)?p1:p2;};var ReactFiber={createWorkInProgress:createWorkInProgress,createHostRootFiber:createHostRootFiber$1,createFiberFromElement:createFiberFromElement,createFiberFromFragment:createFiberFromFragment,createFiberFromText:createFiberFromText,createFiberFromElementType:createFiberFromElementType_1,createFiberFromHostInstanceForDeletion:createFiberFromHostInstanceForDeletion,createFiberFromCoroutine:createFiberFromCoroutine,createFiberFromYield:createFiberFromYield,createFiberFromPortal:createFiberFromPortal,largerPriority:largerPriority};var createHostRootFiber=ReactFiber.createHostRootFiber;var createFiberRoot$1=function createFiberRoot$1(containerInfo){// Cyclic construction. This cheats the type system right now because
// stateNode is any.
var uninitializedFiber=createHostRootFiber();var root={current:uninitializedFiber,containerInfo:containerInfo,isScheduled:false,nextScheduledRoot:null,context:null,pendingContext:null};uninitializedFiber.stateNode=root;return root;};var ReactFiberRoot={createFiberRoot:createFiberRoot$1};var defaultShowDialog=function defaultShowDialog(capturedError){return true;};var showDialog=defaultShowDialog;function logCapturedError$1(capturedError){var logError=showDialog(capturedError);// Allow injected showDialog() to prevent default console.error logging.
// This enables renderers like ReactNative to better manage redbox behavior.
if(logError===false){return;}var error=capturedError.error;{var componentName=capturedError.componentName,componentStack=capturedError.componentStack,errorBoundaryName=capturedError.errorBoundaryName,errorBoundaryFound=capturedError.errorBoundaryFound,willRetry=capturedError.willRetry;var componentNameMessage=componentName?'The above error occurred in the <'+componentName+'> component:':'The above error occurred in one of your React components:';var errorBoundaryMessage=void 0;// errorBoundaryFound check is sufficient; errorBoundaryName check is to satisfy Flow.
if(errorBoundaryFound&&errorBoundaryName){if(willRetry){errorBoundaryMessage='React will try to recreate this component tree from scratch '+('using the error boundary you provided, '+errorBoundaryName+'.');}else{errorBoundaryMessage='This error was initially handled by the error boundary '+errorBoundaryName+'.\n'+'Recreating the tree from scratch failed so React will unmount the tree.';}}else{errorBoundaryMessage='Consider adding an error boundary to your tree to customize error handling behavior.\n'+'You can learn more about error boundaries at https://fb.me/react-error-boundaries.';}var combinedMessage=''+componentNameMessage+componentStack+'\n\n'+(''+errorBoundaryMessage);// In development, we provide our own message with just the component stack.
// We don't include the original error message and JS stack because the browser
// has already printed it. Even if the application swallows the error, it is still
// displayed by the browser thanks to the DEV-only fake event trick in ReactErrorUtils.
console.error(combinedMessage);}}var injection$1={/**
   * Display custom dialog for lifecycle errors.
   * Return false to prevent default behavior of logging to console.error.
   */injectDialog:function injectDialog(fn){!(showDialog===defaultShowDialog)?invariant(false,'The custom dialog was already injected.'):void 0;!(typeof fn==='function')?invariant(false,'Injected showDialog() must be a function.'):void 0;showDialog=fn;}};var logCapturedError_1=logCapturedError$1;var ReactFiberErrorLogger={injection:injection$1,logCapturedError:logCapturedError_1};/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactCoroutine
 * 
 */// The Symbol used to tag the special React types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_COROUTINE_TYPE$1;var REACT_YIELD_TYPE$1;if(typeof Symbol==='function'&&Symbol['for']){REACT_COROUTINE_TYPE$1=Symbol['for']('react.coroutine');REACT_YIELD_TYPE$1=Symbol['for']('react.yield');}else{REACT_COROUTINE_TYPE$1=0xeac8;REACT_YIELD_TYPE$1=0xeac9;}var createCoroutine=function createCoroutine(children,handler,props){var key=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;var coroutine={// This tag allow us to uniquely identify this as a React Coroutine
$$typeof:REACT_COROUTINE_TYPE$1,key:key==null?null:''+key,children:children,handler:handler,props:props};{// TODO: Add _store property for marking this as validated.
if(Object.freeze){Object.freeze(coroutine.props);Object.freeze(coroutine);}}return coroutine;};var createYield=function createYield(value){var yieldNode={// This tag allow us to uniquely identify this as a React Yield
$$typeof:REACT_YIELD_TYPE$1,value:value};{// TODO: Add _store property for marking this as validated.
if(Object.freeze){Object.freeze(yieldNode);}}return yieldNode;};/**
 * Verifies the object is a coroutine object.
 */var isCoroutine=function isCoroutine(object){return(typeof object==='undefined'?'undefined':_typeof(object))==='object'&&object!==null&&object.$$typeof===REACT_COROUTINE_TYPE$1;};/**
 * Verifies the object is a yield object.
 */var isYield=function isYield(object){return(typeof object==='undefined'?'undefined':_typeof(object))==='object'&&object!==null&&object.$$typeof===REACT_YIELD_TYPE$1;};var REACT_YIELD_TYPE_1=REACT_YIELD_TYPE$1;var REACT_COROUTINE_TYPE_1=REACT_COROUTINE_TYPE$1;var ReactCoroutine={createCoroutine:createCoroutine,createYield:createYield,isCoroutine:isCoroutine,isYield:isYield,REACT_YIELD_TYPE:REACT_YIELD_TYPE_1,REACT_COROUTINE_TYPE:REACT_COROUTINE_TYPE_1};/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactPortal
 * 
 */// The Symbol used to tag the special React types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_PORTAL_TYPE$1=typeof Symbol==='function'&&Symbol['for']&&Symbol['for']('react.portal')||0xeaca;var createPortal$1=function createPortal$1(children,containerInfo,// TODO: figure out the API for cross-renderer implementation.
implementation){var key=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;return{// This tag allow us to uniquely identify this as a React Portal
$$typeof:REACT_PORTAL_TYPE$1,key:key==null?null:''+key,children:children,containerInfo:containerInfo,implementation:implementation};};/**
 * Verifies the object is a portal object.
 */var isPortal=function isPortal(object){return(typeof object==='undefined'?'undefined':_typeof(object))==='object'&&object!==null&&object.$$typeof===REACT_PORTAL_TYPE$1;};var REACT_PORTAL_TYPE_1=REACT_PORTAL_TYPE$1;var ReactPortal={createPortal:createPortal$1,isPortal:isPortal,REACT_PORTAL_TYPE:REACT_PORTAL_TYPE_1};var REACT_COROUTINE_TYPE=ReactCoroutine.REACT_COROUTINE_TYPE;var REACT_YIELD_TYPE=ReactCoroutine.REACT_YIELD_TYPE;var REACT_PORTAL_TYPE=ReactPortal.REACT_PORTAL_TYPE;{var _require3$4=ReactDebugCurrentFiber_1,getCurrentFiberStackAddendum$5=_require3$4.getCurrentFiberStackAddendum;var warning$24=require$$0;var didWarnAboutMaps=false;/**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */var ownerHasKeyUseWarning={};var warnForMissingKey=function warnForMissingKey(child){if(child===null||(typeof child==='undefined'?'undefined':_typeof(child))!=='object'){return;}if(!child._store||child._store.validated||child.key!=null){return;}!(_typeof(child._store)==='object')?invariant(false,'React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.'):void 0;child._store.validated=true;var currentComponentErrorInfo='Each child in an array or iterator should have a unique '+'"key" prop. See https://fb.me/react-warning-keys for '+'more information.'+(getCurrentFiberStackAddendum$5()||'');if(ownerHasKeyUseWarning[currentComponentErrorInfo]){return;}ownerHasKeyUseWarning[currentComponentErrorInfo]=true;warning$24(false,'Each child in an array or iterator should have a unique '+'"key" prop. See https://fb.me/react-warning-keys for '+'more information.%s',getCurrentFiberStackAddendum$5());};}var createWorkInProgress$2=ReactFiber.createWorkInProgress;var createFiberFromElement$1=ReactFiber.createFiberFromElement;var createFiberFromFragment$1=ReactFiber.createFiberFromFragment;var createFiberFromText$1=ReactFiber.createFiberFromText;var createFiberFromCoroutine$1=ReactFiber.createFiberFromCoroutine;var createFiberFromYield$1=ReactFiber.createFiberFromYield;var createFiberFromPortal$1=ReactFiber.createFiberFromPortal;var isArray=Array.isArray;var FunctionalComponent$2=ReactTypeOfWork.FunctionalComponent;var ClassComponent$7=ReactTypeOfWork.ClassComponent;var HostText$5=ReactTypeOfWork.HostText;var HostPortal$5=ReactTypeOfWork.HostPortal;var CoroutineComponent$2=ReactTypeOfWork.CoroutineComponent;var YieldComponent$3=ReactTypeOfWork.YieldComponent;var Fragment$3=ReactTypeOfWork.Fragment;var NoEffect$2=ReactTypeOfSideEffect.NoEffect;var Placement$3=ReactTypeOfSideEffect.Placement;var Deletion$1=ReactTypeOfSideEffect.Deletion;var ITERATOR_SYMBOL=typeof Symbol==='function'&&Symbol.iterator;var FAUX_ITERATOR_SYMBOL='@@iterator';// Before Symbol spec.
// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE=typeof Symbol==='function'&&Symbol['for']&&Symbol['for']('react.element')||0xeac7;function getIteratorFn(maybeIterable){if(maybeIterable===null||typeof maybeIterable==='undefined'){return null;}var iteratorFn=ITERATOR_SYMBOL&&maybeIterable[ITERATOR_SYMBOL]||maybeIterable[FAUX_ITERATOR_SYMBOL];if(typeof iteratorFn==='function'){return iteratorFn;}return null;}function coerceRef(current,element){var mixedRef=element.ref;if(mixedRef!==null&&typeof mixedRef!=='function'){if(element._owner){var owner=element._owner;var inst=void 0;if(owner){if(typeof owner.tag==='number'){var ownerFiber=owner;!(ownerFiber.tag===ClassComponent$7)?invariant(false,'Stateless function components cannot have refs.'):void 0;inst=ownerFiber.stateNode;}else{// Stack
inst=owner.getPublicInstance();}}!inst?invariant(false,'Missing owner for string ref %s. This error is likely caused by a bug in React. Please file an issue.',mixedRef):void 0;var stringRef=''+mixedRef;// Check if previous string ref matches new string ref
if(current!==null&&current.ref!==null&&current.ref._stringRef===stringRef){return current.ref;}var ref=function ref(value){var refs=inst.refs===emptyObject?inst.refs={}:inst.refs;if(value===null){delete refs[stringRef];}else{refs[stringRef]=value;}};ref._stringRef=stringRef;return ref;}else{!(typeof mixedRef==='string')?invariant(false,'Expected ref to be a function or a string.'):void 0;!element._owner?invariant(false,'Element ref was specified as a string (%s) but no owner was set. You may have multiple copies of React loaded. (details: https://fb.me/react-refs-must-have-owner).',mixedRef):void 0;}}return mixedRef;}function throwOnInvalidObjectType(returnFiber,newChild){if(returnFiber.type!=='textarea'){var addendum='';{addendum=' If you meant to render a collection of children, use an array '+'instead.'+(getCurrentFiberStackAddendum$5()||'');}invariant(false,'Objects are not valid as a React child (found: %s).%s',Object.prototype.toString.call(newChild)==='[object Object]'?'object with keys {'+Object.keys(newChild).join(', ')+'}':newChild,addendum);}}function warnOnFunctionType(){warning$24(false,'Functions are not valid as a React child. This may happen if '+'you return a Component instead of <Component /> from render. '+'Or maybe you meant to call this function rather than return it.%s',getCurrentFiberStackAddendum$5()||'');}// This wrapper function exists because I expect to clone the code in each path
// to be able to optimize each path individually by branching early. This needs
// a compiler or we can do it manually. Helpers that don't need this branching
// live outside of this function.
function ChildReconciler(shouldClone,shouldTrackSideEffects){function deleteChild(returnFiber,childToDelete){if(!shouldTrackSideEffects){// Noop.
return;}if(!shouldClone){// When we're reconciling in place we have a work in progress copy. We
// actually want the current copy. If there is no current copy, then we
// don't need to track deletion side-effects.
if(childToDelete.alternate===null){return;}childToDelete=childToDelete.alternate;}// Deletions are added in reversed order so we add it to the front.
// At this point, the return fiber's effect list is empty except for
// deletions, so we can just append the deletion to the list. The remaining
// effects aren't added until the complete phase. Once we implement
// resuming, this may not be true.
var last=returnFiber.lastEffect;if(last!==null){last.nextEffect=childToDelete;returnFiber.lastEffect=childToDelete;}else{returnFiber.firstEffect=returnFiber.lastEffect=childToDelete;}childToDelete.nextEffect=null;childToDelete.effectTag=Deletion$1;}function deleteRemainingChildren(returnFiber,currentFirstChild){if(!shouldTrackSideEffects){// Noop.
return null;}// TODO: For the shouldClone case, this could be micro-optimized a bit by
// assuming that after the first child we've already added everything.
var childToDelete=currentFirstChild;while(childToDelete!==null){deleteChild(returnFiber,childToDelete);childToDelete=childToDelete.sibling;}return null;}function mapRemainingChildren(returnFiber,currentFirstChild){// Add the remaining children to a temporary map so that we can find them by
// keys quickly. Implicit (null) keys get added to this set with their index
var existingChildren=new Map();var existingChild=currentFirstChild;while(existingChild!==null){if(existingChild.key!==null){existingChildren.set(existingChild.key,existingChild);}else{existingChildren.set(existingChild.index,existingChild);}existingChild=existingChild.sibling;}return existingChildren;}function useFiber(fiber,priority){// We currently set sibling to null and index to 0 here because it is easy
// to forget to do before returning it. E.g. for the single child case.
if(shouldClone){var clone=createWorkInProgress$2(fiber,priority);clone.index=0;clone.sibling=null;return clone;}else{// We override the pending priority even if it is higher, because if
// we're reconciling at a lower priority that means that this was
// down-prioritized.
fiber.pendingWorkPriority=priority;fiber.effectTag=NoEffect$2;fiber.index=0;fiber.sibling=null;return fiber;}}function placeChild(newFiber,lastPlacedIndex,newIndex){newFiber.index=newIndex;if(!shouldTrackSideEffects){// Noop.
return lastPlacedIndex;}var current=newFiber.alternate;if(current!==null){var oldIndex=current.index;if(oldIndex<lastPlacedIndex){// This is a move.
newFiber.effectTag=Placement$3;return lastPlacedIndex;}else{// This item can stay in place.
return oldIndex;}}else{// This is an insertion.
newFiber.effectTag=Placement$3;return lastPlacedIndex;}}function placeSingleChild(newFiber){// This is simpler for the single child case. We only need to do a
// placement for inserting new children.
if(shouldTrackSideEffects&&newFiber.alternate===null){newFiber.effectTag=Placement$3;}return newFiber;}function updateTextNode(returnFiber,current,textContent,priority){if(current===null||current.tag!==HostText$5){// Insert
var created=createFiberFromText$1(textContent,returnFiber.internalContextTag,priority);created['return']=returnFiber;return created;}else{// Update
var existing=useFiber(current,priority);existing.pendingProps=textContent;existing['return']=returnFiber;return existing;}}function updateElement(returnFiber,current,element,priority){if(current===null||current.type!==element.type){// Insert
var created=createFiberFromElement$1(element,returnFiber.internalContextTag,priority);created.ref=coerceRef(current,element);created['return']=returnFiber;return created;}else{// Move based on index
var existing=useFiber(current,priority);existing.ref=coerceRef(current,element);existing.pendingProps=element.props;existing['return']=returnFiber;{existing._debugSource=element._source;existing._debugOwner=element._owner;}return existing;}}function updateCoroutine(returnFiber,current,coroutine,priority){// TODO: Should this also compare handler to determine whether to reuse?
if(current===null||current.tag!==CoroutineComponent$2){// Insert
var created=createFiberFromCoroutine$1(coroutine,returnFiber.internalContextTag,priority);created['return']=returnFiber;return created;}else{// Move based on index
var existing=useFiber(current,priority);existing.pendingProps=coroutine;existing['return']=returnFiber;return existing;}}function updateYield(returnFiber,current,yieldNode,priority){if(current===null||current.tag!==YieldComponent$3){// Insert
var created=createFiberFromYield$1(yieldNode,returnFiber.internalContextTag,priority);created.type=yieldNode.value;created['return']=returnFiber;return created;}else{// Move based on index
var existing=useFiber(current,priority);existing.type=yieldNode.value;existing['return']=returnFiber;return existing;}}function updatePortal(returnFiber,current,portal,priority){if(current===null||current.tag!==HostPortal$5||current.stateNode.containerInfo!==portal.containerInfo||current.stateNode.implementation!==portal.implementation){// Insert
var created=createFiberFromPortal$1(portal,returnFiber.internalContextTag,priority);created['return']=returnFiber;return created;}else{// Update
var existing=useFiber(current,priority);existing.pendingProps=portal.children||[];existing['return']=returnFiber;return existing;}}function updateFragment(returnFiber,current,fragment,priority){if(current===null||current.tag!==Fragment$3){// Insert
var created=createFiberFromFragment$1(fragment,returnFiber.internalContextTag,priority);created['return']=returnFiber;return created;}else{// Update
var existing=useFiber(current,priority);existing.pendingProps=fragment;existing['return']=returnFiber;return existing;}}function createChild(returnFiber,newChild,priority){if(typeof newChild==='string'||typeof newChild==='number'){// Text nodes doesn't have keys. If the previous node is implicitly keyed
// we can continue to replace it without aborting even if it is not a text
// node.
var created=createFiberFromText$1(''+newChild,returnFiber.internalContextTag,priority);created['return']=returnFiber;return created;}if((typeof newChild==='undefined'?'undefined':_typeof(newChild))==='object'&&newChild!==null){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:{var _created=createFiberFromElement$1(newChild,returnFiber.internalContextTag,priority);_created.ref=coerceRef(null,newChild);_created['return']=returnFiber;return _created;}case REACT_COROUTINE_TYPE:{var _created2=createFiberFromCoroutine$1(newChild,returnFiber.internalContextTag,priority);_created2['return']=returnFiber;return _created2;}case REACT_YIELD_TYPE:{var _created3=createFiberFromYield$1(newChild,returnFiber.internalContextTag,priority);_created3.type=newChild.value;_created3['return']=returnFiber;return _created3;}case REACT_PORTAL_TYPE:{var _created4=createFiberFromPortal$1(newChild,returnFiber.internalContextTag,priority);_created4['return']=returnFiber;return _created4;}}if(isArray(newChild)||getIteratorFn(newChild)){var _created5=createFiberFromFragment$1(newChild,returnFiber.internalContextTag,priority);_created5['return']=returnFiber;return _created5;}throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType();}}return null;}function updateSlot(returnFiber,oldFiber,newChild,priority){// Update the fiber if the keys match, otherwise return null.
var key=oldFiber!==null?oldFiber.key:null;if(typeof newChild==='string'||typeof newChild==='number'){// Text nodes doesn't have keys. If the previous node is implicitly keyed
// we can continue to replace it without aborting even if it is not a text
// node.
if(key!==null){return null;}return updateTextNode(returnFiber,oldFiber,''+newChild,priority);}if((typeof newChild==='undefined'?'undefined':_typeof(newChild))==='object'&&newChild!==null){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:{if(newChild.key===key){return updateElement(returnFiber,oldFiber,newChild,priority);}else{return null;}}case REACT_COROUTINE_TYPE:{if(newChild.key===key){return updateCoroutine(returnFiber,oldFiber,newChild,priority);}else{return null;}}case REACT_YIELD_TYPE:{// Yields doesn't have keys. If the previous node is implicitly keyed
// we can continue to replace it without aborting even if it is not a
// yield.
if(key===null){return updateYield(returnFiber,oldFiber,newChild,priority);}else{return null;}}case REACT_PORTAL_TYPE:{if(newChild.key===key){return updatePortal(returnFiber,oldFiber,newChild,priority);}else{return null;}}}if(isArray(newChild)||getIteratorFn(newChild)){// Fragments doesn't have keys so if the previous key is implicit we can
// update it.
if(key!==null){return null;}return updateFragment(returnFiber,oldFiber,newChild,priority);}throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType();}}return null;}function updateFromMap(existingChildren,returnFiber,newIdx,newChild,priority){if(typeof newChild==='string'||typeof newChild==='number'){// Text nodes doesn't have keys, so we neither have to check the old nor
// new node for the key. If both are text nodes, they match.
var matchedFiber=existingChildren.get(newIdx)||null;return updateTextNode(returnFiber,matchedFiber,''+newChild,priority);}if((typeof newChild==='undefined'?'undefined':_typeof(newChild))==='object'&&newChild!==null){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:{var _matchedFiber=existingChildren.get(newChild.key===null?newIdx:newChild.key)||null;return updateElement(returnFiber,_matchedFiber,newChild,priority);}case REACT_COROUTINE_TYPE:{var _matchedFiber2=existingChildren.get(newChild.key===null?newIdx:newChild.key)||null;return updateCoroutine(returnFiber,_matchedFiber2,newChild,priority);}case REACT_YIELD_TYPE:{// Yields doesn't have keys, so we neither have to check the old nor
// new node for the key. If both are yields, they match.
var _matchedFiber3=existingChildren.get(newIdx)||null;return updateYield(returnFiber,_matchedFiber3,newChild,priority);}case REACT_PORTAL_TYPE:{var _matchedFiber4=existingChildren.get(newChild.key===null?newIdx:newChild.key)||null;return updatePortal(returnFiber,_matchedFiber4,newChild,priority);}}if(isArray(newChild)||getIteratorFn(newChild)){var _matchedFiber5=existingChildren.get(newIdx)||null;return updateFragment(returnFiber,_matchedFiber5,newChild,priority);}throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType();}}return null;}/**
   * Warns if there is a duplicate or missing key
   */function warnOnInvalidKey(child,knownKeys){{if((typeof child==='undefined'?'undefined':_typeof(child))!=='object'||child===null){return knownKeys;}switch(child.$$typeof){case REACT_ELEMENT_TYPE:case REACT_COROUTINE_TYPE:case REACT_PORTAL_TYPE:warnForMissingKey(child);var key=child.key;if(typeof key!=='string'){break;}if(knownKeys===null){knownKeys=new Set();knownKeys.add(key);break;}if(!knownKeys.has(key)){knownKeys.add(key);break;}warning$24(false,'Encountered two children with the same key, `%s`. '+'Keys should be unique so that components maintain their identity '+'across updates. Non-unique keys may cause children to be '+'duplicated and/or omitted — the behavior is unsupported and '+'could change in a future version.%s',key,getCurrentFiberStackAddendum$5());break;default:break;}}return knownKeys;}function reconcileChildrenArray(returnFiber,currentFirstChild,newChildren,priority){// This algorithm can't optimize by searching from boths ends since we
// don't have backpointers on fibers. I'm trying to see how far we can get
// with that model. If it ends up not being worth the tradeoffs, we can
// add it later.
// Even with a two ended optimization, we'd want to optimize for the case
// where there are few changes and brute force the comparison instead of
// going for the Map. It'd like to explore hitting that path first in
// forward-only mode and only go for the Map once we notice that we need
// lots of look ahead. This doesn't handle reversal as well as two ended
// search but that's unusual. Besides, for the two ended optimization to
// work on Iterables, we'd need to copy the whole set.
// In this first iteration, we'll just live with hitting the bad case
// (adding everything to a Map) in for every insert/move.
// If you change this code, also update reconcileChildrenIterator() which
// uses the same algorithm.
{// First, validate keys.
var knownKeys=null;for(var i=0;i<newChildren.length;i++){var child=newChildren[i];knownKeys=warnOnInvalidKey(child,knownKeys);}}var resultingFirstChild=null;var previousNewFiber=null;var oldFiber=currentFirstChild;var lastPlacedIndex=0;var newIdx=0;var nextOldFiber=null;for(;oldFiber!==null&&newIdx<newChildren.length;newIdx++){if(oldFiber.index>newIdx){nextOldFiber=oldFiber;oldFiber=null;}else{nextOldFiber=oldFiber.sibling;}var newFiber=updateSlot(returnFiber,oldFiber,newChildren[newIdx],priority);if(newFiber===null){// TODO: This breaks on empty slots like null children. That's
// unfortunate because it triggers the slow path all the time. We need
// a better way to communicate whether this was a miss or null,
// boolean, undefined, etc.
if(oldFiber===null){oldFiber=nextOldFiber;}break;}if(shouldTrackSideEffects){if(oldFiber&&newFiber.alternate===null){// We matched the slot, but we didn't reuse the existing fiber, so we
// need to delete the existing child.
deleteChild(returnFiber,oldFiber);}}lastPlacedIndex=placeChild(newFiber,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=newFiber;}else{// TODO: Defer siblings if we're not at the right index for this slot.
// I.e. if we had null values before, then we want to defer this
// for each null value. However, we also don't want to call updateSlot
// with the previous one.
previousNewFiber.sibling=newFiber;}previousNewFiber=newFiber;oldFiber=nextOldFiber;}if(newIdx===newChildren.length){// We've reached the end of the new children. We can delete the rest.
deleteRemainingChildren(returnFiber,oldFiber);return resultingFirstChild;}if(oldFiber===null){// If we don't have any more existing children we can choose a fast path
// since the rest will all be insertions.
for(;newIdx<newChildren.length;newIdx++){var _newFiber=createChild(returnFiber,newChildren[newIdx],priority);if(!_newFiber){continue;}lastPlacedIndex=placeChild(_newFiber,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=_newFiber;}else{previousNewFiber.sibling=_newFiber;}previousNewFiber=_newFiber;}return resultingFirstChild;}// Add all children to a key map for quick lookups.
var existingChildren=mapRemainingChildren(returnFiber,oldFiber);// Keep scanning and use the map to restore deleted items as moves.
for(;newIdx<newChildren.length;newIdx++){var _newFiber2=updateFromMap(existingChildren,returnFiber,newIdx,newChildren[newIdx],priority);if(_newFiber2){if(shouldTrackSideEffects){if(_newFiber2.alternate!==null){// The new fiber is a work in progress, but if there exists a
// current, that means that we reused the fiber. We need to delete
// it from the child list so that we don't add it to the deletion
// list.
existingChildren['delete'](_newFiber2.key===null?newIdx:_newFiber2.key);}}lastPlacedIndex=placeChild(_newFiber2,lastPlacedIndex,newIdx);if(previousNewFiber===null){resultingFirstChild=_newFiber2;}else{previousNewFiber.sibling=_newFiber2;}previousNewFiber=_newFiber2;}}if(shouldTrackSideEffects){// Any existing children that weren't consumed above were deleted. We need
// to add them to the deletion list.
existingChildren.forEach(function(child){return deleteChild(returnFiber,child);});}return resultingFirstChild;}function reconcileChildrenIterator(returnFiber,currentFirstChild,newChildrenIterable,priority){// This is the same implementation as reconcileChildrenArray(),
// but using the iterator instead.
var iteratorFn=getIteratorFn(newChildrenIterable);!(typeof iteratorFn==='function')?invariant(false,'An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.'):void 0;{// Warn about using Maps as children
if(typeof newChildrenIterable.entries==='function'){var possibleMap=newChildrenIterable;if(possibleMap.entries===iteratorFn){warning$24(didWarnAboutMaps,'Using Maps as children is unsupported and will likely yield '+'unexpected results. Convert it to a sequence/iterable of keyed '+'ReactElements instead.%s',getCurrentFiberStackAddendum$5());didWarnAboutMaps=true;}}// First, validate keys.
// We'll get a different iterator later for the main pass.
var _newChildren=iteratorFn.call(newChildrenIterable);if(_newChildren){var knownKeys=null;var _step=_newChildren.next();for(;!_step.done;_step=_newChildren.next()){var child=_step.value;knownKeys=warnOnInvalidKey(child,knownKeys);}}}var newChildren=iteratorFn.call(newChildrenIterable);!(newChildren!=null)?invariant(false,'An iterable object provided no iterator.'):void 0;var resultingFirstChild=null;var previousNewFiber=null;var oldFiber=currentFirstChild;var lastPlacedIndex=0;var newIdx=0;var nextOldFiber=null;var step=newChildren.next();for(;oldFiber!==null&&!step.done;newIdx++,step=newChildren.next()){if(oldFiber.index>newIdx){nextOldFiber=oldFiber;oldFiber=null;}else{nextOldFiber=oldFiber.sibling;}var newFiber=updateSlot(returnFiber,oldFiber,step.value,priority);if(newFiber===null){// TODO: This breaks on empty slots like null children. That's
// unfortunate because it triggers the slow path all the time. We need
// a better way to communicate whether this was a miss or null,
// boolean, undefined, etc.
if(!oldFiber){oldFiber=nextOldFiber;}break;}if(shouldTrackSideEffects){if(oldFiber&&newFiber.alternate===null){// We matched the slot, but we didn't reuse the existing fiber, so we
// need to delete the existing child.
deleteChild(returnFiber,oldFiber);}}lastPlacedIndex=placeChild(newFiber,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=newFiber;}else{// TODO: Defer siblings if we're not at the right index for this slot.
// I.e. if we had null values before, then we want to defer this
// for each null value. However, we also don't want to call updateSlot
// with the previous one.
previousNewFiber.sibling=newFiber;}previousNewFiber=newFiber;oldFiber=nextOldFiber;}if(step.done){// We've reached the end of the new children. We can delete the rest.
deleteRemainingChildren(returnFiber,oldFiber);return resultingFirstChild;}if(oldFiber===null){// If we don't have any more existing children we can choose a fast path
// since the rest will all be insertions.
for(;!step.done;newIdx++,step=newChildren.next()){var _newFiber3=createChild(returnFiber,step.value,priority);if(_newFiber3===null){continue;}lastPlacedIndex=placeChild(_newFiber3,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=_newFiber3;}else{previousNewFiber.sibling=_newFiber3;}previousNewFiber=_newFiber3;}return resultingFirstChild;}// Add all children to a key map for quick lookups.
var existingChildren=mapRemainingChildren(returnFiber,oldFiber);// Keep scanning and use the map to restore deleted items as moves.
for(;!step.done;newIdx++,step=newChildren.next()){var _newFiber4=updateFromMap(existingChildren,returnFiber,newIdx,step.value,priority);if(_newFiber4!==null){if(shouldTrackSideEffects){if(_newFiber4.alternate!==null){// The new fiber is a work in progress, but if there exists a
// current, that means that we reused the fiber. We need to delete
// it from the child list so that we don't add it to the deletion
// list.
existingChildren['delete'](_newFiber4.key===null?newIdx:_newFiber4.key);}}lastPlacedIndex=placeChild(_newFiber4,lastPlacedIndex,newIdx);if(previousNewFiber===null){resultingFirstChild=_newFiber4;}else{previousNewFiber.sibling=_newFiber4;}previousNewFiber=_newFiber4;}}if(shouldTrackSideEffects){// Any existing children that weren't consumed above were deleted. We need
// to add them to the deletion list.
existingChildren.forEach(function(child){return deleteChild(returnFiber,child);});}return resultingFirstChild;}function reconcileSingleTextNode(returnFiber,currentFirstChild,textContent,priority){// There's no need to check for keys on text nodes since we don't have a
// way to define them.
if(currentFirstChild!==null&&currentFirstChild.tag===HostText$5){// We already have an existing node so let's just update it and delete
// the rest.
deleteRemainingChildren(returnFiber,currentFirstChild.sibling);var existing=useFiber(currentFirstChild,priority);existing.pendingProps=textContent;existing['return']=returnFiber;return existing;}// The existing first child is not a text node so we need to create one
// and delete the existing ones.
deleteRemainingChildren(returnFiber,currentFirstChild);var created=createFiberFromText$1(textContent,returnFiber.internalContextTag,priority);created['return']=returnFiber;return created;}function reconcileSingleElement(returnFiber,currentFirstChild,element,priority){var key=element.key;var child=currentFirstChild;while(child!==null){// TODO: If key === null and child.key === null, then this only applies to
// the first item in the list.
if(child.key===key){if(child.type===element.type){deleteRemainingChildren(returnFiber,child.sibling);var existing=useFiber(child,priority);existing.ref=coerceRef(child,element);existing.pendingProps=element.props;existing['return']=returnFiber;{existing._debugSource=element._source;existing._debugOwner=element._owner;}return existing;}else{deleteRemainingChildren(returnFiber,child);break;}}else{deleteChild(returnFiber,child);}child=child.sibling;}var created=createFiberFromElement$1(element,returnFiber.internalContextTag,priority);created.ref=coerceRef(currentFirstChild,element);created['return']=returnFiber;return created;}function reconcileSingleCoroutine(returnFiber,currentFirstChild,coroutine,priority){var key=coroutine.key;var child=currentFirstChild;while(child!==null){// TODO: If key === null and child.key === null, then this only applies to
// the first item in the list.
if(child.key===key){if(child.tag===CoroutineComponent$2){deleteRemainingChildren(returnFiber,child.sibling);var existing=useFiber(child,priority);existing.pendingProps=coroutine;existing['return']=returnFiber;return existing;}else{deleteRemainingChildren(returnFiber,child);break;}}else{deleteChild(returnFiber,child);}child=child.sibling;}var created=createFiberFromCoroutine$1(coroutine,returnFiber.internalContextTag,priority);created['return']=returnFiber;return created;}function reconcileSingleYield(returnFiber,currentFirstChild,yieldNode,priority){// There's no need to check for keys on yields since they're stateless.
var child=currentFirstChild;if(child!==null){if(child.tag===YieldComponent$3){deleteRemainingChildren(returnFiber,child.sibling);var existing=useFiber(child,priority);existing.type=yieldNode.value;existing['return']=returnFiber;return existing;}else{deleteRemainingChildren(returnFiber,child);}}var created=createFiberFromYield$1(yieldNode,returnFiber.internalContextTag,priority);created.type=yieldNode.value;created['return']=returnFiber;return created;}function reconcileSinglePortal(returnFiber,currentFirstChild,portal,priority){var key=portal.key;var child=currentFirstChild;while(child!==null){// TODO: If key === null and child.key === null, then this only applies to
// the first item in the list.
if(child.key===key){if(child.tag===HostPortal$5&&child.stateNode.containerInfo===portal.containerInfo&&child.stateNode.implementation===portal.implementation){deleteRemainingChildren(returnFiber,child.sibling);var existing=useFiber(child,priority);existing.pendingProps=portal.children||[];existing['return']=returnFiber;return existing;}else{deleteRemainingChildren(returnFiber,child);break;}}else{deleteChild(returnFiber,child);}child=child.sibling;}var created=createFiberFromPortal$1(portal,returnFiber.internalContextTag,priority);created['return']=returnFiber;return created;}// This API will tag the children with the side-effect of the reconciliation
// itself. They will be added to the side-effect list as we pass through the
// children and the parent.
function reconcileChildFibers(returnFiber,currentFirstChild,newChild,priority){// This function is not recursive.
// If the top level item is an array, we treat it as a set of children,
// not as a fragment. Nested arrays on the other hand will be treated as
// fragment nodes. Recursion happens at the normal flow.
// Handle object types
var isObject=(typeof newChild==='undefined'?'undefined':_typeof(newChild))==='object'&&newChild!==null;if(isObject){// Support only the subset of return types that Stack supports. Treat
// everything else as empty, but log a warning.
switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:return placeSingleChild(reconcileSingleElement(returnFiber,currentFirstChild,newChild,priority));case REACT_COROUTINE_TYPE:return placeSingleChild(reconcileSingleCoroutine(returnFiber,currentFirstChild,newChild,priority));case REACT_YIELD_TYPE:return placeSingleChild(reconcileSingleYield(returnFiber,currentFirstChild,newChild,priority));case REACT_PORTAL_TYPE:return placeSingleChild(reconcileSinglePortal(returnFiber,currentFirstChild,newChild,priority));}}if(typeof newChild==='string'||typeof newChild==='number'){return placeSingleChild(reconcileSingleTextNode(returnFiber,currentFirstChild,''+newChild,priority));}if(isArray(newChild)){return reconcileChildrenArray(returnFiber,currentFirstChild,newChild,priority);}if(getIteratorFn(newChild)){return reconcileChildrenIterator(returnFiber,currentFirstChild,newChild,priority);}if(isObject){throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType();}}if(typeof newChild==='undefined'){// If the new child is undefined, and the return fiber is a composite
// component, throw an error. If Fiber return types are disabled,
// we already threw above.
switch(returnFiber.tag){case ClassComponent$7:{{var instance=returnFiber.stateNode;if(instance.render._isMockFunction){// We allow auto-mocks to proceed as if they're returning null.
break;}}}// Intentionally fall through to the next case, which handles both
// functions and classes
// eslint-disable-next-lined no-fallthrough
case FunctionalComponent$2:{var Component=returnFiber.type;invariant(false,'%s(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.',Component.displayName||Component.name||'Component');}}}// Remaining cases are all treated as empty.
return deleteRemainingChildren(returnFiber,currentFirstChild);}return reconcileChildFibers;}var reconcileChildFibers$1=ChildReconciler(true,true);var reconcileChildFibersInPlace$1=ChildReconciler(false,true);var mountChildFibersInPlace$1=ChildReconciler(false,false);var cloneChildFibers$1=function cloneChildFibers$1(current,workInProgress){!(current===null||workInProgress.child===current.child)?invariant(false,'Resuming work not yet implemented.'):void 0;if(workInProgress.child===null){return;}var currentChild=workInProgress.child;var newChild=createWorkInProgress$2(currentChild,currentChild.pendingWorkPriority);// TODO: Pass this as an argument, since it's easy to forget.
newChild.pendingProps=currentChild.pendingProps;workInProgress.child=newChild;newChild['return']=workInProgress;while(currentChild.sibling!==null){currentChild=currentChild.sibling;newChild=newChild.sibling=createWorkInProgress$2(currentChild,currentChild.pendingWorkPriority);newChild.pendingProps=currentChild.pendingProps;newChild['return']=workInProgress;}newChild.sibling=null;};var ReactChildFiber={reconcileChildFibers:reconcileChildFibers$1,reconcileChildFibersInPlace:reconcileChildFibersInPlace$1,mountChildFibersInPlace:mountChildFibersInPlace$1,cloneChildFibers:cloneChildFibers$1};var Update$1=ReactTypeOfSideEffect.Update;var AsyncUpdates$1=ReactTypeOfInternalContext.AsyncUpdates;var cacheContext$1=ReactFiberContext.cacheContext;var getMaskedContext$2=ReactFiberContext.getMaskedContext;var getUnmaskedContext$2=ReactFiberContext.getUnmaskedContext;var isContextConsumer$1=ReactFiberContext.isContextConsumer;var addUpdate$1=ReactFiberUpdateQueue.addUpdate;var addReplaceUpdate$1=ReactFiberUpdateQueue.addReplaceUpdate;var addForceUpdate$1=ReactFiberUpdateQueue.addForceUpdate;var beginUpdateQueue$2=ReactFiberUpdateQueue.beginUpdateQueue;var _require5=ReactFiberContext;var hasContextChanged$2=_require5.hasContextChanged;var isMounted$1=ReactFiberTreeReflection.isMounted;var fakeInternalInstance={};var isArray$1=Array.isArray;{var _require7$1=ReactDebugFiberPerf_1,startPhaseTimer$1=_require7$1.startPhaseTimer,stopPhaseTimer$1=_require7$1.stopPhaseTimer;var warning$25=require$$0;var warnOnInvalidCallback=function warnOnInvalidCallback(callback,callerName){warning$25(callback===null||typeof callback==='function','%s(...): Expected the last optional `callback` argument to be a '+'function. Instead received: %s.',callerName,callback);};// This is so gross but it's at least non-critical and can be removed if
// it causes problems. This is meant to give a nicer error message for
// ReactDOM15.unstable_renderSubtreeIntoContainer(reactDOM16Component,
// ...)) which otherwise throws a "_processChildContext is not a function"
// exception.
Object.defineProperty(fakeInternalInstance,'_processChildContext',{enumerable:false,value:function value(){invariant(false,'_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn\'t supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).');}});Object.freeze(fakeInternalInstance);}var ReactFiberClassComponent=function ReactFiberClassComponent(scheduleUpdate,getPriorityContext,memoizeProps,memoizeState){// Class component state updater
var updater={isMounted:isMounted$1,enqueueSetState:function enqueueSetState(instance,partialState,callback){var fiber=ReactInstanceMap_1.get(instance);var priorityLevel=getPriorityContext(fiber,false);callback=callback===undefined?null:callback;{warnOnInvalidCallback(callback,'setState');}addUpdate$1(fiber,partialState,callback,priorityLevel);scheduleUpdate(fiber,priorityLevel);},enqueueReplaceState:function enqueueReplaceState(instance,state,callback){var fiber=ReactInstanceMap_1.get(instance);var priorityLevel=getPriorityContext(fiber,false);callback=callback===undefined?null:callback;{warnOnInvalidCallback(callback,'replaceState');}addReplaceUpdate$1(fiber,state,callback,priorityLevel);scheduleUpdate(fiber,priorityLevel);},enqueueForceUpdate:function enqueueForceUpdate(instance,callback){var fiber=ReactInstanceMap_1.get(instance);var priorityLevel=getPriorityContext(fiber,false);callback=callback===undefined?null:callback;{warnOnInvalidCallback(callback,'forceUpdate');}addForceUpdate$1(fiber,callback,priorityLevel);scheduleUpdate(fiber,priorityLevel);}};function checkShouldComponentUpdate(workInProgress,oldProps,newProps,oldState,newState,newContext){if(oldProps===null||workInProgress.updateQueue!==null&&workInProgress.updateQueue.hasForceUpdate){// If the workInProgress already has an Update effect, return true
return true;}var instance=workInProgress.stateNode;var type=workInProgress.type;if(typeof instance.shouldComponentUpdate==='function'){{startPhaseTimer$1(workInProgress,'shouldComponentUpdate');}var shouldUpdate=instance.shouldComponentUpdate(newProps,newState,newContext);{stopPhaseTimer$1();}{warning$25(shouldUpdate!==undefined,'%s.shouldComponentUpdate(): Returned undefined instead of a '+'boolean value. Make sure to return true or false.',getComponentName_1(workInProgress)||'Unknown');}return shouldUpdate;}if(type.prototype&&type.prototype.isPureReactComponent){return!shallowEqual(oldProps,newProps)||!shallowEqual(oldState,newState);}return true;}function checkClassInstance(workInProgress){var instance=workInProgress.stateNode;var type=workInProgress.type;{var name=getComponentName_1(workInProgress);var renderPresent=instance.render;warning$25(renderPresent,'%s(...): No `render` method found on the returned component '+'instance: you may have forgotten to define `render`.',name);var noGetInitialStateOnES6=!instance.getInitialState||instance.getInitialState.isReactClassApproved||instance.state;warning$25(noGetInitialStateOnES6,'getInitialState was defined on %s, a plain JavaScript class. '+'This is only supported for classes created using React.createClass. '+'Did you mean to define a state property instead?',name);var noGetDefaultPropsOnES6=!instance.getDefaultProps||instance.getDefaultProps.isReactClassApproved;warning$25(noGetDefaultPropsOnES6,'getDefaultProps was defined on %s, a plain JavaScript class. '+'This is only supported for classes created using React.createClass. '+'Use a static property to define defaultProps instead.',name);var noInstancePropTypes=!instance.propTypes;warning$25(noInstancePropTypes,'propTypes was defined as an instance property on %s. Use a static '+'property to define propTypes instead.',name);var noInstanceContextTypes=!instance.contextTypes;warning$25(noInstanceContextTypes,'contextTypes was defined as an instance property on %s. Use a static '+'property to define contextTypes instead.',name);var noComponentShouldUpdate=typeof instance.componentShouldUpdate!=='function';warning$25(noComponentShouldUpdate,'%s has a method called '+'componentShouldUpdate(). Did you mean shouldComponentUpdate()? '+'The name is phrased as a question because the function is '+'expected to return a value.',name);if(type.prototype&&type.prototype.isPureReactComponent&&typeof instance.shouldComponentUpdate!=='undefined'){warning$25(false,'%s has a method called shouldComponentUpdate(). '+'shouldComponentUpdate should not be used when extending React.PureComponent. '+'Please extend React.Component if shouldComponentUpdate is used.',getComponentName_1(workInProgress)||'A pure component');}var noComponentDidUnmount=typeof instance.componentDidUnmount!=='function';warning$25(noComponentDidUnmount,'%s has a method called '+'componentDidUnmount(). But there is no such lifecycle method. '+'Did you mean componentWillUnmount()?',name);var noComponentWillRecieveProps=typeof instance.componentWillRecieveProps!=='function';warning$25(noComponentWillRecieveProps,'%s has a method called '+'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',name);var hasMutatedProps=instance.props!==workInProgress.pendingProps;warning$25(instance.props===undefined||!hasMutatedProps,'%s(...): When calling super() in `%s`, make sure to pass '+"up the same props that your component's constructor was passed.",name,name);var noInstanceDefaultProps=!instance.defaultProps;warning$25(noInstanceDefaultProps,'Setting defaultProps as an instance property on %s is not supported and will be ignored.'+' Instead, define defaultProps as a static property on %s.',name,name);}var state=instance.state;if(state&&((typeof state==='undefined'?'undefined':_typeof(state))!=='object'||isArray$1(state))){invariant(false,'%s.state: must be set to an object or null',getComponentName_1(workInProgress));}if(typeof instance.getChildContext==='function'){!(_typeof(workInProgress.type.childContextTypes)==='object')?invariant(false,'%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().',getComponentName_1(workInProgress)):void 0;}}function resetInputPointers(workInProgress,instance){instance.props=workInProgress.memoizedProps;instance.state=workInProgress.memoizedState;}function adoptClassInstance(workInProgress,instance){instance.updater=updater;workInProgress.stateNode=instance;// The instance needs access to the fiber so that it can schedule updates
ReactInstanceMap_1.set(instance,workInProgress);{instance._reactInternalInstance=fakeInternalInstance;}}function constructClassInstance(workInProgress,props){var ctor=workInProgress.type;var unmaskedContext=getUnmaskedContext$2(workInProgress);var needsContext=isContextConsumer$1(workInProgress);var context=needsContext?getMaskedContext$2(workInProgress,unmaskedContext):emptyObject;var instance=new ctor(props,context);adoptClassInstance(workInProgress,instance);// Cache unmasked context so we can avoid recreating masked context unless necessary.
// ReactFiberContext usually updates this cache but can't for newly-created instances.
if(needsContext){cacheContext$1(workInProgress,unmaskedContext,context);}return instance;}function callComponentWillMount(workInProgress,instance){{startPhaseTimer$1(workInProgress,'componentWillMount');}var oldState=instance.state;instance.componentWillMount();{stopPhaseTimer$1();}if(oldState!==instance.state){{warning$25(false,'%s.componentWillMount(): Assigning directly to this.state is '+"deprecated (except inside a component's "+'constructor). Use setState instead.',getComponentName_1(workInProgress));}updater.enqueueReplaceState(instance,instance.state,null);}}function callComponentWillReceiveProps(workInProgress,instance,newProps,newContext){{startPhaseTimer$1(workInProgress,'componentWillReceiveProps');}var oldState=instance.state;instance.componentWillReceiveProps(newProps,newContext);{stopPhaseTimer$1();}if(instance.state!==oldState){{warning$25(false,'%s.componentWillReceiveProps(): Assigning directly to '+"this.state is deprecated (except inside a component's "+'constructor). Use setState instead.',getComponentName_1(workInProgress));}updater.enqueueReplaceState(instance,instance.state,null);}}// Invokes the mount life-cycles on a previously never rendered instance.
function mountClassInstance(workInProgress,priorityLevel){var current=workInProgress.alternate;{checkClassInstance(workInProgress);}var instance=workInProgress.stateNode;var state=instance.state||null;var props=workInProgress.pendingProps;!props?invariant(false,'There must be pending props for an initial mount. This error is likely caused by a bug in React. Please file an issue.'):void 0;var unmaskedContext=getUnmaskedContext$2(workInProgress);instance.props=props;instance.state=state;instance.refs=emptyObject;instance.context=getMaskedContext$2(workInProgress,unmaskedContext);if(ReactFeatureFlags_1.enableAsyncSubtreeAPI&&workInProgress.type!=null&&workInProgress.type.prototype!=null&&workInProgress.type.prototype.unstable_isAsyncReactComponent===true){workInProgress.internalContextTag|=AsyncUpdates$1;}if(typeof instance.componentWillMount==='function'){callComponentWillMount(workInProgress,instance);// If we had additional state updates during this life-cycle, let's
// process them now.
var updateQueue=workInProgress.updateQueue;if(updateQueue!==null){instance.state=beginUpdateQueue$2(current,workInProgress,updateQueue,instance,state,props,priorityLevel);}}if(typeof instance.componentDidMount==='function'){workInProgress.effectTag|=Update$1;}}// Called on a preexisting class instance. Returns false if a resumed render
// could be reused.
// function resumeMountClassInstance(
//   workInProgress: Fiber,
//   priorityLevel: PriorityLevel,
// ): boolean {
//   const instance = workInProgress.stateNode;
//   resetInputPointers(workInProgress, instance);
//   let newState = workInProgress.memoizedState;
//   let newProps = workInProgress.pendingProps;
//   if (!newProps) {
//     // If there isn't any new props, then we'll reuse the memoized props.
//     // This could be from already completed work.
//     newProps = workInProgress.memoizedProps;
//     invariant(
//       newProps != null,
//       'There should always be pending or memoized props. This error is ' +
//         'likely caused by a bug in React. Please file an issue.',
//     );
//   }
//   const newUnmaskedContext = getUnmaskedContext(workInProgress);
//   const newContext = getMaskedContext(workInProgress, newUnmaskedContext);
//   const oldContext = instance.context;
//   const oldProps = workInProgress.memoizedProps;
//   if (
//     typeof instance.componentWillReceiveProps === 'function' &&
//     (oldProps !== newProps || oldContext !== newContext)
//   ) {
//     callComponentWillReceiveProps(
//       workInProgress,
//       instance,
//       newProps,
//       newContext,
//     );
//   }
//   // Process the update queue before calling shouldComponentUpdate
//   const updateQueue = workInProgress.updateQueue;
//   if (updateQueue !== null) {
//     newState = beginUpdateQueue(
//       workInProgress,
//       updateQueue,
//       instance,
//       newState,
//       newProps,
//       priorityLevel,
//     );
//   }
//   // TODO: Should we deal with a setState that happened after the last
//   // componentWillMount and before this componentWillMount? Probably
//   // unsupported anyway.
//   if (
//     !checkShouldComponentUpdate(
//       workInProgress,
//       workInProgress.memoizedProps,
//       newProps,
//       workInProgress.memoizedState,
//       newState,
//       newContext,
//     )
//   ) {
//     // Update the existing instance's state, props, and context pointers even
//     // though we're bailing out.
//     instance.props = newProps;
//     instance.state = newState;
//     instance.context = newContext;
//     return false;
//   }
//   // Update the input pointers now so that they are correct when we call
//   // componentWillMount
//   instance.props = newProps;
//   instance.state = newState;
//   instance.context = newContext;
//   if (typeof instance.componentWillMount === 'function') {
//     callComponentWillMount(workInProgress, instance);
//     // componentWillMount may have called setState. Process the update queue.
//     const newUpdateQueue = workInProgress.updateQueue;
//     if (newUpdateQueue !== null) {
//       newState = beginUpdateQueue(
//         workInProgress,
//         newUpdateQueue,
//         instance,
//         newState,
//         newProps,
//         priorityLevel,
//       );
//     }
//   }
//   if (typeof instance.componentDidMount === 'function') {
//     workInProgress.effectTag |= Update;
//   }
//   instance.state = newState;
//   return true;
// }
// Invokes the update life-cycles and returns false if it shouldn't rerender.
function updateClassInstance(current,workInProgress,priorityLevel){var instance=workInProgress.stateNode;resetInputPointers(workInProgress,instance);var oldProps=workInProgress.memoizedProps;var newProps=workInProgress.pendingProps;if(!newProps){// If there aren't any new props, then we'll reuse the memoized props.
// This could be from already completed work.
newProps=oldProps;!(newProps!=null)?invariant(false,'There should always be pending or memoized props. This error is likely caused by a bug in React. Please file an issue.'):void 0;}var oldContext=instance.context;var newUnmaskedContext=getUnmaskedContext$2(workInProgress);var newContext=getMaskedContext$2(workInProgress,newUnmaskedContext);// Note: During these life-cycles, instance.props/instance.state are what
// ever the previously attempted to render - not the "current". However,
// during componentDidUpdate we pass the "current" props.
if(typeof instance.componentWillReceiveProps==='function'&&(oldProps!==newProps||oldContext!==newContext)){callComponentWillReceiveProps(workInProgress,instance,newProps,newContext);}// Compute the next state using the memoized state and the update queue.
var oldState=workInProgress.memoizedState;// TODO: Previous state can be null.
var newState=void 0;if(workInProgress.updateQueue!==null){newState=beginUpdateQueue$2(current,workInProgress,workInProgress.updateQueue,instance,oldState,newProps,priorityLevel);}else{newState=oldState;}if(oldProps===newProps&&oldState===newState&&!hasContextChanged$2()&&!(workInProgress.updateQueue!==null&&workInProgress.updateQueue.hasForceUpdate)){// If an update was already in progress, we should schedule an Update
// effect even though we're bailing out, so that cWU/cDU are called.
if(typeof instance.componentDidUpdate==='function'){if(oldProps!==current.memoizedProps||oldState!==current.memoizedState){workInProgress.effectTag|=Update$1;}}return false;}var shouldUpdate=checkShouldComponentUpdate(workInProgress,oldProps,newProps,oldState,newState,newContext);if(shouldUpdate){if(typeof instance.componentWillUpdate==='function'){{startPhaseTimer$1(workInProgress,'componentWillUpdate');}instance.componentWillUpdate(newProps,newState,newContext);{stopPhaseTimer$1();}}if(typeof instance.componentDidUpdate==='function'){workInProgress.effectTag|=Update$1;}}else{// If an update was already in progress, we should schedule an Update
// effect even though we're bailing out, so that cWU/cDU are called.
if(typeof instance.componentDidUpdate==='function'){if(oldProps!==current.memoizedProps||oldState!==current.memoizedState){workInProgress.effectTag|=Update$1;}}// If shouldComponentUpdate returned false, we should still update the
// memoized props/state to indicate that this work can be reused.
memoizeProps(workInProgress,newProps);memoizeState(workInProgress,newState);}// Update the existing instance's state, props, and context pointers even
// if shouldComponentUpdate returns false.
instance.props=newProps;instance.state=newState;instance.context=newContext;return shouldUpdate;}return{adoptClassInstance:adoptClassInstance,constructClassInstance:constructClassInstance,mountClassInstance:mountClassInstance,// resumeMountClassInstance,
updateClassInstance:updateClassInstance};};var mountChildFibersInPlace=ReactChildFiber.mountChildFibersInPlace;var reconcileChildFibers=ReactChildFiber.reconcileChildFibers;var reconcileChildFibersInPlace=ReactChildFiber.reconcileChildFibersInPlace;var cloneChildFibers=ReactChildFiber.cloneChildFibers;var beginUpdateQueue$1=ReactFiberUpdateQueue.beginUpdateQueue;var getMaskedContext$1=ReactFiberContext.getMaskedContext;var getUnmaskedContext$1=ReactFiberContext.getUnmaskedContext;var hasContextChanged$1=ReactFiberContext.hasContextChanged;var pushContextProvider$1=ReactFiberContext.pushContextProvider;var pushTopLevelContextObject$1=ReactFiberContext.pushTopLevelContextObject;var invalidateContextProvider$1=ReactFiberContext.invalidateContextProvider;var IndeterminateComponent$2=ReactTypeOfWork.IndeterminateComponent;var FunctionalComponent$1=ReactTypeOfWork.FunctionalComponent;var ClassComponent$6=ReactTypeOfWork.ClassComponent;var HostRoot$7=ReactTypeOfWork.HostRoot;var HostComponent$7=ReactTypeOfWork.HostComponent;var HostText$4=ReactTypeOfWork.HostText;var HostPortal$4=ReactTypeOfWork.HostPortal;var CoroutineComponent$1=ReactTypeOfWork.CoroutineComponent;var CoroutineHandlerPhase=ReactTypeOfWork.CoroutineHandlerPhase;var YieldComponent$2=ReactTypeOfWork.YieldComponent;var Fragment$2=ReactTypeOfWork.Fragment;var NoWork$3=ReactPriorityLevel.NoWork;var OffscreenPriority$1=ReactPriorityLevel.OffscreenPriority;var PerformedWork$1=ReactTypeOfSideEffect.PerformedWork;var Placement$2=ReactTypeOfSideEffect.Placement;var ContentReset$1=ReactTypeOfSideEffect.ContentReset;var Err$1=ReactTypeOfSideEffect.Err;var Ref$1=ReactTypeOfSideEffect.Ref;var ReactCurrentOwner$2=ReactGlobalSharedState_1.ReactCurrentOwner;{var ReactDebugCurrentFiber$4=ReactDebugCurrentFiber_1;var _require7=ReactDebugFiberPerf_1,cancelWorkTimer=_require7.cancelWorkTimer;var warning$23=require$$0;var warnedAboutStatelessRefs={};}var ReactFiberBeginWork=function ReactFiberBeginWork(config,hostContext,hydrationContext,scheduleUpdate,getPriorityContext){var shouldSetTextContent=config.shouldSetTextContent,useSyncScheduling=config.useSyncScheduling,shouldDeprioritizeSubtree=config.shouldDeprioritizeSubtree;var pushHostContext=hostContext.pushHostContext,pushHostContainer=hostContext.pushHostContainer;var enterHydrationState=hydrationContext.enterHydrationState,resetHydrationState=hydrationContext.resetHydrationState,tryToClaimNextHydratableInstance=hydrationContext.tryToClaimNextHydratableInstance;var _ReactFiberClassCompo=ReactFiberClassComponent(scheduleUpdate,getPriorityContext,memoizeProps,memoizeState),adoptClassInstance=_ReactFiberClassCompo.adoptClassInstance,constructClassInstance=_ReactFiberClassCompo.constructClassInstance,mountClassInstance=_ReactFiberClassCompo.mountClassInstance,updateClassInstance=_ReactFiberClassCompo.updateClassInstance;function reconcileChildren(current,workInProgress,nextChildren){var priorityLevel=workInProgress.pendingWorkPriority;reconcileChildrenAtPriority(current,workInProgress,nextChildren,priorityLevel);}function reconcileChildrenAtPriority(current,workInProgress,nextChildren,priorityLevel){if(current===null){// If this is a fresh new component that hasn't been rendered yet, we
// won't update its child set by applying minimal side-effects. Instead,
// we will add them all to the child before it gets rendered. That means
// we can optimize this reconciliation pass by not tracking side-effects.
workInProgress.child=mountChildFibersInPlace(workInProgress,workInProgress.child,nextChildren,priorityLevel);}else if(current.child===workInProgress.child){// If the current child is the same as the work in progress, it means that
// we haven't yet started any work on these children. Therefore, we use
// the clone algorithm to create a copy of all the current children.
// If we had any progressed work already, that is invalid at this point so
// let's throw it out.
workInProgress.child=reconcileChildFibers(workInProgress,workInProgress.child,nextChildren,priorityLevel);}else{// If, on the other hand, it is already using a clone, that means we've
// already begun some work on this tree and we can continue where we left
// off by reconciling against the existing children.
workInProgress.child=reconcileChildFibersInPlace(workInProgress,workInProgress.child,nextChildren,priorityLevel);}}function updateFragment(current,workInProgress){var nextChildren=workInProgress.pendingProps;if(hasContextChanged$1()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
if(nextChildren===null){nextChildren=workInProgress.memoizedProps;}}else if(nextChildren===null||workInProgress.memoizedProps===nextChildren){return bailoutOnAlreadyFinishedWork(current,workInProgress);}reconcileChildren(current,workInProgress,nextChildren);memoizeProps(workInProgress,nextChildren);return workInProgress.child;}function markRef(current,workInProgress){var ref=workInProgress.ref;if(ref!==null&&(!current||current.ref!==ref)){// Schedule a Ref effect
workInProgress.effectTag|=Ref$1;}}function updateFunctionalComponent(current,workInProgress){var fn=workInProgress.type;var nextProps=workInProgress.pendingProps;var memoizedProps=workInProgress.memoizedProps;if(hasContextChanged$1()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
if(nextProps===null){nextProps=memoizedProps;}}else{if(nextProps===null||memoizedProps===nextProps){return bailoutOnAlreadyFinishedWork(current,workInProgress);}// TODO: consider bringing fn.shouldComponentUpdate() back.
// It used to be here.
}var unmaskedContext=getUnmaskedContext$1(workInProgress);var context=getMaskedContext$1(workInProgress,unmaskedContext);var nextChildren;{ReactCurrentOwner$2.current=workInProgress;ReactDebugCurrentFiber$4.setCurrentFiber(workInProgress,'render');nextChildren=fn(nextProps,context);ReactDebugCurrentFiber$4.setCurrentFiber(workInProgress,null);}// React DevTools reads this flag.
workInProgress.effectTag|=PerformedWork$1;reconcileChildren(current,workInProgress,nextChildren);memoizeProps(workInProgress,nextProps);return workInProgress.child;}function updateClassComponent(current,workInProgress,priorityLevel){// Push context providers early to prevent context stack mismatches.
// During mounting we don't know the child context yet as the instance doesn't exist.
// We will invalidate the child context in finishClassComponent() right after rendering.
var hasContext=pushContextProvider$1(workInProgress);var shouldUpdate=void 0;if(current===null){if(!workInProgress.stateNode){// In the initial pass we might need to construct the instance.
constructClassInstance(workInProgress,workInProgress.pendingProps);mountClassInstance(workInProgress,priorityLevel);shouldUpdate=true;}else{invariant(false,'Resuming work not yet implemented.');// In a resume, we'll already have an instance we can reuse.
// shouldUpdate = resumeMountClassInstance(workInProgress, priorityLevel);
}}else{shouldUpdate=updateClassInstance(current,workInProgress,priorityLevel);}return finishClassComponent(current,workInProgress,shouldUpdate,hasContext);}function finishClassComponent(current,workInProgress,shouldUpdate,hasContext){// Refs should update even if shouldComponentUpdate returns false
markRef(current,workInProgress);if(!shouldUpdate){// Context providers should defer to sCU for rendering
if(hasContext){invalidateContextProvider$1(workInProgress,false);}return bailoutOnAlreadyFinishedWork(current,workInProgress);}var instance=workInProgress.stateNode;// Rerender
ReactCurrentOwner$2.current=workInProgress;var nextChildren=void 0;{ReactDebugCurrentFiber$4.setCurrentFiber(workInProgress,'render');nextChildren=instance.render();ReactDebugCurrentFiber$4.setCurrentFiber(workInProgress,null);}// React DevTools reads this flag.
workInProgress.effectTag|=PerformedWork$1;reconcileChildren(current,workInProgress,nextChildren);// Memoize props and state using the values we just used to render.
// TODO: Restructure so we never read values from the instance.
memoizeState(workInProgress,instance.state);memoizeProps(workInProgress,instance.props);// The context might have changed so we need to recalculate it.
if(hasContext){invalidateContextProvider$1(workInProgress,true);}return workInProgress.child;}function pushHostRootContext(workInProgress){var root=workInProgress.stateNode;if(root.pendingContext){pushTopLevelContextObject$1(workInProgress,root.pendingContext,root.pendingContext!==root.context);}else if(root.context){// Should always be set
pushTopLevelContextObject$1(workInProgress,root.context,false);}pushHostContainer(workInProgress,root.containerInfo);}function updateHostRoot(current,workInProgress,priorityLevel){pushHostRootContext(workInProgress);var updateQueue=workInProgress.updateQueue;if(updateQueue!==null){var prevState=workInProgress.memoizedState;var state=beginUpdateQueue$1(current,workInProgress,updateQueue,null,prevState,null,priorityLevel);if(prevState===state){// If the state is the same as before, that's a bailout because we had
// no work matching this priority.
resetHydrationState();return bailoutOnAlreadyFinishedWork(current,workInProgress);}var element=state.element;if((current===null||current.child===null)&&enterHydrationState(workInProgress)){// If we don't have any current children this might be the first pass.
// We always try to hydrate. If this isn't a hydration pass there won't
// be any children to hydrate which is effectively the same thing as
// not hydrating.
// This is a bit of a hack. We track the host root as a placement to
// know that we're currently in a mounting state. That way isMounted
// works as expected. We must reset this before committing.
// TODO: Delete this when we delete isMounted and findDOMNode.
workInProgress.effectTag|=Placement$2;// Ensure that children mount into this root without tracking
// side-effects. This ensures that we don't store Placement effects on
// nodes that will be hydrated.
workInProgress.child=mountChildFibersInPlace(workInProgress,workInProgress.child,element,priorityLevel);}else{// Otherwise reset hydration state in case we aborted and resumed another
// root.
resetHydrationState();reconcileChildren(current,workInProgress,element);}memoizeState(workInProgress,state);return workInProgress.child;}resetHydrationState();// If there is no update queue, that's a bailout because the root has no props.
return bailoutOnAlreadyFinishedWork(current,workInProgress);}function updateHostComponent(current,workInProgress,renderPriority){pushHostContext(workInProgress);if(current===null){tryToClaimNextHydratableInstance(workInProgress);}var type=workInProgress.type;var memoizedProps=workInProgress.memoizedProps;var nextProps=workInProgress.pendingProps;if(nextProps===null){nextProps=memoizedProps;!(nextProps!==null)?invariant(false,'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.'):void 0;}var prevProps=current!==null?current.memoizedProps:null;if(hasContextChanged$1()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
}else if(nextProps===null||memoizedProps===nextProps){return bailoutOnAlreadyFinishedWork(current,workInProgress);}var nextChildren=nextProps.children;var isDirectTextChild=shouldSetTextContent(type,nextProps);if(isDirectTextChild){// We special case a direct text child of a host node. This is a common
// case. We won't handle it as a reified child. We will instead handle
// this in the host environment that also have access to this prop. That
// avoids allocating another HostText fiber and traversing it.
nextChildren=null;}else if(prevProps&&shouldSetTextContent(type,prevProps)){// If we're switching from a direct text child to a normal child, or to
// empty, we need to schedule the text content to be reset.
workInProgress.effectTag|=ContentReset$1;}markRef(current,workInProgress);// Check the host config to see if the children are offscreen/hidden.
if(renderPriority!==OffscreenPriority$1&&!useSyncScheduling&&shouldDeprioritizeSubtree(type,nextProps)){// Down-prioritize the children.
workInProgress.pendingWorkPriority=OffscreenPriority$1;// Bailout and come back to this fiber later at OffscreenPriority.
return null;}reconcileChildren(current,workInProgress,nextChildren);memoizeProps(workInProgress,nextProps);return workInProgress.child;}function updateHostText(current,workInProgress){if(current===null){tryToClaimNextHydratableInstance(workInProgress);}var nextProps=workInProgress.pendingProps;if(nextProps===null){nextProps=workInProgress.memoizedProps;}memoizeProps(workInProgress,nextProps);// Nothing to do here. This is terminal. We'll do the completion step
// immediately after.
return null;}function mountIndeterminateComponent(current,workInProgress,priorityLevel){!(current===null)?invariant(false,'An indeterminate component should never have mounted. This error is likely caused by a bug in React. Please file an issue.'):void 0;var fn=workInProgress.type;var props=workInProgress.pendingProps;var unmaskedContext=getUnmaskedContext$1(workInProgress);var context=getMaskedContext$1(workInProgress,unmaskedContext);var value;{ReactCurrentOwner$2.current=workInProgress;value=fn(props,context);}// React DevTools reads this flag.
workInProgress.effectTag|=PerformedWork$1;if((typeof value==='undefined'?'undefined':_typeof(value))==='object'&&value!==null&&typeof value.render==='function'){// Proceed under the assumption that this is a class instance
workInProgress.tag=ClassComponent$6;// Push context providers early to prevent context stack mismatches.
// During mounting we don't know the child context yet as the instance doesn't exist.
// We will invalidate the child context in finishClassComponent() right after rendering.
var hasContext=pushContextProvider$1(workInProgress);adoptClassInstance(workInProgress,value);mountClassInstance(workInProgress,priorityLevel);return finishClassComponent(current,workInProgress,true,hasContext);}else{// Proceed under the assumption that this is a functional component
workInProgress.tag=FunctionalComponent$1;{var Component=workInProgress.type;if(Component){warning$23(!Component.childContextTypes,'%s(...): childContextTypes cannot be defined on a functional component.',Component.displayName||Component.name||'Component');}if(workInProgress.ref!==null){var info='';var ownerName=ReactDebugCurrentFiber$4.getCurrentFiberOwnerName();if(ownerName){info+='\n\nCheck the render method of `'+ownerName+'`.';}var warningKey=ownerName||workInProgress._debugID||'';var debugSource=workInProgress._debugSource;if(debugSource){warningKey=debugSource.fileName+':'+debugSource.lineNumber;}if(!warnedAboutStatelessRefs[warningKey]){warnedAboutStatelessRefs[warningKey]=true;warning$23(false,'Stateless function components cannot be given refs. '+'Attempts to access this ref will fail.%s%s',info,ReactDebugCurrentFiber$4.getCurrentFiberStackAddendum());}}}reconcileChildren(current,workInProgress,value);memoizeProps(workInProgress,props);return workInProgress.child;}}function updateCoroutineComponent(current,workInProgress){var nextCoroutine=workInProgress.pendingProps;if(hasContextChanged$1()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
if(nextCoroutine===null){nextCoroutine=current&&current.memoizedProps;!(nextCoroutine!==null)?invariant(false,'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.'):void 0;}}else if(nextCoroutine===null||workInProgress.memoizedProps===nextCoroutine){nextCoroutine=workInProgress.memoizedProps;// TODO: When bailing out, we might need to return the stateNode instead
// of the child. To check it for work.
// return bailoutOnAlreadyFinishedWork(current, workInProgress);
}var nextChildren=nextCoroutine.children;var priorityLevel=workInProgress.pendingWorkPriority;// The following is a fork of reconcileChildrenAtPriority but using
// stateNode to store the child.
if(current===null){workInProgress.stateNode=mountChildFibersInPlace(workInProgress,workInProgress.stateNode,nextChildren,priorityLevel);}else if(current.child===workInProgress.child){workInProgress.stateNode=reconcileChildFibers(workInProgress,workInProgress.stateNode,nextChildren,priorityLevel);}else{workInProgress.stateNode=reconcileChildFibersInPlace(workInProgress,workInProgress.stateNode,nextChildren,priorityLevel);}memoizeProps(workInProgress,nextCoroutine);// This doesn't take arbitrary time so we could synchronously just begin
// eagerly do the work of workInProgress.child as an optimization.
return workInProgress.stateNode;}function updatePortalComponent(current,workInProgress){pushHostContainer(workInProgress,workInProgress.stateNode.containerInfo);var priorityLevel=workInProgress.pendingWorkPriority;var nextChildren=workInProgress.pendingProps;if(hasContextChanged$1()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
if(nextChildren===null){nextChildren=current&&current.memoizedProps;!(nextChildren!=null)?invariant(false,'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.'):void 0;}}else if(nextChildren===null||workInProgress.memoizedProps===nextChildren){return bailoutOnAlreadyFinishedWork(current,workInProgress);}if(current===null){// Portals are special because we don't append the children during mount
// but at commit. Therefore we need to track insertions which the normal
// flow doesn't do during mount. This doesn't happen at the root because
// the root always starts with a "current" with a null child.
// TODO: Consider unifying this with how the root works.
workInProgress.child=reconcileChildFibersInPlace(workInProgress,workInProgress.child,nextChildren,priorityLevel);memoizeProps(workInProgress,nextChildren);}else{reconcileChildren(current,workInProgress,nextChildren);memoizeProps(workInProgress,nextChildren);}return workInProgress.child;}/*
  function reuseChildrenEffects(returnFiber : Fiber, firstChild : Fiber) {
    let child = firstChild;
    do {
      // Ensure that the first and last effect of the parent corresponds
      // to the children's first and last effect.
      if (!returnFiber.firstEffect) {
        returnFiber.firstEffect = child.firstEffect;
      }
      if (child.lastEffect) {
        if (returnFiber.lastEffect) {
          returnFiber.lastEffect.nextEffect = child.firstEffect;
        }
        returnFiber.lastEffect = child.lastEffect;
      }
    } while (child = child.sibling);
  }
  */function bailoutOnAlreadyFinishedWork(current,workInProgress){{cancelWorkTimer(workInProgress);}// TODO: We should ideally be able to bail out early if the children have no
// more work to do. However, since we don't have a separation of this
// Fiber's priority and its children yet - we don't know without doing lots
// of the same work we do anyway. Once we have that separation we can just
// bail out here if the children has no more work at this priority level.
// if (workInProgress.priorityOfChildren <= priorityLevel) {
//   // If there are side-effects in these children that have not yet been
//   // committed we need to ensure that they get properly transferred up.
//   if (current && current.child !== workInProgress.child) {
//     reuseChildrenEffects(workInProgress, child);
//   }
//   return null;
// }
cloneChildFibers(current,workInProgress);return workInProgress.child;}function bailoutOnLowPriority(current,workInProgress){{cancelWorkTimer(workInProgress);}// TODO: Handle HostComponent tags here as well and call pushHostContext()?
// See PR 8590 discussion for context
switch(workInProgress.tag){case HostRoot$7:pushHostRootContext(workInProgress);break;case ClassComponent$6:pushContextProvider$1(workInProgress);break;case HostPortal$4:pushHostContainer(workInProgress,workInProgress.stateNode.containerInfo);break;}// TODO: What if this is currently in progress?
// How can that happen? How is this not being cloned?
return null;}// TODO: Delete memoizeProps/State and move to reconcile/bailout instead
function memoizeProps(workInProgress,nextProps){workInProgress.memoizedProps=nextProps;}function memoizeState(workInProgress,nextState){workInProgress.memoizedState=nextState;// Don't reset the updateQueue, in case there are pending updates. Resetting
// is handled by beginUpdateQueue.
}function beginWork(current,workInProgress,priorityLevel){if(workInProgress.pendingWorkPriority===NoWork$3||workInProgress.pendingWorkPriority>priorityLevel){return bailoutOnLowPriority(current,workInProgress);}{ReactDebugCurrentFiber$4.setCurrentFiber(workInProgress,null);}switch(workInProgress.tag){case IndeterminateComponent$2:return mountIndeterminateComponent(current,workInProgress,priorityLevel);case FunctionalComponent$1:return updateFunctionalComponent(current,workInProgress);case ClassComponent$6:return updateClassComponent(current,workInProgress,priorityLevel);case HostRoot$7:return updateHostRoot(current,workInProgress,priorityLevel);case HostComponent$7:return updateHostComponent(current,workInProgress,priorityLevel);case HostText$4:return updateHostText(current,workInProgress);case CoroutineHandlerPhase:// This is a restart. Reset the tag to the initial phase.
workInProgress.tag=CoroutineComponent$1;// Intentionally fall through since this is now the same.
case CoroutineComponent$1:return updateCoroutineComponent(current,workInProgress);case YieldComponent$2:// A yield component is just a placeholder, we can just run through the
// next one immediately.
return null;case HostPortal$4:return updatePortalComponent(current,workInProgress);case Fragment$2:return updateFragment(current,workInProgress);default:invariant(false,'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');}}function beginFailedWork(current,workInProgress,priorityLevel){// Push context providers here to avoid a push/pop context mismatch.
switch(workInProgress.tag){case ClassComponent$6:pushContextProvider$1(workInProgress);break;case HostRoot$7:pushHostRootContext(workInProgress);break;default:invariant(false,'Invalid type of work. This error is likely caused by a bug in React. Please file an issue.');}// Add an error effect so we can handle the error during the commit phase
workInProgress.effectTag|=Err$1;// This is a weird case where we do "resume" work — work that failed on
// our first attempt. Because we no longer have a notion of "progressed
// deletions," reset the child to the current child to make sure we delete
// it again. TODO: Find a better way to handle this, perhaps during a more
// general overhaul of error handling.
if(current===null){workInProgress.child=null;}else if(workInProgress.child!==current.child){workInProgress.child=current.child;}if(workInProgress.pendingWorkPriority===NoWork$3||workInProgress.pendingWorkPriority>priorityLevel){return bailoutOnLowPriority(current,workInProgress);}// If we don't bail out, we're going be recomputing our children so we need
// to drop our effect list.
workInProgress.firstEffect=null;workInProgress.lastEffect=null;// Unmount the current children as if the component rendered null
var nextChildren=null;reconcileChildrenAtPriority(current,workInProgress,nextChildren,priorityLevel);if(workInProgress.tag===ClassComponent$6){var instance=workInProgress.stateNode;workInProgress.memoizedProps=instance.props;workInProgress.memoizedState=instance.state;}return workInProgress.child;}return{beginWork:beginWork,beginFailedWork:beginFailedWork};};var reconcileChildFibers$2=ReactChildFiber.reconcileChildFibers;var popContextProvider$2=ReactFiberContext.popContextProvider;var popTopLevelContextObject$1=ReactFiberContext.popTopLevelContextObject;var IndeterminateComponent$3=ReactTypeOfWork.IndeterminateComponent;var FunctionalComponent$3=ReactTypeOfWork.FunctionalComponent;var ClassComponent$8=ReactTypeOfWork.ClassComponent;var HostRoot$8=ReactTypeOfWork.HostRoot;var HostComponent$8=ReactTypeOfWork.HostComponent;var HostText$6=ReactTypeOfWork.HostText;var HostPortal$6=ReactTypeOfWork.HostPortal;var CoroutineComponent$3=ReactTypeOfWork.CoroutineComponent;var CoroutineHandlerPhase$1=ReactTypeOfWork.CoroutineHandlerPhase;var YieldComponent$4=ReactTypeOfWork.YieldComponent;var Fragment$4=ReactTypeOfWork.Fragment;var Placement$4=ReactTypeOfSideEffect.Placement;var Ref$2=ReactTypeOfSideEffect.Ref;var Update$2=ReactTypeOfSideEffect.Update;var OffscreenPriority$2=ReactPriorityLevel.OffscreenPriority;{var ReactDebugCurrentFiber$5=ReactDebugCurrentFiber_1;}var ReactFiberCompleteWork=function ReactFiberCompleteWork(config,hostContext,hydrationContext){var createInstance=config.createInstance,createTextInstance=config.createTextInstance,appendInitialChild=config.appendInitialChild,finalizeInitialChildren=config.finalizeInitialChildren,prepareUpdate=config.prepareUpdate;var getRootHostContainer=hostContext.getRootHostContainer,popHostContext=hostContext.popHostContext,getHostContext=hostContext.getHostContext,popHostContainer=hostContext.popHostContainer;var prepareToHydrateHostInstance=hydrationContext.prepareToHydrateHostInstance,prepareToHydrateHostTextInstance=hydrationContext.prepareToHydrateHostTextInstance,popHydrationState=hydrationContext.popHydrationState;function markUpdate(workInProgress){// Tag the fiber with an update effect. This turns a Placement into
// an UpdateAndPlacement.
workInProgress.effectTag|=Update$2;}function markRef(workInProgress){workInProgress.effectTag|=Ref$2;}function appendAllYields(yields,workInProgress){var node=workInProgress.stateNode;if(node){node['return']=workInProgress;}while(node!==null){if(node.tag===HostComponent$8||node.tag===HostText$6||node.tag===HostPortal$6){invariant(false,'A coroutine cannot have host component children.');}else if(node.tag===YieldComponent$4){yields.push(node.type);}else if(node.child!==null){node.child['return']=node;node=node.child;continue;}while(node.sibling===null){if(node['return']===null||node['return']===workInProgress){return;}node=node['return'];}node.sibling['return']=node['return'];node=node.sibling;}}function moveCoroutineToHandlerPhase(current,workInProgress){var coroutine=workInProgress.memoizedProps;!coroutine?invariant(false,'Should be resolved by now. This error is likely caused by a bug in React. Please file an issue.'):void 0;// First step of the coroutine has completed. Now we need to do the second.
// TODO: It would be nice to have a multi stage coroutine represented by a
// single component, or at least tail call optimize nested ones. Currently
// that requires additional fields that we don't want to add to the fiber.
// So this requires nested handlers.
// Note: This doesn't mutate the alternate node. I don't think it needs to
// since this stage is reset for every pass.
workInProgress.tag=CoroutineHandlerPhase$1;// Build up the yields.
// TODO: Compare this to a generator or opaque helpers like Children.
var yields=[];appendAllYields(yields,workInProgress);var fn=coroutine.handler;var props=coroutine.props;var nextChildren=fn(props,yields);var currentFirstChild=current!==null?current.child:null;// Inherit the priority of the returnFiber.
var priority=workInProgress.pendingWorkPriority;workInProgress.child=reconcileChildFibers$2(workInProgress,currentFirstChild,nextChildren,priority);return workInProgress.child;}function appendAllChildren(parent,workInProgress){// We only have the top Fiber that was created but we need recurse down its
// children to find all the terminal nodes.
var node=workInProgress.child;while(node!==null){if(node.tag===HostComponent$8||node.tag===HostText$6){appendInitialChild(parent,node.stateNode);}else if(node.tag===HostPortal$6){// If we have a portal child, then we don't want to traverse
// down its children. Instead, we'll get insertions from each child in
// the portal directly.
}else if(node.child!==null){node=node.child;continue;}if(node===workInProgress){return;}while(node.sibling===null){if(node['return']===null||node['return']===workInProgress){return;}node=node['return'];}node=node.sibling;}}function completeWork(current,workInProgress,renderPriority){{ReactDebugCurrentFiber$5.setCurrentFiber(workInProgress,null);}// Get the latest props.
var newProps=workInProgress.pendingProps;if(newProps===null){newProps=workInProgress.memoizedProps;}else if(workInProgress.pendingWorkPriority!==OffscreenPriority$2||renderPriority===OffscreenPriority$2){// Reset the pending props, unless this was a down-prioritization.
workInProgress.pendingProps=null;}switch(workInProgress.tag){case FunctionalComponent$3:return null;case ClassComponent$8:{// We are leaving this subtree, so pop context if any.
popContextProvider$2(workInProgress);return null;}case HostRoot$8:{popHostContainer(workInProgress);popTopLevelContextObject$1(workInProgress);var fiberRoot=workInProgress.stateNode;if(fiberRoot.pendingContext){fiberRoot.context=fiberRoot.pendingContext;fiberRoot.pendingContext=null;}if(current===null||current.child===null){// If we hydrated, pop so that we can delete any remaining children
// that weren't hydrated.
popHydrationState(workInProgress);// This resets the hacky state to fix isMounted before committing.
// TODO: Delete this when we delete isMounted and findDOMNode.
workInProgress.effectTag&=~Placement$4;}return null;}case HostComponent$8:{popHostContext(workInProgress);var rootContainerInstance=getRootHostContainer();var type=workInProgress.type;if(current!==null&&workInProgress.stateNode!=null){// If we have an alternate, that means this is an update and we need to
// schedule a side-effect to do the updates.
var oldProps=current.memoizedProps;// If we get updated because one of our children updated, we don't
// have newProps so we'll have to reuse them.
// TODO: Split the update API as separate for the props vs. children.
// Even better would be if children weren't special cased at all tho.
var instance=workInProgress.stateNode;var currentHostContext=getHostContext();var updatePayload=prepareUpdate(instance,type,oldProps,newProps,rootContainerInstance,currentHostContext);// TODO: Type this specific to this type of component.
workInProgress.updateQueue=updatePayload;// If the update payload indicates that there is a change or if there
// is a new ref we mark this as an update.
if(updatePayload){markUpdate(workInProgress);}if(current.ref!==workInProgress.ref){markRef(workInProgress);}}else{if(!newProps){!(workInProgress.stateNode!==null)?invariant(false,'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.'):void 0;// This can happen when we abort work.
return null;}var _currentHostContext=getHostContext();// TODO: Move createInstance to beginWork and keep it on a context
// "stack" as the parent. Then append children as we go in beginWork
// or completeWork depending on we want to add then top->down or
// bottom->up. Top->down is faster in IE11.
var wasHydrated=popHydrationState(workInProgress);if(wasHydrated){// TOOD: Move this and createInstance step into the beginPhase
// to consolidate.
if(prepareToHydrateHostInstance(workInProgress,rootContainerInstance,_currentHostContext)){// If changes to the hydrated node needs to be applied at the
// commit-phase we mark this as such.
markUpdate(workInProgress);}}else{var _instance=createInstance(type,newProps,rootContainerInstance,_currentHostContext,workInProgress);appendAllChildren(_instance,workInProgress);// Certain renderers require commit-time effects for initial mount.
// (eg DOM renderer supports auto-focus for certain elements).
// Make sure such renderers get scheduled for later work.
if(finalizeInitialChildren(_instance,type,newProps,rootContainerInstance)){markUpdate(workInProgress);}workInProgress.stateNode=_instance;}if(workInProgress.ref!==null){// If there is a ref on a host node we need to schedule a callback
markRef(workInProgress);}}return null;}case HostText$6:{var newText=newProps;if(current&&workInProgress.stateNode!=null){var oldText=current.memoizedProps;// If we have an alternate, that means this is an update and we need
// to schedule a side-effect to do the updates.
if(oldText!==newText){markUpdate(workInProgress);}}else{if(typeof newText!=='string'){!(workInProgress.stateNode!==null)?invariant(false,'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.'):void 0;// This can happen when we abort work.
return null;}var _rootContainerInstance=getRootHostContainer();var _currentHostContext2=getHostContext();var _wasHydrated=popHydrationState(workInProgress);if(_wasHydrated){if(prepareToHydrateHostTextInstance(workInProgress)){markUpdate(workInProgress);}}else{workInProgress.stateNode=createTextInstance(newText,_rootContainerInstance,_currentHostContext2,workInProgress);}}return null;}case CoroutineComponent$3:return moveCoroutineToHandlerPhase(current,workInProgress);case CoroutineHandlerPhase$1:// Reset the tag to now be a first phase coroutine.
workInProgress.tag=CoroutineComponent$3;return null;case YieldComponent$4:// Does nothing.
return null;case Fragment$4:return null;case HostPortal$6:// TODO: Only mark this as an update if we have any pending callbacks.
markUpdate(workInProgress);popHostContainer(workInProgress);return null;// Error cases
case IndeterminateComponent$3:invariant(false,'An indeterminate component should have become determinate before completing. This error is likely caused by a bug in React. Please file an issue.');// eslint-disable-next-line no-fallthrough
default:invariant(false,'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');}}return{completeWork:completeWork};};{var warning$26=require$$0;}var onCommitFiberRoot=null;var onCommitFiberUnmount=null;var hasLoggedError=false;function catchErrors(fn){return function(arg){try{return fn(arg);}catch(err){if(true&&!hasLoggedError){hasLoggedError=true;warning$26(false,'React DevTools encountered an error: %s',err);}}};}function injectInternals$1(internals){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__==='undefined'){// No DevTools
return false;}var hook=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!hook.supportsFiber){{warning$26(false,'The installed version of React DevTools is too old and will not work '+'with the current version of React. Please update React DevTools. '+'https://fb.me/react-devtools');}// DevTools exists, even though it doesn't support Fiber.
return true;}try{var rendererID=hook.inject(internals);// We have successfully injected, so now it is safe to set up hooks.
onCommitFiberRoot=catchErrors(function(root){return hook.onCommitFiberRoot(rendererID,root);});onCommitFiberUnmount=catchErrors(function(fiber){return hook.onCommitFiberUnmount(rendererID,fiber);});}catch(err){// Catch all errors because it is unsafe to throw during initialization.
{warning$26(false,'React DevTools encountered an error: %s.',err);}}// DevTools exists
return true;}function onCommitRoot$1(root){if(typeof onCommitFiberRoot==='function'){onCommitFiberRoot(root);}}function onCommitUnmount$1(fiber){if(typeof onCommitFiberUnmount==='function'){onCommitFiberUnmount(fiber);}}var injectInternals_1=injectInternals$1;var onCommitRoot_1=onCommitRoot$1;var onCommitUnmount_1=onCommitUnmount$1;var ReactFiberDevToolsHook={injectInternals:injectInternals_1,onCommitRoot:onCommitRoot_1,onCommitUnmount:onCommitUnmount_1};var ClassComponent$9=ReactTypeOfWork.ClassComponent;var HostRoot$9=ReactTypeOfWork.HostRoot;var HostComponent$9=ReactTypeOfWork.HostComponent;var HostText$7=ReactTypeOfWork.HostText;var HostPortal$7=ReactTypeOfWork.HostPortal;var CoroutineComponent$4=ReactTypeOfWork.CoroutineComponent;var commitCallbacks$1=ReactFiberUpdateQueue.commitCallbacks;var onCommitUnmount=ReactFiberDevToolsHook.onCommitUnmount;var invokeGuardedCallback$2=ReactErrorUtils_1.invokeGuardedCallback;var hasCaughtError$1=ReactErrorUtils_1.hasCaughtError;var clearCaughtError$1=ReactErrorUtils_1.clearCaughtError;var Placement$5=ReactTypeOfSideEffect.Placement;var Update$3=ReactTypeOfSideEffect.Update;var Callback$1=ReactTypeOfSideEffect.Callback;var ContentReset$2=ReactTypeOfSideEffect.ContentReset;{var _require5$1=ReactDebugFiberPerf_1,startPhaseTimer$2=_require5$1.startPhaseTimer,stopPhaseTimer$2=_require5$1.stopPhaseTimer;}var ReactFiberCommitWork=function ReactFiberCommitWork(config,captureError){var commitMount=config.commitMount,commitUpdate=config.commitUpdate,resetTextContent=config.resetTextContent,commitTextUpdate=config.commitTextUpdate,appendChild=config.appendChild,appendChildToContainer=config.appendChildToContainer,insertBefore=config.insertBefore,insertInContainerBefore=config.insertInContainerBefore,removeChild=config.removeChild,removeChildFromContainer=config.removeChildFromContainer,getPublicInstance=config.getPublicInstance;{var callComponentWillUnmountWithTimerInDev=function callComponentWillUnmountWithTimerInDev(current,instance){startPhaseTimer$2(current,'componentWillUnmount');instance.props=current.memoizedProps;instance.state=current.memoizedState;instance.componentWillUnmount();stopPhaseTimer$2();};}// Capture errors so they don't interrupt unmounting.
function safelyCallComponentWillUnmount(current,instance){{invokeGuardedCallback$2(null,callComponentWillUnmountWithTimerInDev,null,current,instance);if(hasCaughtError$1()){var unmountError=clearCaughtError$1();captureError(current,unmountError);}}}function safelyDetachRef(current){var ref=current.ref;if(ref!==null){{invokeGuardedCallback$2(null,ref,null,null);if(hasCaughtError$1()){var refError=clearCaughtError$1();captureError(current,refError);}}}}function getHostParentFiber(fiber){var parent=fiber['return'];while(parent!==null){if(isHostParent(parent)){return parent;}parent=parent['return'];}invariant(false,'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.');}function isHostParent(fiber){return fiber.tag===HostComponent$9||fiber.tag===HostRoot$9||fiber.tag===HostPortal$7;}function getHostSibling(fiber){// We're going to search forward into the tree until we find a sibling host
// node. Unfortunately, if multiple insertions are done in a row we have to
// search past them. This leads to exponential search for the next sibling.
var node=fiber;siblings:while(true){// If we didn't find anything, let's try the next sibling.
while(node.sibling===null){if(node['return']===null||isHostParent(node['return'])){// If we pop out of the root or hit the parent the fiber we are the
// last sibling.
return null;}node=node['return'];}node.sibling['return']=node['return'];node=node.sibling;while(node.tag!==HostComponent$9&&node.tag!==HostText$7){// If it is not host node and, we might have a host node inside it.
// Try to search down until we find one.
if(node.effectTag&Placement$5){// If we don't have a child, try the siblings instead.
continue siblings;}// If we don't have a child, try the siblings instead.
// We also skip portals because they are not part of this host tree.
if(node.child===null||node.tag===HostPortal$7){continue siblings;}else{node.child['return']=node;node=node.child;}}// Check if this host node is stable or about to be placed.
if(!(node.effectTag&Placement$5)){// Found it!
return node.stateNode;}}}function commitPlacement(finishedWork){// Recursively insert all host nodes into the parent.
var parentFiber=getHostParentFiber(finishedWork);var parent=void 0;var isContainer=void 0;switch(parentFiber.tag){case HostComponent$9:parent=parentFiber.stateNode;isContainer=false;break;case HostRoot$9:parent=parentFiber.stateNode.containerInfo;isContainer=true;break;case HostPortal$7:parent=parentFiber.stateNode.containerInfo;isContainer=true;break;default:invariant(false,'Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.');}if(parentFiber.effectTag&ContentReset$2){// Reset the text content of the parent before doing any insertions
resetTextContent(parent);// Clear ContentReset from the effect tag
parentFiber.effectTag&=~ContentReset$2;}var before=getHostSibling(finishedWork);// We only have the top Fiber that was inserted but we need recurse down its
// children to find all the terminal nodes.
var node=finishedWork;while(true){if(node.tag===HostComponent$9||node.tag===HostText$7){if(before){if(isContainer){insertInContainerBefore(parent,node.stateNode,before);}else{insertBefore(parent,node.stateNode,before);}}else{if(isContainer){appendChildToContainer(parent,node.stateNode);}else{appendChild(parent,node.stateNode);}}}else if(node.tag===HostPortal$7){// If the insertion itself is a portal, then we don't want to traverse
// down its children. Instead, we'll get insertions from each child in
// the portal directly.
}else if(node.child!==null){node.child['return']=node;node=node.child;continue;}if(node===finishedWork){return;}while(node.sibling===null){if(node['return']===null||node['return']===finishedWork){return;}node=node['return'];}node.sibling['return']=node['return'];node=node.sibling;}}function commitNestedUnmounts(root){// While we're inside a removed host node we don't want to call
// removeChild on the inner nodes because they're removed by the top
// call anyway. We also want to call componentWillUnmount on all
// composites before this host node is removed from the tree. Therefore
var node=root;while(true){commitUnmount(node);// Visit children because they may contain more composite or host nodes.
// Skip portals because commitUnmount() currently visits them recursively.
if(node.child!==null&&node.tag!==HostPortal$7){node.child['return']=node;node=node.child;continue;}if(node===root){return;}while(node.sibling===null){if(node['return']===null||node['return']===root){return;}node=node['return'];}node.sibling['return']=node['return'];node=node.sibling;}}function unmountHostComponents(current){// We only have the top Fiber that was inserted but we need recurse down its
var node=current;// Each iteration, currentParent is populated with node's host parent if not
// currentParentIsValid.
var currentParentIsValid=false;var currentParent=void 0;var currentParentIsContainer=void 0;while(true){if(!currentParentIsValid){var parent=node['return'];findParent:while(true){!(parent!==null)?invariant(false,'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.'):void 0;switch(parent.tag){case HostComponent$9:currentParent=parent.stateNode;currentParentIsContainer=false;break findParent;case HostRoot$9:currentParent=parent.stateNode.containerInfo;currentParentIsContainer=true;break findParent;case HostPortal$7:currentParent=parent.stateNode.containerInfo;currentParentIsContainer=true;break findParent;}parent=parent['return'];}currentParentIsValid=true;}if(node.tag===HostComponent$9||node.tag===HostText$7){commitNestedUnmounts(node);// After all the children have unmounted, it is now safe to remove the
// node from the tree.
if(currentParentIsContainer){removeChildFromContainer(currentParent,node.stateNode);}else{removeChild(currentParent,node.stateNode);}// Don't visit children because we already visited them.
}else if(node.tag===HostPortal$7){// When we go into a portal, it becomes the parent to remove from.
// We will reassign it back when we pop the portal on the way up.
currentParent=node.stateNode.containerInfo;// Visit children because portals might contain host components.
if(node.child!==null){node.child['return']=node;node=node.child;continue;}}else{commitUnmount(node);// Visit children because we may find more host components below.
if(node.child!==null){node.child['return']=node;node=node.child;continue;}}if(node===current){return;}while(node.sibling===null){if(node['return']===null||node['return']===current){return;}node=node['return'];if(node.tag===HostPortal$7){// When we go out of the portal, we need to restore the parent.
// Since we don't keep a stack of them, we will search for it.
currentParentIsValid=false;}}node.sibling['return']=node['return'];node=node.sibling;}}function commitDeletion(current){// Recursively delete all host nodes from the parent.
// Detach refs and call componentWillUnmount() on the whole subtree.
unmountHostComponents(current);// Cut off the return pointers to disconnect it from the tree. Ideally, we
// should clear the child pointer of the parent alternate to let this
// get GC:ed but we don't know which for sure which parent is the current
// one so we'll settle for GC:ing the subtree of this child. This child
// itself will be GC:ed when the parent updates the next time.
current['return']=null;current.child=null;if(current.alternate){current.alternate.child=null;current.alternate['return']=null;}}// User-originating errors (lifecycles and refs) should not interrupt
// deletion, so don't let them throw. Host-originating errors should
// interrupt deletion, so it's okay
function commitUnmount(current){if(typeof onCommitUnmount==='function'){onCommitUnmount(current);}switch(current.tag){case ClassComponent$9:{safelyDetachRef(current);var instance=current.stateNode;if(typeof instance.componentWillUnmount==='function'){safelyCallComponentWillUnmount(current,instance);}return;}case HostComponent$9:{safelyDetachRef(current);return;}case CoroutineComponent$4:{commitNestedUnmounts(current.stateNode);return;}case HostPortal$7:{// TODO: this is recursive.
// We are also not using this parent because
// the portal will get pushed immediately.
unmountHostComponents(current);return;}}}function commitWork(current,finishedWork){switch(finishedWork.tag){case ClassComponent$9:{return;}case HostComponent$9:{var instance=finishedWork.stateNode;if(instance!=null){// Commit the work prepared earlier.
var newProps=finishedWork.memoizedProps;// For hydration we reuse the update path but we treat the oldProps
// as the newProps. The updatePayload will contain the real change in
// this case.
var oldProps=current!==null?current.memoizedProps:newProps;var type=finishedWork.type;// TODO: Type the updateQueue to be specific to host components.
var updatePayload=finishedWork.updateQueue;finishedWork.updateQueue=null;if(updatePayload!==null){commitUpdate(instance,updatePayload,type,oldProps,newProps,finishedWork);}}return;}case HostText$7:{!(finishedWork.stateNode!==null)?invariant(false,'This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.'):void 0;var textInstance=finishedWork.stateNode;var newText=finishedWork.memoizedProps;// For hydration we reuse the update path but we treat the oldProps
// as the newProps. The updatePayload will contain the real change in
// this case.
var oldText=current!==null?current.memoizedProps:newText;commitTextUpdate(textInstance,oldText,newText);return;}case HostRoot$9:{return;}case HostPortal$7:{return;}default:{invariant(false,'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');}}}function commitLifeCycles(current,finishedWork){switch(finishedWork.tag){case ClassComponent$9:{var instance=finishedWork.stateNode;if(finishedWork.effectTag&Update$3){if(current===null){{startPhaseTimer$2(finishedWork,'componentDidMount');}instance.props=finishedWork.memoizedProps;instance.state=finishedWork.memoizedState;instance.componentDidMount();{stopPhaseTimer$2();}}else{var prevProps=current.memoizedProps;var prevState=current.memoizedState;{startPhaseTimer$2(finishedWork,'componentDidUpdate');}instance.props=finishedWork.memoizedProps;instance.state=finishedWork.memoizedState;instance.componentDidUpdate(prevProps,prevState);{stopPhaseTimer$2();}}}if(finishedWork.effectTag&Callback$1&&finishedWork.updateQueue!==null){commitCallbacks$1(finishedWork,finishedWork.updateQueue,instance);}return;}case HostRoot$9:{var updateQueue=finishedWork.updateQueue;if(updateQueue!==null){var _instance=finishedWork.child&&finishedWork.child.stateNode;commitCallbacks$1(finishedWork,updateQueue,_instance);}return;}case HostComponent$9:{var _instance2=finishedWork.stateNode;// Renderers may schedule work to be done after host components are mounted
// (eg DOM renderer may schedule auto-focus for inputs and form controls).
// These effects should only be committed when components are first mounted,
// aka when there is no current/alternate.
if(current===null&&finishedWork.effectTag&Update$3){var type=finishedWork.type;var props=finishedWork.memoizedProps;commitMount(_instance2,type,props,finishedWork);}return;}case HostText$7:{// We have no life-cycles associated with text.
return;}case HostPortal$7:{// We have no life-cycles associated with portals.
return;}default:{invariant(false,'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');}}}function commitAttachRef(finishedWork){var ref=finishedWork.ref;if(ref!==null){var instance=finishedWork.stateNode;switch(finishedWork.tag){case HostComponent$9:ref(getPublicInstance(instance));break;default:ref(instance);}}}function commitDetachRef(current){var currentRef=current.ref;if(currentRef!==null){currentRef(null);}}return{commitPlacement:commitPlacement,commitDeletion:commitDeletion,commitWork:commitWork,commitLifeCycles:commitLifeCycles,commitAttachRef:commitAttachRef,commitDetachRef:commitDetachRef};};var createCursor$2=ReactFiberStack.createCursor;var pop$2=ReactFiberStack.pop;var push$2=ReactFiberStack.push;var NO_CONTEXT={};var ReactFiberHostContext=function ReactFiberHostContext(config){var getChildHostContext=config.getChildHostContext,getRootHostContext=config.getRootHostContext;var contextStackCursor=createCursor$2(NO_CONTEXT);var contextFiberStackCursor=createCursor$2(NO_CONTEXT);var rootInstanceStackCursor=createCursor$2(NO_CONTEXT);function requiredContext(c){!(c!==NO_CONTEXT)?invariant(false,'Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.'):void 0;return c;}function getRootHostContainer(){var rootInstance=requiredContext(rootInstanceStackCursor.current);return rootInstance;}function pushHostContainer(fiber,nextRootInstance){// Push current root instance onto the stack;
// This allows us to reset root when portals are popped.
push$2(rootInstanceStackCursor,nextRootInstance,fiber);var nextRootContext=getRootHostContext(nextRootInstance);// Track the context and the Fiber that provided it.
// This enables us to pop only Fibers that provide unique contexts.
push$2(contextFiberStackCursor,fiber,fiber);push$2(contextStackCursor,nextRootContext,fiber);}function popHostContainer(fiber){pop$2(contextStackCursor,fiber);pop$2(contextFiberStackCursor,fiber);pop$2(rootInstanceStackCursor,fiber);}function getHostContext(){var context=requiredContext(contextStackCursor.current);return context;}function pushHostContext(fiber){var rootInstance=requiredContext(rootInstanceStackCursor.current);var context=requiredContext(contextStackCursor.current);var nextContext=getChildHostContext(context,fiber.type,rootInstance);// Don't push this Fiber's context unless it's unique.
if(context===nextContext){return;}// Track the context and the Fiber that provided it.
// This enables us to pop only Fibers that provide unique contexts.
push$2(contextFiberStackCursor,fiber,fiber);push$2(contextStackCursor,nextContext,fiber);}function popHostContext(fiber){// Do not pop unless this Fiber provided the current context.
// pushHostContext() only pushes Fibers that provide unique contexts.
if(contextFiberStackCursor.current!==fiber){return;}pop$2(contextStackCursor,fiber);pop$2(contextFiberStackCursor,fiber);}function resetHostContainer(){contextStackCursor.current=NO_CONTEXT;rootInstanceStackCursor.current=NO_CONTEXT;}return{getHostContext:getHostContext,getRootHostContainer:getRootHostContainer,popHostContainer:popHostContainer,popHostContext:popHostContext,pushHostContainer:pushHostContainer,pushHostContext:pushHostContext,resetHostContainer:resetHostContainer};};var HostComponent$10=ReactTypeOfWork.HostComponent;var HostText$8=ReactTypeOfWork.HostText;var HostRoot$10=ReactTypeOfWork.HostRoot;var Deletion$2=ReactTypeOfSideEffect.Deletion;var Placement$6=ReactTypeOfSideEffect.Placement;var createFiberFromHostInstanceForDeletion$1=ReactFiber.createFiberFromHostInstanceForDeletion;var ReactFiberHydrationContext=function ReactFiberHydrationContext(config){var shouldSetTextContent=config.shouldSetTextContent,canHydrateInstance=config.canHydrateInstance,canHydrateTextInstance=config.canHydrateTextInstance,getNextHydratableSibling=config.getNextHydratableSibling,getFirstHydratableChild=config.getFirstHydratableChild,hydrateInstance=config.hydrateInstance,hydrateTextInstance=config.hydrateTextInstance,didNotHydrateInstance=config.didNotHydrateInstance,didNotFindHydratableInstance=config.didNotFindHydratableInstance,didNotFindHydratableTextInstance=config.didNotFindHydratableTextInstance;// If this doesn't have hydration mode.
if(!(canHydrateInstance&&canHydrateTextInstance&&getNextHydratableSibling&&getFirstHydratableChild&&hydrateInstance&&hydrateTextInstance&&didNotHydrateInstance&&didNotFindHydratableInstance&&didNotFindHydratableTextInstance)){return{enterHydrationState:function enterHydrationState(){return false;},resetHydrationState:function resetHydrationState(){},tryToClaimNextHydratableInstance:function tryToClaimNextHydratableInstance(){},prepareToHydrateHostInstance:function prepareToHydrateHostInstance(){invariant(false,'Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');},prepareToHydrateHostTextInstance:function prepareToHydrateHostTextInstance(){invariant(false,'Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');},popHydrationState:function popHydrationState(fiber){return false;}};}// The deepest Fiber on the stack involved in a hydration context.
// This may have been an insertion or a hydration.
var hydrationParentFiber=null;var nextHydratableInstance=null;var isHydrating=false;function enterHydrationState(fiber){var parentInstance=fiber.stateNode.containerInfo;nextHydratableInstance=getFirstHydratableChild(parentInstance);hydrationParentFiber=fiber;isHydrating=true;return true;}function deleteHydratableInstance(returnFiber,instance){{switch(returnFiber.tag){case HostRoot$10:didNotHydrateInstance(returnFiber.stateNode.containerInfo,instance);break;case HostComponent$10:didNotHydrateInstance(returnFiber.stateNode,instance);break;}}var childToDelete=createFiberFromHostInstanceForDeletion$1();childToDelete.stateNode=instance;childToDelete['return']=returnFiber;childToDelete.effectTag=Deletion$2;// This might seem like it belongs on progressedFirstDeletion. However,
// these children are not part of the reconciliation list of children.
// Even if we abort and rereconcile the children, that will try to hydrate
// again and the nodes are still in the host tree so these will be
// recreated.
if(returnFiber.lastEffect!==null){returnFiber.lastEffect.nextEffect=childToDelete;returnFiber.lastEffect=childToDelete;}else{returnFiber.firstEffect=returnFiber.lastEffect=childToDelete;}}function insertNonHydratedInstance(returnFiber,fiber){fiber.effectTag|=Placement$6;{var parentInstance;switch(returnFiber.tag){// TODO: Currently we don't warn for insertions into the root because
// we always insert into the root in the non-hydrating case. We just
// delete the existing content. Reenable this once we have a better
// strategy for determining if we're hydrating or not.
// case HostRoot:
//   parentInstance = returnFiber.stateNode.containerInfo;
//   break;
case HostComponent$10:parentInstance=returnFiber.stateNode;break;default:return;}switch(fiber.tag){case HostComponent$10:var type=fiber.type;var props=fiber.pendingProps;didNotFindHydratableInstance(parentInstance,type,props);break;case HostText$8:var text=fiber.pendingProps;didNotFindHydratableTextInstance(parentInstance,text);break;}}}function canHydrate(fiber,nextInstance){switch(fiber.tag){case HostComponent$10:{var type=fiber.type;var props=fiber.pendingProps;return canHydrateInstance(nextInstance,type,props);}case HostText$8:{var text=fiber.pendingProps;return canHydrateTextInstance(nextInstance,text);}default:return false;}}function tryToClaimNextHydratableInstance(fiber){if(!isHydrating){return;}var nextInstance=nextHydratableInstance;if(!nextInstance){// Nothing to hydrate. Make it an insertion.
insertNonHydratedInstance(hydrationParentFiber,fiber);isHydrating=false;hydrationParentFiber=fiber;return;}if(!canHydrate(fiber,nextInstance)){// If we can't hydrate this instance let's try the next one.
// We use this as a heuristic. It's based on intuition and not data so it
// might be flawed or unnecessary.
nextInstance=getNextHydratableSibling(nextInstance);if(!nextInstance||!canHydrate(fiber,nextInstance)){// Nothing to hydrate. Make it an insertion.
insertNonHydratedInstance(hydrationParentFiber,fiber);isHydrating=false;hydrationParentFiber=fiber;return;}// We matched the next one, we'll now assume that the first one was
// superfluous and we'll delete it. Since we can't eagerly delete it
// we'll have to schedule a deletion. To do that, this node needs a dummy
// fiber associated with it.
deleteHydratableInstance(hydrationParentFiber,nextHydratableInstance);}fiber.stateNode=nextInstance;hydrationParentFiber=fiber;nextHydratableInstance=getFirstHydratableChild(nextInstance);}function prepareToHydrateHostInstance(fiber,rootContainerInstance,hostContext){var instance=fiber.stateNode;var updatePayload=hydrateInstance(instance,fiber.type,fiber.memoizedProps,rootContainerInstance,hostContext,fiber);// TODO: Type this specific to this type of component.
fiber.updateQueue=updatePayload;// If the update payload indicates that there is a change or if there
// is a new ref we mark this as an update.
if(updatePayload!==null){return true;}return false;}function prepareToHydrateHostTextInstance(fiber){var textInstance=fiber.stateNode;var shouldUpdate=hydrateTextInstance(textInstance,fiber.memoizedProps,fiber);return shouldUpdate;}function popToNextHostParent(fiber){var parent=fiber['return'];while(parent!==null&&parent.tag!==HostComponent$10&&parent.tag!==HostRoot$10){parent=parent['return'];}hydrationParentFiber=parent;}function popHydrationState(fiber){if(fiber!==hydrationParentFiber){// We're deeper than the current hydration context, inside an inserted
// tree.
return false;}if(!isHydrating){// If we're not currently hydrating but we're in a hydration context, then
// we were an insertion and now need to pop up reenter hydration of our
// siblings.
popToNextHostParent(fiber);isHydrating=true;return false;}var type=fiber.type;// If we have any remaining hydratable nodes, we need to delete them now.
// We only do this deeper than head and body since they tend to have random
// other nodes in them. We also ignore components with pure text content in
// side of them.
// TODO: Better heuristic.
if(fiber.tag!==HostComponent$10||type!=='head'&&type!=='body'&&!shouldSetTextContent(type,fiber.memoizedProps)){var nextInstance=nextHydratableInstance;while(nextInstance){deleteHydratableInstance(fiber,nextInstance);nextInstance=getNextHydratableSibling(nextInstance);}}popToNextHostParent(fiber);nextHydratableInstance=hydrationParentFiber?getNextHydratableSibling(fiber.stateNode):null;return true;}function resetHydrationState(){hydrationParentFiber=null;nextHydratableInstance=null;isHydrating=false;}return{enterHydrationState:enterHydrationState,resetHydrationState:resetHydrationState,tryToClaimNextHydratableInstance:tryToClaimNextHydratableInstance,prepareToHydrateHostInstance:prepareToHydrateHostInstance,prepareToHydrateHostTextInstance:prepareToHydrateHostTextInstance,popHydrationState:popHydrationState};};/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactFiberInstrumentation
 * 
 */// This lets us hook into Fiber to debug what it's doing.
// See https://github.com/facebook/react/pull/8033.
// This is not part of the public API, not even for React DevTools.
// You may only inject a debugTool if you work on React Fiber itself.
var ReactFiberInstrumentation$2={debugTool:null};var ReactFiberInstrumentation_1=ReactFiberInstrumentation$2;var popContextProvider$1=ReactFiberContext.popContextProvider;var reset$1=ReactFiberStack.reset;var getStackAddendumByWorkInProgressFiber$2=ReactFiberComponentTreeHook.getStackAddendumByWorkInProgressFiber;var logCapturedError=ReactFiberErrorLogger.logCapturedError;var invokeGuardedCallback$1=ReactErrorUtils_1.invokeGuardedCallback;var hasCaughtError=ReactErrorUtils_1.hasCaughtError;var clearCaughtError=ReactErrorUtils_1.clearCaughtError;var ReactCurrentOwner$1=ReactGlobalSharedState_1.ReactCurrentOwner;var createWorkInProgress$1=ReactFiber.createWorkInProgress;var largerPriority$1=ReactFiber.largerPriority;var onCommitRoot=ReactFiberDevToolsHook.onCommitRoot;var NoWork$2=ReactPriorityLevel.NoWork;var SynchronousPriority$1=ReactPriorityLevel.SynchronousPriority;var TaskPriority$1=ReactPriorityLevel.TaskPriority;var HighPriority=ReactPriorityLevel.HighPriority;var LowPriority=ReactPriorityLevel.LowPriority;var OffscreenPriority=ReactPriorityLevel.OffscreenPriority;var AsyncUpdates=ReactTypeOfInternalContext.AsyncUpdates;var PerformedWork=ReactTypeOfSideEffect.PerformedWork;var Placement$1=ReactTypeOfSideEffect.Placement;var Update=ReactTypeOfSideEffect.Update;var PlacementAndUpdate=ReactTypeOfSideEffect.PlacementAndUpdate;var Deletion=ReactTypeOfSideEffect.Deletion;var ContentReset=ReactTypeOfSideEffect.ContentReset;var Callback=ReactTypeOfSideEffect.Callback;var Err=ReactTypeOfSideEffect.Err;var Ref=ReactTypeOfSideEffect.Ref;var HostRoot$6=ReactTypeOfWork.HostRoot;var HostComponent$6=ReactTypeOfWork.HostComponent;var HostPortal$3=ReactTypeOfWork.HostPortal;var ClassComponent$5=ReactTypeOfWork.ClassComponent;var getUpdatePriority$1=ReactFiberUpdateQueue.getUpdatePriority;var _require14=ReactFiberContext;var resetContext$1=_require14.resetContext;{var warning$22=require$$0;var ReactFiberInstrumentation$1=ReactFiberInstrumentation_1;var ReactDebugCurrentFiber$3=ReactDebugCurrentFiber_1;var _require15=ReactDebugFiberPerf_1,recordEffect=_require15.recordEffect,recordScheduleUpdate=_require15.recordScheduleUpdate,startWorkTimer=_require15.startWorkTimer,stopWorkTimer=_require15.stopWorkTimer,stopFailedWorkTimer=_require15.stopFailedWorkTimer,startWorkLoopTimer=_require15.startWorkLoopTimer,stopWorkLoopTimer=_require15.stopWorkLoopTimer,startCommitTimer=_require15.startCommitTimer,stopCommitTimer=_require15.stopCommitTimer,startCommitHostEffectsTimer=_require15.startCommitHostEffectsTimer,stopCommitHostEffectsTimer=_require15.stopCommitHostEffectsTimer,startCommitLifeCyclesTimer=_require15.startCommitLifeCyclesTimer,stopCommitLifeCyclesTimer=_require15.stopCommitLifeCyclesTimer;var warnAboutUpdateOnUnmounted=function warnAboutUpdateOnUnmounted(instance){var ctor=instance.constructor;warning$22(false,'Can only update a mounted or mounting component. This usually means '+'you called setState, replaceState, or forceUpdate on an unmounted '+'component. This is a no-op.\n\nPlease check the code for the '+'%s component.',ctor&&(ctor.displayName||ctor.name)||'ReactClass');};var warnAboutInvalidUpdates=function warnAboutInvalidUpdates(instance){switch(ReactDebugCurrentFiber$3.phase){case'getChildContext':warning$22(false,'setState(...): Cannot call setState() inside getChildContext()');break;case'render':warning$22(false,'Cannot update during an existing state transition (such as within '+"`render` or another component's constructor). Render methods should "+'be a pure function of props and state; constructor side-effects are '+'an anti-pattern, but can be moved to `componentWillMount`.');break;}};}var timeHeuristicForUnitOfWork=1;var ReactFiberScheduler=function ReactFiberScheduler(config){var hostContext=ReactFiberHostContext(config);var hydrationContext=ReactFiberHydrationContext(config);var popHostContainer=hostContext.popHostContainer,popHostContext=hostContext.popHostContext,resetHostContainer=hostContext.resetHostContainer;var _ReactFiberBeginWork=ReactFiberBeginWork(config,hostContext,hydrationContext,scheduleUpdate,getPriorityContext),beginWork=_ReactFiberBeginWork.beginWork,beginFailedWork=_ReactFiberBeginWork.beginFailedWork;var _ReactFiberCompleteWo=ReactFiberCompleteWork(config,hostContext,hydrationContext),completeWork=_ReactFiberCompleteWo.completeWork;var _ReactFiberCommitWork=ReactFiberCommitWork(config,captureError),commitPlacement=_ReactFiberCommitWork.commitPlacement,commitDeletion=_ReactFiberCommitWork.commitDeletion,commitWork=_ReactFiberCommitWork.commitWork,commitLifeCycles=_ReactFiberCommitWork.commitLifeCycles,commitAttachRef=_ReactFiberCommitWork.commitAttachRef,commitDetachRef=_ReactFiberCommitWork.commitDetachRef;var scheduleDeferredCallback=config.scheduleDeferredCallback,useSyncScheduling=config.useSyncScheduling,prepareForCommit=config.prepareForCommit,resetAfterCommit=config.resetAfterCommit;// The priority level to use when scheduling an update. We use NoWork to
// represent the default priority.
// TODO: Should we change this to an array instead of using the call stack?
// Might be less confusing.
var priorityContext=NoWork$2;// Keeps track of whether we're currently in a work loop.
var isPerformingWork=false;// Keeps track of whether the current deadline has expired.
var deadlineHasExpired=false;// Keeps track of whether we should should batch sync updates.
var isBatchingUpdates=false;// This is needed for the weird case where the initial mount is synchronous
// even inside batchedUpdates :(
var isUnbatchingUpdates=false;// The next work in progress fiber that we're currently working on.
var nextUnitOfWork=null;var nextPriorityLevel=NoWork$2;// The next fiber with an effect that we're currently committing.
var nextEffect=null;var pendingCommit=null;// Linked list of roots with scheduled work on them.
var nextScheduledRoot=null;var lastScheduledRoot=null;// Keep track of which host environment callbacks are scheduled.
var isCallbackScheduled=false;// Keep track of which fibers have captured an error that need to be handled.
// Work is removed from this collection after componentDidCatch is called.
var capturedErrors=null;// Keep track of which fibers have failed during the current batch of work.
// This is a different set than capturedErrors, because it is not reset until
// the end of the batch. This is needed to propagate errors correctly if a
// subtree fails more than once.
var failedBoundaries=null;// Error boundaries that captured an error during the current commit.
var commitPhaseBoundaries=null;var firstUncaughtError=null;var didFatal=false;var isCommitting=false;var isUnmounting=false;// Use these to prevent an infinite loop of nested updates
var NESTED_UPDATE_LIMIT=1000;var nestedUpdateCount=0;var nextRenderedTree=null;function resetContextStack(){// Reset the stack
reset$1();// Reset the cursors
resetContext$1();resetHostContainer();}// resetNextUnitOfWork mutates the current priority context. It is reset after
// after the workLoop exits, so never call resetNextUnitOfWork from outside
// the work loop.
function resetNextUnitOfWork(){// Clear out roots with no more work on them, or if they have uncaught errors
while(nextScheduledRoot!==null&&nextScheduledRoot.current.pendingWorkPriority===NoWork$2){// Unschedule this root.
nextScheduledRoot.isScheduled=false;// Read the next pointer now.
// We need to clear it in case this root gets scheduled again later.
var next=nextScheduledRoot.nextScheduledRoot;nextScheduledRoot.nextScheduledRoot=null;// Exit if we cleared all the roots and there's no work to do.
if(nextScheduledRoot===lastScheduledRoot){nextScheduledRoot=null;lastScheduledRoot=null;nextPriorityLevel=NoWork$2;return null;}// Continue with the next root.
// If there's no work on it, it will get unscheduled too.
nextScheduledRoot=next;}var root=nextScheduledRoot;var highestPriorityRoot=null;var highestPriorityLevel=NoWork$2;while(root!==null){if(root.current.pendingWorkPriority!==NoWork$2&&(highestPriorityLevel===NoWork$2||highestPriorityLevel>root.current.pendingWorkPriority)){highestPriorityLevel=root.current.pendingWorkPriority;highestPriorityRoot=root;}// We didn't find anything to do in this root, so let's try the next one.
root=root.nextScheduledRoot;}if(highestPriorityRoot!==null){nextPriorityLevel=highestPriorityLevel;// Before we start any new work, let's make sure that we have a fresh
// stack to work from.
// TODO: This call is buried a bit too deep. It would be nice to have
// a single point which happens right before any new work and
// unfortunately this is it.
resetContextStack();nextUnitOfWork=createWorkInProgress$1(highestPriorityRoot.current,highestPriorityLevel);if(highestPriorityRoot!==nextRenderedTree){// We've switched trees. Reset the nested update counter.
nestedUpdateCount=0;nextRenderedTree=highestPriorityRoot;}return;}nextPriorityLevel=NoWork$2;nextUnitOfWork=null;nextRenderedTree=null;return;}function commitAllHostEffects(){while(nextEffect!==null){{ReactDebugCurrentFiber$3.setCurrentFiber(nextEffect,null);recordEffect();}var effectTag=nextEffect.effectTag;if(effectTag&ContentReset){config.resetTextContent(nextEffect.stateNode);}if(effectTag&Ref){var current=nextEffect.alternate;if(current!==null){commitDetachRef(current);}}// The following switch statement is only concerned about placement,
// updates, and deletions. To avoid needing to add a case for every
// possible bitmap value, we remove the secondary effects from the
// effect tag and switch on that value.
var primaryEffectTag=effectTag&~(Callback|Err|ContentReset|Ref|PerformedWork);switch(primaryEffectTag){case Placement$1:{commitPlacement(nextEffect);// Clear the "placement" from effect tag so that we know that this is inserted, before
// any life-cycles like componentDidMount gets called.
// TODO: findDOMNode doesn't rely on this any more but isMounted
// does and isMounted is deprecated anyway so we should be able
// to kill this.
nextEffect.effectTag&=~Placement$1;break;}case PlacementAndUpdate:{// Placement
commitPlacement(nextEffect);// Clear the "placement" from effect tag so that we know that this is inserted, before
// any life-cycles like componentDidMount gets called.
nextEffect.effectTag&=~Placement$1;// Update
var _current=nextEffect.alternate;commitWork(_current,nextEffect);break;}case Update:{var _current2=nextEffect.alternate;commitWork(_current2,nextEffect);break;}case Deletion:{isUnmounting=true;commitDeletion(nextEffect);isUnmounting=false;break;}}nextEffect=nextEffect.nextEffect;}{ReactDebugCurrentFiber$3.resetCurrentFiber();}}function commitAllLifeCycles(){while(nextEffect!==null){var effectTag=nextEffect.effectTag;// Use Task priority for lifecycle updates
if(effectTag&(Update|Callback)){{recordEffect();}var current=nextEffect.alternate;commitLifeCycles(current,nextEffect);}if(effectTag&Ref){{recordEffect();}commitAttachRef(nextEffect);}if(effectTag&Err){{recordEffect();}commitErrorHandling(nextEffect);}var next=nextEffect.nextEffect;// Ensure that we clean these up so that we don't accidentally keep them.
// I'm not actually sure this matters because we can't reset firstEffect
// and lastEffect since they're on every node, not just the effectful
// ones. So we have to clean everything as we reuse nodes anyway.
nextEffect.nextEffect=null;// Ensure that we reset the effectTag here so that we can rely on effect
// tags to reason about the current life-cycle.
nextEffect=next;}}function commitAllWork(finishedWork){// We keep track of this so that captureError can collect any boundaries
// that capture an error during the commit phase. The reason these aren't
// local to this function is because errors that occur during cWU are
// captured elsewhere, to prevent the unmount from being interrupted.
isCommitting=true;{startCommitTimer();}pendingCommit=null;var root=finishedWork.stateNode;!(root.current!==finishedWork)?invariant(false,'Cannot commit the same tree as before. This is probably a bug related to the return field. This error is likely caused by a bug in React. Please file an issue.'):void 0;if(nextPriorityLevel===SynchronousPriority$1||nextPriorityLevel===TaskPriority$1){// Keep track of the number of iterations to prevent an infinite
// update loop.
nestedUpdateCount++;}// Reset this to null before calling lifecycles
ReactCurrentOwner$1.current=null;var firstEffect=void 0;if(finishedWork.effectTag>PerformedWork){// A fiber's effect list consists only of its children, not itself. So if
// the root has an effect, we need to add it to the end of the list. The
// resulting list is the set that would belong to the root's parent, if
// it had one; that is, all the effects in the tree including the root.
if(finishedWork.lastEffect!==null){finishedWork.lastEffect.nextEffect=finishedWork;firstEffect=finishedWork.firstEffect;}else{firstEffect=finishedWork;}}else{// There is no effect on the root.
firstEffect=finishedWork.firstEffect;}prepareForCommit();// Commit all the side-effects within a tree. We'll do this in two passes.
// The first pass performs all the host insertions, updates, deletions and
// ref unmounts.
nextEffect=firstEffect;{startCommitHostEffectsTimer();}while(nextEffect!==null){var didError=false;var _error=void 0;{invokeGuardedCallback$1(null,commitAllHostEffects,null);if(hasCaughtError()){didError=true;_error=clearCaughtError();}}if(didError){!(nextEffect!==null)?invariant(false,'Should have next effect. This error is likely caused by a bug in React. Please file an issue.'):void 0;captureError(nextEffect,_error);// Clean-up
if(nextEffect!==null){nextEffect=nextEffect.nextEffect;}}}{stopCommitHostEffectsTimer();}resetAfterCommit();// The work-in-progress tree is now the current tree. This must come after
// the first pass of the commit phase, so that the previous tree is still
// current during componentWillUnmount, but before the second pass, so that
// the finished work is current during componentDidMount/Update.
root.current=finishedWork;// In the second pass we'll perform all life-cycles and ref callbacks.
// Life-cycles happen as a separate pass so that all placements, updates,
// and deletions in the entire tree have already been invoked.
// This pass also triggers any renderer-specific initial effects.
nextEffect=firstEffect;{startCommitLifeCyclesTimer();}while(nextEffect!==null){var _didError=false;var _error2=void 0;{invokeGuardedCallback$1(null,commitAllLifeCycles,null);if(hasCaughtError()){_didError=true;_error2=clearCaughtError();}}if(_didError){!(nextEffect!==null)?invariant(false,'Should have next effect. This error is likely caused by a bug in React. Please file an issue.'):void 0;captureError(nextEffect,_error2);if(nextEffect!==null){nextEffect=nextEffect.nextEffect;}}}isCommitting=false;{stopCommitLifeCyclesTimer();stopCommitTimer();}if(typeof onCommitRoot==='function'){onCommitRoot(finishedWork.stateNode);}if(true&&ReactFiberInstrumentation$1.debugTool){ReactFiberInstrumentation$1.debugTool.onCommitWork(finishedWork);}// If we caught any errors during this commit, schedule their boundaries
// to update.
if(commitPhaseBoundaries){commitPhaseBoundaries.forEach(scheduleErrorRecovery);commitPhaseBoundaries=null;}// This tree is done. Reset the unit of work pointer to the next highest
// priority root. If there's no more work left, the pointer is set to null.
resetNextUnitOfWork();}function resetWorkPriority(workInProgress,renderPriority){if(workInProgress.pendingWorkPriority!==NoWork$2&&workInProgress.pendingWorkPriority>renderPriority){// This was a down-prioritization. Don't bubble priority from children.
return;}// Check for pending update priority.
var newPriority=getUpdatePriority$1(workInProgress);// TODO: Coroutines need to visit stateNode
var child=workInProgress.child;while(child!==null){// Ensure that remaining work priority bubbles up.
newPriority=largerPriority$1(newPriority,child.pendingWorkPriority);child=child.sibling;}workInProgress.pendingWorkPriority=newPriority;}function completeUnitOfWork(workInProgress){while(true){// The current, flushed, state of this fiber is the alternate.
// Ideally nothing should rely on this, but relying on it here
// means that we don't need an additional field on the work in
// progress.
var current=workInProgress.alternate;var next=completeWork(current,workInProgress,nextPriorityLevel);var returnFiber=workInProgress['return'];var siblingFiber=workInProgress.sibling;resetWorkPriority(workInProgress,nextPriorityLevel);if(next!==null){{stopWorkTimer(workInProgress);}if(true&&ReactFiberInstrumentation$1.debugTool){ReactFiberInstrumentation$1.debugTool.onCompleteWork(workInProgress);}// If completing this work spawned new work, do that next. We'll come
// back here again.
return next;}if(returnFiber!==null){// Append all the effects of the subtree and this fiber onto the effect
// list of the parent. The completion order of the children affects the
// side-effect order.
if(returnFiber.firstEffect===null){returnFiber.firstEffect=workInProgress.firstEffect;}if(workInProgress.lastEffect!==null){if(returnFiber.lastEffect!==null){returnFiber.lastEffect.nextEffect=workInProgress.firstEffect;}returnFiber.lastEffect=workInProgress.lastEffect;}// If this fiber had side-effects, we append it AFTER the children's
// side-effects. We can perform certain side-effects earlier if
// needed, by doing multiple passes over the effect list. We don't want
// to schedule our own side-effect on our own list because if end up
// reusing children we'll schedule this effect onto itself since we're
// at the end.
var effectTag=workInProgress.effectTag;// Skip both NoWork and PerformedWork tags when creating the effect list.
// PerformedWork effect is read by React DevTools but shouldn't be committed.
if(effectTag>PerformedWork){if(returnFiber.lastEffect!==null){returnFiber.lastEffect.nextEffect=workInProgress;}else{returnFiber.firstEffect=workInProgress;}returnFiber.lastEffect=workInProgress;}}{stopWorkTimer(workInProgress);}if(true&&ReactFiberInstrumentation$1.debugTool){ReactFiberInstrumentation$1.debugTool.onCompleteWork(workInProgress);}if(siblingFiber!==null){// If there is more work to do in this returnFiber, do that next.
return siblingFiber;}else if(returnFiber!==null){// If there's no more work in this returnFiber. Complete the returnFiber.
workInProgress=returnFiber;continue;}else{// We've reached the root. Mark the root as pending commit. Depending
// on how much time we have left, we'll either commit it now or in
// the next frame.
pendingCommit=workInProgress;return null;}}// Without this explicit null return Flow complains of invalid return type
// TODO Remove the above while(true) loop
// eslint-disable-next-line no-unreachable
return null;}function performUnitOfWork(workInProgress){// The current, flushed, state of this fiber is the alternate.
// Ideally nothing should rely on this, but relying on it here
// means that we don't need an additional field on the work in
// progress.
var current=workInProgress.alternate;// See if beginning this work spawns more work.
{startWorkTimer(workInProgress);}var next=beginWork(current,workInProgress,nextPriorityLevel);if(true&&ReactFiberInstrumentation$1.debugTool){ReactFiberInstrumentation$1.debugTool.onBeginWork(workInProgress);}if(next===null){// If this doesn't spawn new work, complete the current work.
next=completeUnitOfWork(workInProgress);}ReactCurrentOwner$1.current=null;{ReactDebugCurrentFiber$3.resetCurrentFiber();}return next;}function performFailedUnitOfWork(workInProgress){// The current, flushed, state of this fiber is the alternate.
// Ideally nothing should rely on this, but relying on it here
// means that we don't need an additional field on the work in
// progress.
var current=workInProgress.alternate;// See if beginning this work spawns more work.
{startWorkTimer(workInProgress);}var next=beginFailedWork(current,workInProgress,nextPriorityLevel);if(true&&ReactFiberInstrumentation$1.debugTool){ReactFiberInstrumentation$1.debugTool.onBeginWork(workInProgress);}if(next===null){// If this doesn't spawn new work, complete the current work.
next=completeUnitOfWork(workInProgress);}ReactCurrentOwner$1.current=null;{ReactDebugCurrentFiber$3.resetCurrentFiber();}return next;}function performDeferredWork(deadline){performWork(OffscreenPriority,deadline);}function handleCommitPhaseErrors(){// This is a special work loop for handling commit phase errors. It's
// similar to the syncrhonous work loop, but does an additional check on
// each fiber to see if it's an error boundary with an unhandled error. If
// so, it uses a forked version of performUnitOfWork that unmounts the
// failed subtree.
//
// The loop stops once the children have unmounted and error lifecycles are
// called. Then we return to the regular flow.
if(capturedErrors!==null&&capturedErrors.size>0&&nextPriorityLevel===TaskPriority$1){while(nextUnitOfWork!==null){if(hasCapturedError(nextUnitOfWork)){// Use a forked version of performUnitOfWork
nextUnitOfWork=performFailedUnitOfWork(nextUnitOfWork);}else{nextUnitOfWork=performUnitOfWork(nextUnitOfWork);}if(nextUnitOfWork===null){!(pendingCommit!==null)?invariant(false,'Should have a pending commit. This error is likely caused by a bug in React. Please file an issue.'):void 0;// We just completed a root. Commit it now.
priorityContext=TaskPriority$1;commitAllWork(pendingCommit);priorityContext=nextPriorityLevel;if(capturedErrors===null||capturedErrors.size===0||nextPriorityLevel!==TaskPriority$1){// There are no more unhandled errors. We can exit this special
// work loop. If there's still additional work, we'll perform it
// using one of the normal work loops.
break;}// The commit phase produced additional errors. Continue working.
}}}}function workLoop(minPriorityLevel,deadline){if(pendingCommit!==null){priorityContext=TaskPriority$1;commitAllWork(pendingCommit);handleCommitPhaseErrors();}else if(nextUnitOfWork===null){resetNextUnitOfWork();}if(nextPriorityLevel===NoWork$2||nextPriorityLevel>minPriorityLevel){return;}// During the render phase, updates should have the same priority at which
// we're rendering.
priorityContext=nextPriorityLevel;loop:do{if(nextPriorityLevel<=TaskPriority$1){// Flush all synchronous and task work.
while(nextUnitOfWork!==null){nextUnitOfWork=performUnitOfWork(nextUnitOfWork);if(nextUnitOfWork===null){!(pendingCommit!==null)?invariant(false,'Should have a pending commit. This error is likely caused by a bug in React. Please file an issue.'):void 0;// We just completed a root. Commit it now.
priorityContext=TaskPriority$1;commitAllWork(pendingCommit);priorityContext=nextPriorityLevel;// Clear any errors that were scheduled during the commit phase.
handleCommitPhaseErrors();// The priority level may have changed. Check again.
if(nextPriorityLevel===NoWork$2||nextPriorityLevel>minPriorityLevel||nextPriorityLevel>TaskPriority$1){// The priority level does not match.
break;}}}}else if(deadline!==null){// Flush asynchronous work until the deadline expires.
while(nextUnitOfWork!==null&&!deadlineHasExpired){if(deadline.timeRemaining()>timeHeuristicForUnitOfWork){nextUnitOfWork=performUnitOfWork(nextUnitOfWork);// In a deferred work batch, iff nextUnitOfWork returns null, we just
// completed a root and a pendingCommit exists. Logically, we could
// omit either of the checks in the following condition, but we need
// both to satisfy Flow.
if(nextUnitOfWork===null){!(pendingCommit!==null)?invariant(false,'Should have a pending commit. This error is likely caused by a bug in React. Please file an issue.'):void 0;// We just completed a root. If we have time, commit it now.
// Otherwise, we'll commit it in the next frame.
if(deadline.timeRemaining()>timeHeuristicForUnitOfWork){priorityContext=TaskPriority$1;commitAllWork(pendingCommit);priorityContext=nextPriorityLevel;// Clear any errors that were scheduled during the commit phase.
handleCommitPhaseErrors();// The priority level may have changed. Check again.
if(nextPriorityLevel===NoWork$2||nextPriorityLevel>minPriorityLevel||nextPriorityLevel<HighPriority){// The priority level does not match.
break;}}else{deadlineHasExpired=true;}}}else{deadlineHasExpired=true;}}}// There might be work left. Depending on the priority, we should
// either perform it now or schedule a callback to perform it later.
switch(nextPriorityLevel){case SynchronousPriority$1:case TaskPriority$1:// We have remaining synchronous or task work. Keep performing it,
// regardless of whether we're inside a callback.
if(nextPriorityLevel<=minPriorityLevel){continue loop;}break loop;case HighPriority:case LowPriority:case OffscreenPriority:// We have remaining async work.
if(deadline===null){// We're not inside a callback. Exit and perform the work during
// the next callback.
break loop;}// We are inside a callback.
if(!deadlineHasExpired&&nextPriorityLevel<=minPriorityLevel){// We still have time. Keep working.
continue loop;}// We've run out of time. Exit.
break loop;case NoWork$2:// No work left. We can exit.
break loop;default:invariant(false,'Switch statement should be exhuastive. This error is likely caused by a bug in React. Please file an issue.');}}while(true);}function performWorkCatchBlock(failedWork,boundary,minPriorityLevel,deadline){// We're going to restart the error boundary that captured the error.
// Conceptually, we're unwinding the stack. We need to unwind the
// context stack, too.
unwindContexts(failedWork,boundary);// Restart the error boundary using a forked version of
// performUnitOfWork that deletes the boundary's children. The entire
// failed subree will be unmounted. During the commit phase, a special
// lifecycle method is called on the error boundary, which triggers
// a re-render.
nextUnitOfWork=performFailedUnitOfWork(boundary);// Continue working.
workLoop(minPriorityLevel,deadline);}function performWork(minPriorityLevel,deadline){{startWorkLoopTimer();}!!isPerformingWork?invariant(false,'performWork was called recursively. This error is likely caused by a bug in React. Please file an issue.'):void 0;isPerformingWork=true;// The priority context changes during the render phase. We'll need to
// reset it at the end.
var previousPriorityContext=priorityContext;var didError=false;var error=null;{invokeGuardedCallback$1(null,workLoop,null,minPriorityLevel,deadline);if(hasCaughtError()){didError=true;error=clearCaughtError();}}// An error was thrown during the render phase.
while(didError){if(didFatal){// This was a fatal error. Don't attempt to recover from it.
firstUncaughtError=error;break;}var failedWork=nextUnitOfWork;if(failedWork===null){// An error was thrown but there's no current unit of work. This can
// happen during the commit phase if there's a bug in the renderer.
didFatal=true;continue;}// "Capture" the error by finding the nearest boundary. If there is no
// error boundary, we use the root.
var boundary=captureError(failedWork,error);!(boundary!==null)?invariant(false,'Should have found an error boundary. This error is likely caused by a bug in React. Please file an issue.'):void 0;if(didFatal){// The error we just captured was a fatal error. This happens
// when the error propagates to the root more than once.
continue;}didError=false;error=null;{invokeGuardedCallback$1(null,performWorkCatchBlock,null,failedWork,boundary,minPriorityLevel,deadline);if(hasCaughtError()){didError=true;error=clearCaughtError();continue;}}// We're finished working. Exit the error loop.
break;}// Reset the priority context to its previous value.
priorityContext=previousPriorityContext;// If we're inside a callback, set this to false, since we just flushed it.
if(deadline!==null){isCallbackScheduled=false;}// If there's remaining async work, make sure we schedule another callback.
if(nextPriorityLevel>TaskPriority$1&&!isCallbackScheduled){scheduleDeferredCallback(performDeferredWork);isCallbackScheduled=true;}var errorToThrow=firstUncaughtError;// We're done performing work. Time to clean up.
isPerformingWork=false;deadlineHasExpired=false;didFatal=false;firstUncaughtError=null;capturedErrors=null;failedBoundaries=null;nextRenderedTree=null;nestedUpdateCount=0;{stopWorkLoopTimer();}// It's safe to throw any unhandled errors.
if(errorToThrow!==null){throw errorToThrow;}}// Returns the boundary that captured the error, or null if the error is ignored
function captureError(failedWork,error){// It is no longer valid because we exited the user code.
ReactCurrentOwner$1.current=null;{ReactDebugCurrentFiber$3.resetCurrentFiber();}// Search for the nearest error boundary.
var boundary=null;// Passed to logCapturedError()
var errorBoundaryFound=false;var willRetry=false;var errorBoundaryName=null;// Host containers are a special case. If the failed work itself is a host
// container, then it acts as its own boundary. In all other cases, we
// ignore the work itself and only search through the parents.
if(failedWork.tag===HostRoot$6){boundary=failedWork;if(isFailedBoundary(failedWork)){// If this root already failed, there must have been an error when
// attempting to unmount it. This is a worst-case scenario and
// should only be possible if there's a bug in the renderer.
didFatal=true;}}else{var node=failedWork['return'];while(node!==null&&boundary===null){if(node.tag===ClassComponent$5){var instance=node.stateNode;if(typeof instance.componentDidCatch==='function'){errorBoundaryFound=true;errorBoundaryName=getComponentName_1(node);// Found an error boundary!
boundary=node;willRetry=true;}}else if(node.tag===HostRoot$6){// Treat the root like a no-op error boundary
boundary=node;}if(isFailedBoundary(node)){// This boundary is already in a failed state.
// If we're currently unmounting, that means this error was
// thrown while unmounting a failed subtree. We should ignore
// the error.
if(isUnmounting){return null;}// If we're in the commit phase, we should check to see if
// this boundary already captured an error during this commit.
// This case exists because multiple errors can be thrown during
// a single commit without interruption.
if(commitPhaseBoundaries!==null&&(commitPhaseBoundaries.has(node)||node.alternate!==null&&commitPhaseBoundaries.has(node.alternate))){// If so, we should ignore this error.
return null;}// The error should propagate to the next boundary -— we keep looking.
boundary=null;willRetry=false;}node=node['return'];}}if(boundary!==null){// Add to the collection of failed boundaries. This lets us know that
// subsequent errors in this subtree should propagate to the next boundary.
if(failedBoundaries===null){failedBoundaries=new Set();}failedBoundaries.add(boundary);// This method is unsafe outside of the begin and complete phases.
// We might be in the commit phase when an error is captured.
// The risk is that the return path from this Fiber may not be accurate.
// That risk is acceptable given the benefit of providing users more context.
var _componentStack=getStackAddendumByWorkInProgressFiber$2(failedWork);var _componentName=getComponentName_1(failedWork);// Add to the collection of captured errors. This is stored as a global
// map of errors and their component stack location keyed by the boundaries
// that capture them. We mostly use this Map as a Set; it's a Map only to
// avoid adding a field to Fiber to store the error.
if(capturedErrors===null){capturedErrors=new Map();}var capturedError={componentName:_componentName,componentStack:_componentStack,error:error,errorBoundary:errorBoundaryFound?boundary.stateNode:null,errorBoundaryFound:errorBoundaryFound,errorBoundaryName:errorBoundaryName,willRetry:willRetry};capturedErrors.set(boundary,capturedError);try{logCapturedError(capturedError);}catch(e){// Prevent cycle if logCapturedError() throws.
// A cycle may still occur if logCapturedError renders a component that throws.
console.error(e);}// If we're in the commit phase, defer scheduling an update on the
// boundary until after the commit is complete
if(isCommitting){if(commitPhaseBoundaries===null){commitPhaseBoundaries=new Set();}commitPhaseBoundaries.add(boundary);}else{// Otherwise, schedule an update now.
// TODO: Is this actually necessary during the render phase? Is it
// possible to unwind and continue rendering at the same priority,
// without corrupting internal state?
scheduleErrorRecovery(boundary);}return boundary;}else if(firstUncaughtError===null){// If no boundary is found, we'll need to throw the error
firstUncaughtError=error;}return null;}function hasCapturedError(fiber){// TODO: capturedErrors should store the boundary instance, to avoid needing
// to check the alternate.
return capturedErrors!==null&&(capturedErrors.has(fiber)||fiber.alternate!==null&&capturedErrors.has(fiber.alternate));}function isFailedBoundary(fiber){// TODO: failedBoundaries should store the boundary instance, to avoid
// needing to check the alternate.
return failedBoundaries!==null&&(failedBoundaries.has(fiber)||fiber.alternate!==null&&failedBoundaries.has(fiber.alternate));}function commitErrorHandling(effectfulFiber){var capturedError=void 0;if(capturedErrors!==null){capturedError=capturedErrors.get(effectfulFiber);capturedErrors['delete'](effectfulFiber);if(capturedError==null){if(effectfulFiber.alternate!==null){effectfulFiber=effectfulFiber.alternate;capturedError=capturedErrors.get(effectfulFiber);capturedErrors['delete'](effectfulFiber);}}}!(capturedError!=null)?invariant(false,'No error for given unit of work. This error is likely caused by a bug in React. Please file an issue.'):void 0;switch(effectfulFiber.tag){case ClassComponent$5:var instance=effectfulFiber.stateNode;var info={componentStack:capturedError.componentStack};// Allow the boundary to handle the error, usually by scheduling
// an update to itself
instance.componentDidCatch(capturedError.error,info);return;case HostRoot$6:if(firstUncaughtError===null){// If this is the host container, we treat it as a no-op error
// boundary. We'll throw the first uncaught error once it's safe to
// do so, at the end of the batch.
firstUncaughtError=capturedError.error;}return;default:invariant(false,'Invalid type of work. This error is likely caused by a bug in React. Please file an issue.');}}function unwindContexts(from,to){var node=from;while(node!==null){switch(node.tag){case ClassComponent$5:popContextProvider$1(node);break;case HostComponent$6:popHostContext(node);break;case HostRoot$6:popHostContainer(node);break;case HostPortal$3:popHostContainer(node);break;}if(node===to||node.alternate===to){{stopFailedWorkTimer(node);}break;}else{stopWorkTimer(node);}node=node['return'];}}function scheduleRoot(root,priorityLevel){if(priorityLevel===NoWork$2){return;}if(!root.isScheduled){root.isScheduled=true;if(lastScheduledRoot){// Schedule ourselves to the end.
lastScheduledRoot.nextScheduledRoot=root;lastScheduledRoot=root;}else{// We're the only work scheduled.
nextScheduledRoot=root;lastScheduledRoot=root;}}}function scheduleUpdate(fiber,priorityLevel){return scheduleUpdateImpl(fiber,priorityLevel,false);}function scheduleUpdateImpl(fiber,priorityLevel,isErrorRecovery){{recordScheduleUpdate();}if(nestedUpdateCount>NESTED_UPDATE_LIMIT){didFatal=true;invariant(false,'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.');}if(!isPerformingWork&&priorityLevel<=nextPriorityLevel){// We must reset the current unit of work pointer so that we restart the
// search from the root during the next tick, in case there is now higher
// priority work somewhere earlier than before.
nextUnitOfWork=null;}{if(!isErrorRecovery&&fiber.tag===ClassComponent$5){var instance=fiber.stateNode;warnAboutInvalidUpdates(instance);}}var node=fiber;var shouldContinue=true;while(node!==null&&shouldContinue){// Walk the parent path to the root and update each node's priority. Once
// we reach a node whose priority matches (and whose alternate's priority
// matches) we can exit safely knowing that the rest of the path is correct.
shouldContinue=false;if(node.pendingWorkPriority===NoWork$2||node.pendingWorkPriority>priorityLevel){// Priority did not match. Update and keep going.
shouldContinue=true;node.pendingWorkPriority=priorityLevel;}if(node.alternate!==null){if(node.alternate.pendingWorkPriority===NoWork$2||node.alternate.pendingWorkPriority>priorityLevel){// Priority did not match. Update and keep going.
shouldContinue=true;node.alternate.pendingWorkPriority=priorityLevel;}}if(node['return']===null){if(node.tag===HostRoot$6){var root=node.stateNode;scheduleRoot(root,priorityLevel);if(!isPerformingWork){switch(priorityLevel){case SynchronousPriority$1:// Perform this update now.
if(isUnbatchingUpdates){// We're inside unbatchedUpdates, which is inside either
// batchedUpdates or a lifecycle. We should only flush
// synchronous work, not task work.
performWork(SynchronousPriority$1,null);}else{// Flush both synchronous and task work.
performWork(TaskPriority$1,null);}break;case TaskPriority$1:!isBatchingUpdates?invariant(false,'Task updates can only be scheduled as a nested update or inside batchedUpdates.'):void 0;break;default:// Schedule a callback to perform the work later.
if(!isCallbackScheduled){scheduleDeferredCallback(performDeferredWork);isCallbackScheduled=true;}}}}else{{if(!isErrorRecovery&&fiber.tag===ClassComponent$5){warnAboutUpdateOnUnmounted(fiber.stateNode);}}return;}}node=node['return'];}}function getPriorityContext(fiber,forceAsync){var priorityLevel=priorityContext;if(priorityLevel===NoWork$2){if(!useSyncScheduling||fiber.internalContextTag&AsyncUpdates||forceAsync){priorityLevel=LowPriority;}else{priorityLevel=SynchronousPriority$1;}}// If we're in a batch, or if we're already performing work, downgrade sync
// priority to task priority
if(priorityLevel===SynchronousPriority$1&&(isPerformingWork||isBatchingUpdates)){return TaskPriority$1;}return priorityLevel;}function scheduleErrorRecovery(fiber){scheduleUpdateImpl(fiber,TaskPriority$1,true);}function batchedUpdates(fn,a){var previousIsBatchingUpdates=isBatchingUpdates;isBatchingUpdates=true;try{return fn(a);}finally{isBatchingUpdates=previousIsBatchingUpdates;// If we're not already inside a batch, we need to flush any task work
// that was created by the user-provided function.
if(!isPerformingWork&&!isBatchingUpdates){performWork(TaskPriority$1,null);}}}function unbatchedUpdates(fn){var previousIsUnbatchingUpdates=isUnbatchingUpdates;var previousIsBatchingUpdates=isBatchingUpdates;// This is only true if we're nested inside batchedUpdates.
isUnbatchingUpdates=isBatchingUpdates;isBatchingUpdates=false;try{return fn();}finally{isBatchingUpdates=previousIsBatchingUpdates;isUnbatchingUpdates=previousIsUnbatchingUpdates;}}function flushSync(batch){var previousIsBatchingUpdates=isBatchingUpdates;var previousPriorityContext=priorityContext;isBatchingUpdates=true;priorityContext=SynchronousPriority$1;try{return batch();}finally{isBatchingUpdates=previousIsBatchingUpdates;priorityContext=previousPriorityContext;!!isPerformingWork?invariant(false,'flushSync was called from inside a lifecycle method. It cannot be called when React is already rendering.'):void 0;performWork(TaskPriority$1,null);}}function deferredUpdates(fn){var previousPriorityContext=priorityContext;priorityContext=LowPriority;try{return fn();}finally{priorityContext=previousPriorityContext;}}return{scheduleUpdate:scheduleUpdate,getPriorityContext:getPriorityContext,batchedUpdates:batchedUpdates,unbatchedUpdates:unbatchedUpdates,flushSync:flushSync,deferredUpdates:deferredUpdates};};/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule getContextForSubtree
 * 
 */var getContextFiber=function getContextFiber(arg){invariant(false,'Missing injection for fiber getContextForSubtree');};function getContextForSubtree(parentComponent){if(!parentComponent){return emptyObject;}var instance=ReactInstanceMap_1.get(parentComponent);if(typeof instance.tag==='number'){return getContextFiber(instance);}else{return instance._processChildContext(instance._context);}}getContextForSubtree._injectFiber=function(fn){getContextFiber=fn;};var getContextForSubtree_1=getContextForSubtree;var addTopLevelUpdate=ReactFiberUpdateQueue.addTopLevelUpdate;var findCurrentUnmaskedContext=ReactFiberContext.findCurrentUnmaskedContext;var isContextProvider=ReactFiberContext.isContextProvider;var processChildContext=ReactFiberContext.processChildContext;var createFiberRoot=ReactFiberRoot.createFiberRoot;var HostComponent$3=ReactTypeOfWork.HostComponent;{var warning$18=require$$0;var ReactFiberInstrumentation=ReactFiberInstrumentation_1;var ReactDebugCurrentFiber$1=ReactDebugCurrentFiber_1;var getComponentName$4=getComponentName_1;}var findCurrentHostFiber$1=ReactFiberTreeReflection.findCurrentHostFiber;var findCurrentHostFiberWithNoPortals$1=ReactFiberTreeReflection.findCurrentHostFiberWithNoPortals;getContextForSubtree_1._injectFiber(function(fiber){var parentContext=findCurrentUnmaskedContext(fiber);return isContextProvider(fiber)?processChildContext(fiber,parentContext,false):parentContext;});var ReactFiberReconciler=function ReactFiberReconciler(config){var getPublicInstance=config.getPublicInstance;var _ReactFiberScheduler=ReactFiberScheduler(config),scheduleUpdate=_ReactFiberScheduler.scheduleUpdate,getPriorityContext=_ReactFiberScheduler.getPriorityContext,batchedUpdates=_ReactFiberScheduler.batchedUpdates,unbatchedUpdates=_ReactFiberScheduler.unbatchedUpdates,flushSync=_ReactFiberScheduler.flushSync,deferredUpdates=_ReactFiberScheduler.deferredUpdates;function scheduleTopLevelUpdate(current,element,callback){{if(ReactDebugCurrentFiber$1.phase==='render'&&ReactDebugCurrentFiber$1.current!==null){warning$18(false,'Render methods should be a pure function of props and state; '+'triggering nested component updates from render is not allowed. '+'If necessary, trigger nested updates in componentDidUpdate.\n\n'+'Check the render method of %s.',getComponentName$4(ReactDebugCurrentFiber$1.current)||'Unknown');}}// Check if the top-level element is an async wrapper component. If so, treat
// updates to the root as async. This is a bit weird but lets us avoid a separate
// `renderAsync` API.
var forceAsync=ReactFeatureFlags_1.enableAsyncSubtreeAPI&&element!=null&&element.type!=null&&element.type.prototype!=null&&element.type.prototype.unstable_isAsyncReactComponent===true;var priorityLevel=getPriorityContext(current,forceAsync);var nextState={element:element};callback=callback===undefined?null:callback;{warning$18(callback===null||typeof callback==='function','render(...): Expected the last optional `callback` argument to be a '+'function. Instead received: %s.',callback);}addTopLevelUpdate(current,nextState,callback,priorityLevel);scheduleUpdate(current,priorityLevel);}return{createContainer:function createContainer(containerInfo){return createFiberRoot(containerInfo);},updateContainer:function updateContainer(element,container,parentComponent,callback){// TODO: If this is a nested container, this won't be the root.
var current=container.current;{if(ReactFiberInstrumentation.debugTool){if(current.alternate===null){ReactFiberInstrumentation.debugTool.onMountContainer(container);}else if(element===null){ReactFiberInstrumentation.debugTool.onUnmountContainer(container);}else{ReactFiberInstrumentation.debugTool.onUpdateContainer(container);}}}var context=getContextForSubtree_1(parentComponent);if(container.context===null){container.context=context;}else{container.pendingContext=context;}scheduleTopLevelUpdate(current,element,callback);},batchedUpdates:batchedUpdates,unbatchedUpdates:unbatchedUpdates,deferredUpdates:deferredUpdates,flushSync:flushSync,getPublicRootInstance:function getPublicRootInstance(container){var containerFiber=container.current;if(!containerFiber.child){return null;}switch(containerFiber.child.tag){case HostComponent$3:return getPublicInstance(containerFiber.child.stateNode);default:return containerFiber.child.stateNode;}},findHostInstance:function findHostInstance(fiber){var hostFiber=findCurrentHostFiber$1(fiber);if(hostFiber===null){return null;}return hostFiber.stateNode;},findHostInstanceWithNoPortals:function findHostInstanceWithNoPortals(fiber){var hostFiber=findCurrentHostFiberWithNoPortals$1(fiber);if(hostFiber===null){return null;}return hostFiber.stateNode;}};};var TEXT_NODE$3=HTMLNodeType_1.TEXT_NODE;/**
 * Given any node return the first leaf node without children.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {DOMElement|DOMTextNode}
 */function getLeafNode(node){while(node&&node.firstChild){node=node.firstChild;}return node;}/**
 * Get the next sibling within a container. This will walk up the
 * DOM if a node's siblings have been exhausted.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {?DOMElement|DOMTextNode}
 */function getSiblingNode(node){while(node){if(node.nextSibling){return node.nextSibling;}node=node.parentNode;}}/**
 * Get object describing the nodes which contain characters at offset.
 *
 * @param {DOMElement|DOMTextNode} root
 * @param {number} offset
 * @return {?object}
 */function getNodeForCharacterOffset(root,offset){var node=getLeafNode(root);var nodeStart=0;var nodeEnd=0;while(node){if(node.nodeType===TEXT_NODE$3){nodeEnd=nodeStart+node.textContent.length;if(nodeStart<=offset&&nodeEnd>=offset){return{node:node,offset:offset-nodeStart};}nodeStart=nodeEnd;}node=getLeafNode(getSiblingNode(node));}}var getNodeForCharacterOffset_1=getNodeForCharacterOffset;var contentKey=null;/**
 * Gets the key used to access text content on a DOM node.
 *
 * @return {?string} Key used to access text content.
 * @internal
 */function getTextContentAccessor(){if(!contentKey&&ExecutionEnvironment.canUseDOM){// Prefer textContent to innerText because many browsers support both but
// SVG <text> elements don't support innerText even when <div> does.
contentKey='textContent'in document.documentElement?'textContent':'innerText';}return contentKey;}var getTextContentAccessor_1=getTextContentAccessor;/**
 * While `isCollapsed` is available on the Selection object and `collapsed`
 * is available on the Range object, IE11 sometimes gets them wrong.
 * If the anchor/focus nodes and offsets are the same, the range is collapsed.
 */function isCollapsed(anchorNode,anchorOffset,focusNode$$1,focusOffset){return anchorNode===focusNode$$1&&anchorOffset===focusOffset;}/**
 * @param {DOMElement} node
 * @return {?object}
 */function getModernOffsets(node){var selection=window.getSelection&&window.getSelection();if(!selection||selection.rangeCount===0){return null;}var anchorNode=selection.anchorNode;var anchorOffset=selection.anchorOffset;var focusNode$$1=selection.focusNode;var focusOffset=selection.focusOffset;var currentRange=selection.getRangeAt(0);// In Firefox, range.startContainer and range.endContainer can be "anonymous
// divs", e.g. the up/down buttons on an <input type="number">. Anonymous
// divs do not seem to expose properties, triggering a "Permission denied
// error" if any of its properties are accessed. The only seemingly possible
// way to avoid erroring is to access a property that typically works for
// non-anonymous divs and catch any error that may otherwise arise. See
// https://bugzilla.mozilla.org/show_bug.cgi?id=208427
try{/* eslint-disable no-unused-expressions */currentRange.startContainer.nodeType;currentRange.endContainer.nodeType;/* eslint-enable no-unused-expressions */}catch(e){return null;}// If the node and offset values are the same, the selection is collapsed.
// `Selection.isCollapsed` is available natively, but IE sometimes gets
// this value wrong.
var isSelectionCollapsed=isCollapsed(selection.anchorNode,selection.anchorOffset,selection.focusNode,selection.focusOffset);var rangeLength=isSelectionCollapsed?0:currentRange.toString().length;var tempRange=currentRange.cloneRange();tempRange.selectNodeContents(node);tempRange.setEnd(currentRange.startContainer,currentRange.startOffset);var isTempRangeCollapsed=isCollapsed(tempRange.startContainer,tempRange.startOffset,tempRange.endContainer,tempRange.endOffset);var start=isTempRangeCollapsed?0:tempRange.toString().length;var end=start+rangeLength;// Detect whether the selection is backward.
var detectionRange=document.createRange();detectionRange.setStart(anchorNode,anchorOffset);detectionRange.setEnd(focusNode$$1,focusOffset);var isBackward=detectionRange.collapsed;return{start:isBackward?end:start,end:isBackward?start:end};}/**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programmatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 *
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */function setModernOffsets(node,offsets){if(!window.getSelection){return;}var selection=window.getSelection();var length=node[getTextContentAccessor_1()].length;var start=Math.min(offsets.start,length);var end=offsets.end===undefined?start:Math.min(offsets.end,length);// IE 11 uses modern selection, but doesn't support the extend method.
// Flip backward selections, so we can set with a single range.
if(!selection.extend&&start>end){var temp=end;end=start;start=temp;}var startMarker=getNodeForCharacterOffset_1(node,start);var endMarker=getNodeForCharacterOffset_1(node,end);if(startMarker&&endMarker){var range=document.createRange();range.setStart(startMarker.node,startMarker.offset);selection.removeAllRanges();if(start>end){selection.addRange(range);selection.extend(endMarker.node,endMarker.offset);}else{range.setEnd(endMarker.node,endMarker.offset);selection.addRange(range);}}}var ReactDOMSelection={/**
   * @param {DOMElement} node
   */getOffsets:getModernOffsets,/**
   * @param {DOMElement|DOMTextNode} node
   * @param {object} offsets
   */setOffsets:setModernOffsets};var ReactDOMSelection_1=ReactDOMSelection;var ELEMENT_NODE$2=HTMLNodeType_1.ELEMENT_NODE;function isInDocument(node){return containsNode(document.documentElement,node);}/**
 * @ReactInputSelection: React input selection module. Based on Selection.js,
 * but modified to be suitable for react and has a couple of bug fixes (doesn't
 * assume buttons have range selections allowed).
 * Input selection module for React.
 */var ReactInputSelection={hasSelectionCapabilities:function hasSelectionCapabilities(elem){var nodeName=elem&&elem.nodeName&&elem.nodeName.toLowerCase();return nodeName&&(nodeName==='input'&&elem.type==='text'||nodeName==='textarea'||elem.contentEditable==='true');},getSelectionInformation:function getSelectionInformation(){var focusedElem=getActiveElement();return{focusedElem:focusedElem,selectionRange:ReactInputSelection.hasSelectionCapabilities(focusedElem)?ReactInputSelection.getSelection(focusedElem):null};},/**
   * @restoreSelection: If any selection information was potentially lost,
   * restore it. This is useful when performing operations that could remove dom
   * nodes and place them back in, resulting in focus being lost.
   */restoreSelection:function restoreSelection(priorSelectionInformation){var curFocusedElem=getActiveElement();var priorFocusedElem=priorSelectionInformation.focusedElem;var priorSelectionRange=priorSelectionInformation.selectionRange;if(curFocusedElem!==priorFocusedElem&&isInDocument(priorFocusedElem)){if(ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)){ReactInputSelection.setSelection(priorFocusedElem,priorSelectionRange);}// Focusing a node can change the scroll position, which is undesirable
var ancestors=[];var ancestor=priorFocusedElem;while(ancestor=ancestor.parentNode){if(ancestor.nodeType===ELEMENT_NODE$2){ancestors.push({element:ancestor,left:ancestor.scrollLeft,top:ancestor.scrollTop});}}focusNode(priorFocusedElem);for(var i=0;i<ancestors.length;i++){var info=ancestors[i];info.element.scrollLeft=info.left;info.element.scrollTop=info.top;}}},/**
   * @getSelection: Gets the selection bounds of a focused textarea, input or
   * contentEditable node.
   * -@input: Look up selection bounds of this input
   * -@return {start: selectionStart, end: selectionEnd}
   */getSelection:function getSelection(input){var selection;if('selectionStart'in input){// Modern browser with input or textarea.
selection={start:input.selectionStart,end:input.selectionEnd};}else{// Content editable or old IE textarea.
selection=ReactDOMSelection_1.getOffsets(input);}return selection||{start:0,end:0};},/**
   * @setSelection: Sets the selection bounds of a textarea or input and focuses
   * the input.
   * -@input     Set selection bounds of this input or textarea
   * -@offsets   Object of same form that is returned from get*
   */setSelection:function setSelection(input,offsets){var start=offsets.start;var end=offsets.end;if(end===undefined){end=start;}if('selectionStart'in input){input.selectionStart=start;input.selectionEnd=Math.min(end,input.value.length);}else{ReactDOMSelection_1.setOffsets(input,offsets);}}};var ReactInputSelection_1=ReactInputSelection;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactVersion
 */var ReactVersion='16.0.0';/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule findDOMNode
 * 
 */var ELEMENT_NODE$3=HTMLNodeType_1.ELEMENT_NODE;var ReactCurrentOwner$3=ReactGlobalSharedState_1.ReactCurrentOwner;{var warning$27=require$$0;}var findFiber=function findFiber(arg){invariant(false,'Missing injection for fiber findDOMNode');};var findStack=function findStack(arg){invariant(false,'Missing injection for stack findDOMNode');};var findDOMNode=function findDOMNode(componentOrElement){{var owner=ReactCurrentOwner$3.current;if(owner!==null){var isFiber=typeof owner.tag==='number';var warnedAboutRefsInRender=isFiber?owner.stateNode._warnedAboutRefsInRender:owner._warnedAboutRefsInRender;warning$27(warnedAboutRefsInRender,'%s is accessing findDOMNode inside its render(). '+'render() should be a pure function of props and state. It should '+'never access something that requires stale data from the previous '+'render, such as refs. Move this logic to componentDidMount and '+'componentDidUpdate instead.',getComponentName_1(owner)||'A component');if(isFiber){owner.stateNode._warnedAboutRefsInRender=true;}else{owner._warnedAboutRefsInRender=true;}}}if(componentOrElement==null){return null;}if(componentOrElement.nodeType===ELEMENT_NODE$3){return componentOrElement;}var inst=ReactInstanceMap_1.get(componentOrElement);if(inst){if(typeof inst.tag==='number'){return findFiber(inst);}else{return findStack(inst);}}if(typeof componentOrElement.render==='function'){invariant(false,'Unable to find node on an unmounted component.');}else{invariant(false,'Element appears to be neither ReactComponent nor DOMNode. Keys: %s',Object.keys(componentOrElement));}};findDOMNode._injectFiber=function(fn){findFiber=fn;};findDOMNode._injectStack=function(fn){findStack=fn;};var findDOMNode_1=findDOMNode;/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule lowPriorityWarning
 *//**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */var lowPriorityWarning$1=function lowPriorityWarning$1(){};{var printWarning=function printWarning(format){for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}var argIndex=0;var message='Warning: '+format.replace(/%s/g,function(){return args[argIndex++];});if(typeof console!=='undefined'){console.warn(message);}try{// --- Welcome to debugging React ---
// This error was thrown as a convenience so that you can use this stack
// to find the callsite that caused this warning to fire.
throw new Error(message);}catch(x){}};lowPriorityWarning$1=function lowPriorityWarning$1(condition,format){if(format===undefined){throw new Error('`warning(condition, format, ...args)` requires a warning '+'message argument');}if(!condition){for(var _len2=arguments.length,args=Array(_len2>2?_len2-2:0),_key2=2;_key2<_len2;_key2++){args[_key2-2]=arguments[_key2];}printWarning.apply(undefined,[format].concat(args));}};}var lowPriorityWarning_1=lowPriorityWarning$1;var validateDOMNesting$1=emptyFunction;{var warning$28=require$$0;var _require$13=ReactDebugCurrentFiber_1,getCurrentFiberStackAddendum$6=_require$13.getCurrentFiberStackAddendum;// This validation code was written based on the HTML5 parsing spec:
// https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
//
// Note: this does not catch all invalid nesting, nor does it try to (as it's
// not clear what practical benefit doing so provides); instead, we warn only
// for cases where the parser will give a parse tree differing from what React
// intended. For example, <b><div></div></b> is invalid but we don't warn
// because it still parses correctly; we do warn for other cases like nested
// <p> tags where the beginning of the second element implicitly closes the
// first, causing a confusing mess.
// https://html.spec.whatwg.org/multipage/syntax.html#special
var specialTags=['address','applet','area','article','aside','base','basefont','bgsound','blockquote','body','br','button','caption','center','col','colgroup','dd','details','dir','div','dl','dt','embed','fieldset','figcaption','figure','footer','form','frame','frameset','h1','h2','h3','h4','h5','h6','head','header','hgroup','hr','html','iframe','img','input','isindex','li','link','listing','main','marquee','menu','menuitem','meta','nav','noembed','noframes','noscript','object','ol','p','param','plaintext','pre','script','section','select','source','style','summary','table','tbody','td','template','textarea','tfoot','th','thead','title','tr','track','ul','wbr','xmp'];// https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
var inScopeTags=['applet','caption','html','table','td','th','marquee','object','template',// https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
// TODO: Distinguish by namespace here -- for <title>, including it here
// errs on the side of fewer warnings
'foreignObject','desc','title'];// https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-button-scope
var buttonScopeTags=inScopeTags.concat(['button']);// https://html.spec.whatwg.org/multipage/syntax.html#generate-implied-end-tags
var impliedEndTags=['dd','dt','li','option','optgroup','p','rp','rt'];var emptyAncestorInfo={current:null,formTag:null,aTagInScope:null,buttonTagInScope:null,nobrTagInScope:null,pTagInButtonScope:null,listItemTagAutoclosing:null,dlItemTagAutoclosing:null};var updatedAncestorInfo$1=function updatedAncestorInfo$1(oldInfo,tag,instance){var ancestorInfo=_assign({},oldInfo||emptyAncestorInfo);var info={tag:tag,instance:instance};if(inScopeTags.indexOf(tag)!==-1){ancestorInfo.aTagInScope=null;ancestorInfo.buttonTagInScope=null;ancestorInfo.nobrTagInScope=null;}if(buttonScopeTags.indexOf(tag)!==-1){ancestorInfo.pTagInButtonScope=null;}// See rules for 'li', 'dd', 'dt' start tags in
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
if(specialTags.indexOf(tag)!==-1&&tag!=='address'&&tag!=='div'&&tag!=='p'){ancestorInfo.listItemTagAutoclosing=null;ancestorInfo.dlItemTagAutoclosing=null;}ancestorInfo.current=info;if(tag==='form'){ancestorInfo.formTag=info;}if(tag==='a'){ancestorInfo.aTagInScope=info;}if(tag==='button'){ancestorInfo.buttonTagInScope=info;}if(tag==='nobr'){ancestorInfo.nobrTagInScope=info;}if(tag==='p'){ancestorInfo.pTagInButtonScope=info;}if(tag==='li'){ancestorInfo.listItemTagAutoclosing=info;}if(tag==='dd'||tag==='dt'){ancestorInfo.dlItemTagAutoclosing=info;}return ancestorInfo;};/**
   * Returns whether
   */var isTagValidWithParent=function isTagValidWithParent(tag,parentTag){// First, let's check if we're in an unusual parsing mode...
switch(parentTag){// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
case'select':return tag==='option'||tag==='optgroup'||tag==='#text';case'optgroup':return tag==='option'||tag==='#text';// Strictly speaking, seeing an <option> doesn't mean we're in a <select>
// but
case'option':return tag==='#text';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
// No special behavior since these rules fall back to "in body" mode for
// all except special table nodes which cause bad parsing behavior anyway.
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
case'tr':return tag==='th'||tag==='td'||tag==='style'||tag==='script'||tag==='template';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
case'tbody':case'thead':case'tfoot':return tag==='tr'||tag==='style'||tag==='script'||tag==='template';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
case'colgroup':return tag==='col'||tag==='template';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
case'table':return tag==='caption'||tag==='colgroup'||tag==='tbody'||tag==='tfoot'||tag==='thead'||tag==='style'||tag==='script'||tag==='template';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
case'head':return tag==='base'||tag==='basefont'||tag==='bgsound'||tag==='link'||tag==='meta'||tag==='title'||tag==='noscript'||tag==='noframes'||tag==='style'||tag==='script'||tag==='template';// https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
case'html':return tag==='head'||tag==='body';case'#document':return tag==='html';}// Probably in the "in body" parsing mode, so we outlaw only tag combos
// where the parsing rules cause implicit opens or closes to be added.
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
switch(tag){case'h1':case'h2':case'h3':case'h4':case'h5':case'h6':return parentTag!=='h1'&&parentTag!=='h2'&&parentTag!=='h3'&&parentTag!=='h4'&&parentTag!=='h5'&&parentTag!=='h6';case'rp':case'rt':return impliedEndTags.indexOf(parentTag)===-1;case'body':case'caption':case'col':case'colgroup':case'frame':case'head':case'html':case'tbody':case'td':case'tfoot':case'th':case'thead':case'tr':// These tags are only valid with a few parents that have special child
// parsing rules -- if we're down here, then none of those matched and
// so we allow it only if we don't know what the parent is, as all other
// cases are invalid.
return parentTag==null;}return true;};/**
   * Returns whether
   */var findInvalidAncestorForTag=function findInvalidAncestorForTag(tag,ancestorInfo){switch(tag){case'address':case'article':case'aside':case'blockquote':case'center':case'details':case'dialog':case'dir':case'div':case'dl':case'fieldset':case'figcaption':case'figure':case'footer':case'header':case'hgroup':case'main':case'menu':case'nav':case'ol':case'p':case'section':case'summary':case'ul':case'pre':case'listing':case'table':case'hr':case'xmp':case'h1':case'h2':case'h3':case'h4':case'h5':case'h6':return ancestorInfo.pTagInButtonScope;case'form':return ancestorInfo.formTag||ancestorInfo.pTagInButtonScope;case'li':return ancestorInfo.listItemTagAutoclosing;case'dd':case'dt':return ancestorInfo.dlItemTagAutoclosing;case'button':return ancestorInfo.buttonTagInScope;case'a':// Spec says something about storing a list of markers, but it sounds
// equivalent to this check.
return ancestorInfo.aTagInScope;case'nobr':return ancestorInfo.nobrTagInScope;}return null;};/**
   * Given a ReactCompositeComponent instance, return a list of its recursive
   * owners, starting at the root and ending with the instance itself.
   */var findOwnerStack=function findOwnerStack(instance){if(!instance){return[];}var stack=[];do{stack.push(instance);}while(instance=instance._currentElement._owner);stack.reverse();return stack;};var getOwnerInfo=function getOwnerInfo(childInstance,childTag,ancestorInstance,ancestorTag,isParent){var childOwner=childInstance&&childInstance._currentElement._owner;var ancestorOwner=ancestorInstance&&ancestorInstance._currentElement._owner;var childOwners=findOwnerStack(childOwner);var ancestorOwners=findOwnerStack(ancestorOwner);var minStackLen=Math.min(childOwners.length,ancestorOwners.length);var i;var deepestCommon=-1;for(i=0;i<minStackLen;i++){if(childOwners[i]===ancestorOwners[i]){deepestCommon=i;}else{break;}}var UNKNOWN='(unknown)';var childOwnerNames=childOwners.slice(deepestCommon+1).map(function(inst){return getComponentName_1(inst)||UNKNOWN;});var ancestorOwnerNames=ancestorOwners.slice(deepestCommon+1).map(function(inst){return getComponentName_1(inst)||UNKNOWN;});var ownerInfo=[].concat(// If the parent and child instances have a common owner ancestor, start
// with that -- otherwise we just start with the parent's owners.
deepestCommon!==-1?getComponentName_1(childOwners[deepestCommon])||UNKNOWN:[],ancestorOwnerNames,ancestorTag,// If we're warning about an invalid (non-parent) ancestry, add '...'
isParent?[]:['...'],childOwnerNames,childTag).join(' > ');return ownerInfo;};var didWarn={};validateDOMNesting$1=function validateDOMNesting$1(childTag,childText,childInstance,ancestorInfo){ancestorInfo=ancestorInfo||emptyAncestorInfo;var parentInfo=ancestorInfo.current;var parentTag=parentInfo&&parentInfo.tag;if(childText!=null){warning$28(childTag==null,'validateDOMNesting: when childText is passed, childTag should be null');childTag='#text';}var invalidParent=isTagValidWithParent(childTag,parentTag)?null:parentInfo;var invalidAncestor=invalidParent?null:findInvalidAncestorForTag(childTag,ancestorInfo);var invalidParentOrAncestor=invalidParent||invalidAncestor;if(!invalidParentOrAncestor){return;}var ancestorInstance=invalidParentOrAncestor.instance;var ancestorTag=invalidParentOrAncestor.tag;var addendum;if(childInstance!=null){addendum=' See '+getOwnerInfo(childInstance,childTag,ancestorInstance,ancestorTag,!!invalidParent)+'.';}else{addendum=getCurrentFiberStackAddendum$6();}var warnKey=!!invalidParent+'|'+childTag+'|'+ancestorTag+'|'+addendum;if(didWarn[warnKey]){return;}didWarn[warnKey]=true;var tagDisplayName=childTag;var whitespaceInfo='';if(childTag==='#text'){if(/\S/.test(childText)){tagDisplayName='Text nodes';}else{tagDisplayName='Whitespace text nodes';whitespaceInfo=" Make sure you don't have any extra whitespace between tags on "+'each line of your source code.';}}else{tagDisplayName='<'+childTag+'>';}if(invalidParent){var info='';if(ancestorTag==='table'&&childTag==='tr'){info+=' Add a <tbody> to your code to match the DOM tree generated by '+'the browser.';}warning$28(false,'validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s%s',tagDisplayName,ancestorTag,whitespaceInfo,info,addendum);}else{warning$28(false,'validateDOMNesting(...): %s cannot appear as a descendant of '+'<%s>.%s',tagDisplayName,ancestorTag,addendum);}};validateDOMNesting$1.updatedAncestorInfo=updatedAncestorInfo$1;// For testing
validateDOMNesting$1.isTagValidInContext=function(tag,ancestorInfo){ancestorInfo=ancestorInfo||emptyAncestorInfo;var parentInfo=ancestorInfo.current;var parentTag=parentInfo&&parentInfo.tag;return isTagValidWithParent(tag,parentTag)&&!findInvalidAncestorForTag(tag,ancestorInfo);};}var validateDOMNesting_1=validateDOMNesting$1;var HostComponent$11=ReactTypeOfWork.HostComponent;function getParent(inst){if(inst._hostParent!==undefined){return inst._hostParent;}if(typeof inst.tag==='number'){do{inst=inst['return'];// TODO: If this is a HostRoot we might want to bail out.
// That is depending on if we want nested subtrees (layers) to bubble
// events to their parent. We could also go through parentNode on the
// host node but that wouldn't work for React Native and doesn't let us
// do the portal feature.
}while(inst&&inst.tag!==HostComponent$11);if(inst){return inst;}}return null;}/**
 * Return the lowest common ancestor of A and B, or null if they are in
 * different trees.
 */function getLowestCommonAncestor(instA,instB){var depthA=0;for(var tempA=instA;tempA;tempA=getParent(tempA)){depthA++;}var depthB=0;for(var tempB=instB;tempB;tempB=getParent(tempB)){depthB++;}// If A is deeper, crawl up.
while(depthA-depthB>0){instA=getParent(instA);depthA--;}// If B is deeper, crawl up.
while(depthB-depthA>0){instB=getParent(instB);depthB--;}// Walk in lockstep until we find a match.
var depth=depthA;while(depth--){if(instA===instB||instA===instB.alternate){return instA;}instA=getParent(instA);instB=getParent(instB);}return null;}/**
 * Return if A is an ancestor of B.
 */function isAncestor(instA,instB){while(instB){if(instA===instB||instA===instB.alternate){return true;}instB=getParent(instB);}return false;}/**
 * Return the parent instance of the passed-in instance.
 */function getParentInstance(inst){return getParent(inst);}/**
 * Simulates the traversal of a two-phase, capture/bubble event dispatch.
 */function traverseTwoPhase(inst,fn,arg){var path=[];while(inst){path.push(inst);inst=getParent(inst);}var i;for(i=path.length;i-->0;){fn(path[i],'captured',arg);}for(i=0;i<path.length;i++){fn(path[i],'bubbled',arg);}}/**
 * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
 * should would receive a `mouseEnter` or `mouseLeave` event.
 *
 * Does not invoke the callback on the nearest common ancestor because nothing
 * "entered" or "left" that element.
 */function traverseEnterLeave(from,to,fn,argFrom,argTo){var common=from&&to?getLowestCommonAncestor(from,to):null;var pathFrom=[];while(from&&from!==common){pathFrom.push(from);from=getParent(from);}var pathTo=[];while(to&&to!==common){pathTo.push(to);to=getParent(to);}var i;for(i=0;i<pathFrom.length;i++){fn(pathFrom[i],'bubbled',argFrom);}for(i=pathTo.length;i-->0;){fn(pathTo[i],'captured',argTo);}}var ReactTreeTraversal={isAncestor:isAncestor,getLowestCommonAncestor:getLowestCommonAncestor,getParentInstance:getParentInstance,traverseTwoPhase:traverseTwoPhase,traverseEnterLeave:traverseEnterLeave};var getListener=EventPluginHub_1.getListener;{var warning$29=require$$0;}/**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */function listenerAtPhase(inst,event,propagationPhase){var registrationName=event.dispatchConfig.phasedRegistrationNames[propagationPhase];return getListener(inst,registrationName);}/**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */function accumulateDirectionalDispatches(inst,phase,event){{warning$29(inst,'Dispatching inst must not be null');}var listener=listenerAtPhase(inst,event,phase);if(listener){event._dispatchListeners=accumulateInto_1(event._dispatchListeners,listener);event._dispatchInstances=accumulateInto_1(event._dispatchInstances,inst);}}/**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We cannot perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */function accumulateTwoPhaseDispatchesSingle(event){if(event&&event.dispatchConfig.phasedRegistrationNames){ReactTreeTraversal.traverseTwoPhase(event._targetInst,accumulateDirectionalDispatches,event);}}/**
 * Same as `accumulateTwoPhaseDispatchesSingle`, but skips over the targetID.
 */function accumulateTwoPhaseDispatchesSingleSkipTarget(event){if(event&&event.dispatchConfig.phasedRegistrationNames){var targetInst=event._targetInst;var parentInst=targetInst?ReactTreeTraversal.getParentInstance(targetInst):null;ReactTreeTraversal.traverseTwoPhase(parentInst,accumulateDirectionalDispatches,event);}}/**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */function accumulateDispatches(inst,ignoredDirection,event){if(inst&&event&&event.dispatchConfig.registrationName){var registrationName=event.dispatchConfig.registrationName;var listener=getListener(inst,registrationName);if(listener){event._dispatchListeners=accumulateInto_1(event._dispatchListeners,listener);event._dispatchInstances=accumulateInto_1(event._dispatchInstances,inst);}}}/**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */function accumulateDirectDispatchesSingle(event){if(event&&event.dispatchConfig.registrationName){accumulateDispatches(event._targetInst,null,event);}}function accumulateTwoPhaseDispatches(events){forEachAccumulated_1(events,accumulateTwoPhaseDispatchesSingle);}function accumulateTwoPhaseDispatchesSkipTarget(events){forEachAccumulated_1(events,accumulateTwoPhaseDispatchesSingleSkipTarget);}function accumulateEnterLeaveDispatches(leave,enter,from,to){ReactTreeTraversal.traverseEnterLeave(from,to,accumulateDispatches,leave,enter);}function accumulateDirectDispatches(events){forEachAccumulated_1(events,accumulateDirectDispatchesSingle);}/**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing even a
 * single one.
 *
 * @constructor EventPropagators
 */var EventPropagators={accumulateTwoPhaseDispatches:accumulateTwoPhaseDispatches,accumulateTwoPhaseDispatchesSkipTarget:accumulateTwoPhaseDispatchesSkipTarget,accumulateDirectDispatches:accumulateDirectDispatches,accumulateEnterLeaveDispatches:accumulateEnterLeaveDispatches};var EventPropagators_1=EventPropagators;/**
 * This helper object stores information about text content of a target node,
 * allowing comparison of content before and after a given event.
 *
 * Identify the node where selection currently begins, then observe
 * both its text content and its current position in the DOM. Since the
 * browser may natively replace the target node during composition, we can
 * use its position to find its replacement.
 * 
 *
 */var compositionState={_root:null,_startText:null,_fallbackText:null};var FallbackCompositionState={initialize:function initialize(nativeEventTarget){compositionState._root=nativeEventTarget;compositionState._startText=FallbackCompositionState.getText();return true;},reset:function reset(){compositionState._root=null;compositionState._startText=null;compositionState._fallbackText=null;},getData:function getData(){if(compositionState._fallbackText){return compositionState._fallbackText;}var start;var startValue=compositionState._startText;var startLength=startValue.length;var end;var endValue=FallbackCompositionState.getText();var endLength=endValue.length;for(start=0;start<startLength;start++){if(startValue[start]!==endValue[start]){break;}}var minEnd=startLength-start;for(end=1;end<=minEnd;end++){if(startValue[startLength-end]!==endValue[endLength-end]){break;}}var sliceTail=end>1?1-end:undefined;compositionState._fallbackText=endValue.slice(start,sliceTail);return compositionState._fallbackText;},getText:function getText(){if('value'in compositionState._root){return compositionState._root.value;}return compositionState._root[getTextContentAccessor_1()];}};var FallbackCompositionState_1=FallbackCompositionState;var didWarnForAddedNewProperty=false;var isProxySupported=typeof Proxy==='function';var EVENT_POOL_SIZE=10;{var warning$30=require$$0;}var shouldBeReleasedProperties=['dispatchConfig','_targetInst','nativeEvent','isDefaultPrevented','isPropagationStopped','_dispatchListeners','_dispatchInstances'];/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var EventInterface={type:null,target:null,// currentTarget is set when dispatching; no use in copying it here
currentTarget:emptyFunction.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function timeStamp(event){return event.timeStamp||Date.now();},defaultPrevented:null,isTrusted:null};/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {*} targetInst Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @param {DOMEventTarget} nativeEventTarget Target node.
 */function SyntheticEvent(dispatchConfig,targetInst,nativeEvent,nativeEventTarget){{// these have a getter/setter for warnings
delete this.nativeEvent;delete this.preventDefault;delete this.stopPropagation;}this.dispatchConfig=dispatchConfig;this._targetInst=targetInst;this.nativeEvent=nativeEvent;var Interface=this.constructor.Interface;for(var propName in Interface){if(!Interface.hasOwnProperty(propName)){continue;}{delete this[propName];// this has a getter/setter for warnings
}var normalize=Interface[propName];if(normalize){this[propName]=normalize(nativeEvent);}else{if(propName==='target'){this.target=nativeEventTarget;}else{this[propName]=nativeEvent[propName];}}}var defaultPrevented=nativeEvent.defaultPrevented!=null?nativeEvent.defaultPrevented:nativeEvent.returnValue===false;if(defaultPrevented){this.isDefaultPrevented=emptyFunction.thatReturnsTrue;}else{this.isDefaultPrevented=emptyFunction.thatReturnsFalse;}this.isPropagationStopped=emptyFunction.thatReturnsFalse;return this;}_assign(SyntheticEvent.prototype,{preventDefault:function preventDefault(){this.defaultPrevented=true;var event=this.nativeEvent;if(!event){return;}if(event.preventDefault){event.preventDefault();}else if(typeof event.returnValue!=='unknown'){event.returnValue=false;}this.isDefaultPrevented=emptyFunction.thatReturnsTrue;},stopPropagation:function stopPropagation(){var event=this.nativeEvent;if(!event){return;}if(event.stopPropagation){event.stopPropagation();}else if(typeof event.cancelBubble!=='unknown'){// The ChangeEventPlugin registers a "propertychange" event for
// IE. This event does not support bubbling or cancelling, and
// any references to cancelBubble throw "Member not found".  A
// typeof check of "unknown" circumvents this issue (and is also
// IE specific).
event.cancelBubble=true;}this.isPropagationStopped=emptyFunction.thatReturnsTrue;},/**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */persist:function persist(){this.isPersistent=emptyFunction.thatReturnsTrue;},/**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */isPersistent:emptyFunction.thatReturnsFalse,/**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */destructor:function destructor(){var Interface=this.constructor.Interface;for(var propName in Interface){{Object.defineProperty(this,propName,getPooledWarningPropertyDefinition(propName,Interface[propName]));}}for(var i=0;i<shouldBeReleasedProperties.length;i++){this[shouldBeReleasedProperties[i]]=null;}{Object.defineProperty(this,'nativeEvent',getPooledWarningPropertyDefinition('nativeEvent',null));Object.defineProperty(this,'preventDefault',getPooledWarningPropertyDefinition('preventDefault',emptyFunction));Object.defineProperty(this,'stopPropagation',getPooledWarningPropertyDefinition('stopPropagation',emptyFunction));}}});SyntheticEvent.Interface=EventInterface;/**
 * Helper to reduce boilerplate when creating subclasses.
 *
 * @param {function} Class
 * @param {?object} Interface
 */SyntheticEvent.augmentClass=function(Class,Interface){var Super=this;var E=function E(){};E.prototype=Super.prototype;var prototype=new E();_assign(prototype,Class.prototype);Class.prototype=prototype;Class.prototype.constructor=Class;Class.Interface=_assign({},Super.Interface,Interface);Class.augmentClass=Super.augmentClass;addEventPoolingTo(Class);};/** Proxying after everything set on SyntheticEvent
  * to resolve Proxy issue on some WebKit browsers
  * in which some Event properties are set to undefined (GH#10010)
  */{if(isProxySupported){/*eslint-disable no-func-assign */SyntheticEvent=new Proxy(SyntheticEvent,{construct:function construct(target,args){return this.apply(target,Object.create(target.prototype),args);},apply:function apply(constructor,that,args){return new Proxy(constructor.apply(that,args),{set:function set(target,prop,value){if(prop!=='isPersistent'&&!target.constructor.Interface.hasOwnProperty(prop)&&shouldBeReleasedProperties.indexOf(prop)===-1){warning$30(didWarnForAddedNewProperty||target.isPersistent(),"This synthetic event is reused for performance reasons. If you're "+"seeing this, you're adding a new property in the synthetic event object. "+'The property is never released. See '+'https://fb.me/react-event-pooling for more information.');didWarnForAddedNewProperty=true;}target[prop]=value;return true;}});}});/*eslint-enable no-func-assign */}}addEventPoolingTo(SyntheticEvent);var SyntheticEvent_1=SyntheticEvent;/**
  * Helper to nullify syntheticEvent instance properties when destructing
  *
  * @param {String} propName
  * @param {?object} getVal
  * @return {object} defineProperty object
  */function getPooledWarningPropertyDefinition(propName,getVal){var isFunction=typeof getVal==='function';return{configurable:true,set:set,get:get};function set(val){var action=isFunction?'setting the method':'setting the property';warn(action,'This is effectively a no-op');return val;}function get(){var action=isFunction?'accessing the method':'accessing the property';var result=isFunction?'This is a no-op function':'This is set to null';warn(action,result);return getVal;}function warn(action,result){var warningCondition=false;warning$30(warningCondition,"This synthetic event is reused for performance reasons. If you're seeing this, "+"you're %s `%s` on a released/nullified synthetic event. %s. "+'If you must keep the original synthetic event around, use event.persist(). '+'See https://fb.me/react-event-pooling for more information.',action,propName,result);}}function getPooledEvent(dispatchConfig,targetInst,nativeEvent,nativeInst){var EventConstructor=this;if(EventConstructor.eventPool.length){var instance=EventConstructor.eventPool.pop();EventConstructor.call(instance,dispatchConfig,targetInst,nativeEvent,nativeInst);return instance;}return new EventConstructor(dispatchConfig,targetInst,nativeEvent,nativeInst);}function releasePooledEvent(event){var EventConstructor=this;!(event instanceof EventConstructor)?invariant(false,'Trying to release an event instance  into a pool of a different type.'):void 0;event.destructor();if(EventConstructor.eventPool.length<EVENT_POOL_SIZE){EventConstructor.eventPool.push(event);}}function addEventPoolingTo(EventConstructor){EventConstructor.eventPool=[];EventConstructor.getPooled=getPooledEvent;EventConstructor.release=releasePooledEvent;}/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
 */var CompositionEventInterface={data:null};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticCompositionEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticEvent_1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticEvent_1.augmentClass(SyntheticCompositionEvent,CompositionEventInterface);var SyntheticCompositionEvent_1=SyntheticCompositionEvent;/**
 * @interface Event
 * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
 *      /#events-inputevents
 */var InputEventInterface={data:null};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticInputEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticEvent_1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticEvent_1.augmentClass(SyntheticInputEvent,InputEventInterface);var SyntheticInputEvent_1=SyntheticInputEvent;var END_KEYCODES=[9,13,27,32];// Tab, Return, Esc, Space
var START_KEYCODE=229;var canUseCompositionEvent=ExecutionEnvironment.canUseDOM&&'CompositionEvent'in window;var documentMode=null;if(ExecutionEnvironment.canUseDOM&&'documentMode'in document){documentMode=document.documentMode;}// Webkit offers a very useful `textInput` event that can be used to
// directly represent `beforeInput`. The IE `textinput` event is not as
// useful, so we don't use it.
var canUseTextInputEvent=ExecutionEnvironment.canUseDOM&&'TextEvent'in window&&!documentMode&&!isPresto();// In IE9+, we have access to composition events, but the data supplied
// by the native compositionend event may be incorrect. Japanese ideographic
// spaces, for instance (\u3000) are not recorded correctly.
var useFallbackCompositionData=ExecutionEnvironment.canUseDOM&&(!canUseCompositionEvent||documentMode&&documentMode>8&&documentMode<=11);/**
 * Opera <= 12 includes TextEvent in window, but does not fire
 * text input events. Rely on keypress instead.
 */function isPresto(){var opera=window.opera;return(typeof opera==='undefined'?'undefined':_typeof(opera))==='object'&&typeof opera.version==='function'&&parseInt(opera.version(),10)<=12;}var SPACEBAR_CODE=32;var SPACEBAR_CHAR=String.fromCharCode(SPACEBAR_CODE);// Events and their corresponding property names.
var eventTypes={beforeInput:{phasedRegistrationNames:{bubbled:'onBeforeInput',captured:'onBeforeInputCapture'},dependencies:['topCompositionEnd','topKeyPress','topTextInput','topPaste']},compositionEnd:{phasedRegistrationNames:{bubbled:'onCompositionEnd',captured:'onCompositionEndCapture'},dependencies:['topBlur','topCompositionEnd','topKeyDown','topKeyPress','topKeyUp','topMouseDown']},compositionStart:{phasedRegistrationNames:{bubbled:'onCompositionStart',captured:'onCompositionStartCapture'},dependencies:['topBlur','topCompositionStart','topKeyDown','topKeyPress','topKeyUp','topMouseDown']},compositionUpdate:{phasedRegistrationNames:{bubbled:'onCompositionUpdate',captured:'onCompositionUpdateCapture'},dependencies:['topBlur','topCompositionUpdate','topKeyDown','topKeyPress','topKeyUp','topMouseDown']}};// Track whether we've ever handled a keypress on the space key.
var hasSpaceKeypress=false;/**
 * Return whether a native keypress event is assumed to be a command.
 * This is required because Firefox fires `keypress` events for key commands
 * (cut, copy, select-all, etc.) even though no character is inserted.
 */function isKeypressCommand(nativeEvent){return(nativeEvent.ctrlKey||nativeEvent.altKey||nativeEvent.metaKey)&&// ctrlKey && altKey is equivalent to AltGr, and is not a command.
!(nativeEvent.ctrlKey&&nativeEvent.altKey);}/**
 * Translate native top level events into event types.
 *
 * @param {string} topLevelType
 * @return {object}
 */function getCompositionEventType(topLevelType){switch(topLevelType){case'topCompositionStart':return eventTypes.compositionStart;case'topCompositionEnd':return eventTypes.compositionEnd;case'topCompositionUpdate':return eventTypes.compositionUpdate;}}/**
 * Does our fallback best-guess model think this event signifies that
 * composition has begun?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */function isFallbackCompositionStart(topLevelType,nativeEvent){return topLevelType==='topKeyDown'&&nativeEvent.keyCode===START_KEYCODE;}/**
 * Does our fallback mode think that this event is the end of composition?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */function isFallbackCompositionEnd(topLevelType,nativeEvent){switch(topLevelType){case'topKeyUp':// Command keys insert or clear IME input.
return END_KEYCODES.indexOf(nativeEvent.keyCode)!==-1;case'topKeyDown':// Expect IME keyCode on each keydown. If we get any other
// code we must have exited earlier.
return nativeEvent.keyCode!==START_KEYCODE;case'topKeyPress':case'topMouseDown':case'topBlur':// Events are not possible without cancelling IME.
return true;default:return false;}}/**
 * Google Input Tools provides composition data via a CustomEvent,
 * with the `data` property populated in the `detail` object. If this
 * is available on the event object, use it. If not, this is a plain
 * composition event and we have nothing special to extract.
 *
 * @param {object} nativeEvent
 * @return {?string}
 */function getDataFromCustomEvent(nativeEvent){var detail=nativeEvent.detail;if((typeof detail==='undefined'?'undefined':_typeof(detail))==='object'&&'data'in detail){return detail.data;}return null;}// Track the current IME composition status, if any.
var isComposing=false;/**
 * @return {?object} A SyntheticCompositionEvent.
 */function extractCompositionEvent(topLevelType,targetInst,nativeEvent,nativeEventTarget){var eventType;var fallbackData;if(canUseCompositionEvent){eventType=getCompositionEventType(topLevelType);}else if(!isComposing){if(isFallbackCompositionStart(topLevelType,nativeEvent)){eventType=eventTypes.compositionStart;}}else if(isFallbackCompositionEnd(topLevelType,nativeEvent)){eventType=eventTypes.compositionEnd;}if(!eventType){return null;}if(useFallbackCompositionData){// The current composition is stored statically and must not be
// overwritten while composition continues.
if(!isComposing&&eventType===eventTypes.compositionStart){isComposing=FallbackCompositionState_1.initialize(nativeEventTarget);}else if(eventType===eventTypes.compositionEnd){if(isComposing){fallbackData=FallbackCompositionState_1.getData();}}}var event=SyntheticCompositionEvent_1.getPooled(eventType,targetInst,nativeEvent,nativeEventTarget);if(fallbackData){// Inject data generated from fallback path into the synthetic event.
// This matches the property of native CompositionEventInterface.
event.data=fallbackData;}else{var customData=getDataFromCustomEvent(nativeEvent);if(customData!==null){event.data=customData;}}EventPropagators_1.accumulateTwoPhaseDispatches(event);return event;}/**
 * @param {TopLevelTypes} topLevelType Record from `BrowserEventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The string corresponding to this `beforeInput` event.
 */function getNativeBeforeInputChars(topLevelType,nativeEvent){switch(topLevelType){case'topCompositionEnd':return getDataFromCustomEvent(nativeEvent);case'topKeyPress':/**
       * If native `textInput` events are available, our goal is to make
       * use of them. However, there is a special case: the spacebar key.
       * In Webkit, preventing default on a spacebar `textInput` event
       * cancels character insertion, but it *also* causes the browser
       * to fall back to its default spacebar behavior of scrolling the
       * page.
       *
       * Tracking at:
       * https://code.google.com/p/chromium/issues/detail?id=355103
       *
       * To avoid this issue, use the keypress event as if no `textInput`
       * event is available.
       */var which=nativeEvent.which;if(which!==SPACEBAR_CODE){return null;}hasSpaceKeypress=true;return SPACEBAR_CHAR;case'topTextInput':// Record the characters to be added to the DOM.
var chars=nativeEvent.data;// If it's a spacebar character, assume that we have already handled
// it at the keypress level and bail immediately. Android Chrome
// doesn't give us keycodes, so we need to blacklist it.
if(chars===SPACEBAR_CHAR&&hasSpaceKeypress){return null;}return chars;default:// For other native event types, do nothing.
return null;}}/**
 * For browsers that do not provide the `textInput` event, extract the
 * appropriate string to use for SyntheticInputEvent.
 *
 * @param {string} topLevelType Record from `BrowserEventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The fallback string for this `beforeInput` event.
 */function getFallbackBeforeInputChars(topLevelType,nativeEvent){// If we are currently composing (IME) and using a fallback to do so,
// try to extract the composed characters from the fallback object.
// If composition event is available, we extract a string only at
// compositionevent, otherwise extract it at fallback events.
if(isComposing){if(topLevelType==='topCompositionEnd'||!canUseCompositionEvent&&isFallbackCompositionEnd(topLevelType,nativeEvent)){var chars=FallbackCompositionState_1.getData();FallbackCompositionState_1.reset();isComposing=false;return chars;}return null;}switch(topLevelType){case'topPaste':// If a paste event occurs after a keypress, throw out the input
// chars. Paste events should not lead to BeforeInput events.
return null;case'topKeyPress':/**
       * As of v27, Firefox may fire keypress events even when no character
       * will be inserted. A few possibilities:
       *
       * - `which` is `0`. Arrow keys, Esc key, etc.
       *
       * - `which` is the pressed key code, but no char is available.
       *   Ex: 'AltGr + d` in Polish. There is no modified character for
       *   this key combination and no character is inserted into the
       *   document, but FF fires the keypress for char code `100` anyway.
       *   No `input` event will occur.
       *
       * - `which` is the pressed key code, but a command combination is
       *   being used. Ex: `Cmd+C`. No character is inserted, and no
       *   `input` event will occur.
       */if(!isKeypressCommand(nativeEvent)){// IE fires the `keypress` event when a user types an emoji via
// Touch keyboard of Windows.  In such a case, the `char` property
// holds an emoji character like `\uD83D\uDE0A`.  Because its length
// is 2, the property `which` does not represent an emoji correctly.
// In such a case, we directly return the `char` property instead of
// using `which`.
if(nativeEvent.char&&nativeEvent.char.length>1){return nativeEvent.char;}else if(nativeEvent.which){return String.fromCharCode(nativeEvent.which);}}return null;case'topCompositionEnd':return useFallbackCompositionData?null:nativeEvent.data;default:return null;}}/**
 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
 * `textInput` or fallback behavior.
 *
 * @return {?object} A SyntheticInputEvent.
 */function extractBeforeInputEvent(topLevelType,targetInst,nativeEvent,nativeEventTarget){var chars;if(canUseTextInputEvent){chars=getNativeBeforeInputChars(topLevelType,nativeEvent);}else{chars=getFallbackBeforeInputChars(topLevelType,nativeEvent);}// If no characters are being inserted, no BeforeInput event should
// be fired.
if(!chars){return null;}var event=SyntheticInputEvent_1.getPooled(eventTypes.beforeInput,targetInst,nativeEvent,nativeEventTarget);event.data=chars;EventPropagators_1.accumulateTwoPhaseDispatches(event);return event;}/**
 * Create an `onBeforeInput` event to match
 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
 *
 * This event plugin is based on the native `textInput` event
 * available in Chrome, Safari, Opera, and IE. This event fires after
 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
 *
 * `beforeInput` is spec'd but not implemented in any browsers, and
 * the `input` event does not provide any useful information about what has
 * actually been added, contrary to the spec. Thus, `textInput` is the best
 * available event to identify the characters that have actually been inserted
 * into the target node.
 *
 * This plugin is also responsible for emitting `composition` events, thus
 * allowing us to share composition fallback code for both `beforeInput` and
 * `composition` event types.
 */var BeforeInputEventPlugin={eventTypes:eventTypes,extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){return[extractCompositionEvent(topLevelType,targetInst,nativeEvent,nativeEventTarget),extractBeforeInputEvent(topLevelType,targetInst,nativeEvent,nativeEventTarget)];}};var BeforeInputEventPlugin_1=BeforeInputEventPlugin;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule isTextInputElement
 * 
 *//**
 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
 */var supportedInputTypes={color:true,date:true,datetime:true,'datetime-local':true,email:true,month:true,number:true,password:true,range:true,search:true,tel:true,text:true,time:true,url:true,week:true};function isTextInputElement(elem){var nodeName=elem&&elem.nodeName&&elem.nodeName.toLowerCase();if(nodeName==='input'){return!!supportedInputTypes[elem.type];}if(nodeName==='textarea'){return true;}return false;}var isTextInputElement_1=isTextInputElement;var eventTypes$1={change:{phasedRegistrationNames:{bubbled:'onChange',captured:'onChangeCapture'},dependencies:['topBlur','topChange','topClick','topFocus','topInput','topKeyDown','topKeyUp','topSelectionChange']}};function createAndAccumulateChangeEvent(inst,nativeEvent,target){var event=SyntheticEvent_1.getPooled(eventTypes$1.change,inst,nativeEvent,target);event.type='change';// Flag this event loop as needing state restore.
ReactControlledComponent_1.enqueueStateRestore(target);EventPropagators_1.accumulateTwoPhaseDispatches(event);return event;}/**
 * For IE shims
 */var activeElement=null;var activeElementInst=null;/**
 * SECTION: handle `change` event
 */function shouldUseChangeEvent(elem){var nodeName=elem.nodeName&&elem.nodeName.toLowerCase();return nodeName==='select'||nodeName==='input'&&elem.type==='file';}function manualDispatchChangeEvent(nativeEvent){var event=createAndAccumulateChangeEvent(activeElementInst,nativeEvent,getEventTarget_1(nativeEvent));// If change and propertychange bubbled, we'd just bind to it like all the
// other events and have it go through ReactBrowserEventEmitter. Since it
// doesn't, we manually listen for the events and so we have to enqueue and
// process the abstract event manually.
//
// Batching is necessary here in order to ensure that all event handlers run
// before the next rerender (including event handlers attached to ancestor
// elements instead of directly on the input). Without this, controlled
// components don't work properly in conjunction with event bubbling because
// the component is rerendered and the value reverted before all the event
// handlers can run. See https://github.com/facebook/react/issues/708.
ReactGenericBatching_1.batchedUpdates(runEventInBatch,event);}function runEventInBatch(event){EventPluginHub_1.enqueueEvents(event);EventPluginHub_1.processEventQueue(false);}function getInstIfValueChanged(targetInst){var targetNode=ReactDOMComponentTree_1.getNodeFromInstance(targetInst);if(inputValueTracking_1.updateValueIfChanged(targetNode)){return targetInst;}}function getTargetInstForChangeEvent(topLevelType,targetInst){if(topLevelType==='topChange'){return targetInst;}}/**
 * SECTION: handle `input` event
 */var isInputEventSupported=false;if(ExecutionEnvironment.canUseDOM){// IE9 claims to support the input event but fails to trigger it when
// deleting text, so we ignore its input events.
isInputEventSupported=isEventSupported_1('input')&&(!document.documentMode||document.documentMode>9);}/**
 * (For IE <=9) Starts tracking propertychange events on the passed-in element
 * and override the value property so that we can distinguish user events from
 * value changes in JS.
 */function startWatchingForValueChange(target,targetInst){activeElement=target;activeElementInst=targetInst;activeElement.attachEvent('onpropertychange',handlePropertyChange);}/**
 * (For IE <=9) Removes the event listeners from the currently-tracked element,
 * if any exists.
 */function stopWatchingForValueChange(){if(!activeElement){return;}activeElement.detachEvent('onpropertychange',handlePropertyChange);activeElement=null;activeElementInst=null;}/**
 * (For IE <=9) Handles a propertychange event, sending a `change` event if
 * the value of the active element has changed.
 */function handlePropertyChange(nativeEvent){if(nativeEvent.propertyName!=='value'){return;}if(getInstIfValueChanged(activeElementInst)){manualDispatchChangeEvent(nativeEvent);}}function handleEventsForInputEventPolyfill(topLevelType,target,targetInst){if(topLevelType==='topFocus'){// In IE9, propertychange fires for most input events but is buggy and
// doesn't fire when text is deleted, but conveniently, selectionchange
// appears to fire in all of the remaining cases so we catch those and
// forward the event if the value has changed
// In either case, we don't want to call the event handler if the value
// is changed from JS so we redefine a setter for `.value` that updates
// our activeElementValue variable, allowing us to ignore those changes
//
// stopWatching() should be a noop here but we call it just in case we
// missed a blur event somehow.
stopWatchingForValueChange();startWatchingForValueChange(target,targetInst);}else if(topLevelType==='topBlur'){stopWatchingForValueChange();}}// For IE8 and IE9.
function getTargetInstForInputEventPolyfill(topLevelType,targetInst){if(topLevelType==='topSelectionChange'||topLevelType==='topKeyUp'||topLevelType==='topKeyDown'){// On the selectionchange event, the target is just document which isn't
// helpful for us so just check activeElement instead.
//
// 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
// propertychange on the first input event after setting `value` from a
// script and fires only keydown, keypress, keyup. Catching keyup usually
// gets it and catching keydown lets us fire an event for the first
// keystroke if user does a key repeat (it'll be a little delayed: right
// before the second keystroke). Other input methods (e.g., paste) seem to
// fire selectionchange normally.
return getInstIfValueChanged(activeElementInst);}}/**
 * SECTION: handle `click` event
 */function shouldUseClickEvent(elem){// Use the `click` event to detect changes to checkbox and radio inputs.
// This approach works across all browsers, whereas `change` does not fire
// until `blur` in IE8.
var nodeName=elem.nodeName;return nodeName&&nodeName.toLowerCase()==='input'&&(elem.type==='checkbox'||elem.type==='radio');}function getTargetInstForClickEvent(topLevelType,targetInst){if(topLevelType==='topClick'){return getInstIfValueChanged(targetInst);}}function getTargetInstForInputOrChangeEvent(topLevelType,targetInst){if(topLevelType==='topInput'||topLevelType==='topChange'){return getInstIfValueChanged(targetInst);}}function handleControlledInputBlur(inst,node){// TODO: In IE, inst is occasionally null. Why?
if(inst==null){return;}// Fiber and ReactDOM keep wrapper state in separate places
var state=inst._wrapperState||node._wrapperState;if(!state||!state.controlled||node.type!=='number'){return;}// If controlled, assign the value attribute to the current value on blur
var value=''+node.value;if(node.getAttribute('value')!==value){node.setAttribute('value',value);}}/**
 * This plugin creates an `onChange` event that normalizes change events
 * across form elements. This event fires at a time when it's possible to
 * change the element's value without seeing a flicker.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - select
 */var ChangeEventPlugin={eventTypes:eventTypes$1,_isInputEventSupported:isInputEventSupported,extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){var targetNode=targetInst?ReactDOMComponentTree_1.getNodeFromInstance(targetInst):window;var getTargetInstFunc,handleEventFunc;if(shouldUseChangeEvent(targetNode)){getTargetInstFunc=getTargetInstForChangeEvent;}else if(isTextInputElement_1(targetNode)){if(isInputEventSupported){getTargetInstFunc=getTargetInstForInputOrChangeEvent;}else{getTargetInstFunc=getTargetInstForInputEventPolyfill;handleEventFunc=handleEventsForInputEventPolyfill;}}else if(shouldUseClickEvent(targetNode)){getTargetInstFunc=getTargetInstForClickEvent;}if(getTargetInstFunc){var inst=getTargetInstFunc(topLevelType,targetInst);if(inst){var event=createAndAccumulateChangeEvent(inst,nativeEvent,nativeEventTarget);return event;}}if(handleEventFunc){handleEventFunc(topLevelType,targetNode,targetInst);}// When blurring, set the value attribute for number inputs
if(topLevelType==='topBlur'){handleControlledInputBlur(targetInst,targetNode);}}};var ChangeEventPlugin_1=ChangeEventPlugin;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule DOMEventPluginOrder
 *//**
 * Module that is injectable into `EventPluginHub`, that specifies a
 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
 * plugins, without having to package every one of them. This is better than
 * having plugins be ordered in the same order that they are injected because
 * that ordering would be influenced by the packaging order.
 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
 */var DOMEventPluginOrder=['ResponderEventPlugin','SimpleEventPlugin','TapEventPlugin','EnterLeaveEventPlugin','ChangeEventPlugin','SelectEventPlugin','BeforeInputEventPlugin'];var DOMEventPluginOrder_1=DOMEventPluginOrder;/**
 * @interface UIEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var UIEventInterface={view:function view(event){if(event.view){return event.view;}var target=getEventTarget_1(event);if(target.window===target){// target is a window object
return target;}var doc=target.ownerDocument;// TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
if(doc){return doc.defaultView||doc.parentWindow;}else{return window;}},detail:function detail(event){return event.detail||0;}};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */function SyntheticUIEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticEvent_1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticEvent_1.augmentClass(SyntheticUIEvent,UIEventInterface);var SyntheticUIEvent_1=SyntheticUIEvent;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule getEventModifierState
 *//**
 * Translation from modifier key to the associated property in the event.
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
 */var modifierKeyToProp={Alt:'altKey',Control:'ctrlKey',Meta:'metaKey',Shift:'shiftKey'};// IE8 does not implement getModifierState so we simply map it to the only
// modifier keys exposed by the event itself, does not support Lock-keys.
// Currently, all major browsers except Chrome seems to support Lock-keys.
function modifierStateGetter(keyArg){var syntheticEvent=this;var nativeEvent=syntheticEvent.nativeEvent;if(nativeEvent.getModifierState){return nativeEvent.getModifierState(keyArg);}var keyProp=modifierKeyToProp[keyArg];return keyProp?!!nativeEvent[keyProp]:false;}function getEventModifierState(nativeEvent){return modifierStateGetter;}var getEventModifierState_1=getEventModifierState;/**
 * @interface MouseEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var MouseEventInterface={screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:getEventModifierState_1,button:null,buttons:null,relatedTarget:function relatedTarget(event){return event.relatedTarget||(event.fromElement===event.srcElement?event.toElement:event.fromElement);}};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticMouseEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticUIEvent_1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticUIEvent_1.augmentClass(SyntheticMouseEvent,MouseEventInterface);var SyntheticMouseEvent_1=SyntheticMouseEvent;var eventTypes$2={mouseEnter:{registrationName:'onMouseEnter',dependencies:['topMouseOut','topMouseOver']},mouseLeave:{registrationName:'onMouseLeave',dependencies:['topMouseOut','topMouseOver']}};var EnterLeaveEventPlugin={eventTypes:eventTypes$2,/**
   * For almost every interaction we care about, there will be both a top-level
   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
   * we do not extract duplicate events. However, moving the mouse into the
   * browser from outside will not fire a `mouseout` event. In this case, we use
   * the `mouseover` top-level event.
   */extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){if(topLevelType==='topMouseOver'&&(nativeEvent.relatedTarget||nativeEvent.fromElement)){return null;}if(topLevelType!=='topMouseOut'&&topLevelType!=='topMouseOver'){// Must not be a mouse in or mouse out - ignoring.
return null;}var win;if(nativeEventTarget.window===nativeEventTarget){// `nativeEventTarget` is probably a window object.
win=nativeEventTarget;}else{// TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
var doc=nativeEventTarget.ownerDocument;if(doc){win=doc.defaultView||doc.parentWindow;}else{win=window;}}var from;var to;if(topLevelType==='topMouseOut'){from=targetInst;var related=nativeEvent.relatedTarget||nativeEvent.toElement;to=related?ReactDOMComponentTree_1.getClosestInstanceFromNode(related):null;}else{// Moving to a node from outside the window.
from=null;to=targetInst;}if(from===to){// Nothing pertains to our managed components.
return null;}var fromNode=from==null?win:ReactDOMComponentTree_1.getNodeFromInstance(from);var toNode=to==null?win:ReactDOMComponentTree_1.getNodeFromInstance(to);var leave=SyntheticMouseEvent_1.getPooled(eventTypes$2.mouseLeave,from,nativeEvent,nativeEventTarget);leave.type='mouseleave';leave.target=fromNode;leave.relatedTarget=toNode;var enter=SyntheticMouseEvent_1.getPooled(eventTypes$2.mouseEnter,to,nativeEvent,nativeEventTarget);enter.type='mouseenter';enter.target=toNode;enter.relatedTarget=fromNode;EventPropagators_1.accumulateEnterLeaveDispatches(leave,enter,from,to);return[leave,enter];}};var EnterLeaveEventPlugin_1=EnterLeaveEventPlugin;var DOCUMENT_NODE$2=HTMLNodeType_1.DOCUMENT_NODE;var skipSelectionChangeEvent=ExecutionEnvironment.canUseDOM&&'documentMode'in document&&document.documentMode<=11;var eventTypes$3={select:{phasedRegistrationNames:{bubbled:'onSelect',captured:'onSelectCapture'},dependencies:['topBlur','topContextMenu','topFocus','topKeyDown','topKeyUp','topMouseDown','topMouseUp','topSelectionChange']}};var activeElement$1=null;var activeElementInst$1=null;var lastSelection=null;var mouseDown=false;// Track whether all listeners exists for this plugin. If none exist, we do
// not extract events. See #3639.
var isListeningToAllDependencies=ReactBrowserEventEmitter_1.isListeningToAllDependencies;/**
 * Get an object which is a unique representation of the current selection.
 *
 * The return value will not be consistent across nodes or browsers, but
 * two identical selections on the same node will return identical objects.
 *
 * @param {DOMElement} node
 * @return {object}
 */function getSelection(node){if('selectionStart'in node&&ReactInputSelection_1.hasSelectionCapabilities(node)){return{start:node.selectionStart,end:node.selectionEnd};}else if(window.getSelection){var selection=window.getSelection();return{anchorNode:selection.anchorNode,anchorOffset:selection.anchorOffset,focusNode:selection.focusNode,focusOffset:selection.focusOffset};}}/**
 * Poll selection to see whether it's changed.
 *
 * @param {object} nativeEvent
 * @return {?SyntheticEvent}
 */function constructSelectEvent(nativeEvent,nativeEventTarget){// Ensure we have the right element, and that the user is not dragging a
// selection (this matches native `select` event behavior). In HTML5, select
// fires only on input and textarea thus if there's no focused element we
// won't dispatch.
if(mouseDown||activeElement$1==null||activeElement$1!==getActiveElement()){return null;}// Only fire when selection has actually changed.
var currentSelection=getSelection(activeElement$1);if(!lastSelection||!shallowEqual(lastSelection,currentSelection)){lastSelection=currentSelection;var syntheticEvent=SyntheticEvent_1.getPooled(eventTypes$3.select,activeElementInst$1,nativeEvent,nativeEventTarget);syntheticEvent.type='select';syntheticEvent.target=activeElement$1;EventPropagators_1.accumulateTwoPhaseDispatches(syntheticEvent);return syntheticEvent;}return null;}/**
 * This plugin creates an `onSelect` event that normalizes select events
 * across form elements.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - contentEditable
 *
 * This differs from native browser implementations in the following ways:
 * - Fires on contentEditable fields as well as inputs.
 * - Fires for collapsed selection.
 * - Fires after user input.
 */var SelectEventPlugin={eventTypes:eventTypes$3,extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){var doc=nativeEventTarget.window===nativeEventTarget?nativeEventTarget.document:nativeEventTarget.nodeType===DOCUMENT_NODE$2?nativeEventTarget:nativeEventTarget.ownerDocument;if(!doc||!isListeningToAllDependencies('onSelect',doc)){return null;}var targetNode=targetInst?ReactDOMComponentTree_1.getNodeFromInstance(targetInst):window;switch(topLevelType){// Track the input node that has focus.
case'topFocus':if(isTextInputElement_1(targetNode)||targetNode.contentEditable==='true'){activeElement$1=targetNode;activeElementInst$1=targetInst;lastSelection=null;}break;case'topBlur':activeElement$1=null;activeElementInst$1=null;lastSelection=null;break;// Don't fire the event while the user is dragging. This matches the
// semantics of the native select event.
case'topMouseDown':mouseDown=true;break;case'topContextMenu':case'topMouseUp':mouseDown=false;return constructSelectEvent(nativeEvent,nativeEventTarget);// Chrome and IE fire non-standard event when selection is changed (and
// sometimes when it hasn't). IE's event fires out of order with respect
// to key and input events on deletion, so we discard it.
//
// Firefox doesn't support selectionchange, so check selection status
// after each key entry. The selection changes after keydown and before
// keyup, but we check on keydown as well in the case of holding down a
// key, when multiple keydown events are fired but only one keyup is.
// This is also our approach for IE handling, for the reason above.
case'topSelectionChange':if(skipSelectionChangeEvent){break;}// falls through
case'topKeyDown':case'topKeyUp':return constructSelectEvent(nativeEvent,nativeEventTarget);}return null;}};var SelectEventPlugin_1=SelectEventPlugin;/**
 * @interface Event
 * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
 */var AnimationEventInterface={animationName:null,elapsedTime:null,pseudoElement:null};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */function SyntheticAnimationEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticEvent_1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticEvent_1.augmentClass(SyntheticAnimationEvent,AnimationEventInterface);var SyntheticAnimationEvent_1=SyntheticAnimationEvent;/**
 * @interface Event
 * @see http://www.w3.org/TR/clipboard-apis/
 */var ClipboardEventInterface={clipboardData:function clipboardData(event){return'clipboardData'in event?event.clipboardData:window.clipboardData;}};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticClipboardEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticEvent_1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticEvent_1.augmentClass(SyntheticClipboardEvent,ClipboardEventInterface);var SyntheticClipboardEvent_1=SyntheticClipboardEvent;/**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var FocusEventInterface={relatedTarget:null};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticFocusEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticUIEvent_1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticUIEvent_1.augmentClass(SyntheticFocusEvent,FocusEventInterface);var SyntheticFocusEvent_1=SyntheticFocusEvent;/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule getEventCharCode
 *//**
 * `charCode` represents the actual "character code" and is safe to use with
 * `String.fromCharCode`. As such, only keys that correspond to printable
 * characters produce a valid `charCode`, the only exception to this is Enter.
 * The Tab-key is considered non-printable and does not have a `charCode`,
 * presumably because it does not produce a tab-character in browsers.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {number} Normalized `charCode` property.
 */function getEventCharCode(nativeEvent){var charCode;var keyCode=nativeEvent.keyCode;if('charCode'in nativeEvent){charCode=nativeEvent.charCode;// FF does not set `charCode` for the Enter-key, check against `keyCode`.
if(charCode===0&&keyCode===13){charCode=13;}}else{// IE8 does not implement `charCode`, but `keyCode` has the correct value.
charCode=keyCode;}// Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
// Must not discard the (non-)printable Enter-key.
if(charCode>=32||charCode===13){return charCode;}return 0;}var getEventCharCode_1=getEventCharCode;/**
 * Normalization of deprecated HTML5 `key` values
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */var normalizeKey={Esc:'Escape',Spacebar:' ',Left:'ArrowLeft',Up:'ArrowUp',Right:'ArrowRight',Down:'ArrowDown',Del:'Delete',Win:'OS',Menu:'ContextMenu',Apps:'ContextMenu',Scroll:'ScrollLock',MozPrintableKey:'Unidentified'};/**
 * Translation from legacy `keyCode` to HTML5 `key`
 * Only special keys supported, all others depend on keyboard layout or browser
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */var translateToKey={8:'Backspace',9:'Tab',12:'Clear',13:'Enter',16:'Shift',17:'Control',18:'Alt',19:'Pause',20:'CapsLock',27:'Escape',32:' ',33:'PageUp',34:'PageDown',35:'End',36:'Home',37:'ArrowLeft',38:'ArrowUp',39:'ArrowRight',40:'ArrowDown',45:'Insert',46:'Delete',112:'F1',113:'F2',114:'F3',115:'F4',116:'F5',117:'F6',118:'F7',119:'F8',120:'F9',121:'F10',122:'F11',123:'F12',144:'NumLock',145:'ScrollLock',224:'Meta'};/**
 * @param {object} nativeEvent Native browser event.
 * @return {string} Normalized `key` property.
 */function getEventKey(nativeEvent){if(nativeEvent.key){// Normalize inconsistent values reported by browsers due to
// implementations of a working draft specification.
// FireFox implements `key` but returns `MozPrintableKey` for all
// printable characters (normalized to `Unidentified`), ignore it.
var key=normalizeKey[nativeEvent.key]||nativeEvent.key;if(key!=='Unidentified'){return key;}}// Browser does not implement `key`, polyfill as much of it as we can.
if(nativeEvent.type==='keypress'){var charCode=getEventCharCode_1(nativeEvent);// The enter-key is technically both printable and non-printable and can
// thus be captured by `keypress`, no other non-printable key should.
return charCode===13?'Enter':String.fromCharCode(charCode);}if(nativeEvent.type==='keydown'||nativeEvent.type==='keyup'){// While user keyboard layout determines the actual meaning of each
// `keyCode` value, almost all function keys have a universal value.
return translateToKey[nativeEvent.keyCode]||'Unidentified';}return'';}var getEventKey_1=getEventKey;/**
 * @interface KeyboardEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var KeyboardEventInterface={key:getEventKey_1,location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:getEventModifierState_1,// Legacy Interface
charCode:function charCode(event){// `charCode` is the result of a KeyPress event and represents the value of
// the actual printable character.
// KeyPress is deprecated, but its replacement is not yet final and not
// implemented in any major browser. Only KeyPress has charCode.
if(event.type==='keypress'){return getEventCharCode_1(event);}return 0;},keyCode:function keyCode(event){// `keyCode` is the result of a KeyDown/Up event and represents the value of
// physical keyboard key.
// The actual meaning of the value depends on the users' keyboard layout
// which cannot be detected. Assuming that it is a US keyboard layout
// provides a surprisingly accurate mapping for US and European users.
// Due to this, it is left to the user to implement at this time.
if(event.type==='keydown'||event.type==='keyup'){return event.keyCode;}return 0;},which:function which(event){// `which` is an alias for either `keyCode` or `charCode` depending on the
// type of the event.
if(event.type==='keypress'){return getEventCharCode_1(event);}if(event.type==='keydown'||event.type==='keyup'){return event.keyCode;}return 0;}};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticKeyboardEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticUIEvent_1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticUIEvent_1.augmentClass(SyntheticKeyboardEvent,KeyboardEventInterface);var SyntheticKeyboardEvent_1=SyntheticKeyboardEvent;/**
 * @interface DragEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var DragEventInterface={dataTransfer:null};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticDragEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticMouseEvent_1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticMouseEvent_1.augmentClass(SyntheticDragEvent,DragEventInterface);var SyntheticDragEvent_1=SyntheticDragEvent;/**
 * @interface TouchEvent
 * @see http://www.w3.org/TR/touch-events/
 */var TouchEventInterface={touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:getEventModifierState_1};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticTouchEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticUIEvent_1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticUIEvent_1.augmentClass(SyntheticTouchEvent,TouchEventInterface);var SyntheticTouchEvent_1=SyntheticTouchEvent;/**
 * @interface Event
 * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
 */var TransitionEventInterface={propertyName:null,elapsedTime:null,pseudoElement:null};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */function SyntheticTransitionEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticEvent_1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticEvent_1.augmentClass(SyntheticTransitionEvent,TransitionEventInterface);var SyntheticTransitionEvent_1=SyntheticTransitionEvent;/**
 * @interface WheelEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var WheelEventInterface={deltaX:function deltaX(event){return'deltaX'in event?event.deltaX:// Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
'wheelDeltaX'in event?-event.wheelDeltaX:0;},deltaY:function deltaY(event){return'deltaY'in event?event.deltaY:// Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
'wheelDeltaY'in event?-event.wheelDeltaY:// Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
'wheelDelta'in event?-event.wheelDelta:0;},deltaZ:null,// Browsers without "deltaMode" is reporting in raw wheel delta where one
// notch on the scroll is always +/- 120, roughly equivalent to pixels.
// A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
// ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
deltaMode:null};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticMouseEvent}
 */function SyntheticWheelEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticMouseEvent_1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticMouseEvent_1.augmentClass(SyntheticWheelEvent,WheelEventInterface);var SyntheticWheelEvent_1=SyntheticWheelEvent;/**
 * Turns
 * ['abort', ...]
 * into
 * eventTypes = {
 *   'abort': {
 *     phasedRegistrationNames: {
 *       bubbled: 'onAbort',
 *       captured: 'onAbortCapture',
 *     },
 *     dependencies: ['topAbort'],
 *   },
 *   ...
 * };
 * topLevelEventsToDispatchConfig = {
 *   'topAbort': { sameConfig }
 * };
 */var eventTypes$4={};var topLevelEventsToDispatchConfig={};['abort','animationEnd','animationIteration','animationStart','blur','cancel','canPlay','canPlayThrough','click','close','contextMenu','copy','cut','doubleClick','drag','dragEnd','dragEnter','dragExit','dragLeave','dragOver','dragStart','drop','durationChange','emptied','encrypted','ended','error','focus','input','invalid','keyDown','keyPress','keyUp','load','loadedData','loadedMetadata','loadStart','mouseDown','mouseMove','mouseOut','mouseOver','mouseUp','paste','pause','play','playing','progress','rateChange','reset','scroll','seeked','seeking','stalled','submit','suspend','timeUpdate','toggle','touchCancel','touchEnd','touchMove','touchStart','transitionEnd','volumeChange','waiting','wheel'].forEach(function(event){var capitalizedEvent=event[0].toUpperCase()+event.slice(1);var onEvent='on'+capitalizedEvent;var topEvent='top'+capitalizedEvent;var type={phasedRegistrationNames:{bubbled:onEvent,captured:onEvent+'Capture'},dependencies:[topEvent]};eventTypes$4[event]=type;topLevelEventsToDispatchConfig[topEvent]=type;});var SimpleEventPlugin={eventTypes:eventTypes$4,extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){var dispatchConfig=topLevelEventsToDispatchConfig[topLevelType];if(!dispatchConfig){return null;}var EventConstructor;switch(topLevelType){case'topAbort':case'topCancel':case'topCanPlay':case'topCanPlayThrough':case'topClose':case'topDurationChange':case'topEmptied':case'topEncrypted':case'topEnded':case'topError':case'topInput':case'topInvalid':case'topLoad':case'topLoadedData':case'topLoadedMetadata':case'topLoadStart':case'topPause':case'topPlay':case'topPlaying':case'topProgress':case'topRateChange':case'topReset':case'topSeeked':case'topSeeking':case'topStalled':case'topSubmit':case'topSuspend':case'topTimeUpdate':case'topToggle':case'topVolumeChange':case'topWaiting':// HTML Events
// @see http://www.w3.org/TR/html5/index.html#events-0
EventConstructor=SyntheticEvent_1;break;case'topKeyPress':// Firefox creates a keypress event for function keys too. This removes
// the unwanted keypress events. Enter is however both printable and
// non-printable. One would expect Tab to be as well (but it isn't).
if(getEventCharCode_1(nativeEvent)===0){return null;}/* falls through */case'topKeyDown':case'topKeyUp':EventConstructor=SyntheticKeyboardEvent_1;break;case'topBlur':case'topFocus':EventConstructor=SyntheticFocusEvent_1;break;case'topClick':// Firefox creates a click event on right mouse clicks. This removes the
// unwanted click events.
if(nativeEvent.button===2){return null;}/* falls through */case'topDoubleClick':case'topMouseDown':case'topMouseMove':case'topMouseUp':// TODO: Disabled elements should not respond to mouse events
/* falls through */case'topMouseOut':case'topMouseOver':case'topContextMenu':EventConstructor=SyntheticMouseEvent_1;break;case'topDrag':case'topDragEnd':case'topDragEnter':case'topDragExit':case'topDragLeave':case'topDragOver':case'topDragStart':case'topDrop':EventConstructor=SyntheticDragEvent_1;break;case'topTouchCancel':case'topTouchEnd':case'topTouchMove':case'topTouchStart':EventConstructor=SyntheticTouchEvent_1;break;case'topAnimationEnd':case'topAnimationIteration':case'topAnimationStart':EventConstructor=SyntheticAnimationEvent_1;break;case'topTransitionEnd':EventConstructor=SyntheticTransitionEvent_1;break;case'topScroll':EventConstructor=SyntheticUIEvent_1;break;case'topWheel':EventConstructor=SyntheticWheelEvent_1;break;case'topCopy':case'topCut':case'topPaste':EventConstructor=SyntheticClipboardEvent_1;break;}!EventConstructor?invariant(false,'SimpleEventPlugin: Unhandled event type, `%s`.',topLevelType):void 0;var event=EventConstructor.getPooled(dispatchConfig,targetInst,nativeEvent,nativeEventTarget);EventPropagators_1.accumulateTwoPhaseDispatches(event);return event;}};var SimpleEventPlugin_1=SimpleEventPlugin;ReactDOMEventListener_1.setHandleTopLevel(ReactBrowserEventEmitter_1.handleTopLevel);/**
 * Inject modules for resolving DOM hierarchy and plugin ordering.
 */EventPluginHub_1.injection.injectEventPluginOrder(DOMEventPluginOrder_1);EventPluginUtils_1.injection.injectComponentTree(ReactDOMComponentTree_1);/**
 * Some important event plugins included by default (without having to require
 * them).
 */EventPluginHub_1.injection.injectEventPluginsByName({SimpleEventPlugin:SimpleEventPlugin_1,EnterLeaveEventPlugin:EnterLeaveEventPlugin_1,ChangeEventPlugin:ChangeEventPlugin_1,SelectEventPlugin:SelectEventPlugin_1,BeforeInputEventPlugin:BeforeInputEventPlugin_1});var MUST_USE_PROPERTY=DOMProperty_1.injection.MUST_USE_PROPERTY;var HAS_BOOLEAN_VALUE=DOMProperty_1.injection.HAS_BOOLEAN_VALUE;var HAS_NUMERIC_VALUE=DOMProperty_1.injection.HAS_NUMERIC_VALUE;var HAS_POSITIVE_NUMERIC_VALUE=DOMProperty_1.injection.HAS_POSITIVE_NUMERIC_VALUE;var HAS_OVERLOADED_BOOLEAN_VALUE=DOMProperty_1.injection.HAS_OVERLOADED_BOOLEAN_VALUE;var HAS_STRING_BOOLEAN_VALUE=DOMProperty_1.injection.HAS_STRING_BOOLEAN_VALUE;var HTMLDOMPropertyConfig={// When adding attributes to this list, be sure to also add them to
// the `possibleStandardNames` module to ensure casing and incorrect
// name warnings.
Properties:{allowFullScreen:HAS_BOOLEAN_VALUE,// IE only true/false iFrame attribute
// https://msdn.microsoft.com/en-us/library/ms533072(v=vs.85).aspx
allowTransparency:HAS_STRING_BOOLEAN_VALUE,// specifies target context for links with `preload` type
async:HAS_BOOLEAN_VALUE,// autoFocus is polyfilled/normalized by AutoFocusUtils
// autoFocus: HAS_BOOLEAN_VALUE,
autoPlay:HAS_BOOLEAN_VALUE,capture:HAS_BOOLEAN_VALUE,checked:MUST_USE_PROPERTY|HAS_BOOLEAN_VALUE,cols:HAS_POSITIVE_NUMERIC_VALUE,contentEditable:HAS_STRING_BOOLEAN_VALUE,controls:HAS_BOOLEAN_VALUE,'default':HAS_BOOLEAN_VALUE,defer:HAS_BOOLEAN_VALUE,disabled:HAS_BOOLEAN_VALUE,download:HAS_OVERLOADED_BOOLEAN_VALUE,draggable:HAS_STRING_BOOLEAN_VALUE,formNoValidate:HAS_BOOLEAN_VALUE,hidden:HAS_BOOLEAN_VALUE,loop:HAS_BOOLEAN_VALUE,// Caution; `option.selected` is not updated if `select.multiple` is
// disabled with `removeAttribute`.
multiple:MUST_USE_PROPERTY|HAS_BOOLEAN_VALUE,muted:MUST_USE_PROPERTY|HAS_BOOLEAN_VALUE,noValidate:HAS_BOOLEAN_VALUE,open:HAS_BOOLEAN_VALUE,playsInline:HAS_BOOLEAN_VALUE,readOnly:HAS_BOOLEAN_VALUE,required:HAS_BOOLEAN_VALUE,reversed:HAS_BOOLEAN_VALUE,rows:HAS_POSITIVE_NUMERIC_VALUE,rowSpan:HAS_NUMERIC_VALUE,scoped:HAS_BOOLEAN_VALUE,seamless:HAS_BOOLEAN_VALUE,selected:MUST_USE_PROPERTY|HAS_BOOLEAN_VALUE,size:HAS_POSITIVE_NUMERIC_VALUE,start:HAS_NUMERIC_VALUE,// support for projecting regular DOM Elements via V1 named slots ( shadow dom )
span:HAS_POSITIVE_NUMERIC_VALUE,spellCheck:HAS_STRING_BOOLEAN_VALUE,// Style must be explicitly set in the attribute list. React components
// expect a style object
style:0,// itemScope is for for Microdata support.
// See http://schema.org/docs/gs.html
itemScope:HAS_BOOLEAN_VALUE,// These attributes must stay in the white-list because they have
// different attribute names (see DOMAttributeNames below)
acceptCharset:0,className:0,htmlFor:0,httpEquiv:0,// Attributes with mutation methods must be specified in the whitelist
// Set the string boolean flag to allow the behavior
value:HAS_STRING_BOOLEAN_VALUE},DOMAttributeNames:{acceptCharset:'accept-charset',className:'class',htmlFor:'for',httpEquiv:'http-equiv'},DOMMutationMethods:{value:function value(node,_value){if(_value==null){return node.removeAttribute('value');}// Number inputs get special treatment due to some edge cases in
// Chrome. Let everything else assign the value attribute as normal.
// https://github.com/facebook/react/issues/7253#issuecomment-236074326
if(node.type!=='number'||node.hasAttribute('value')===false){node.setAttribute('value',''+_value);}else if(node.validity&&!node.validity.badInput&&node.ownerDocument.activeElement!==node){// Don't assign an attribute if validation reports bad
// input. Chrome will clear the value. Additionally, don't
// operate on inputs that have focus, otherwise Chrome might
// strip off trailing decimal places and cause the user's
// cursor position to jump to the beginning of the input.
//
// In ReactDOMInput, we have an onBlur event that will trigger
// this function again when focus is lost.
node.setAttribute('value',''+_value);}}}};var HTMLDOMPropertyConfig_1=HTMLDOMPropertyConfig;var HAS_STRING_BOOLEAN_VALUE$1=DOMProperty_1.injection.HAS_STRING_BOOLEAN_VALUE;var NS={xlink:'http://www.w3.org/1999/xlink',xml:'http://www.w3.org/XML/1998/namespace'};/**
 * This is a list of all SVG attributes that need special casing,
 * namespacing, or boolean value assignment.
 *
 * When adding attributes to this list, be sure to also add them to
 * the `possibleStandardNames` module to ensure casing and incorrect
 * name warnings.
 *
 * SVG Attributes List:
 * https://www.w3.org/TR/SVG/attindex.html
 * SMIL Spec:
 * https://www.w3.org/TR/smil
 */var ATTRS=['accent-height','alignment-baseline','arabic-form','baseline-shift','cap-height','clip-path','clip-rule','color-interpolation','color-interpolation-filters','color-profile','color-rendering','dominant-baseline','enable-background','fill-opacity','fill-rule','flood-color','flood-opacity','font-family','font-size','font-size-adjust','font-stretch','font-style','font-variant','font-weight','glyph-name','glyph-orientation-horizontal','glyph-orientation-vertical','horiz-adv-x','horiz-origin-x','image-rendering','letter-spacing','lighting-color','marker-end','marker-mid','marker-start','overline-position','overline-thickness','paint-order','panose-1','pointer-events','rendering-intent','shape-rendering','stop-color','stop-opacity','strikethrough-position','strikethrough-thickness','stroke-dasharray','stroke-dashoffset','stroke-linecap','stroke-linejoin','stroke-miterlimit','stroke-opacity','stroke-width','text-anchor','text-decoration','text-rendering','underline-position','underline-thickness','unicode-bidi','unicode-range','units-per-em','v-alphabetic','v-hanging','v-ideographic','v-mathematical','vector-effect','vert-adv-y','vert-origin-x','vert-origin-y','word-spacing','writing-mode','x-height','xlink:actuate','xlink:arcrole','xlink:href','xlink:role','xlink:show','xlink:title','xlink:type','xml:base','xmlns:xlink','xml:lang','xml:space'];var SVGDOMPropertyConfig={Properties:{autoReverse:HAS_STRING_BOOLEAN_VALUE$1,externalResourcesRequired:HAS_STRING_BOOLEAN_VALUE$1,preserveAlpha:HAS_STRING_BOOLEAN_VALUE$1},DOMAttributeNames:{autoReverse:'autoReverse',externalResourcesRequired:'externalResourcesRequired',preserveAlpha:'preserveAlpha'},DOMAttributeNamespaces:{xlinkActuate:NS.xlink,xlinkArcrole:NS.xlink,xlinkHref:NS.xlink,xlinkRole:NS.xlink,xlinkShow:NS.xlink,xlinkTitle:NS.xlink,xlinkType:NS.xlink,xmlBase:NS.xml,xmlLang:NS.xml,xmlSpace:NS.xml}};var CAMELIZE=/[\-\:]([a-z])/g;var capitalize=function capitalize(token){return token[1].toUpperCase();};ATTRS.forEach(function(original){var reactName=original.replace(CAMELIZE,capitalize);SVGDOMPropertyConfig.Properties[reactName]=0;SVGDOMPropertyConfig.DOMAttributeNames[reactName]=original;});var SVGDOMPropertyConfig_1=SVGDOMPropertyConfig;DOMProperty_1.injection.injectDOMPropertyConfig(HTMLDOMPropertyConfig_1);DOMProperty_1.injection.injectDOMPropertyConfig(SVGDOMPropertyConfig_1);var injectInternals=ReactFiberDevToolsHook.injectInternals;var ELEMENT_NODE=HTMLNodeType_1.ELEMENT_NODE;var TEXT_NODE=HTMLNodeType_1.TEXT_NODE;var COMMENT_NODE=HTMLNodeType_1.COMMENT_NODE;var DOCUMENT_NODE=HTMLNodeType_1.DOCUMENT_NODE;var DOCUMENT_FRAGMENT_NODE=HTMLNodeType_1.DOCUMENT_FRAGMENT_NODE;var ROOT_ATTRIBUTE_NAME=DOMProperty_1.ROOT_ATTRIBUTE_NAME;var getChildNamespace=DOMNamespaces.getChildNamespace;var createElement=ReactDOMFiberComponent_1.createElement;var createTextNode=ReactDOMFiberComponent_1.createTextNode;var setInitialProperties=ReactDOMFiberComponent_1.setInitialProperties;var diffProperties=ReactDOMFiberComponent_1.diffProperties;var updateProperties=ReactDOMFiberComponent_1.updateProperties;var diffHydratedProperties=ReactDOMFiberComponent_1.diffHydratedProperties;var diffHydratedText=ReactDOMFiberComponent_1.diffHydratedText;var warnForDeletedHydratableElement=ReactDOMFiberComponent_1.warnForDeletedHydratableElement;var warnForDeletedHydratableText=ReactDOMFiberComponent_1.warnForDeletedHydratableText;var warnForInsertedHydratedElement=ReactDOMFiberComponent_1.warnForInsertedHydratedElement;var warnForInsertedHydratedText=ReactDOMFiberComponent_1.warnForInsertedHydratedText;var precacheFiberNode=ReactDOMComponentTree_1.precacheFiberNode;var updateFiberProps=ReactDOMComponentTree_1.updateFiberProps;{var lowPriorityWarning=lowPriorityWarning_1;var warning=require$$0;var validateDOMNesting=validateDOMNesting_1;var updatedAncestorInfo=validateDOMNesting.updatedAncestorInfo;if(typeof Map!=='function'||Map.prototype==null||typeof Map.prototype.forEach!=='function'||typeof Set!=='function'||Set.prototype==null||typeof Set.prototype.clear!=='function'||typeof Set.prototype.forEach!=='function'){warning(false,'React depends on Map and Set built-in types. Make sure that you load a '+'polyfill in older browsers. http://fb.me/react-polyfills');}}ReactControlledComponent_1.injection.injectFiberControlledHostComponent(ReactDOMFiberComponent_1);findDOMNode_1._injectFiber(function(fiber){return DOMRenderer.findHostInstance(fiber);});var eventsEnabled=null;var selectionInformation=null;/**
 * True if the supplied DOM node is a valid node element.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @return {boolean} True if the DOM is a valid DOM node.
 * @internal
 */function isValidContainer(node){return!!(node&&(node.nodeType===ELEMENT_NODE||node.nodeType===DOCUMENT_NODE||node.nodeType===DOCUMENT_FRAGMENT_NODE||node.nodeType===COMMENT_NODE&&node.nodeValue===' react-mount-point-unstable '));}function getReactRootElementInContainer(container){if(!container){return null;}if(container.nodeType===DOCUMENT_NODE){return container.documentElement;}else{return container.firstChild;}}function shouldHydrateDueToLegacyHeuristic(container){var rootElement=getReactRootElementInContainer(container);return!!(rootElement&&rootElement.nodeType===ELEMENT_NODE&&rootElement.hasAttribute(ROOT_ATTRIBUTE_NAME));}function shouldAutoFocusHostComponent(type,props){switch(type){case'button':case'input':case'select':case'textarea':return!!props.autoFocus;}return false;}var DOMRenderer=ReactFiberReconciler({getRootHostContext:function getRootHostContext(rootContainerInstance){var type=void 0;var namespace=void 0;if(rootContainerInstance.nodeType===DOCUMENT_NODE){type='#document';var root=rootContainerInstance.documentElement;namespace=root?root.namespaceURI:getChildNamespace(null,'');}else{var container=rootContainerInstance.nodeType===COMMENT_NODE?rootContainerInstance.parentNode:rootContainerInstance;var ownNamespace=container.namespaceURI||null;type=container.tagName;namespace=getChildNamespace(ownNamespace,type);}{var validatedTag=type.toLowerCase();var _ancestorInfo=updatedAncestorInfo(null,validatedTag,null);return{namespace:namespace,ancestorInfo:_ancestorInfo};}return namespace;},getChildHostContext:function getChildHostContext(parentHostContext,type){{var parentHostContextDev=parentHostContext;var _namespace=getChildNamespace(parentHostContextDev.namespace,type);var _ancestorInfo2=updatedAncestorInfo(parentHostContextDev.ancestorInfo,type,null);return{namespace:_namespace,ancestorInfo:_ancestorInfo2};}var parentNamespace=parentHostContext;return getChildNamespace(parentNamespace,type);},getPublicInstance:function getPublicInstance(instance){return instance;},prepareForCommit:function prepareForCommit(){eventsEnabled=ReactBrowserEventEmitter_1.isEnabled();selectionInformation=ReactInputSelection_1.getSelectionInformation();ReactBrowserEventEmitter_1.setEnabled(false);},resetAfterCommit:function resetAfterCommit(){ReactInputSelection_1.restoreSelection(selectionInformation);selectionInformation=null;ReactBrowserEventEmitter_1.setEnabled(eventsEnabled);eventsEnabled=null;},createInstance:function createInstance(type,props,rootContainerInstance,hostContext,internalInstanceHandle){var parentNamespace=void 0;{// TODO: take namespace into account when validating.
var hostContextDev=hostContext;validateDOMNesting(type,null,null,hostContextDev.ancestorInfo);if(typeof props.children==='string'||typeof props.children==='number'){var string=''+props.children;var ownAncestorInfo=updatedAncestorInfo(hostContextDev.ancestorInfo,type,null);validateDOMNesting(null,string,null,ownAncestorInfo);}parentNamespace=hostContextDev.namespace;}var domElement=createElement(type,props,rootContainerInstance,parentNamespace);precacheFiberNode(internalInstanceHandle,domElement);updateFiberProps(domElement,props);return domElement;},appendInitialChild:function appendInitialChild(parentInstance,child){parentInstance.appendChild(child);},finalizeInitialChildren:function finalizeInitialChildren(domElement,type,props,rootContainerInstance){setInitialProperties(domElement,type,props,rootContainerInstance);return shouldAutoFocusHostComponent(type,props);},prepareUpdate:function prepareUpdate(domElement,type,oldProps,newProps,rootContainerInstance,hostContext){{var hostContextDev=hostContext;if(_typeof(newProps.children)!==_typeof(oldProps.children)&&(typeof newProps.children==='string'||typeof newProps.children==='number')){var string=''+newProps.children;var ownAncestorInfo=updatedAncestorInfo(hostContextDev.ancestorInfo,type,null);validateDOMNesting(null,string,null,ownAncestorInfo);}}return diffProperties(domElement,type,oldProps,newProps,rootContainerInstance);},commitMount:function commitMount(domElement,type,newProps,internalInstanceHandle){domElement.focus();},commitUpdate:function commitUpdate(domElement,updatePayload,type,oldProps,newProps,internalInstanceHandle){// Update the props handle so that we know which props are the ones with
// with current event handlers.
updateFiberProps(domElement,newProps);// Apply the diff to the DOM node.
updateProperties(domElement,updatePayload,type,oldProps,newProps);},shouldSetTextContent:function shouldSetTextContent(type,props){return type==='textarea'||typeof props.children==='string'||typeof props.children==='number'||_typeof(props.dangerouslySetInnerHTML)==='object'&&props.dangerouslySetInnerHTML!==null&&typeof props.dangerouslySetInnerHTML.__html==='string';},resetTextContent:function resetTextContent(domElement){domElement.textContent='';},shouldDeprioritizeSubtree:function shouldDeprioritizeSubtree(type,props){return!!props.hidden;},createTextInstance:function createTextInstance(text,rootContainerInstance,hostContext,internalInstanceHandle){{var hostContextDev=hostContext;validateDOMNesting(null,text,null,hostContextDev.ancestorInfo);}var textNode=createTextNode(text,rootContainerInstance);precacheFiberNode(internalInstanceHandle,textNode);return textNode;},commitTextUpdate:function commitTextUpdate(textInstance,oldText,newText){textInstance.nodeValue=newText;},appendChild:function appendChild(parentInstance,child){parentInstance.appendChild(child);},appendChildToContainer:function appendChildToContainer(container,child){if(container.nodeType===COMMENT_NODE){container.parentNode.insertBefore(child,container);}else{container.appendChild(child);}},insertBefore:function insertBefore(parentInstance,child,beforeChild){parentInstance.insertBefore(child,beforeChild);},insertInContainerBefore:function insertInContainerBefore(container,child,beforeChild){if(container.nodeType===COMMENT_NODE){container.parentNode.insertBefore(child,beforeChild);}else{container.insertBefore(child,beforeChild);}},removeChild:function removeChild(parentInstance,child){parentInstance.removeChild(child);},removeChildFromContainer:function removeChildFromContainer(container,child){if(container.nodeType===COMMENT_NODE){container.parentNode.removeChild(child);}else{container.removeChild(child);}},canHydrateInstance:function canHydrateInstance(instance,type,props){return instance.nodeType===ELEMENT_NODE&&type===instance.nodeName.toLowerCase();},canHydrateTextInstance:function canHydrateTextInstance(instance,text){if(text===''){// Empty strings are not parsed by HTML so there won't be a correct match here.
return false;}return instance.nodeType===TEXT_NODE;},getNextHydratableSibling:function getNextHydratableSibling(instance){var node=instance.nextSibling;// Skip non-hydratable nodes.
while(node&&node.nodeType!==ELEMENT_NODE&&node.nodeType!==TEXT_NODE){node=node.nextSibling;}return node;},getFirstHydratableChild:function getFirstHydratableChild(parentInstance){var next=parentInstance.firstChild;// Skip non-hydratable nodes.
while(next&&next.nodeType!==ELEMENT_NODE&&next.nodeType!==TEXT_NODE){next=next.nextSibling;}return next;},hydrateInstance:function hydrateInstance(instance,type,props,rootContainerInstance,hostContext,internalInstanceHandle){precacheFiberNode(internalInstanceHandle,instance);// TODO: Possibly defer this until the commit phase where all the events
// get attached.
updateFiberProps(instance,props);var parentNamespace=void 0;{var hostContextDev=hostContext;parentNamespace=hostContextDev.namespace;}return diffHydratedProperties(instance,type,props,parentNamespace,rootContainerInstance);},hydrateTextInstance:function hydrateTextInstance(textInstance,text,internalInstanceHandle){precacheFiberNode(internalInstanceHandle,textInstance);return diffHydratedText(textInstance,text);},didNotHydrateInstance:function didNotHydrateInstance(parentInstance,instance){if(instance.nodeType===1){warnForDeletedHydratableElement(parentInstance,instance);}else{warnForDeletedHydratableText(parentInstance,instance);}},didNotFindHydratableInstance:function didNotFindHydratableInstance(parentInstance,type,props){warnForInsertedHydratedElement(parentInstance,type,props);},didNotFindHydratableTextInstance:function didNotFindHydratableTextInstance(parentInstance,text){warnForInsertedHydratedText(parentInstance,text);},scheduleDeferredCallback:ReactDOMFrameScheduling.rIC,useSyncScheduling:!ReactDOMFeatureFlags_1.fiberAsyncScheduling});ReactGenericBatching_1.injection.injectFiberBatchedUpdates(DOMRenderer.batchedUpdates);var warnedAboutHydrateAPI=false;function renderSubtreeIntoContainer(parentComponent,children,container,forceHydrate,callback){!isValidContainer(container)?invariant(false,'Target container is not a DOM element.'):void 0;{if(container._reactRootContainer&&container.nodeType!==COMMENT_NODE){var hostInstance=DOMRenderer.findHostInstanceWithNoPortals(container._reactRootContainer.current);if(hostInstance){warning(hostInstance.parentNode===container,'render(...): It looks like the React-rendered content of this '+'container was removed without using React. This is not '+'supported and will cause errors. Instead, call '+'ReactDOM.unmountComponentAtNode to empty a container.');}}var isRootRenderedBySomeReact=!!container._reactRootContainer;var rootEl=getReactRootElementInContainer(container);var hasNonRootReactChild=!!(rootEl&&ReactDOMComponentTree_1.getInstanceFromNode(rootEl));warning(!hasNonRootReactChild||isRootRenderedBySomeReact,'render(...): Replacing React-rendered children with a new root '+'component. If you intended to update the children of this node, '+'you should instead have the existing children update their state '+'and render the new components instead of calling ReactDOM.render.');warning(container.nodeType!==ELEMENT_NODE||!container.tagName||container.tagName.toUpperCase()!=='BODY','render(): Rendering components directly into document.body is '+'discouraged, since its children are often manipulated by third-party '+'scripts and browser extensions. This may lead to subtle '+'reconciliation issues. Try rendering into a container element created '+'for your app.');}var root=container._reactRootContainer;if(!root){var shouldHydrate=forceHydrate||shouldHydrateDueToLegacyHeuristic(container);// First clear any existing content.
if(!shouldHydrate){var warned=false;var rootSibling=void 0;while(rootSibling=container.lastChild){{if(!warned&&rootSibling.nodeType===ELEMENT_NODE&&rootSibling.hasAttribute(ROOT_ATTRIBUTE_NAME)){warned=true;warning(false,'render(): Target node has markup rendered by React, but there '+'are unrelated nodes as well. This is most commonly caused by '+'white-space inserted around server-rendered markup.');}}container.removeChild(rootSibling);}}{if(shouldHydrate&&!forceHydrate&&!warnedAboutHydrateAPI){warnedAboutHydrateAPI=true;lowPriorityWarning(false,'render(): Calling ReactDOM.render() to hydrate server-rendered markup '+'will stop working in React v17. Replace the ReactDOM.render() call '+'with ReactDOM.hydrate() if you want React to attach to the server HTML.');}}var newRoot=DOMRenderer.createContainer(container);root=container._reactRootContainer=newRoot;// Initial mount should not be batched.
DOMRenderer.unbatchedUpdates(function(){DOMRenderer.updateContainer(children,newRoot,parentComponent,callback);});}else{DOMRenderer.updateContainer(children,root,parentComponent,callback);}return DOMRenderer.getPublicRootInstance(root);}function createPortal(children,container){var key=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;!isValidContainer(container)?invariant(false,'Target container is not a DOM element.'):void 0;// TODO: pass ReactDOM portal implementation as third argument
return ReactPortal.createPortal(children,container,null,key);}var ReactDOMFiber={createPortal:createPortal,hydrate:function hydrate(element,container,callback){// TODO: throw or warn if we couldn't hydrate?
return renderSubtreeIntoContainer(null,element,container,true,callback);},render:function render(element,container,callback){return renderSubtreeIntoContainer(null,element,container,false,callback);},unstable_renderSubtreeIntoContainer:function unstable_renderSubtreeIntoContainer(parentComponent,element,containerNode,callback){!(parentComponent!=null&&ReactInstanceMap_1.has(parentComponent))?invariant(false,'parentComponent must be a valid React Component'):void 0;return renderSubtreeIntoContainer(parentComponent,element,containerNode,false,callback);},unmountComponentAtNode:function unmountComponentAtNode(container){!isValidContainer(container)?invariant(false,'unmountComponentAtNode(...): Target container is not a DOM element.'):void 0;if(container._reactRootContainer){{var rootEl=getReactRootElementInContainer(container);var renderedByDifferentReact=rootEl&&!ReactDOMComponentTree_1.getInstanceFromNode(rootEl);warning(!renderedByDifferentReact,"unmountComponentAtNode(): The node you're attempting to unmount "+'was rendered by another copy of React.');}// Unmount should not be batched.
DOMRenderer.unbatchedUpdates(function(){renderSubtreeIntoContainer(null,null,container,false,function(){container._reactRootContainer=null;});});// If you call unmountComponentAtNode twice in quick succession, you'll
// get `true` twice. That's probably fine?
return true;}else{{var _rootEl=getReactRootElementInContainer(container);var hasNonRootReactChild=!!(_rootEl&&ReactDOMComponentTree_1.getInstanceFromNode(_rootEl));// Check if the container itself is a React root node.
var isContainerReactRoot=container.nodeType===1&&isValidContainer(container.parentNode)&&!!container.parentNode._reactRootContainer;warning(!hasNonRootReactChild,"unmountComponentAtNode(): The node you're attempting to unmount "+'was rendered by React and is not a top-level container. %s',isContainerReactRoot?'You may have accidentally passed in a React root node instead '+'of its container.':'Instead, have the parent component update its state and '+'rerender in order to remove this component.');}return false;}},findDOMNode:findDOMNode_1,// Temporary alias since we already shipped React 16 RC with it.
// TODO: remove in React 17.
unstable_createPortal:createPortal,unstable_batchedUpdates:ReactGenericBatching_1.batchedUpdates,unstable_deferredUpdates:DOMRenderer.deferredUpdates,flushSync:DOMRenderer.flushSync,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{// For TapEventPlugin which is popular in open source
EventPluginHub:EventPluginHub_1,// Used by test-utils
EventPluginRegistry:EventPluginRegistry_1,EventPropagators:EventPropagators_1,ReactControlledComponent:ReactControlledComponent_1,ReactDOMComponentTree:ReactDOMComponentTree_1,ReactDOMEventListener:ReactDOMEventListener_1}};var foundDevTools=injectInternals({findFiberByHostInstance:ReactDOMComponentTree_1.getClosestInstanceFromNode,findHostInstanceByFiber:DOMRenderer.findHostInstance,// This is an enum because we may add more (e.g. profiler build)
bundleType:1,version:ReactVersion,rendererPackageName:'react-dom'});{if(!foundDevTools&&ExecutionEnvironment.canUseDOM&&window.top===window.self){// If we're in Chrome or Firefox, provide a download link if not installed.
if(navigator.userAgent.indexOf('Chrome')>-1&&navigator.userAgent.indexOf('Edge')===-1||navigator.userAgent.indexOf('Firefox')>-1){var protocol=window.location.protocol;// Don't warn in exotic cases like chrome-extension://.
if(/^(https?|file):$/.test(protocol)){console.info('%cDownload the React DevTools '+'for a better development experience: '+'https://fb.me/react-devtools'+(protocol==='file:'?'\nYou might need to use a local HTTP server (instead of file://): '+'https://fb.me/react-devtools-faq':''),'font-weight:bold');}}}}var ReactDOMFiberEntry=ReactDOMFiber;module.exports=ReactDOMFiberEntry;})();}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var hyphenate = __webpack_require__(26);

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var camelize = __webpack_require__(28);

var msPattern = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
}

module.exports = camelizeStyleName;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var performance = __webpack_require__(30);

var performanceNow;

/**
 * Detect if we can use `window.performance.now()` and gracefully fallback to
 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
 * because of Facebook's testing infrastructure.
 */
if (performance.now) {
  performanceNow = function performanceNow() {
    return performance.now();
  };
} else {
  performanceNow = function performanceNow() {
    return Date.now();
  };
}

module.exports = performanceNow;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var ExecutionEnvironment = __webpack_require__(9);

var performance;

if (ExecutionEnvironment.canUseDOM) {
  performance = window.performance || window.msPerformance || window.webkitPerformance;
}

module.exports = performance || {};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function isValidElement(object) {
    return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(32)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(33)();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var emptyFunction = __webpack_require__(1);
var invariant = __webpack_require__(3);
var warning = __webpack_require__(6);
var assign = __webpack_require__(4);

var ReactPropTypesSecret = __webpack_require__(8);
var checkPropTypes = __webpack_require__(7);

module.exports = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey] &&
          // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName);
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(false, 'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received %s at index %s.', getPostfixForTypeWarning(checker), i);
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(1);
var invariant = __webpack_require__(3);
var ReactPropTypesSecret = __webpack_require__(8);

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TalkToYourself = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _ChatMessageContainer = __webpack_require__(35);

var _ChatForm = __webpack_require__(38);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TalkToYourself = exports.TalkToYourself = function (_React$Component) {
    _inherits(TalkToYourself, _React$Component);

    function TalkToYourself(props) {
        _classCallCheck(this, TalkToYourself);

        var _this = _possibleConstructorReturn(this, (TalkToYourself.__proto__ || Object.getPrototypeOf(TalkToYourself)).call(this, props));

        _this.state = {
            messages: [],
            containerHeight: 0
        };

        _this.handleChatSubmition = _this.handleChatSubmition.bind(_this);
        _this.updateSize = _this.updateSize.bind(_this);
        return _this;
    }

    _createClass(TalkToYourself, [{
        key: 'handleChatSubmition',
        value: function handleChatSubmition(message) {
            this.setState(function (prevState) {
                return {
                    messages: prevState.messages.concat(message)
                };
            });
        }
    }, {
        key: 'updateSize',
        value: function updateSize() {
            var chatFormHeight = this.chatForm.divRef.clientHeight;
            var totalHeight = window.innerHeight;
            this.setState({ containerHeight: totalHeight - chatFormHeight });
        }

        // hook

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updateSize();
            window.addEventListener('resize', this.updateSize);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement(_ChatMessageContainer.ChatMessageContainer, { height: this.state.containerHeight, messages: this.state.messages }),
                _react2.default.createElement(_ChatForm.ChatForm, { handleSubmition: this.handleChatSubmition, ref: function ref(com) {
                        _this2.chatForm = com;
                    } })
            );
        }
    }]);

    return TalkToYourself;
}(_react2.default.Component);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChatMessageContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _ChatMessage = __webpack_require__(36);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatMessageContainer = exports.ChatMessageContainer = function (_React$Component) {
    _inherits(ChatMessageContainer, _React$Component);

    function ChatMessageContainer(props) {
        _classCallCheck(this, ChatMessageContainer);

        return _possibleConstructorReturn(this, (ChatMessageContainer.__proto__ || Object.getPrototypeOf(ChatMessageContainer)).call(this, props));
    }

    _createClass(ChatMessageContainer, [{
        key: 'render',
        value: function render() {
            var messages = this.props.messages;
            var list = messages.map(function (message) {
                return _react2.default.createElement(_ChatMessage.ChatMessage, { key: message.time.getTime().toString(), message: message });
            });
            var myImg = __webpack_require__(37);

            return _react2.default.createElement(
                'div',
                { className: 'message-container', style: { height: this.props.height } },
                _react2.default.createElement(
                    'div',
                    { className: 'intro' },
                    _react2.default.createElement(
                        'span',
                        { className: 'avatar' },
                        _react2.default.createElement(
                            'a',
                            { href: 'https://fb.com/linkin.kuun' },
                            _react2.default.createElement('img', { src: myImg })
                        )
                    ),
                    _react2.default.createElement(
                        'h1',
                        null,
                        'Talk to Yourself ',
                        _react2.default.createElement(
                            'div',
                            null,
                            'by ',
                            _react2.default.createElement(
                                'a',
                                { href: 'https://fb.com/linkin.kuun' },
                                'Thang Nguyen'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        'Hi! I am you. Talk to me and I will not answer AT ALL.'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'messages' },
                    list
                )
            );
        }
    }]);

    return ChatMessageContainer;
}(_react2.default.Component);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChatMessage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatMessage = exports.ChatMessage = function (_React$Component) {
    _inherits(ChatMessage, _React$Component);

    function ChatMessage(props) {
        _classCallCheck(this, ChatMessage);

        return _possibleConstructorReturn(this, (ChatMessage.__proto__ || Object.getPrototypeOf(ChatMessage)).call(this, props));
    }

    _createClass(ChatMessage, [{
        key: "formatTime",
        value: function formatTime(time) {
            return time.getHours() + ":" + time.getMinutes() + " - " + time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear();
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "message" },
                _react2.default.createElement(
                    "span",
                    { className: "message-text" },
                    this.props.message.content
                ),
                _react2.default.createElement(
                    "div",
                    { className: "message-time" },
                    this.formatTime(this.props.message.time)
                )
            );
        }
    }]);

    return ChatMessage;
}(_react2.default.Component);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "49ca49cea329154383c5cda1549cf581.jpg";

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChatForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatForm = exports.ChatForm = function (_React$Component) {
    _inherits(ChatForm, _React$Component);

    function ChatForm(props) {
        _classCallCheck(this, ChatForm);

        var _this = _possibleConstructorReturn(this, (ChatForm.__proto__ || Object.getPrototypeOf(ChatForm)).call(this, props));

        _this.state = { value: '' };

        _this.onSubmit = _this.onSubmit.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(ChatForm, [{
        key: 'onSubmit',
        value: function onSubmit(e) {
            e.preventDefault();
            var message = {
                content: this.state.value,
                time: new Date()
            };
            this.setState({ value: '' });
            this.props.handleSubmition(message);
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            this.setState({ value: e.target.value });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'chat-form', ref: function ref(element) {
                        _this2.divRef = element;
                    } },
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.onSubmit },
                    _react2.default.createElement(
                        'fieldset',
                        { className: 'input-wrapper' },
                        _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.onChange, autoFocus: true }),
                        _react2.default.createElement('button', { type: 'submit', className: 'send-button fa fa-send' })
                    )
                )
            );
        }
    }]);

    return ChatForm;
}(_react2.default.Component);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(40);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(16)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(undefined);
// imports


// module
exports.push([module.i, "* {\r\n    box-sizing: border-box;\r\n    font-family: Arial, Helvetica, sans-serif;\r\n}\r\n\r\nbody {\r\n    margin: 0;\r\n    background-color: white;\r\n}\r\n\r\n.chat-form .input-wrapper {\r\n    position: relative;\r\n    border: 1px silver solid;\r\n    border-radius: 15px;\r\n}\r\n\r\n.chat-form .input-wrapper input {\r\n    border: none;\r\n    width: 100%;\r\n    padding-right: 40px;\r\n    font-size: 1.2em;\r\n    background-color: transparent;\r\n}\r\n\r\n.chat-form .input-wrapper input:focus {\r\n    outline: none;\r\n}\r\n\r\n.chat-form .input-wrapper .send-button {\r\n    position: absolute;\r\n    transform: translateY(-50%);\r\n    top: 50%;\r\n    right: 10px;\r\n    border: none;\r\n    background: none;\r\n    color: #0d8eff;\r\n    font-size: 1.5em;\r\n    cursor: pointer;\r\n}\r\n\r\n.message {\r\n    text-align: right;\r\n}\r\n\r\nspan.message-text {\r\n    font-size: 1.5em;\r\n    background: whitesmoke;\r\n    padding: 5px 10px;\r\n    display: inline-block;\r\n    border-radius: 10px;\r\n}\r\n\r\n.message-container {\r\n    padding: 5px;\r\n    overflow-y: auto;\r\n}\r\n\r\n.message-time {\r\n    font-size: 0.7em;\r\n    color: gray;\r\n}\r\n\r\n.intro {\r\n    text-align: center;\r\n}\r\n\r\n.intro .avatar img {\r\n    width: 120px;\r\n    border-radius: 50%;\r\n}\r\n\r\n.intro h1 {\r\n    margin-top: 5px;\r\n    font-weight: normal;\r\n}\r\n\r\n.intro h1 div {\r\n    font-size: 0.6em;\r\n    color: silver;\r\n}\r\n\r\n.intro h1 div a {\r\n    color: gray;\r\n    text-decoration: none;\r\n}\r\n\r\n.intro h1 div a:hover {\r\n    text-decoration: underline;\r\n}", ""]);

// exports


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(43);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(16)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./font-awesome.min.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./font-awesome.min.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(undefined);
// imports


// module
exports.push([module.i, "/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */@font-face{font-family:'FontAwesome';src:url(" + __webpack_require__(44) + ");src:url(" + __webpack_require__(45) + "?#iefix&v=4.7.0) format('embedded-opentype'),url(" + __webpack_require__(46) + ") format('woff2'),url(" + __webpack_require__(47) + ") format('woff'),url(" + __webpack_require__(48) + ") format('truetype'),url(" + __webpack_require__(49) + "#fontawesomeregular) format('svg');font-weight:normal;font-style:normal}.fa{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-lg{font-size:1.33333333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571429em;text-align:center}.fa-ul{padding-left:0;margin-left:2.14285714em;list-style-type:none}.fa-ul>li{position:relative}.fa-li{position:absolute;left:-2.14285714em;width:2.14285714em;top:.14285714em;text-align:center}.fa-li.fa-lg{left:-1.85714286em}.fa-border{padding:.2em .25em .15em;border:solid .08em #eee;border-radius:.1em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left{margin-right:.3em}.fa.fa-pull-right{margin-left:.3em}.pull-right{float:right}.pull-left{float:left}.fa.pull-left{margin-right:.3em}.fa.pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fa-rotate-90{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";-webkit-transform:scale(-1, 1);-ms-transform:scale(-1, 1);transform:scale(-1, 1)}.fa-flip-vertical{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";-webkit-transform:scale(1, -1);-ms-transform:scale(1, -1);transform:scale(1, -1)}:root .fa-rotate-90,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-flip-horizontal,:root .fa-flip-vertical{filter:none}.fa-stack{position:relative;display:inline-block;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.fa-glass:before{content:\"\\F000\"}.fa-music:before{content:\"\\F001\"}.fa-search:before{content:\"\\F002\"}.fa-envelope-o:before{content:\"\\F003\"}.fa-heart:before{content:\"\\F004\"}.fa-star:before{content:\"\\F005\"}.fa-star-o:before{content:\"\\F006\"}.fa-user:before{content:\"\\F007\"}.fa-film:before{content:\"\\F008\"}.fa-th-large:before{content:\"\\F009\"}.fa-th:before{content:\"\\F00A\"}.fa-th-list:before{content:\"\\F00B\"}.fa-check:before{content:\"\\F00C\"}.fa-remove:before,.fa-close:before,.fa-times:before{content:\"\\F00D\"}.fa-search-plus:before{content:\"\\F00E\"}.fa-search-minus:before{content:\"\\F010\"}.fa-power-off:before{content:\"\\F011\"}.fa-signal:before{content:\"\\F012\"}.fa-gear:before,.fa-cog:before{content:\"\\F013\"}.fa-trash-o:before{content:\"\\F014\"}.fa-home:before{content:\"\\F015\"}.fa-file-o:before{content:\"\\F016\"}.fa-clock-o:before{content:\"\\F017\"}.fa-road:before{content:\"\\F018\"}.fa-download:before{content:\"\\F019\"}.fa-arrow-circle-o-down:before{content:\"\\F01A\"}.fa-arrow-circle-o-up:before{content:\"\\F01B\"}.fa-inbox:before{content:\"\\F01C\"}.fa-play-circle-o:before{content:\"\\F01D\"}.fa-rotate-right:before,.fa-repeat:before{content:\"\\F01E\"}.fa-refresh:before{content:\"\\F021\"}.fa-list-alt:before{content:\"\\F022\"}.fa-lock:before{content:\"\\F023\"}.fa-flag:before{content:\"\\F024\"}.fa-headphones:before{content:\"\\F025\"}.fa-volume-off:before{content:\"\\F026\"}.fa-volume-down:before{content:\"\\F027\"}.fa-volume-up:before{content:\"\\F028\"}.fa-qrcode:before{content:\"\\F029\"}.fa-barcode:before{content:\"\\F02A\"}.fa-tag:before{content:\"\\F02B\"}.fa-tags:before{content:\"\\F02C\"}.fa-book:before{content:\"\\F02D\"}.fa-bookmark:before{content:\"\\F02E\"}.fa-print:before{content:\"\\F02F\"}.fa-camera:before{content:\"\\F030\"}.fa-font:before{content:\"\\F031\"}.fa-bold:before{content:\"\\F032\"}.fa-italic:before{content:\"\\F033\"}.fa-text-height:before{content:\"\\F034\"}.fa-text-width:before{content:\"\\F035\"}.fa-align-left:before{content:\"\\F036\"}.fa-align-center:before{content:\"\\F037\"}.fa-align-right:before{content:\"\\F038\"}.fa-align-justify:before{content:\"\\F039\"}.fa-list:before{content:\"\\F03A\"}.fa-dedent:before,.fa-outdent:before{content:\"\\F03B\"}.fa-indent:before{content:\"\\F03C\"}.fa-video-camera:before{content:\"\\F03D\"}.fa-photo:before,.fa-image:before,.fa-picture-o:before{content:\"\\F03E\"}.fa-pencil:before{content:\"\\F040\"}.fa-map-marker:before{content:\"\\F041\"}.fa-adjust:before{content:\"\\F042\"}.fa-tint:before{content:\"\\F043\"}.fa-edit:before,.fa-pencil-square-o:before{content:\"\\F044\"}.fa-share-square-o:before{content:\"\\F045\"}.fa-check-square-o:before{content:\"\\F046\"}.fa-arrows:before{content:\"\\F047\"}.fa-step-backward:before{content:\"\\F048\"}.fa-fast-backward:before{content:\"\\F049\"}.fa-backward:before{content:\"\\F04A\"}.fa-play:before{content:\"\\F04B\"}.fa-pause:before{content:\"\\F04C\"}.fa-stop:before{content:\"\\F04D\"}.fa-forward:before{content:\"\\F04E\"}.fa-fast-forward:before{content:\"\\F050\"}.fa-step-forward:before{content:\"\\F051\"}.fa-eject:before{content:\"\\F052\"}.fa-chevron-left:before{content:\"\\F053\"}.fa-chevron-right:before{content:\"\\F054\"}.fa-plus-circle:before{content:\"\\F055\"}.fa-minus-circle:before{content:\"\\F056\"}.fa-times-circle:before{content:\"\\F057\"}.fa-check-circle:before{content:\"\\F058\"}.fa-question-circle:before{content:\"\\F059\"}.fa-info-circle:before{content:\"\\F05A\"}.fa-crosshairs:before{content:\"\\F05B\"}.fa-times-circle-o:before{content:\"\\F05C\"}.fa-check-circle-o:before{content:\"\\F05D\"}.fa-ban:before{content:\"\\F05E\"}.fa-arrow-left:before{content:\"\\F060\"}.fa-arrow-right:before{content:\"\\F061\"}.fa-arrow-up:before{content:\"\\F062\"}.fa-arrow-down:before{content:\"\\F063\"}.fa-mail-forward:before,.fa-share:before{content:\"\\F064\"}.fa-expand:before{content:\"\\F065\"}.fa-compress:before{content:\"\\F066\"}.fa-plus:before{content:\"\\F067\"}.fa-minus:before{content:\"\\F068\"}.fa-asterisk:before{content:\"\\F069\"}.fa-exclamation-circle:before{content:\"\\F06A\"}.fa-gift:before{content:\"\\F06B\"}.fa-leaf:before{content:\"\\F06C\"}.fa-fire:before{content:\"\\F06D\"}.fa-eye:before{content:\"\\F06E\"}.fa-eye-slash:before{content:\"\\F070\"}.fa-warning:before,.fa-exclamation-triangle:before{content:\"\\F071\"}.fa-plane:before{content:\"\\F072\"}.fa-calendar:before{content:\"\\F073\"}.fa-random:before{content:\"\\F074\"}.fa-comment:before{content:\"\\F075\"}.fa-magnet:before{content:\"\\F076\"}.fa-chevron-up:before{content:\"\\F077\"}.fa-chevron-down:before{content:\"\\F078\"}.fa-retweet:before{content:\"\\F079\"}.fa-shopping-cart:before{content:\"\\F07A\"}.fa-folder:before{content:\"\\F07B\"}.fa-folder-open:before{content:\"\\F07C\"}.fa-arrows-v:before{content:\"\\F07D\"}.fa-arrows-h:before{content:\"\\F07E\"}.fa-bar-chart-o:before,.fa-bar-chart:before{content:\"\\F080\"}.fa-twitter-square:before{content:\"\\F081\"}.fa-facebook-square:before{content:\"\\F082\"}.fa-camera-retro:before{content:\"\\F083\"}.fa-key:before{content:\"\\F084\"}.fa-gears:before,.fa-cogs:before{content:\"\\F085\"}.fa-comments:before{content:\"\\F086\"}.fa-thumbs-o-up:before{content:\"\\F087\"}.fa-thumbs-o-down:before{content:\"\\F088\"}.fa-star-half:before{content:\"\\F089\"}.fa-heart-o:before{content:\"\\F08A\"}.fa-sign-out:before{content:\"\\F08B\"}.fa-linkedin-square:before{content:\"\\F08C\"}.fa-thumb-tack:before{content:\"\\F08D\"}.fa-external-link:before{content:\"\\F08E\"}.fa-sign-in:before{content:\"\\F090\"}.fa-trophy:before{content:\"\\F091\"}.fa-github-square:before{content:\"\\F092\"}.fa-upload:before{content:\"\\F093\"}.fa-lemon-o:before{content:\"\\F094\"}.fa-phone:before{content:\"\\F095\"}.fa-square-o:before{content:\"\\F096\"}.fa-bookmark-o:before{content:\"\\F097\"}.fa-phone-square:before{content:\"\\F098\"}.fa-twitter:before{content:\"\\F099\"}.fa-facebook-f:before,.fa-facebook:before{content:\"\\F09A\"}.fa-github:before{content:\"\\F09B\"}.fa-unlock:before{content:\"\\F09C\"}.fa-credit-card:before{content:\"\\F09D\"}.fa-feed:before,.fa-rss:before{content:\"\\F09E\"}.fa-hdd-o:before{content:\"\\F0A0\"}.fa-bullhorn:before{content:\"\\F0A1\"}.fa-bell:before{content:\"\\F0F3\"}.fa-certificate:before{content:\"\\F0A3\"}.fa-hand-o-right:before{content:\"\\F0A4\"}.fa-hand-o-left:before{content:\"\\F0A5\"}.fa-hand-o-up:before{content:\"\\F0A6\"}.fa-hand-o-down:before{content:\"\\F0A7\"}.fa-arrow-circle-left:before{content:\"\\F0A8\"}.fa-arrow-circle-right:before{content:\"\\F0A9\"}.fa-arrow-circle-up:before{content:\"\\F0AA\"}.fa-arrow-circle-down:before{content:\"\\F0AB\"}.fa-globe:before{content:\"\\F0AC\"}.fa-wrench:before{content:\"\\F0AD\"}.fa-tasks:before{content:\"\\F0AE\"}.fa-filter:before{content:\"\\F0B0\"}.fa-briefcase:before{content:\"\\F0B1\"}.fa-arrows-alt:before{content:\"\\F0B2\"}.fa-group:before,.fa-users:before{content:\"\\F0C0\"}.fa-chain:before,.fa-link:before{content:\"\\F0C1\"}.fa-cloud:before{content:\"\\F0C2\"}.fa-flask:before{content:\"\\F0C3\"}.fa-cut:before,.fa-scissors:before{content:\"\\F0C4\"}.fa-copy:before,.fa-files-o:before{content:\"\\F0C5\"}.fa-paperclip:before{content:\"\\F0C6\"}.fa-save:before,.fa-floppy-o:before{content:\"\\F0C7\"}.fa-square:before{content:\"\\F0C8\"}.fa-navicon:before,.fa-reorder:before,.fa-bars:before{content:\"\\F0C9\"}.fa-list-ul:before{content:\"\\F0CA\"}.fa-list-ol:before{content:\"\\F0CB\"}.fa-strikethrough:before{content:\"\\F0CC\"}.fa-underline:before{content:\"\\F0CD\"}.fa-table:before{content:\"\\F0CE\"}.fa-magic:before{content:\"\\F0D0\"}.fa-truck:before{content:\"\\F0D1\"}.fa-pinterest:before{content:\"\\F0D2\"}.fa-pinterest-square:before{content:\"\\F0D3\"}.fa-google-plus-square:before{content:\"\\F0D4\"}.fa-google-plus:before{content:\"\\F0D5\"}.fa-money:before{content:\"\\F0D6\"}.fa-caret-down:before{content:\"\\F0D7\"}.fa-caret-up:before{content:\"\\F0D8\"}.fa-caret-left:before{content:\"\\F0D9\"}.fa-caret-right:before{content:\"\\F0DA\"}.fa-columns:before{content:\"\\F0DB\"}.fa-unsorted:before,.fa-sort:before{content:\"\\F0DC\"}.fa-sort-down:before,.fa-sort-desc:before{content:\"\\F0DD\"}.fa-sort-up:before,.fa-sort-asc:before{content:\"\\F0DE\"}.fa-envelope:before{content:\"\\F0E0\"}.fa-linkedin:before{content:\"\\F0E1\"}.fa-rotate-left:before,.fa-undo:before{content:\"\\F0E2\"}.fa-legal:before,.fa-gavel:before{content:\"\\F0E3\"}.fa-dashboard:before,.fa-tachometer:before{content:\"\\F0E4\"}.fa-comment-o:before{content:\"\\F0E5\"}.fa-comments-o:before{content:\"\\F0E6\"}.fa-flash:before,.fa-bolt:before{content:\"\\F0E7\"}.fa-sitemap:before{content:\"\\F0E8\"}.fa-umbrella:before{content:\"\\F0E9\"}.fa-paste:before,.fa-clipboard:before{content:\"\\F0EA\"}.fa-lightbulb-o:before{content:\"\\F0EB\"}.fa-exchange:before{content:\"\\F0EC\"}.fa-cloud-download:before{content:\"\\F0ED\"}.fa-cloud-upload:before{content:\"\\F0EE\"}.fa-user-md:before{content:\"\\F0F0\"}.fa-stethoscope:before{content:\"\\F0F1\"}.fa-suitcase:before{content:\"\\F0F2\"}.fa-bell-o:before{content:\"\\F0A2\"}.fa-coffee:before{content:\"\\F0F4\"}.fa-cutlery:before{content:\"\\F0F5\"}.fa-file-text-o:before{content:\"\\F0F6\"}.fa-building-o:before{content:\"\\F0F7\"}.fa-hospital-o:before{content:\"\\F0F8\"}.fa-ambulance:before{content:\"\\F0F9\"}.fa-medkit:before{content:\"\\F0FA\"}.fa-fighter-jet:before{content:\"\\F0FB\"}.fa-beer:before{content:\"\\F0FC\"}.fa-h-square:before{content:\"\\F0FD\"}.fa-plus-square:before{content:\"\\F0FE\"}.fa-angle-double-left:before{content:\"\\F100\"}.fa-angle-double-right:before{content:\"\\F101\"}.fa-angle-double-up:before{content:\"\\F102\"}.fa-angle-double-down:before{content:\"\\F103\"}.fa-angle-left:before{content:\"\\F104\"}.fa-angle-right:before{content:\"\\F105\"}.fa-angle-up:before{content:\"\\F106\"}.fa-angle-down:before{content:\"\\F107\"}.fa-desktop:before{content:\"\\F108\"}.fa-laptop:before{content:\"\\F109\"}.fa-tablet:before{content:\"\\F10A\"}.fa-mobile-phone:before,.fa-mobile:before{content:\"\\F10B\"}.fa-circle-o:before{content:\"\\F10C\"}.fa-quote-left:before{content:\"\\F10D\"}.fa-quote-right:before{content:\"\\F10E\"}.fa-spinner:before{content:\"\\F110\"}.fa-circle:before{content:\"\\F111\"}.fa-mail-reply:before,.fa-reply:before{content:\"\\F112\"}.fa-github-alt:before{content:\"\\F113\"}.fa-folder-o:before{content:\"\\F114\"}.fa-folder-open-o:before{content:\"\\F115\"}.fa-smile-o:before{content:\"\\F118\"}.fa-frown-o:before{content:\"\\F119\"}.fa-meh-o:before{content:\"\\F11A\"}.fa-gamepad:before{content:\"\\F11B\"}.fa-keyboard-o:before{content:\"\\F11C\"}.fa-flag-o:before{content:\"\\F11D\"}.fa-flag-checkered:before{content:\"\\F11E\"}.fa-terminal:before{content:\"\\F120\"}.fa-code:before{content:\"\\F121\"}.fa-mail-reply-all:before,.fa-reply-all:before{content:\"\\F122\"}.fa-star-half-empty:before,.fa-star-half-full:before,.fa-star-half-o:before{content:\"\\F123\"}.fa-location-arrow:before{content:\"\\F124\"}.fa-crop:before{content:\"\\F125\"}.fa-code-fork:before{content:\"\\F126\"}.fa-unlink:before,.fa-chain-broken:before{content:\"\\F127\"}.fa-question:before{content:\"\\F128\"}.fa-info:before{content:\"\\F129\"}.fa-exclamation:before{content:\"\\F12A\"}.fa-superscript:before{content:\"\\F12B\"}.fa-subscript:before{content:\"\\F12C\"}.fa-eraser:before{content:\"\\F12D\"}.fa-puzzle-piece:before{content:\"\\F12E\"}.fa-microphone:before{content:\"\\F130\"}.fa-microphone-slash:before{content:\"\\F131\"}.fa-shield:before{content:\"\\F132\"}.fa-calendar-o:before{content:\"\\F133\"}.fa-fire-extinguisher:before{content:\"\\F134\"}.fa-rocket:before{content:\"\\F135\"}.fa-maxcdn:before{content:\"\\F136\"}.fa-chevron-circle-left:before{content:\"\\F137\"}.fa-chevron-circle-right:before{content:\"\\F138\"}.fa-chevron-circle-up:before{content:\"\\F139\"}.fa-chevron-circle-down:before{content:\"\\F13A\"}.fa-html5:before{content:\"\\F13B\"}.fa-css3:before{content:\"\\F13C\"}.fa-anchor:before{content:\"\\F13D\"}.fa-unlock-alt:before{content:\"\\F13E\"}.fa-bullseye:before{content:\"\\F140\"}.fa-ellipsis-h:before{content:\"\\F141\"}.fa-ellipsis-v:before{content:\"\\F142\"}.fa-rss-square:before{content:\"\\F143\"}.fa-play-circle:before{content:\"\\F144\"}.fa-ticket:before{content:\"\\F145\"}.fa-minus-square:before{content:\"\\F146\"}.fa-minus-square-o:before{content:\"\\F147\"}.fa-level-up:before{content:\"\\F148\"}.fa-level-down:before{content:\"\\F149\"}.fa-check-square:before{content:\"\\F14A\"}.fa-pencil-square:before{content:\"\\F14B\"}.fa-external-link-square:before{content:\"\\F14C\"}.fa-share-square:before{content:\"\\F14D\"}.fa-compass:before{content:\"\\F14E\"}.fa-toggle-down:before,.fa-caret-square-o-down:before{content:\"\\F150\"}.fa-toggle-up:before,.fa-caret-square-o-up:before{content:\"\\F151\"}.fa-toggle-right:before,.fa-caret-square-o-right:before{content:\"\\F152\"}.fa-euro:before,.fa-eur:before{content:\"\\F153\"}.fa-gbp:before{content:\"\\F154\"}.fa-dollar:before,.fa-usd:before{content:\"\\F155\"}.fa-rupee:before,.fa-inr:before{content:\"\\F156\"}.fa-cny:before,.fa-rmb:before,.fa-yen:before,.fa-jpy:before{content:\"\\F157\"}.fa-ruble:before,.fa-rouble:before,.fa-rub:before{content:\"\\F158\"}.fa-won:before,.fa-krw:before{content:\"\\F159\"}.fa-bitcoin:before,.fa-btc:before{content:\"\\F15A\"}.fa-file:before{content:\"\\F15B\"}.fa-file-text:before{content:\"\\F15C\"}.fa-sort-alpha-asc:before{content:\"\\F15D\"}.fa-sort-alpha-desc:before{content:\"\\F15E\"}.fa-sort-amount-asc:before{content:\"\\F160\"}.fa-sort-amount-desc:before{content:\"\\F161\"}.fa-sort-numeric-asc:before{content:\"\\F162\"}.fa-sort-numeric-desc:before{content:\"\\F163\"}.fa-thumbs-up:before{content:\"\\F164\"}.fa-thumbs-down:before{content:\"\\F165\"}.fa-youtube-square:before{content:\"\\F166\"}.fa-youtube:before{content:\"\\F167\"}.fa-xing:before{content:\"\\F168\"}.fa-xing-square:before{content:\"\\F169\"}.fa-youtube-play:before{content:\"\\F16A\"}.fa-dropbox:before{content:\"\\F16B\"}.fa-stack-overflow:before{content:\"\\F16C\"}.fa-instagram:before{content:\"\\F16D\"}.fa-flickr:before{content:\"\\F16E\"}.fa-adn:before{content:\"\\F170\"}.fa-bitbucket:before{content:\"\\F171\"}.fa-bitbucket-square:before{content:\"\\F172\"}.fa-tumblr:before{content:\"\\F173\"}.fa-tumblr-square:before{content:\"\\F174\"}.fa-long-arrow-down:before{content:\"\\F175\"}.fa-long-arrow-up:before{content:\"\\F176\"}.fa-long-arrow-left:before{content:\"\\F177\"}.fa-long-arrow-right:before{content:\"\\F178\"}.fa-apple:before{content:\"\\F179\"}.fa-windows:before{content:\"\\F17A\"}.fa-android:before{content:\"\\F17B\"}.fa-linux:before{content:\"\\F17C\"}.fa-dribbble:before{content:\"\\F17D\"}.fa-skype:before{content:\"\\F17E\"}.fa-foursquare:before{content:\"\\F180\"}.fa-trello:before{content:\"\\F181\"}.fa-female:before{content:\"\\F182\"}.fa-male:before{content:\"\\F183\"}.fa-gittip:before,.fa-gratipay:before{content:\"\\F184\"}.fa-sun-o:before{content:\"\\F185\"}.fa-moon-o:before{content:\"\\F186\"}.fa-archive:before{content:\"\\F187\"}.fa-bug:before{content:\"\\F188\"}.fa-vk:before{content:\"\\F189\"}.fa-weibo:before{content:\"\\F18A\"}.fa-renren:before{content:\"\\F18B\"}.fa-pagelines:before{content:\"\\F18C\"}.fa-stack-exchange:before{content:\"\\F18D\"}.fa-arrow-circle-o-right:before{content:\"\\F18E\"}.fa-arrow-circle-o-left:before{content:\"\\F190\"}.fa-toggle-left:before,.fa-caret-square-o-left:before{content:\"\\F191\"}.fa-dot-circle-o:before{content:\"\\F192\"}.fa-wheelchair:before{content:\"\\F193\"}.fa-vimeo-square:before{content:\"\\F194\"}.fa-turkish-lira:before,.fa-try:before{content:\"\\F195\"}.fa-plus-square-o:before{content:\"\\F196\"}.fa-space-shuttle:before{content:\"\\F197\"}.fa-slack:before{content:\"\\F198\"}.fa-envelope-square:before{content:\"\\F199\"}.fa-wordpress:before{content:\"\\F19A\"}.fa-openid:before{content:\"\\F19B\"}.fa-institution:before,.fa-bank:before,.fa-university:before{content:\"\\F19C\"}.fa-mortar-board:before,.fa-graduation-cap:before{content:\"\\F19D\"}.fa-yahoo:before{content:\"\\F19E\"}.fa-google:before{content:\"\\F1A0\"}.fa-reddit:before{content:\"\\F1A1\"}.fa-reddit-square:before{content:\"\\F1A2\"}.fa-stumbleupon-circle:before{content:\"\\F1A3\"}.fa-stumbleupon:before{content:\"\\F1A4\"}.fa-delicious:before{content:\"\\F1A5\"}.fa-digg:before{content:\"\\F1A6\"}.fa-pied-piper-pp:before{content:\"\\F1A7\"}.fa-pied-piper-alt:before{content:\"\\F1A8\"}.fa-drupal:before{content:\"\\F1A9\"}.fa-joomla:before{content:\"\\F1AA\"}.fa-language:before{content:\"\\F1AB\"}.fa-fax:before{content:\"\\F1AC\"}.fa-building:before{content:\"\\F1AD\"}.fa-child:before{content:\"\\F1AE\"}.fa-paw:before{content:\"\\F1B0\"}.fa-spoon:before{content:\"\\F1B1\"}.fa-cube:before{content:\"\\F1B2\"}.fa-cubes:before{content:\"\\F1B3\"}.fa-behance:before{content:\"\\F1B4\"}.fa-behance-square:before{content:\"\\F1B5\"}.fa-steam:before{content:\"\\F1B6\"}.fa-steam-square:before{content:\"\\F1B7\"}.fa-recycle:before{content:\"\\F1B8\"}.fa-automobile:before,.fa-car:before{content:\"\\F1B9\"}.fa-cab:before,.fa-taxi:before{content:\"\\F1BA\"}.fa-tree:before{content:\"\\F1BB\"}.fa-spotify:before{content:\"\\F1BC\"}.fa-deviantart:before{content:\"\\F1BD\"}.fa-soundcloud:before{content:\"\\F1BE\"}.fa-database:before{content:\"\\F1C0\"}.fa-file-pdf-o:before{content:\"\\F1C1\"}.fa-file-word-o:before{content:\"\\F1C2\"}.fa-file-excel-o:before{content:\"\\F1C3\"}.fa-file-powerpoint-o:before{content:\"\\F1C4\"}.fa-file-photo-o:before,.fa-file-picture-o:before,.fa-file-image-o:before{content:\"\\F1C5\"}.fa-file-zip-o:before,.fa-file-archive-o:before{content:\"\\F1C6\"}.fa-file-sound-o:before,.fa-file-audio-o:before{content:\"\\F1C7\"}.fa-file-movie-o:before,.fa-file-video-o:before{content:\"\\F1C8\"}.fa-file-code-o:before{content:\"\\F1C9\"}.fa-vine:before{content:\"\\F1CA\"}.fa-codepen:before{content:\"\\F1CB\"}.fa-jsfiddle:before{content:\"\\F1CC\"}.fa-life-bouy:before,.fa-life-buoy:before,.fa-life-saver:before,.fa-support:before,.fa-life-ring:before{content:\"\\F1CD\"}.fa-circle-o-notch:before{content:\"\\F1CE\"}.fa-ra:before,.fa-resistance:before,.fa-rebel:before{content:\"\\F1D0\"}.fa-ge:before,.fa-empire:before{content:\"\\F1D1\"}.fa-git-square:before{content:\"\\F1D2\"}.fa-git:before{content:\"\\F1D3\"}.fa-y-combinator-square:before,.fa-yc-square:before,.fa-hacker-news:before{content:\"\\F1D4\"}.fa-tencent-weibo:before{content:\"\\F1D5\"}.fa-qq:before{content:\"\\F1D6\"}.fa-wechat:before,.fa-weixin:before{content:\"\\F1D7\"}.fa-send:before,.fa-paper-plane:before{content:\"\\F1D8\"}.fa-send-o:before,.fa-paper-plane-o:before{content:\"\\F1D9\"}.fa-history:before{content:\"\\F1DA\"}.fa-circle-thin:before{content:\"\\F1DB\"}.fa-header:before{content:\"\\F1DC\"}.fa-paragraph:before{content:\"\\F1DD\"}.fa-sliders:before{content:\"\\F1DE\"}.fa-share-alt:before{content:\"\\F1E0\"}.fa-share-alt-square:before{content:\"\\F1E1\"}.fa-bomb:before{content:\"\\F1E2\"}.fa-soccer-ball-o:before,.fa-futbol-o:before{content:\"\\F1E3\"}.fa-tty:before{content:\"\\F1E4\"}.fa-binoculars:before{content:\"\\F1E5\"}.fa-plug:before{content:\"\\F1E6\"}.fa-slideshare:before{content:\"\\F1E7\"}.fa-twitch:before{content:\"\\F1E8\"}.fa-yelp:before{content:\"\\F1E9\"}.fa-newspaper-o:before{content:\"\\F1EA\"}.fa-wifi:before{content:\"\\F1EB\"}.fa-calculator:before{content:\"\\F1EC\"}.fa-paypal:before{content:\"\\F1ED\"}.fa-google-wallet:before{content:\"\\F1EE\"}.fa-cc-visa:before{content:\"\\F1F0\"}.fa-cc-mastercard:before{content:\"\\F1F1\"}.fa-cc-discover:before{content:\"\\F1F2\"}.fa-cc-amex:before{content:\"\\F1F3\"}.fa-cc-paypal:before{content:\"\\F1F4\"}.fa-cc-stripe:before{content:\"\\F1F5\"}.fa-bell-slash:before{content:\"\\F1F6\"}.fa-bell-slash-o:before{content:\"\\F1F7\"}.fa-trash:before{content:\"\\F1F8\"}.fa-copyright:before{content:\"\\F1F9\"}.fa-at:before{content:\"\\F1FA\"}.fa-eyedropper:before{content:\"\\F1FB\"}.fa-paint-brush:before{content:\"\\F1FC\"}.fa-birthday-cake:before{content:\"\\F1FD\"}.fa-area-chart:before{content:\"\\F1FE\"}.fa-pie-chart:before{content:\"\\F200\"}.fa-line-chart:before{content:\"\\F201\"}.fa-lastfm:before{content:\"\\F202\"}.fa-lastfm-square:before{content:\"\\F203\"}.fa-toggle-off:before{content:\"\\F204\"}.fa-toggle-on:before{content:\"\\F205\"}.fa-bicycle:before{content:\"\\F206\"}.fa-bus:before{content:\"\\F207\"}.fa-ioxhost:before{content:\"\\F208\"}.fa-angellist:before{content:\"\\F209\"}.fa-cc:before{content:\"\\F20A\"}.fa-shekel:before,.fa-sheqel:before,.fa-ils:before{content:\"\\F20B\"}.fa-meanpath:before{content:\"\\F20C\"}.fa-buysellads:before{content:\"\\F20D\"}.fa-connectdevelop:before{content:\"\\F20E\"}.fa-dashcube:before{content:\"\\F210\"}.fa-forumbee:before{content:\"\\F211\"}.fa-leanpub:before{content:\"\\F212\"}.fa-sellsy:before{content:\"\\F213\"}.fa-shirtsinbulk:before{content:\"\\F214\"}.fa-simplybuilt:before{content:\"\\F215\"}.fa-skyatlas:before{content:\"\\F216\"}.fa-cart-plus:before{content:\"\\F217\"}.fa-cart-arrow-down:before{content:\"\\F218\"}.fa-diamond:before{content:\"\\F219\"}.fa-ship:before{content:\"\\F21A\"}.fa-user-secret:before{content:\"\\F21B\"}.fa-motorcycle:before{content:\"\\F21C\"}.fa-street-view:before{content:\"\\F21D\"}.fa-heartbeat:before{content:\"\\F21E\"}.fa-venus:before{content:\"\\F221\"}.fa-mars:before{content:\"\\F222\"}.fa-mercury:before{content:\"\\F223\"}.fa-intersex:before,.fa-transgender:before{content:\"\\F224\"}.fa-transgender-alt:before{content:\"\\F225\"}.fa-venus-double:before{content:\"\\F226\"}.fa-mars-double:before{content:\"\\F227\"}.fa-venus-mars:before{content:\"\\F228\"}.fa-mars-stroke:before{content:\"\\F229\"}.fa-mars-stroke-v:before{content:\"\\F22A\"}.fa-mars-stroke-h:before{content:\"\\F22B\"}.fa-neuter:before{content:\"\\F22C\"}.fa-genderless:before{content:\"\\F22D\"}.fa-facebook-official:before{content:\"\\F230\"}.fa-pinterest-p:before{content:\"\\F231\"}.fa-whatsapp:before{content:\"\\F232\"}.fa-server:before{content:\"\\F233\"}.fa-user-plus:before{content:\"\\F234\"}.fa-user-times:before{content:\"\\F235\"}.fa-hotel:before,.fa-bed:before{content:\"\\F236\"}.fa-viacoin:before{content:\"\\F237\"}.fa-train:before{content:\"\\F238\"}.fa-subway:before{content:\"\\F239\"}.fa-medium:before{content:\"\\F23A\"}.fa-yc:before,.fa-y-combinator:before{content:\"\\F23B\"}.fa-optin-monster:before{content:\"\\F23C\"}.fa-opencart:before{content:\"\\F23D\"}.fa-expeditedssl:before{content:\"\\F23E\"}.fa-battery-4:before,.fa-battery:before,.fa-battery-full:before{content:\"\\F240\"}.fa-battery-3:before,.fa-battery-three-quarters:before{content:\"\\F241\"}.fa-battery-2:before,.fa-battery-half:before{content:\"\\F242\"}.fa-battery-1:before,.fa-battery-quarter:before{content:\"\\F243\"}.fa-battery-0:before,.fa-battery-empty:before{content:\"\\F244\"}.fa-mouse-pointer:before{content:\"\\F245\"}.fa-i-cursor:before{content:\"\\F246\"}.fa-object-group:before{content:\"\\F247\"}.fa-object-ungroup:before{content:\"\\F248\"}.fa-sticky-note:before{content:\"\\F249\"}.fa-sticky-note-o:before{content:\"\\F24A\"}.fa-cc-jcb:before{content:\"\\F24B\"}.fa-cc-diners-club:before{content:\"\\F24C\"}.fa-clone:before{content:\"\\F24D\"}.fa-balance-scale:before{content:\"\\F24E\"}.fa-hourglass-o:before{content:\"\\F250\"}.fa-hourglass-1:before,.fa-hourglass-start:before{content:\"\\F251\"}.fa-hourglass-2:before,.fa-hourglass-half:before{content:\"\\F252\"}.fa-hourglass-3:before,.fa-hourglass-end:before{content:\"\\F253\"}.fa-hourglass:before{content:\"\\F254\"}.fa-hand-grab-o:before,.fa-hand-rock-o:before{content:\"\\F255\"}.fa-hand-stop-o:before,.fa-hand-paper-o:before{content:\"\\F256\"}.fa-hand-scissors-o:before{content:\"\\F257\"}.fa-hand-lizard-o:before{content:\"\\F258\"}.fa-hand-spock-o:before{content:\"\\F259\"}.fa-hand-pointer-o:before{content:\"\\F25A\"}.fa-hand-peace-o:before{content:\"\\F25B\"}.fa-trademark:before{content:\"\\F25C\"}.fa-registered:before{content:\"\\F25D\"}.fa-creative-commons:before{content:\"\\F25E\"}.fa-gg:before{content:\"\\F260\"}.fa-gg-circle:before{content:\"\\F261\"}.fa-tripadvisor:before{content:\"\\F262\"}.fa-odnoklassniki:before{content:\"\\F263\"}.fa-odnoklassniki-square:before{content:\"\\F264\"}.fa-get-pocket:before{content:\"\\F265\"}.fa-wikipedia-w:before{content:\"\\F266\"}.fa-safari:before{content:\"\\F267\"}.fa-chrome:before{content:\"\\F268\"}.fa-firefox:before{content:\"\\F269\"}.fa-opera:before{content:\"\\F26A\"}.fa-internet-explorer:before{content:\"\\F26B\"}.fa-tv:before,.fa-television:before{content:\"\\F26C\"}.fa-contao:before{content:\"\\F26D\"}.fa-500px:before{content:\"\\F26E\"}.fa-amazon:before{content:\"\\F270\"}.fa-calendar-plus-o:before{content:\"\\F271\"}.fa-calendar-minus-o:before{content:\"\\F272\"}.fa-calendar-times-o:before{content:\"\\F273\"}.fa-calendar-check-o:before{content:\"\\F274\"}.fa-industry:before{content:\"\\F275\"}.fa-map-pin:before{content:\"\\F276\"}.fa-map-signs:before{content:\"\\F277\"}.fa-map-o:before{content:\"\\F278\"}.fa-map:before{content:\"\\F279\"}.fa-commenting:before{content:\"\\F27A\"}.fa-commenting-o:before{content:\"\\F27B\"}.fa-houzz:before{content:\"\\F27C\"}.fa-vimeo:before{content:\"\\F27D\"}.fa-black-tie:before{content:\"\\F27E\"}.fa-fonticons:before{content:\"\\F280\"}.fa-reddit-alien:before{content:\"\\F281\"}.fa-edge:before{content:\"\\F282\"}.fa-credit-card-alt:before{content:\"\\F283\"}.fa-codiepie:before{content:\"\\F284\"}.fa-modx:before{content:\"\\F285\"}.fa-fort-awesome:before{content:\"\\F286\"}.fa-usb:before{content:\"\\F287\"}.fa-product-hunt:before{content:\"\\F288\"}.fa-mixcloud:before{content:\"\\F289\"}.fa-scribd:before{content:\"\\F28A\"}.fa-pause-circle:before{content:\"\\F28B\"}.fa-pause-circle-o:before{content:\"\\F28C\"}.fa-stop-circle:before{content:\"\\F28D\"}.fa-stop-circle-o:before{content:\"\\F28E\"}.fa-shopping-bag:before{content:\"\\F290\"}.fa-shopping-basket:before{content:\"\\F291\"}.fa-hashtag:before{content:\"\\F292\"}.fa-bluetooth:before{content:\"\\F293\"}.fa-bluetooth-b:before{content:\"\\F294\"}.fa-percent:before{content:\"\\F295\"}.fa-gitlab:before{content:\"\\F296\"}.fa-wpbeginner:before{content:\"\\F297\"}.fa-wpforms:before{content:\"\\F298\"}.fa-envira:before{content:\"\\F299\"}.fa-universal-access:before{content:\"\\F29A\"}.fa-wheelchair-alt:before{content:\"\\F29B\"}.fa-question-circle-o:before{content:\"\\F29C\"}.fa-blind:before{content:\"\\F29D\"}.fa-audio-description:before{content:\"\\F29E\"}.fa-volume-control-phone:before{content:\"\\F2A0\"}.fa-braille:before{content:\"\\F2A1\"}.fa-assistive-listening-systems:before{content:\"\\F2A2\"}.fa-asl-interpreting:before,.fa-american-sign-language-interpreting:before{content:\"\\F2A3\"}.fa-deafness:before,.fa-hard-of-hearing:before,.fa-deaf:before{content:\"\\F2A4\"}.fa-glide:before{content:\"\\F2A5\"}.fa-glide-g:before{content:\"\\F2A6\"}.fa-signing:before,.fa-sign-language:before{content:\"\\F2A7\"}.fa-low-vision:before{content:\"\\F2A8\"}.fa-viadeo:before{content:\"\\F2A9\"}.fa-viadeo-square:before{content:\"\\F2AA\"}.fa-snapchat:before{content:\"\\F2AB\"}.fa-snapchat-ghost:before{content:\"\\F2AC\"}.fa-snapchat-square:before{content:\"\\F2AD\"}.fa-pied-piper:before{content:\"\\F2AE\"}.fa-first-order:before{content:\"\\F2B0\"}.fa-yoast:before{content:\"\\F2B1\"}.fa-themeisle:before{content:\"\\F2B2\"}.fa-google-plus-circle:before,.fa-google-plus-official:before{content:\"\\F2B3\"}.fa-fa:before,.fa-font-awesome:before{content:\"\\F2B4\"}.fa-handshake-o:before{content:\"\\F2B5\"}.fa-envelope-open:before{content:\"\\F2B6\"}.fa-envelope-open-o:before{content:\"\\F2B7\"}.fa-linode:before{content:\"\\F2B8\"}.fa-address-book:before{content:\"\\F2B9\"}.fa-address-book-o:before{content:\"\\F2BA\"}.fa-vcard:before,.fa-address-card:before{content:\"\\F2BB\"}.fa-vcard-o:before,.fa-address-card-o:before{content:\"\\F2BC\"}.fa-user-circle:before{content:\"\\F2BD\"}.fa-user-circle-o:before{content:\"\\F2BE\"}.fa-user-o:before{content:\"\\F2C0\"}.fa-id-badge:before{content:\"\\F2C1\"}.fa-drivers-license:before,.fa-id-card:before{content:\"\\F2C2\"}.fa-drivers-license-o:before,.fa-id-card-o:before{content:\"\\F2C3\"}.fa-quora:before{content:\"\\F2C4\"}.fa-free-code-camp:before{content:\"\\F2C5\"}.fa-telegram:before{content:\"\\F2C6\"}.fa-thermometer-4:before,.fa-thermometer:before,.fa-thermometer-full:before{content:\"\\F2C7\"}.fa-thermometer-3:before,.fa-thermometer-three-quarters:before{content:\"\\F2C8\"}.fa-thermometer-2:before,.fa-thermometer-half:before{content:\"\\F2C9\"}.fa-thermometer-1:before,.fa-thermometer-quarter:before{content:\"\\F2CA\"}.fa-thermometer-0:before,.fa-thermometer-empty:before{content:\"\\F2CB\"}.fa-shower:before{content:\"\\F2CC\"}.fa-bathtub:before,.fa-s15:before,.fa-bath:before{content:\"\\F2CD\"}.fa-podcast:before{content:\"\\F2CE\"}.fa-window-maximize:before{content:\"\\F2D0\"}.fa-window-minimize:before{content:\"\\F2D1\"}.fa-window-restore:before{content:\"\\F2D2\"}.fa-times-rectangle:before,.fa-window-close:before{content:\"\\F2D3\"}.fa-times-rectangle-o:before,.fa-window-close-o:before{content:\"\\F2D4\"}.fa-bandcamp:before{content:\"\\F2D5\"}.fa-grav:before{content:\"\\F2D6\"}.fa-etsy:before{content:\"\\F2D7\"}.fa-imdb:before{content:\"\\F2D8\"}.fa-ravelry:before{content:\"\\F2D9\"}.fa-eercast:before{content:\"\\F2DA\"}.fa-microchip:before{content:\"\\F2DB\"}.fa-snowflake-o:before{content:\"\\F2DC\"}.fa-superpowers:before{content:\"\\F2DD\"}.fa-wpexplorer:before{content:\"\\F2DE\"}.fa-meetup:before{content:\"\\F2E0\"}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}\n", ""]);

// exports


/***/ }),
/* 44 */
/***/ (function(module, exports) {


/***/ }),
/* 45 */
/***/ (function(module, exports) {


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = "data:application/font-woff2;base64,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"

/***/ }),
/* 47 */
/***/ (function(module, exports) {


/***/ }),
/* 48 */
/***/ (function(module, exports) {


/***/ }),
/* 49 */
/***/ (function(module, exports) {


/***/ })
/******/ ]);