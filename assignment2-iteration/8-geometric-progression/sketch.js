function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  let size = 1100;

  for(let i = 1; i<50; i=i+1){

    if(i%2 == 0){
      fill(0);
    } else{
      fill(255);
    }
    
    circle(200,400,size);
    size = size/1.3;
  }
  
}