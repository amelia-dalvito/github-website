let jellyfishArray = [];
const numJellyfish = 10; // Number of jellyfish to create

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-container'); // Attach the canvas to the p5-container div
  frameRate(60);

  // Initialize an array of jellyfish with random properties
  for (let i = 0; i < numJellyfish; i++) {
    jellyfishArray.push(new Jellyfish());
  }
}

function draw() {
  clear(); // Clears the canvas and makes it transparent

  // Update and display all jellyfish in the array
  for (const jellyfish of jellyfishArray) {
    jellyfish.update();
    jellyfish.display();
  }
}

class Jellyfish {
  constructor() {
    this.i = 0;
    this.x = random(-width / 2, width / 2); // Initialize x position
    this.y = random(height, -height); // Initialize y position to start from the bottom
    this.speed = random(0.5, 3); // Random speed
    this.size = random(0.5, 1.5); // Random size multiplier
    this.r = random(100, 255); // Random red color component
    this.g = random(100, 255); // Random green color component
    this.b = random(100, 255); // Random blue color component
  }

  update() {
    this.i++;
    this.y -= this.speed; // Move upwards by decreasing y position
    if (this.y < -500) { // Reset position when it moves off-screen
      this.y = height - 50;
      this.x = random(-width / 2, width / 2);
      this.speed = random(0.5, 3); // Randomize speed on reset
      this.size = random(0.5, 1.5); // Randomize size on reset
    }
  }

  display() {
    stroke(255, 20);
    strokeWeight(1);
    noFill();

    push(); // Save the current drawing style settings and transformations
    translate(this.x, this.y); // Move the canvas to the jellyfish's position

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = (200 * noise(this.i / 300) + 100) * this.size;
    const radius2 = (20 * noise(this.i / 300) + 20) * this.size;
    strokeWeight(1);
    translate(0, -150);

    // Draw first set of shapes
    for (let angle = 1; angle <= 360; angle += 0.2) {
      const x = centerX + radius * cos(radians(angle));
      const y = centerY + radius * sin(radians(angle)) + (200 - noise(radians(angle), this.i / 100) * 400);
      const noiseStrokeR = noise(radians(angle));
      const noiseStrokeG = noise(this.i / 100);
      const noiseStrokeB = noise(radians(angle), this.i / 100);
      stroke(
        Math.round(this.r * noiseStrokeR + 10),
        Math.round(this.g * noiseStrokeB + 40),
        Math.round(this.b * noiseStrokeG),
        60
      );
      beginShape();
      const noiseY = noise(radius / 100) * 100;
      const noiseY2 = 50 - noise(radius / 100, this.i / 120) * 100;
      const noiseX = 500 - noise(radians(angle), this.i / 120) * 1000;
      curveVertex(centerX, centerY + 200);
      curveVertex(centerX, centerY - 120 + noiseY);
      curveVertex(x, y / 10 + 500 + noiseY2);
      curveVertex(x + noiseX, y / 10 + 1000);
      endShape();
    }

    // Draw second set of shapes
    for (let angle = 1; angle <= 360; angle += 20) {
      const x = centerX + radius2 * 3 * cos(radians(angle));
      const x2 = centerX + (radius2 / 2) * cos(radians(angle));
      const y = centerY + radius2 * sin(radians(angle));
      const noiseStrokeR = noise(angle / 200);
      const noiseStrokeG = noise(this.i / 100);
      const noiseStrokeB = noise(angle / 200, this.i / 100);
      stroke(
        Math.round(this.r * noiseStrokeR + 10),
        Math.round(this.g * noiseStrokeB + 40),
        Math.round(this.b * noiseStrokeG),
        120
      );
      strokeWeight(2);
      beginShape();
      const noiseY = noise(radius / 100) * 100;
      const noiseY2 = 50 - noise(this.i / 200, angle) * 100;
      const noiseX = 1000 - noise(radians(angle), this.i / 200) * 2000;
      const noiseX2 = 100 - noise(radians(360 - angle), this.i / 200) * 200;
      curveVertex(x2, centerY + 200);
      curveVertex(x2, centerY - 120 + noiseY);
      curveVertex(x + noiseX2, y / 1.1 + 500 + noiseY2);
      curveVertex(x + noiseX, y / 10 + 1000);
      endShape();
    }

    pop(); // Restore the previous drawing style settings and transformations
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
