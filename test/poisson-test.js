import * as random from "../src/index.js";
import * as d3 from "d3-array";
import {skewness, kurtosis} from "./statistics.js";
import {assertInDelta} from "./asserts.js";

// Ten times the default number of samples are taken for the lambda = 0.001 tests,
// since otherwise the very small expected number of non-zero samples would
// wildly influence summary statistics.

it("randomPoisson(lambda) returns random numbers with a mean of lambda", () => {
  const randomPoisson = random.randomPoisson.source(random.randomLcg(0.48758044703454373));
  assertInDelta(d3.mean(d3.range(100000).map(randomPoisson(0.001))), 0.001, 0.0005);
  assertInDelta(d3.mean(d3.range(10000).map(randomPoisson(0.1))), 0.1, 0.01);
  assertInDelta(d3.mean(d3.range(10000).map(randomPoisson(0.5))), 0.5, 0.05);
  assertInDelta(d3.mean(d3.range(10000).map(randomPoisson(1))), 1, 0.05);
  assertInDelta(d3.mean(d3.range(10000).map(randomPoisson(2))), 2, 0.1);
  assertInDelta(d3.mean(d3.range(10000).map(randomPoisson(10))), 10, 0.5);
  assertInDelta(d3.mean(d3.range(10000).map(randomPoisson(1000))), 1000, 20);
});

it("randomPoisson(lambda) returns random numbers with a variance of lambda", () => {
  const randomPoisson = random.randomPoisson.source(random.randomLcg(0.4777559867161436));
  assertInDelta(d3.variance(d3.range(100000).map(randomPoisson(0.001))), 0.001, 0.0005);
  assertInDelta(d3.variance(d3.range(10000).map(randomPoisson(0.1))), 0.1, 0.01);
  assertInDelta(d3.variance(d3.range(10000).map(randomPoisson(0.5))), 0.5, 0.05);
  assertInDelta(d3.variance(d3.range(10000).map(randomPoisson(1))), 1, 0.05);
  assertInDelta(d3.variance(d3.range(10000).map(randomPoisson(2))), 2, 0.1);
  assertInDelta(d3.variance(d3.range(10000).map(randomPoisson(10))), 10, 0.5);
  assertInDelta(d3.variance(d3.range(10000).map(randomPoisson(1000))), 1000, 20);
});

it("randomPoisson(lambda) returns random numbers with a skewness of 1 / sqrt(lambda)", () => {
  const randomPoisson = random.randomPoisson.source(random.randomLcg(0.09357670133206075));
  assertInDelta(skewness(d3.range(100000).map(randomPoisson(0.001))), 31.6, 5);
  assertInDelta(skewness(d3.range(10000).map(randomPoisson(0.1))), 3.16, 0.2);
  assertInDelta(skewness(d3.range(10000).map(randomPoisson(0.5))), 1.414, 0.1);
  assertInDelta(skewness(d3.range(10000).map(randomPoisson(1))), 1, 0.1);
  assertInDelta(skewness(d3.range(10000).map(randomPoisson(2))), 0.707, 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomPoisson(10))), 0.316, 0.05);
  assertInDelta(skewness(d3.range(10000).map(randomPoisson(1000))), 0.0316, 0.05);
});

it("randomPoisson(lambda) returns random numbers with a kurtosis excess of 1 / lambda", () => {
  const randomPoisson = random.randomPoisson.source(random.randomLcg(0.3299530136090847));
  assertInDelta(kurtosis(d3.range(100000).map(randomPoisson(0.001))), 1000, 200);
  assertInDelta(kurtosis(d3.range(10000).map(randomPoisson(0.1))), 10, 2);
  assertInDelta(kurtosis(d3.range(10000).map(randomPoisson(0.5))), 2, 0.5);
  assertInDelta(kurtosis(d3.range(10000).map(randomPoisson(1))), 1, 0.5);
  assertInDelta(kurtosis(d3.range(10000).map(randomPoisson(2))), 0.5, 0.2);
  assertInDelta(kurtosis(d3.range(10000).map(randomPoisson(10))), 0.1, 0.1);
  assertInDelta(kurtosis(d3.range(10000).map(randomPoisson(1000))), 0.001, 0.1);
});
