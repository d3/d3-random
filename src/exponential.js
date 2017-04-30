export default function(lambda, random) {
  random = random == null ? Math.random : random;
  return function() {
    return -Math.log(1 - random()) / lambda;
  };
}
