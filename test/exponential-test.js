import * as random from "../src/index.js";
import * as d3 from "d3-array";
import {assertInDelta} from "./asserts.js";

it("random.randomExponential(lambda) returns random exponentially distributed numbers with a mean of 1/lambda.", () => {
  const randomExponential = random.randomExponential.source(random.randomLcg(0.42)),
      mean = 20,
      lambda = 1 / mean, // average rate (e.g. 1 per 20 minutes)
      times = d3.range(10000).map(randomExponential(lambda));

  assertInDelta(d3.mean(times), mean, mean * 0.05);

  // Test cumulative distribution in intervals of 10.
  d3.range(10, 100, 10).forEach(function(elapsed) {
    const within = times.filter(function(t) { return t <= elapsed; }),
        expected = 1 - Math.exp(-elapsed * lambda);
    assertInDelta(within.length / times.length, expected, expected * 0.02);
  });
});
