var tape = require("tape-await"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

tape("randomWeibull() returns random numbers with the specified mean", test => {
  var randomWeibull = d3.randomWeibull.source(d3.randomLcg(0.28845828610535373));
  test.inDelta(d3.mean(d3.range(10000).map(randomWeibull(9))), 0.947, 0.1);
  test.inDelta(d3.mean(d3.range(10000).map(randomWeibull(3))), 0.893, 0.1);
  test.inDelta(d3.mean(d3.range(10000).map(randomWeibull(1))), 1, 0.1);
  test.inDelta(d3.mean(d3.range(10000).map(randomWeibull(0.3))), 9.260, 1);
  test.inDelta(d3.mean(d3.range(10000).map(randomWeibull(0))), 0.577, 0.1);
  test.inDelta(d3.mean(d3.range(10000).map(randomWeibull(-3))), 1.354, 0.1);
  test.inDelta(d3.mean(d3.range(10000).map(randomWeibull(-9))), 1.078, 0.1);
  test.inDelta(d3.mean(d3.range(10000).map(randomWeibull(4, 1, 2))), 2.813, 0.2);
  test.inDelta(d3.mean(d3.range(10000).map(randomWeibull(-4, 1, 2))), 3.451, 0.2);
});

tape("randomWeibull() returns random numbers with the specified deviation", test => {
  var randomWeibull = d3.randomWeibull.source(d3.randomLcg(0.6675582430306972));
  test.inDelta(d3.deviation(d3.range(10000).map(randomWeibull(9))), 0.126, 0.02);
  test.inDelta(d3.deviation(d3.range(10000).map(randomWeibull(3))), 0.324, 0.06);
  test.inDelta(d3.deviation(d3.range(10000).map(randomWeibull(1))), 1, 0.2);
  test.assert(d3.deviation(d3.range(10000).map(randomWeibull(0.3))) > 30);
  test.inDelta(d3.deviation(d3.range(10000).map(randomWeibull(0))), 1.282, 0.05);
  test.inDelta(d3.deviation(d3.range(10000).map(randomWeibull(-3))), 0.919, 0.4);
  test.inDelta(d3.deviation(d3.range(10000).map(randomWeibull(-9))), 0.169, 0.02);
  test.inDelta(d3.deviation(d3.range(10000).map(randomWeibull(4, 1, 2))), 0.509, 0.1);
  test.inDelta(d3.deviation(d3.range(10000).map(randomWeibull(-4, 1, 2))), 1.0408, 0.1);
});
