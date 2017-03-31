'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (...strings) {
	console.log([...new Set(strings).values()]);
};