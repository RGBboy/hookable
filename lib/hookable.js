/*!
 * hookable
 * Copyright(c) 2012 RGBboy <me@rgbboy.com>
 * MIT Licensed
 */

/**
* Module Dependencies
*/



/**
 * Add hookable functionality to component instance.
 *
 * @param {Object} that
 * @api public
 */
exports = module.exports = function (that) {

  var beforeHooks = {},
      afterHooks = {};

  /**
   * .hook
   *
   * @todo: make this work async with callback
   *
   * @param {String} name
   * @param {Function} function
   * @return {Function}
   * @api public
   */
  that.hook = function (name, fn) {
    return function () {
      var args = [].slice.call(arguments),
          context = this,
          i;
      // before
      if (beforeHooks[name] && beforeHooks[name].length > 0) {
        for (i = 0; i < beforeHooks[name].length; i += 1) {
          beforeHooks[name][i].apply(context, args); // make this work serial async
        };
      };
      // original
      fn.apply(context, args);
      // after
      if (afterHooks[name] && afterHooks[name].length > 0) {
        for (i = 0; i < afterHooks[name].length; i += 1) {
          afterHooks[name][i].apply(context, args); // make this work serial async
        };
      };
    };
  };

  /**
   * .before
   *
   * @param {String} name
   * @param {Function} function
   * @return {Object} that, chainable
   * @api public
   */
  that.before = function (name, fn) {
    beforeHooks[name] = beforeHooks[name] || [];
    beforeHooks[name].push(fn);
    return that;
  };

  /**
   * .after
   *
   * @param {String} name
   * @param {Function} function
   * @return {Object} that, chainable
   * @api public
   */
  that.after = function (name, fn) {
    afterHooks[name] = afterHooks[name] || [];
    afterHooks[name].push(fn);
    return that;
  };

  return that;

};

/**
* Library version.
*/

exports.version = '0.0.1';