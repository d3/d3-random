var tape = require("tape"),
    skewness = require("./skewness"),
    kurtosis = require("./kurtosis"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

var variance = function(a, b) { return Math.pow(Math.PI * b, 2) / 3; };

tape("randomLogistic(a, b) returns random numbers with a mean of a", function(test) {
  var randomLogistic = d3.randomLogistic.source(d3.randomLcg(0.8792712826844997));
  test.inDelta(d3.mean(d3.range(10000).map(randomLogistic())), 0, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomLogistic(5))), 5, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomLogistic(0, 4))), 0, 0.1);
  test.inDelta(d3.mean(d3.range(10000).map(randomLogistic(1, 3))), 1, 0.1);
  test.inDelta(d3.mean(d3.range(10000).map(randomLogistic(3, 1))), 3, 0.05);
  test.end();
});

tape("randomLogistic(a, b) returns random numbers with a variance of (b * pi)^2 / 3", function(test) {
  var randomLogistic = d3.randomLogistic.source(d3.randomLcg(0.5768515852192524));
  test.inDelta(d3.variance(d3.range(10000).map(randomLogistic())), variance(0, 1), 0.2);
  test.inDelta(d3.variance(d3.range(10000).map(randomLogistic(5))), variance(5, 1), 0.2);
  test.inDelta(d3.variance(d3.range(10000).map(randomLogistic(0, 4))), variance(0, 4), 2);
  test.inDelta(d3.variance(d3.range(10000).map(randomLogistic(1, 3))), variance(1, 3), 2);
  test.inDelta(d3.variance(d3.range(10000).map(randomLogistic(3, 1))), variance(3, 1), 2);
  test.end();
});

tape("randomLogistic(a, b) returns random numbers with a skewness of zero", function(test) {
  var randomLogistic = d3.randomLogistic.source(d3.randomLcg(0.8835033777589203));
  test.inDelta(skewness(d3.range(10000).map(randomLogistic())), 0, 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomLogistic(5))), 0, 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomLogistic(0, 4))), 0, 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomLogistic(1, 3))), 0, 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomLogistic(3, 1))), 0, 0.1);
  test.end();
});

tape("randomLogistic(a, b) returns random numbers with an excess kurtosis of 1.2", function(test) {
  var randomLogistic = d3.randomLogistic.source(d3.randomLcg(0.8738996292947383));
  test.inDelta(kurtosis(d3.range(10000).map(randomLogistic())), 1.2, 0.6);
  test.inDelta(kurtosis(d3.range(10000).map(randomLogistic(5))), 1.2, 0.6);
  test.inDelta(kurtosis(d3.range(10000).map(randomLogistic(0, 4))), 1.2, 0.6);
  test.inDelta(kurtosis(d3.range(10000).map(randomLogistic(1, 3))), 1.2, 0.6);
  test.inDelta(kurtosis(d3.range(10000).map(randomLogistic(3, 1))), 1.2, 0.6);
  test.end();
});
