var tape = require("tape"),
	array = require("d3-array"),
	random = require("../"),
	skewness = require("./skewness"),
	kurtosis = require("./kurtosis");

require("seedrandom");
require("./inDelta");
require("./skewness");

var mathRandom = Math.random;
var mean = function(p) { return 1 / p};
var variance = function(p) { return (1 - p) / Math.pow(p, 2)};
var skew = function(p) { return (2 - p) / Math.sqrt(1 - p)};

tape.test("randomGeometric(p) returns random geometrically distributed numbers with a mean of 1 / p.", function(test) {
	Math.seedrandom("3c21f0c8f5a8332c");
	test.inDelta(array.mean(array.range(10000).map(random.randomGeometric(1))), mean(1), variance(1));
	test.inDelta(array.mean(array.range(10000).map(random.randomGeometric(.5))), mean(.5), variance(.5));
	test.inDelta(array.mean(array.range(10000).map(random.randomGeometric(0.25))), mean(0.25), variance(0.25));
	test.inDelta(array.mean(array.range(10000).map(random.randomGeometric(0.125))), mean(0.125), variance(0.125));
	test.end();
});

tape.test("randomGeometric(p) returns random geometrically distributed numbers with a variance of (1 - p) / p^2.", function(test) {
	Math.seedrandom("f330fbece4c1c99f");
	test.inDelta(array.mean(array.range(10000).map(random.randomGeometric(1))), variance(1), 0.05);
	test.inDelta(array.mean(array.range(10000).map(random.randomGeometric(.5))), variance(.5), 0.05);
	test.inDelta(array.mean(array.range(10000).map(random.randomGeometric(0.25))), variance(0.25), 0.05);
	test.inDelta(array.mean(array.range(10000).map(random.randomGeometric(0.125))), variance(0.125), 0.05);
	test.end();
});

/*tape.test("randomGeometric(p) returns random geometrically distributed numbers with a skewness of (2 - p)/sqrt(1 - p).", function(test) {
	Math.seedrandom("c4af5ee918417093");
	test.inDelta(skewness(array.range(10000).map(random.randomGeometric(1))), mean(1), variance(1));
	test.inDelta(skewness(array.range(10000).map(random.randomGeometric(.5))), mean(.5), variance(.5));
	test.inDelta(skewness(array.range(10000).map(random.randomGeometric(0.25))), mean(0.25), variance(0.25));
	test.inDelta(skewness(array.range(10000).map(random.randomGeometric(0.125))), mean(0.125), variance(0.125));
	test.end();
});

tape.test("randomGeometric(p) returns random geometrically distributed numbers with a mean of 12 and a variance of 56.", function(test) {
	Math.seedrandom("bb0bb470f346ff65");

	var p = 0.125;
	var nums = array.range(10000).map(random.randomGeometric(p));

	test.inDelta(array.mean(nums), 1 / p, (1 - p) / Math.pow(p, 2));
	test.end();
});*/
tape("randomGeometric() [teardown]", function(test) {
	Math.random = mathRandom;
	test.end();
});