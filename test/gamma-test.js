var tape = require("tape"),
    seedrandom = require("seedrandom"),
    skewness = require("./skewness"),
    kurtosis = require("./kurtosis"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

tape("randomGamma(k) returns random numbers with a mean of k", function(test) {
  var randomGamma = d3.randomGamma.source(seedrandom("ba00bda55400448e"));
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(0.1))), 0.1, 0.005);
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(0.5))), 0.5, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(1))), 1, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(2))), 2, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(10))), 10, 0.05);
  test.end();
});

tape("randomGamma(k) returns random numbers with a variance of k", function(test) {
  var randomGamma = d3.randomGamma.source(seedrandom("cb43934c1dcf650d"));
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(0.1))), 0.1, 0.005);
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(0.5))), 0.5, 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(1))), 1, 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(2))), 2, 0.1);
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(10))), 10, 0.5);
  test.end();
});

tape("randomGamma(k) returns random numbers with a skewness of 2 / sqrt(k)", function(test) {
  var randomGamma = d3.randomGamma.source(seedrandom("b9e71de4d94951e0"));
  test.inDelta(skewness(d3.range(10000).map(randomGamma(0.1))), Math.sqrt(40), 1);
  test.inDelta(skewness(d3.range(10000).map(randomGamma(0.5))), Math.sqrt(8), 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomGamma(1))), 2, 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomGamma(2))), Math.sqrt(2), 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomGamma(10))), Math.sqrt(0.4), 0.05);
  test.end();
});

tape("randomGamma(k) returns random numbers with an excess kurtosis of 6 / k", function(test) {
  var randomGamma = d3.randomGamma.source(seedrandom("d26f35533df47873"));
  test.inDelta(kurtosis(d3.range(10000).map(randomGamma(0.1))), 60, 15);
  test.inDelta(kurtosis(d3.range(10000).map(randomGamma(0.5))), 12, 3);
  test.inDelta(kurtosis(d3.range(10000).map(randomGamma(1))), 6, 1.5);
  test.inDelta(kurtosis(d3.range(10000).map(randomGamma(2))), 3, 0.75);
  test.inDelta(kurtosis(d3.range(10000).map(randomGamma(10))), 0.6, 0.15);
  test.end();
});

tape("randomGamma(k, theta) returns random numbers with a mean of k * theta and a variance of k * theta^2", function(test) {
  var randomGamma = d3.randomGamma.source(seedrandom("22fe28c580a2f7d8"));
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(1,2))), 2, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(2,4))), 8, 0.1);
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(1,2))), 4, 0.2);
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(2,4))), 32, 1);
  test.end();
});
