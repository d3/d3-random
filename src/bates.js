import irwinHall from "./irwinHall";

export default function(n, random) {
  var randomIrwinHall = irwinHall(n, random);
  return function() {
    return randomIrwinHall() / n;
  };
}
