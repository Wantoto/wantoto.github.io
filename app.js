var express = require('express');
var fs = require('fs');
var jade = require('jade');
var path = require('path');
var localization = require('./localization.js');
var scriptFinder = require('./script-finder.js');

var app = express();

function renderTemplate(filePath, requestPath, lang, res) {
    'use strict';
    fs.readFile(filePath, 'utf8', function (err, template) {
        if (err) {
            console.log('Local-Dev: Error      %s', requestPath);
            res.status(500).send('500 Error: %s', err);
        } else {
            // Find locale
            console.log('Local-Dev: Render     %s', requestPath);
            var locals = {
                defaultLang: localization.DEFAULT_LANG,
                scriptFinder: scriptFinder.scriptFinder(true),
                locale: localization.locale(lang)
            };
            res.send(jade.compile(template, {pretty: true, filename: filePath})(locals));
        }
    });
}

//noinspection JSUnresolvedFunction
app.get(/(.*)/, function(req, res) {
    'use strict';

    var lang = localization.DEFAULT_LANG;
    var requestPath = req.params[0];
    var pathComponents = requestPath.split(path.sep);
    if (pathComponents.length > 1 && (pathComponents[1] === 'en' || pathComponents[1] === 'tw')) {
        lang = pathComponents[1];
        pathComponents.splice(1, 1);
        requestPath = pathComponents.join(path.sep);
    }

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
        renderTemplate(path.join(__dirname, '404.jade'), '/404.html', lang, res);
        return;
    }

    if (!filePath.match(/\.jade$/)) {
        // Send file directly
        console.log('Local-Dev: Load       %s', requestPath);
        res.sendFile(filePath);
    } else {
        // Render by jade template engine
        renderTemplate(filePath, requestPath, lang, res);
    }
});

app.listen(8000, '127.0.0.1', function() {
    'use strict';
    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    console.log('Listening %s on port %d', this.address().address, this.address().port);
});
