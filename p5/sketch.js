var canvas;
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// var inc = 0.1;
// var scl = 10;
// var cols, rows;

// var zoff = 0;

// var fr;

// var particles = [];

// var flowfield;

// function setup() {
// canvas = createCanvas(windowWidth, windowHeight);
// canvas.position(0, 0);
// canvas.style('z-index', '-1');
//     cols = floor(width / scl);
//     rows = floor(height / scl);
//     fr = createP('');

//     flowfield = new Array(cols * rows);

//     for (var i = 0; i < 300; i++) {
//         particles[i] = new Particle();
//     }
//     background(255);
// }

// function draw() {
//     var yoff = 0;
//     for (var y = 0; y < rows; y++) {
//         var xoff = 0;
//         for (var x = 0; x < cols; x++) {
//             var index = x + y * cols;
//             var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
//             var v = p5.Vector.fromAngle(angle);
//             v.setMag(1);
//             flowfield[index] = v;
//             xoff += inc;
//             stroke(0, 50);
//         }
//         yoff += inc;

//         zoff += 0.0003;
//     }

//     for (var i = 0; i < particles.length; i++) {
//         particles[i].follow(flowfield);
//         particles[i].update();
//         particles[i].edges();
//         particles[i].show();
//     }
// }

let particles = [];
const num = 1100;

const noiseScale = 0.001;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    for (let i = 0; i < num; i++) {
        particles.push(createVector(random(width), random(height)));
    }

    stroke(255);
    // For a cool effect try uncommenting this line
    // And comment out the background() line in draw
    // stroke(255, 10);
}

function draw() {
    background(0, 10);
    for (let i = 0; i < num; i++) {
        let p = particles[i];
        point(p.x, p.y);
        let n = noise(p.x * noiseScale, p.y * noiseScale);
        let a = TAU * n;
        p.x += cos(a);
        p.y += sin(a);
        if (!onScreen(p)) {
            p.x = random(width);
            p.y = random(height);
        }
    }
}

function mouseReleased() {
    noiseSeed(millis());
}

function onScreen(v) {
    return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}