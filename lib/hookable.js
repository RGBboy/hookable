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

  var preHooks = {},
      postHooks = {};

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
      // pre
      if (preHooks[name] && preHooks[name].length > 0) {
        for (i = 0; i < preHooks[name].length; i += 1) {
          preHooks[name][i].apply(context, args); // make this work serial async
        };
      };
      // original
      fn.apply(context, args);
      // post
      if (postHooks[name] && postHooks[name].length > 0) {
        for (i = 0; i < postHooks[name].length; i += 1) {
          postHooks[name][i].apply(context, args); // make this work serial async
        };
      };
    };
  };

  /**
   * .pre
   *
   * @param {String} name
   * @param {Function} function
   * @return {Object} that, chainable
   * @api public
   */
  that.pre = function (name, fn) {
    preHooks[name] = preHooks[name] || [];
    preHooks[name].push(fn);
    return that;
  };

  /**
   * .post
   *
   * @param {String} name
   * @param {Function} function
   * @return {Object} that, chainable
   * @api public
   */
  that.post = function (name, fn) {
    postHooks[name] = postHooks[name] || [];
    postHooks[name].push(fn);
    return that;
  };

  return that;

};

/**
* Library version.
*/

exports.version = '0.0.1';