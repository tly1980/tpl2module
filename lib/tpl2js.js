(function() {
  "use strict";

  var compile, fs, path, version, walk,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  walk = require('walk');

  fs = require('fs');

  path = require('path');

  version = '0.10';

  compile = function(folder, cb, exts, dest_path) {
    var dest_fname, ret, w;
    if (cb == null) {
      cb = null;
    }
    if (exts == null) {
      exts = ['.txt', '.html', '.htm', '.tpl'];
    }
    if (dest_path == null) {
      dest_path = null;
    }
    ret = {};
    w = walk.walkSync(folder);
    if (dest_path === null) {
      dest_fname = path.basename(folder) + '_tpl.js';
      dest_path = path.join(folder, dest_fname);
    }
    w.on('file', function(root, fileStats) {
      var content, e, filename, folder_name, key;
      folder_name = path.relative(folder, root);
      filename = path.join(root, '/', fileStats.name);
      e = path.extname(filename);
      if (__indexOf.call(exts, e) >= 0) {
        content = fs.readFileSync(filename, 'utf8');
        key = ("" + folder_name + "." + fileStats.name).replace('/', '.').replace(/^\./, '');
        key = key.substring(0, key.lastIndexOf(e));
        return ret[key] = content;
      }
    });
    return w.on('end', function() {
      if (cb !== null) {
        return cb(ret);
      }
    });
  };

  exports.compile = compile;

  exports.version = version;

}).call(this);
