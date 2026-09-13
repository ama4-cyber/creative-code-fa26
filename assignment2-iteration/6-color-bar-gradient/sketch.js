let s = 255; // start
let e = 15; // end

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  for(let i=1; i <18; i = i+1){
    
    fill(s, s-i*19, i*e);
    rect(i*21, 10, 23, 380);
  }
}
 function mouseClicked(){
  s = random(255);
  e = random(255);
   
}