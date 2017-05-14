import defaultSource from "./defaultSource";

export default (function sourceRandomBernoulli(source) {
  function randomBernoulli(p) {
    return function() {
			if ((p = +p) < 0 || p > 1) throw new RangeError("invalid p");

      return Math.floor(source() + p);
    };
  }

  randomBernoulli.source = sourceRandomBernoulli;

  return randomBernoulli;
})(defaultSource);
