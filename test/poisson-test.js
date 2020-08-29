var tape = require("tape-await"),
    skewness = require("./skewness"),
    kurtosis = require("./kurtosis"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

// Ten times the default number of samples are taken for the lambda = 0.001 tests,
// since otherwise the very small expected number of non-zero samples would
// wildly influence summary statistics.

tape("randomPoisson(lambda) returns random numbers with a mean of lambda", test => {
  var randomPoisson = d3.randomPoisson.source(d3.randomLcg(0.48758044703454373));
  test.inDelta(d3.mean(d3.range(100000).map(randomPoisson(0.001))), 0.001, 0.0005);
  test.inDelta(d3.mean(d3.range(10000).map(randomPoisson(0.1))), 0.1, 0.01);
  test.inDelta(d3.mean(d3.range(10000).map(randomPoisson(0.5))), 0.5, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomPoisson(1))), 1, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomPoisson(2))), 2, 0.1);
  test.inDelta(d3.mean(d3.range(10000).map(randomPoisson(10))), 10, 0.5);
  test.inDelta(d3.mean(d3.range(10000).map(randomPoisson(1000))), 1000, 20);
});

tape("randomPoisson(lambda) returns random numbers with a variance of lambda", test => {
  var randomPoisson = d3.randomPoisson.source(d3.randomLcg(0.4777559867161436));
  test.inDelta(d3.variance(d3.range(100000).map(randomPoisson(0.001))), 0.001, 0.0005);
  test.inDelta(d3.variance(d3.range(10000).map(randomPoisson(0.1))), 0.1, 0.01);
  test.inDelta(d3.variance(d3.range(10000).map(randomPoisson(0.5))), 0.5, 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomPoisson(1))), 1, 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomPoisson(2))), 2, 0.1);
  test.inDelta(d3.variance(d3.range(10000).map(randomPoisson(10))), 10, 0.5);
  test.inDelta(d3.variance(d3.range(10000).map(randomPoisson(1000))), 1000, 20);
});

tape("randomPoisson(lambda) returns random numbers with a skewness of 1 / sqrt(lambda)", test => {
  var randomPoisson = d3.randomPoisson.source(d3.randomLcg(0.09357670133206075));
  test.inDelta(skewness(d3.range(100000).map(randomPoisson(0.001))), 31.6, 5);
  test.inDelta(skewness(d3.range(10000).map(randomPoisson(0.1))), 3.16, 0.2);
  test.inDelta(skewness(d3.range(10000).map(randomPoisson(0.5))), 1.414, 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomPoisson(1))), 1, 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomPoisson(2))), 0.707, 0.05);
  test.inDelta(skewness(d3.range(10000).map(randomPoisson(10))), 0.316, 0.05);
  test.inDelta(skewness(d3.range(10000).map(randomPoisson(1000))), 0.0316, 0.05);
});

tape("randomPoisson(lambda) returns random numbers with a kurtosis excess of 1 / lambda", test => {
  var randomPoisson = d3.randomPoisson.source(d3.randomLcg(0.3299530136090847));
  test.inDelta(kurtosis(d3.range(100000).map(randomPoisson(0.001))), 1000, 200);
  test.inDelta(kurtosis(d3.range(10000).map(randomPoisson(0.1))), 10, 2);
  test.inDelta(kurtosis(d3.range(10000).map(randomPoisson(0.5))), 2, 0.5);
  test.inDelta(kurtosis(d3.range(10000).map(randomPoisson(1))), 1, 0.5);
  test.inDelta(kurtosis(d3.range(10000).map(randomPoisson(2))), 0.5, 0.2);
  test.inDelta(kurtosis(d3.range(10000).map(randomPoisson(10))), 0.1, 0.1);
  test.inDelta(kurtosis(d3.range(10000).map(randomPoisson(1000))), 0.001, 0.1);
});
