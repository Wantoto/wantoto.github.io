/* jshint node: true */

var express = require('express');
var fs = require('fs');
var jade = require('jade');
var path = require('path');
var localization = require('./localization.js');

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
        var _t = localization.getLocalText(locale);
        if (!_t) {
            console.log('Error      %s', requestPath);
            res.status(500).send('500 No such locale');
            return;
        }

        // Read and compile Jade file
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (!err) {
                console.log('Render     %s', requestPath);

                var locals = {_t: _t};
                res.send(jade.compile(data, {pretty: true, filename: filePath})(locals));
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
