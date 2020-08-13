var tape = require("tape"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

tape("randomInt(max) returns random integers with a mean of (max - 1) / 2", function(test) {
  var randomInt = d3.randomInt.source(d3.randomLcg(1));
  test.inDelta(d3.mean(d3.range(10000).map(randomInt(3))), 1.0, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomInt(21))), 10.0, 0.5);
  test.end();
});

tape("randomInt(max) returns random integers in the range [0, max - 1]", function(test) {
  var randomInt = d3.randomInt.source(d3.randomLcg(2));
  test.deepEqual(d3.extent(d3.range(10000).map(randomInt(3))), [0, 2]);
  test.deepEqual(d3.extent(d3.range(10000).map(randomInt(21))), [0, 20]);
  test.end();
});

tape("randomInt(min, max) returns random integers with a mean of (min + max - 1) / 2", function(test) {
  var randomInt = d3.randomInt.source(d3.randomLcg(3));
  test.inDelta(d3.mean(d3.range(10000).map(randomInt(10, 43))), 26, 0.5);
  test.end();
});

tape("randomInt(min, max) returns random integers in the range [min, max - 1]", function(test) {
  var randomInt = d3.randomInt.source(d3.randomLcg(4));
  test.deepEqual(d3.extent(d3.range(10000).map(randomInt(10, 42))), [10, 41]);
  test.end();
});
