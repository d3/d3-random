var tape = require("tape"),
    random = require("../");

require("seedrandom");

var mathRandom = Math.random;

tape("normal() [teardown]", function(test) {
  Math.random = mathRandom;
  test.end();
});
