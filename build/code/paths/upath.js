// Generated by CoffeeScript 1.6.3
var fName, fn, upath, _, _path,
  __slice = [].slice;

_ = require('lodash');

_.mixin((require('underscore.string')).exports());

_path = require('path');

/*
  upath is a proxy to node's 'path', replacing '\' with '/' for all string results :-)

  And adding some features ?...
*/


upath = {};

for (fName in _path) {
  fn = _path[fName];
  if (_.isFunction(fn)) {
    upath[fName] = (function(fName) {
      return function() {
        var p, res;
        p = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        res = _path[fName].apply(_path, p);
        if (_.isString(res)) {
          return res.replace(/\\/g, '/');
        } else {
          return res;
        }
      };
    })(fName);
  }
}

/*
  @return file + ext, if it doesnt have it
  eg to add .js to output .js file
*/


upath.addExt = function(file, ext) {
  return file + (_.endsWith(file, ext) ? '' : ext);
};

upath.trimExt = function(file) {
  return file.slice(0, +((file.length - this.extname(file).length) - 1) + 1 || 9e9);
};

/*
  @return filename with changed extension
*/


upath.changeExt = function(file, ext) {
  return upath.trimExt(file) + (ext[0] === '.' ? ext : '.' + ext);
};

/*
  Add .ext, ONLY if filename doesn't have an extension (any).
  Extensions are considered to be up to 4 chars long
*/


upath.defaultExt = function(file, ext) {
  var oldExt;
  oldExt = upath.extname(file);
  if (oldExt && (oldExt.length <= 4) && (oldExt.length >= 1)) {
    return file;
  } else {
    return upath.addExt(file, ext);
  }
};

module.exports = upath;
