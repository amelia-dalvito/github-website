let jellyfish1;
let jellyfish2;
let jellyfish3;
let jellyfish4;

let bubbles = [];
let buttonClicked = false; //disco button


function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-container'); // Attach the canvas to the p5-container div
    frameRate(300);

    //jellyfish setup
    jellyfish1 = new Jellyfish();
    jellyfish2 = new Jellyfish();
    jellyfish3 = new Jellyfish();
    jellyfish4 = new Jellyfish();

    // Create bubbles
    for (let i = 0; i < 50; i++) { // Adjust the number of bubbles as needed
        bubbles.push(new Bubbles());
    }

    // Disco mode button set-up
    const button = select('#corner-button');
    button.mousePressed(handleButtonClick);

}
//DISCO function ---
function handleButtonClick() {
    buttonClicked = !buttonClicked; // Toggle the flag
    jellyfish1.discoMode = buttonClicked;
    jellyfish2.discoMode = buttonClicked;
    jellyfish3.discoMode = buttonClicked;
    jellyfish4.discoMode = buttonClicked;
}// end of function

function draw() {
    clear(); // Clears the canvas and makes it transparent

    //Disco Mode----
    if (buttonClicked) {
        for (let x = 0; x <= width; x += 50) {
            for (let y = 0; y <= height; y += 50) {
                fill(random(255), 100, random(255), 50);
                ellipse(x, y, 25, 25);
                noStroke();
            }
        }
    }

    //Jellyfish ----
    jellyfish1.update();
    jellyfish1.display();

    jellyfish2.update();
    jellyfish2.display();

    jellyfish3.update();
    jellyfish3.display();

    jellyfish4.update();
    jellyfish4.display();

    // Update and display bubbles
    for (let bubble of bubbles) {
        bubble.update();
        bubble.display();
    }

}// end of draw

//BUBBLES CLASS---------------
class Bubbles {
    constructor() {
        this.x = random(width); // Initialize x position
        this.y = random(height); // Initialize y position
        this.size = random(5, 10); // Initialize size
        this.speed = random(1, 2); // Initialize bubble speed range 
    }

    update() {
        this.y -= this.speed; // Move upwards by decreasing y position
        
        if (this.y < -this.size) { // Reset position when it moves off-screen
            this.y = height + this.size;
            this.x = random(width);
            //this.size = random(5, 10); // Randomize size upon reset
            //this.speed = random(1, 3); // Randomize speed upon reset
        }
    }//end of update for bubbles class 

    display() {
        push();
        noStroke();
        fill(255, 100); // Semi-transparent white color
        ellipse(this.x, this.y, this.size, this.size); // Draw bubble
        pop();
    }//end of display for bubbles class 
}

//JELLYFISH CLASS------------
class Jellyfish {
    constructor() {
        this.i = 0;
        this.x = random(-width / 2, width / 2); // Initialize x position
        this.y = random(height - 50, -height); // Initialize y position to start from the bottom
        this.speed = random(2, .2);
        this.discoMode = false; // checks if this mode is on
    }//end of constructor 

    update() { // updates canvas
        this.i++;
        // Changes speed for disco mode
        if (this.discoMode) {
            this.y -= this.speed * 2;
        }
        else {
            this.y -= this.speed; // Move upwards by decreasing y position
        }
        if (this.y < -500) { // Reset position when it moves off-screen
            this.y = height - 50;
            this.x = random(-width / 2, width / 2)
        }
    }// end of update-----

    display() {
        stroke(255, 20);
        strokeWeight(1);
        noFill();

        //might not need the push?
        push(); // Save the current drawing style settings and transformations
        translate(this.x, this.y); // Move the canvas to the jellyfish's position

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 200 * noise(this.i / 300) + 100;
        const radius2 = 20 * noise(this.i / 300) + 20;

        translate(0, -250);// why am I translating here????, was -150

        // DISCO MODE--------------------
        if (this.discoMode) {
            stroke(random(255), random(255), random(255), random(255));
        }
        // Draw first set of shapes
        for (let angle = 1; angle <= 360; angle += 0.6) { //change .2 to make it faster, was .6 og
            const x = centerX + radius * cos(radians(angle));
            const y = centerY + radius * sin(radians(angle)) + (200 - noise(radians(angle), this.i / 100) * 400);
            const noiseStrokeR = noise(radians(angle));
            const noiseStrokeG = noise(this.i / 100);
            const noiseStrokeB = noise(radians(angle), this.i / 100);
            const increase1 = 10;//color increase for the stroke, origionally 10 and 40
            const increase2 = 40;
            if (this.discoMode == false) {
                stroke(
                    Math.round(255 * noiseStrokeR + increase1),
                    Math.round(120 * noiseStrokeB + increase2),
                    Math.round(255 * noiseStrokeG),
                    60
                );
            }

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
            const increase1 = 10;//color increase for the stroke, origionally 10 and 40
            const increase2 = 40;
            if (this.discoMode == false) {
                stroke(
                    Math.round(255 * noiseStrokeR + increase1),
                    Math.round(120 * noiseStrokeB + increase2),
                    Math.round(255 * noiseStrokeG),
                    120
                );
            }

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
    }//end of display function
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
