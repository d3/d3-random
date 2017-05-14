var tape = require("tape"),
    seedrandom = require("seedrandom"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

tape.test("d3.randomLogNormal() returns random numbers with a log-mean of zero", function(test) {
  var randomLogNormal = d3.randomLogNormal.source(seedrandom("a22ebc7c488a3a47"));
  test.inDelta(d3.mean(d3.range(10000).map(randomLogNormal()), Math.log), 0, 0.05);
  test.end();
});

tape.test("d3.randomLogNormal() returns random numbers with a log-standard deviation of one", function(test) {
  var randomLogNormal = d3.randomLogNormal.source(seedrandom("06fd26b46c25607e"));
  test.inDelta(d3.deviation(d3.range(10000).map(randomLogNormal()), Math.log), 1, 0.05);
  test.end();
});

tape.test("d3.randomLogNormal(mu) returns random numbers with the specified log-mean", function(test) {
  var randomLogNormal = d3.randomLogNormal.source(seedrandom("fffe77600db5c1ad"));
  test.inDelta(d3.mean(d3.range(10000).map(randomLogNormal(42)), Math.log), 42, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomLogNormal(-2)), Math.log), -2, 0.05);
  test.end();
});

tape.test("d3.randomLogNormal(mu) returns random numbers with a log-standard deviation of 1", function(test) {
  var randomLogNormal = d3.randomLogNormal.source(seedrandom("9caf2156de45315a"));
  test.inDelta(d3.deviation(d3.range(10000).map(randomLogNormal(42)), Math.log), 1, 0.05);
  test.inDelta(d3.deviation(d3.range(10000).map(randomLogNormal(-2)), Math.log), 1, 0.05);
  test.end();
});

tape.test("d3.randomLogNormal(mu, sigma) returns random numbers with the specified log-mean and log-standard deviation", function(test) {
  var randomLogNormal = d3.randomLogNormal.source(seedrandom("c0d761f591fb5e43"));
  test.inDelta(d3.mean(d3.range(10000).map(randomLogNormal(42, 2)), Math.log), 42, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomLogNormal(-2, 2)), Math.log), -2, 0.05);
  test.inDelta(d3.deviation(d3.range(10000).map(randomLogNormal(42, 2)), Math.log), 2, 0.05);
  test.inDelta(d3.deviation(d3.range(10000).map(randomLogNormal(-2, 2)), Math.log), 2, 0.05);
  test.end();
});
