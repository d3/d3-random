var tape = require("tape-await"),
    d3 = Object.assign({}, require("../"), require("d3-array")),
    skewness = require("./skewness"),
    kurtosis = require("./kurtosis");

require("./inDelta");

tape("d3.randomIrwinHall(n) returns random numbers with a mean of n / 2", test => {
  var randomIrwinHall = d3.randomIrwinHall.source(d3.randomLcg(0.028699383123896194));
  test.inDelta(d3.mean(d3.range(10000).map(randomIrwinHall(1))), 1 / 2, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomIrwinHall(10))), 10 / 2, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomIrwinHall(1.5))), 1.5 / 2, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomIrwinHall(4.2))), 4.2 / 2, 0.05);
});

tape("d3.randomIrwinHall(n) returns random numbers with a variance of n / 12", test => {
  var randomIrwinHall = d3.randomIrwinHall.source(d3.randomLcg(0.1515471143624345));
  test.inDelta(d3.variance(d3.range(10000).map(randomIrwinHall(1))), 1 / 12, 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomIrwinHall(10))), 10 / 12, 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomIrwinHall(1.5))), 1.5 / 12, 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomIrwinHall(4.2))), 4.2 / 12, 0.05);
});

tape("d3.randomIrwinHall(n) returns random numbers with a skewness of 0", test => {
  var randomIrwinHall = d3.randomIrwinHall.source(d3.randomLcg(0.47334122849782845));
  test.inDelta(skewness(d3.range(10000).map(randomIrwinHall(1))), 0, 0.05);
  test.inDelta(skewness(d3.range(10000).map(randomIrwinHall(10))), 0, 0.05);
  test.inDelta(skewness(d3.range(10000).map(randomIrwinHall(1.5))), 0, 0.05);
  test.inDelta(skewness(d3.range(10000).map(randomIrwinHall(4.2))), 0, 0.05);
});

tape("d3.randomIrwinHall(n) returns random numbers with a kurtosis of -6 / (5 * n)", test => {
  var randomIrwinHall = d3.randomIrwinHall.source(d3.randomLcg(0.8217913599574529));
  test.inDelta(kurtosis(d3.range(10000).map(randomIrwinHall(1))), -6 / 5, 0.1);
  test.inDelta(kurtosis(d3.range(10000).map(randomIrwinHall(10))), -6 / 50, 0.1);
  test.inDelta(kurtosis(d3.range(10000).map(randomIrwinHall(1.5))), -6 / 7.5, 0.05);
  test.inDelta(kurtosis(d3.range(10000).map(randomIrwinHall(4.2))), -6 / 21, 0.05);
});
