var tape = require("tape"),
    seedrandom = require("seedrandom"),
    skewness = require("./skewness"),
    kurtosis = require("./kurtosis"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

var variance = function(a, b) { return Math.pow(Math.PI * b, 2) / 3; };

tape("randomLogistic(a, b) returns random numbers with a mean of a", function(test) {
  var randomLogistic = d3.randomLogistic.source(seedrandom("df715f110c264e9"));
  test.inDelta(d3.mean(d3.range(10000).map(randomLogistic())), 0, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomLogistic(5))), 5, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomLogistic(0, 4))), 0, 0.1);
  test.inDelta(d3.mean(d3.range(10000).map(randomLogistic(1, 3))), 1, 0.1);
  test.inDelta(d3.mean(d3.range(10000).map(randomLogistic(3, 1))), 3, 0.05);
  test.end();
});

tape("randomLogistic(a, b) returns random numbers with a variance of (b * pi)^2 / 3", function(test) {
  var randomLogistic = d3.randomLogistic.source(seedrandom("7e99b2b1fb2200a4"));
  test.inDelta(d3.variance(d3.range(10000).map(randomLogistic())), variance(0, 1), 0.2);
  test.inDelta(d3.variance(d3.range(10000).map(randomLogistic(5))), variance(5, 1), 0.2);
  test.inDelta(d3.variance(d3.range(10000).map(randomLogistic(0, 4))), variance(0, 4), 1);
  test.inDelta(d3.variance(d3.range(10000).map(randomLogistic(1, 3))), variance(1, 3), 1);
  test.inDelta(d3.variance(d3.range(10000).map(randomLogistic(3, 1))), variance(3, 1), 0.2);
  test.end();
});

tape("randomLogistic(a, b) returns random numbers with a skewness of zero", function(test) {
  var randomLogistic = d3.randomLogistic.source(seedrandom("3970da720513ac2f"));
  test.inDelta(skewness(d3.range(10000).map(randomLogistic())), 0, 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomLogistic(5))), 0, 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomLogistic(0, 4))), 0, 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomLogistic(1, 3))), 0, 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomLogistic(3, 1))), 0, 0.1);
  test.end();
});

tape("randomLogistic(a, b) returns random numbers with an excess kurtosis of 1.2", function(test) {
  var randomLogistic = d3.randomLogistic.source(seedrandom("6f0a0bfb0e31192e"));
  test.inDelta(kurtosis(d3.range(10000).map(randomLogistic())), 1.2, 0.3);
  test.inDelta(kurtosis(d3.range(10000).map(randomLogistic(5))), 1.2, 0.3);
  test.inDelta(kurtosis(d3.range(10000).map(randomLogistic(0, 4))), 1.2, 0.3);
  test.inDelta(kurtosis(d3.range(10000).map(randomLogistic(1, 3))), 1.2, 0.3);
  test.inDelta(kurtosis(d3.range(10000).map(randomLogistic(3, 1))), 1.2, 0.3);
  test.end();
});
