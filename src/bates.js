import irwinHall from "./irwinHall";

export default function(n) {
  if (arguments.length != 1) {
    throw new SyntaxError("bates(n) must be called with only the n parameter.");
  }
  var randomIrwinHall = irwinHall(n);
  return function() {
    return randomIrwinHall() / n;
  };
}
