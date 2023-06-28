import Two from 'two.js'

let t = 0.5
document.getElementById('t-range').addEventListener('input', (e) => t = e.currentTarget.value)

const canvasElement = document.getElementById('canvas')
const two = new Two({ fitted: true }).appendTo(canvasElement)

const point1 = createControlPoint(two.width / 8 * 1, two.height / 8 * 5)
const point2 = createControlPoint(two.width / 8 * 2, two.height / 4)
const point3 = createControlPoint(two.width / 8 * 6, two.height / 4)
const point4 = createControlPoint(two.width / 8 * 7, two.height / 8 * 5)

const line12 = createLine(point1, point2)
const line23 = createLine(point2, point3)
const line34 = createLine(point3, point4)

const point12 = createInterpolPoint(point1, point2)
const point23 = createInterpolPoint(point2, point3)
const point34 = createInterpolPoint(point3, point4)

const line12_23 = createLine(point12.point, point23.point)
const line23_34 = createLine(point23.point, point34.point)

const point12_23 = createInterpolPoint(point12.point, point23.point)
const point23_34 = createInterpolPoint(point23.point, point34.point)

const line12_23__23_34 = createLine(point12_23.point, point23_34.point)
const point12_23__23_34 = createInterpolPoint(point12_23.point, point23_34.point)

function render() {
	line12.update()
	line23.update()
	line34.update()

	point12.update(t)
	point23.update(t)
	point34.update(t)

	line12_23.update()
	line23_34.update()

	point12_23.update(t)
	point23_34.update(t)

	line12_23__23_34.update()

	point12_23__23_34.update(t)
}

two.bind('update', render)
two.play()

let currentClickedPoint = null

canvasElement.addEventListener('mouseup', () => currentClickedPoint = null)
canvasElement.addEventListener('mouseleave', () => currentClickedPoint = null)
canvasElement.addEventListener('mousemove', (e) => {
	if (currentClickedPoint === null) return

	currentClickedPoint.position.x += e.movementX * 1.25
	currentClickedPoint.position.y += e.movementY * 1.25
})

function createControlPoint(x, y) {
	const point = two.makeCircle(x, y, 15)

	two.update()
	point.renderer.elem.addEventListener('mousedown', () => currentClickedPoint = point)

	return point
}

function createLine(point1, point2) {
	const line = two.makeLine(point1.position.x, point1.position.y, point2.position.x, point2.position.y)

	function update() {
		line.vertices[0].x = point1.position.x
		line.vertices[0].y = point1.position.y
		line.vertices[1].x = point2.position.x
		line.vertices[1].y = point2.position.y
	}

	return {
		line,
		update
	}
}

function createInterpolPoint(point1, point2) {
	const point = two.makeCircle(0, 0, 15)

	function update(t) {
		point.position.x = lerp(point1.position.x, point2.position.x, t)
		point.position.y = lerp(point1.position.y, point2.position.y, t)
	}

	return {
		point,
		update
	}
}

function lerp(a, b, t) {
	return (1-t) * a + t * b
}