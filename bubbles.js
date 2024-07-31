let bubblesExp = [];

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-container-experience'); // Attach the canvas to the p5-container-experience div
    frameRate(30); // Adjust frame rate as needed

    // Create bubbles
    for (let i = 0; i < 50; i++) { // Adjust the number of bubbles as needed
        bubblesExp.push(new BubblesClass());
    }
}

function draw() {
    clear(); // Clears the canvas and makes it transparent

    // Update and display bubbles
    for (let bubble of bubblesExp) {
        bubble.update();
        bubble.display();
    }
}

// Bubbles class
class BubblesClass {
    constructor() {
        this.x = random(width); // Initialize x position
        this.y = random(height); // Initialize y position
        this.size = random(5, 10); // Initialize size
        this.speed = random(1, 3); // Initialize speed
    }

    update() {
        this.y -= this.speed; // Move upwards by decreasing y position
        if (this.y < -this.size) { // Reset position when it moves off-screen
            this.y = height + this.size;
            this.x = random(width);
            this.size = random(5, 10); // Randomize size upon reset
            this.speed = random(1, 3); // Randomize speed upon reset
        }
    }

    display() {
        push();
        noStroke();
        fill(255, 100); // Semi-transparent white color
        ellipse(this.x, this.y, this.size, this.size); // Draw bubble
        pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
