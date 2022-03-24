const scene = document.querySelector("scene");

class Layer {
	constructor(id) {
		this.id = id;
		this.element = document.createElement("layer");
		this.element.id = id;

		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
		this.element.appendChild(this.canvas);

		this.glowCanvas = document.createElement("canvas");
		this.glowCanvas.classList.add("glow");
		this.glowContext = this.glowCanvas.getContext("2d");
		this.element.appendChild(this.glowCanvas);

		this.setVisible(true);
	}

	setSize(width, height) {
		this.canvas.width = width;
		this.canvas.height = height;
		this.glowCanvas.width = width;
		this.glowCanvas.height = height;
		this.element.style.setProperty("--width", width);
		this.element.style.setProperty("--height", height);
	}

	setVisible(visible) {
		this.visible = visible;
		this.element.style.setProperty("visibility", visible ? "visible" : "hidden");
	}
}

const [width, height] = [512, 342];
scene.style.setProperty("--width", width);
scene.style.setProperty("--height", height);

const sky = new Layer("sky");
sky.setSize(width, height);
scene.appendChild(sky.element);

for (let i = 0; i < 1000; i++) {
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
sky.glowContext.drawImage(sky.canvas, 0, 0);