"use strict"

walk = require 'walk'
fs = require 'fs'
path = require 'path'

version = '0.10'

compile = (folder, cb=null, exts=['.txt', '.html', '.htm', '.tpl'], dest_path=null) ->
	ret = {}

	w = walk.walkSync folder

	if dest_path == null
		dest_fname = path.basename(folder) + '_tpl.js'
		dest_path = path.join(folder,  dest_fname) 
	

	w.on 'file', (root, fileStats) ->
		folder_name = path.relative(folder, root)
		filename = path.join(root, '/', fileStats.name)

		e = path.extname(filename)
		if e in exts
			content = fs.readFileSync filename, 'utf8'
			#folder_name = 'asd'
			key = "#{ folder_name }.#{ fileStats.name }".replace('/', '.').replace(/^\./, '')
			key = key.substring(0, key.lastIndexOf(e))
			ret[key] = content

	w.on 'end', ()->
		if cb != null
			cb(ret)

exports.compile = compile
exports.version = version