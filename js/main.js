import { milliseconds, frames } from "./lapse.js";
import Layer from "./layer.js";
import animateSky from "./sky.js";
import animateMeteor from "./meteor.js";
import animateBuildings from "./buildings.js";

const [width, height] = [800, 600];
const scene = document.querySelector("scene");
scene.style.setProperty("--width", width);
scene.style.setProperty("--height", height);

const state = {scene, width, height, running: true};
animateSky(state);
animateMeteor(state);
animateBuildings(state);
