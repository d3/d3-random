var tape = require("tape"),
    seedrandom = require("seedrandom"),
		skewness = require("./skewness"),
		kurtosis = require("./kurtosis"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

var mean = function(p) { return p; };
var variance = function(p) { return p * (1 - p); };
var skew = function(p) { return (1 - 2 * p) / Math.sqrt(variance(p)); };
var kurt = function(p) { return (6 * Math.pow(p, 2) - 6 * p + 1) / variance(p); };

tape.test("randomBernoulli(p) returns random bernoulli distributed numbers with a mean of p", function(test) {
	var randomBernoulli = d3.randomBernoulli.source(seedrandom("d5cb594f444fc692"));
	test.inDelta(d3.mean(d3.range(10000).map(randomBernoulli(1))), mean(1), variance(1));
	test.inDelta(d3.mean(d3.range(10000).map(randomBernoulli(.5))), mean(.5), variance(.5));
	test.inDelta(d3.mean(d3.range(10000).map(randomBernoulli(.25))), mean(.25), variance(.25));
	test.inDelta(d3.mean(d3.range(10000).map(randomBernoulli(0))), mean(0), variance(0));
	test.end();
});

tape.test("randomBernoulli(p) returns random bernoulli distributed numbers with a variance of p * (1 - p)", function(test) {
	var randomBernoulli = d3.randomBernoulli.source(seedrandom("c4af5ee918417093"));
	test.inDelta(d3.variance(d3.range(10000).map(randomBernoulli(1))), variance(1), 0);
	test.inDelta(d3.variance(d3.range(10000).map(randomBernoulli(.5))), variance(.5), 0.05);
	test.inDelta(d3.variance(d3.range(10000).map(randomBernoulli(.25))), variance(.25), 0.05);
	test.inDelta(d3.variance(d3.range(10000).map(randomBernoulli(0))), variance(0), 0);
	test.end();
});

tape.test("randomBernoulli(p) returns random bernoulli distributed numbers with a skewness of (1 - 2 * p) / sqrt(p * (1 - p)).", function(test) {
	var randomBernoulli = d3.randomBernoulli.source(seedrandom("bb0bb470f346ff65"));
	test.inDelta(skewness(d3.range(10000).map(randomBernoulli(.5))), skew(.5), 0.05);
	test.inDelta(skewness(d3.range(10000).map(randomBernoulli(.25))), skew(.25), 0.05);
	test.end();
});

tape.test("randomBernoulli(p) returns random bernoulli distributed numbers with a kurtosis excess of (6 * p^2 - 6 * p - 1) / (p * (1 - p)).", function(test) {
	var randomBernoulli = d3.randomBernoulli.source(seedrandom("e6roo8u1129lg5lx"));
	test.inDelta(kurtosis(d3.range(10000).map(randomBernoulli(.05))), kurt(.05), kurt(.05) * 0.1);
	test.inDelta(kurtosis(d3.range(10000).map(randomBernoulli(.10))), kurt(.10), kurt(.10) * 0.1);
	test.inDelta(kurtosis(d3.range(10000).map(randomBernoulli(.15))), kurt(.15), kurt(.15) * 0.1);
	test.inDelta(kurtosis(d3.range(10000).map(randomBernoulli(.20))), kurt(.20), kurt(.20) * 0.1);
	test.end();
});
