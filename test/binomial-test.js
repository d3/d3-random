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
var skew = function(n, p) { return (1 - 2 * p) / Math.sqrt(variance(n, p))};
var kurt = function(n, p) { return (6 * Math.pow(p, 2) - 6 * p + 1) / (variance(n, p)) };

tape.test("randomBinomial(n, p) returns random binomial distributed numbers with a mean of n * p", function(test) {
	Math.seedrandom("d5cb594f444fc692");
	test.inDelta(array.mean(array.range(10000).map(random.randomBinomial(100, 1))), mean(100, 1), variance(100, 1));
	test.inDelta(array.mean(array.range(10000).map(random.randomBinomial(100, .5))), mean(100, .5), variance(100, .5));
	test.inDelta(array.mean(array.range(10000).map(random.randomBinomial(100, .25))), mean(100, .25), variance(100, .25));
	test.inDelta(array.mean(array.range(10000).map(random.randomBinomial(100, 0))), mean(100, 0), variance(100, 0));
	test.inDelta(array.mean(array.range(10000).map(random.randomBinomial(0, 0))), mean(0, 0), variance(0, 0));
	test.end();
});

tape.test("randomBinomial(n, p) returns random binomial distributed numbers with a variance of n * p * (1 - p)", function(test) {
	Math.seedrandom("c4af5ee918417093");
	test.inDelta(array.variance(array.range(10000).map(random.randomBinomial(100, 1))), variance(100, 1), 0);
	test.inDelta(array.variance(array.range(10000).map(random.randomBinomial(100, .5))), variance(100, .5), 0.5);
	test.inDelta(array.variance(array.range(10000).map(random.randomBinomial(100, .25))), variance(100, .25), 0.05);
	test.inDelta(array.variance(array.range(10000).map(random.randomBinomial(100, 0))), variance(100, 0), 0);
	test.inDelta(array.variance(array.range(10000).map(random.randomBinomial(0, 0))), variance(0, 0), 0);
	test.end();
});

tape.test("randomBinomial(n, p) returns random binomial distributed numbers with a skewness of (1 - 2 * p) / sqrt(n * p * (1 - p))", function(test) {
	Math.seedrandom("tp4ywtastf9i9408");
	test.inDelta(skewness(array.range(10000).map(random.randomBinomial(100, .05))), skew(100, .05), 0.05);
	test.inDelta(skewness(array.range(10000).map(random.randomBinomial(100, .10))), skew(100, .10), 0.05);
	test.inDelta(skewness(array.range(10000).map(random.randomBinomial(100, .15))), skew(100, .15), 0.05);
	test.inDelta(skewness(array.range(10000).map(random.randomBinomial(100, .20))), skew(100, .20), 0.05);
	test.inDelta(skewness(array.range(10000).map(random.randomBinomial(100, .25))), skew(100, .25), 0.05);
	test.inDelta(skewness(array.range(10000).map(random.randomBinomial(100, .30))), skew(100, .30), 0.05);
	test.inDelta(skewness(array.range(10000).map(random.randomBinomial(100, .35))), skew(100, .35), 0.05);
	test.inDelta(skewness(array.range(10000).map(random.randomBinomial(100, .40))), skew(100, .40), 0.05);
	test.inDelta(skewness(array.range(10000).map(random.randomBinomial(100, .45))), skew(100, .45), 0.05);
	test.end();
});

tape.test("randomBinomial(n, p) returns random binomial distributed numbers with a kurtosis excess of (6 * p^2 - 6 * p - 1) / (n * p * (1 - p))", function(test) {
	Math.seedrandom("n8qthobcylorx9b1");
	test.inDelta(kurtosis(array.range(10000).map(random.randomBinomial(100, .05))), kurt(100, .05), 0.05);
	test.inDelta(kurtosis(array.range(10000).map(random.randomBinomial(100, .10))), kurt(100, .10), 0.05);
	test.inDelta(kurtosis(array.range(10000).map(random.randomBinomial(100, .15))), kurt(100, .15), 0.05);
	test.inDelta(kurtosis(array.range(10000).map(random.randomBinomial(100, .20))), kurt(100, .20), 0.05);
	test.inDelta(kurtosis(array.range(10000).map(random.randomBinomial(100, .25))), kurt(100, .25), 0.05);
	test.inDelta(kurtosis(array.range(10000).map(random.randomBinomial(100, .30))), kurt(100, .30), 0.05);
	test.inDelta(kurtosis(array.range(10000).map(random.randomBinomial(100, .35))), kurt(100, .35), 0.05);
	test.inDelta(kurtosis(array.range(10000).map(random.randomBinomial(100, .40))), kurt(100, .40), 0.05);
	test.inDelta(kurtosis(array.range(10000).map(random.randomBinomial(100, .45))), kurt(100, .45), 0.05);
	test.end();
});

tape("randomBinomial() [teardown]", function(test) {
	Math.random = mathRandom;
	test.end();
});