function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  for(let i= 1; i <8; i= i+1)
    line(10, 400-i*30 ,(10-i)*40, 390)
}