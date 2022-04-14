const font = {
	// The glyphs seen in the film trilogy
	glyphTexURL: "assets/matrixcode_msdf.png",
	glyphSequenceLength: 57,
	glyphTextureGridSize: [8, 8],
};

const defaults = {
	backgroundColor: [0, 0, 0], // The color "behind" the glyphs
	volumetric: false, // A mode where the raindrops appear in perspective
	resurrectingCodeRatio: 0, // The percent of columns that flow upward
	animationSpeed: 1, // The global rate that all animations progress
	forwardSpeed: 0.25, // The speed volumetric rain approaches the eye
	bloomStrength: 1, // The intensity of the bloom
	bloomSize: 0.6, // The amount the bloom calculation is scaled
	highPassThreshold: 0.1, // The minimum brightness that is still blurred
	cycleSpeed: 1, // The speed glyphs change
	cycleFrameSkip: 1, // The global minimum number of frames between glyphs cycling
	cycleStyleName: "cycleFasterWhenDimmed", // The way glyphs cycle, either proportional to their brightness or randomly
	cursorEffectThreshold: 1, // The minimum brightness for a glyph to still be lit up as a cursor at the bottom of a raindrop
	brightnessOverride: 0.0, // A global override to the brightness of displayed glyphs. Only used if it is > 0.
	brightnessThreshold: 0, // The minimum brightness for a glyph to still be considered visible
	brightnessDecay: 1.0, // The rate at which glyphs light up and dim
	ditherMagnitude: 0.05, // The magnitude of the random per-pixel dimming
	fallSpeed: 0.75, // The speed the raindrops progress downwards
	glyphEdgeCrop: 0.0, // The border around a glyph in a font texture that should be cropped out
	glyphHeightToWidth: 1, // The aspect ratio of glyphs
	glyphVerticalSpacing: 1, // The ratio of the vertical distance between glyphs to their height
	hasSun: false, // Makes the glyphs more radiant. Admittedly not very technical.
	hasThunder: false, // An effect that adds dramatic lightning flashes
	isPolar: false, // Whether the glyphs arc across the screen or sit in a standard grid
	rippleTypeName: null, // The variety of the ripple effect
	rippleThickness: 0.2, // The thickness of the ripple effect
	rippleScale: 30, // The size of the ripple effect
	rippleSpeed: 0.2, // The rate at which the ripple effect progresses
	numColumns: 80, // The maximum dimension of the glyph grid
	density: 1, // In volumetric mode, the number of actual columns compared to the grid
	paletteEntries: [
		// The color palette that glyph brightness is color mapped to
		{ hsl: [0.3, 0.9, 0.0], at: 0.0 },
		{ hsl: [0.3, 0.9, 0.2], at: 0.2 },
		{ hsl: [0.3, 0.9, 0.7], at: 0.7 },
		{ hsl: [0.3, 0.9, 0.8], at: 0.8 },
	],
	raindropLength: 1, // Adjusts the frequency of raindrops (and their length) in a column
	slant: 0, // The angle at which rain falls; the orientation of the glyph grid
	resolution: 1, // An overall scale multiplier
	useHalfFloat: false,
	renderer: "webgpu", // The preferred web graphics API
	useHoloplay: false,
	loops: false,
};

export default () => ({
	...defaults,
	...font,
});