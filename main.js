import Two from 'two.js'
import { ControlCenter } from './bezier/control_center'
import { floor } from 'mathjs'

const controlCenter = new ControlCenter()

controlCenter.onPlayButtonClicked();
controlCenter.setT(0);

const mainCanvas = document.getElementById('curve_canvas')
const mainCanvas2 = document.getElementById('curve_canvas2')
const two = new Two({ fitted: true }).appendTo(mainCanvas)
const two2 = new Two({ fitted: true }).appendTo(mainCanvas2)
const curve = two.makePath();

curve.noFill().closed = false;
curve.stroke = '#808080';
curve.linewidth = 3.6

let h = two.height / 100
let w = two.width / 100

let a0 = [10 * w, 35 * h]
let a1 = [0 * w, 80 * h]
let c0 = [10 * w, 12 * h]
let c1 = [24 * w, 12 * h]
let e0 = [17 * w, 75 * h]
let e1 = [12 * w, 95 * h]
let f0 = [15 * w, 60 * h]
let f1 = [25 * w, 40 * h]
let i0 = [30 * w, 55 * h]
let i1 = [45 * w, 75 * h]
let j0 = [43 * w, 70 * h]
let j1 = [65 * w, 70 * h]
let k0 = [59 * w, 55 * h]
let k1 = [75 * w, 50 * h]
let l0 = [75 * w, 65 * h]
let l1 = [85 * w, 65 * h]
let m0 = [87 * w, 20 * h]
let m1 = [75 * w, 15 * h]
let n0 = [84 * w, 39 * h]
let n1 = [87 * w, 51 * h]
let o0 = [90 * w, 50 * h]
let o1 = [100 * w, 60 * h]
let p0 = [87 * w, 85 * h]
let p1 = [74 * w, 92 * h]


var pointArray = [a0, a1, c0, c1, e0, e1, f0, f1, i0, i1, j0, j1, k0, k1, l0, l1, m0, m1, n0, n1, o0, o1, p0, p1]

controlCenter.tMax = 28

controlCenter.tRate = 0.0247


var i = 0
function update() {

    if (!controlCenter.shouldUpdate()) return

    if (controlCenter.t < 11.5) {
        drawPoints()
    }
    
    if (controlCenter.t >= 12 && controlCenter.t <=23) {
        
        tPoint(pointArray)
    }

    if(controlCenter.t >24 && controlCenter.t < 24.1){
        two2.clear()
    }

    if(controlCenter.t >24){
        fadeOut()
    }
}

two.bind('update', update)
two.play()
two2.bind('update', update)
two2.play()

mainCanvas.addEventListener('load', (e) => {
    controlCenter.animate();
})

function drawPoints() {
    var t = controlCenter.t;
    controlCenter.tRate = 0.047
    let x = t % 1
    var l = floor(t)*2 
    
    if (x <= 0.047) {
        //ersten und letzten Punkt leicht verschieben, damit sie von der Linie verdeckt werden
        if (l<=1){ 
            var point = two2.makeCircle(9.5 * w, 37 * h, 1.4) 
            point.stroke = '#808080'
            point.fill = '#808080'
            return
        }
        if (l>=21){ 
            var point = two2.makeCircle(87.5 * w, 84.45 * h, 1.4) 
            point.stroke = '#808080'
            point.fill = '#808080'
            return
        }
        var point = two2.makeCircle(pointArray[l][0], pointArray[l][1], 1.4)
        point.stroke = '#808080'
        point.fill = '#808080'
    }
}

function tPoint(array) {
    
    var offset = 12
    var t = controlCenter.t - offset;
    let x = t % 1
    var c = floor(t) * 2
    controlCenter.tRate = 0.0247

    if (t >= array.length - 1.0 + 4 - offset) {
        fadeOut()
    }

    if (t <= 0.1) {
        curve.opacity = 1
    }

    if (t >= (array.length / 2) - 1.0) {
        return
    }

    var point0 = array[c]
    var mPoint0 = array[c + 1]
    var point1 = array[c + 2]
    var mPoint1 = array[c + 3]

    let mp0 = [mPoint0[0] - point0[0], mPoint0[1] - point0[1]];
    let mp1 = [mPoint1[0] - point1[0], mPoint1[1] - point1[1]];

    let xx = (2 * Math.pow(x, 3) - 3 * Math.pow(x, 2) + 1) * point0[0]
        + (-2 * Math.pow(x, 3) + 3 * Math.pow(x, 2)) * point1[0]
        + (Math.pow(x, 3) - 2 * Math.pow(x, 2) + x) * mp0[0]
        + (Math.pow(x, 3) - Math.pow(x, 2)) * mp1[0];
    let y = (2 * Math.pow(x, 3) - 3 * Math.pow(x, 2) + 1) * point0[1]
        + (-2 * Math.pow(x, 3) + 3 * Math.pow(x, 2)) * point1[1]
        + (Math.pow(x, 3) - 2 * Math.pow(x, 2) + x) * mp0[1]
        + (Math.pow(x, 3) - Math.pow(x, 2)) * mp1[1];

    curve.vertices.push(new Two.Vector(xx, y))
   
}

function fadeOut(){
    curve.opacity -= 0.004
        if (curve.opacity <= 0.01) {
            curve.vertices = 0
        }
}

// draw everything to the screen
two.update();
two2.update();
