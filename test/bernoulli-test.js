var tape = require("tape"),
	array = require("d3-array"),
	random = require("../"),
	skewness = require("./skewness"),
	kurtosis = require("./kurtosis");

require("seedrandom");
require("./inDelta");
require("./skewness");
require("./kurtosis");

var mathRandom = Math.random;
var mean = function(p) { return p};
var variance = function(p) { return p * (1 - p)};
var skew = function(p) { return (1 - 2 * p) / Math.sqrt(variance(p))};

tape.test("randomBernoulli(p) returns random bernoulli distributed numbers with a mean of p", function(test) {
	Math.seedrandom("d5cb594f444fc692");
	test.inDelta(array.mean(array.range(10000).map(random.randomBernoulli(1))), mean(1), variance(1));
	test.inDelta(array.mean(array.range(10000).map(random.randomBernoulli(.5))), mean(.5), variance(.5));
	test.inDelta(array.mean(array.range(10000).map(random.randomBernoulli(.25))), mean(.25), variance(.25));
	test.inDelta(array.mean(array.range(10000).map(random.randomBernoulli(0))), mean(0), variance(0));
	test.end();
});

tape.test("randomBernoulli(p) returns random bernoulli distributed numbers with a variance of p * (1 - p)", function(test) {
	Math.seedrandom("c4af5ee918417093");
	test.inDelta(array.variance(array.range(10000).map(random.randomBernoulli(1))), variance(1), 0);
	test.inDelta(array.variance(array.range(10000).map(random.randomBernoulli(.5))), variance(.5), 0.05);
	test.inDelta(array.variance(array.range(10000).map(random.randomBernoulli(.25))), variance(.25), 0.05);
	test.inDelta(array.variance(array.range(10000).map(random.randomBernoulli(0))), variance(0), 0);
	test.end();
});

tape.test("randomBernoulli(p) returns random bernoulli distributed numbers with a skewness of (1 - 2 * p) / sqrt(p * (1 - p)).", function(test) {
	Math.seedrandom("bb0bb470f346ff65");
	test.inDelta(skewness(array.range(10000).map(random.randomBernoulli(.5))), skew(.5), 0.05);
	test.inDelta(skewness(array.range(10000).map(random.randomBernoulli(.25))), skew(.25), 0.05);
	test.end();
});

tape("randomBernoulli() [teardown]", function(test) {
	Math.random = mathRandom;
	test.end();
});