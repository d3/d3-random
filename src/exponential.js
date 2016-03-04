export default function(lambda) {
  if (arguments.length != 1) {
    throw new SyntaxError("exponential(lambda) must be called with only the lambda parameter.");
  }
  return function() {
    return -Math.log(1 - Math.random()) / lambda;
  };
}
