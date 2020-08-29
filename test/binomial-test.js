var tape = require("tape-await"),
    skewness = require("./skewness"),
    kurtosis = require("./kurtosis"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

function mean(n, p) {
  return n * p;
}

function variance(n, p) {
  return n * p * (1 - p);
}

function skew(n, p) {
  return (1 - 2 * p) / Math.sqrt(variance(n, p));
}

function kurt(n, p) {
  return (6 * Math.pow(p, 2) - 6 * p + 1) / (variance(n, p));
}

tape("randomBinomial(n, p) returns random binomial distributed numbers with a mean of n * p", test => {
  var randomBinomial = d3.randomBinomial.source(d3.randomLcg(0.3994478770613372));
  test.inDelta(d3.mean(d3.range(10000).map(randomBinomial(100, 1))), mean(100, 1), variance(100, 1));
  test.inDelta(d3.mean(d3.range(10000).map(randomBinomial(100, .5))), mean(100, .5), variance(100, .5));
  test.inDelta(d3.mean(d3.range(10000).map(randomBinomial(100, .25))), mean(100, .25), variance(100, .25));
  test.inDelta(d3.mean(d3.range(10000).map(randomBinomial(100, 0))), mean(100, 0), variance(100, 0));
  test.inDelta(d3.mean(d3.range(10000).map(randomBinomial(0, 0))), mean(0, 0), variance(0, 0));
});

tape("randomBinomial(n, p) returns random binomial distributed numbers with a variance of n * p * (1 - p)", test => {
  var randomBinomial = d3.randomBinomial.source(d3.randomLcg(0.7214876234380256));
  test.inDelta(d3.variance(d3.range(10000).map(randomBinomial(100, 1))), variance(100, 1), 0);
  test.inDelta(d3.variance(d3.range(10000).map(randomBinomial(100, .5))), variance(100, .5), 0.5);
  test.inDelta(d3.variance(d3.range(10000).map(randomBinomial(100, .25))), variance(100, .25), 1);
  test.inDelta(d3.variance(d3.range(10000).map(randomBinomial(100, 0))), variance(100, 0), 0);
  test.inDelta(d3.variance(d3.range(10000).map(randomBinomial(0, 0))), variance(0, 0), 0);
});

tape("randomBinomial(n, p) returns random binomial distributed numbers with a skewness of (1 - 2 * p) / sqrt(n * p * (1 - p))", test => {
  var randomBinomial = d3.randomBinomial.source(d3.randomLcg(0.0646181509291679));
  test.inDelta(skewness(d3.range(10000).map(randomBinomial(100, .05))), skew(100, .05), 0.05);
  test.inDelta(skewness(d3.range(10000).map(randomBinomial(100, .10))), skew(100, .10), 0.05);
  test.inDelta(skewness(d3.range(10000).map(randomBinomial(100, .15))), skew(100, .15), 0.05);
  test.inDelta(skewness(d3.range(10000).map(randomBinomial(100, .20))), skew(100, .20), 0.05);
  test.inDelta(skewness(d3.range(10000).map(randomBinomial(100, .25))), skew(100, .25), 0.05);
  test.inDelta(skewness(d3.range(10000).map(randomBinomial(100, .30))), skew(100, .30), 0.05);
  test.inDelta(skewness(d3.range(10000).map(randomBinomial(100, .35))), skew(100, .35), 0.05);
  test.inDelta(skewness(d3.range(10000).map(randomBinomial(100, .40))), skew(100, .40), 0.05);
  test.inDelta(skewness(d3.range(10000).map(randomBinomial(100, .45))), skew(100, .45), 0.05);
});

tape("randomBinomial(n, p) returns random binomial distributed numbers with a kurtosis excess of (6 * p^2 - 6 * p - 1) / (n * p * (1 - p))", test => {
  var randomBinomial = d3.randomBinomial.source(d3.randomLcg(0.6451552018202751));
  test.inDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .05))), kurt(100, .05), 0.2);
  test.inDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .10))), kurt(100, .10), 0.1);
  test.inDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .15))), kurt(100, .15), 0.1);
  test.inDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .20))), kurt(100, .20), 0.1);
  test.inDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .25))), kurt(100, .25), 0.1);
  test.inDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .30))), kurt(100, .30), 0.1);
  test.inDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .35))), kurt(100, .35), 0.1);
  test.inDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .40))), kurt(100, .40), 0.1);
  test.inDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .45))), kurt(100, .45), 0.05);
});
