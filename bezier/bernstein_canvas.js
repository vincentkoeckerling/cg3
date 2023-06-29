import Two from "two.js";

const canvasElement = document.getElementById('bernstein_canvas')
const two = new Two({ fitted: true }).appendTo(canvasElement)

const b0Path = two.makePath()
b0Path.noFill().closed = false
b0Path.stroke = '#408ED0'

const b1Path = two.makePath()
b1Path.noFill().closed = false
b1Path.stroke = '#CA40D0'

const b2Path = two.makePath()
b2Path.noFill().closed = false
b2Path.stroke = '#D08240'

const b3Path = two.makePath()
b3Path.noFill().closed = false
b3Path.stroke = '#46D040'

two.makeArrow(0, two.height, 0, 0)
two.makeArrow(0, two.height, two.width, two.height)

for (let t = 0; t < 1.001; t += 0.01) {
	const b0Value = b0(t)
	b0Path.vertices.push(convertPoint(t, b0Value))

	const b1Value = b1(t)
	b1Path.vertices.push(convertPoint(t, b1Value))

	const b2Value = b2(t)
	b2Path.vertices.push(convertPoint(t, b2Value))

	const b3Value = b3(t)
	b3Path.vertices.push(convertPoint(t, b3Value))
}

two.update()

function convertPoint(x, y) {
	return new Two.Vector(
		x * two.width,
		two.height - y * two.height
	) 
}

function b0(t) {
	return Math.pow(1 - t, 3)
}

function b1(t) {
	return 3 * t * Math.pow(1 - t, 2)
}

function b2(t) {
	return 3 * Math.pow(t, 2) * (1 - t)
}

function b3(t) {
	return Math.pow(t, 3)
}
