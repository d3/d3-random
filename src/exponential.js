export default function(random) {
  return function(lambda) {
    return function() {
      return -Math.log(1 - random()) / lambda;
    };
  };
}
