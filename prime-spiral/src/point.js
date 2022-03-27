class Point {
    constructor(value, size) {
        this.value = value;
        this.size = size;
    }

    draw() {
        const a = (this.value * 180) / PI;
        const x = this.value * cos(a);
        const y = this.value * sin(a);

        fill(0);
        circle(x, y, this.size);
    }
}