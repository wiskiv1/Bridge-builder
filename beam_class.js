class beam {
    /*
    een balk is verankert op 2 punten aan de uiteindes van de balk, deze verankeringen laten wel rotatie van

    een balk heeft lasten, deze zijn altijd neerwaarts gericht, ze heeft op aar steun punten 2 opwaarts gerichte krachten
    om een evenwicht te garanderen
    */

    #loads = [];
    // TODO have 1 dynamic load (the car that moves over the bridge)
    force1 = 0;
    force2 = 0;

    schaal = 10; // pixels per meter
    profielSchaal = 10; // alles wat van het profiel komt is in pixels en moet omgezet worden

    density = 7850; // kg / m^3
    vloeispanning = 260000000; // 260 * 10^6 Pa (N/m^2)

    constructor(x, y, l, h, p) {
        this.posX = x;
        this.posY = y;
        this.length = l;
        this.height = h;
        this.profiel = p;
    }

    addLoad(f, l) { // f = grote van de kracht, l = plaats op de balk
        if (l < 0 || l > this.length) {return;} // do nothing

        this.#loads.push([f, l]);

        push();
        stroke(255, 0, 0);
        strokeWeight(5);
        line(this.posX + l, this.posY, this.posX + l, this.posY - f);
        pop();
    }

    #calculate_Forces() {
        this.force1 = 0; // reset forces
        this.force2 = 0;

        for (let last of this.#loads) {
            this.force1 += ((this.length - last[1]) / this.length) * last[0];
            this.force2 += (last[1] / this.length) * last[0];
        }

        this.force1 = Math.round(this.force1);
        this.force2 = Math.round(this.force2);
    }

    //legacy code, wordt niet gebruikt. Enkel hier voor referentie
    calculate_Fin() { // bereken interne krachten op elk punt in de balk
        this.#calculate_Forces();
        this.#loads.sort(this.#compare_loads); // sorteer lasten van links naar rechts

        let max_tension = 0;

        let aantal_loads = 0;
        for (let i = 0; i < this.length; i++) { //doorloop heel de balk
            let current_moment = 0;
            let current_force = 0;

            current_moment += (i/this.schaal) * this.force1; // moment van de linkse steun kracht
            current_force += this.force1;

            if (aantal_loads < this.#loads.length) {
            if (this.#loads[aantal_loads][1] <= i) { // voeg een nieuwe kracht toe aan de vgl (als nodig)
                aantal_loads++;
            }}

            for (let j = 0; j < aantal_loads; j++) {
                current_moment -= ((i - this.#loads[j][1])/this.schaal) * this.#loads[j][0]; // alle andere lasten
                current_force -= this.#loads[j][0];
            }

            // moment en kracht diagram tekenen
            push();
            stroke(255, 0, 0, 50);
            strokeWeight(5);
            line(this.posX + i, this.posY + this.height, this.posX + i, this.posY +this.height + Math.round(current_force));
            stroke(0, 0, 255, 50);
            strokeWeight(5);
            line(this.posX + i, this.posY + this.height, this.posX + i, this.posY +this.height + Math.round(current_moment / 50));
            pop();
        }
    }

    #compare_loads(l1, l2) {
        if (l1[1] < l2[1]) {
            return -1;
        } else if (l1[1] > l2[1]) {
            return 1;
        }

        return 0;
    }

    show() {
        push();
        rect(this.posX, this.posY, this.length, this.height);
        pop();
    }

    simulate() { // simuleer de lasten en de spanningen, en bepaal of de brug het overleeft
        //gegevens over de balk en het profiel verzamelen
        let Ixx = this.profiel.calculate_Ixx();
        let Sy = this.profiel.calculate_S();
        Ixx = Ixx / pow(this.profielSchaal, 4); // omzetten naar meter
        Sy = Sy / pow(this.profielSchaal, 2); 
        // punt het verste van de neutrale lijn
        // dikte op het punt het verste van de neutrale lijn

        let mass = Area * (this.length/this.schaal) * this.density * 10; // mass in Newton
        this.addLoad(mass, this.length/2); // add mass to forces

        
    }
}