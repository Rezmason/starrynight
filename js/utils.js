const frames = (count) => new Promise(resolve => {
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

const milliseconds = (count) => new Promise(resolve => setTimeout(resolve, count));

export {
	milliseconds,
	frames
};