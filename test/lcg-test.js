import assert from "assert";
import * as random from "../src/index.js";
import * as d3 from "d3-array";
import {assertInDelta} from "./asserts.js";

it("lcg is the expected deterministic PRNG", () => {
  const R1 = 0.6678668977692723;
  const lcg1 = random.randomLcg(0);
  assertInDelta((lcg1(), lcg1(), lcg1(), lcg1()), R1, 1e-16);
  const lcg2 = random.randomLcg(0);
  assertInDelta((lcg2(), lcg2(), lcg2(), lcg2()), R1, 1e-16);
});

it("lcg is seeded", () => {
  const seed = 0.42;
  const R42 = 0.6760216606780887;
  const lcg = random.randomLcg(seed);
  assertInDelta((lcg(), lcg(), lcg(), lcg()), R42, 1e-16);
});

it("lcg is well-distributed", () => {
  const seed = 0.2; // 1…11 are ok
  const lcg = random.randomLcg(seed);
  const run = Float32Array.from({length: 10000}, lcg);
  assertInDelta(d3.mean(run), 1 / 2, 1e-2);
  assertInDelta(d3.deviation(run), Math.sqrt(1 / 12), 1e-2);
  const histogram = d3.rollup(run, v => v.length, d => Math.floor(d * 10));
  for (const h of histogram) assertInDelta(h[1], 1000, 120);
});

it("lcg with small fractional seeds is well-distributed", () => {
  const G = d3.range(100).map(i => random.randomLcg(i/100));
  const means = [], variances = [];
  for (let i = 0; i < 10; i++) {
    const M = G.map(d => d());
    means.push(d3.mean(M));
    variances.push(d3.variance(M));
  }
  assertInDelta(d3.mean(means), 0.5, 0.02);
  assert(d3.min(variances) > 0.75 / 12);
});
