function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220)

  for(let x = 0; x<8; x=x+1){
    for(let y =0; y<8; y=y+1){
      
       if ((x + y) % 2 == 0) {
      fill(255);
    } else {
      fill(0);
    }
      rect(x*50, y*50, 50, 50);
    }
  }
  
}