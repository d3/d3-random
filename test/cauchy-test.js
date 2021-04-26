import * as random from "../src/index.js";
import * as d3 from "d3-array";
import {assertInDelta} from "./asserts.js";

// Since the Cauchy distribution is "pathological" in that no integral moments exist,
// we simply test for the median, equivalent to the location parameter.

it("randomCauchy(a, b) returns random numbers with a median of a", () => {
  const randomCauchy = random.randomCauchy.source(random.randomLcg(0.42));
  assertInDelta(d3.median(d3.range(10000).map(randomCauchy())), 0, 0.05);
  assertInDelta(d3.median(d3.range(10000).map(randomCauchy(5))), 5, 0.05);
  assertInDelta(d3.median(d3.range(10000).map(randomCauchy(0, 4))), 0, 0.1);
  assertInDelta(d3.median(d3.range(10000).map(randomCauchy(1, 3))), 1, 0.1);
  assertInDelta(d3.median(d3.range(10000).map(randomCauchy(3, 1))), 3, 0.05);
});
