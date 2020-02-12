import defaultSource from "./defaultSource.js";
import irwinHall from "./irwinHall.js";

export default (function sourceRandomBates(source) {
  function randomBates(n) {
    // use limiting distribution at n === 0
    if ((n = +n) === 0) return source;
    var randomIrwinHall = irwinHall.source(source)(n);
    return function() {
      return randomIrwinHall() / n;
    };
  }

  randomBates.source = sourceRandomBates;

  return randomBates;
})(defaultSource);
