/**
 * Created by jaroslavtkaciuk on 19/04/2017.
 */


function startEditorWindow(){
    canvasEditorArr.push(document.getElementById("editor-scene"));
    canvasEditorArr.push(document.getElementById("shapes/cube.json"));
    canvasEditorArr.push(document.getElementById("shapes/sphere.json"));
    canvasEditorArr.push(document.getElementById("shapes/cone.json"));
    canvasEditorArr.push(document.getElementById("shapes/cylinder.json"));
    canvasEditorArr.push(document.getElementById("shapes/simpleSphere.json"));

    for(let i in canvasEditorArr)
        initGLForEditor(canvasEditorArr[i]);

    for(let i in webglEditorArr)
        editorShader(webglEditorArr[i]);

    ambientLightE = new AmbientLight(redAChange, greenAChange, blueAChange);
    directionalLightE = new DirectionalLight(0, 0, 0, 0, 0, 50, false);
    pointLightArrayE.push(new PointLight("lamp", redPChange, greenPChange, bluePChange, 0, 0, -4, 15, 0.02, "editor", false));

    for(let i in webglEditorArr) {
        webglEditorArr[i].clearColor(0, 0, 0, 1.0);
        webglEditorArr[i].enable(webglEditorArr[i].DEPTH_TEST);
    }

    initEditorEnvironment();
    // Init loaded user objects
    setTimeout(function () {
        loadUserData("shapes/user_shapes", "object"); //TODO need callback

    }, 2200);


}
function initEditorEnvironment() {
    let srcArr = ["shapes/cube.json", "shapes/sphere.json", "shapes/cone.json",
        "shapes/cylinder.json", "shapes/simpleSphere.json"];

    new LoadObject("shapes/cube.json", "assets/img/textures/sun.jpg", {
        "name": "forEditor",
        "z": -4,
        "yRot": 50,
        "yRotSpeed": 275,
        "animateRotation": true,
        "useTexture": false,
        "useCamera": true,
        "transparency": false,
        "alpha": 1.0
    }, "editor", webglEditorArr[0]);
    for(let i = 1; i < 6; i++){
        new LoadObject(srcArr[i-1], "assets/img/textures/sun.jpg", {
            "name": "forPreview",
            "z": -3.5,
            "yRot": 50,
            "yRotSpeed": 275,
            "animateRotation": true,
            "useTexture": false,
            "useCamera": true,
            "transparency": false,
            "alpha": 1.0
        }, "preview", webglEditorArr[i]);
    }

}

function renderEditor() {
    if (editorObjectLoaded){
        drawScene(canvasEditorArr[0], webglEditorArr[0], objEditorArr, mvMatrixE, pMatrixE, mvMatrixStackE, shaderProgramEditorArr[0],
            ambientLightE, directionalLightE, pointLightArrayE);
        animateEditor(objEditorArr);

        changeColour();
    }
}
function renderPreview() {
    copyEditorToPreview();
    for(let i = 1; i < webglEditorArr.length; i++) {
        drawScene(canvasEditorArr[i], webglEditorArr[i], objPreviewArr.slice(i-1,i), mvMatrixE, pMatrixE, mvMatrixStackE, shaderProgramEditorArr[i],
            ambientLightE, directionalLightE, pointLightArrayE);
    }
    animateEditor(objPreviewArr);
}
function changeColour(){
    for(let i in objEditorArr) {
        objEditorArr[i].r = redChange;
        objEditorArr[i].g = greenChange;
        objEditorArr[i].b = blueChange;

        objEditorArr[i].transparency = opacitySlider.option("value") !== 1.0;
        objEditorArr[i].alpha = opacitySlider.option("value");
        //console.log(opacitySlider.option("value"));
    }
    ambientLightE.r = redAChange;
    ambientLightE.g = greenAChange;
    ambientLightE.b = blueAChange;

    pointLightArrayE[0].r = redPChange;
    pointLightArrayE[0].g = greenPChange;
    pointLightArrayE[0].b = bluePChange;

}
function copyEditorToPreview(){
    for(let i in objPreviewArr){
        objPreviewArr[i].r = objEditorArr[0].r;
        objPreviewArr[i].g = objEditorArr[0].g;
        objPreviewArr[i].b = objEditorArr[0].b;
        objPreviewArr[i].alpha = objEditorArr[0].alpha;
        objPreviewArr[i].useTexture = objEditorArr[0].useTexture;
        objPreviewArr[i].textureSrc = objEditorArr[0].textureSrc;
        objPreviewArr[i].transparency = objEditorArr[0].transparency;
        objPreviewArr[i].lighting = objEditorArr[0].lighting;
    }
}
function animateEditor(array) {
    let timeNow = new Date().getTime();
    if (lastTime !== 0) {
        let elapsed = timeNow - lastTime;
        for(let i in array){
            if(array[i].animateRotation){
                array[i].xRot += (array[i].xRotSpeed * elapsed) / 1000.0;
                array[i].yRot += (array[i].yRotSpeed * elapsed) / 1000.0;
                array[i].zRot += (array[i].zRotSpeed * elapsed) / 1000.0;
            }
        }
        orbitLight(pointLightArrayE);
    }
    lastTime = timeNow;
}
function applyTexture(textureSrc){
    //console.log(textureSrc);
    objEditorArr[0].useTexture = true;
    objEditorArr[0].texture = webglEditorArr[0].createTexture();
    objEditorArr[0].initTexture(objEditorArr[0].texture, textureSrc, "editor", webglEditorArr[0]);

    if(objPreviewArr.length !== 0) {
        for (let i = 1; i < webglEditorArr.length; i++) {
            objPreviewArr[i-1].useTexture = true;
            objPreviewArr[i-1].texture = webglEditorArr[i].createTexture();

            objPreviewArr[i-1].initTexture(objPreviewArr[i-1].texture, textureSrc, "preview", webglEditorArr[i]);
        }
    }

}