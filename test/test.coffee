"use strict"

describe "test tpl2js", ()->
    tpl2js = require '..'
    assert = require 'assert'
    path = require 'path'
    fixtures_folder = path.resolve(__dirname, './fixtures/')
    

    it 'should return sth', (done)->
        tpl2js.compile fixtures_folder, (ret)->
            console.log ret
            done()
