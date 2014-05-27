/* jshint node: true */

var express = require('express');
var fs = require('fs');
var jade = require('jade');
var path = require('path');

var app = express();

app.get(/(.*)/, function(req, res) {
    'use strict';

    // Generate Path
    var requestPath = req.params[0];
    var filePath = __dirname + requestPath;
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }
    filePath = filePath.replace(/\.html$/, '.jade');

    // Check file existence
    var fileExists = fs.existsSync(filePath);
    if (!fileExists) {
        console.log('Not Found  %s', requestPath);
        res.status(404).send('404 File Not Found.');
        return;
    }

    // Sned file
    if (requestPath.indexOf('/static') === 0) {
        console.log('Load       %s', requestPath);
        res.sendfile(filePath);
    } else {
        // Find locale file
        var locale = req.query.locale ? req.query.locale : 'en';
        var localeFilePath = path.join(__dirname, 'locales', locale + '.json');
        var localeFileExists = fs.existsSync(localeFilePath);
        if (!localeFileExists) {
            console.log('Error      %s', requestPath);
            res.status(500).send('500 No such locale');
            return;
        }

        // Read locale file
        var localeJSONString = fs.readFileSync(localeFilePath, 'utf8');
        var localeData = JSON.parse(localeJSONString);

        // Read and compile Jade file
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (!err) {
                console.log('Render     %s', requestPath);
                res.send(jade.compile(data, {pretty: true, filename: filePath})({$i18n: localeData}));
            } else {
                console.log('Error      %s', requestPath);
                res.status(500).send('500 Error: %s', err);
            }
        });
    }
});

app.listen(8000, '127.0.0.1', function() {
    'use strict';
    //noinspection JSUnresolvedVariable
    console.log('Listening %s on port %d', this.address().address, this.address().port);
});
