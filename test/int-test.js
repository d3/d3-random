import assert from "node:assert";
import {it} from "vitest";
import {extent, mean, range} from "d3-array";
import {randomInt, randomLcg} from "d3-random";
import {assertInDelta} from "./asserts.js";

it("randomInt(max) returns random integers with a mean of (max - 1) / 2", () => {
  const r = randomInt.source(randomLcg(0.7350864698209636));
  assertInDelta(mean(range(10000).map(r(3))), 1.0, 0.05);
  assertInDelta(mean(range(10000).map(r(21))), 10.0, 0.5);
});

it("randomInt(max) returns random integers in the range [0, max - 1]", () => {
  const r = randomInt.source(randomLcg(0.17809137433591848));
  assert.deepStrictEqual(extent(range(10000).map(r(3))), [0, 2]);
  assert.deepStrictEqual(extent(range(10000).map(r(21))), [0, 20]);
});

it("randomInt(min, max) returns random integers with a mean of (min + max - 1) / 2", () => {
  const r = randomInt.source(randomLcg(0.46394764422984647));
  assertInDelta(mean(range(10000).map(r(10, 43))), 26, 0.5);
});

it("randomInt(min, max) returns random integers in the range [min, max - 1]", () => {
  const r = randomInt.source(randomLcg(0.9598431138570096));
  assert.deepStrictEqual(extent(range(10000).map(r(10, 42))), [10, 41]);
});

it("randomInt(min, max) excludes the upper bound for a negative interval", () => {
  const r = randomInt.source(() => 1 - 2 ** -53);
  assert.strictEqual(r(-3, -2)(), -3);
});

it("randomInt(min, max) excludes the upper bound for a positive interval", () => {
  const r = randomInt.source(() => 1 - 2 ** -53);
  assert.strictEqual(r(1, 2)(), 1);
});

it("randomInt(min, max) excludes the upper bound with a large offset", () => {
  const min = 2 ** 52;
  const r = randomInt.source(() => 1 - 2 ** -53);
  assert.strictEqual(r(min, min + 2)(), min + 1);
});

it("randomInt(max) excludes the upper bound for a source near one", () => {
  const r = randomInt.source(() => 1 - 2 ** -53);
  assert.strictEqual(r(4)(), 3);
});

it("randomInt normalizes fractional bounds before sampling", () => {
  const r0 = randomInt.source(() => 0);
  const r1 = randomInt.source(() => 1 - 2 ** -53);
  assert.strictEqual(r0(2.9, 5.9)(), 2);
  assert.strictEqual(r1(2.9, 5.9)(), 4);
  assert.strictEqual(r1(4.9)(), 3);
});

it("randomInt handles the legal source boundaries and a binary midpoint", () => {
  assert.strictEqual(randomInt.source(() => 0)(-3, -2)(), -3);
  assert.strictEqual(randomInt.source(() => 1 - 2 ** -53)(0, 1)(), 0);
  assert.strictEqual(randomInt.source(() => 0.5)(-3, -1)(), -2);
});
