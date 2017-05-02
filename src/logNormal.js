import normal from "./normal";

export default function(random) {
  return function() {
    var randomNormal = normal(random).apply(this, arguments);
    return function() {
      return Math.exp(randomNormal());
    };
  };
}
