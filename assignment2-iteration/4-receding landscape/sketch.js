function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  let size = 10;
  
  for(let i =1; i < 100; i = i+1){
    line(i*10,400,10+i*5,0);
  }
  
}