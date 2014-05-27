/*jshint node:true*/

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

exports = exports||{};

function _get(object, property, defaultValue) {
    'use strict';
    return _.has(object, property)?_.result(object, property):defaultValue;
}

function _getKeyPath(object, keyPath) {
    'use strict';

    if (!object || !keyPath) {
        return undefined;
    }

    var kpc = _.isArray(keyPath)?keyPath:keyPath.split('.');
    var r = _get(object, kpc[0]);
    return (r && kpc.length > 1)?_getKeyPath(r, kpc.slice(1)):r;
}

exports.getLocalText = function(locale) {
    'use strict';
    // Find locale file
    var localeFilePath = path.join(__dirname, 'locales', locale + '.json');
    var localeFileExists = fs.existsSync(localeFilePath);
    if (!localeFileExists) {
        return;
    }

    // Read locale file
    var localeJSONString = fs.readFileSync(localeFilePath, 'utf8');
    var localeData = JSON.parse(localeJSONString);

    return function(key, text) {
        var output = _getKeyPath(localeData, key);
        if (!output) {
            output = text ? text : key;
        }
        return output;
    };
};
