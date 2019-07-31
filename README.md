# d3-random

Generate random numbers from various distributions.

See the [d3-random collection on Observable](https://observablehq.com/collection/@d3/d3-random) for examples.

## Installing

If you use NPM, `npm install d3-random`. Otherwise, download the [latest release](https://github.com/d3/d3-random/releases/latest). You can also load directly as a [standalone library](https://d3js.org/d3-random.v2.min.js) or as part of [D3](https://github.com/d3/d3). ES modules, AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3` global is exported:

```html
<script src="https://d3js.org/d3-random.v2.min.js"></script>
<script>

var random = d3.randomUniform(1, 10);

</script>
```

## API Reference

<a name="randomUniform" href="#randomUniform">#</a> d3.<b>randomUniform</b>([<i>min</i>, ][<i>max</i>]) · [Source](https://github.com/d3/d3-random/blob/master/src/uniform.js), [Examples](https://observablehq.com/@d3/d3-random#uniform)

Returns a function for generating random numbers with a [uniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_\(continuous\)). The minimum allowed value of a returned number is *min* (inclusive), and the maximum is *max* (exclusive). If *min* is not specified, it defaults to 0; if *max* is not specified, it defaults to 1. For example:

```js
d3.randomUniform(6)(); // Returns a number greater than or equal to 0 and less than 6.
d3.randomUniform(1, 5)(); // Returns a number greater than or equal to 1 and less than 5.
```

<a name="randomInt" href="#randomInt">#</a> d3.<b>randomInt</b>([<i>min</i>, ][<i>max</i>]) · [Source](https://github.com/d3/d3-random/blob/master/src/int.js), [Examples](https://observablehq.com/@d3/d3-random#int)

Returns a function for generating random integers with a [uniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_\(continuous\)). The minimum allowed value of a returned number is ⌊*min*⌋ (inclusive), and the maximum is ⌊*max* - 1⌋ (inclusive). If *min* is not specified, it defaults to 0. For example:

```js
d3.randomInt(6)(); // Returns an integer greater than or equal to 0 and less than 6.
d3.randomInt(1, 5)(); // Returns an integer greater than or equal to 1 and less than 5.
```

<a name="randomNormal" href="#randomNormal">#</a> d3.<b>randomNormal</b>([<i>mu</i>][, <i>sigma</i>]) · [Source](https://github.com/d3/d3-random/blob/master/src/normal.js), [Examples](https://observablehq.com/@d3/d3-random#normal)

Returns a function for generating random numbers with a [normal (Gaussian) distribution](https://en.wikipedia.org/wiki/Normal_distribution). The expected value of the generated numbers is *mu*, with the given standard deviation *sigma*. If *mu* is not specified, it defaults to 0; if *sigma* is not specified, it defaults to 1.

<a name="randomLogNormal" href="#randomLogNormal">#</a> d3.<b>randomLogNormal</b>([<i>mu</i>][, <i>sigma</i>]) · [Source](https://github.com/d3/d3-random/blob/master/src/logNormal.js), [Examples](https://observablehq.com/@d3/d3-random#logNormal)

Returns a function for generating random numbers with a [log-normal distribution](https://en.wikipedia.org/wiki/Log-normal_distribution). The expected value of the random variable’s natural logarithm is *mu*, with the given standard deviation *sigma*. If *mu* is not specified, it defaults to 0; if *sigma* is not specified, it defaults to 1.

<a name="randomBates" href="#randomBates">#</a> d3.<b>randomBates</b>(<i>n</i>) · [Source](https://github.com/d3/d3-random/blob/master/src/bates.js), [Examples](https://observablehq.com/@d3/d3-random#bates)

Returns a function for generating random numbers with a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution) with *n* independent variables.

<a name="randomIrwinHall" href="#randomIrwinHall">#</a> d3.<b>randomIrwinHall</b>(<i>n</i>) · [Source](https://github.com/d3/d3-random/blob/master/src/irwinHall.js), [Examples](https://observablehq.com/@d3/d3-random#irwinHall)

Returns a function for generating random numbers with an [Irwin–Hall distribution](https://en.wikipedia.org/wiki/Irwin–Hall_distribution) with *n* independent variables.

<a name="randomExponential" href="#randomExponential">#</a> d3.<b>randomExponential</b>(<i>lambda</i>) · [Source](https://github.com/d3/d3-random/blob/master/src/exponential.js), [Examples](https://observablehq.com/@d3/d3-random#exponential)

Returns a function for generating random numbers with an [exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution) with the rate *lambda*; equivalent to time between events in a [Poisson process](https://en.wikipedia.org/wiki/Poisson_point_process) with a mean of 1 / *lambda*. For example, exponential(1/40) generates random times between events where, on average, one event occurs every 40 units of time.

<a name="randomPareto" href="#randomPareto">#</a> d3.<b>randomPareto</b>(<i>alpha</i>) · [Source](https://github.com/d3/d3-random/blob/master/src/pareto.js), [Examples](https://observablehq.com/@d3/d3-random#pareto)

Returns a function for generating random numbers with an [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution) with the shape *alpha*. The value *alpha* must be a positive value.

<a name="randomBernoulli" href="#randomBernoulli">#</a> d3.<b>randomBernoulli</b>(<i>p</i>) · [Source](https://github.com/d3/d3-random/blob/master/src/bernoulli.js), [Examples](https://observablehq.com/@d3/d3-random#bernoulli)

Returns a function for generating either 1 or 0 according to a [Bernoulli distribution](https://en.wikipedia.org/wiki/Binomial_distribution) with 1 being returned with success probability *p* and 0 with failure probability *q* = 1 - *p*. The value *p* is in the range [0, 1].

<a name="randomGeometric" href="#randomGeometric">#</a> d3.<b>randomGeometric</b>(<i>p</i>) · [Source](https://github.com/d3/d3-random/blob/master/src/geometric.js), [Examples](https://observablehq.com/@d3/d3-random#geometric)

Returns a function for generating numbers with a [geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution) with success probability *p*. The value *p* is in the range (0, 1].

<a name="randomBinomial" href="#randomBinomial">#</a> d3.<b>randomBinomial</b>(<i>n</i>, <i>p</i>) · [Source](https://github.com/d3/d3-random/blob/master/src/binomial.js), [Examples](https://observablehq.com/@d3/d3-random#binomial)

Returns a function for generating random numbers with a [binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution) with *n* the number of trials and *p* the probability of success in each trial. The value *n* is greater or equal to 0, and the value *p* is in the range [0, 1].

<a name="random_source" href="#random_source">#</a> <i>random</i>.<b>source</b>(<i>source</i>) · [Examples](https://observablehq.com/@d3/random-source)

Returns the same type of function for generating random numbers but where the given random number generator *source* is used as the source of randomness instead of Math.random. The given random number generator must implement the same interface as Math.random and only return values in the range [0, 1). This is useful when a seeded random number generator is preferable to Math.random. For example:

```js
var d3 = require("d3-random"),
    seedrandom = require("seedrandom"),
    random = d3.randomNormal.source(seedrandom("a22ebc7c488a3a47"))(0, 1);

random(); // 0.9744193494813501
```
