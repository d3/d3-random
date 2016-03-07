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
var mean = function(n, p) { return n * p};
var variance = function(n, p) { return n * p * (1 - p)};
var skew = function(n, p) { return (1 - 2 * p) / Math.sqrt(variance(p))};

tape.test("randomBinomial(p) returns random binomial distributed numbers with a mean of n * p", function(test) {
	Math.seedrandom("d5cb594f444fc692");
	test.inDelta(array.mean(array.range(10000).map(random.randomBinomial(100, 1))), mean(100, 1), variance(100, 1));
	test.inDelta(array.mean(array.range(10000).map(random.randomBinomial(100, .5))), mean(100, .5), variance(100, .5));
	test.inDelta(array.mean(array.range(10000).map(random.randomBinomial(100, .25))), mean(100, .25), variance(100, .25));
	test.inDelta(array.mean(array.range(10000).map(random.randomBinomial(100, 0))), mean(100, 0), variance(100, 0));
	test.inDelta(array.mean(array.range(10000).map(random.randomBinomial(0, 0))), mean(0, 0), variance(0, 0));
	test.end();
});

tape.test("randomBinomial(p) returns random binomial distributed numbers with a variance of p * (1 - p)", function(test) {
	Math.seedrandom("c4af5ee918417093");
	test.inDelta(array.variance(array.range(10000).map(random.randomBinomial(100, 1))), variance(100, 1), 0);
	test.inDelta(array.variance(array.range(10000).map(random.randomBinomial(100, .5))), variance(100, .5), 0.5);
	test.inDelta(array.variance(array.range(10000).map(random.randomBinomial(100, .25))), variance(100, .25), 0.05);
	test.inDelta(array.variance(array.range(10000).map(random.randomBinomial(100, 0))), variance(100, 0), 0);
	test.inDelta(array.variance(array.range(10000).map(random.randomBinomial(0, 0))), variance(0, 0), 0);
	test.end();
});

tape("randomBinomial() [teardown]", function(test) {
	Math.random = mathRandom;
	test.end();
});