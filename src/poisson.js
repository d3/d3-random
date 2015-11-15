export default function(mean) {
  return function() {
    return -Math.log(1 - Math.random()) * mean;
  };
};
