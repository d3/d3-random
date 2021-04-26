import assert from "assert";
import * as random from "../src/index.js";
import * as d3 from "d3-array";
import {assertInDelta} from "./asserts.js";

it("randomWeibull() returns random numbers with the specified mean", () => {
  const randomWeibull = random.randomWeibull.source(random.randomLcg(0.28845828610535373));
  assertInDelta(d3.mean(d3.range(10000).map(randomWeibull(9))), 0.947, 0.1);
  assertInDelta(d3.mean(d3.range(10000).map(randomWeibull(3))), 0.893, 0.1);
  assertInDelta(d3.mean(d3.range(10000).map(randomWeibull(1))), 1, 0.1);
  assertInDelta(d3.mean(d3.range(10000).map(randomWeibull(0.3))), 9.260, 1);
  assertInDelta(d3.mean(d3.range(10000).map(randomWeibull(0))), 0.577, 0.1);
  assertInDelta(d3.mean(d3.range(10000).map(randomWeibull(-3))), 1.354, 0.1);
  assertInDelta(d3.mean(d3.range(10000).map(randomWeibull(-9))), 1.078, 0.1);
  assertInDelta(d3.mean(d3.range(10000).map(randomWeibull(4, 1, 2))), 2.813, 0.2);
  assertInDelta(d3.mean(d3.range(10000).map(randomWeibull(-4, 1, 2))), 3.451, 0.2);
});

it("randomWeibull() returns random numbers with the specified deviation", () => {
  const randomWeibull = random.randomWeibull.source(random.randomLcg(0.6675582430306972));
  assertInDelta(d3.deviation(d3.range(10000).map(randomWeibull(9))), 0.126, 0.02);
  assertInDelta(d3.deviation(d3.range(10000).map(randomWeibull(3))), 0.324, 0.06);
  assertInDelta(d3.deviation(d3.range(10000).map(randomWeibull(1))), 1, 0.2);
  assert(d3.deviation(d3.range(10000).map(randomWeibull(0.3))) > 30);
  assertInDelta(d3.deviation(d3.range(10000).map(randomWeibull(0))), 1.282, 0.05);
  assertInDelta(d3.deviation(d3.range(10000).map(randomWeibull(-3))), 0.919, 0.4);
  assertInDelta(d3.deviation(d3.range(10000).map(randomWeibull(-9))), 0.169, 0.02);
  assertInDelta(d3.deviation(d3.range(10000).map(randomWeibull(4, 1, 2))), 0.509, 0.1);
  assertInDelta(d3.deviation(d3.range(10000).map(randomWeibull(-4, 1, 2))), 1.0408, 0.1);
});
