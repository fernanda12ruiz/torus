let pg;
let ft;

let xspacing = 20;
let w;
let theta = 0.0;
let amplitude = 100.0;
let period = 400.0;
let dx;
let yvalues;

let slider;
let radiSlider;
let input;
let mobileText;

let contents = "";
let contentHolder = [];
let tecla;

function preload(){
	ft = loadFont('BlenderPro-Heavy.otf');
}

function setup() {
	createCanvas(600, 600, WEBGL);
  pg = createGraphics(600, 600);

	slider = createSlider(-.75,.75,0,.05);
	slider.class('rotation');

	radiSlider = createSlider(60,120,90,.01);
	radiSlider.class('radi');

	mobileText = createP('Click and Type');
	mobileText.class('click');

	input = createInput();

	w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
}

function draw() {
  background(0);
  pg.background(0);

	theta += 0.02;

	let x = theta;
	for (let i = 0; i < yvalues.length; i++) {
		yvalues[i] = sin(x) * amplitude;
		x += dx;
	}

	pg.noStroke();
	pg.textFont(ft);
	pg.textSize(20);

	let char = input.value();

	for (let x = 0; x < contentHolder.length; x++) {
		for(let y = 0; y < height; y+=24){
			pg.fill(255);

			if(displayWidth >= 1024 || windowWidth >= 1024){
				pg.text(contentHolder[x], x * xspacing, y + (height / 2 + yvalues[x]) - 450);
			} else {
				pg.text(char.substring(x,x+1), x * xspacing, y + (height / 2 + yvalues[x]) - 450);
			}
		}

	}

	ambientLight(255);
	directionalLight(0,0,0,1,1,1);
  texture(pg);
	rotateY(slider.value());
	torus(120,radiSlider.value(),96,96);
}

function keyTyped() {
	tecla = key;
  contents += key;
	contentHolder.push(tecla);
}

function keyPressed() {
  if (keyCode === BACKSPACE || keyCode === DELETE) {
    contentHolder.splice(contentHolder.length - 1,1);
  } else if(contentHolder.length > 29){
		contentHolder.splice(0,1);
	}
}

// function mousePressed(){
// 	mobileText.remove();
// }
