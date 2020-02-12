var tape = require("tape"),
    seedrandom = require("seedrandom"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

tape("randomWeibull() returns random numbers with the specified mean", function (test) {
  var randomWeibull = d3.randomWeibull.source(seedrandom("5125ce415d4cd8e"));
  test.inDelta(d3.mean(d3.range(10000).map(randomWeibull(1, 0.3))), 9.260, 1);
  test.inDelta(d3.mean(d3.range(10000).map(randomWeibull(1, 1))), 1, 0.1);
  test.inDelta(d3.mean(d3.range(10000).map(randomWeibull(1, 3))), 0.893, 0.1);
  test.inDelta(d3.mean(d3.range(10000).map(randomWeibull(1, 9))), 0.947, 0.1);
  test.inDelta(d3.mean(d3.range(10000).map(randomWeibull(2, 4))), 1.813, 0.2);
  test.end();
});

tape("randomWeibull() returns random numbers with the specified deviation", function (test) {
  var randomWeibull = d3.randomWeibull.source(seedrandom("2d61cfee9eb78d19"));
  test.inDelta(d3.deviation(d3.range(10000).map(randomWeibull(1, 0.3))), 50, 10);
  test.inDelta(d3.deviation(d3.range(10000).map(randomWeibull(1, 1))), 1, 0.2);
  test.inDelta(d3.deviation(d3.range(10000).map(randomWeibull(1, 3))), 0.324, 0.06);
  test.inDelta(d3.deviation(d3.range(10000).map(randomWeibull(1, 9))), 0.126, 0.02);
  test.inDelta(d3.deviation(d3.range(10000).map(randomWeibull(2, 4))), 0.509, 0.1);
  test.end();
});
