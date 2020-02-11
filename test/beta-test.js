var tape = require("tape"),
    seedrandom = require("seedrandom"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

var mean = function(alpha, beta) { return alpha / (alpha + beta); };
var variance = function(alpha, beta) { return (alpha * beta) / Math.pow(alpha + beta, 2) / (alpha + beta + 1); };

tape("randomBeta(alpha, beta) returns random numbers with a mean of alpha / (alpha + beta)", function(test) {
  var randomBeta = d3.randomBeta.source(seedrandom("1338e6f554b1da6d"));
  test.inDelta(d3.mean(d3.range(10000).map(randomBeta(1, 1))), mean(1, 1), 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomBeta(1, 2))), mean(1, 2), 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomBeta(2, 1))), mean(2, 1), 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomBeta(3, 4))), mean(3, 4), 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomBeta(0.5, 0.5))), mean(0.5, 0.5), 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomBeta(2.7, 0.3))), mean(2.7, 0.3), 0.05);
  test.end();
});

tape("randomBeta(alpha, beta) returns random numbers with a variance of (alpha * beta) / (alpha + beta)^2 / (alpha + beta + 1)", function(test) {
  var randomBeta = d3.randomBeta.source(seedrandom("f86d852a93c73d91"));
  test.inDelta(d3.variance(d3.range(10000).map(randomBeta(1, 1))), variance(1, 1), 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomBeta(1, 2))), variance(1, 2), 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomBeta(2, 1))), variance(2, 1), 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomBeta(3, 4))), variance(3, 4), 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomBeta(0.5, 0.5))), variance(0.5, 0.5), 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomBeta(2.7, 0.3))), variance(2.7, 0.3), 0.05);
  test.end();
});
