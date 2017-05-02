import createRandomUniform from "./src/uniform";
import createRandomNormal from "./src/normal";
import createRandomLogNormal from "./src/logNormal";
import createRandomBates from "./src/bates";
import createRandomIrwinHall from "./src/irwinHall";
import createRandomExponential from "./src/exponential";

export {default as randomSource} from "./src/source";
export var randomUniform = createRandomUniform(Math.random);
export var randomNormal = createRandomNormal(Math.random);
export var randomLogNormal = createRandomLogNormal(Math.random);
export var randomBates = createRandomBates(Math.random);
export var randomIrwinHall = createRandomIrwinHall(Math.random);
export var randomExponential = createRandomExponential(Math.random);
