import { frames } from "./utils.js";
import Layer from "./layer.js";
import animateSky from "./sky.js";

const [width, height] = [512, 342];
const scene = document.querySelector("scene");
scene.style.setProperty("--width", width);
scene.style.setProperty("--height", height);

animateSky(scene, width, height);