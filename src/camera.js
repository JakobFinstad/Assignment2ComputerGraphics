class Camera {
    constructor() {
        this.aspectRatio = 16.0 / 9.0;
        this.viewportHeight = 2.0;
        this.viewportWidth = this.aspectRatio * this.viewportHeight;
        this.focalLength = 1.0;
        this.origin = new Vec3(0, 0, 0);
        this.horizontal = new Vec3(this.viewportWidth, 0.0, 0.0);
        this.vertical = new Vec3(0.0, this.viewportHeight*-1, 0.0);
        this.lowerLeftCorner = this.origin
            .subtract(this.horizontal.multiply(0.5))
            .subtract(this.vertical.multiply(0.5))
            .subtract(new Vec3(0, 0, this.focalLength));
    }

    getRay(u, v) {
        const horizontalOffset = this.horizontal.multiply(u);
        const verticalOffset = this.vertical.multiply(v);
        const direction = this.lowerLeftCorner
            .add(horizontalOffset)
            .add(verticalOffset)
            .subtract(this.origin);
        return new Ray(this.origin, direction);
    }

    render(world, imageWidth, imageHeight) {
        const image = [];
        // console.log(`P3\n${imageWidth} ${imageHeight}\n255\n`);
        
        for (let  j = 0; j < imageHeight; ++j) {
            for (let i = 0; i < imageWidth; ++i) {
                const pixel = [];
                const u = i / (imageWidth - 1);
                const v = j / (imageHeight - 1);
    
                const ray = this.getRay(u, v);
                const pixelColor = this.rayToColor(ray, world);
    
                // Convert pixelColor to integers in the range [0, 255]
                const ir = pixelColor.x;
                const ig = pixelColor.y;
                const ib = pixelColor.z;
    
                
                pixel.push(ir);
                pixel.push(ig);
                pixel.push(ib);

                image.push(pixel);
                // image.push(ib);
                // console.log(pixelColor);
                // image.push(pixelColor.x);
                // image.push(pixelColor.y);
                // image.push(pixelColor.z);
            }
        }

        // console.log("\rDone.");

        // console.log(image);
        displayImage(imageWidth, imageHeight, image);
    }

    rayToColor(ray, world) {
        const rec = world.hit(ray, 0, Infinity);
        // console.log(rec);

        if (rec.hit) {
            // A hit occurred, so return the color for the hit point.
            const normal = rec.normal;
            return normal.add(new Vec3(1, 1, 1)).multiply(0.5);
        }
    
        // No hit occurred, return a background color.
        const unitDirection = ray.getDirection();
        const a = 0.5 * (unitDirection.y + 1.0);
        // console.log(a);
    
        return new Vec3((1.0 - a) * 1.0,(1.0 - a) * 1.0,(1.0 - a) * 1.0).add(new Vec3(a * 0.5, a * 0.7, a * 1.0));
    }
}
