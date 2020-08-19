var tape = require("tape"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

tape("randomNormal() returns random numbers with a mean of zero", function(test) {
  var randomNormal = d3.randomNormal.source(d3.randomLcg(0.3193923539476107));
  test.inDelta(d3.mean(d3.range(10000).map(randomNormal())), 0, .05);
  test.end();
});

tape("randomNormal() returns random numbers with a standard deviation of one", function(test) {
  var randomNormal = d3.randomNormal.source(d3.randomLcg(0.5618016004747401));
  test.inDelta(d3.deviation(d3.range(10000).map(randomNormal())), 1, .05);
  test.end();
});

tape("randomNormal(mu) returns random numbers with the specified mean", function(test) {
  var randomNormal = d3.randomNormal.source(d3.randomLcg(0.22864660166790118));
  test.inDelta(d3.mean(d3.range(10000).map(randomNormal(42))), 42, .05);
  test.inDelta(d3.mean(d3.range(10000).map(randomNormal(-2))), -2, .05);
  test.end();
});

tape("randomNormal(mu) returns random numbers with a standard deviation of 1", function(test) {
  var randomNormal = d3.randomNormal.source(d3.randomLcg(0.1274290504810609));
  test.inDelta(d3.deviation(d3.range(10000).map(randomNormal(42))), 1, .05);
  test.inDelta(d3.deviation(d3.range(10000).map(randomNormal(-2))), 1, .05);
  test.end();
});

tape("randomNormal(mu, sigma) returns random numbers with the specified mean and standard deviation", function(test) {
  var randomNormal = d3.randomNormal.source(d3.randomLcg(0.49113635631389463));
  test.inDelta(d3.mean(d3.range(10000).map(randomNormal(42, 2))), 42, .05);
  test.inDelta(d3.mean(d3.range(10000).map(randomNormal(-2, 2))), -2, .05);
  test.inDelta(d3.deviation(d3.range(10000).map(randomNormal(42, 2))), 2, .05);
  test.inDelta(d3.deviation(d3.range(10000).map(randomNormal(-2, 2))), 2, .05);
  test.end();
});
