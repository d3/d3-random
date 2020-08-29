var tape = require("tape-await"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

// Since the Cauchy distribution is "pathological" in that no integral moments exist,
// we simply test for the median, equivalent to the location parameter.

tape("randomCauchy(a, b) returns random numbers with a median of a", test => {
  var randomCauchy = d3.randomCauchy.source(d3.randomLcg(0.42));
  test.inDelta(d3.median(d3.range(10000).map(randomCauchy())), 0, 0.05);
  test.inDelta(d3.median(d3.range(10000).map(randomCauchy(5))), 5, 0.05);
  test.inDelta(d3.median(d3.range(10000).map(randomCauchy(0, 4))), 0, 0.1);
  test.inDelta(d3.median(d3.range(10000).map(randomCauchy(1, 3))), 1, 0.1);
  test.inDelta(d3.median(d3.range(10000).map(randomCauchy(3, 1))), 3, 0.05);
});
