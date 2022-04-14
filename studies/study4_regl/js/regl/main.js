import { makeFullScreenQuad, makePipeline } from "./utils.js";

import makeStars from "./starPass.js";
import makeBloomPass from "./bloomPass.js";
import makeEndPass from "./endPass.js";

const dimensions = { width: 1, height: 1 };

const loadJS = (src) =>
	new Promise((resolve, reject) => {
		const tag = document.createElement("script");
		tag.onload = resolve;
		tag.onerror = reject;
		tag.src = src;
		document.body.appendChild(tag);
	});

export default async (canvas, config) => {
	await Promise.all([loadJS("lib/regl.js"), loadJS("lib/gl-matrix.js")]);

	const resize = () => {
		canvas.width = Math.ceil(canvas.clientWidth * config.resolution);
		canvas.height = Math.ceil(canvas.clientHeight * config.resolution);
	};
	window.onresize = resize;
	if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
		window.onclick = () => {
			if (document.fullscreenElement == null) {
				if (canvas.webkitRequestFullscreen != null) {
					canvas.webkitRequestFullscreen();
				} else {
					canvas.requestFullscreen();
				}
			} else {
				document.exitFullscreen();
			}
		};
	}
	resize();

	const regl = createREGL({
		canvas,
		extensions: ["OES_texture_half_float", "OES_texture_half_float_linear"],
		// These extensions are also needed, but Safari misreports that they are missing
		optionalExtensions: ["EXT_color_buffer_half_float", "WEBGL_color_buffer_float"],
	});

	// All this takes place in a full screen quad.
	const fullScreenQuad = makeFullScreenQuad(regl);
	const pipeline = makePipeline({ regl, config }, [makeStars, makeBloomPass, makeEndPass]);
	const screenUniforms = { tex: pipeline[pipeline.length - 1].outputs.primary };
	const drawToScreen = regl({ uniforms: screenUniforms });
	await Promise.all(pipeline.map((step) => step.ready));
	const tick = regl.frame(({ viewportWidth, viewportHeight }) => {

		// TODO: update stars
		// TODO: update buildings
		// TODO: update meteor

		// tick.cancel();
		if (dimensions.width !== viewportWidth || dimensions.height !== viewportHeight) {
			dimensions.width = viewportWidth;
			dimensions.height = viewportHeight;
			for (const step of pipeline) {
				step.setSize(viewportWidth, viewportHeight);
			}
		}
		fullScreenQuad(() => {
			for (const step of pipeline) {
				step.execute();
			}
			drawToScreen();
		});
	});
};
