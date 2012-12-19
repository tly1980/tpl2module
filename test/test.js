(function() {
  "use strict";

  describe("test tpl2module", function() {
    var assert, fixtures_folder, path, tpl2module;
    tpl2module = require('..');
    assert = require('assert');
    path = require('path');
    fixtures_folder = path.resolve(__dirname, './fixtures/');
    return it('should return sth', function(done) {
      return tpl2module.compile(fixtures_folder, function(ret) {
        console.log(ret);
        return done();
      });
    });
  });

}).call(this);
