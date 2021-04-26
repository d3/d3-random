import * as random from "../src/index.js";
import * as d3 from "d3-array";
import {assertInDelta} from "./asserts.js";

it("random.randomLogNormal() returns random numbers with a log-mean of zero", () => {
  const randomLogNormal = random.randomLogNormal.source(random.randomLcg(0.9575554996277458));
  assertInDelta(d3.mean(d3.range(10000).map(randomLogNormal()), Math.log), 0, 0.05);
});

it("random.randomLogNormal() returns random numbers with a log-standard deviation of one", () => {
  const randomLogNormal = random.randomLogNormal.source(random.randomLcg(0.7369869597887295));
  assertInDelta(d3.deviation(d3.range(10000).map(randomLogNormal()), Math.log), 1, 0.05);
});

it("random.randomLogNormal(mu) returns random numbers with the specified log-mean", () => {
  const randomLogNormal = random.randomLogNormal.source(random.randomLcg(0.2083455771760374));
  assertInDelta(d3.mean(d3.range(10000).map(randomLogNormal(42)), Math.log), 42, 0.05);
  assertInDelta(d3.mean(d3.range(10000).map(randomLogNormal(-2)), Math.log), -2, 0.05);
});

it("random.randomLogNormal(mu) returns random numbers with a log-standard deviation of 1", () => {
  const randomLogNormal = random.randomLogNormal.source(random.randomLcg(0.7805370705171648));
  assertInDelta(d3.deviation(d3.range(10000).map(randomLogNormal(42)), Math.log), 1, 0.05);
  assertInDelta(d3.deviation(d3.range(10000).map(randomLogNormal(-2)), Math.log), 1, 0.05);
});

it("random.randomLogNormal(mu, sigma) returns random numbers with the specified log-mean and log-standard deviation", () => {
  const randomLogNormal = random.randomLogNormal.source(random.randomLcg(0.5178163416754684));
  assertInDelta(d3.mean(d3.range(10000).map(randomLogNormal(42, 2)), Math.log), 42, 0.05);
  assertInDelta(d3.mean(d3.range(10000).map(randomLogNormal(-2, 2)), Math.log), -2, 0.05);
  assertInDelta(d3.deviation(d3.range(10000).map(randomLogNormal(42, 2)), Math.log), 2, 0.05);
  assertInDelta(d3.deviation(d3.range(10000).map(randomLogNormal(-2, 2)), Math.log), 2, 0.05);
});
