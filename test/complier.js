(function() {
  "use strict";

  var aseert, fs, path;

  aseert = require('assert');

  path = require('path');

  fs = require('fs');

  describe("test tpl2js", function() {
    var assert, fixtures_folder, templates, tpl2js;
    tpl2js = require('..');
    assert = require('assert');
    path = require('path');
    fixtures_folder = path.resolve(__dirname, './fixtures/');
    templates = null;
    it('should return sth', function(done) {
      return tpl2js.compile(fixtures_folder, function(ret) {
        templates = ret;
        return done();
      });
    });
    return describe('verify content in templates', function() {
      it('should has tpl1', function() {
        return aseert.ok(templates.hasOwnProperty('tpl1'));
      });
      it("templates.tpl1 should be identical to tp1.html", function() {
        var tpl1;
        tpl1 = fs.readFileSync(path.join(__dirname, 'fixtures', 'tpl1.html'), 'utf-8');
        return aseert.equal(tpl1, templates['tpl1']);
      });
      it("templates.tpl2 should be identical to tp2.html", function() {
        var tpl2;
        tpl2 = fs.readFileSync(path.join(__dirname, 'fixtures', 'tpl2.html'), 'utf-8');
        return aseert.equal(tpl2, templates['tpl2']);
      });
      it("templates['a.tpl3'] should be identical to tp3.html", function() {
        var tpl3;
        tpl3 = fs.readFileSync(path.join(__dirname, 'fixtures', 'a', 'tpl3.html'), 'utf-8');
        return aseert.equal(tpl3, templates['a.tpl3']);
      });
      return it("templates['a.b.tpl4'] should be identical to tp4.html", function() {
        var tpl4;
        tpl4 = fs.readFileSync(path.join(__dirname, 'fixtures', 'a', 'b', 'tpl4.html'), 'utf-8');
        return aseert.equal(tpl4, templates['a.b.tpl4']);
      });
    });
  });

}).call(this);