export default class Layer {
	constructor(id) {
		this.id = id;
		this.element = document.createElement("layer");
		this.element.id = id;
		this.style = this.element.style;

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
		this.style.setProperty("--width", width);
		this.style.setProperty("--height", height);
	}

	setVisible(visible) {
		this.visible = visible;
		this.style.setProperty("visibility", visible ? "visible" : "hidden");
	}

	setPosition(x, y, flip = 1) {
		this.style.setProperty("--x", x);
		this.style.setProperty("--y", y);
		this.style.setProperty("--flip", flip);
	}
};
