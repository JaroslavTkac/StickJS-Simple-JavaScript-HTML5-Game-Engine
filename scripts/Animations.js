/**
 * Created by jaroslavtkaciuk on 10/04/2017.
 */

function orbitLight(pointLight) {
    pointLight.changePlace(
        (pointLight.centerX + Math.cos(pointLight.alpha) * pointLight.radius),
        0,
        (pointLight.centerZ + Math.sin(pointLight.alpha) * pointLight.radius));

    pointLight.alpha += pointLight.alphaInc;
}

function spaceImitation() {
    orbitLight(pointLight);
    chaos();
}


function chaos() {
    let size = objArr.length;
    for (let i in objArr) {
        if (objArr[i].name === "stars" && objArr[i].centerX === undefined) {
            objArr[i].centerX = objArr[i].x;
            objArr[i].centerY = objArr[i].y;
            objArr[i].centerZ = objArr[i].z;
            objArr[i].alpha = 0;
            objArr[i].alphaInc = Math.random() / 50;
            objArr[i].radius = Math.random() * 600;
        }
    }
    for (let i in objArr) {
        if (objArr[i].name === "stars" && objArr[i].name !== "sun") {
            objArr[i].x = objArr[i].centerX + Math.cos(objArr[i].alpha) * objArr[i].radius;
            if (i < (size / 3))
                objArr[i].y = objArr[i].centerY + (Math.cos(objArr[i].alpha) + Math.sin(objArr[i].alpha)) * (objArr[i].radius) / 1.5;
            if (i >= (size / 3) && i < ((size / 3) * 2))
                objArr[i].y = objArr[i].centerY + (Math.cos(objArr[i].alpha) - Math.sin(objArr[i].alpha)) * (objArr[i].radius) / 1.5;
            if (i >= ((size / 3) * 2) && i < size)
                objArr[i].y = objArr[i].centerY + (-Math.cos(objArr[i].alpha) + Math.sin(objArr[i].alpha)) * (objArr[i].radius) / 1.5;

            objArr[i].z = objArr[i].centerZ + Math.sin(objArr[i].alpha) * objArr[i].radius;

            objArr[i].alpha += objArr[i].alphaInc;
        }
    }
}







