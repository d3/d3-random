var tape = require("tape"),
    seedrandom = require("seedrandom"),
    d3 = Object.assign({}, require("../"), require("d3-array")),
    skewness = require("./skewness"),
    kurtosis = require("./kurtosis");

require("./inDelta");

tape.test("d3.randomIrwinHall(n) returns random numbers with a mean of n / 2", function(test) {
  var randomIrwinHall = d3.randomIrwinHall.source(seedrandom("f330fbece4c1c99f"));
  test.inDelta(d3.mean(d3.range(10000).map(randomIrwinHall(1))), 1 / 2, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomIrwinHall(10))), 10 / 2, 0.05);
  test.end();
});

tape.test("d3.randomIrwinHall(n) returns random numbers with a variance of n / 12", function(test) {
  var randomIrwinHall = d3.randomIrwinHall.source(seedrandom("c4af5ee918417093"));
  test.inDelta(d3.variance(d3.range(10000).map(randomIrwinHall(1))), 1 / 12, 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomIrwinHall(10))), 10 / 12, 0.05);
  test.end();
});

tape.test("d3.randomIrwinHall(n) returns random numbers with a skewness of 0", function(test) {
  var randomIrwinHall = d3.randomIrwinHall.source(seedrandom("bb0bb470f346ff65"));
  test.inDelta(skewness(d3.range(10000).map(randomIrwinHall(1))), 0, 0.05);
  test.inDelta(skewness(d3.range(10000).map(randomIrwinHall(10))), 0, 0.05);
  test.end();
});

tape.test("d3.randomIrwinHall(n) returns random numbers with a kurtosis of -6 / (5 * n)", function(test) {
  var randomIrwinHall = d3.randomIrwinHall.source(seedrandom("3c21f0c8f5a8332c"));
  test.inDelta(kurtosis(d3.range(10000).map(randomIrwinHall(1))), -6 / 5, 0.05);
  test.inDelta(kurtosis(d3.range(10000).map(randomIrwinHall(10))), -6 / 50, 0.05);
  test.end();
});
