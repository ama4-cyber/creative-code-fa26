let video;
let handPose;
let hands = [];
let painting;

let options = {
  flipped: true,
};

async function setup() {
  createCanvas(640, 480);
  painting = createGraphics(640, 480);

  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  handPose = await ml5.handPose(options);
  handPose.detectStart(video, gotHands);
}

function draw() {
  background(220);
  image(video, 0, 0);

  if (hands.length > 0) {
    let hand = hands[0];

    let tips = [
      hand.thumb_tip,
      hand.index_finger_tip,
      hand.middle_finger_tip,
      hand.ring_finger_tip,
      hand.pinky_finger_tip,
    ];

    for (let i = 0; i < tips.length; i++) {
      let tip = createVector(tips[i].x, tips[i].y);

      // finger tips color
      painting.noStroke();
      painting.fill(i * 60, 255 - i * 50, 150 + i * 20);
      painting.circle(tip.x, tip.y, 12);

      // finger tips
      noStroke();
      fill(i * 60, 255 - i * 50, 150 + i * 20);
      circle(tip.x, tip.y, 25);
    }
  }

  image(painting, 0, 0);
}

function gotHands(results) {
  hands = results;
}