class World {
    objects = [];

    add(object) {
        this.objects.push(object);
    }

    hit(ray, tMin, tMax) {
        let tempRecord = new HitRecord()
        let closestSoFar = tMax;
        this.objects.forEach(object => {
            if(object.hit(ray, tMin, closestSoFar).hit) {
                tempRecord = object.hit(ray, tMin, tMax);
                closestSoFar = tempRecord.t;
            }
        })
        return tempRecord;
    }
}