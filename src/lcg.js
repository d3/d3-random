// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
const mul = 0x19660D;
const inc = 0x3C6EF35F;
const lo32 = 0xFFFFFFFF;
const eps = Math.pow(2, -32);

export default function lcg(seed = Math.random()) {
  if (!(0 <= seed && seed < 1)) throw new RangeError("invalid seed");
  let state = Math.floor((1+lo32) * seed);
  return function random () {
    return eps * ((state = (mul * state + inc) & lo32) >>> 0);
  };
}
