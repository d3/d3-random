import * as random from "../src/index.js";
import * as d3 from "d3-array";
import {skewness, kurtosis} from "./statistics.js";
import {assertInDelta} from "./asserts.js";

it("random.randomBates(n) returns random numbers with a mean of one-half", () => {
  const randomBates = random.randomBates.source(random.randomLcg(0.6351090615932817));
  assertInDelta(d3.mean(d3.range(10000).map(randomBates(1))), 0.5, 0.05);
  assertInDelta(d3.mean(d3.range(10000).map(randomBates(10))), 0.5, 0.05);
  assertInDelta(d3.mean(d3.range(10000).map(randomBates(1.5))), 0.5, 0.05);
  assertInDelta(d3.mean(d3.range(10000).map(randomBates(4.2))), 0.5, 0.05);
});

it("random.randomBates(n) returns random numbers with a variance of 1 / (12 * n)", () => {
  const randomBates = random.randomBates.source(random.randomLcg(0.1284832084868286));
  assertInDelta(d3.variance(d3.range(10000).map(randomBates(1))), 1 / 12, 0.05);
  assertInDelta(d3.variance(d3.range(10000).map(randomBates(10))), 1 / 120, 0.05);
  assertInDelta(d3.variance(d3.range(10000).map(randomBates(1.5))), 1 / 18, 0.05);
  assertInDelta(d3.variance(d3.range(10000).map(randomBates(4.2))), 1 / 50.4, 0.05);
});

it("random.randomBates(n) returns random numbers with a skewness of 0", () => {
  const randomBates = random.randomBates.source(random.randomLcg(0.051567609139606674));
  assertInDelta(skewness(d3.range(10000).map(randomBates(1))), 0, 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomBates(10))), 0, 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomBates(1.5))), 0, 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomBates(4.2))), 0, 0.05);
});

it("random.randomBates(n) returns random numbers with a kurtosis of -6 / (5 * n)", () => {
  const randomBates = random.randomBates.source(random.randomLcg(0.696913354780724));
  assertInDelta(kurtosis(d3.range(10000).map(randomBates(1))), -6 / 5, 0.05);
  assertInDelta(kurtosis(d3.range(10000).map(randomBates(10))), -6 / 50, 0.1);
  assertInDelta(kurtosis(d3.range(10000).map(randomBates(1.5))), -6 / 7.5, 0.05);
  assertInDelta(kurtosis(d3.range(10000).map(randomBates(4.2))), -6 / 21, 0.05);
});

it("random.randomBates(0) is equivalent to random.randomUniform()", () => {
  const randomBates = random.randomBates.source(random.randomLcg(0.7717596603725383));
  assertInDelta(d3.mean(d3.range(10000).map(randomBates(0))), 0.5, 0.05);
  assertInDelta(d3.variance(d3.range(10000).map(randomBates(0))), 1 / 12, 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomBates(0))), 0, 0.05);
  assertInDelta(kurtosis(d3.range(10000).map(randomBates(0))), -6 / 5, 0.05);
});
