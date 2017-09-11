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