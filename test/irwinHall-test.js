var tape = require("tape"),
    array = require("d3-array"),
    seedrandom = require("seedrandom"),
    random = require("../"),
    skewness = require("./skewness"),
    kurtosis = require("./kurtosis");

require("./inDelta");

tape.test("randomIrwinHall(n) returns random numbers with a mean of n / 2", function(test) {
  var randomIrwinHall = random.randomIrwinHall.source(seedrandom("f330fbece4c1c99f"));
  test.inDelta(array.mean(array.range(10000).map(randomIrwinHall(1))), 1 / 2, .05);
  test.inDelta(array.mean(array.range(10000).map(randomIrwinHall(10))), 10 / 2, .05);
  test.end();
});

tape.test("randomIrwinHall(n) returns random numbers with a variance of n / 12", function(test) {
  var randomIrwinHall = random.randomIrwinHall.source(seedrandom("c4af5ee918417093"));
  test.inDelta(array.variance(array.range(10000).map(randomIrwinHall(1))), 1 / 12, .05);
  test.inDelta(array.variance(array.range(10000).map(randomIrwinHall(10))), 10 / 12, .05);
  test.end();
});

tape.test("randomIrwinHall(n) returns random numbers with a skewness of 0", function(test) {
  var randomIrwinHall = random.randomIrwinHall.source(seedrandom("bb0bb470f346ff65"));
  test.inDelta(skewness(array.range(10000).map(randomIrwinHall(1))), 0, .05);
  test.inDelta(skewness(array.range(10000).map(randomIrwinHall(10))), 0, .05);
  test.end();
});

tape.test("randomIrwinHall(n) returns random numbers with a kurtosis of -6 / (5 * n)", function(test) {
  var randomIrwinHall = random.randomIrwinHall.source(seedrandom("3c21f0c8f5a8332c"));
  test.inDelta(kurtosis(array.range(10000).map(randomIrwinHall(1))), -6 / 5, .05);
  test.inDelta(kurtosis(array.range(10000).map(randomIrwinHall(10))), -6 / 50, .05);
  test.end();
});
