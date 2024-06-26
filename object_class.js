class object{ // todo add color/style options
    area = 0;    
    neutralAxis = 0; // neutral axis
    Ixx = 0; // moment of Inertia

    constructor(x, y) {
        this.posX = x;
        this.posY = y;
        this.style = {
                stroke: [0, 0, 0],
                strokeWeight: 0,
                fill: [255, 255, 255]
            };
    }

    setStyle(design) {
        this.style = design;
    }

    show() {
        push();
        this.apply_style();
        this.privateDraw();
        pop();
    }

    privateDraw() {}

    apply_style() {
        if (this.style == null) {return;}

        if (this.style.fill != null) {
            fill(this.style.fill);
        }

        if (this.style.stroke != null) {
            stroke(this.style.stroke);
        }

        if (this.style.strokeWeight != null) {
            strokeWeight(this.style.strokeWeight);
        }
    }
}

class square_object extends object {
    constructor(x, y, s) {
        super(x, y);
        this.size = s;
        this.area = s*s;
        this.neutralAxis = Math.abs(y + 0.5 * s);
        this.Ixx = Math.abs(Math.round(pow(s, 4) / 12));
    }

    privateDraw() {
        square(this.posX, this.posY, this.size);
    }

    get_width(y) {
        if (y >= this.posY && y <= this.posY + this.size) {
            return this.size;
        } else if (y <= this.posY && y >= this.posY + this.size) {
            return this.size;
        }

        return 0;
    }

    calc_Sy(y) {
        if (this.posY > y && (this.posY + this.size) > y) { //completely below
            return 0;
        } else if (this.posY <= y && (this.posY + this.size) <= y) { //completely above
            return (this.area) * (y - this.neutralAxis)

        } else { // partially above
            let temp = min(this.posY, this.posY + this.size);

            let opp = (y - temp) * this.size; // Area = Height above line * width
            let axis = (y - temp) / 2; // neutral axis of Area above y

            return axis*opp;
        }
    }
}

class rect_object extends object {
    constructor(x, y, w, h) {
        super(x, y);
        this.width = w;
        this.height = h;
        this.area = w*h;
        this.neutralAxis = Math.abs(y + 0.5 * h);
        this.Ixx = Math.abs(Math.round((w * pow(h, 3)) / 12));
    }

    privateDraw() {
        rect(this.posX, this.posY, this.width, this.height);
    }

    get_width(y) {
        if (y >= this.posY && y <= this.posY + this.height) {
            return this.width;
        } else if (y <= this.posY && y >= this.posY + this.height) {
            return this.width;
        }

        return 0;
    }

    calc_Sy(y) {
        if (this.posY > y && (this.posY + this.height) > y) { //completely below
            return 0;
        } else if (this.posY <= y && (this.posY + this.height) <= y) { //completely above
            return (this.area) * (y - this.neutralAxis)

        } else { // partially above
            let temp = min(this.posY, this.posY + this.height);

            let opp = (y - temp) * this.width; // Area = Height above line * width
            let axis = (y - temp) / 2; // neutral axis of Area above y

            return axis*opp;
        }
    }
}

class circle_object extends object {
    constructor(x, y, r) {
        super(x, y);
        this.radius = r;
        this.area = PI*r*r;
        this.neutralAxis = Math.abs(y);
        this.Ixx = Math.abs(Math.round((PI * pow(r, 4)) / 4));
    }

    privateDraw() {
        circle(this.posX, this.posY, this.radius * 2);
    }

    // hoogste en lagste punt, en de dikte op dat punt
    get_width(y) {
        if (y >= this.posY - this.radius && y <= this.posY + this.radius) {
            let h = this.radius - Math.abs(this.posY - y);
            let alpha = Math.acos(1 - (h/this.radius));
            return 2*this.radius*Math.sin(alpha);
        }

        return 0;
    }

    calc_Sy(y) {
        if ((this.posY - this.radius) > y && (this.posY + this.radius) > y) { //completely below
            return 0;
        } else if ((this.posY - this.radius) <= y && (this.posY + this.radius) <= y) { //completely above
            return (this.area) * (y - this.neutralAxis)

        } else { // partially above (circel versimpelen tot een rechthoek)
            let temp = min(this.posY - this.radius, this.posY + this.radius);

            let opp = (y - temp) * this.radius; // Area = Height above line * width
            let axis = (y - temp) / 2; // neutral axis of Area above y

            return axis*opp;
        }
    }
}