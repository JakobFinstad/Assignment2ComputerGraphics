class Sphere {
    constructor(center, radius, material) {
        this.center = center;
        this.radius = radius;
        this.material = material;
    }

    hit(ray, tMin, tMax) {
        const rec = new HitRecord()

        const oc = ray.origin.subtract(this.center);
        const a = ray.direction.squaredLength();
        const halfB = oc.dot(ray.direction);
        const c = oc.squaredLength() - this.radius*this.radius;

        const discriminant =  halfB*halfB-a*c;
        if (discriminant < 0) {
            rec.hit=false;
            return rec;
        };
        const sqrtd = Math.sqrt(discriminant);

        // Find the nearest root that lies in the acceptable range.
        let root = (-halfB - sqrtd) / a;
        if (root < tMin || tMax < root) {
            root = (-halfB + sqrtd) / a;
            if (root < tMin || tMax < root) {
                rec.hit=false;
                return rec;
            }
        }

        rec.t = root;
        rec.point = ray.at(rec.t);
        rec.normal = rec.point.subtract(this.center).multiply(1/this.radius);
        rec.hit = true;
        rec.setFaceNormal(ray, rec.normal);

        return rec;
    }
}