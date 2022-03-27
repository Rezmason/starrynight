import { milliseconds, frames } from "./lapse.js";
import Layer from "./layer.js";

const randomInt = (mag, offset) => Math.floor(Math.random() * mag + offset);

const animateBuilding = async (state, index, depth) => {
	const {scene, width, height} = state;

	/*

	There's definitely a better way to make buildings that look better

	There's hidden relationships:
		windowWidth, numWindowsPerFloor and windowGap
		windowWidth and windowHeight
		numFloors, floorGap and floorMargin

	 */
	const windowWidth = randomInt(4, 1);
	const windowHeight = randomInt(4, 1);
	const windowGap = randomInt(2, 1);
	const numWindowsPerFloor = randomInt(8, 3);
	const floorMargin = randomInt(4, 0);
	const floorGap = randomInt(3, 1);
	const numFloors = randomInt(10, 3 * numWindowsPerFloor);
	const roofHeight = randomInt(20, windowGap);

	const buildingWidth = 
		floorMargin * 2
		+ numWindowsPerFloor * windowWidth
		+ (numWindowsPerFloor - 1) * windowGap;
	const buildingHeight =
		numFloors * windowHeight
		+ (numFloors - 1) * floorGap
		+ roofHeight;
	const numWindows = numFloors * numWindowsPerFloor;
	const windows = [];
	const windowsByFloor = [];
	for (let i = 0; i < numFloors; i++) {
		windowsByFloor[i] = [];
		for (let j = 0; j < numWindowsPerFloor; j++) {
			const x = floorMargin + j * (windowWidth + windowGap);
			const y = i * windowHeight + (i - 1) * floorGap + roofHeight;
			const w = {x, y};
			windows.push(w);
			windowsByFloor[i].push(w);
		}
	}
	
	const building = new Layer("building_" + index);
	building.setGlow(depth < 0.7 ? 0.5 : 1);
	building.setSize(buildingWidth, buildingHeight);
	const x = Math.floor(Math.random() * width - buildingWidth / 2);
	building.setPosition(x, height - buildingHeight + randomInt(10, 5));
	building.context.fillStyle = `hsl(200, 20%, ${depth ** 2 * 1}%)`;
	building.context.fillRect(0, 0, buildingWidth, buildingHeight);
	scene.appendChild(building.element);

	const hue = Math.random() < 0.5 ? (20 + Math.random() + 40) : (180 + Math.random() * 60);
	const sat = Math.random() * 10 + 5;

	const windowOnColor = `hsl(${hue}, ${sat}%, ${depth ** 2 * 80 + 40}%)`;
	const windowOffColor = `hsl(${hue}, ${sat}%, ${depth ** 2 * 2 + 1}%)`;

	const windowOnGlowColor = `hsl(${hue}, ${sat + 20}%, ${depth ** 2 * 10 + 50}%)`;
	const windowOffGlowColor = "black";

	const drawWindow = ({x, y}, lit) => {
		building.context.fillStyle = lit ? windowOnColor : windowOffColor;
		building.context.fillRect(x, y, windowWidth, windowHeight);

		building.glowContext.fillStyle = lit ? windowOnGlowColor : windowOffGlowColor;
		building.glowContext.fillRect(x, y, windowWidth, windowHeight);
	};

	for (const floor of windowsByFloor) {
		const lit = Math.random() < 0.5;
		const start = randomInt(numWindowsPerFloor / 2, 0);
		const end = randomInt(numWindowsPerFloor - (start + 2), (start + 2));
		for (let i = 0; i < numWindowsPerFloor; i++) {
			drawWindow(floor[i], lit && i >= start && i < end);
		}
	}

	const liveliness = Math.random() * 0.5;
	
	while (state.running) {
		const delay = Math.min(Math.floor((1 - Math.pow(Math.random(), 0.2)) * 2000), 1000);
		await milliseconds(delay);
		if (Math.random() < liveliness) {
			const index = Math.floor(Math.random() * numWindows);
			drawWindow(windows[index], Math.random() < 0.5);
		}
	}
};

export default async (state) => {
	const buildings = [];
	const numBuildings = 50;
	for (let i = 0; i < numBuildings; i++) {
		animateBuilding(state, i, (i + 1) / (numBuildings + 1));
	}
};
