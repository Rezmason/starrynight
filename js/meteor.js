import { milliseconds, frames } from "./lapse.js";
import Layer from "./layer.js";

export default async (state) => {
	const {scene, width, height} = state;
	const meteor = new Layer("meteor");
	scene.appendChild(meteor.element);
	
	const [numColumns, numRows] = [4, 3];
	const numFrames = numColumns * numRows;
	const spritesheet = new Image();
	spritesheet.src = "./assets/meteor_4x3.png";
	await spritesheet.decode();
	const meteorWidth = spritesheet.width / numColumns;
	const meteorHeight = spritesheet.height / numRows;
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");
	const meteorFrames = [];
	for (let row = 0; row < numRows; row++) {
		for (let column = 0; column < numColumns; column++) {
			context.globalCompositeOperation = "source-over";
			context.fillStyle = "hsl(20, 100%, 60%)";
			context.fillRect(0, 0, meteorWidth, meteorHeight);
			context.globalCompositeOperation = "destination-atop";
			context.drawImage(spritesheet, 
				meteorWidth * column, meteorHeight * row,
				meteorWidth, meteorHeight,
				0, 0,
				meteorWidth, meteorHeight
			);
			meteorFrames.push(context.getImageData(0, 0, meteorWidth, meteorHeight));
		}
	}

	meteor.setSize(meteorWidth, meteorHeight);
	meteor.setGlow(0.5);
	meteor.setVisible(false);

	while (state.running) {
		const delay = 500 + Math.min(Math.floor((1 - Math.pow(Math.random(), 0.2)) * 5000), 3000);
		await milliseconds(delay);
		let x = Math.floor(Math.random() * width);
		let y = Math.floor(Math.random() * height * 0.5);
		const flip = Math.random() < 0.5 ? -1 : 1;
		meteor.setVisible(true);
		for (let i = 0; i < 14; i++) {
			const index = Math.floor(Math.random() * numFrames);
			meteor.context.putImageData(meteorFrames[index], 0, 0);
			meteor.glowContext.putImageData(meteorFrames[index], 0, 0);
			meteor.setPosition(x, y, flip);
			await frames(1);

			x += 21 * flip;
			y += 15;
		}
		meteor.setVisible(false);
	}
};
