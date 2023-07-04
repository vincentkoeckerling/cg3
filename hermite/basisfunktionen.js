import Two from 'two.js'
import { ControlCenter } from '../bezier/control_center'

const controlCenter = new ControlCenter()
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

var pointH0 = makePoint('#D08240', '#f2974a');

//Zeichne H'0(t) = 𝑡3 − 2𝑡2 + t
const path2 = two.makePath();
path2.noFill().closed = false;
path2.stroke = '#CA40D0';

for (let x = 0; x <= 100; x++) {
    let y = Math.pow(x / 100, 3) - 2 * Math.pow(x / 100, 2) + x / 100;
    let pos = new Two.Vector((x / 100) * two.width, 0.8 * two.height - y * 0.8 * two.height);
    path2.vertices.push(pos);
}

var pointH0s = makePoint('#D0408E', '#f04aa2')

//Zeichne 𝐻1(𝑡) = −2𝑡3 + 3𝑡2
const path3 = two.makePath();
path3.noFill().closed = false;
path3.stroke = '#408ed0';

for (let x = 0; x <= 100; x++) {
    let y = -2 * Math.pow(x / 100, 3) + 3 * Math.pow(x / 100, 2);
    let pos = new Two.Vector((x / 100) * two.width, 0.8 * two.height - y * 0.8 * two.height);
    path3.vertices.push(pos);
}

var pointH1 = makePoint('#408ed0', '#50b2ff');

//Zeichne 𝐻̄'1(𝑡) = 𝑡3 − 𝑡2
const path4 = two.makePath();
path4.noFill().closed = false;
path4.stroke = '#46D040';

for (let x = 0; x <= 100; x++) {
    let y = Math.pow(x / 100, 3) - Math.pow(x / 100, 2);
    let pos = new Two.Vector((x / 100) * two.width, 0.8 * two.height - y * 0.8 * two.height);
    path4.vertices.push(pos);
}

var pointH1s = makePoint('#8ED040', '#a2ef4a');




function convertPoint(x, y) {
    return new Two.Vector(x, 0.8 * two.height - y * 0.8 * two.height
    )
}

function makePoint(colorInner, colorOuter) {
	const circle = two.makeCircle(0, 0, 4)
	circle.fill = colorInner
	circle.stroke = colorOuter
	circle.linewidth = 4

	return circle
}

function update() {
    if (!controlCenter.shouldUpdate()) return;

    const t = controlCenter.t
    if (t < 1) {
        pointH0.position = convertPoint(t * two.width, (2 * Math.pow(t, 3) - 3 * Math.pow(t, 2) + 1))
        pointH0s.position = convertPoint(t * two.width, Math.pow(t, 3) - 2 * Math.pow(t, 2) + t)
        pointH1.position = convertPoint(t * two.width, -2 * Math.pow(t, 3) + 3 * Math.pow(t, 2))
        pointH1s.position = convertPoint(t * two.width, Math.pow(t, 3) - Math.pow(t, 2))
    } else {
        pointH0.position = convertPoint((t-1) * two.width, (2 * Math.pow(t-1, 3) - 3 * Math.pow(t-1, 2) + 1))
        pointH0s.position = convertPoint((t-1) * two.width, Math.pow(t-1, 3) - 2 * Math.pow(t-1, 2) +( t-1))
        pointH1.position = convertPoint((t-1) * two.width, -2 * Math.pow(t-1, 3) + 3 * Math.pow(t-1, 2))
        pointH1s.position = convertPoint((t-1) * two.width, Math.pow(t-1, 3) - Math.pow(t-1, 2))
    }
}

two.bind('update', update)
two.play()

two.update();