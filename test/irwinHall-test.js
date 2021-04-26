import * as random from "../src/index.js";
import * as d3 from "d3-array";
import {skewness, kurtosis} from "./statistics.js";
import {assertInDelta} from "./asserts.js";

it("random.randomIrwinHall(n) returns random numbers with a mean of n / 2", () => {
  const randomIrwinHall = random.randomIrwinHall.source(random.randomLcg(0.028699383123896194));
  assertInDelta(d3.mean(d3.range(10000).map(randomIrwinHall(1))), 1 / 2, 0.05);
  assertInDelta(d3.mean(d3.range(10000).map(randomIrwinHall(10))), 10 / 2, 0.05);
  assertInDelta(d3.mean(d3.range(10000).map(randomIrwinHall(1.5))), 1.5 / 2, 0.05);
  assertInDelta(d3.mean(d3.range(10000).map(randomIrwinHall(4.2))), 4.2 / 2, 0.05);
});

it("random.randomIrwinHall(n) returns random numbers with a variance of n / 12", () => {
  const randomIrwinHall = random.randomIrwinHall.source(random.randomLcg(0.1515471143624345));
  assertInDelta(d3.variance(d3.range(10000).map(randomIrwinHall(1))), 1 / 12, 0.05);
  assertInDelta(d3.variance(d3.range(10000).map(randomIrwinHall(10))), 10 / 12, 0.05);
  assertInDelta(d3.variance(d3.range(10000).map(randomIrwinHall(1.5))), 1.5 / 12, 0.05);
  assertInDelta(d3.variance(d3.range(10000).map(randomIrwinHall(4.2))), 4.2 / 12, 0.05);
});

it("random.randomIrwinHall(n) returns random numbers with a skewness of 0", () => {
  const randomIrwinHall = random.randomIrwinHall.source(random.randomLcg(0.47334122849782845));
  assertInDelta(skewness(d3.range(10000).map(randomIrwinHall(1))), 0, 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomIrwinHall(10))), 0, 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomIrwinHall(1.5))), 0, 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomIrwinHall(4.2))), 0, 0.05);
});

it("random.randomIrwinHall(n) returns random numbers with a kurtosis of -6 / (5 * n)", () => {
  const randomIrwinHall = random.randomIrwinHall.source(random.randomLcg(0.8217913599574529));
  assertInDelta(kurtosis(d3.range(10000).map(randomIrwinHall(1))), -6 / 5, 0.1);
  assertInDelta(kurtosis(d3.range(10000).map(randomIrwinHall(10))), -6 / 50, 0.1);
  assertInDelta(kurtosis(d3.range(10000).map(randomIrwinHall(1.5))), -6 / 7.5, 0.05);
  assertInDelta(kurtosis(d3.range(10000).map(randomIrwinHall(4.2))), -6 / 21, 0.05);
});
