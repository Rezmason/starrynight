import { frames } from "./lapse.js";
import Layer from "./layer.js";

export default async (state) => {
	const {scene, width, height} = state;
	const sky = new Layer("sky");
	sky.setSize(width, height);
	scene.appendChild(sky.element);
	while (state.running) {
		if (Math.random() < 0.215) {
			const [r, g, b] = [
				Math.floor(Math.random() * 0xFF), 
				Math.floor(Math.random() * 0xFF), 
				Math.floor(Math.random() * 0xFF), 
			];
			sky.context.fillStyle = `rgb(${r},${g},${b})`;
			const x = Math.floor(Math.random() * width);
			const randomY = 1 - Math.random() ** 0.5;
			const y = Math.floor(randomY * height);
			sky.context.fillRect(x, y, 1, 1);
		}

		for (let i = 0; i < 20; i++) {
			const x = Math.floor(Math.random() * width);
			const y = Math.floor(Math.random() * height);
			sky.context.clearRect(x, y, 1, 1);
		}

		sky.glowContext.clearRect(0, 0, width, height);
		sky.glowContext.drawImage(sky.canvas, 0, 0);

		await frames(4);
	}
};
