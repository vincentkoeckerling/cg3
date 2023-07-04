import Two from 'two.js'
import { ControlCenter } from '../bezier/control_center'

let drawFullCurve = true
document.getElementById('draw-full-curve').addEventListener('change', (e) => {
	drawFullCurve = e.currentTarget.checked
	controlCenter.requestUpdate()
})

const controlCenter = new ControlCenter()
controlCenter.tMax = 2.0

const mainCanvas = document.getElementById('hermite_canvas')
const two = new Two({ fitted: true }).appendTo(mainCanvas)
const curve = two.makePath();

var background = two.makeGroup();
var middleground = two.makeGroup();
var foreground = two.makeGroup();

curve.noFill().closed = false;
curve.stroke = '#408ed0';
curve.linewidth = 5

let p0 = [two.width*0.15, two.height*0.6]
let p1 = [two.width*0.45, two.height*0.4]
let p2 = [two.width*0.75, two.height*0.7]
let m0 = [two.width*0.2, two.height*0.4]
let m1 = [two.width*0.7, two.height*0.35]
let m2 = [two.width*0.9, two.height*0.6]

var arrow0 = two.makeArrow(p0[0], p0[1], m0[0], m0[1])
var arrow1 = two.makeArrow(p1[0], p1[1], m1[0], m1[1])
var arrow2 = two.makeArrow(p2[0], p2[1], m2[0], m2[1])
middleground.add(arrow0, arrow1, arrow2)

var p0c = makeDraggableCircle(p0[0], p0[1])
var p1c = makeDraggableCircle(p1[0], p1[1])
var p2c = makeDraggableCircle(p2[0], p2[1])
background.add(p0c, p1c, p2c)

var tpoint = two.makeCircle(0, 0, 10);
tpoint.stroke = '#b5b5b5'
foreground.add(tpoint)

var m0a = makeDraggableArrowhead(m0[0], m0[1])
var m1a = makeDraggableArrowhead(m1[0], m1[1])
var m2a = makeDraggableArrowhead(m2[0], m2[1])
foreground.add(m0a, m1a, m2a)

const vectorGroup = two.makeGroup()

function update() {
    if (!controlCenter.shouldUpdate()) return

    arrow0.remove()
    arrow1.remove()
    arrow2.remove()
    arrow0 = drawBetterArrow(p0c, m0a)
    arrow1 = drawBetterArrow(p1c, m1a)
    arrow2 = drawBetterArrow(p2c, m2a)
    middleground.add(arrow0, arrow1, arrow2)
    curve.vertices.length = 0

    if (drawFullCurve) {
        basistransform([p0c.position.x, p0c.position.y], [p1c.position.x, p1c.position.y], [m0a.position.x, m0a.position.y], [m1a.position.x, m1a.position.y], 1.0)
        basistransform([p1c.position.x, p1c.position.y], [p2c.position.x, p2c.position.y], [m1a.position.x, m1a.position.y], [m2a.position.x, m2a.position.y], 1.0)
    } else {
        basistransform([p0c.position.x, p0c.position.y], [p1c.position.x, p1c.position.y], [m0a.position.x, m0a.position.y], [m1a.position.x, m1a.position.y], Math.min(controlCenter.t, 1.0))

        if (controlCenter.t > 1.0) {
            basistransform([p1c.position.x, p1c.position.y], [p2c.position.x, p2c.position.y], [m1a.position.x, m1a.position.y], [m2a.position.x, m2a.position.y], controlCenter.t - 1)
        }
    }

    tPoint([p0c.position.x, p0c.position.y], [p1c.position.x, p1c.position.y], [p2c.position.x, p2c.position.y], [m0a.position.x, m0a.position.y], [m1a.position.x, m1a.position.y], [m2a.position.x, m2a.position.y])

    vectorGroup.children.forEach(v => v.remove())
    
    if (controlCenter.t <= 1.0) {
        const m0 = {
            x: m0a.position.x - p0c.position.x,
            y: m0a.position.y - p0c.position.y,
        }
    
        const m1 = {
            x: m1a.position.x - p1c.position.x,
            y: m1a.position.y - p1c.position.y,
        }
        drawVectors(p0c, p1c, m0, m1, controlCenter.t)
    } else {
        
        const m1 = {
            x: m1a.position.x - p1c.position.x,
            y: m1a.position.y - p1c.position.y,
        }
        const m2 = {
            x: m2a.position.x - p2c.position.x,
            y: m2a.position.y - p2c.position.y,
        }
        drawVectors(p1c, p2c, m1, m2, controlCenter.t - 1)
    }
}

two.bind('update', update)
two.play()


let currentClickedPoint = null

mainCanvas.addEventListener('mouseup', () => currentClickedPoint = null)
mainCanvas.addEventListener('mouseleave', () => currentClickedPoint = null)
mainCanvas.addEventListener('mousemove', (e) => {
    if (currentClickedPoint === null) return
    currentClickedPoint.position.x += e.movementX
    currentClickedPoint.position.y += e.movementY
    if (currentClickedPoint === p0c) {
        m0a.position.x += e.movementX
        m0a.position.y += e.movementY
    }
    if (currentClickedPoint === p1c) {
        m1a.position.x += e.movementX
        m1a.position.y += e.movementY
    }
    if (currentClickedPoint === p2c) {
        m2a.position.x += e.movementX
        m2a.position.y += e.movementY
    }

    controlCenter.requestUpdate()
})

function drawVectors(pos1, pos2, m1, m4, t) {
    const scale1 = (2 * Math.pow(t, 3) - 3 * Math.pow(t, 2) + 1)
    const scale2 = (-2 * Math.pow(t, 3) + 3 * Math.pow(t, 2))
    const scale3 = (Math.pow(t, 3) - 2 * Math.pow(t, 2) + t)
    const scale4 = (Math.pow(t, 3) - Math.pow(t, 2))

    const vector1 = makeVector(two.width / 2, two.height / 2, pos1.position.x - two.width / 2, pos1.position.y - two.height / 2, scale1, '#D08240')
	const vector2 = makeVector(vector1.x2, vector1.y2, pos2.position.x - two.width / 2, pos2.position.y - two.height / 2, scale2, '#408ed0')
	const vector3 = makeVector(vector2.x2, vector2.y2, m1.x, m1.y, scale3, '#CA40D0')
	const vector4 = makeVector(vector3.x2, vector3.y2, m4.x, m4.y, scale4, '#46D040')
    
	vectorGroup.add(vector4.arrow, vector3.arrow, vector2.arrow, vector1.arrow)
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

function makeDraggableCircle(x, y) {
    const point = two.makeCircle(x, y, 10)
    point.fill = '#408ed0'
    point.stroke = '#50b2ff'
    point.linewidth = 10

    two.update()
    point.renderer.elem.addEventListener('mousedown', () => currentClickedPoint = point)

    return point
}

function drawBetterArrow(p, m) {
    let arrow = two.makeArrow(
        p.position.x - (16 * (p.position.x - m.position.x) / Math.sqrt(Math.pow(p.position.x - m.position.x, 2) + Math.pow(p.position.y - m.position.y, 2))),
        p.position.y - (16 * (p.position.y - m.position.y) / Math.sqrt(Math.pow(p.position.x - m.position.x, 2) + Math.pow(p.position.y - m.position.y, 2))),
        m.position.x + (5 * (m.position.x - p.position.x) / Math.sqrt(Math.pow(p.position.x - m.position.x, 2) + Math.pow(p.position.y - m.position.y, 2))),
        m.position.y + (5 * (m.position.y - p.position.y) / Math.sqrt(Math.pow(p.position.x - m.position.x, 2) + Math.pow(p.position.y - m.position.y, 2))),
        )
    arrow.stroke = '#D08240'
    arrow.linewidth = 3;
    arrow.opacity = 0.5
    
    return arrow
}

function makeDraggableArrowhead(x, y) {
    const point = two.makeCircle(x, y, 14)
    // point.opacity = 0.00001; // bei opacity=0 kann der Punkt einmal bewegt werden, beim zweiten Anklicken reagiert er nicht mehr
    point.linewidth = 0
    two.update()
    point.renderer.elem.addEventListener('mousedown', () => currentClickedPoint = point)
    
    return point
}

// Basistransformation
// p(t) = (2*t³ - 3*t² + 1)*p0 + (-2*t³ + 3*t²)*p1 + (t³ - 2*t² + t)*m0 + (t³ - t²)*m1
//              H0(t)                   H1(t)               H'0(t)              H'1(t)
function basistransform(point0, point1, mPoint0, mPoint1, tMax) {
    let mp0 = [mPoint0[0] - point0[0], mPoint0[1] - point0[1]];
    let mp1 = [mPoint1[0] - point1[0], mPoint1[1] - point1[1]];
    for (let t = 0; t <= tMax + 0.001; t += 0.01) {
        let x = (2 * Math.pow(t, 3) - 3 * Math.pow(t, 2) + 1) * point0[0]
            + (-2 * Math.pow(t, 3) + 3 * Math.pow(t, 2)) * point1[0]
            + (Math.pow(t, 3) - 2 * Math.pow(t, 2) + t) * mp0[0]
            + (Math.pow(t, 3) - Math.pow(t, 2)) * mp1[0];
        let y = (2 * Math.pow(t, 3) - 3 * Math.pow(t, 2) + 1) * point0[1]
            + (-2 * Math.pow(t, 3) + 3 * Math.pow(t, 2)) * point1[1]
            + (Math.pow(t, 3) - 2 * Math.pow(t, 2) + t) * mp0[1]
            + (Math.pow(t, 3) - Math.pow(t, 2)) * mp1[1];
        curve.vertices.push(new Two.Vector(x, y))

    }
}

function tPoint(point0, point1, point2, mPoint0, mPoint1, mPoint2) {
    let mp0 = [mPoint0[0] - point0[0], mPoint0[1] - point0[1]];
    let mp1 = [mPoint1[0] - point1[0], mPoint1[1] - point1[1]];
    let mp2 = [mPoint2[0] - point2[0], mPoint2[1] - point2[1]];
    let t = controlCenter.t;
    if (t < 1) {
        let x = (2 * Math.pow(t, 3) - 3 * Math.pow(t, 2) + 1) * point0[0]
            + (-2 * Math.pow(t, 3) + 3 * Math.pow(t, 2)) * point1[0]
            + (Math.pow(t, 3) - 2 * Math.pow(t, 2) + t) * mp0[0]
            + (Math.pow(t, 3) - Math.pow(t, 2)) * mp1[0];
        let y = (2 * Math.pow(t, 3) - 3 * Math.pow(t, 2) + 1) * point0[1]
            + (-2 * Math.pow(t, 3) + 3 * Math.pow(t, 2)) * point1[1]
            + (Math.pow(t, 3) - 2 * Math.pow(t, 2) + t) * mp0[1]
            + (Math.pow(t, 3) - Math.pow(t, 2)) * mp1[1];
        tpoint.position.x = x
        tpoint.position.y = y
    }
    else {
        let x = (2 * Math.pow(t - 1, 3) - 3 * Math.pow(t - 1, 2) + 1) * point1[0]
            + (-2 * Math.pow(t - 1, 3) + 3 * Math.pow(t - 1, 2)) * point2[0]
            + (Math.pow(t - 1, 3) - 2 * Math.pow(t - 1, 2) + t - 1) * mp1[0]
            + (Math.pow(t - 1, 3) - Math.pow(t - 1, 2)) * mp2[0];
        let y = (2 * Math.pow(t - 1, 3) - 3 * Math.pow(t - 1, 2) + 1) * point1[1]
            + (-2 * Math.pow(t - 1, 3) + 3 * Math.pow(t - 1, 2)) * point2[1]
            + (Math.pow(t - 1, 3) - 2 * Math.pow(t - 1, 2) + t - 1) * mp1[1]
            + (Math.pow(t - 1, 3) - Math.pow(t - 1, 2)) * mp2[1];
        tpoint.position.x = x
        tpoint.position.y = y
    }

}

basistransform(p0, p1, m0, m1);

// Don’t forget to tell two to draw everything to the screen
two.update();