var tape = require("tape"),
    arrays = require("d3-arrays"),
    random = require("../");

require("seedrandom");
require("./inDelta");

var mathRandom = Math.random;

tape.test("normal() returns random numbers with a mean of zero", function(test) {
  Math.seedrandom("a22ebc7c488a3a47");
  test.inDelta(arrays.mean(arrays.range(10000).map(random.normal())), 0, .05);
  test.end();
});

tape.test("normal() returns random numbers with a standard deviation of one", function(test) {
  Math.seedrandom("06fd26b46c25607e");
  test.inDelta(arrays.deviation(arrays.range(10000).map(random.normal())), 1, .05);
  test.end();
});

tape.test("normal(mu) returns random numbers with the specified mean", function(test) {
  Math.seedrandom("fffe77600db5c1ad");
  test.inDelta(arrays.mean(arrays.range(10000).map(random.normal(42))), 42, .05);
  test.inDelta(arrays.mean(arrays.range(10000).map(random.normal(-2))), -2, .05);
  test.end();
});

tape.test("normal(mu) returns random numbers with a standard deviation of 1", function(test) {
  Math.seedrandom("9caf2156de45315a");
  test.inDelta(arrays.deviation(arrays.range(10000).map(random.normal(42))), 1, .05);
  test.inDelta(arrays.deviation(arrays.range(10000).map(random.normal(-2))), 1, .05);
  test.end();
});

tape.test("normal(mu, sigma) returns random numbers with the specified mean and standard deviation", function(test) {
  Math.seedrandom("c0d761f591fb5e43");
  test.inDelta(arrays.mean(arrays.range(10000).map(random.normal(42, 2))), 42, .05);
  test.inDelta(arrays.mean(arrays.range(10000).map(random.normal(-2, 2))), -2, .05);
  test.inDelta(arrays.deviation(arrays.range(10000).map(random.normal(42, 2))), 2, .05);
  test.inDelta(arrays.deviation(arrays.range(10000).map(random.normal(-2, 2))), 2, .05);
  test.end();
});

tape("normal() [teardown]", function(test) {
  Math.random = mathRandom;
  test.end();
});
