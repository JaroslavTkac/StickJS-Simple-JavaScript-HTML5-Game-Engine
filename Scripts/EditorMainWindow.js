/**
 * Created by jaroslavtkaciuk on 19/04/2017.
 */


function startEditorWindow(){
    editorCanvas = document.getElementById("Editor-Scene");
    initGLForEditor(editorCanvas);
    editorShader();

    ambientLightE = new AmbientLight(redAChange, greenAChange, blueAChange);
    directionalLightE = new DirectionalLight(0, 0, 0, 0, 0, 50, false);
    pointLightArrayE.push(new PointLight("lamp", redPChange, greenPChange, bluePChange, 0, 0, -4, 15, 0.02, "editor", false));

    webglE.clearColor(0, 0, 0, 1.0);
    webglE.enable(webglE.DEPTH_TEST);

    new LoadObject("Scripts/Shapes/cube.json", "Standard textures/sun.jpg", {
        "name": "forEditor",
        "z": -4,
        "yRot": 50,
        "yRotSpeed": 275,
        "animateRotation": true,
        "useTexture": false,
        "useCamera": true,
        "transparency": true,
        "alpha": 1.0
    }, "editor");

    setInterval(function () {
        console.log(editorObjArray[0].alpha);
    }, 3000);

}
function renderEditor() {
    if (editorObjectLoaded){
        drawScene(editorCanvas, webglE, editorObjArray, mvMatrixE, pMatrixE, mvMatrixStackE, shaderProgramE,
            ambientLightE, directionalLightE, pointLightArrayE);
        animateEditor(editorObjArray);
        changeColour();

    }
}
function changeColour(){
    for(var i in editorObjArray) {
        editorObjArray[i].r = redChange;
        editorObjArray[i].g = greenChange;
        editorObjArray[i].b = blueChange;

        editorObjArray[i].transparency = opacitySlider.option("value") !== 1.0;
        editorObjArray[i].alpha = opacitySlider.option("value");
    }
    ambientLightE.r = redAChange;
    ambientLightE.g = greenAChange;
    ambientLightE.b = blueAChange;

    pointLightArrayE[0].r = redPChange;
    pointLightArrayE[0].g = greenPChange;
    pointLightArrayE[0].b = bluePChange;

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
    console.log(textureSrc);
    editorObjArray[0].useTexture = true;
    editorObjArray[0].texture = webglE.createTexture();
    editorObjArray[0].initTexture(editorObjArray[0].texture, textureSrc, "editor");
}