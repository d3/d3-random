export default function(min, max) {
  var n = arguments.length;
  if (!n) min = 0, max = 1;
  else if (n === 1) max = +min, min = 0;
  else min = +min, max = +max - min;
  return function() {
    return Math.random() * max + min;
  };
};
