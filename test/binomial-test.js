import * as random from "../src/index.js";
import * as d3 from "d3-array";
import {skewness, kurtosis} from "./statistics.js";
import {assertInDelta} from "./asserts.js";

function mean(n, p) {
  return n * p;
}

function variance(n, p) {
  return n * p * (1 - p);
}

function skew(n, p) {
  return (1 - 2 * p) / Math.sqrt(variance(n, p));
}

function kurt(n, p) {
  return (6 * Math.pow(p, 2) - 6 * p + 1) / (variance(n, p));
}

it("randomBinomial(n, p) returns random binomial distributed numbers with a mean of n * p", () => {
  const randomBinomial = random.randomBinomial.source(random.randomLcg(0.3994478770613372));
  assertInDelta(d3.mean(d3.range(10000).map(randomBinomial(100, 1))), mean(100, 1), variance(100, 1));
  assertInDelta(d3.mean(d3.range(10000).map(randomBinomial(100, .5))), mean(100, .5), variance(100, .5));
  assertInDelta(d3.mean(d3.range(10000).map(randomBinomial(100, .25))), mean(100, .25), variance(100, .25));
  assertInDelta(d3.mean(d3.range(10000).map(randomBinomial(100, 0))), mean(100, 0), variance(100, 0));
  assertInDelta(d3.mean(d3.range(10000).map(randomBinomial(0, 0))), mean(0, 0), variance(0, 0));
});

it("randomBinomial(n, p) returns random binomial distributed numbers with a variance of n * p * (1 - p)", () => {
  const randomBinomial = random.randomBinomial.source(random.randomLcg(0.7214876234380256));
  assertInDelta(d3.variance(d3.range(10000).map(randomBinomial(100, 1))), variance(100, 1), 0);
  assertInDelta(d3.variance(d3.range(10000).map(randomBinomial(100, .5))), variance(100, .5), 0.5);
  assertInDelta(d3.variance(d3.range(10000).map(randomBinomial(100, .25))), variance(100, .25), 1);
  assertInDelta(d3.variance(d3.range(10000).map(randomBinomial(100, 0))), variance(100, 0), 0);
  assertInDelta(d3.variance(d3.range(10000).map(randomBinomial(0, 0))), variance(0, 0), 0);
});

it("randomBinomial(n, p) returns random binomial distributed numbers with a skewness of (1 - 2 * p) / sqrt(n * p * (1 - p))", () => {
  const randomBinomial = random.randomBinomial.source(random.randomLcg(0.0646181509291679));
  assertInDelta(skewness(d3.range(10000).map(randomBinomial(100, .05))), skew(100, .05), 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomBinomial(100, .10))), skew(100, .10), 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomBinomial(100, .15))), skew(100, .15), 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomBinomial(100, .20))), skew(100, .20), 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomBinomial(100, .25))), skew(100, .25), 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomBinomial(100, .30))), skew(100, .30), 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomBinomial(100, .35))), skew(100, .35), 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomBinomial(100, .40))), skew(100, .40), 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomBinomial(100, .45))), skew(100, .45), 0.05);
});

it("randomBinomial(n, p) returns random binomial distributed numbers with a kurtosis excess of (6 * p^2 - 6 * p - 1) / (n * p * (1 - p))", () => {
  const randomBinomial = random.randomBinomial.source(random.randomLcg(0.6451552018202751));
  assertInDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .05))), kurt(100, .05), 0.2);
  assertInDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .10))), kurt(100, .10), 0.1);
  assertInDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .15))), kurt(100, .15), 0.1);
  assertInDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .20))), kurt(100, .20), 0.1);
  assertInDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .25))), kurt(100, .25), 0.1);
  assertInDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .30))), kurt(100, .30), 0.1);
  assertInDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .35))), kurt(100, .35), 0.1);
  assertInDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .40))), kurt(100, .40), 0.1);
  assertInDelta(kurtosis(d3.range(10000).map(randomBinomial(100, .45))), kurt(100, .45), 0.05);
});
