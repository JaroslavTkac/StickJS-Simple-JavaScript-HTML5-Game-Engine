/**
 * Created by jaroslavtkaciuk on 10/04/2017.
 */

function orbitLight(pointLightArray){
    for(let i in pointLightArray) {
        pointLightArray[i].changePlace(
            (pointLightArray[i].centerX + Math.cos(pointLightArray[i].alpha) * pointLightArray[i].radius),
            0,
            (pointLightArray[i].centerZ + Math.sin(pointLightArray[i].alpha) * pointLightArray[i].radius));

        //y = (pointLight.centerY + (Math.cos(alpha) + Math.sin(alpha))*10);
        pointLightArray[i].alpha += pointLightArray[i].alphaInc;
    }
}

function spaceImitation(){
    orbitLight(pointLightArray);
    chaos();
}


function chaos(){
    let size = objArr.length;
    for(let i in objArr){
        if(objArr[i].name === "stars" && objArr[i].centerX === undefined) {
            objArr[i].centerX = objArr[i].x;
            objArr[i].centerY = objArr[i].y;
            objArr[i].centerZ = objArr[i].z;
            objArr[i].alpha = 0;
            objArr[i].alphaInc = Math.random() / 50;
            objArr[i].radius = Math.random() * 600;
        }
    }
    for(let i in objArr) {
        if (objArr[i].name === "stars" && objArr[i].name !== "sun") {
            objArr[i].x = objArr[i].centerX + Math.cos(objArr[i].alpha) * objArr[i].radius;
            if(i < (size/3))
                objArr[i].y = objArr[i].centerY + (Math.cos(objArr[i].alpha) + Math.sin(objArr[i].alpha)) * (objArr[i].radius) / 1.5;
            if(i >= (size/3) && i < ((size/3)*2))
                objArr[i].y = objArr[i].centerY + (Math.cos(objArr[i].alpha) - Math.sin(objArr[i].alpha)) * (objArr[i].radius) / 1.5;
            if(i >= ((size/3)*2) && i < size)
                objArr[i].y = objArr[i].centerY + (-Math.cos(objArr[i].alpha) + Math.sin(objArr[i].alpha)) * (objArr[i].radius) / 1.5;

            objArr[i].z = objArr[i].centerZ + Math.sin(objArr[i].alpha) * objArr[i].radius;

            objArr[i].alpha += objArr[i].alphaInc;
        }
    }
}

