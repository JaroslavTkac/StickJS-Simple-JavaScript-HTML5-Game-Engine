/**
 * Created by jaroslavtkaciuk on 28/10/2017.
 */



//Apply changes to all objects
function applyChangesToAll(x, y, z, sx, sy, sz, xRot, yRot, zRot,
                           xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                           ambientR, ambientG, ambientB, animateRotation, useCamera, opacity, transparency, sumAllValues) {


    console.log("sumAllValues: " + sumAllValues);
    console.log("Going to apply changes TO ALL");
    if (sumAllValues) {
        //console.log("Summing values");
        //summing up all given values
        if (ambientR !== null)
            ambientLight.r += parseFloat(ambientR);
        if (ambientG !== null)
            ambientLight.g += parseFloat(ambientG);
        if (ambientB !== null)
            ambientLight.b += parseFloat(ambientB);


        for (let i = 0; i < objArr.length; i++) {
            if (x !== null)
                objArr[i].x += parseFloat(x);
            if (y !== null)
                objArr[i].y += parseFloat(y);
            if (z !== null)
                objArr[i].z += parseFloat(z);
            if (sx !== null)
                objArr[i].sx += parseFloat(sx);
            if (sy !== null)
                objArr[i].sy += parseFloat(sy);
            if (sz !== null)
                objArr[i].sz += parseFloat(sz);
            if (r !== null)
                objArr[i].r += parseFloat(r);
            if (g !== null)
                objArr[i].g += parseFloat(g);
            if (b !== null)
                objArr[i].b += parseFloat(b);
            if (xRot !== null)
                objArr[i].xRot += parseFloat(xRot);
            if (yRot !== null)
                objArr[i].yRot += parseFloat(yRot);
            if (zRot !== null)
                objArr[i].zRot += parseFloat(zRot);
            if (xRotSpeed !== null)
                objArr[i].xRotSpeed += parseFloat(xRotSpeed);
            if (yRotSpeed !== null)
                objArr[i].yRotSpeed += parseFloat(yRotSpeed);
            if (zRotSpeed !== null)
                objArr[i].zRotSpeed += parseFloat(zRotSpeed);
            if (animateRotation !== null)
                objArr[i].animateRotation = animateRotation;
            if (transparency !== null)
                objArr[i].transparency = transparency;
            if (opacity !== null)
                objArr[i].alpha += parseFloat(opacity);
            if (useCamera !== null)
                objArr[i].useCamera = useCamera;

            //correct object values
            correctUserInputValues(objArr[i]);
        }
    }
    else {
        if (ambientR !== null)
            ambientLight.r = parseFloat(ambientR);
        if (ambientG !== null)
            ambientLight.g = parseFloat(ambientG);
        if (ambientB !== null)
            ambientLight.b = parseFloat(ambientB);


        for (let i = 0; i < objArr.length; i++) {
            if (x !== null)
                objArr[i].x = parseFloat(x);
            if (y !== null)
                objArr[i].y = parseFloat(y);
            if (z !== null)
                objArr[i].z = parseFloat(z);
            if (sx !== null)
                objArr[i].sx = parseFloat(sx);
            if (sy !== null)
                objArr[i].sy = parseFloat(sy);
            if (sz !== null)
                objArr[i].sz = parseFloat(sz);
            if (r !== null)
                objArr[i].r = parseFloat(r);
            if (g !== null)
                objArr[i].g = parseFloat(g);
            if (b !== null)
                objArr[i].b = parseFloat(b);
            if (xRot !== null)
                objArr[i].xRot = parseFloat(xRot);
            if (yRot !== null)
                objArr[i].yRot = parseFloat(yRot);
            if (zRot !== null)
                objArr[i].zRot = parseFloat(zRot);
            if (xRotSpeed !== null)
                objArr[i].xRotSpeed = parseFloat(xRotSpeed);
            if (yRotSpeed !== null)
                objArr[i].yRotSpeed = parseFloat(yRotSpeed);
            if (zRotSpeed !== null)
                objArr[i].zRotSpeed = parseFloat(zRotSpeed);
            if (animateRotation !== null)
                objArr[i].animateRotation = animateRotation;
            if (transparency !== null)
                objArr[i].transparency = transparency;
            if (opacity !== null)
                objArr[i].alpha = parseFloat(opacity);
            if (useCamera !== null)
                objArr[i].useCamera = useCamera;

            correctUserInputValues(objArr[i]);
        }
    }



    //console.log(objArr);
}

//Apply changes to specific type of objects
function applyChangesToSpecificType(objectType, x, y, z, sx, sy, sz, xRot, yRot, zRot,
                                    xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                                    ambientR, ambientG, ambientB, animateRotation, useCamera, opacity, transparency, sumAllValues) {


    //console.log("Going to apply changes TO: " + objectType);

    if (sumAllValues) {
        //console.log("Summing values");
        //summing up all given values
        if (ambientR !== null)
            ambientLight.r += parseFloat(ambientR);
        if (ambientG !== null)
            ambientLight.g += parseFloat(ambientG);
        if (ambientB !== null)
            ambientLight.b += parseFloat(ambientB);


        for (let i = 0; i < objArr.length; i++) {
            if (objArr[i].type === objectType) {
                if (x !== null)
                    objArr[i].x += parseFloat(x);
                if (y !== null)
                    objArr[i].y += parseFloat(y);
                if (z !== null)
                    objArr[i].z += parseFloat(z);
                if (sx !== null)
                    objArr[i].sx += parseFloat(sx);
                if (sy !== null)
                    objArr[i].sy += parseFloat(sy);
                if (sz !== null)
                    objArr[i].sz += parseFloat(sz);
                if (r !== null)
                    objArr[i].r += parseFloat(r);
                if (g !== null)
                    objArr[i].g += parseFloat(g);
                if (b !== null)
                    objArr[i].b += parseFloat(b);
                if (xRot !== null)
                    objArr[i].xRot += parseFloat(xRot);
                if (yRot !== null)
                    objArr[i].yRot += parseFloat(yRot);
                if (zRot !== null)
                    objArr[i].zRot += parseFloat(zRot);
                if (xRotSpeed !== null)
                    objArr[i].xRotSpeed += parseFloat(xRotSpeed);
                if (yRotSpeed !== null)
                    objArr[i].yRotSpeed += parseFloat(yRotSpeed);
                if (zRotSpeed !== null)
                    objArr[i].zRotSpeed += parseFloat(zRotSpeed);
                if (animateRotation !== null)
                    objArr[i].animateRotation = animateRotation;
                if (transparency !== null)
                    objArr[i].transparency = transparency;
                if (opacity !== null)
                    objArr[i].alpha += parseFloat(opacity);
                if (useCamera !== null)
                    objArr[i].useCamera = useCamera;

                correctUserInputValues(objArr[i]);
            }
        }
    }
    else {
        if (ambientR !== null)
            ambientLight.r = parseFloat(ambientR);
        if (ambientG !== null)
            ambientLight.g = parseFloat(ambientG);
        if (ambientB !== null)
            ambientLight.b = parseFloat(ambientB);


        for (let i = 0; i < objArr.length; i++) {
            if (objArr[i].type === objectType) {
                if (x !== null)
                    objArr[i].x = parseFloat(x);
                if (y !== null)
                    objArr[i].y = parseFloat(y);
                if (z !== null)
                    objArr[i].z = parseFloat(z);
                if (sx !== null)
                    objArr[i].sx = parseFloat(sx);
                if (sy !== null)
                    objArr[i].sy = parseFloat(sy);
                if (sz !== null)
                    objArr[i].sz = parseFloat(sz);
                if (r !== null)
                    objArr[i].r = parseFloat(r);
                if (g !== null)
                    objArr[i].g = parseFloat(g);
                if (b !== null)
                    objArr[i].b = parseFloat(b);
                if (xRot !== null)
                    objArr[i].xRot = parseFloat(xRot);
                if (yRot !== null)
                    objArr[i].yRot = parseFloat(yRot);
                if (zRot !== null)
                    objArr[i].zRot = parseFloat(zRot);
                if (xRotSpeed !== null)
                    objArr[i].xRotSpeed = parseFloat(xRotSpeed);
                if (yRotSpeed !== null)
                    objArr[i].yRotSpeed = parseFloat(yRotSpeed);
                if (zRotSpeed !== null)
                    objArr[i].zRotSpeed = parseFloat(zRotSpeed);
                if (animateRotation !== null)
                    objArr[i].animateRotation = animateRotation;
                if (transparency !== null)
                    objArr[i].transparency = transparency;
                if (opacity !== null)
                    objArr[i].alpha = parseFloat(opacity);
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
                                      ambientR, ambientG, ambientB, animateRotation, useCamera, opacity, transparency, sumAllValues) {


    console.log("Going to apply changes TO: " + name);

    let object = getObjByName(name);

    if (sumAllValues) {
        //console.log("Summing values");
        if (ambientR !== null)
            ambientLight.r = parseFloat(ambientR);
        if (ambientG !== null)
            ambientLight.g = parseFloat(ambientG);
        if (ambientB !== null)
            ambientLight.b = parseFloat(ambientB);


        if (x !== null)
            object.x += parseFloat(x);
        if (y !== null)
            object.y += parseFloat(y);
        if (z !== null)
            object.z += parseFloat(z);
        if (sx !== null)
            object.sx += parseFloat(sx);
        if (sy !== null)
            object.sy += parseFloat(sy);
        if (sz !== null)
            object.sz += parseFloat(sz);
        if (r !== null)
            object.r += parseFloat(r);
        if (g !== null)
            object.g += parseFloat(g);
        if (b !== null)
            object.b += parseFloat(b);
        if (xRot !== null)
            object.xRot += parseFloat(xRot);
        if (yRot !== null)
            object.yRot += parseFloat(yRot);
        if (zRot !== null)
            object.zRot += parseFloat(zRot);
        if (xRotSpeed !== null)
            object.xRotSpeed += parseFloat(xRotSpeed);
        if (yRotSpeed !== null)
            object.yRotSpeed += parseFloat(yRotSpeed);
        if (zRotSpeed !== null)
            object.zRotSpeed += parseFloat(zRotSpeed);
        if (animateRotation !== null)
            object.animateRotation = animateRotation;
        if (transparency !== null)
            object.transparency = transparency;
        if (opacity !== null)
            object.alpha += parseFloat(opacity);
        if (useCamera !== null)
            object.useCamera = useCamera;

        correctUserInputValues(object);
    }
    else {
        if (ambientR !== null)
            ambientLight.r = parseFloat(ambientR);
        if (ambientG !== null)
            ambientLight.g = parseFloat(ambientG);
        if (ambientB !== null)
            ambientLight.b = parseFloat(ambientB);


        if (x !== null)
            object.x = parseFloat(x);
        if (y !== null)
            object.y = parseFloat(y);
        if (z !== null)
            object.z = parseFloat(z);
        if (sx !== null)
            object.sx = parseFloat(sx);
        if (sy !== null)
            object.sy = parseFloat(sy);
        if (sz !== null)
            object.sz = parseFloat(sz);
        if (r !== null)
            object.r = parseFloat(r);
        if (g !== null)
            object.g = parseFloat(g);
        if (b !== null)
            object.b = parseFloat(b);
        if (xRot !== null)
            object.xRot = parseFloat(xRot);
        if (yRot !== null)
            object.yRot = parseFloat(yRot);
        if (zRot !== null)
            object.zRot = parseFloat(zRot);
        if (xRotSpeed !== null)
            object.xRotSpeed = parseFloat(xRotSpeed);
        if (yRotSpeed !== null)
            object.yRotSpeed = parseFloat(yRotSpeed);
        if (zRotSpeed !== null)
            object.zRotSpeed = parseFloat(zRotSpeed);
        if (animateRotation !== null)
            object.animateRotation = animateRotation;
        if (transparency !== null)
            object.transparency = transparency;
        if (opacity !== null)
            object.alpha = parseFloat(opacity);
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