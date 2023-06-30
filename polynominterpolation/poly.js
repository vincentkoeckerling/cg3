import Two from 'two.js'
import * as Mathjs from 'mathjs'


const canvasElement = document.getElementById('poly_canvas')
const two = new Two({ fitted: true }).appendTo(canvasElement)


function fillArray(number) {
    two.clear();
    let array = [];
    for (let i = 0; i < number; i++) {
        let point = new Two.Vector(Math.random() * two.width, Math.random() * (two.height * 0.7 - two.height * 0.3) + two.height * 0.3)
        array.push(point);
    }
    return array;
}


function drawCurve(array) {
    const path = two.makePath();
    path.closed = false;
    path.noFill();
    path.linewidth = 5
    path.stroke = '#408ed0';

    //Aufstellen des LGS
    var vector = [];
    var matrixArray = [];
    for (let i = 0; i < array.length; i++) {
        vector.push(array[i].y);
        var matrixArrayRow = [];
        for (let m = array.length - 1; m >= 0; m--) {
            matrixArrayRow.push(Math.pow(array[i].x, m));
        }
        matrixArray.push(matrixArrayRow);
    }

    //Berechne die Inverse und den Ergebnisvektor
    var matrix = Mathjs.matrix(matrixArray);
    var iMatrix = Mathjs.inv(matrix);
    var sol = Mathjs.multiply(iMatrix, vector);

    //Zeichne die Kurve pixelweise
    for (let x = 0; x < two.width; x++) {
        let y = 0;
        for (let p = 0; p < array.length; p++) {
            y += sol.get([p]) * Math.pow(x, array.length - (p + 1));
        }
        let pos = new Two.Vector(x, y);
        path.vertices.push(pos);
    }

    for(let k=0; k<array.length;k++){
        let point = two.makeCircle(array[k].x, array[k].y, 5);
        point.stroke = '#b5b5b5'
    }
    
    two.update();
}

function fillArrayFail(){
    two.clear();
    let p0 = new Two.Vector(403, 236)
    let p1 = new Two.Vector(159, 164)
    let p2 = new Two.Vector(102, 209)
    let p3 = new Two.Vector(377, 184)
    let p4 = new Two.Vector(470, 255)
    let p5 = new Two.Vector(282, 175)
    let p6 = new Two.Vector(543, 247)
    let p7 = new Two.Vector(533.2, 175)
    let p8 = new Two.Vector(21.4, 157.3)
    let p9 = new Two.Vector(656.67, 263.23)
    return [p0, p1, p2, p3, p4, p5, p6, p7,p8,p9];
}


var slider = document.getElementById('points');
slider.addEventListener('input', () => { drawCurve(fillArray(slider.value)) });

var newButton = document.getElementById('new');
newButton.addEventListener('click', () => {drawCurve(fillArray(slider.value))})

var newButton = document.getElementById('rootFail');
newButton.addEventListener('click', () => {drawCurve(fillArrayFail(slider.value))})

drawCurve(fillArray(slider.value))

// Don’t forget to tell two to draw everything to the screen
two.update();