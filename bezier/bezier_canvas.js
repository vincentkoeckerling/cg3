import Two from 'two.js'
import { ControlCenter } from './control_center.js'
import { b0, b1, b2, b3 } from './bernstein.js';

const controlCenter = new ControlCenter()

let interpolationPointsVisible
document.getElementById('show-points').addEventListener('change', (e) => {
	interpolationPointsVisible = e.currentTarget.checked
	controlCenter.requestUpdate()
})

let linesVisible
document.getElementById('show-lines').addEventListener('change', (e) => {
	linesVisible = e.currentTarget.checked
	controlCenter.requestUpdate()
})

const canvasElement = document.getElementById('bezier_canvas')
const two = new Two({ fitted: true }).appendTo(canvasElement)

// -- Setup

const resultPath = two.makePath()
resultPath.noFill()
resultPath.closed = false
resultPath.linewidth = 5
resultPath.stroke = '#408ed0';

// Lines

const line1_2 = makeLine('#408ed0')
const line2_3 = makeLine('#408ed0')
const line3_4 = makeLine('#408ed0')

const line1_2__2_3 = makeLine('#8ED040')
const line2_3__3_4 = makeLine('#8ED040')

const line1_2_3_4 = makeLine('#D0408E')

const lines = [
	line1_2, line2_3, line3_4,
	line1_2__2_3, line2_3__3_4,
	line1_2_3_4
]

// Circles

const point1 = makeDraggableCircle(two.width / 8 * 1, two.height / 8 * 5)
const point2 = makeDraggableCircle(two.width / 8 * 2, two.height / 4)
const point3 = makeDraggableCircle(two.width / 8 * 6, two.height / 4)
const point4 = makeDraggableCircle(two.width / 8 * 7, two.height / 8 * 5)

const point1_2 = makeInterpolCircle('#8ED040', '#a2ef4a')
const point2_3 = makeInterpolCircle('#8ED040', '#a2ef4a')
const point3_4 = makeInterpolCircle('#8ED040', '#a2ef4a')

const point1_2__2_3 = makeInterpolCircle('#D0408E', '#f04aa2')
const point2_3__3_4 = makeInterpolCircle('#D0408E', '#f04aa2')

const interpolationPoints = [
	point1_2, point2_3, point3_4,
	point1_2__2_3, point2_3__3_4
]

const resultPoint = two.makeCircle(0, 0, 12)
resultPoint.stroke = '#b5b5b5'

// Vectors

const bernsteinGroup = two.makeGroup()

// Update

function update() {
	if(!controlCenter.shouldUpdate()) return;

	const t = controlCenter.t

	const position1 = point1.position
	const position2 = point2.position
	const position3 = point3.position
	const position4 = point4.position

	// Points

	point1_2.position = lerp(position1, position2, t)
	point2_3.position = lerp(position2, position3, t)
	point3_4.position = lerp(position3, position4, t)

	point1_2__2_3.position = quadraticBezier(position1, position2, position3, t)
	point2_3__3_4.position = quadraticBezier(position2, position3, position4, t)

	resultPoint.position = cubicBezier(position1, position2, position3, position4, t)

	// Lines

	line1_2.position1 = position1
	line1_2.position2 = position2

	line2_3.position1 = position2
	line2_3.position2 = position3

	line3_4.position1 = position3
	line3_4.position2 = position4

	line1_2__2_3.position1 = lerp(position1, position2, t)
	line1_2__2_3.position2 = lerp(position2, position3, t)

	line2_3__3_4.position1 = lerp(position2, position3, t)
	line2_3__3_4.position2 = lerp(position3, position4, t)

	line1_2_3_4.position1 = quadraticBezier(position1, position2, position3, t)
	line1_2_3_4.position2 = quadraticBezier(position2, position3, position4, t)

	// Result path

	resultPath.vertices.length = 0

	for (let t = 0; t <= 1.001; t += 0.02) {
		const position = cubicBezier(position1, position2, position3, position4, t)
		resultPath.vertices.push(position)
	}

	// Vectors

	bernsteinGroup.children.forEach(v => v.remove())
	drawBernsteins(t)

	// Visibility

	if (interpolationPointsVisible) {
		interpolationPoints.forEach(point => point.opacity = 1.0)
	} else {
		interpolationPoints.forEach(point => point.opacity = 0.0)
	}

	if (linesVisible) {
		lines.forEach(line => line.line.opacity = 1.0)
	} else {
		lines.forEach(line => line.line.opacity = 0.0)
	}
}

two.bind('update', update)
two.play()

controlCenter.requestUpdate()

// Draggable

let currentClickedPoint = null

canvasElement.addEventListener('mouseup', () => currentClickedPoint = null)
canvasElement.addEventListener('mouseleave', () => currentClickedPoint = null)
canvasElement.addEventListener('mousemove', (e) => {
	if (currentClickedPoint === null) return

	currentClickedPoint.position.x += e.movementX
	currentClickedPoint.position.y += e.movementY

	controlCenter.requestUpdate()
})

function makeDraggableCircle(x, y) {
	const point = two.makeCircle(x, y, 10)
	point.fill = '#408ed0'
	point.stroke = '#50b2ff'
	point.linewidth = 10

	two.update()
	point.renderer.elem.addEventListener('mousedown', () => currentClickedPoint = point)

	return point
}

// Util

function drawBernsteins(t) {
	const vector1 = makeVector(two.width / 2, two.height / 2, point1.position.x - two.width / 2, point1.position.y - two.height / 2, b0(t), '#408ED0')
	const vector2 = makeVector(vector1.x2, vector1.y2, point2.position.x - two.width / 2, point2.position.y - two.height / 2, b1(t), '#CA40D0')
	const vector3 = makeVector(vector2.x2, vector2.y2, point3.position.x - two.width / 2, point3.position.y - two.height / 2, b2(t), '#D08240')
	const vector4 = makeVector(vector3.x2, vector3.y2, point4.position.x - two.width / 2, point4.position.y - two.height / 2, b3(t), '#46D040')

	bernsteinGroup.add(vector4.arrow, vector3.arrow, vector2.arrow, vector1.arrow)
}

function makeVector(x, y, dx, dy, scale, color) {
	const x2 = x + dx * scale
	const y2 = y + dy * scale

	const arrow = two.makeArrow(x, y, x2, y2)
	arrow.stroke = color
	arrow.linewidth = 3
	
	const circle = two.makeCircle(x, y, 4)
	circle.noFill()
	circle.stroke = color
	circle.linewidth = 3

	const group = two.makeGroup([arrow, circle])

	return {
		arrow: group,
		x2,
		y2
	}
}

function convertXToCalcSystem(x) {
	return (x / two.width - 0.5) * 2
}

function convertYToCalcSystem(y) {
	return -(y / two.height - 0.5) * 2
}

function convertXToRealSystem(x) {
	return (x / 2 + 0.5) * two.width
}

function convertYToRealSystem(y) {
	return  (-y / 2 + 0.5) * two.height
}

function makeInterpolCircle(colorInner, colorOuter) {
	const circle = two.makeCircle(0, 0, 5)
	circle.fill = colorInner
	circle.stroke = colorOuter
	circle.linewidth = 5

	return circle
}

function makeLine(color) {
	const line = two.makeLine(0, 0, 0, 0)
	line.stroke = color
	line.linewidth = 2

	function setPosition(index, vector) {
		line.vertices[index].x = vector.x
		line.vertices[index].y = vector.y
	}

	return {
		line,
		set position1(vector) {
			setPosition(0, vector)
		},
		set position2(vector) {
			setPosition(1, vector)
		}
	}
}

// DeCasteljau

function cubicBezier(a, b, c, d, t) {
	const ab_bc = quadraticBezier(a, b, c, t)
	const bc_cd = quadraticBezier(b, c, d, t)

	return lerp(ab_bc, bc_cd, t)
}

function quadraticBezier(a, b, c, t) {
	const ab = lerp(a, b, t)
	const bc = lerp(b, c, t)

	return lerp(ab, bc, t)
}

function lerp(a, b, t) {
	return new Two.Vector(
		(1 - t) * a.x + t * b.x,
		(1 - t) * a.y + t * b.y
	)
}