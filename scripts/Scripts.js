/**
 * Created by jaroslavtkaciuk on 08/09/2017.
 */

function findDuplicateName(currName){
    for(let i = 0; i < objArr.length; i++){
        if(objArr[i].name === currName){
            return true;
        }
    }
    return false;
}
function getSavedShapeByName(name) {
    for (let i = 0; i < savedShapesArr.length; i++){
        if (savedShapesArr[i].link === name)
            return savedShapesArr[i].value;
    }
}
function getSavedShapeElementIndex(name){
    for (let i = 0; i < savedShapesArr.length; i++){
        if (savedShapesArr[i].link === name)
            return i;
    }
}
function getObjByName(name){
    for (let i = 0; i < objArr.length; i++){
        if (objArr[i].name === name)
            return objArr[i];
    }
}
//Callback for reset scene function
function waitUntilSavedSceneDataLoads() {
    if ((sceneToLoadArr !== null) && (sceneToLoadArr.length === 0)) {
        setTimeout(waitUntilSavedSceneDataLoads, 50);
        return;
    }
    if((sceneToLoadArr !== null)) {
        for (let i = 0; i < sceneToLoadArr.length; i++) {
            //init objects
            new LoadObject(sceneToLoadArr[i].jsonPath, sceneToLoadArr[i].textureSrc, {
                "name": sceneToLoadArr[i].name,
                "savedShapeName": sceneToLoadArr[i].savedShapeName,
                "jsonPath": sceneToLoadArr[i].jsonPath,
                "x": sceneToLoadArr[i].x,
                "y": sceneToLoadArr[i].y,
                "z": sceneToLoadArr[i].z,
                "sx": sceneToLoadArr[i].sx,
                "sy": sceneToLoadArr[i].sy,
                "sz": sceneToLoadArr[i].sz,
                "r": sceneToLoadArr[i].r,
                "g": sceneToLoadArr[i].g,
                "b": sceneToLoadArr[i].b,
                "xRot": sceneToLoadArr[i].xRot,
                "xRotSpeed": sceneToLoadArr[i].xRotSpeed,
                "yRot": sceneToLoadArr[i].yRot,
                "yRotSpeed": sceneToLoadArr[i].yRotSpeed,
                "zRot": sceneToLoadArr[i].zRot,
                "zRotSpeed": sceneToLoadArr[i].zRotSpeed,
                "lighting": sceneToLoadArr[i].lighting,
                "animateRotation": sceneToLoadArr[i].animateRotation,
                "useTexture": sceneToLoadArr[i].useTexture,
                "textureSrc": sceneToLoadArr[i].textureSrc,
                "useCamera": sceneToLoadArr[i].useCamera,
                "transparency": sceneToLoadArr[i].transparency,
                "alpha": sceneToLoadArr[i].alpha,
                "type": sceneToLoadArr[i].type
            }, sceneToLoadArr[i].saveTo);
        }
    }
    saveData();
}

// Some sort of call back (waiting for savedShapeImg value)
function waitUntilCanvasImgUploading(){
    if (savedShapeImg === ""){
        setTimeout(waitUntilCanvasImgUploading, 50);
        return;
    }
    let transparent = true;
    if(opacitySlider.option("value") === 1.0)
        transparent = false;
    let objValues = {
        shape: currentlySelectedShape,
        texture: lastSelectedTexture,
        name: "none",
        jsonPath: currentlySelectedShape,
        x: -10 + Math.random() * 15,
        y: -10 + Math.random() * 15,
        z: -10 + Math.random() * 15,
        r: redChange,
        g: greenChange,
        b: blueChange,
        yRot: 50,
        yRotSpeed: 25,
        lighting: isLightWillBeUsed,
        animateRotation: true,
        useTexture: isTextureWillBeUsed,
        transparency: transparent,
        alpha: opacitySlider.option("value"),
        saveTo: "objArr"
    };
    //console.log(savedShapeImg);
    savedShapesArr.push({link : savedShapeImg, value : objValues});

    //console.log(savedShapesArr);
    //console.log(getSavedShapeByName(savedShapeImg));

    //Modify all shapes that use same base object
    for (let i = 0; i < objArr.length; i++){
        console.log(objArr[i].savedShapeName + " === " + savedShapeImg);
        if(objArr[i].savedShapeName === savedShapeImg){
            objArr[i].r = savedShapesArr[savedShapesArr.length-1].value.r;
            objArr[i].g = savedShapesArr[savedShapesArr.length-1].value.g;
            objArr[i].b = savedShapesArr[savedShapesArr.length-1].value.b;
            objArr[i].alpha = savedShapesArr[savedShapesArr.length-1].value.alpha;
            objArr[i].transparency = objArr[i].alpha !== 1;
            objArr[i].lighting = savedShapesArr[savedShapesArr.length-1].value.lighting;
            objArr[i].useTexture = savedShapesArr[savedShapesArr.length-1].value.useTexture;
            objArr[i].textureSrc = savedShapesArr[savedShapesArr.length-1].value.texture;
            if(objArr[i].useTexture) {
                objArr[i].initTexture(objArr[i].texture, objArr[i].textureSrc, "objArr", webgl);
            }
        }
    }


    savedShapeImg = "";
    saveData();
}
// Will remove all falsy values: undefined, null, 0, false, NaN and "" (empty string)
function cleanArray(actual) {
    let newArray = new Array();
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}
function fpsCounter() {
    let delta = (Date.now() - lastCalledTime) / 1000;
    lastCalledTime = Date.now();
    fps = 1 / delta;
    fpsSum += fps;
    fpsElement.appendChild(fpsNode);
    fpsNode.nodeValue = "Current fps: " + fps.toFixed(2);
}
function avgFps(){
    framesPassed++;
    avgFpsElement.appendChild(avgFpsNode);
    avgFpsNode.nodeValue = "Average fps: " + (fpsSum/framesPassed).toFixed(2);
}
function getKeyByName(name){
    for(let i in keysArray) {
        if (keysArray[i].keyName === name)
            return keysArray[i];
    }
}