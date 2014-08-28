var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var DEFAULT_LANG = 'tw';

function _get(object, property, defaultValue) {
    'use strict';
    //noinspection JSUnresolvedFunction
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

function _localText(locale) {
    'use strict';

    if (typeof locale === 'undefined') {
        locale = DEFAULT_LANG;
    }

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

function _localizedPath(_localPath, _lang) {
    'use strict';

    if (_lang === DEFAULT_LANG) {
        return _localPath;
    } else {
        var pathComponents = _localPath.split(path.sep);
        pathComponents.splice(1, 0, _lang);
        return pathComponents.join(path.sep);
    }
}

function locale(_locale) {
    'use strict';

    if (_locale !== 'tw' && _locale !== 'en') {
        _locale = DEFAULT_LANG;
    }

    var object = {
        locale: _locale,
        _localText: _localText(_locale)
    };

    object.localizedPath = function(_path) {
        return _localizedPath(_path, this.locale);
    };

    object.get = function(keyPath) {
        return _getKeyPath(this._localText, keyPath);
    };

    return object;
}

module.exports.locale = locale;
module.exports.DEFAULT_LANG = DEFAULT_LANG;
