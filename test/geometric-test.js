import * as random from "../src/index.js";
import * as d3 from "d3-array";
import {skewness, kurtosis} from "./statistics.js";
import {assertInDelta} from "./asserts.js";

function mean(p) {
  return 1 / p;
}

function variance(p) {
  return (1 - p) / Math.pow(p, 2);
}

function skew(p) {
  return (2 - p) / Math.sqrt(1 - p);
}

function kurt(p) {
  return (Math.pow(p, 2) - 6 * p + 6) / (1 - p);
}

it("randomGeometric(p) returns random geometrically distributed numbers with a mean of 1 / p.", () => {
  const randomGeometric = random.randomGeometric.source(random.randomLcg(0.7687729138471455));
  assertInDelta(d3.mean(d3.range(10000).map(randomGeometric(1))), mean(1), variance(1));
  assertInDelta(d3.mean(d3.range(10000).map(randomGeometric(.5))), mean(.5), variance(.5));
  assertInDelta(d3.mean(d3.range(10000).map(randomGeometric(0.25))), mean(0.25), variance(0.25));
  assertInDelta(d3.mean(d3.range(10000).map(randomGeometric(0.125))), mean(0.125), variance(0.125));
});

it("randomGeometric(p) returns random geometrically distributed numbers with a variance of (1 - p) / p^2.", () => {
  const randomGeometric = random.randomGeometric.source(random.randomLcg(0.7194220774328326));
  assertInDelta(d3.variance(d3.range(10000).map(randomGeometric(1))), variance(1), variance(1) * 0.05);
  assertInDelta(d3.variance(d3.range(10000).map(randomGeometric(.5))), variance(.5), variance(.5) * 0.05);
  assertInDelta(d3.variance(d3.range(10000).map(randomGeometric(0.25))), variance(0.25), variance(.25) * 0.05);
  assertInDelta(d3.variance(d3.range(10000).map(randomGeometric(0.125))), variance(0.125), variance(.125) * 0.05);
});

it("randomGeometric(p) returns random geometrically distributed numbers with a skewness of (2 - p) / sqrt(1 - p).", () => {
  const randomGeometric = random.randomGeometric.source(random.randomLcg(0.016030992648006448));
  assertInDelta(skewness(d3.range(10000).map(randomGeometric(.5))), skew(.5), 0.05 * skew(.5));
  assertInDelta(skewness(d3.range(10000).map(randomGeometric(0.25))), skew(0.25), 0.05 * skew(0.25));
  assertInDelta(skewness(d3.range(10000).map(randomGeometric(0.125))), skew(0.125), 0.1 * skew(0.125));
});

it("randomGeometric(p) returns random geometrically distributed numbers with a kurtosis excess of (p^2 - 6 * p + 6) / (1 - p).", () => {
  const randomGeometric = random.randomGeometric.source(random.randomLcg(0.4039802168183795));
  assertInDelta(kurtosis(d3.range(20000).map(randomGeometric(.5))), kurt(.5), 0.2 * kurt(.5));
  assertInDelta(kurtosis(d3.range(20000).map(randomGeometric(0.25))), kurt(0.25), 0.3 * kurt(0.25));
  assertInDelta(kurtosis(d3.range(20000).map(randomGeometric(0.125))), kurt(0.125), 0.3 * kurt(0.125));
});
