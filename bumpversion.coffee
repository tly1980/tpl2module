#!/usr/bin/env coffee

execSync = require 'execSync'
fs = require 'fs'
package_json = require './package.json'

VERSION = {}

ret = execSync.exec("git rev-parse --abbrev-ref HEAD | sed 's:[A-Za-z/]*::'")
package_json.version = ret.stdout.replace('\n', '')
VERSION.version = package_json.version

ret = execSync.exec("git log -2 --pretty=oneline")
VERSION.last_2_commits = ret.stdout.split('\n')
VERSION.generated_at = new Date()

fs.writeFileSync './package.json', JSON.stringify(package_json, null, 4)
fs.writeFileSync './VERSION.json', JSON.stringify(VERSION, null, 4)
