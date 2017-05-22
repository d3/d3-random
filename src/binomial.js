import defaultSource from "./defaultSource";

export default (function sourceRandomBinomial(source) {
  function randomBinomial(n, p) {
    return function() {
			var i = -1, x = 0;
			n = +n, p = +p;

			while (++i < n) x += source() < p;
			return x;
    };
  }

  randomBinomial.source = sourceRandomBinomial;

  return randomBinomial;
})(defaultSource);
