var tape = require("tape"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

function deviation(n) {
  return Math.sqrt(n / ((n - 1) * (n - 1) * (n - 2)));
}

tape("randomPareto() returns randoms with specified mean", function (test) {
  var randomPareto = d3.randomPareto.source(d3.randomLcg(0.1));
  test.equal(d3.mean(d3.range(10000).map(randomPareto(0))), Infinity);
  test.assert(d3.mean(d3.range(10000).map(randomPareto(1))) > 8);
  test.inDelta(d3.mean(d3.range(10000).map(randomPareto(3))), 1.5, .4);
  test.inDelta(d3.mean(d3.range(10000).map(randomPareto(5))), 1.25, .1);
  test.inDelta(d3.mean(d3.range(10000).map(randomPareto(11))), 1.1, .1);
  test.end();

});

tape("randomPareto() returns randoms with specified deviation", function (test) {
  var randomPareto = d3.randomPareto.source(d3.randomLcg(0.2));
  test.assert(isNaN(d3.deviation(d3.range(10000).map(randomPareto(0)))));
  test.assert(d3.deviation(d3.range(10000).map(randomPareto(1))) > 70);
  test.inDelta(d3.deviation(d3.range(10000).map(randomPareto(3))), deviation(3), .5);
  test.inDelta(d3.deviation(d3.range(10000).map(randomPareto(5))), deviation(5), .05);
  test.inDelta(d3.deviation(d3.range(10000).map(randomPareto(11))), deviation(11), .05);
  test.end();
});

tape("randomPareto(3) returns randoms with mean of 1.5 and deviation of 0.9", function (test) {
  var randomPareto = d3.randomPareto.source(d3.randomLcg(0.3));
  test.inDelta(d3.deviation(d3.range(10000).map(randomPareto(3))), 0.9, .2);
  test.inDelta(d3.mean(d3.range(10000).map(randomPareto(3))), 1.5, .05);
  test.end();
});
