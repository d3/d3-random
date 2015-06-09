var tape = require("tape"),
    arrays = require("d3-arrays"),
    random = require("../");

require("seedrandom");
require("./inDelta");

var mathRandom = Math.random;

tape.test("uniform() returns random numbers with a mean of 0.5", function(test) {
  Math.seedrandom("d7bcbccaa96bba8c");
  test.inDelta(arrays.mean(arrays.range(10000).map(random.uniform())), 0.5, .05);
  test.end();
});

tape.test("uniform() returns random numbers within the range [0,1)", function(test) {
  Math.seedrandom("f232de9b208a7137");
  test.ok(arrays.min(arrays.range(10000).map(random.uniform())) >= 0);
  test.ok(arrays.min(arrays.range(10000).map(random.uniform())) < 1);
  test.end();
});

tape.test("uniform(max) returns random numbers with a mean of max / 2", function(test) {
  Math.seedrandom("c52f4e6cd112aada");
  test.inDelta(arrays.mean(arrays.range(10000).map(random.uniform(42))), 21, .5);
  test.end();
});

tape.test("uniform(max) returns random numbers within the range [0,max)", function(test) {
  Math.seedrandom("8f2959eba39debfd");
  test.ok(arrays.min(arrays.range(10000).map(random.uniform(42))) >= 0);
  test.ok(arrays.min(arrays.range(10000).map(random.uniform(42))) < 42);
  test.end();
});

tape.test("uniform(min, max) returns random numbers with a mean of (min + max) / 2", function(test) {
  Math.seedrandom("5ea383210c9bdd21");
  test.inDelta(arrays.mean(arrays.range(10000).map(random.uniform(10, 42))), 26, .5);
  test.end();
});

tape.test("uniform(min, max) returns random numbers within the range [min,max)", function(test) {
  Math.seedrandom("88f461e6b7454981");
  test.ok(arrays.min(arrays.range(10000).map(random.uniform(10, 42))) >= 10);
  test.ok(arrays.min(arrays.range(10000).map(random.uniform(10, 42))) < 42);
  test.end();
});

tape("uniform() [teardown]", function(test) {
  Math.random = mathRandom;
  test.end();
});
