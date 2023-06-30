import Two from 'two.js'

const canvasElement = document.getElementById('side_canvas')
const two = new Two({ fitted: true }).appendTo(canvasElement)

two.makeArrow(0, two.height, 0, 0)
two.makeArrow(0, two.height * 0.8, two.width, two.height * 0.8)

//Zeichne H0(t) = 2𝑡3 − 3𝑡2 + 1
const path = two.makePath();
path.noFill().closed = false;
path.stroke = '#D08240';

for (let x = 0; x <= 100; x++) {
    let y = 2 * Math.pow(x / 100, 3) - 3 * Math.pow(x / 100, 2) + 1;
    let pos = new Two.Vector((x / 100) * two.width, 0.8 * two.height - y * 0.8 * two.height);
    path.vertices.push(pos);
}

//Zeichne H'0(t) = 𝑡3 − 2𝑡2 + t
const path2 = two.makePath();
path2.noFill().closed = false;
path2.stroke = '#CA40D0';

for (let x = 0; x <= 100; x++) {
    let y = Math.pow(x / 100, 3) - 2 * Math.pow(x / 100, 2) + x / 100;
    let pos = new Two.Vector((x / 100) * two.width, 0.8 * two.height - y * 0.8 * two.height);
    path2.vertices.push(pos);
}

//Zeichne 𝐻1(𝑡) = −2𝑡3 + 3𝑡2
const path3 = two.makePath();
path3.noFill().closed = false;
path3.stroke = '#408ed0';

for (let x = 0; x <= 100; x++) {
    let y = -2 * Math.pow(x / 100, 3) + 3 * Math.pow(x / 100, 2);
    let pos = new Two.Vector((x / 100) * two.width, 0.8 * two.height - y * 0.8 * two.height);
    path3.vertices.push(pos);
}

//Zeichne 𝐻̄'1(𝑡) = 𝑡3 − 𝑡2
const path4 = two.makePath();
path4.noFill().closed = false;
path4.stroke = '#46D040';

for (let x = 0; x <= 100; x++) {
    let y = Math.pow(x / 100, 3) - Math.pow(x / 100, 2);
    let pos = new Two.Vector((x / 100) * two.width, 0.8 * two.height - y * 0.8 * two.height);
    path4.vertices.push(pos);
}


//////////////////////////////
const mainCanvas = document.getElementById('hermite_canvas')
const two2 = new Two({ fitted: true }).appendTo(mainCanvas)

const curve = two2.makePath();
curve.noFill().closed = false;
curve.stroke = '#408ed0';
curve.linewidth = 5

let p0 = [102, 409]
let p1 = [377, 184]
let p2 = [200, 200]
let m0 = [359, 164]
let m1 = [330, 400]
let m2 = [300, 300]
//curve.vertices.push(p0, p1);


var arrow0 = two2.makeArrow(p0[0], p0[1], m0[0], m0[1])
var arrow1 = two2.makeArrow(p1[0], p1[1], m1[0], m1[1])
var arrow2 = two2.makeArrow(p2[0], p2[1], m2[0], m2[1])

var p0c = makeDraggableCircle(p0[0], p0[1])
var p1c = makeDraggableCircle(p1[0], p1[1])
var p2c = makeDraggableCircle(p2[0], p2[1])

var m0a = makeDraggableArrow(m0[0], m0[1])
var m1a = makeDraggableArrow(m1[0], m1[1])
var m2a = makeDraggableArrow(m2[0], m2[1])


function update() {
    arrow0.remove()
    arrow1.remove()
    arrow2.remove()
    arrow0 = two2.makeArrow(p0c.position.x, p0c.position.y, m0a.position.x, m0a.position.y)
    arrow0.stroke = '#D08240'
    arrow0.linewidth = 3;
    arrow0.opacity = 0.5
    arrow1 = two2.makeArrow(p1c.position.x, p1c.position.y, m1a.position.x, m1a.position.y)
    arrow1.stroke = '#D08240'
    arrow1.linewidth = 3;
    arrow1.opacity = 0.5
    arrow2 = two2.makeArrow(p2c.position.x, p2c.position.y, m2a.position.x, m2a.position.y)
    arrow2.stroke = '#D08240'
    arrow2.linewidth = 3;
    arrow2.opacity = 0.5
    curve.vertices.length = 0
    basistransform([p0c.position.x, p0c.position.y], [p1c.position.x, p1c.position.y],[m0a.position.x, m0a.position.y], [m1a.position.x, m1a.position.y])
    basistransform([p1c.position.x, p1c.position.y], [p2c.position.x, p2c.position.y],[m1a.position.x, m1a.position.y], [m2a.position.x, m2a.position.y])
}

two2.bind('update', update)
two2.play()


let currentClickedPoint = null

mainCanvas.addEventListener('mouseup', () => currentClickedPoint = null)
mainCanvas.addEventListener('mouseleave', () => currentClickedPoint = null)
mainCanvas.addEventListener('mousemove', (e) => {
    if (currentClickedPoint === null) return

    currentClickedPoint.position.x += e.movementX
    currentClickedPoint.position.y += e.movementY
})

function makeDraggableCircle(x, y) {
    const point = two2.makeCircle(x, y, 10)
    point.fill = '#408ed0'
    point.stroke = '#50b2ff'
    point.linewidth = 10

    two2.update()
    point.renderer.elem.addEventListener('mousedown', () => currentClickedPoint = point)

    return point
}

function makeDraggableArrow(x, y) {
    const point = two2.makeCircle(x, y, 10)
    point.opacity = 0.4;
    point.stroke ='#D08240' 
    
    point.linewidth = 10
    two2.update()
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

basistransform(p0, p1, m0, m1);

// Don’t forget to tell two to draw everything to the screen
two.update();
two2.update();