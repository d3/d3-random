import * as random from "../src/index.js";
import * as d3 from "d3-array";
import {assertInDelta} from "./asserts.js";

it("randomNormal() returns random numbers with a mean of zero", () => {
  const randomNormal = random.randomNormal.source(random.randomLcg(0.3193923539476107));
  assertInDelta(d3.mean(d3.range(10000).map(randomNormal())), 0, .05);
});

it("randomNormal() returns random numbers with a standard deviation of one", () => {
  const randomNormal = random.randomNormal.source(random.randomLcg(0.5618016004747401));
  assertInDelta(d3.deviation(d3.range(10000).map(randomNormal())), 1, .05);
});

it("randomNormal(mu) returns random numbers with the specified mean", () => {
  const randomNormal = random.randomNormal.source(random.randomLcg(0.22864660166790118));
  assertInDelta(d3.mean(d3.range(10000).map(randomNormal(42))), 42, .05);
  assertInDelta(d3.mean(d3.range(10000).map(randomNormal(-2))), -2, .05);
});

it("randomNormal(mu) returns random numbers with a standard deviation of 1", () => {
  const randomNormal = random.randomNormal.source(random.randomLcg(0.1274290504810609));
  assertInDelta(d3.deviation(d3.range(10000).map(randomNormal(42))), 1, .05);
  assertInDelta(d3.deviation(d3.range(10000).map(randomNormal(-2))), 1, .05);
});

it("randomNormal(mu, sigma) returns random numbers with the specified mean and standard deviation", () => {
  const randomNormal = random.randomNormal.source(random.randomLcg(0.49113635631389463));
  assertInDelta(d3.mean(d3.range(10000).map(randomNormal(42, 2))), 42, .05);
  assertInDelta(d3.mean(d3.range(10000).map(randomNormal(-2, 2))), -2, .05);
  assertInDelta(d3.deviation(d3.range(10000).map(randomNormal(42, 2))), 2, .05);
  assertInDelta(d3.deviation(d3.range(10000).map(randomNormal(-2, 2))), 2, .05);
});
