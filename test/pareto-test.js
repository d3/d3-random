import assert from "assert";
import * as random from "../src/index.js";
import * as d3 from "d3-array";
import {assertInDelta} from "./asserts.js";

function deviation(n) {
  return Math.sqrt(n / ((n - 1) * (n - 1) * (n - 2)));
}

it("randomPareto() returns randoms with specified mean", () => {
  const randomPareto = random.randomPareto.source(random.randomLcg(0.6165632948194271));
  assert.strictEqual(d3.mean(d3.range(10000).map(randomPareto(0))), Infinity);
  assert(d3.mean(d3.range(10000).map(randomPareto(1))) > 8);
  assertInDelta(d3.mean(d3.range(10000).map(randomPareto(3))), 1.5, .4);
  assertInDelta(d3.mean(d3.range(10000).map(randomPareto(5))), 1.25, .1);
  assertInDelta(d3.mean(d3.range(10000).map(randomPareto(11))), 1.1, .1);
});

it("randomPareto() returns randoms with specified deviation", () => {
  const randomPareto = random.randomPareto.source(random.randomLcg(0.5733127851951378));
  assert(isNaN(d3.deviation(d3.range(10000).map(randomPareto(0)))));
  assert(d3.deviation(d3.range(10000).map(randomPareto(1))) > 70);
  assertInDelta(d3.deviation(d3.range(10000).map(randomPareto(3))), deviation(3), .5);
  assertInDelta(d3.deviation(d3.range(10000).map(randomPareto(5))), deviation(5), .05);
  assertInDelta(d3.deviation(d3.range(10000).map(randomPareto(11))), deviation(11), .05);
});

it("randomPareto(3) returns randoms with mean of 1.5 and deviation of 0.9", () => {
  const randomPareto = random.randomPareto.source(random.randomLcg(0.9341538627900958));
  assertInDelta(d3.deviation(d3.range(10000).map(randomPareto(3))), 0.9, .2);
  assertInDelta(d3.mean(d3.range(10000).map(randomPareto(3))), 1.5, .05);
});
