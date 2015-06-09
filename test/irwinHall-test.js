var tape = require("tape"),
    arrays = require("d3-arrays"),
    random = require("../"),
    skewness = require("./skewness"),
    kurtosis = require("./kurtosis");

require("seedrandom");
require("./inDelta");

var mathRandom = Math.random;

tape.test("irwinHall(n) returns random numbers with a mean of n / 2", function(test) {
  Math.seedrandom("f330fbece4c1c99f");
  test.inDelta(arrays.mean(arrays.range(10000).map(random.irwinHall(1))), 1 / 2, .05);
  test.inDelta(arrays.mean(arrays.range(10000).map(random.irwinHall(10))), 10 / 2, .05);
  test.end();
});

tape.test("irwinHall(n) returns random numbers with a variance of n / 12", function(test) {
  Math.seedrandom("c4af5ee918417093");
  test.inDelta(arrays.variance(arrays.range(10000).map(random.irwinHall(1))), 1 / 12, .05);
  test.inDelta(arrays.variance(arrays.range(10000).map(random.irwinHall(10))), 10 / 12, .05);
  test.end();
});

tape.test("irwinHall(n) returns random numbers with a skewness of 0", function(test) {
  Math.seedrandom("bb0bb470f346ff65");
  test.inDelta(skewness(arrays.range(10000).map(random.irwinHall(1))), 0, .05);
  test.inDelta(skewness(arrays.range(10000).map(random.irwinHall(10))), 0, .05);
  test.end();
});

tape.test("irwinHall(n) returns random numbers with a kurtosis of -6 / (5 * n)", function(test) {
  Math.seedrandom("3c21f0c8f5a8332c");
  test.inDelta(kurtosis(arrays.range(10000).map(random.irwinHall(1))), -6 / 5, .05);
  test.inDelta(kurtosis(arrays.range(10000).map(random.irwinHall(10))), -6 / 50, .05);
  test.end();
});

tape("irwinHall() [teardown]", function(test) {
  Math.random = mathRandom;
  test.end();
});
