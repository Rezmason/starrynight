precision mediump float;
attribute vec2 aPosition, aCorner;
attribute vec3 aColor;
uniform vec2 screenSize;
uniform mat4 turn;

varying vec3 vColor;

void main() {
	vColor = aColor;
	vec4 position = vec4((aPosition - 0.5) * 2.0, 0, 1);
	position = turn * position;
	position.xy += aCorner / screenSize * 10.0;
	gl_Position = position;
}