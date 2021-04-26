import assert from "assert";

export function assertInDelta(actual, expected, delta) {
  assert(expected - delta <= actual && actual <= expected + delta, {
    message: "should be in delta",
    operator: "inDelta",
    actual: actual,
    expected: [expected - delta, expected + delta]
  });
}
