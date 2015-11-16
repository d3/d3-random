var tape = require("tape"),
    arrays = require("d3-arrays"),
    random = require("../");

require("seedrandom");
require("./inDelta");

var mathRandom = Math.random;

tape.test("exponential(lambda) returns random exponentially distributed numbers with a mean of 1/lambda.", function(test) {
  Math.seedrandom("d5cb594f444fc692");

  // average rate (e.g. 1 per 20 minutes)
  var mean = 20,
      lambda = 1/mean;

  var times = arrays.range(10000).map(random.exponential(lambda));

  test.inDelta(arrays.mean(times), mean, mean * 0.05);

  // Test cumulative distribution in intervals of 10
  arrays.range(10,100,10).forEach(function(elapsed){

    var within = times.filter(function(t){ return t <= elapsed; }),
        expected = 1 - Math.exp(-elapsed * lambda);

    test.inDelta(within.length/times.length, expected, expected * 0.02);

  });

  test.end();

});

tape("exponential() [teardown]", function(test) {
  Math.random = mathRandom;
  test.end();
});
