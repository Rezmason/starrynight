const frames = (count) => new Promise((resolve, reject) => {
	const f = () => {
		if (count === 0) {
			resolve();
		} else {
			count--;
			requestAnimationFrame(f);
		}
	}
	f();
});

export {
	frames
};