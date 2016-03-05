var tape = require("tape"),
	array = require("d3-array"),
	random = require("../"),
	skewness = require("./skewness"),
	kurtosis = require("./kurtosis");

require("seedrandom");
require("./inDelta");

var mathRandom = Math.random;

tape.test("randomBernoulli(p) returns random bernoulli distributed numbers with a mean of .5 and a variance of .25.", function(test) {
	Math.seedrandom("d5cb594f444fc692");

	var p = 0.5;
	var nums = array.range(10000).map(random.randomBernoulli(p));

	test.inDelta(array.mean(nums), p, p * (1 - p));
	test.end();
});

tape.test("randomBernoulli(p) returns random bernoulli distributed numbers with a mean of 0 and a variance of 0.", function(test) {
	Math.seedrandom("c4af5ee918417093");

	var p = 0;
	var nums = array.range(10000).map(random.randomBernoulli(p));

	test.inDelta(array.mean(nums), p, p * (1 - p));
	test.end();
});

tape.test("randomBernoulli(p) returns random bernoulli distributed numbers with a mean of 1 and a variance of 0.", function(test) {
	Math.seedrandom("bb0bb470f346ff65");

	var p = 1;
	var nums = array.range(10000).map(random.randomBernoulli(p));

	test.inDelta(array.mean(nums), p, p * (1 - p));
	test.end();
});

tape("randomBernoulli() [teardown]", function(test) {
	Math.random = mathRandom;
	test.end();
});