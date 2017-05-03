var tape = require("tape"),
    array = require("d3-array"),
    seedrandom = require("seedrandom"),
    random = require("../");

require("./inDelta");

tape.test("randomLogNormal() returns random numbers with a log-mean of zero", function(test) {
  var randomLogNormal = random.randomLogNormal.source(seedrandom("a22ebc7c488a3a47"));
  test.inDelta(array.mean(array.range(10000).map(randomLogNormal()), Math.log), 0, .05);
  test.end();
});

tape.test("randomLogNormal() returns random numbers with a log-standard deviation of one", function(test) {
  var randomLogNormal = random.randomLogNormal.source(seedrandom("06fd26b46c25607e"));
  test.inDelta(array.deviation(array.range(10000).map(randomLogNormal()), Math.log), 1, .05);
  test.end();
});

tape.test("randomLogNormal(mu) returns random numbers with the specified log-mean", function(test) {
  var randomLogNormal = random.randomLogNormal.source(seedrandom("fffe77600db5c1ad"));
  test.inDelta(array.mean(array.range(10000).map(randomLogNormal(42)), Math.log), 42, .05);
  test.inDelta(array.mean(array.range(10000).map(randomLogNormal(-2)), Math.log), -2, .05);
  test.end();
});

tape.test("randomLogNormal(mu) returns random numbers with a log-standard deviation of 1", function(test) {
  var randomLogNormal = random.randomLogNormal.source(seedrandom("9caf2156de45315a"));
  test.inDelta(array.deviation(array.range(10000).map(randomLogNormal(42)), Math.log), 1, .05);
  test.inDelta(array.deviation(array.range(10000).map(randomLogNormal(-2)), Math.log), 1, .05);
  test.end();
});

tape.test("randomLogNormal(mu, sigma) returns random numbers with the specified log-mean and log-standard deviation", function(test) {
  var randomLogNormal = random.randomLogNormal.source(seedrandom("c0d761f591fb5e43"));
  test.inDelta(array.mean(array.range(10000).map(randomLogNormal(42, 2)), Math.log), 42, .05);
  test.inDelta(array.mean(array.range(10000).map(randomLogNormal(-2, 2)), Math.log), -2, .05);
  test.inDelta(array.deviation(array.range(10000).map(randomLogNormal(42, 2)), Math.log), 2, .05);
  test.inDelta(array.deviation(array.range(10000).map(randomLogNormal(-2, 2)), Math.log), 2, .05);
  test.end();
});
