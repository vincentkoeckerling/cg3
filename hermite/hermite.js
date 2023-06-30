import Two from 'two.js'
import { ControlCenter } from '../bezier/control_center'

const controlCenter = new ControlCenter()

const mainCanvas = document.getElementById('hermite_canvas')
const two = new Two({ fitted: true }).appendTo(mainCanvas)
const curve = two.makePath();


curve.noFill().closed = false;
curve.stroke = '#408ed0';
curve.linewidth = 5

let p0 = [102, 309]
let p1 = [337, 184]
let p2 = [600, 200]
let m0 = [159, 164]
let m1 = [430, 300]
let m2 = [600, 100]
//curve.vertices.push(p0, p1);


var arrow0 = two.makeArrow(p0[0], p0[1], m0[0], m0[1])
var arrow1 = two.makeArrow(p1[0], p1[1], m1[0], m1[1])
var arrow2 = two.makeArrow(p2[0], p2[1], m2[0], m2[1])

var p0c = makeDraggableCircle(p0[0], p0[1])
var p1c = makeDraggableCircle(p1[0], p1[1])
var p2c = makeDraggableCircle(p2[0], p2[1])

var m0a = makeDraggableArrow(m0[0], m0[1])
var m1a = makeDraggableArrow(m1[0], m1[1])
var m2a = makeDraggableArrow(m2[0], m2[1])

var tpoint = two.makeCircle(0, 0, 10);
tpoint.stroke = '#b5b5b5'

function update() {
    arrow0.remove()
    arrow1.remove()
    arrow2.remove()
    arrow0 = drawBetterArrow(p0c, m0a)
    arrow1 = drawBetterArrow(p1c, m1a)
    arrow2 = drawBetterArrow(p2c, m2a)
    curve.vertices.length = 0
    basistransform([p0c.position.x, p0c.position.y], [p1c.position.x, p1c.position.y], [m0a.position.x, m0a.position.y], [m1a.position.x, m1a.position.y])
    basistransform([p1c.position.x, p1c.position.y], [p2c.position.x, p2c.position.y], [m1a.position.x, m1a.position.y], [m2a.position.x, m2a.position.y])
    tPoint([p0c.position.x, p0c.position.y], [p1c.position.x, p1c.position.y], [p2c.position.x, p2c.position.y], [m0a.position.x, m0a.position.y], [m1a.position.x, m1a.position.y], [m2a.position.x, m2a.position.y])

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

function drawBetterArrow(p, m) {
    let arrow = two.makeArrow(
        p.position.x - (15 * (p.position.x - m.position.x) / Math.sqrt(Math.pow(p.position.x - m.position.x, 2) + Math.pow(p.position.y - m.position.y, 2))),
        p.position.y - (15 * (p.position.y - m.position.y) / Math.sqrt(Math.pow(p.position.x - m.position.x, 2) + Math.pow(p.position.y - m.position.y, 2))),
        m.position.x - (15 * (m.position.x - p.position.x) / Math.sqrt(Math.pow(p.position.x - m.position.x, 2) + Math.pow(p.position.y - m.position.y, 2))),
        m.position.y - (15 * (m.position.y - p.position.y) / Math.sqrt(Math.pow(p.position.x - m.position.x, 2) + Math.pow(p.position.y - m.position.y, 2))),
        )
    arrow.stroke = '#D08240'
    arrow.linewidth = 3;
    arrow.opacity = 0.5
    
    return arrow
}

function makeDraggableArrow(x, y) {
    const point = two.makeCircle(x, y, 10)
    point.opacity = 0.2;
    point.stroke = '#D08240'
    point.fill = '#D08240'

    point.linewidth = 0
    two.update()
    point.renderer.elem.addEventListener('mousedown', () => currentClickedPoint = point)

    return point
}

// Basistransformation
// p(t) = (2*t³ - 3*t² + 1)*p0 + (-2*t³ + 3*t²)*p1 + (t³ - 2*t² + t)*m0 + (t³ - t²)*m1
//              H0(t)                   H1(t)               H'0(t)              H'1(t)
function basistransform(point0, point1, mPoint0, mPoint1) {
    let mp0 = [mPoint0[0] - point0[0], mPoint0[1] - point0[1]];
    let mp1 = [mPoint1[0] - point1[0], mPoint1[1] - point1[1]];
    for (let t = 0; t <= 1.001; t += 0.01) {
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