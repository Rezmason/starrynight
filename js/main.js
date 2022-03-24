import { milliseconds, frames } from "./utils.js";
import Layer from "./layer.js";
import animateSky from "./sky.js";
import animateMeteor from "./meteor.js";

const [width, height] = [800, 600];
const scene = document.querySelector("scene");
scene.style.setProperty("--width", width);
scene.style.setProperty("--height", height);

animateSky(scene, width, height);
animateMeteor(scene, width, height);

const animateBuilding = async (index, depth) => {
	const windowWidth = Math.floor(Math.random() * 4) + 1;
	const windowHeight = Math.floor(Math.random() * 5) + 2;
	const windowGap = Math.floor(Math.random() * 2) + 1;
	const numFloorWindows = Math.floor(Math.random() * 20) + 4;
	const floorMargin = Math.floor(Math.random() * 5) + windowGap;
	const floorGap = Math.floor(Math.random() * 5) + 2;
	const numFloors = Math.floor(Math.random() * 30) + 3;
	const roofHeight = Math.floor(Math.random() * 30) + 3;
	const buildingWidth = 
		floorMargin * 2
		+ numFloorWindows * windowWidth
		+ (numFloorWindows - 1) * windowGap;
	const buildingHeight =
		numFloors * windowHeight
		+ (numFloors - 1) * floorGap
		+ roofHeight;
	const numWindows = numFloors * numFloorWindows;
	const windows = [];
	for (let i = 0; i < numFloors; i++) {
		for (let j = 0; j < numFloorWindows; j++) {
			const x = floorMargin + j * windowWidth + (j - 1) * windowGap;
			const y = i * windowHeight + (i - 1) * floorGap;
			windows.push({x, y});
		}
	}
	
	const building = new Layer("building_" + index);
	building.setGlow(0.5);
	building.setSize(buildingWidth, buildingHeight);
	const x = Math.floor(Math.random() * width - buildingWidth / 2);
	building.setPosition(x, height - buildingHeight);
	building.context.fillStyle = "black";
	building.context.fillRect(0, 0, buildingWidth, buildingHeight);
	scene.appendChild(building.element);
	const windowColor = `hsl(60, 100%, ${depth ** 2 * 50}%)`;
	const windowOffColor = `hsl(60, 100%, ${depth ** 2 * 1}%)`;

	const drawWindow = (index) => {
		building.context.fillStyle = Math.random() < 0.5 ? windowOffColor : windowColor;
		building.context.fillRect(windows[index].x, windows[index].y, windowWidth, windowHeight);

		building.glowContext.fillStyle = building.context.fillStyle;
		building.glowContext.fillRect(windows[index].x, windows[index].y, windowWidth, windowHeight);
	};

	for (let i = 0; i < numWindows; i++) {
		drawWindow(i);
	}
	
	while (true) {
		const delay = Math.min(Math.floor((1 - Math.pow(Math.random(), 0.2)) * 2000), 1000);
		await milliseconds(delay);
		const index = Math.floor(Math.random() * numWindows);
		drawWindow(index);
	}
};

const animateBuildings = async () => {
	const buildings = [];
	const numBuildings = 10;
	for (let i = 0; i < numBuildings; i++) {
		animateBuilding(i, (i + 1) / (numBuildings + 1));
	}
};

animateBuildings();