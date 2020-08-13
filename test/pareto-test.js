var tape = require("tape"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

tape("randomPareto() returns randoms with specified mean", function (test) {
  var randomPareto = d3.randomPareto.source(d3.randomLcg(1));
  test.equal(d3.mean(d3.range(10000).map(randomPareto(0))), Infinity);
  test.inDelta(d3.mean(d3.range(10000).map(randomPareto(1))), 10, .5);
  test.inDelta(d3.mean(d3.range(10000).map(randomPareto(3))), 1.5, .1);
  test.inDelta(d3.mean(d3.range(10000).map(randomPareto(5))), 1.25, .1);
  test.inDelta(d3.mean(d3.range(10000).map(randomPareto(11))), 1, .1);
  test.end();
});

tape("randomPareto() returns randoms with specified deviation", function (test) {
  var randomPareto = d3.randomPareto.source(d3.randomLcg(2));
  test.assert(isNaN(d3.deviation(d3.range(10000).map(randomPareto(0)))));
  test.inDelta(d3.deviation(d3.range(10000).map(randomPareto(1))), 85, 5);
  test.inDelta(d3.deviation(d3.range(10000).map(randomPareto(3))), 1.15, .1);
  test.inDelta(d3.deviation(d3.range(10000).map(randomPareto(5))), 0.35, .05);
  test.inDelta(d3.deviation(d3.range(10000).map(randomPareto(11))), .1, .05);
  test.end();
});

tape("randomPareto(3) returns randoms with mean of 1.5 and deviation of 0.9", function (test) {
  var randomPareto = d3.randomPareto.source(d3.randomLcg(3));
  test.inDelta(d3.deviation(d3.range(10000).map(randomPareto(3))), 0.9, .05);
  test.inDelta(d3.mean(d3.range(10000).map(randomPareto(3))), 1.5, .05);
  test.end();
});
