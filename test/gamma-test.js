var tape = require("tape"),
    skewness = require("./skewness"),
    kurtosis = require("./kurtosis"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

tape("randomGamma(k) returns random numbers with a mean of k", function(test) {
  var randomGamma = d3.randomGamma.source(d3.randomLcg(0.1));
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(0.1))), 0.1, 0.01);
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(0.5))), 0.5, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(1))), 1, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(2))), 2, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(10))), 10, 0.05);
  test.end();
});

tape("randomGamma(k) returns random numbers with a variance of k", function(test) {
  var randomGamma = d3.randomGamma.source(d3.randomLcg(0.2));
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(0.1))), 0.1, 0.005);
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(0.5))), 0.5, 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(1))), 1, 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(2))), 2, 0.1);
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(10))), 10, 0.5);
  test.end();
});

tape("randomGamma(k) returns random numbers with a skewness of 2 / sqrt(k)", function(test) {
  var randomGamma = d3.randomGamma.source(d3.randomLcg(0.3));
  test.inDelta(skewness(d3.range(10000).map(randomGamma(0.1))), Math.sqrt(40), 1);
  test.inDelta(skewness(d3.range(10000).map(randomGamma(0.5))), Math.sqrt(8), 0.25);
  test.inDelta(skewness(d3.range(10000).map(randomGamma(1))), 2, 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomGamma(2))), Math.sqrt(2), 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomGamma(10))), Math.sqrt(0.4), 0.05);
  test.end();
});

tape("randomGamma(k) returns random numbers with an excess kurtosis of 6 / k", function(test) {
  var randomGamma = d3.randomGamma.source(d3.randomLcg(0.4));
  test.inDelta(kurtosis(d3.range(10000).map(randomGamma(0.1))), 60, 15);
  test.inDelta(kurtosis(d3.range(10000).map(randomGamma(0.5))), 12, 3);
  test.inDelta(kurtosis(d3.range(10000).map(randomGamma(1))), 6, 1.5);
  test.inDelta(kurtosis(d3.range(10000).map(randomGamma(2))), 3, 1);
  test.inDelta(kurtosis(d3.range(10000).map(randomGamma(10))), 0.6, 0.2);
  test.end();
});

tape("randomGamma(k, theta) returns random numbers with a mean of k * theta and a variance of k * theta^2", function(test) {
  var randomGamma = d3.randomGamma.source(d3.randomLcg(0.5));
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(1, 2))), 2, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(2, 4))), 8, 0.2);
  test.inDelta(d3.deviation(d3.range(10000).map(randomGamma(1, 2))), 2, 0.1);
  test.inDelta(d3.deviation(d3.range(10000).map(randomGamma(2, 4))), Math.sqrt(2) * 4, 0.1);
  test.end();
});
