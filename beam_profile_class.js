class profile {
    #objects = [];
    Ixx = 0; // moment of inertia
    y = 0; // neutral axis

    constructor() {

    }

    addObject(o) {
        if (o instanceof object) {
            this.#objects.push(o);
        } else {
            console.log("cannot add given object to profile");
        }
    }

    calculate_Ixx() { // Ixx = som Ixx + A*d^2
        if (this.#objects.length == 0) {return;} // do nothing

        this.#calculate_y();

        this.Ixx = 0;

        for (let i of this.#objects) {
            this.Ixx += i.Ixx;
            let A = i.area;
            let d = i.neutralAxis - this.y;
            this.Ixx += A*d*d;
        }

        this.Ixx = Math.round(this.Ixx);
        return this.Ixx;
    }

    #calculate_y() {
        let areas = [];
        let axis = [];
        let totalArea = 0;

        for (let i of this.#objects) {
            areas.push(i.area);
            totalArea += i.area;
            axis.push(i.neutralAxis);
        }

        let temp = 0;
        for (let i = 0; i < areas.length; i++) {
            temp += areas[i] * axis[i];
        }
        this.y = Math.round(temp/totalArea);

        return this.y;
    }

    // oppervlakte boven de neutrale lijn
    calculate_Sy() { // TODO later moet je dit opnieuw en beter doen!
        return this.getArea() / 2;
    }

    getArea() {
        let temp = 0;
        for (let i of this.#objects) {
            temp += i.area;
        }
        return temp;
    }
}