import normal from "./normal";

export default function(mu, sigma) {
  var randomNormal = normal(mu, sigma);
  return function() {
    return Math.exp(randomNormal());
  };
};
