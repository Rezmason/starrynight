export default class Layer {
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
};
