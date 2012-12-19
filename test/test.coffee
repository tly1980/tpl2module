"use strict"

describe "test tpl2module", ()->
    tpl2module = require '..'
    assert = require 'assert'
    path = require 'path'
    fixtures_folder = path.resolve(__dirname, './fixtures/')
    

    it 'should return sth', (done)->
        tpl2module.compile fixtures_folder, (ret)->
            console.log ret
            done()
