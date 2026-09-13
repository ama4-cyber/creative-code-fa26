function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  for(let i=1; i <15; i = i+1){
    
    fill(i*17);
    rect(i*25,380-i*25,40,i*25);
  }

}