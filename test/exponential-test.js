var tape = require("tape"),
    array = require("d3-array"),
    seedrandom = require("seedrandom"),
    random = require("../");

require("./inDelta");

tape.test("randomExponential(lambda) returns random exponentially distributed numbers with a mean of 1/lambda.", function(test) {
  var randomExponential = random.randomExponential.source(seedrandom("d5cb594f444fc692"));

  var mean = 20,
      lambda = 1 / mean, // average rate (e.g. 1 per 20 minutes)
      times = array.range(10000).map(randomExponential(lambda));

  test.inDelta(array.mean(times), mean, mean * 0.05);

  // Test cumulative distribution in intervals of 10.
  array.range(10, 100, 10).forEach(function(elapsed) {
    var within = times.filter(function(t) { return t <= elapsed; }),
        expected = 1 - Math.exp(-elapsed * lambda);
    test.inDelta(within.length / times.length, expected, expected * 0.02);
  });

  test.end();
});
