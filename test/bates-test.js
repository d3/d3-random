var tape = require("tape"),
    array = require("d3-array"),
    seedrandom = require("seedrandom"),
    random = require("../"),
    skewness = require("./skewness"),
    kurtosis = require("./kurtosis");

require("./inDelta");

tape.test("randomBates(n) returns random numbers with a mean of one-half", function(test) {
  var randomBates = random.randomBates.source(seedrandom("f330fbece4c1c99f"));
  test.inDelta(array.mean(array.range(10000).map(randomBates(1))), .5, .05);
  test.inDelta(array.mean(array.range(10000).map(randomBates(10))), .5, .05);
  test.end();
});

tape.test("randomBates(n) returns random numbers with a variance of 1 / (12 * n)", function(test) {
  var randomBates = random.randomBates.source(seedrandom("c4af5ee918417093"));
  test.inDelta(array.variance(array.range(10000).map(randomBates(1))), 1 / 12, .05);
  test.inDelta(array.variance(array.range(10000).map(randomBates(10))), 1 / 120, .05);
  test.end();
});

tape.test("randomBates(n) returns random numbers with a skewness of 0", function(test) {
  var randomBates = random.randomBates.source(seedrandom("bb0bb470f346ff65"));
  test.inDelta(skewness(array.range(10000).map(randomBates(1))), 0, .05);
  test.inDelta(skewness(array.range(10000).map(randomBates(10))), 0, .05);
  test.end();
});

tape.test("randomBates(n) returns random numbers with a kurtosis of -6 / (5 * n)", function(test) {
  var randomBates = random.randomBates.source(seedrandom("3c21f0c8f5a8332c"));
  test.inDelta(kurtosis(array.range(10000).map(randomBates(1))), -6 / 5, .05);
  test.inDelta(kurtosis(array.range(10000).map(randomBates(10))), -6 / 50, .05);
  test.end();
});
