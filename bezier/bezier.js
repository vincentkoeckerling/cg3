// import * as THREE from 'three';

// const canvasElement = document.getElementById('canvas')

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( canvasElement.clientWidth, canvasElement.clientHeight );
// canvasElement.appendChild( renderer.domElement );

// const width = 100
// const height = 100

// const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
// // const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
// camera.position.set( 0, 0, 10 );
// camera.lookAt( 0, 0, 0 );

// const scene = new THREE.Scene();

// // //create a blue LineBasicMaterial
// // const material = new THREE.LineBasicMaterial( { color: 0x00ffff } );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );


// // const points = [];
// // points.push( new THREE.Vector3( - 5, 0, 0 ) );
// // points.push( new THREE.Vector3( 0, 5, 0 ) );
// // points.push( new THREE.Vector3( 5, 0, 0 ) );

// // const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );

// // const line = new THREE.Line( lineGeometry, material );

// // const circleGeomtry = new THREE.CircleGeometry(2, 32)

// // const circle = new THREE.Mesh(circleGeomtry, material)

// // scene.add( line );
// // scene.add(circle)

// const heartShape = new THREE.Shape();

// heartShape.moveTo( 25, 25 );
// heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
// heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
// heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
// heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
// heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
// heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

// const extrudeSettings = { 
// 	depth: 8, 
// 	bevelEnabled: true, 
// 	bevelSegments: 2, 
// 	steps: 2, 
// 	bevelSize: 1, 
// 	bevelThickness: 1 
// };

// const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );

// const mesh = new THREE.Mesh( geometry, material );

// scene.add( mesh )

// renderer.render( scene, camera );

import Two from 'two.js'

const canvasElement = document.getElementById('canvas')
const two = new Two().appendTo(canvasElement)

var radius = 50;
var x = two.width * 0.5;
var y = two.height * 0.5 - radius * 1.25;
var circle = two.makeCircle(x, y, radius);

y = two.height * 0.5 + radius * 1.25;
var width = 100;
var height = 100;
var rect = two.makeRectangle(x, y, width, height);

// The object returned has many stylable properties:
circle.fill = '#FF8000';
// And accepts all valid CSS color:
circle.stroke = 'orangered';
circle.linewidth = 5;

rect.fill = 'rgb(0, 200, 255)';
rect.opacity = 0.75;
rect.noStroke();

// Don’t forget to tell two to draw everything to the screen
two.update();