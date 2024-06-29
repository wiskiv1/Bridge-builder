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
        super();
        profiel = new profile(); //profiel bijhouden voor revisies

        this.tool = "rect";
    }

    graphic = null;
    setup() {
        if (this.graphic == null) {
            this.graphic = createGraphics(665, 480);
            this.graphic.stroke(255);
        }
    }

    beginX = 0;
    beginY = 0;
    draw() {
        background(91);

        push();
        noStroke();
        fill(51);
        rect(120, 45, 665, 480); // draw space

        profiel.show();
        image(this.graphic, 120, 45);

        fill(255);
        if (mouseIsPressed) {
            switch (this.tool) {
                case "rect":
                    rect(this.beginX, this.beginY, mouseX - this.beginX, mouseY - this.beginY);
                    break;
                case "square":
                    square(this.beginX, this.beginY, mouseX - this.beginX);
                    break;
                case "circle":
                    let difx = mouseX - this.beginX;
                    let dify = mouseY - this.beginY;
                    let r = Math.sqrt(difx*difx + dify*dify);
                    circle(this.beginX, this.beginY, Math.round(2 * r));
                    break;
            }
        }
        pop();

        //UI
        push();
        textSize(30);
        textAlign(CENTER);
        textFont("consolas");
        fill(255);
        text("Ontwerp het profiel van de brug", width/2, 30);

        //buttons ---
        noStroke();
        textSize(20);
        textAlign(LEFT, CENTER);
        //done
        fill(51);
        rect(710, 10, 75, 30);
        fill(255);
        text("Done", 720, 25);
        //rect
        fill(51);
        rect(5, 45, 110, 30);
        fill(255);
        text("rectangle", 10, 60);
        //square
        fill(51);
        rect(5, 80, 110, 30);
        fill(255);
        text("square", 10, 95);
        //circle
        fill(51);
        rect(5, 115, 110, 30);
        fill(255);
        text("circle", 10, 130);
        
        // fill(51);
        // rect(5, 150, 110, 60);
        // fill(255);
        // text("", 10, 180);
        //undo
        fill(51);
        rect(5, 215, 110, 60);
        fill(255);
        text("undo \nshape", 10, 245);
        //clear
        fill(51);
        rect(5, 280, 110, 30);
        fill(255);
        text("clear", 10, 295);

        fill(51);
        //rect(5, 315, 110, 30);
        fill(255);
        text("materialen", 5, 330);
        //gewapend beton
        fill(51);
        rect(5, 350, 110, 60);
        fill(255);
        text("gewapend \nbeton", 10, 380);
        //hout
        fill(51);
        rect(5, 415, 110, 30);
        fill(255);
        text("hout", 10, 430);
        //staal
        fill(51);
        rect(5, 450, 110, 30);
        fill(255);
        text("staal", 10, 465);


        //material / profile info: ----------
        text("Materiaal: " + materiaal.naam, 130, 545);
        text("Vloeispanning: " + Math.round(materiaal.yield/1000000) + " MPa", 130, 580);
        let prijs = (profiel.getArea() / 10000) * (558/10) * materiaal.density * materiaal.price;
        text("Prijs: €" + Math.round(prijs), 450, 545);
        pop();
    }

    mouseClicked() {
        if (mouseX > 120 && mouseX < 785 && mouseY > 45 && mouseY < 525) { // 120, 45, 665, 480
            switch (this.tool) {
                case "rect":
                    profiel.addObject(new rect_object(this.beginX, this.beginY, mouseX - this.beginX, mouseY - this.beginY));
                    break;
                case "square":
                    profiel.addObject(new square_object(this.beginX, this.beginY, mouseX - this.beginX));
                    break;
                case "circle":
                    let difx = mouseX - this.beginX;
                    let dify = mouseY - this.beginY;
                    let r = Math.sqrt(difx*difx + dify*dify);
                    profiel.addObject(new circle_object(this.beginX, this.beginY, Math.round(r)));
                    break;
                default:
                    break;
            }
        }

        //Buttons
        if (mouseX > 710 && mouseX < 785 && mouseY > 10 && mouseY < 40) { // done button
            toneelmeester.setActiveScene(0);
        } else if (mouseX > 5 && mouseX < 115 && mouseY > 45 && mouseY < 75) { // tools
            this.tool = "rect";
        } else if (mouseX > 5 && mouseX < 115 && mouseY > 80 && mouseY < 110) {
            this.tool = "square";
        } else if (mouseX > 5 && mouseX < 115 && mouseY > 115 && mouseY < 145) {
            this.tool = "circle";
        } else if (mouseX > 5 && mouseX < 115 && mouseY > 150 && mouseY < 210) {
            //this.tool = "freeS";
        } else if (mouseX > 5 && mouseX < 115 && mouseY > 215 && mouseY < 275) {
            profiel.undo();
        } else if (mouseX > 5 && mouseX < 115 && mouseY > 280 && mouseY < 310) {
            profiel = new profile();
        }

        else if (mouseX > 5 && mouseX < 115 && mouseY > 350 && mouseY < 410) {
            materiaal = gewapend_beton;
        } else if (mouseX > 5 && mouseX < 115 && mouseY > 415 && mouseY < 445) {
            materiaal = hout;
        } else if (mouseX > 5 && mouseX < 115 && mouseY > 450 && mouseY < 480) {
            materiaal = staal;
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
            profiel = new profile();
            toneelmeester.setActiveScene(1);
        }
    }
}