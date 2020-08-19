var tape = require("tape"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

tape("d3.randomLogNormal() returns random numbers with a log-mean of zero", function(test) {
  var randomLogNormal = d3.randomLogNormal.source(d3.randomLcg(0.9575554996277458));
  test.inDelta(d3.mean(d3.range(10000).map(randomLogNormal()), Math.log), 0, 0.05);
  test.end();
});

tape("d3.randomLogNormal() returns random numbers with a log-standard deviation of one", function(test) {
  var randomLogNormal = d3.randomLogNormal.source(d3.randomLcg(0.7369869597887295));
  test.inDelta(d3.deviation(d3.range(10000).map(randomLogNormal()), Math.log), 1, 0.05);
  test.end();
});

tape("d3.randomLogNormal(mu) returns random numbers with the specified log-mean", function(test) {
  var randomLogNormal = d3.randomLogNormal.source(d3.randomLcg(0.2083455771760374));
  test.inDelta(d3.mean(d3.range(10000).map(randomLogNormal(42)), Math.log), 42, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomLogNormal(-2)), Math.log), -2, 0.05);
  test.end();
});

tape("d3.randomLogNormal(mu) returns random numbers with a log-standard deviation of 1", function(test) {
  var randomLogNormal = d3.randomLogNormal.source(d3.randomLcg(0.7805370705171648));
  test.inDelta(d3.deviation(d3.range(10000).map(randomLogNormal(42)), Math.log), 1, 0.05);
  test.inDelta(d3.deviation(d3.range(10000).map(randomLogNormal(-2)), Math.log), 1, 0.05);
  test.end();
});

tape("d3.randomLogNormal(mu, sigma) returns random numbers with the specified log-mean and log-standard deviation", function(test) {
  var randomLogNormal = d3.randomLogNormal.source(d3.randomLcg(0.5178163416754684));
  test.inDelta(d3.mean(d3.range(10000).map(randomLogNormal(42, 2)), Math.log), 42, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomLogNormal(-2, 2)), Math.log), -2, 0.05);
  test.inDelta(d3.deviation(d3.range(10000).map(randomLogNormal(42, 2)), Math.log), 2, 0.05);
  test.inDelta(d3.deviation(d3.range(10000).map(randomLogNormal(-2, 2)), Math.log), 2, 0.05);
  test.end();
});
