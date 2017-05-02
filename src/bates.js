import irwinHall from "./irwinHall";

export default function(random) {
  return function(n) {
    var randomIrwinHall = irwinHall(random)(n);
    return function() {
      return randomIrwinHall() / n;
    };
  };
}
