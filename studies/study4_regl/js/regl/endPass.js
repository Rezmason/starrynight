import { loadText, makePassFBO, makePass } from "./utils.js";

// Maps the brightness of the rendered rain and bloom to colors
// in a 1D gradient palette texture generated from the passed-in color sequence

// This shader introduces noise into the renders, to avoid banding

// The rendered texture's values are mapped to colors in a palette texture.
// A little noise is introduced, to hide the banding that appears
// in subtle gradients. The noise is also time-driven, so its grain
// won't persist across subsequent frames. This is a safe trick
// in screen space.

export default ({ regl, config }, inputs) => {
	const output = makePassFBO(regl, config.useHalfFloat);
	const { backgroundColor, ditherMagnitude, bloomStrength } = config;

	const endPassFrag = loadText("shaders/glsl/endPass.frag.glsl");

	const render = regl({
		frag: regl.prop("frag"),

		uniforms: {
			backgroundColor,
			ditherMagnitude,
			bloomStrength,
			tex: inputs.primary,
			bloomTex: inputs.bloom,
		},
		framebuffer: output,
	});

	return makePass(
		{
			primary: output,
		},
		endPassFrag.loaded,
		(w, h) => output.resize(w, h),
		() => render({ frag: endPassFrag.text() })
	);
};
