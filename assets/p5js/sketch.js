
class Particle {
    constructor() {
        this.x = random(0, width);
        this.y = random(0, height);
        this.r = random(1, 8);
        this.xSpeed = random(-2, 2);
        this.ySpeed = random(-1, 1.5);
    }

    createParticle() {
        noStroke();
        fill('rgba(200,169,169,0.5)');
        circle(this.x, this.y, this.r);
    }

    moveParticle() {
        if (this.x < 0 || this.x > width)
            this.xSpeed *= -1;
        if (this.y < 0 || this.y > height)
            this.ySpeed *= -1;
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    joinParticles(particles) {
        particles.forEach((element,i) => {
            let dis = dist(this.x, this.y, element.x, element.y);
            if(this.id == 0){
                if (dis < 140) {
                    // stroke('rgba(255,255,255,0.4)');
                    stroke(mouseX,width,100);
                    line(this.x, this.y, element.x, element.y);
                }
            }else{
                if (dis < 70) {
                    stroke('rgba(255,255,255,0.1)');
                    line(this.x, this.y, element.x, element.y);
                }
            }
        });
    }
}

let particles = [];

function setup() {
    createCanvas(windowWidth, 300);
    // frameRate(30);
    colorMode(HSB, width, height, 100);
    for (let i = 0; i < width / 5; i++) {
        particles.push(new Particle());
    }
    particles[0].xSpeed = 0;
    particles[0].ySpeed = 0;
    particles[0].r = 10
    particles[0].id = 0;
}

function draw() {
    background('#0f0f0f');
    for (let i = 0; i < particles.length; i++) {
        particles[i].createParticle();
        particles[i].moveParticle();
        particles[i].joinParticles(particles.slice(i));
    }
    particles[0].x = mouseX;
    particles[0].y = mouseY;
}
