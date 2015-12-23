(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

var _Storage = require('./Storage');

_Storage.Storage.save('name', 'Sabbir Rahman');
console.log(_Storage.Storage.get('name'));

},{"./Storage":1}]},{},[2]);
