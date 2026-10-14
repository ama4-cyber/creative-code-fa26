let bg;
let angle = 0;
let isPlaying = false;
let song;
let particles = [];

async function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = await loadImage("bg16.jpg");
  song = await loadSound("2.mp3");
  angleMode(RADIANS);
}

function draw() {
  // bg
  let s = max(width / bg.width, height / bg.height);
  let w = bg.width * s;
  let h = bg.height * s;
  image(bg, (width - w) / 2, (height - h) / 2, w, h);

  // bg2
  rectMode(CORNER);
  noStroke();
  fill(0, 0, 0, 40);
  rect(0, 0, width, height);

  //  cd position
  let x = width - 200;
  let y = 140;

  // particles behind 
  if (isPlaying && frameCount % 40 == 0) {
    let a = random(TWO_PI);
    let r = random(200, 450);
    explode(width / 2 + cos(a) * r, height / 2 + sin(a) * r, 50);
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    particles[i].update();

    if (particles[i].dead == true) {
      particles.splice(i, 1);
      i--;
    }
  }

  // CD 
  push();
  translate(x, y);
  rotate(angle);

  // cd outside
  stroke(200);
  strokeWeight(1);
  fill(240);
  ellipse(0, 0, 300, 300);

  // cd inside
  noFill();
  stroke(255);
  strokeWeight(0.5);
  ellipse(0, 0, 280, 280);
  ellipse(0, 0, 240, 240);
  ellipse(0, 0, 200, 200);
  ellipse(0, 0, 140, 140);

  stroke(200, 100);
  ellipse(0, 0, 260, 260);
  ellipse(0, 0, 180, 180);

  // cd line up
  stroke(290);
  strokeWeight(1.5);
  line(0, -150, 0, 150);
  // cd line down
  stroke(290);
  line(-150, 0, 150, 0);

  // cd details
  fill(255, 255, 255, 190);
  ellipse(0, 0, 90, 90);

  stroke(210);
  strokeWeight(1);
  noFill();
  ellipse(0, 0, 75, 75);
  ellipse(0, 0, 45, 45);

  // cd ring
  noStroke();
  fill(0, 0, 0, 25);
  ellipse(0, 0, 35, 35);

  pop();

  if (isPlaying) {
    angle += 0.05;
  }

  // panel
  let panelX = x;
  let panelY = y + 230;

  // panel out
  stroke(210);
  strokeWeight(2);
  fill(230);
  rectMode(CENTER);
  rect(panelX, panelY, 420, 140, 70);

  // wheel
  let wheelX = panelX - 120;
  stroke(200);
  strokeWeight(2);
  fill(245);
  ellipse(wheelX, panelY, 110, 110);

  // wheel c
  fill(235);
  ellipse(wheelX, panelY, 50, 50);

  // wheel in
  fill(120);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);

  // +,-
  text("+", wheelX, panelY - 36);
  text("-", wheelX, panelY + 36);

  // play, pause
  if (isPlaying) {
    rect(wheelX - 4, panelY, 4, 16);
    rect(wheelX + 4, panelY, 4, 16);
  } else {
    triangle(wheelX - 6, panelY - 8, wheelX - 6, panelY + 8, wheelX + 8, panelY);
  }

  // next L
  triangle(wheelX - 38, panelY, wheelX - 30, panelY - 7, wheelX - 30, panelY + 7);
  triangle(wheelX - 47, panelY, wheelX - 39, panelY - 7, wheelX - 39, panelY + 7);

  // next R
  triangle(wheelX + 38, panelY, wheelX + 30, panelY - 7, wheelX + 30, panelY + 7);
  triangle(wheelX + 47, panelY, wheelX + 39, panelY - 7, wheelX + 39, panelY + 7);

  // info
  let displayX = panelX + 70;

  // bk
  stroke(216);
  strokeWeight(1.5);
  fill(242);
  rect(displayX, panelY, 220, 110, 45);

  // song name
  noStroke();
  fill(80);
  textSize(15);
  text("Sparkle", displayX, panelY - 25);

  // play bar
  stroke(180);
  strokeWeight(3);
  line(displayX - 70, panelY + 5, displayX + 70, panelY + 5);

  noStroke();
  fill(150);
  ellipse(displayX - 20, panelY + 5, 8, 8);

  // time
  textSize(12);
  fill(100);
  text("1:38", displayX, panelY + 28);
}

function mousePressed() {
  userStartAudio();

  // ★ draw와 동일한 기준 위치 설정
  let cdX = width - 200;
  let cdY = 140;
  let wheelX = cdX - 120;
  let wheelY = cdY + 230;
  let clicked = false;

  // cd click
  if (dist(mouseX, mouseY, cdX, cdY) < 150) {
    clicked = true;
  }

  // panel wheel click
  if (dist(mouseX, mouseY, wheelX, wheelY) < 25) {
    clicked = true;
  }

  if (clicked) {
    isPlaying = !isPlaying;

    if (isPlaying) {
      explode(width / 2, height / 2, 120);
    }

    if (song) {
      if (isPlaying) {
        song.play();
      } else {
        song.pause();
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// particles
function explode(x, y, n) {
  for (let i = 0; i < n; i++) {
    particles.push(new Particle(x, y));
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);

    let a = random(TWO_PI);
    let speed = random(8, 25);
    this.vel = createVector(cos(a) * speed, sin(a) * speed);
    this.acc = createVector(0, 0.03);

    let pick = random(1);
    if (pick < 0.2) {
      this.fill = color(0, 240, 255);
    } else if (pick < 0.4) {
      this.fill = color(255, 150, 240);
    } else if (pick < 0.6) {
      this.fill = color(160, 180, 255);
    } else if (pick < 0.8) {
      this.fill = color(220, 250, 255);
    } else {
      this.fill = color(255, 215, 245);
    }

    let s = random(1);
    if (s < 0.4) {
      this.shape = 0;
    } else if (s < 0.7) {
      this.shape = 1;
    } else if (s < 0.85) {
      this.shape = 2;
    } else {
      this.shape = 3;
    }

    this.age = random(150, 255);
    this.baseSize = random(12, 36);
    this.size = this.baseSize;
    this.angle = random(TWO_PI);
    this.spin = random(-0.15, 0.15);
    this.dead = false;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.mult(0.985);
    this.pos.add(this.vel);
    this.angle += this.spin;

    if (this.age > 0) {
      this.age -= 2;
      this.size = this.baseSize * (this.age / 255) + 4;
    } else {
      this.dead = true;
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    noStroke();
    blendMode(SCREEN);

    this.fill.setAlpha(this.age * 0.15);
    fill(this.fill);
    circle(0, 0, this.size * 2);

    this.fill.setAlpha(this.age);
    fill(this.fill);

    if (this.shape == 0) {
      ellipse(0, 0, this.size * 1.6, this.size * 0.3);
      rotate(PI / 2);
      ellipse(0, 0, this.size * 1.6, this.size * 0.3);
    } else if (this.shape == 1) {
      circle(0, 0, this.size);
      fill(255, 255, 255, this.age);
      circle(-this.size * 0.15, -this.size * 0.15, this.size * 0.3);
    } else if (this.shape == 2) {
      circle(0, 0, this.size);
    } else {
      noFill();
      stroke(this.fill);
      strokeWeight(3);
      circle(0, 0, this.size);
    }
    pop();
  }
}