import defaultSource from "./defaultSource.js";

export default (function sourcerandomWeibull(source) {
  function randomWeibull(lambda, k) {
    if ((k = +k) < 0) throw new RangeError("invalid k");
    k = 1 / k;
    return function() {
      return lambda * Math.pow(-Math.log(1 - source()), k);
    };
  }

  randomWeibull.source = sourcerandomWeibull;

  return randomWeibull;
})(defaultSource);
