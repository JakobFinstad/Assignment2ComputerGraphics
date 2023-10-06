class Vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v) { 
        return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    subtract(v) {
        return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    multiply(f) {
        return new Vec3(this.x*f, this.y*f, this.z*f);
    }
    multiplyByVector(v) {
        return new Vec3(this.x*v.x, this.y*v.y, this.z*v.z);
    }
    squaredLength() {
        return (this.x ** 2) + (this.y ** 2) + (this.z ** 2);
    }
    length() {
        return Math.sqrt(this.squaredLength());
    }
    unitVector() {
        return new Vec3(this.x/this.length(), this.y/this.length(), this.z/this.length());
    }
    dot(v) {
        return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
    }
    toList() {
        return [this.x, this.y, this.z];
    }
    squareRoot() {
        return new Vec3(Math.sqrt(this.x), Math.sqrt(this.y), Math.sqrt(this.z));
    } 
    static random(min, max) {
        const rand = (min, max) => {
            return Math.random() * (max - min) + min;
        }
        return new Vec3(rand(min, max), rand(min, max), rand(min, max))
    }
    static randomInUnitSphere() {
        while (true) {
            const p = this.random(-1,1);
            if (p.squaredLength() >= 1) continue;
            return p;
        }
    }
    nearZero() {
        const s = 1e-8;
        return (Math.abs(this.x) < s) && (Math.abs(this.y) < s) && (Math.abs(this.z) < s);
    }
    reflect(n) {
        return this.subtract(n.multiply(2*this.dot(n)));
    }
}