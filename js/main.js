import { milliseconds, frames } from "./utils.js";
import Layer from "./layer.js";
import animateSky from "./sky.js";
import animateMeteor from "./meteor.js";
import animateBuildings from "./buildings.js";

const [width, height] = [800, 600];
const scene = document.querySelector("scene");
scene.style.setProperty("--width", width);
scene.style.setProperty("--height", height);

animateSky(scene, width, height);
animateMeteor(scene, width, height);
animateBuildings(scene, width, height);