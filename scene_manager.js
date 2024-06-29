class Scene_manager {
    #scenes = []
    #active_scene = null;

    constructor() {

    }

    addScene(s) {
        if (s instanceof Scene) {
            this.#scenes.push(s);
        } else {
            console.log("Given object is not a scene");
        }
    }

    setActiveScene(n) {
        console.log("Loading scene %d", n);
        this.#active_scene = this.#scenes[n];
        this.#active_scene.setup();
    }

    preload() {
        for (let s of this.#scenes) {
            s.preload();
        }
    }

    show() {
        this.#active_scene.draw();
    }

    mouseClicked() {
        this.#active_scene.mouseClicked();
    }

    mousePressed() {
        this.#active_scene.mousePressed();
    }
}
class Scene {
    constructor() {

    }

    preload() {}

    setup() {}

    draw() {}

    mouseClicked() {}

    mousePressed() {}
}

class bridge_scene extends Scene {
    constructor() {
        super()
    }

    achtergrond = null;
    voorgrond = null;
    brug_kapot = null;
    preload() {
        this.achtergrond = loadImage("Assets/achtergrond.png");
        this.voorgrond = loadImage("Assets/voorgrond.png");
        this.brug_kapot = loadImage("Assets/kapot.png");
    }
    
    succes = false;
    truck = null;
    done = false;
    setup() {
        if (profiel.getArea() == 0) { // for testing
            console.log("loading standard beam profile");
            profiel = new profile();
            profiel.addObject(new rect_object(100, 100, 100, 20));
            profiel.addObject(new rect_object(140, 120, 20, 100));
            profiel.addObject(new rect_object(100, 220, 100, 20));
        }

        balk = new beam(121, 398, 558, 25, profiel); // create the bridge
        balk.setStyle({
        fill: [143, 147, 143],
        strokeWeight: 0
        });
        
        for (let i = 0; i < lasten.length; i++) { // add the desire loads
            balk.addLoad(lasten[i][0], lasten[i][1]);
        }

        this.succes = balk.simulate();

        this.truck = new rect_object(0, 380, 30, 18); // todo, hiervan een echte camion of auto maken
        this.truck.setStyle({
            fill: [102, 0, 204],
            strokeWeight: 0,
        });

        this.done = false; // wordt true wanneer de simulatie gedaan is en de speler opnieuw mag proberen
    }

    draw() {
        push();
        image(this.achtergrond, 0, 0);

        if (this.succes) { // bridge succeeds
            balk.show();
            this.truck.show();
            if (this.truck.posX < width - 35) {
                this.truck.posX += 1;
            }

            // tension graph
            if (this.truck.posX > balk.posX && this.truck.posX < balk.posX + balk.length) {
                image(balk.tension_graph, balk.posX, balk.posY, this.truck.posX - balk.posX + 15, balk.height, 0, 0, this.truck.posX - balk.posX + 15, balk.height);
            } else if (this.truck.posX > balk.posX + balk.length) {
                image(balk.tension_graph, balk.posX, balk.posY);
            }

            if (this.truck.posX >= width - 35) { //
                push();
                fill(0, 255, 0);
                textSize(25);
                textAlign(CENTER, CENTER);
                textFont("consolas");
                text("GEFELICITEERD \n Je burg is sterk genoeg! \n klik om opnieuw te proberen", width/2, height/2);
                this.done = true;
                pop();
            }

        } else { // bridg fails
            if (this.truck.posX < width/2 - 15) {
                balk.show();
                this.truck.show();
                this.truck.posX += 1;
                if (this.truck.posX > balk.posX && this.truck.posX < balk.posX + balk.length) {
                    image(balk.tension_graph, balk.posX, balk.posY, this.truck.posX - balk.posX + 15, balk.height, 0, 0, this.truck.posX - balk.posX + 15, balk.height);
                }

            } else {
            push();
                image(this.brug_kapot, 0, 0);
                this.truck.posY = 525;
                this.truck.show();
                fill(255, 0, 0);
                textSize(25);
                textAlign(CENTER, CENTER);
                textFont("consolas");
                text("BRUG KAPOT \n klik om opnieuw te proberen", width/2, height/2);
                this.done = true;
            pop();
            }
        }

        image(this.voorgrond, 0, 0, );
        pop();
    }

    mouseClicked() {
        if (this.done && !this.succes) { //done but failes
            toneelmeester.setActiveScene(1);
        } else if (this.done && this.succes) { // done but succeeds
            toneelmeester.setActiveScene(2);
        }
    }
}

class designer_scene extends Scene {
    constructor() {
        super()
    }

    overlay = null;
    setup() {
        profiel = new profile();
        
        this.overlay = createGraphics(width, height);
        this.create_overlay();
    }

    beginX = 0;
    beginY = 0;
    draw() {
        push();
        background(51);

        profiel.show();

        if (mouseIsPressed) {
            rect(this.beginX, this.beginY, mouseX - this.beginX, mouseY - this.beginY);
            line(this.beginX, this.beginY, mouseX, mouseY);
        }

        image(this.overlay, 0, 0);
        pop();
    }

    create_overlay() {
        this.overlay.push();
        //border
        this.overlay.fill(91);
        this.overlay.noStroke();
        this.overlay.rect(0, 0, 800, 45);
        this.overlay.rect(0, 525, 800, 75);
        this.overlay.rect(0, 45, 120, 480);
        this.overlay.rect(785, 45, 15, 480);
        this.overlay.fill(0, 0);
        this.overlay.stroke(0);
        this.overlay.rect(120, 45, 665, 480);
        this.overlay.noStroke();

        this.overlay.textSize(30);
        this.overlay.textAlign(CENTER);
        this.overlay.textFont("consolas");
        this.overlay.fill(255);
        this.overlay.text("Ontwerp het profiel van de brug", width/2, 30);

        //Butons
        this.overlay.textSize(20);
        this.overlay.textAlign(LEFT, CENTER);
        //done button
        this.overlay.fill(51);
        this.overlay.rect(710, 10, 75, 30);
        this.overlay.fill(255);
        this.overlay.text("Done", 720, 25);

        // TODO ALLE ANDERE BUTTONS

        this.overlay.pop();
    }

    mouseClicked() {
        if (mouseX > 120 && mouseX < 785 && mouseY > 45 && mouseY < 525) { // 120, 45, 665, 480
            profiel.addObject(new rect_object(this.beginX, this.beginY, mouseX - this.beginX, mouseY - this.beginY));
        }

        //Buttons
        if (mouseX > 710 && mouseX < 785 && mouseY > 10 && mouseY < 40) { // done button
            toneelmeester.setActiveScene(0);
        }
    }

    mousePressed() {
        this.beginX = mouseX;
        this.beginY = mouseY;
    }
}

class intro_scene extends Scene {
    constructor() {
        super()
    }

    achtergrond = null;
    kapot = null;
    voorgrond = null;
    preload() {
        this.achtergrond = loadImage("Assets/achtergrond.png");
        this.kapot = loadImage("Assets/kapot.png");
        this.voorgrond = loadImage("Assets/voorgrond.png");
    }

    setup() {
        image(this.achtergrond, 0, 0);
        image(this.kapot, 0, 0);
        image(this.voorgrond, 0, 0);
        background(51, 160);
        
        push();
        //Bridge builder Logo
        fill(255);
        textFont("consolas");
        textAlign(CENTER, CENTER);
        textSize(40);
        textStyle(BOLD);
        text("BRIDGE DESIGNER", width/2, height/4);

        textSize(20);
        textStyle(NORMAL);
        textAlign(CENTER);
        text("OH NEE! \n Er is een containerschip tegen de Europabrug gevaren", width/2, height/2.5);
        text("Kan jij ons helpen een nieuwe brug te ontwerpen?", width/2, height/2.5 + 40);

        noStroke();
        fill(0, 100);
        rect(width/2 - 60, height/2 + 20, 120, 40);
        fill(255);
        textAlign(CENTER, CENTER);
        text("Nou en of!", width/2, height/2 + 40);
        pop();
    }

    mouseClicked() {
        if (mouseX > width/2 - 60 && mouseX < width/2 + 60 && mouseY > height/2 + 20 && mouseY < height/2 + 60)  {
            toneelmeester.setActiveScene(1);
        }
    }
}