/**
 * Created by jaroslavtkaciuk on 10/04/2017.
 */

function orbitLight(){
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
    orbitLight();
    chaos();
}


function chaos(){
    let size = objArray.length;
    for(let i in objArray){
        if(objArray[i].name === "stars" && objArray[i].centerX === undefined) {
            objArray[i].centerX = objArray[i].x;
            objArray[i].centerY = objArray[i].y;
            objArray[i].centerZ = objArray[i].z;
            objArray[i].alpha = 0;
            objArray[i].alphaInc = Math.random() / 50;
            objArray[i].radius = Math.random() * 600;
        }
    }
    for(let i in objArray) {
        if (objArray[i].name === "stars" && objArray[i].name !== "sun") {
            objArray[i].x = objArray[i].centerX + Math.cos(objArray[i].alpha) * objArray[i].radius;
            if(i < (size/3))
                objArray[i].y = objArray[i].centerY + (Math.cos(objArray[i].alpha) + Math.sin(objArray[i].alpha)) * (objArray[i].radius) / 1.5;
            if(i >= (size/3) && i < ((size/3)*2))
                objArray[i].y = objArray[i].centerY + (Math.cos(objArray[i].alpha) - Math.sin(objArray[i].alpha)) * (objArray[i].radius) / 1.5;
            if(i >= ((size/3)*2) && i < size)
                objArray[i].y = objArray[i].centerY + (-Math.cos(objArray[i].alpha) + Math.sin(objArray[i].alpha)) * (objArray[i].radius) / 1.5;

            objArray[i].z = objArray[i].centerZ + Math.sin(objArray[i].alpha) * objArray[i].radius;

            objArray[i].alpha += objArray[i].alphaInc;
        }
    }
}

