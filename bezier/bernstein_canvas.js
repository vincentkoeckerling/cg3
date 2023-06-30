import Two from "two.js";
import { ControlCenter } from "./control_center.js";

const controlCenter = new ControlCenter()

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

const b0Point = makePoint('#408ed0', '#50b2ff')
const b1Point = makePoint('#D0408E', '#f04aa2')
const b2Point = makePoint('#D08240', '#f2974a')
const b3Point = makePoint('#8ED040', '#a2ef4a')

const textOptions = {
	size: '20px',
	family: "'Times New Roman', Times, serif",
}

const b0Label = two.makeText('B₀', 0, 0, textOptions)
b0Label.position = convertPoint(0.125, 0.8)
b0Label.fill = '#408ED0'

const b1Label = two.makeText('B₁', 0, 0, textOptions)
b1Label.position = convertPoint(0.35, 0.475)
b1Label.fill = '#CA40D0'

const b2Label = two.makeText('B₂', 0, 0, textOptions)
b2Label.position = convertPoint(0.65, 0.475)
b2Label.fill = '#D08240'

const b3Label = two.makeText('B₃', 0, 0, textOptions)
b3Label.position = convertPoint(0.875, 0.8)
b3Label.fill = '#46D040'

two.makeArrow(0, two.height, 0, 0)
two.makeArrow(0, two.height, two.width, two.height)

two.makeText('1.0', two.width - 8, two.height + 16)
two.makeText('1.0', 0, -8)

two.makeText('0', -6, two.height + 6)

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

function update() {
	if (!controlCenter.shouldUpdate()) return;

	const t = controlCenter.t

	b0Point.position = convertPoint(t, b0(t))
	b1Point.position = convertPoint(t, b1(t))
	b2Point.position = convertPoint(t, b2(t))
	b3Point.position = convertPoint(t, b3(t))
}

two.bind('update', update)
two.play()

function makePoint(colorInner, colorOuter) {
	const circle = two.makeCircle(0, 0, 4)
	circle.fill = colorInner
	circle.stroke = colorOuter
	circle.linewidth = 4

	return circle
}

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
