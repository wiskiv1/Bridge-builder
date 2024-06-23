let profiel = null;
let balk = null;
let lasten = [
    [500000, 279],
    [500000, 279],
    [500000, 279],
    [500000, 279],
    [500000, 279],
    [500000, 279],
];

let toneelmeester = new Scene_manager();
toneelmeester.addScene(new bridge_scene());
toneelmeester.addScene(new designer_scene());
toneelmeester.addScene(new intro_scene());

function preload() {
    toneelmeester.preload();
}

function setup() {
    createCanvas(800,600);

    toneelmeester.setActiveScene(2);
}

function draw() {
    toneelmeester.show();
}

function mouseClicked() {
    toneelmeester.mouseClicked();
}

function mousePressed() {
    toneelmeester.mousePressed();
}