/*
hoeveel px is 1 m in dit spel?
Fuck it we pakken dat europabrug => die is 55,8 m => 10px per m => 558px (dan hebben we plaats aan de zeikant voor de overs)
*/


// balk code

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

    balk.addLoad(100, 279);
}


/*
// Profiel Code
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