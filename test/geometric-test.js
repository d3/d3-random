var tape = require("tape"),
    seedrandom = require("seedrandom"),
    skewness = require("./skewness"),
    kurtosis = require("./kurtosis"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

var mean = function(p) { return 1 / p; };
var variance = function(p) { return (1 - p) / Math.pow(p, 2); };
var skew = function(p) { return (2 - p) / Math.sqrt(1 - p); };
var kurt = function(p) { return (Math.pow(p, 2) - 6 * p + 6) / (1 - p); };

tape("randomGeometric(p) returns random geometrically distributed numbers with a mean of 1 / p.", function(test) {
  var randomGeometric = d3.randomGeometric.source(seedrandom("3c21f0c8f5a8332c"));
  test.inDelta(d3.mean(d3.range(10000).map(randomGeometric(1))), mean(1), variance(1));
  test.inDelta(d3.mean(d3.range(10000).map(randomGeometric(.5))), mean(.5), variance(.5));
  test.inDelta(d3.mean(d3.range(10000).map(randomGeometric(0.25))), mean(0.25), variance(0.25));
  test.inDelta(d3.mean(d3.range(10000).map(randomGeometric(0.125))), mean(0.125), variance(0.125));
  test.end();
});

tape("randomGeometric(p) returns random geometrically distributed numbers with a variance of (1 - p) / p^2.", function(test) {
  var randomGeometric = d3.randomGeometric.source(seedrandom("f330fbece4c1c99f"));
  test.inDelta(d3.variance(d3.range(10000).map(randomGeometric(1))), variance(1), variance(1) * 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomGeometric(.5))), variance(.5), variance(.5) * 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomGeometric(0.25))), variance(0.25), variance(.25) * 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomGeometric(0.125))), variance(0.125), variance(.125) * 0.05);
  test.end();
});

tape("randomGeometric(p) returns random geometrically distributed numbers with a skewness of (2 - p) / sqrt(1 - p).", function(test) {
  var randomGeometric = d3.randomGeometric.source(seedrandom("c4af5ee918417093"));
  test.inDelta(skewness(d3.range(10000).map(randomGeometric(.5))), skew(.5), 0.05 * skew(.5));
  test.inDelta(skewness(d3.range(10000).map(randomGeometric(0.25))), skew(0.25), 0.05 * skew(0.25));
  test.inDelta(skewness(d3.range(10000).map(randomGeometric(0.125))), skew(0.125), 0.05 * skew(0.125));
  test.end();
});

tape("randomGeometric(p) returns random geometrically distributed numbers with a kurtosis excess of (p^2 - 6 * p + 6) / (1 - p).", function(test) {
  var randomGeometric = d3.randomGeometric.source(seedrandom("55cb594f444fc692"));
  test.inDelta(kurtosis(d3.range(10000).map(randomGeometric(.5))), kurt(.5), 0.1 * kurt(.5));
  test.inDelta(kurtosis(d3.range(10000).map(randomGeometric(0.25))), kurt(0.25), 0.1 * kurt(0.25));
  test.inDelta(kurtosis(d3.range(10000).map(randomGeometric(0.125))), kurt(0.125), 0.1 * kurt(0.125));
  test.end();
});
