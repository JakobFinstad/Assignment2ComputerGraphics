class Metal {
    constructor(albedo, fuzz) {
        this.albedo = albedo;
        if (fuzz < 1) {
            this.fuzz = fuzz;
        } else {
            this.fuzz = 1;
        }
    }

    scatter(ray, rec) {
        //TODO
    }
}