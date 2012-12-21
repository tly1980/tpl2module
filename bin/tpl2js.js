(function() {
  "use strict";

  var ArgumentParser, args, fs, outpath, parser, path, tpl2js;

  tpl2js = require('..');

  path = require('path');

  ArgumentParser = require('argparse').ArgumentParser;

  fs = require('fs');

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
    dest: 'json',
    help: 'Compile the template into JSON file.',
    constant: 'storeTrue'
  });

  parser.addArgument(['-a', '--amdjs'], {
    help: 'Compile the template into JS file (in AMDJS/RequiredJS format).',
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

  if (args.out[0] !== '/') {
    outpath = args.out;
  } else {
    outpath = path.join(__dirname, args.out);
  }

  tpl2js.compile(args.src_folder, function(ret) {
    var content, js_path, json_path, the_content;
    content = JSON.stringify(ret);
    json_path = outpath + '.json';
    js_path = outpath + '.js';
    if (args.json) {
      console.log('writing to', json_path);
      fs.writeFileSync(json_path, content);
    }
    if (args.amdjs) {
      the_content = "define(" + content + ");";
      console.log('writing to', js_path);
      return fs.writeFileSync(js_path, the_content);
    }
  });

}).call(this);
