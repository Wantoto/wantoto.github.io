var express = require('express');
var fs = require('fs');
var jade = require('jade');
var path = require('path');
var localization = require('./localization.js');

var app = express();

//noinspection JSUnresolvedFunction
app.get(/(.*)/, function(req, res) {
    'use strict';

    var requestPath = req.params[0];

    // Add index.html if necessary
    //noinspection JSUnresolvedVariable
    var filePath = path.join(__dirname, requestPath);
    //noinspection JSUnresolvedFunction
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    // Check file existence
    var jadeFilePath = filePath.replace(/\.html$/, '.jade');
    //noinspection JSUnresolvedFunction
    var fileExists = (fs.existsSync(jadeFilePath) && (filePath = jadeFilePath)) || fs.existsSync(filePath);
    if (!fileExists) {
        console.log('Local-Dev: Not Found  %s', requestPath);
        res.status(404).send('404 File Not Found.');
        return;
    }

    if (!filePath.match(/\.jade$/)) {
        // Send file directly
        console.log('Local-Dev: Load       %s', requestPath);
        //noinspection JSCheckFunctionSignatures
        res.sendfile(filePath);
    } else {
        // Render by jade template engine
        fs.readFile(filePath, 'utf8', function (err, template) {
            if (err) {
                console.log('Local-Dev: Error      %s', requestPath);
                res.status(500).send('500 Error: %s', err);
            } else {
                // Find locale
                var locale = req.query.locale ? req.query.locale : 'en';
                var _t = localization.getLocalText(locale);
                if (!_t) {
                    console.log('Error      %s', requestPath);
                    res.status(500).send('500 No such locale');
                    return;
                }

                console.log('Local-Dev: Render     %s', requestPath);
                var locals = {
                    _t: _t
                };
                res.send(jade.compile(template, {pretty: true, filename: filePath})(locals));
            }
        });
    }
});

app.listen(8000, '127.0.0.1', function() {
    'use strict';
    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    console.log('Listening %s on port %d', this.address().address, this.address().port);
});
