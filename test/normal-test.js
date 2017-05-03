var tape = require("tape"),
    array = require("d3-array"),
    seedrandom = require("seedrandom"),
    random = require("../");

require("./inDelta");

tape.test("randomNormal() returns random numbers with a mean of zero", function(test) {
  var randomNormal = random.randomNormal.source(seedrandom("a22ebc7c488a3a47"));
  test.inDelta(array.mean(array.range(10000).map(randomNormal())), 0, .05);
  test.end();
});

tape.test("randomNormal() returns random numbers with a standard deviation of one", function(test) {
  var randomNormal = random.randomNormal.source(seedrandom("06fd26b46c25607e"));
  test.inDelta(array.deviation(array.range(10000).map(randomNormal())), 1, .05);
  test.end();
});

tape.test("randomNormal(mu) returns random numbers with the specified mean", function(test) {
  var randomNormal = random.randomNormal.source(seedrandom("fffe77600db5c1ad"));
  test.inDelta(array.mean(array.range(10000).map(randomNormal(42))), 42, .05);
  test.inDelta(array.mean(array.range(10000).map(randomNormal(-2))), -2, .05);
  test.end();
});

tape.test("randomNormal(mu) returns random numbers with a standard deviation of 1", function(test) {
  var randomNormal = random.randomNormal.source(seedrandom("9caf2156de45315a"));
  test.inDelta(array.deviation(array.range(10000).map(randomNormal(42))), 1, .05);
  test.inDelta(array.deviation(array.range(10000).map(randomNormal(-2))), 1, .05);
  test.end();
});

tape.test("randomNormal(mu, sigma) returns random numbers with the specified mean and standard deviation", function(test) {
  var randomNormal = random.randomNormal.source(seedrandom("c0d761f591fb5e43"));
  test.inDelta(array.mean(array.range(10000).map(randomNormal(42, 2))), 42, .05);
  test.inDelta(array.mean(array.range(10000).map(randomNormal(-2, 2))), -2, .05);
  test.inDelta(array.deviation(array.range(10000).map(randomNormal(42, 2))), 2, .05);
  test.inDelta(array.deviation(array.range(10000).map(randomNormal(-2, 2))), 2, .05);
  test.end();
});
