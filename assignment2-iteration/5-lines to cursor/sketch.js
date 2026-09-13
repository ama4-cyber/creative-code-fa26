function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  let size = 10;
  
  for(let i =1; i < 10; i = i+1){
    line(mouseX,mouseY,200+i*10,100);
  }
  
}