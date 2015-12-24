(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _makeRoutes = require('make-routes');

var Route = _interopRequireWildcard(_makeRoutes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

console.log(Route);

},{"make-routes":4}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StorageService = (function () {
	function StorageService() {
		_classCallCheck(this, StorageService);
	}

	_createClass(StorageService, [{
		key: "query",
		value: function query() {
			return localStorage;
		}
	}, {
		key: "get",
		value: function get(key) {
			if (localStorage[key]) {
				return JSON.parse(localStorage.getItem(key));
			} else {
				return [];
			}
		}
	}, {
		key: "save",
		value: function save(key, value) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}, {
		key: "delete",
		value: function _delete(key) {
			if (localStorage[key]) {
				localStorage.removeItem(key);
			}
		}
	}, {
		key: "clear",
		value: function clear() {
			localStorage.clear();
		}
	}]);

	return StorageService;
})();

var Storage = exports.Storage = new StorageService();

},{}],3:[function(require,module,exports){
'use strict';

var _Storage = require('./Services/Storage');

var _Routes = require('./Routes');

_Storage.Storage.save('name', 'Sabbir Rahman');
console.log(_Storage.Storage.get('name'));

},{"./Routes":1,"./Services/Storage":2}],4:[function(require,module,exports){
module.exports = (function () {

  var paths = undefined;
  var _routes = undefined;
  var _extra = false;

  function makePaths(hash) {
    var path = arguments[1] === undefined ? '' : arguments[1];
    var hashKey = arguments[2] === undefined ? false : arguments[2];

    var result = {};
    var new_path = '';
    if (hashKey) {
      new_path = path ? '' + path + '/' + hashKey : hashKey;
    }

    function collectResult(path, obj) {
      for (var key in obj) {
        var to = false;
        if (check(obj[key]).isFunction()) {
          to = obj[key];
        } else if (obj[key].to) {
          to = obj[key].to;
          key = routeToPath(obj[key]) || key;
        }
        var argsArray = [].slice.call(arguments, 2);
        result[key] = setResult.apply(this, [path, key, to].concat(argsArray));
      }
    }

    function addMember(key) {
      var memberPath = '' + new_path + '/:' + hashKey + '_id';
      var member = hash[key];
      collectResult(memberPath, member);
    }

    function addCollection(key) {
      var collectionPath = new_path;
      var collection = hash[key];
      collectResult(collectionPath, collection, true);
    }

    function setResult(path, action, to) {
      var collection = arguments[3];

      if (!collection) {
        switch (action) {
          case 'show':
            action = ':id';
            break;
          case 'edit':
            action = ':id/edit';
            break;
          case 'index':
            action = false;
            break;
        }
      }

      if (!path) {
        path = action;
        action = false;
      }

      path = action ? '/' + path + '/' + action : '/' + path;
      var res = {path: path, to: to};
      if (_extra) {
        res._extra = _extra;
      }
      return res;
    }

    for (var key in hash) {
      _extra = false;
      var current = hash[key];
      var type = check(current);
      //Check if type is string or function, send it to final result if not then go deeper
      if (type.isFunction() || type.isString()) {
        result[key] = setResult(new_path, key, current);
      } else if (type.isObject()) {
        //Check for extra params;
        _extra = current._extra ? current._extra : false;
        var _path = current.path ? routeToPath(current) : key;
        type = check(key);
        if (current.to) {
          result[key] = setResult(new_path, _path, current.to);
        } else if (type.isMember()) {
          addMember(key);
        } else if (type.isCollection()) {
          addCollection(key);
        } else {
          result[key] = makePaths(hash[key], new_path, _path);
        }
      }
    }
    return result;
  }

  function makeRoutes() {
    var obj = arguments[0] === undefined ? paths : arguments[0];
    var key = arguments[1] === undefined ? false : arguments[1];

    for (var objKey in obj) {
      var current = obj[objKey];
      var result = false;
      var _extra = false;
      if (current.path) {
        result = {path: current.path, to: current.to};
        delete obj[objKey].path;
        delete obj[objKey].to;
      }

      var resultKey = key ? '' + key + '_' + objKey : objKey;

      if (obj[objKey]._extra) {
        _extra = obj[objKey]._extra;
        delete obj[objKey]._extra;
      }

      if (check(obj[objKey]).isEmpty()) {
        paths[resultKey] = result;
        if (_extra) {
          paths[resultKey]._extra = _extra;
        }
      } else {
        makeRoutes(obj[objKey], resultKey);
        delete obj[objKey];
      }
    }
  }

  function check(value) {
    return {
      isFunction: function isFunction() {
        return typeof value === 'function';
      },
      isString: function isFunction() {
        return typeof value === 'string';
      },
      isObject: function isObject() {
        return value !== null && typeof value === 'object';
      },
      isEmpty: function isEmpty() {
        return Object.keys(value).length === 0;
      },
      isMember: function isMember() {
        return value === 'member';
      },
      isCollection: function isCollection() {
        return value === 'collection';
      }
    };
  }

  function routeToPath(route) {
    return route.path ? route.path.split('/')[1] : false;
  }

  var buildRoute = function buildRoute(key, params) {
    function replaceParams(string) {
      if (params) {
        for (var p in params) {
          string = string.replace(':' + p, params[p]);
        }
      }
      return string;
    }

    function checkRoute() {
      if (_routes[key]) {
        return true;
      } else {
        console.warn('Invalid route name: ', key);
        return false;
      }
    }

    return checkRoute() ? replaceParams(_routes[key].path) : '';
  };

  function buildRoutes(hash) {
    paths = makePaths(hash);

    makeRoutes(paths);
    _routes = paths;
  }

  var helpers = {
    showRoutes: function () {
      var resultRoutes = {};
      for (var route in _routes) {
        resultRoutes[route] = _routes[route].path;
      }
      return resultRoutes;
    },
    each: function (callback, any) {
      for (var route in _routes) {
        callback(_routes[route], route);
      }
      if (any) {
        any();
      }
    }
  };

  return {
    init: function init(hash) {
      buildRoutes(hash);
      return this;
    },
    all: function all() {
      return _routes;
    },
    route: buildRoute,
    showRoutes: helpers.showRoutes,
    each: helpers.each
  };
})();

},{}]},{},[3]);
