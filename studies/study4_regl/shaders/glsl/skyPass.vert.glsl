precision mediump float;
attribute vec2 aPosition, aCorner;
attribute vec3 aColor;
uniform vec2 screenSize;
uniform mat4 turn;

varying vec3 vColor;

void main() {
	vColor = aColor;
	vec2 position = (aPosition - 0.5) * 2.0 + aCorner / screenSize;
	gl_Position = turn * vec4(position, 0, 1);
}