import defaultSource from "./defaultSource.js";
import gamma from "./gamma.js";

export default (function sourceRandomBeta(source) {
  function randomBeta(alpha, beta) {
    var X = gamma.source(source)(alpha),
        Y = gamma.source(source)(beta);
    return function() {
      var x = X();
      return x / (x + Y());
    };
  }

  randomBeta.source = sourceRandomBeta;

  return randomBeta;
})(defaultSource);
