import { sqrt } from 'mathjs'
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
curve.stroke = '#D08240';

let m1 = [603, 184]
let m0 = [159, 164]
let p0 = [102, 409]
let p1 = [377, 184]
//curve.vertices.push(p0, p1);


//two2.makeArrow(p0[0], p0[1], m0[0], m0[1]);
//two2.makeArrow(p1[0], p1[1], m1[0], m1[1])

var p0c = two2.makeCircle(p0[0], p0[1], 5);
p0c.stroke = '#b5b5b5';
var p1c = two2.makeCircle(p1[0], p1[1], 5);
p1c.stroke = '#b5b5b5';

// Basistransformation
// p(t) = (2*t³ - 3*t² + 1)*p0 + (-2*t³ + 3*t²)*p1 + (t³ - 2*t² + t)*m0 + (t³ - t²)*m1
//              H0(t)                   H1(t)               H'0(t)              H'1(t)
function basistransform(point0, point1, mPoint0, mPoint1) {
    let mp0 = [
        //          x              /    sqrt    (x²+y²) 
        (mPoint0[0] - point0[0]) / (Math.sqrt((Math.pow(mPoint0[0] - point0[0], 2) + Math.pow(mPoint0[1] - point0[1], 2)))),
        (mPoint0[1] - point0[1]) / (Math.sqrt((Math.pow(mPoint0[0] - point0[0], 2) + Math.pow(mPoint0[1] - point0[1], 2))))
    ];
    console.log(mp0)
    console.log()
    let mp1 = [
        //          x              /    sqrt    (x²+y²) 
        (mPoint1[0] - point1[0]) / (Math.sqrt((Math.pow(mPoint1[0] - point1[0], 2) + Math.pow(mPoint1[1] - point1[1], 2)))),
        (mPoint1[1] - point1[1]) / (Math.sqrt((Math.pow(mPoint1[0] - point1[0], 2) + Math.pow(mPoint1[1] - point1[1], 2))))
    ];

    two2.makeArrow(p0[0], p0[1], p0[0]+mp0[0]*100, p0[1]+mp0[1]*100);
    two2.makeArrow(p1[0], p1[1], p1[0]+mp1[0]*100, p1[1]+mp1[1]*100)
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