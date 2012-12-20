(function() {
  "use strict";

  describe("test tpl2js", function() {
    var assert, fixtures_folder, path, tpl2js;
    tpl2js = require('..');
    assert = require('assert');
    path = require('path');
    fixtures_folder = path.resolve(__dirname, './fixtures/');
    return it('should return sth', function(done) {
      return tpl2js.compile(fixtures_folder, function(ret) {
        console.log(ret);
        return done();
      });
    });
  });

}).call(this);
