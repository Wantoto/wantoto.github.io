/*jshint node:true*/

var fs = require('fs');
var path = require('path');

exports = exports||{};

function localText(locale) {
    'use strict';
    // Find locale file
    var localeFilePath = path.join(__dirname, 'locales', locale + '.json');
    var localeFileExists = fs.existsSync(localeFilePath);
    if (!localeFileExists) {
        return;
    }

    // Read locale file
    var localeJSONString = fs.readFileSync(localeFilePath, 'utf8');
    return JSON.parse(localeJSONString);
}

exports.localText = localText;
