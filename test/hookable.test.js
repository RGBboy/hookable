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

  describe('returned object', function () {

    var testObject;

    beforeEach(function (done) {
      testObject = {
        testFunction: function () {}
      };
      hookable(testObject);
      done();
    });

    describe('.hook', function () {

      it('should be a function', function (done) {
        testObject.hook.should.be.a.function;
        done();
      });

      it('should return a function', function (done) {
        testObject.hook('test', function () {}).should.be.a.function;
        done();
      });

    });

    describe('.pre', function () {

      it('should be a function', function (done) {
        testObject.pre.should.be.a.function;
        done();
      });

      it('should return the object', function (done) {
        testObject.pre('test', function () {}).should.equal(testObject);
        done();
      });

      it('should fire the passed function before the hooked function is called', function (done) {
        var counter = 0,
            preTestFunction1 = function () {
              counter.should.equal(0);
              counter += 1;
            },
            preTestFunction2 = function () {
              counter.should.equal(1);
              counter += 1;
            };
        testObject.testFunction = function () {
          counter.should.equal(2);
          done();
        };
        testObject.testFunction = testObject.hook('test', testObject.testFunction)
        testObject.pre('test', preTestFunction1);
        testObject.pre('test', preTestFunction2);
        testObject.testFunction();
      });

    });

    describe('.post', function () {

      it('should be a function', function (done) {
        testObject.post.should.be.a.function;
        done();
      });

      it('should return the object', function (done) {
        testObject.pre('test', function () {}).should.equal(testObject);
        done();
      });

      it('should fire the passed function after the hooked function is called', function (done) {
        var counter = 0,
            postTestFunction1 = function () {
              counter.should.equal(1);
              counter += 1;
            },
            postTestFunction2 = function () {
              counter.should.equal(2);
              done();
            };
        testObject.testFunction = function () {
          counter.should.equal(0);
          counter += 1;
        };
        testObject.testFunction = testObject.hook('test', testObject.testFunction)
        testObject.post('test', postTestFunction1);
        testObject.post('test', postTestFunction2);
        testObject.testFunction();
      });

    });

    describe('.hookedFunction', function () {

      it('should be called with the applied context', function (done) {
        var context = {};
        testObject.sameContext = function () {
          this.should.equal(testObject);
        };
        testObject.sameContext = testObject.hook('sameContext', testObject.sameContext);
        testObject.sameContext();
        // test applying new context
        testObject.differentContext = function () {
          this.should.equal(context);
        };
        testObject.differentContext = testObject.hook('differentContext', testObject.differentContext);
        testObject.differentContext.apply(context);
        done();
      });

    });

  });

});