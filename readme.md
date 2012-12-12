# Hookable

  Enable hookable functions on an object.

  [![Build Status](https://secure.travis-ci.org/RGBboy/hookable.png)](http://travis-ci.org/RGBboy/hookable)

## Installation

  Works with Express 3.0.x

    $ npm install hookable

## Usage

  Hookable adds functionality to wrap a function with `before` and `after` hooks

``` javascript

// require it
var hookable = require('hookable'),
    myObject = {
      add: function (a, b) {
        return a + b;
      }
    };

// use it on your object
hookable(myObject);

// enable hooking on your objects function
myObject.add = myObject.hook('add', myObject.add);

// define a function to fire before the original
myObject.before('add', function (a, b) {
  console.log('.add is about to fire with ' + a + ' and ' + b);
});

// define a function to fire after the original
myObject.after('add', function (a, b) {
  console.log('.add has fired with ' + a + ' and ' + b);
});
```

## To Do

  * Make hooks fire asynchronously
  * Write tests
