var tape = require("tape"),
    array = require("d3-array"),
    random = require("../");

require("seedrandom");
require("./inDelta");

var mathRandom = Math.random;

tape.test("randomPareto() returns randoms with specified mean", function (test) {
    Math.seedrandom("111c7d3df15b2");
    test.equal(array.mean(array.range(10000).map(random.randomPareto(0))), Infinity);
    test.inDelta(array.mean(array.range(10000).map(random.randomPareto(1))), 10, .5);
    test.inDelta(array.mean(array.range(10000).map(random.randomPareto(3))), 1.5, .1);
    test.inDelta(array.mean(array.range(10000).map(random.randomPareto(5))), 1.25, .1);
    test.inDelta(array.mean(array.range(10000).map(random.randomPareto(11))), 1, .1);
    test.end();
});

tape.test("randomPareto() returns randoms with specified deviation", function (test) {
    Math.seedrandom("111c7d3df15b2");
    test.assert(isNaN(array.deviation(array.range(10000).map(random.randomPareto(0)))));
    test.inDelta(array.deviation(array.range(10000).map(random.randomPareto(1))), 85, 5);
    test.inDelta(array.deviation(array.range(10000).map(random.randomPareto(3))), 1.15, .1);
    test.inDelta(array.deviation(array.range(10000).map(random.randomPareto(5))), 0.35, .05);
    test.inDelta(array.deviation(array.range(10000).map(random.randomPareto(11))), .1, .05);
    test.end();
});

tape.test("randomPareto(3) returns randoms with mean of 1.5 and deviation of 0.9", function (test) {
    Math.seedrandom("a6dffb6828b2b");
    test.inDelta(array.deviation(array.range(10000).map(random.randomPareto(3))), 0.9, .05);
    test.inDelta(array.mean(array.range(10000).map(random.randomPareto(3))), 1.5, .05);
    test.end();
});

tape("randomPareto() [teardown]", function(test) {
    Math.random = mathRandom;
    test.end();
});