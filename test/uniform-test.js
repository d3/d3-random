var tape = require("tape"),
    seedrandom = require("seedrandom"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

tape.test("randomUniform() returns random numbers with a mean of 0.5", function(test) {
  var randomUniform = d3.randomUniform.source(seedrandom("d7bcbccaa96bba8c"));
  test.inDelta(d3.mean(d3.range(10000).map(randomUniform())), 0.5, .05);
  test.end();
});

tape.test("randomUniform() returns random numbers within the range [0,1)", function(test) {
  var randomUniform = d3.randomUniform.source(seedrandom("f232de9b208a7137"));
  test.ok(d3.min(d3.range(10000).map(randomUniform())) >= 0);
  test.ok(d3.min(d3.range(10000).map(randomUniform())) < 1);
  test.end();
});

tape.test("randomUniform(max) returns random numbers with a mean of max / 2", function(test) {
  var randomUniform = d3.randomUniform.source(seedrandom("c52f4e6cd112aada"));
  test.inDelta(d3.mean(d3.range(10000).map(randomUniform(42))), 21, .5);
  test.end();
});

tape.test("randomUniform(max) returns random numbers within the range [0,max)", function(test) {
  var randomUniform = d3.randomUniform.source(seedrandom("8f2959eba39debfd"));
  test.ok(d3.min(d3.range(10000).map(randomUniform(42))) >= 0);
  test.ok(d3.min(d3.range(10000).map(randomUniform(42))) < 42);
  test.end();
});

tape.test("randomUniform(min, max) returns random numbers with a mean of (min + max) / 2", function(test) {
  var randomUniform = d3.randomUniform.source(seedrandom("5ea383210c9bdd21"));
  test.inDelta(d3.mean(d3.range(10000).map(randomUniform(10, 42))), 26, .5);
  test.end();
});

tape.test("randomUniform(min, max) returns random numbers within the range [min,max)", function(test) {
  var randomUniform = d3.randomUniform.source(seedrandom("88f461e6b7454981"));
  test.ok(d3.min(d3.range(10000).map(randomUniform(10, 42))) >= 10);
  test.ok(d3.min(d3.range(10000).map(randomUniform(10, 42))) < 42);
  test.end();
});
