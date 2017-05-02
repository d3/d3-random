import createRandomUniform from "./uniform";
import createRandomNormal from "./normal";
import createRandomLogNormal from "./logNormal";
import createRandomBates from "./bates";
import createRandomIrwinHall from "./irwinHall";
import createRandomExponential from "./exponential";

export default function (random) {
  return {
    randomUniform: createRandomUniform(random),
    randomNormal: createRandomNormal(random),
    randomLogNormal: createRandomLogNormal(random),
    randomBates: createRandomBates(random),
    randomIrwinHall: createRandomIrwinHall(random),
    randomExponential: createRandomExponential(random)
  }
}
