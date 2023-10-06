// firstImage();
// blueWhiteGradient();
redSphere();
//normalsSphere();
//sphereAndGround();
//antialiasing();
//diffuseSphere();
//metalSpheres();

function firstImage() {
    const imageWidth = 256;
    const imageHeight = 256;
    const image = [];

    for (let j = imageHeight-1; j >= 0; --j) {
        console.log("Scanlines remaining: " + j);
        for (let i = 0; i < imageWidth; ++i) {
            const pixel = [];
            pixel.push(i / (imageWidth-1));
            pixel.push(j / (imageHeight-1));
            pixel.push(0.25);

            image.push(pixel);
        }
    }

    displayImage(imageWidth, imageHeight, image);
}

function blueWhiteGradient() {
    const imageWidth = 400;
    const imageHeight = 256;
    const image = [];

    //Camera
    focal_Length = 1.0;
    viewport_height = 2.0;
    viewport_width = viewport_height * (imageWidth/imageHeight);
    camera_center = new Vec3(0,0,0)

    //Calculate the vectors across the horizontal and down the verticle viewport edges.
    viewport_u = new Vec3(viewport_width,0,0);
    viewport_v = new Vec3(0, -viewport_height)


    // Calculate the horizontal and vertical delta vectors from pixel to pixel.
    const pixel_delta_u = viewport_u.multiply(1 / imageWidth); // Use multiplication with a scalar to create a Vec3
    const pixel_delta_v = viewport_v.multiply(1 / imageHeight); // Use multiplication with a scalar to create a Vec3

// Calculate the location of the upper left pixel.
    const viewport_upper_left = camera_center.subtract(new Vec3(0, 0, focal_Length)).subtract(viewport_u.multiply(0.5)).subtract(viewport_v.multiply(0.5)); // Use subtraction with Vec3 objects

    for (let j = 0; j < imageHeight; j++) {
        for (let i = 0; i < imageWidth; i++) {
        const pixel = [];
        const pixel_center = viewport_upper_left.add(pixel_delta_u.multiply(i)).add(pixel_delta_v.multiply(j)); // Use addition with Vec3 objects
        const ray_direction = pixel_center.subtract(camera_center); // Use subtraction with Vec3 objects
        const r = new Ray(camera_center, ray_direction);
        console.log(r);

        const pixel_color = rayToColor(r);

        pixel.push(pixel_color.x);
        pixel.push(pixel_color.y);
        pixel.push(pixel_color.z);

        image.push(pixel);
        }
    }


    displayImage(imageWidth,imageHeight,image);



    function rayToColor(ray) {
        console.log(ray);
        const unit_direction = ray.getDirection();
        const a = 0.5 * (unit_direction.y + 1.0);
        return new Vec3(
            (1.0 - a) * 1.0,
            (1.0 - a) * 1.0,
            (1.0 - a) * 1.0
        ).add(new Vec3(a * 0.5, a * 0.7, a * 1.0));
    }
    
}

function redSphere() {
    const imageWidth = 400;
    const imageHeight = 256;
    const image = [];

    // Camera
    const focal_Length = 1.0;
    const viewport_height = 2.0;
    const viewport_width = viewport_height * (imageWidth / imageHeight);
    const camera_center = new Vec3(0, 0, 0);

    // Calculate the vectors across the horizontal and down the vertical viewport edges.
    const viewport_u = new Vec3(viewport_width, 0, 0);
    const viewport_v = new Vec3(0, -viewport_height, 0);

    // Calculate the horizontal and vertical delta vectors from pixel to pixel.
    const pixel_delta_u = viewport_u.multiply(1 / imageWidth);
    const pixel_delta_v = viewport_v.multiply(1 / imageHeight);

    // Calculate the location of the upper left pixel.
    const viewport_upper_left = camera_center
        .subtract(new Vec3(0, 0, focal_Length))
        .subtract(viewport_u.multiply(0.5))
        .subtract(viewport_v.multiply(0.5));

    for (let j = 0; j < imageHeight; j++) {
        for (let i = 0; i < imageWidth; i++) {
            const pixel = [];
            const pixel_center = viewport_upper_left
                .add(pixel_delta_u.multiply(i))
                .add(pixel_delta_v.multiply(j));
            const ray_direction = pixel_center.subtract(camera_center);
            const r = new Ray(camera_center, ray_direction);

            const pixel_color = rayToColor(r);

            pixel.push(pixel_color.x);
            pixel.push(pixel_color.y);
            pixel.push(pixel_color.z);

            image.push(pixel);
        }
    }

    displayImage(imageWidth, imageHeight, image);

    function rayToColor(ray) {
        const center = new Vec3(0, 0, -1);

        if (hit_sphere(center, 0.5, ray)) {
            return new Vec3(1, 0, 0);
        }

        const unit_direction = ray.getDirection();
        const a = 0.5 * (unit_direction.y + 1.0);

        return new Vec3(
            (1.0 - a) * 1.0,
            (1.0 - a) * 1.0,
            (1.0 - a) * 1.0
        ).add(new Vec3(a * 0.5, a * 0.7, a * 1.0));
    }

    function hit_sphere(center, radius, r) {
        // console.log(r);
        const oc = r.origin.subtract(center);
        const a = r.direction.dot(r.direction);
        const b = 2.0 * oc.dot(r.direction);
        const c = oc.dot(oc) - radius * radius;
        const discriminant = b * b - 4 * a * c;
        return discriminant >= 0;
    }
}


function normalsSphere() {
    //TODO
}

function sphereAndGround() {
    //TODO
}

function antialiasing() {
    //TODO
}

function diffuseSphere() {
    //TODO
}

function metalSpheres() {
    //TODO
}