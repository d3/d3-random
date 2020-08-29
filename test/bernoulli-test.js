var tape = require("tape-await"),
    skewness = require("./skewness"),
    kurtosis = require("./kurtosis"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

function mean(p) {
  return p;
}

function variance(p) {
  return p * (1 - p);
}

function skew(p) {
  return (1 - 2 * p) / Math.sqrt(variance(p));
}

function kurt(p) {
  return (6 * Math.pow(p, 2) - 6 * p + 1) / (variance(p));
}

tape("randomBernoulli(p) returns random bernoulli distributed numbers with a mean of p", test => {
  var randomBernoulli = d3.randomBernoulli.source(d3.randomLcg(0.48444190806583465));
  test.inDelta(d3.mean(d3.range(10000).map(randomBernoulli(1))), mean(1), variance(1));
  test.inDelta(d3.mean(d3.range(10000).map(randomBernoulli(.5))), mean(.5), variance(.5));
  test.inDelta(d3.mean(d3.range(10000).map(randomBernoulli(.25))), mean(.25), variance(.25));
  test.inDelta(d3.mean(d3.range(10000).map(randomBernoulli(0))), mean(0), variance(0));
});

tape("randomBernoulli(p) returns random bernoulli distributed numbers with a variance of p * (1 - p)", test => {
  var randomBernoulli = d3.randomBernoulli.source(d3.randomLcg(0.9781605192898934));
  test.inDelta(d3.variance(d3.range(10000).map(randomBernoulli(1))), variance(1), 0);
  test.inDelta(d3.variance(d3.range(10000).map(randomBernoulli(.5))), variance(.5), 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomBernoulli(.25))), variance(.25), 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomBernoulli(0))), variance(0), 0);
});

tape("randomBernoulli(p) returns random bernoulli distributed numbers with a skewness of (1 - 2 * p) / sqrt(p * (1 - p)).", test => {
  var randomBernoulli = d3.randomBernoulli.source(d3.randomLcg(0.9776249148208429));
  test.inDelta(skewness(d3.range(10000).map(randomBernoulli(.5))), skew(.5), 0.08);
  test.inDelta(skewness(d3.range(10000).map(randomBernoulli(.25))), skew(.25), 0.05);
});

tape("randomBernoulli(p) returns random bernoulli distributed numbers with a kurtosis excess of (6 * p^2 - 6 * p - 1) / (p * (1 - p)).", test => {
  var randomBernoulli = d3.randomBernoulli.source(d3.randomLcg(0.8260973119979638));
  test.inDelta(kurtosis(d3.range(10000).map(randomBernoulli(.05))), kurt(.05), kurt(.05) * 0.2);
  test.inDelta(kurtosis(d3.range(10000).map(randomBernoulli(.10))), kurt(.10), kurt(.10) * 0.2);
  test.inDelta(kurtosis(d3.range(10000).map(randomBernoulli(.15))), kurt(.15), kurt(.15) * 0.2);
  test.inDelta(kurtosis(d3.range(50000).map(randomBernoulli(.20))), kurt(.20), kurt(.20) * 0.4);
});
