/*
hoeveel px is 1 m in dit spel?
Fuck it we pakken dat Europabrug => die is 55,8 m => 10px per m => 558px (dan hebben we plaats aan de zijkant voor de overs)
*/

// Simuleer code
/*
let achtergrond = null;
let voorgrond = null;
let brug_kapot = null;
function preload() {
    achtergrond = loadImage("/Assets/achtergrond.png");
    voorgrond = loadImage("/Assets/voorgrond.png");
    brug_kapot = loadImage("/Assets/kapot.png");
}

let profiel = null;
let balk = null;
let truck = null;

let succes = false; // werkt de brug?

let aantal_vrachtwagens = 2;
function setup() {
    createCanvas(800,600);

    profiel = new profile();
    profiel.addObject(new rect_object(100, 100, 100, 20));
    profiel.addObject(new rect_object(140, 120, 20, 100));
    profiel.addObject(new rect_object(100, 220, 100, 20));

    balk = new beam(121, 398, 558, 25, profiel);
    balk.setStyle({
        fill: [143, 147, 143],
        strokeWeight: 0
    });
    
    balk.addLoad(500000 * aantal_vrachtwagens, 279); // camion van 50 ton

    succes = balk.simulate();

    truck = new rect_object(0, 380, 30, 18);
    truck.setStyle({
        fill: [102, 0, 204],
        strokeWeight: 0,
    });
}


function draw() {
    background(51);

    push();
    image(achtergrond, 0, 0);

    if (succes) {
        balk.show();
        truck.show();
        if (truck.posX < width - 35) {
            truck.posX += 1;
        }
    } else {
        if (truck.posX < width/2 - 15) {
            balk.show();
            truck.show();
            truck.posX += 1;
        } else {
            push();
            image(brug_kapot, 0, 0);
            truck.posY = 525;
            truck.show();
            fill(255, 0, 0);
            textSize(25);
            textAlign(CENTER, CENTER);
            textFont("consolas");
            text("BRUG KAPOT \n druk op F5 om opnieuw te proberen", width/2, height/2);
            pop();
        }
    }

    image(voorgrond, 0, 0);
    pop();

}
*/

// profiel editor code -------------------------------------------------------------------------
let beginX = 0;
let beginY = 0;

let vierkant = null;
let objects = [];

let profiel = null;

let graphics = null;
function setup() {
    createCanvas(800, 600);

    vierkant = new square_object(10, 10, 50);
    // vierkant.setStyle({
    //     stroke: [0, 0, 0],
    //     strokeWeight: 1,
    //     fill: [255, 255, 255]
    // });

    graphics = createGraphics(800, 600);

    profiel = new profile();
}

//Dingen tekenen

function draw() {
    background(52);
    
    vierkant.show();

    for (i of objects) {
        i.show();
    }

    if (mouseIsPressed) {
        graphics.stroke(255);
        graphics.strokeWeight(5)
        graphics.line(mouseX, mouseY, beginX, beginY);
        beginX = mouseX;
        beginY = mouseY;
    }
    
    image(graphics, 0, 0);

    line(0, profiel.y, 800, profiel.y);
}

function mousePressed() {
    beginX = mouseX;
    beginY = mouseY;
}

function mouseClicked() {
    //objects.push(new rect_object(beginX, beginY, mouseX - beginX, mouseY - beginY));
    //profiel.addObject(new rect_object(beginX, beginY, mouseX - beginX, mouseY - beginY));
}

// balk code ------------------------------------------------------------------------------
/*
let balk = null;
let profiel = null;


function setup() {
    createCanvas(800,600);

    profiel = new profile();
    profiel.addObject(new rect_object(100, 100, 100, 20));
    profiel.addObject(new rect_object(140, 120, 20, 100));
    profiel.addObject(new rect_object(100, 220, 100, 20));

    balk = new beam(121, 300, 558, 25, profiel);
    noLoop();
}

function draw() {
    background(51);

    balk.show();

    balk.addLoad(100000, 279);
}
*/

/*
// Profiel Code -------------------------------------------------------------------------
let beginX = 0;
let beginY = 0;

let vierkant = null;
let objects = [];

let profiel = null;

function setup() {
    createCanvas(800, 600);

    vierkant = new square_object(10, 10, 50);
    // vierkant.setStyle({
    //     stroke: [0, 0, 0],
    //     strokeWeight: 1,
    //     fill: [255, 255, 255]
    // });

    profiel = new profile();
}

//Dingen tekenen

function draw() {
    background(52);
    
    vierkant.show();

    for (i of objects) {
        i.show();
    }

    if (mouseIsPressed) {
        rect(beginX, beginY, mouseX - beginX, mouseY - beginY);
        line(beginX, beginY, mouseX, mouseY);
    }
    
    line(0, profiel.y, 800, profiel.y);
}

function mousePressed() {
    beginX = mouseX;
    beginY = mouseY;
}

function mouseClicked() {
    objects.push(new rect_object(beginX, beginY, mouseX - beginX, mouseY - beginY));
    profiel.addObject(new rect_object(beginX, beginY, mouseX - beginX, mouseY - beginY));
}
*/