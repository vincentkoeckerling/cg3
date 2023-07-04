import Two from 'two.js'
import { ControlCenter } from './bezier/control_center'

const controlCenter = new ControlCenter()

const mainCanvas = document.getElementById('curve_canvas')
const two = new Two({ fitted: true }).appendTo(mainCanvas)
const curve = two.makePath();

curve.noFill().closed = false;
curve.stroke = '#36454F';
curve.linewidth = 2

let p0 = [two.width*0.15, two.height*0.6]
let p1 = [two.width*0.45, two.height*0.4]
let p2 = [two.width*0.75, two.height*0.7]
let m0 = [two.width*0.2, two.height*0.4]
let m1 = [two.width*0.7, two.height*0.35]
let m2 = [two.width*0.9, two.height*0.6]

var p0c = makeDraggableCircle(p0[0], p0[1])
var p1c = makeDraggableCircle(p1[0], p1[1])
var p2c = makeDraggableCircle(p2[0], p2[1])

var tpoint = two.makeCircle(0, 0, 10);
tpoint.stroke = '#b5b5b5'


var m0a = makeDraggableArrowhead(m0[0], m0[1])
var m1a = makeDraggableArrowhead(m1[0], m1[1])
var m2a = makeDraggableArrowhead(m2[0], m2[1])

controlCenter.onPlayButtonClicked();
controlCenter.setT(0);
controlCenter.tMax = 2
controlCenter.tRate = 0.02

function update() {
    if (!controlCenter.shouldUpdate()) return
   switchCurves([p0c.position.x, p0c.position.y], [p1c.position.x, p1c.position.y], [p2c.position.x, p2c.position.y], [m0a.position.x, m0a.position.y], [m1a.position.x, m1a.position.y], [m2a.position.x, m2a.position.y])

}

two.bind('update', update)
two.play()




mainCanvas.addEventListener('load', (e) => {
    controlCenter.animate();
})

function makeDraggableCircle(x, y) {
    const point = two.makeCircle(x, y, 0)

    two.update()
    
    return point
}


function makeDraggableArrowhead(x, y) {
    const point = two.makeCircle(x, y, 14)
    point.opacity = 0.00001; // bei opacity=0 kann der Punkt einmal bewegt werden, beim zweiten Anklicken reagiert er nicht mehr
    point.linewidth = 0
    two.update()
    point.renderer.elem.addEventListener('mousedown', () => currentClickedPoint = point)
    
    return point
}

function switchCurves(point0, point1, point2, mPoint0, mPoint1, mPoint2){
	let t = controlCenter.t;
	let mp0 = [mPoint0[0] - point0[0], mPoint0[1] - point0[1]];
    let mp1 = [mPoint1[0] - point1[0], mPoint1[1] - point1[1]];
    let mp2 = [mPoint2[0] - point2[0], mPoint2[1] - point2[1]];
	if(t<=1){
		tPoint(point0, point1, mp0, mp1)
	}else{
		tPoint(point1, point2, mp1, mp2)
	}
	if(t>=1.95){
		curve.vertices =0
	}
	
}

function tPoint(point0, point1, mp0, mp1) {
    let t = controlCenter.t;
	let x = t%1
    
        let m = (2 * Math.pow(x, 3) - 3 * Math.pow(x, 2) + 1) * point0[0]
            + (-2 * Math.pow(x, 3) + 3 * Math.pow(x, 2)) * point1[0]
            + (Math.pow(x, 3) - 2 * Math.pow(x, 2) + x) * mp0[0]
            + (Math.pow(x, 3) - Math.pow(x, 2)) * mp1[0];
        let y = (2 * Math.pow(x, 3) - 3 * Math.pow(x, 2) + 1) * point0[1]
            + (-2 * Math.pow(x, 3) + 3 * Math.pow(x, 2)) * point1[1]
            + (Math.pow(x, 3) - 2 * Math.pow(x, 2) + x) * mp0[1]
            + (Math.pow(x, 3) - Math.pow(x, 2)) * mp1[1];
        tpoint.position.x = m
        tpoint.position.y = y
		curve.vertices.push(new Two.Vector(m, y))
   

}

// Don’t forget to tell two to draw everything to the screen
two.update();