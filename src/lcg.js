const a = 1664525;
const c = 1013904223;
const m = 4294967296; // 2^32

export default function lcg(s = 1) {
  if (!(s >= 0)) throw new Error(“invalid seed”);
  return () => (s = (a * s + c) % m) / m;
}
