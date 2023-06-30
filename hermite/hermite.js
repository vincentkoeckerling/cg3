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

let m1 = new Two.Vector(403, 136)
let m0 = new Two.Vector(159, 264)
let p0 = new Two.Vector(102, 209)
let p1 = new Two.Vector(377, 184)
curve.vertices.push(p0, p1);
var p0c = two2.makeCircle(p0.x, p0.y, 5);
p0c.stroke ='#b5b5b5';
var p1c = two2.makeCircle(p1.x, p1.y, 5);
p1c.stroke ='#b5b5b5';

two2.makeArrow(p0.x, p0.y, m0.x, m0.y);
two2.makeArrow(p1.x, p1.y, m1.x, m1.y)




// Don’t forget to tell two to draw everything to the screen
two.update();
two2.update();