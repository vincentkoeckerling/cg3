import Two from 'two.js'

let t = 0.5
document.getElementById('t-range').addEventListener('input', (e) => t = e.currentTarget.value)

const canvasElement = document.getElementById('canvas')
const two = new Two({ fitted: true }).appendTo(canvasElement)

// -- Setup

const resultPath = two.makePath()
resultPath.noFill()
resultPath.closed = false
resultPath.stroke = 'rgb(0, 0, 255)';

// Lines

const line1_2 = makeLine()
const line2_3 = makeLine()
const line3_4 = makeLine()

const line1_2__2_3 = makeLine()
const line2_3__3_4 = makeLine()

const line1_2_3_4 = makeLine()

// Circles

const point1 = makeDraggableCircle(two.width / 8 * 1, two.height / 8 * 5)
const point2 = makeDraggableCircle(two.width / 8 * 2, two.height / 4)
const point3 = makeDraggableCircle(two.width / 8 * 6, two.height / 4)
const point4 = makeDraggableCircle(two.width / 8 * 7, two.height / 8 * 5)

const point1_2 = two.makeCircle(0, 0, 10)
const point2_3 = two.makeCircle(0, 0, 10)
const point3_4 = two.makeCircle(0, 0, 10)

const point1_2__2_3 = two.makeCircle(0, 0, 10)
const point2_3__3_4 = two.makeCircle(0, 0, 10)

const resultPoint = two.makeCircle(0, 0, 10)

// Update

function update() {
	const position1 = point1.position
	const position2 = point2.position
	const position3 = point3.position
	const position4 = point4.position

	// Points

	point1_2.position = lerp(position1, position2, t)
	point2_3.position = lerp(position2, position3, t)
	point3_4.position = lerp(position3, position4, t)

	point1_2__2_3.position = quadraticLerp(position1, position2, position3, t)
	point2_3__3_4.position = quadraticLerp(position2, position3, position4, t)

	resultPoint.position = cubicLerp(position1, position2, position3, position4, t)

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

	line1_2_3_4.position1 = quadraticLerp(position1, position2, position3, t)
	line1_2_3_4.position2 = quadraticLerp(position2, position3, position4, t)

	// Result path

	resultPath.vertices.length = 0

	for (let t = 0; t <= 1; t += 0.01) {
		const position = cubicLerp(position1, position2, position3, position4, t)
		resultPath.vertices.push(vectorToAnchor(position))
	}
}

two.bind('update', update)
two.play()

// Draggable

let currentClickedPoint = null

canvasElement.addEventListener('mouseup', () => currentClickedPoint = null)
canvasElement.addEventListener('mouseleave', () => currentClickedPoint = null)
canvasElement.addEventListener('mousemove', (e) => {
	if (currentClickedPoint === null) return

	currentClickedPoint.position.x += e.movementX * 1.25
	currentClickedPoint.position.y += e.movementY * 1.25
})

function makeDraggableCircle(x, y) {
	const point = two.makeCircle(x, y, 15)

	two.update()
	point.renderer.elem.addEventListener('mousedown', () => currentClickedPoint = point)

	return point
}

// Util

function makeLine() {
	const line = two.makeLine(0, 0, 0, 0)

	function setPosition(index, vector) {
		line.vertices[index].x = vectorToAnchor(vector).x
		line.vertices[index].y = vectorToAnchor(vector).y
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

function vectorToAnchor(vector) {
	return new Two.Anchor(vector.x, vector.y)
}

// DeCasteljau

function cubicLerp(a, b, c, d, t) {
	const ab_bc = quadraticLerp(a, b, c, t)
	const bc_cd = quadraticLerp(b, c, d, t)

	return lerp(ab_bc, bc_cd, t)
}

function quadraticLerp(a, b, c, t) {
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