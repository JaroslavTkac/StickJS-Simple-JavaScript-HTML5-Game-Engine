/**
 * Created by jaroslavtkaciuk on 28/10/2017.
 */


//Coordinates
function changeX(name, value) {
    getObjByName(name).x = value;
}
function changeY(name, value) {
    getObjByName(name).y = value;
}
function changeZ(name, value) {
    getObjByName(name).z = value;
}

//Scaling
function changeSx(name, value){
    getObjByName(name).sx = value;
}
function changeSy(name, value){
    getObjByName(name).sy = value;
}
function changeSz(name, value){
    getObjByName(name).sz = value;
}

//Rotation degrees
function changeXRotationDeg(name, value) {
    getObjByName(name).xRot = value;
}
function changeYRotationDeg(name, value) {
    getObjByName(name).yRot = value;
}
function changeZRotationDeg(name, value) {
    getObjByName(name).zRot = value;
}

//Rotation Speed
function changeXRotationSpeed(name, value) {
    getObjByName(name).xRotSpeed = value;
}
function changeYRotationSpeed(name, value) {
    getObjByName(name).yRotSpeed = value;
}
function changeZRotationSpeed(name, value) {
    getObjByName(name).zRotSpeed = value;
}

//Or use animation
function useAnimation(name, value) {
    getObjByName(name).animateRotation = value;
}
//Opacity and color
function changeR(name, value) {
    getObjByName(name).r = value;
}
function changeG(name, value) {
    getObjByName(name).g = value;
}
function changeB(name, value) {
    getObjByName(name).b = value;
}
function changeOpacity(name, value) {
    getObjByName(name).alpha = value;
}
//Waiting before animation start
function waitBeforeAnimationStart(value){

}

//Assign object to camera
function assignCameraToObj(name, value){
    getObjByName(name).useCamera = value;
}

//Apply changes to all objects
function applyChangesToAll(x, y, z, sx, sy, sz, xRot, yRot, zRot,
                           xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                           ambientR, ambientG, ambientB, animateRotation, useCamera, opacity, transparency, sumAllValues){


    console.log("sumAllValues: " + sumAllValues);
    console.log("Going to apply changes TO ALL");
    if(sumAllValues) {
        console.log("Summing values");
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
        }
    }
    else{
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

        }
    }

    console.log(objArr);
}
//Apply changes to specific type of objects
function applyChangesToSpecificType(objectType, x, y, z, sx, sy, sz, xRot, yRot, zRot,
                           xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                           ambientR, ambientG, ambientB, animateRotation, useCamera, opacity, transparency, sumAllValues){


    console.log("Going to apply changes TO: " + objectType);

    if(sumAllValues) {
        console.log("Summing values");
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
            }
        }
    }
    else{
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
            }
        }
    }

    console.log(objArr);
}
//Apply changes to specific type of objects
function applyChangesToSpecificObject(name, x, y, z, sx, sy, sz, xRot, yRot, zRot,
                                    xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                                    ambientR, ambientG, ambientB, animateRotation, useCamera, opacity, transparency, sumAllValues){


    console.log("Going to apply changes TO: " + name);

    let object = getObjByName(name);

    if(sumAllValues) {
        console.log("Summing values");
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
    }
    else{
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
    }



    console.log(object);
}

