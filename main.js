import Two from 'two.js'
import { ControlCenter } from './bezier/control_center'
import { floor } from 'mathjs'

const controlCenter = new ControlCenter()

controlCenter.onPlayButtonClicked();
controlCenter.setT(0);

const mainCanvas = document.getElementById('curve_canvas')
const two = new Two({ fitted: true }).appendTo(mainCanvas)
const curve = two.makePath();

curve.noFill().closed = false;
curve.stroke = '#181818';
curve.linewidth = 3



let h = two.height / 100
let w = two.width / 100

let a0 = [10 * w, 35 * h]
let a1 = [0 * w, 80 * h]
let b0 = [5 * w, 40 * h]
let b1 = [5 * w, 10 * h]
let c0 = [10 * w, 12 * h]
let c1 = [24 * w, 12 * h]
let d0 = [18 * w, 45 * h]
let d1 = [18 * w, 85 * h]
let e0 = [17 * w, 75 * h]
let e1 = [12 * w, 95 * h]
let f0 = [15 * w, 60 * h]
let f1 = [25 * w, 40 * h]
let g0 = [25 * w, 70 * h]
let g1 = [30 * w, 70 * h]
let h0 = [25 * w, 80 * h]
let h1 = [25 * w, 60 * h]
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
let o0 = [94 * w, 50 * h]
let o1 = [100 * w, 60 * h]
let p0 = [82 * w, 85 * h]
let p1 = [70 * w, 92 * h]


var pointArray = [a0, a1, c0, c1, e0, e1, f0, f1, i0, i1, j0, j1, k0, k1, l0, l1, m0, m1, n0, n1, o0, o1, p0, p1,]

/*for (var i = 0; i < pointArray.length; i += 2) {
    var pointy = two.makeCircle(pointArray[i][0], pointArray[i][1], 2)
    pointy.stroke = '#808080'
    pointy.fill = '#808080'
    pointy.opacity = 0.4
}*/

for (var i = 1; i < pointArray.length; i += 2) {
    // two.makeCircle(pointArray[i][0], pointArray[i][1], 2)
}

controlCenter.tMax = pointArray.length / 2 - 1 + 12
controlCenter.tRate = 0.0247

function update() {
    if (!controlCenter.shouldUpdate()) return
    tPoint(pointArray)


}

two.bind('update', update)
two.play()

mainCanvas.addEventListener('load', (e) => {
    controlCenter.animate();
})




function tPoint(array) {
    let t = controlCenter.t;
    let x = t % 1
    var c = floor(t) * 2


    if (t >= (array.length / 2) - 1.02 + 4) {
        curve.opacity -=0.004
        if(curve.opacity <= 0.01){
            curve.vertices = 0
        }
    }

    if (t<=0.1){
        curve.opacity =0.8
    }

    if (t >= (array.length / 2) - 1.02) {
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

// Don’t forget to tell two to draw everything to the screen
two.update();