import assert from "assert";
import * as random from "../src/index.js";
import * as d3 from "d3-array";
import {assertInDelta} from "./asserts.js";

it("randomInt(max) returns random integers with a mean of (max - 1) / 2", () => {
  const randomInt = random.randomInt.source(random.randomLcg(0.7350864698209636));
  assertInDelta(d3.mean(d3.range(10000).map(randomInt(3))), 1.0, 0.05);
  assertInDelta(d3.mean(d3.range(10000).map(randomInt(21))), 10.0, 0.5);
});

it("randomInt(max) returns random integers in the range [0, max - 1]", () => {
  const randomInt = random.randomInt.source(random.randomLcg(0.17809137433591848));
  assert.deepStrictEqual(d3.extent(d3.range(10000).map(randomInt(3))), [0, 2]);
  assert.deepStrictEqual(d3.extent(d3.range(10000).map(randomInt(21))), [0, 20]);
});

it("randomInt(min, max) returns random integers with a mean of (min + max - 1) / 2", () => {
  const randomInt = random.randomInt.source(random.randomLcg(0.46394764422984647));
  assertInDelta(d3.mean(d3.range(10000).map(randomInt(10, 43))), 26, 0.5);
});

it("randomInt(min, max) returns random integers in the range [min, max - 1]", () => {
  const randomInt = random.randomInt.source(random.randomLcg(0.9598431138570096));
  assert.deepStrictEqual(d3.extent(d3.range(10000).map(randomInt(10, 42))), [10, 41]);
});
