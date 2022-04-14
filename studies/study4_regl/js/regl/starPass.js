import { loadText, makePassFBO, makePass } from "./utils.js";

export default ({ regl, config }, inputs) => {

	const { mat4, vec3 } = glMatrix;

	const screenSize = [1, 1];
	
	const skyPassVert = loadText("shaders/glsl/skyPass.vert.glsl");
	const skyPassFrag = loadText("shaders/glsl/skyPass.frag.glsl");

	const numStars = 10000;

	const output = makePassFBO(regl, config.useHalfFloat);

	const turn = mat4.create();
	mat4.identity(turn);

	const numVerticesPerStar = 2 * 3;
	const tlVert = [0, 0];
	const trVert = [0, 1];
	const blVert = [1, 0];
	const brVert = [1, 1];
	const starVertices = [tlVert, trVert, brVert, tlVert, brVert, blVert];

	const starPositions = Array(numStars).fill()
		.map(() => {
			const [x, y] = [Math.random(), Math.random()];
			return Array(numVerticesPerStar).fill([x, y]);
		});

	const starColors = Array(numStars).fill()
		.map(() => {
			const color = [Math.random(), Math.random(), Math.random()];
			return Array(numVerticesPerStar).fill(color);
		});

	const render = regl({
		cull: {
			enable: false
		},
		blend: {
			enable: true,
			func: {
				src: "one",
				dst: "one",
			},
		},

		vert: regl.prop("vert"),
		frag: regl.prop("frag"),

		uniforms: {
			turn: regl.prop("turn"),
			screenSize: regl.prop("screenSize"),
		},

		attributes: {
			aPosition: starPositions,
			aColor: starColors,
			aCorner: Array(numStars).fill(starVertices),
		},
		count: numStars * numVerticesPerStar,

		framebuffer: output,
	});

	return makePass(
		{
			primary: output,
		},
		Promise.all([skyPassVert.loaded, skyPassFrag.loaded]),
		(w, h) => {
			output.resize(w, h);
			[screenSize[0], screenSize[1]] = [w, h];
		},
		() => {

			mat4.rotateZ(turn, turn, Math.PI * 0.001);

			regl.clear({
				depth: 1,
				color: [0, 0, 0, 1],
				framebuffer: output,
			});

			render({ screenSize, vert: skyPassVert.text(), frag: skyPassFrag.text(), turn });
		}
	);
};