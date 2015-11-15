var tape = require("tape"),
    arrays = require("d3-arrays"),
    random = require("../");

require("seedrandom");
require("./inDelta");

var mathRandom = Math.random;

tape.test("poisson(n) returns random intervals of a Poisson process with mean interval n", function(test) {
  Math.seedrandom("d5cb594f444fc692");

  // average interval (e.g. 20 minutes)
  var mean = 20;

  var times = arrays.range(10000).map(random.poisson(mean));

  test.inDelta(arrays.mean(times), mean, mean * 0.05);

  // Test cumulative distribution in intervals of 10
  arrays.range(10,100,10).forEach(function(elapsed){

    var within = times.filter(function(t){ return t <= elapsed; }),
        expected = 1 - Math.exp(-elapsed/mean);

    test.inDelta(within.length/times.length, expected, expected * 0.02);

  });

  test.end();

});

tape("poisson() [teardown]", function(test) {
  Math.random = mathRandom;
  test.end();
});

function p(x,mu) {
  return Math.exp(-mu) * Math.pow(mu,x) / factorial(x);
}

function factorial(num) {

  if (num === 0) {
    return 1;
  }

  return num * factorial(num - 1);

}
