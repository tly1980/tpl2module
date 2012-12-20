"use strict"

tpl2js = require '..'
path = require 'path'
ArgumentParser = require('argparse').ArgumentParser
fs = require 'fs'
seq = require 'seq'

parser = new ArgumentParser({
  version: tpl2js.version,
  addHelp:true,
  description: 'A command line tool turn templates into JS or JSON'
})

parser.addArgument ['--src', '-s'], {
    action: 'store',
    dest:   'src_folder',
    help:   'the folder to parse',
    defaultValue: '.'
}

parser.addArgument [ '--json' ], { 
    action: 'appendConst',
    dest:   'types',
    help:   'append constant "json" to ouput types',
    constant: 'json'
}

parser.addArgument [ '--js' ], { 
    action: 'appendConst',
    dest:   'types',
    help:   'append constant "js" to ouput types',
    constant: 'js'
}


parser.addArgument [ '-a', '--amdjs' ], { 
    help: 'whether to use amdjs module.',
    action: 'storeTrue',
    defaultValue: false,
}

parser.addArgument ['-o', '--out'], {
    help: 'where to save the file',
    action: 'storeConst',
    defaultValue: null,
}

args = parser.parseArgs()

if args.src_folder[0] != '/'
    args.src_folder = path.join(__dirname, args.src_folder)

if args.out == null
    args.out = path.basename(args.src_folder)
    args.out = args.out.replace('/', '')

js_tpl = ''

amdjs_tpl = '''
define(
    #{content}
);

'''

tpl2js.compile args.src_folder, (ret)->
    content = JSON.stringify ret
    json_path = path.join args.src_folder, args.out + '.json'
    js_path = path.join args.src_folder, args.out + '.js'

    
    ()->
        if 'json' in args.types
            fs.writeFile json_path, content
    
    ()->
        if 'js' in args.types
            fs.writeFile js_path, content
    
        
    console.log 'args', args, content
