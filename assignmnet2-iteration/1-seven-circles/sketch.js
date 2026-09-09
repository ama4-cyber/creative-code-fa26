function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  let size = 30;
  
  for(let i = 1; i < 8; i = i + 1){
    stroke(30);
    fill(220); 
    circle(i*50,100,size)
  }
}