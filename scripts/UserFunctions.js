/**
 * Created by jaroslavtkaciuk on 28/10/2017.
 */


//Apply changes to all objects
function applyChangesToAll(x, y, z, sx, sy, sz, xRot, yRot, zRot,
                           xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                           ambientR, ambientG, ambientB,
                           pointR, pointG, pointB, pointX, pointY, pointZ,
                           animateRotation,
                           useCamera, opacity, transparency, sumAllValues) {

    console.log(pointR);
    console.log(pointG);
    console.log(pointB);

    //console.log("sumAllValues: " + sumAllValues);
    //console.log("Going to apply changes TO ALL");
    if (sumAllValues) {
        //console.log("Summing values");
        //summing up all given values
        if (ambientR !== null)
            ambientLight.r += customParseFloat(ambientR);
        if (ambientG !== null)
            ambientLight.g += customParseFloat(ambientG);
        if (ambientB !== null)
            ambientLight.b += customParseFloat(ambientB);

        if (pointR !== null)
            pointLightArray[0].r += customParseFloat(pointR);
        if (pointG !== null)
            pointLightArray[0].g += customParseFloat(pointG);
        if (pointB !== null)
            pointLightArray[0].b += customParseFloat(pointB);

        if (pointX !== null)
            pointLightArray[0].x += customParseFloat(pointX);
        if (pointY !== null)
            pointLightArray[0].y += customParseFloat(pointY);
        if (pointZ !== null)
            pointLightArray[0].z += customParseFloat(pointZ);


        for (let i = 0; i < objArr.length; i++) {
            if (x !== null)
                objArr[i].x += customParseFloat(x);
            if (y !== null)
                objArr[i].y += customParseFloat(y);
            if (z !== null)
                objArr[i].z += customParseFloat(z);
            if (sx !== null)
                objArr[i].sx += customParseFloat(sx);
            if (sy !== null)
                objArr[i].sy += customParseFloat(sy);
            if (sz !== null)
                objArr[i].sz += customParseFloat(sz);
            if (r !== null)
                objArr[i].r += customParseFloat(r);
            if (g !== null)
                objArr[i].g += customParseFloat(g);
            if (b !== null)
                objArr[i].b += customParseFloat(b);
            if (xRot !== null)
                objArr[i].xRot += customParseFloat(xRot);
            if (yRot !== null)
                objArr[i].yRot += customParseFloat(yRot);
            if (zRot !== null)
                objArr[i].zRot += customParseFloat(zRot);
            if (xRotSpeed !== null)
                objArr[i].xRotSpeed += customParseFloat(xRotSpeed);
            if (yRotSpeed !== null)
                objArr[i].yRotSpeed += customParseFloat(yRotSpeed);
            if (zRotSpeed !== null)
                objArr[i].zRotSpeed += customParseFloat(zRotSpeed);
            if (animateRotation !== null)
                objArr[i].animateRotation = animateRotation;
            if (transparency !== null)
                objArr[i].transparency = transparency;
            if (opacity !== null)
                objArr[i].alpha += customParseFloat(opacity);
            if (useCamera !== null)
                objArr[i].useCamera = useCamera;

            //correct object values
            correctUserInputValues(objArr[i]);
        }
    }
    else {
        if (ambientR !== null)
            ambientLight.r = customParseFloat(ambientR);
        if (ambientG !== null)
            ambientLight.g = customParseFloat(ambientG);
        if (ambientB !== null)
            ambientLight.b = customParseFloat(ambientB);

        if (pointR !== null)
            pointLightArray[0].r = customParseFloat(pointR);
        if (pointG !== null)
            pointLightArray[0].g = customParseFloat(pointG);
        if (pointB !== null)
            pointLightArray[0].b = customParseFloat(pointB);

        if (pointX !== null)
            pointLightArray[0].x = customParseFloat(pointX);
        if (pointY !== null)
            pointLightArray[0].y = customParseFloat(pointY);
        if (pointZ !== null)
            pointLightArray[0].z = customParseFloat(pointZ);



        for (let i = 0; i < objArr.length; i++) {
            if (x !== null)
                objArr[i].x = customParseFloat(x);
            if (y !== null)
                objArr[i].y = customParseFloat(y);
            if (z !== null)
                objArr[i].z = customParseFloat(z);
            if (sx !== null)
                objArr[i].sx = customParseFloat(sx);
            if (sy !== null)
                objArr[i].sy = customParseFloat(sy);
            if (sz !== null)
                objArr[i].sz = customParseFloat(sz);
            if (r !== null)
                objArr[i].r = customParseFloat(r);
            if (g !== null)
                objArr[i].g = customParseFloat(g);
            if (b !== null)
                objArr[i].b = customParseFloat(b);
            if (xRot !== null)
                objArr[i].xRot = customParseFloat(xRot);
            if (yRot !== null)
                objArr[i].yRot = customParseFloat(yRot);
            if (zRot !== null)
                objArr[i].zRot = customParseFloat(zRot);
            if (xRotSpeed !== null)
                objArr[i].xRotSpeed = customParseFloat(xRotSpeed);
            if (yRotSpeed !== null)
                objArr[i].yRotSpeed = customParseFloat(yRotSpeed);
            if (zRotSpeed !== null)
                objArr[i].zRotSpeed = customParseFloat(zRotSpeed);
            if (animateRotation !== null)
                objArr[i].animateRotation = animateRotation;
            if (transparency !== null)
                objArr[i].transparency = transparency;
            if (opacity !== null)
                objArr[i].alpha = customParseFloat(opacity);
            if (useCamera !== null)
                objArr[i].useCamera = useCamera;

            correctUserInputValues(objArr[i]);
        }
    }


    console.log(pointLightArray[0]);
    //console.log(objArr);
}

//Apply changes to specific type of objects
function applyChangesToSpecificType(objectType, x, y, z, sx, sy, sz, xRot, yRot, zRot,
                                    xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                                    ambientR, ambientG, ambientB,
                                    pointR, pointG, pointB, pointX, pointY, pointZ,
                                    animateRotation,
                                    useCamera, opacity, transparency, sumAllValues) {


    //console.log("Going to apply changes TO: " + objectType);

    if (sumAllValues) {
        //console.log("Summing values");
        //summing up all given values
        if (ambientR !== null)
            ambientLight.r += customParseFloat(ambientR);
        if (ambientG !== null)
            ambientLight.g += customParseFloat(ambientG);
        if (ambientB !== null)
            ambientLight.b += customParseFloat(ambientB);

        if (pointR !== null)
            pointLightArray[0].r += customParseFloat(pointR);
        if (pointG !== null)
            pointLightArray[0].g += customParseFloat(pointG);
        if (pointB !== null)
            pointLightArray[0].b += customParseFloat(pointB);

        if (pointX !== null)
            pointLightArray[0].x += customParseFloat(pointX);
        if (pointY !== null)
            pointLightArray[0].y += customParseFloat(pointY);
        if (pointZ !== null)
            pointLightArray[0].z += customParseFloat(pointZ);


        for (let i = 0; i < objArr.length; i++) {
            if (objArr[i].type === objectType) {
                if (x !== null)
                    objArr[i].x += customParseFloat(x);
                if (y !== null)
                    objArr[i].y += customParseFloat(y);
                if (z !== null)
                    objArr[i].z += customParseFloat(z);
                if (sx !== null)
                    objArr[i].sx += customParseFloat(sx);
                if (sy !== null)
                    objArr[i].sy += customParseFloat(sy);
                if (sz !== null)
                    objArr[i].sz += customParseFloat(sz);
                if (r !== null)
                    objArr[i].r += customParseFloat(r);
                if (g !== null)
                    objArr[i].g += customParseFloat(g);
                if (b !== null)
                    objArr[i].b += customParseFloat(b);
                if (xRot !== null)
                    objArr[i].xRot += customParseFloat(xRot);
                if (yRot !== null)
                    objArr[i].yRot += customParseFloat(yRot);
                if (zRot !== null)
                    objArr[i].zRot += customParseFloat(zRot);
                if (xRotSpeed !== null)
                    objArr[i].xRotSpeed += customParseFloat(xRotSpeed);
                if (yRotSpeed !== null)
                    objArr[i].yRotSpeed += customParseFloat(yRotSpeed);
                if (zRotSpeed !== null)
                    objArr[i].zRotSpeed += customParseFloat(zRotSpeed);
                if (animateRotation !== null)
                    objArr[i].animateRotation = animateRotation;
                if (transparency !== null)
                    objArr[i].transparency = transparency;
                if (opacity !== null)
                    objArr[i].alpha += customParseFloat(opacity);
                if (useCamera !== null)
                    objArr[i].useCamera = useCamera;

                correctUserInputValues(objArr[i]);
            }
        }
    }
    else {
        if (ambientR !== null)
            ambientLight.r = customParseFloat(ambientR);
        if (ambientG !== null)
            ambientLight.g = customParseFloat(ambientG);
        if (ambientB !== null)
            ambientLight.b = customParseFloat(ambientB);

        if (pointR !== null)
            pointLightArray[0].r = customParseFloat(pointR);
        if (pointG !== null)
            pointLightArray[0].g = customParseFloat(pointG);
        if (pointB !== null)
            pointLightArray[0].b = customParseFloat(pointB);

        if (pointX !== null)
            pointLightArray[0].x = customParseFloat(pointX);
        if (pointY !== null)
            pointLightArray[0].y = customParseFloat(pointY);
        if (pointZ !== null)
            pointLightArray[0].z = customParseFloat(pointZ);


        for (let i = 0; i < objArr.length; i++) {
            if (objArr[i].type === objectType) {
                if (x !== null)
                    objArr[i].x = customParseFloat(x);
                if (y !== null)
                    objArr[i].y = customParseFloat(y);
                if (z !== null)
                    objArr[i].z = customParseFloat(z);
                if (sx !== null)
                    objArr[i].sx = customParseFloat(sx);
                if (sy !== null)
                    objArr[i].sy = customParseFloat(sy);
                if (sz !== null)
                    objArr[i].sz = customParseFloat(sz);
                if (r !== null)
                    objArr[i].r = customParseFloat(r);
                if (g !== null)
                    objArr[i].g = customParseFloat(g);
                if (b !== null)
                    objArr[i].b = customParseFloat(b);
                if (xRot !== null)
                    objArr[i].xRot = customParseFloat(xRot);
                if (yRot !== null)
                    objArr[i].yRot = customParseFloat(yRot);
                if (zRot !== null)
                    objArr[i].zRot = customParseFloat(zRot);
                if (xRotSpeed !== null)
                    objArr[i].xRotSpeed = customParseFloat(xRotSpeed);
                if (yRotSpeed !== null)
                    objArr[i].yRotSpeed = customParseFloat(yRotSpeed);
                if (zRotSpeed !== null)
                    objArr[i].zRotSpeed = customParseFloat(zRotSpeed);
                if (animateRotation !== null)
                    objArr[i].animateRotation = animateRotation;
                if (transparency !== null)
                    objArr[i].transparency = transparency;
                if (opacity !== null)
                    objArr[i].alpha = customParseFloat(opacity);
                if (useCamera !== null)
                    objArr[i].useCamera = useCamera;

                correctUserInputValues(objArr[i]);
            }
        }
    }

    //console.log(objArr);
}

//Apply changes to specific type of objects
function applyChangesToSpecificObject(name, x, y, z, sx, sy, sz, xRot, yRot, zRot,
                                      xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                                      ambientR, ambientG, ambientB,
                                      pointR, pointG, pointB, pointX, pointY, pointZ,
                                      animateRotation,
                                      useCamera, opacity, transparency, sumAllValues) {


    //console.log("Going to apply changes TO: " + name);

    let object = getObjByName(name);

    if (sumAllValues) {
        //console.log("Summing values");
        if (ambientR !== null)
            ambientLight.r = customParseFloat(ambientR);
        if (ambientG !== null)
            ambientLight.g = customParseFloat(ambientG);
        if (ambientB !== null)
            ambientLight.b = customParseFloat(ambientB);

        if (pointR !== null)
            pointLightArray[0].r += customParseFloat(pointR);
        if (pointG !== null)
            pointLightArray[0].g += customParseFloat(pointG);
        if (pointB !== null)
            pointLightArray[0].b += customParseFloat(pointB);

        if (pointX !== null)
            pointLightArray[0].x += customParseFloat(pointX);
        if (pointY !== null)
            pointLightArray[0].y += customParseFloat(pointY);
        if (pointZ !== null)
            pointLightArray[0].z += customParseFloat(pointZ);


        if (x !== null)
            object.x += customParseFloat(x);
        if (y !== null)
            object.y += customParseFloat(y);
        if (z !== null)
            object.z += customParseFloat(z);
        if (sx !== null)
            object.sx += customParseFloat(sx);
        if (sy !== null)
            object.sy += customParseFloat(sy);
        if (sz !== null)
            object.sz += customParseFloat(sz);
        if (r !== null)
            object.r += customParseFloat(r);
        if (g !== null)
            object.g += customParseFloat(g);
        if (b !== null)
            object.b += customParseFloat(b);
        if (xRot !== null)
            object.xRot += customParseFloat(xRot);
        if (yRot !== null)
            object.yRot += customParseFloat(yRot);
        if (zRot !== null)
            object.zRot += customParseFloat(zRot);
        if (xRotSpeed !== null)
            object.xRotSpeed += customParseFloat(xRotSpeed);
        if (yRotSpeed !== null)
            object.yRotSpeed += customParseFloat(yRotSpeed);
        if (zRotSpeed !== null)
            object.zRotSpeed += customParseFloat(zRotSpeed);
        if (animateRotation !== null)
            object.animateRotation = animateRotation;
        if (transparency !== null)
            object.transparency = transparency;
        if (opacity !== null)
            object.alpha += customParseFloat(opacity);
        if (useCamera !== null)
            object.useCamera = useCamera;

        correctUserInputValues(object);
    }
    else {
        if (ambientR !== null)
            ambientLight.r = customParseFloat(ambientR);
        if (ambientG !== null)
            ambientLight.g = customParseFloat(ambientG);
        if (ambientB !== null)
            ambientLight.b = customParseFloat(ambientB);

        if (pointR !== null)
            pointLightArray[0].r = customParseFloat(pointR);
        if (pointG !== null)
            pointLightArray[0].g = customParseFloat(pointG);
        if (pointB !== null)
            pointLightArray[0].b = customParseFloat(pointB);

        if (pointX !== null)
            pointLightArray[0].x = customParseFloat(pointX);
        if (pointY !== null)
            pointLightArray[0].y = customParseFloat(pointY);
        if (pointZ !== null)
            pointLightArray[0].z = customParseFloat(pointZ);


        if (x !== null)
            object.x = customParseFloat(x);
        if (y !== null)
            object.y = customParseFloat(y);
        if (z !== null)
            object.z = customParseFloat(z);
        if (sx !== null)
            object.sx = customParseFloat(sx);
        if (sy !== null)
            object.sy = customParseFloat(sy);
        if (sz !== null)
            object.sz = customParseFloat(sz);
        if (r !== null)
            object.r = customParseFloat(r);
        if (g !== null)
            object.g = customParseFloat(g);
        if (b !== null)
            object.b = customParseFloat(b);
        if (xRot !== null)
            object.xRot = customParseFloat(xRot);
        if (yRot !== null)
            object.yRot = customParseFloat(yRot);
        if (zRot !== null)
            object.zRot = customParseFloat(zRot);
        if (xRotSpeed !== null)
            object.xRotSpeed = customParseFloat(xRotSpeed);
        if (yRotSpeed !== null)
            object.yRotSpeed = customParseFloat(yRotSpeed);
        if (zRotSpeed !== null)
            object.zRotSpeed = customParseFloat(zRotSpeed);
        if (animateRotation !== null)
            object.animateRotation = animateRotation;
        if (transparency !== null)
            object.transparency = transparency;
        if (opacity !== null)
            object.alpha = customParseFloat(opacity);
        if (useCamera !== null)
            object.useCamera = useCamera;

        correctUserInputValues(object);
    }


    //console.log(object);
}

function correctUserInputValues(object){
    object.setColorR(object.r);
    object.setColorG(object.g);
    object.setColorB(object.b);
    object.setOpacity(object.alpha);
    object.transparency = object.alpha >= 0 && object.alpha < 1;
}

function customParseFloat(value){
    let parsedValue = parseFloat(value);
    if(!isNaN(parsedValue)){
        return parsedValue;
    }
    return 1;
}