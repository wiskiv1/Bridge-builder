class object{ // todo add color/style options
    area = 0;    
    neutralAxis = 0; // neutral axis
    Ixx = 0; // moment of Inertia

    constructor(x, y) {
        this.posX = x;
        this.posY = y;
        this.style = null;
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
        this.neutralAxis = y + 0.5 * s;
        this.Ixx = Math.abs(Math.round(pow(s, 4) / 12));
    }

    privateDraw() {
        square(this.posX, this.posY, this.size);
    }
}

class rect_object extends object {
    constructor(x, y, w, h) {
        super(x, y);
        this.width = w;
        this.height = h;
        this.area = w*h;
        this.neutralAxis = y + 0.5 * h;
        this.Ixx = Math.abs(Math.round((w * pow(h, 3)) / 12));
    }

    privateDraw() {
        rect(this.posX, this.posY, this.width, this.height);
    }
}

class circle_object extends object {
    constructor(x, y, r) {
        super(x, y);
        this.radius = r;
        this.area = PI*r*r;
        this.neutralAxis = y + r;
        this.Ixx = Math.abs(Math.round((PI * pow(r, 4)) / 4));
    }

    privateDraw() {
        circle(this.posX, this.posY, this.radius * 2);
    }
}