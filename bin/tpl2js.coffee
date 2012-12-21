"use strict"

tpl2js = require '..'
path = require 'path'
ArgumentParser = require('argparse').ArgumentParser
fs = require 'fs'
#seq = require 'seq'

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

if args.out[0] != '/'
    outpath = args.out
else
    outpath = path.join(__dirname, args.out)


tpl2js.compile args.src_folder, (ret)->
    content = JSON.stringify ret
    json_path = outpath + '.json'
    js_path = outpath + '.js'
    
    if 'json' in args.types
        console.log 'writing to', json_path
        fs.writeFileSync json_path, content


    if args.amdjs
        the_content = "define(#{content});"
        console.log 'writing to', js_path
        fs.writeFileSync js_path, the_content
    
        
    console.log 'args', args, content, outpath
