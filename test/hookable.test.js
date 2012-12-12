/**
 * Module dependencies.
 */

var should = require('should'),
    hookable = require('../');

describe('Hookable', function () {

  describe('.version', function () {

    it('should match the format x.x.x', function (done) {
      hookable.version.should.match(/^\d+\.\d+\.\d+$/);
      done();
    });

  });

});