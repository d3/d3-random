import defaultSource from "./defaultSource.js";
import exponential from "./exponential.js";
import normal from "./normal.js";

export default (function sourceRandomGamma(source) {
  function randomGamma(k, theta) {
    if ((k = +k) <= 0) throw new RangeError("invalid k");
    theta = theta == null ? 1 : +theta;
    if (k === 1) return exponential.source(source)(1 / theta);

    var randomNormal = normal.source(source)(),
        d = (k < 1 ? k + 1 : k) - 1 / 3,
        c = 1 / (3 * Math.sqrt(d)),
        multiplier = k < 1 ? () => Math.pow(source(), 1 / k) : () => 1;
    return function() {
      do {
        do {
          var x = randomNormal(),
              v = 1 + c * x;
        } while (v <= 0);
        v *= v * v;
        var u = 1 - source();
      } while (u >= 1 - 0.0331 * x * x * x * x && Math.log(u) >= 0.5 * x * x + d * (1 - v + Math.log(v)));
      return d * v * multiplier() * theta;
    };
  }

  randomGamma.source = sourceRandomGamma;

  return randomGamma;
})(defaultSource);
