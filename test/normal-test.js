var tape = require("tape"),
    random = require("../");

require("seedrandom");
require("./kolmogorovSmirnov");

var mathRandom = Math.random;

tape("normal(mu, sigma) returns random numbers with a normal distribution", function(test) {
  Math.seedrandom("a random seed.");
  var mu = -43289, sigma = 38.8;
  test.kolmogorovSmirnov(random.uniform(mu, sigma), normalCdf(mu, sigma));
  test.end();
});

tape("normal() [teardown]", function(test) {
  Math.random = mathRandom;
  test.end();
});

// Logistic approximation to normal CDF around N(mu, sigma).
function normalCdf(mu, sigma) {
  return function(x) {
    return 1 / (1 + Math.exp(-0.07056 * Math.pow((x - mu)/ sigma, 3) - 1.5976 * (x - mu)/ sigma));
  };
}
