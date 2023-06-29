import Two from 'two.js'
import * as Mathjs from 'mathjs'


const canvasElement = document.getElementById('canvas')
const two = new Two({ fitted: true }).appendTo(canvasElement)

const path = two.makePath();
path.closed = false;
path.noFill();


function fillArray(number){
    let array = [];
    for(let i = 0; i<number; i++){
        array.push(two.makeCircle(Math.random() * two.width, Math.random() * (two.height*0.7-two.height*0.3)+two.height*0.3, 5));
    }
    return array;
}


function drawCurve(array) {
    //Aufstellen des LGS
    var vector = [];
    var matrixArray = [];
    for (let i = 0; i < array.length; i++) {
        vector.push(array[i].position.y);
        var matrixArrayRow = [];
        for (let m = array.length - 1; m >= 0; m--) {
            matrixArrayRow.push(Math.pow(array[i].position.x, m));
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
}

drawCurve(fillArray(4));

// Don’t forget to tell two to draw everything to the screen
two.update();