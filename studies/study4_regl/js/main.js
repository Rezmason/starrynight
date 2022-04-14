import makeConfig from "./config.js";
import run from "./regl/main.js";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
document.addEventListener("touchmove", (e) => e.preventDefault(), {
	passive: false,
});

document.body.onload = async () => {
	const urlParams = Object.fromEntries(new URLSearchParams(window.location.search).entries());
	const config = makeConfig(urlParams);
	run(canvas, config);
};
