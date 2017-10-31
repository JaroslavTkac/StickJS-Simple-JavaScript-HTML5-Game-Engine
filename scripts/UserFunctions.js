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

//Translations
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

//Waiting before animation start
function waitBeforeAnimationStart(value){

}

//Assign object to camera
function assignCameraToObj(name, value){
    getObjByName(name).useCamera = value;
}

//Apply changes to all objects
function applyChangesToAll(x, y, z, sx, sy, sz, xRot, yRot, zRot,
                           xRotSpeed, yRotSpeed, zRotSpeed, animateRotation){

    for (let i = 0; i < objArr.length; i++){
        //if values not provided ignore them
        //need to check values ...
        objArr[i].x = x;
        objArr[i].y = y;
        objArr[i].z = z;
        objArr[i].sx = sx;
        objArr[i].sy = sy;
        objArr[i].sz = sz;
        objArr[i].xRot = xRot;
        objArr[i].yRot = yRot;
        objArr[i].zRot = zRot;
        objArr[i].xRotSpeed = xRotSpeed;
        objArr[i].yRotSpeed = yRotSpeed;
        objArr[i].zRotSpeed = zRotSpeed;
        objArr[i].animateRotation = animateRotation;

    }
}
