import { frames } from "./lapse.js";
import Layer from "./layer.js";
import { colorTemperature2rgb } from "./color-temperature.js";

const randomStarFillStyle = () => {
	const {r, g, b} = colorTemperature2rgb((1 - Math.random() ** 0.5) * 3E4);
	return `rgb(
		${Math.max(0.4, r) * 0xFF},
		${Math.max(0.4, g) * 0xFF},
		${Math.max(0.4, b) * 0xFF}
	)`;
};

export default async (state) => {
	const {scene, width, height} = state;
	const sky = new Layer("sky");
	sky.setSize(width, height);
	scene.appendChild(sky.element);

	const maxStars = Math.floor(width * height / 100);
	let numStars = 0;
	const stars = [];
	const starRate = 0.215;

	while (state.running) {

		if (Math.random() < starRate) {
			sky.context.fillStyle = randomStarFillStyle(); // "white";
			const x = Math.floor(Math.random() * width);
			const randomY = 1 - Math.random() ** 0.5;
			const y = Math.floor(randomY * height);
			stars[numStars] = width * y + x;
			numStars++;
			sky.context.fillRect(x, y, 1, 1);
		}

		if (Math.random() < starRate * numStars / maxStars) {
			const i = Math.floor(Math.random() * numStars);
			const index = stars[i];
			const x = index % width;
			const y = (index - x) / width;
			sky.context.clearRect(x, y, 1, 1);
			stars[i] = stars[numStars - 1];
			numStars--;
		}

		sky.glowContext.clearRect(0, 0, width, height);
		sky.glowContext.drawImage(sky.canvas, 0, 0);

		await frames(1);
	}
};
