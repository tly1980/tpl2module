(function() {
  "use strict";

  var ArgumentParser, args, fs, parser, path, seq, tpl2js,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  tpl2js = require('..');

  path = require('path');

  ArgumentParser = require('argparse').ArgumentParser;

  fs = require('fs');

  seq = require('seq');

  parser = new ArgumentParser({
    version: tpl2js.version,
    addHelp: true,
    description: 'A command line tool turn templates into JS or JSON'
  });

  parser.addArgument(['--src', '-s'], {
    action: 'store',
    dest: 'src_folder',
    help: 'the folder to parse',
    defaultValue: '.'
  });

  parser.addArgument(['--json'], {
    action: 'appendConst',
    dest: 'types',
    help: 'append constant "json" to ouput types',
    constant: 'json'
  });

  parser.addArgument(['--js'], {
    action: 'appendConst',
    dest: 'types',
    help: 'append constant "js" to ouput types',
    constant: 'js'
  });

  parser.addArgument(['-a', '--amdjs'], {
    help: 'whether to use amdjs module.',
    action: 'storeTrue',
    defaultValue: false
  });

  parser.addArgument(['-o', '--out'], {
    help: 'where to save the file',
    action: 'storeConst',
    defaultValue: null
  });

  args = parser.parseArgs();

  if (args.src_folder[0] !== '/') {
    args.src_folder = path.join(__dirname, args.src_folder);
  }

  if (args.out === null) {
    args.out = path.basename(args.src_folder);
    args.out = args.out.replace('/', '');
  }

  tpl2js.compile(args.src_folder, function(ret) {
    var content, js_path, json_path;
    content = JSON.stringify(ret);
    json_path = path.join(args.src_folder, args.out + '.json');
    js_path = path.join(args.src_folder, args.out + '.js');
    (function() {
      if (__indexOf.call(args.types, 'json') >= 0) {
        return fs.writeFile(json_path, content);
      }
    });
    (function() {
      if (__indexOf.call(args.types, 'js') >= 0) {
        return fs.writeFile(js_path, content);
      }
    });
    if (__indexOf.call(args.types, 'js') >= 0) {
      fs.writeFile(js_path, content);
    }
    return console.log('args', args, content);
  });

}).call(this);
