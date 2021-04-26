import * as random from "../src/index.js";
import * as d3 from "d3-array";
import {skewness, kurtosis} from "./statistics.js";
import {assertInDelta} from "./asserts.js";

function variance(a, b) {
  return Math.pow(Math.PI * b, 2) / 3;
}

it("randomLogistic(a, b) returns random numbers with a mean of a", () => {
  const randomLogistic = random.randomLogistic.source(random.randomLcg(0.8792712826844997));
  assertInDelta(d3.mean(d3.range(10000).map(randomLogistic())), 0, 0.05);
  assertInDelta(d3.mean(d3.range(10000).map(randomLogistic(5))), 5, 0.05);
  assertInDelta(d3.mean(d3.range(10000).map(randomLogistic(0, 4))), 0, 0.1);
  assertInDelta(d3.mean(d3.range(10000).map(randomLogistic(1, 3))), 1, 0.1);
  assertInDelta(d3.mean(d3.range(10000).map(randomLogistic(3, 1))), 3, 0.05);
});

it("randomLogistic(a, b) returns random numbers with a variance of (b * pi)^2 / 3", () => {
  const randomLogistic = random.randomLogistic.source(random.randomLcg(0.5768515852192524));
  assertInDelta(d3.variance(d3.range(10000).map(randomLogistic())), variance(0, 1), 0.2);
  assertInDelta(d3.variance(d3.range(10000).map(randomLogistic(5))), variance(5, 1), 0.2);
  assertInDelta(d3.variance(d3.range(10000).map(randomLogistic(0, 4))), variance(0, 4), 2);
  assertInDelta(d3.variance(d3.range(10000).map(randomLogistic(1, 3))), variance(1, 3), 2);
  assertInDelta(d3.variance(d3.range(10000).map(randomLogistic(3, 1))), variance(3, 1), 2);
});

it("randomLogistic(a, b) returns random numbers with a skewness of zero", () => {
  const randomLogistic = random.randomLogistic.source(random.randomLcg(0.8835033777589203));
  assertInDelta(skewness(d3.range(10000).map(randomLogistic())), 0, 0.1);
  assertInDelta(skewness(d3.range(10000).map(randomLogistic(5))), 0, 0.1);
  assertInDelta(skewness(d3.range(10000).map(randomLogistic(0, 4))), 0, 0.1);
  assertInDelta(skewness(d3.range(10000).map(randomLogistic(1, 3))), 0, 0.1);
  assertInDelta(skewness(d3.range(10000).map(randomLogistic(3, 1))), 0, 0.1);
});

it("randomLogistic(a, b) returns random numbers with an excess kurtosis of 1.2", () => {
  const randomLogistic = random.randomLogistic.source(random.randomLcg(0.8738996292947383));
  assertInDelta(kurtosis(d3.range(10000).map(randomLogistic())), 1.2, 0.6);
  assertInDelta(kurtosis(d3.range(10000).map(randomLogistic(5))), 1.2, 0.6);
  assertInDelta(kurtosis(d3.range(10000).map(randomLogistic(0, 4))), 1.2, 0.6);
  assertInDelta(kurtosis(d3.range(10000).map(randomLogistic(1, 3))), 1.2, 0.6);
  assertInDelta(kurtosis(d3.range(10000).map(randomLogistic(3, 1))), 1.2, 0.6);
});
