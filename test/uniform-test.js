var tape = require("tape"),
    array = require("d3-array"),
    seedrandom = require("seedrandom"),
    random = require("../");

require("./inDelta");

tape.test("randomUniform() returns random numbers with a mean of 0.5", function(test) {
  var randomUniform = random.randomUniform.source(seedrandom("d7bcbccaa96bba8c"));
  test.inDelta(array.mean(array.range(10000).map(randomUniform())), 0.5, .05);
  test.end();
});

tape.test("randomUniform() returns random numbers within the range [0,1)", function(test) {
  var randomUniform = random.randomUniform.source(seedrandom("f232de9b208a7137"));
  test.ok(array.min(array.range(10000).map(randomUniform())) >= 0);
  test.ok(array.min(array.range(10000).map(randomUniform())) < 1);
  test.end();
});

tape.test("randomUniform(max) returns random numbers with a mean of max / 2", function(test) {
  var randomUniform = random.randomUniform.source(seedrandom("c52f4e6cd112aada"));
  test.inDelta(array.mean(array.range(10000).map(randomUniform(42))), 21, .5);
  test.end();
});

tape.test("randomUniform(max) returns random numbers within the range [0,max)", function(test) {
  var randomUniform = random.randomUniform.source(seedrandom("8f2959eba39debfd"));
  test.ok(array.min(array.range(10000).map(randomUniform(42))) >= 0);
  test.ok(array.min(array.range(10000).map(randomUniform(42))) < 42);
  test.end();
});

tape.test("randomUniform(min, max) returns random numbers with a mean of (min + max) / 2", function(test) {
  var randomUniform = random.randomUniform.source(seedrandom("5ea383210c9bdd21"));
  test.inDelta(array.mean(array.range(10000).map(randomUniform(10, 42))), 26, .5);
  test.end();
});

tape.test("randomUniform(min, max) returns random numbers within the range [min,max)", function(test) {
  var randomUniform = random.randomUniform.source(seedrandom("88f461e6b7454981"));
  test.ok(array.min(array.range(10000).map(randomUniform(10, 42))) >= 10);
  test.ok(array.min(array.range(10000).map(randomUniform(10, 42))) < 42);
  test.end();
});
