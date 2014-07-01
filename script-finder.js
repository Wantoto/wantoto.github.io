var fs = require('fs');
var path = require('path');

function scriptFinder(debug) {
    'use strict';

    return function(filePath) {
        if (debug) {
            return filePath;
        } else {
            var minFilePath = filePath.replace(/\.js$/, '.min.js');
            return fs.existsSync(path.join(__dirname, 'public', minFilePath)) ? minFilePath : path;
        }
    };
}

module.exports.scriptFinder = scriptFinder;
