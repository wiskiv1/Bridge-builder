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
let gewapend_beton = {
    naam: "gewapend beton",
    density: 2400, // kg/m^3
    yield: 310264078, // N/m^2
    price: 0.35 // €/kg
}
let hout = {
    naam: "hout",
    density: 745,
    yield: 25500000,
    price: 1.30
}
let staal = {
    naam: "staal",
    density: 7850,
    yield: 260000000,
    price: 1.50
}
let hoogsterkte_staal = {
    naam: "hoog sterkte staal",
    density: 7850,
    yield: 690000000,
    price: 2.40
}

let materiaal = gewapend_beton;

let toneelmeester = new Scene_manager();
toneelmeester.addScene(new bridge_scene());
toneelmeester.addScene(new designer_scene());
toneelmeester.addScene(new intro_scene());

function preload() {
    toneelmeester.preload();
}

function setup() {
    createCanvas(800,600);

    toneelmeester.setActiveScene(1);
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