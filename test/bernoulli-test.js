import * as random from "../src/index.js";
import * as d3 from "d3-array";
import {skewness, kurtosis} from "./statistics.js";
import {assertInDelta} from "./asserts.js";

function mean(p) {
  return p;
}

function variance(p) {
  return p * (1 - p);
}

function skew(p) {
  return (1 - 2 * p) / Math.sqrt(variance(p));
}

function kurt(p) {
  return (6 * Math.pow(p, 2) - 6 * p + 1) / (variance(p));
}

it("randomBernoulli(p) returns random bernoulli distributed numbers with a mean of p", () => {
  const randomBernoulli = random.randomBernoulli.source(random.randomLcg(0.48444190806583465));
  assertInDelta(d3.mean(d3.range(10000).map(randomBernoulli(1))), mean(1), variance(1));
  assertInDelta(d3.mean(d3.range(10000).map(randomBernoulli(.5))), mean(.5), variance(.5));
  assertInDelta(d3.mean(d3.range(10000).map(randomBernoulli(.25))), mean(.25), variance(.25));
  assertInDelta(d3.mean(d3.range(10000).map(randomBernoulli(0))), mean(0), variance(0));
});

it("randomBernoulli(p) returns random bernoulli distributed numbers with a variance of p * (1 - p)", () => {
  const randomBernoulli = random.randomBernoulli.source(random.randomLcg(0.9781605192898934));
  assertInDelta(d3.variance(d3.range(10000).map(randomBernoulli(1))), variance(1), 0);
  assertInDelta(d3.variance(d3.range(10000).map(randomBernoulli(.5))), variance(.5), 0.05);
  assertInDelta(d3.variance(d3.range(10000).map(randomBernoulli(.25))), variance(.25), 0.05);
  assertInDelta(d3.variance(d3.range(10000).map(randomBernoulli(0))), variance(0), 0);
});

it("randomBernoulli(p) returns random bernoulli distributed numbers with a skewness of (1 - 2 * p) / sqrt(p * (1 - p)).", () => {
  const randomBernoulli = random.randomBernoulli.source(random.randomLcg(0.9776249148208429));
  assertInDelta(skewness(d3.range(10000).map(randomBernoulli(.5))), skew(.5), 0.08);
  assertInDelta(skewness(d3.range(10000).map(randomBernoulli(.25))), skew(.25), 0.05);
});

it("randomBernoulli(p) returns random bernoulli distributed numbers with a kurtosis excess of (6 * p^2 - 6 * p - 1) / (p * (1 - p)).", () => {
  const randomBernoulli = random.randomBernoulli.source(random.randomLcg(0.8260973119979638));
  assertInDelta(kurtosis(d3.range(10000).map(randomBernoulli(.05))), kurt(.05), kurt(.05) * 0.2);
  assertInDelta(kurtosis(d3.range(10000).map(randomBernoulli(.10))), kurt(.10), kurt(.10) * 0.2);
  assertInDelta(kurtosis(d3.range(10000).map(randomBernoulli(.15))), kurt(.15), kurt(.15) * 0.2);
  assertInDelta(kurtosis(d3.range(50000).map(randomBernoulli(.20))), kurt(.20), kurt(.20) * 0.4);
});
