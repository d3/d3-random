// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
const mul = 0x19660D;
const inc = 0x3C6EF35F;
const eps = 1/0x100000000;

export default function lcg(seed = Math.random()) {
  if (!(0 <= seed && seed < 1)) throw new RangeError("invalid seed");
  let state = seed / eps | 0;
  return () => (state = mul * state + inc | 0, eps * (state >>> 0));
}
