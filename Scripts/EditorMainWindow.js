/**
 * Created by jaroslavtkaciuk on 19/04/2017.
 */


function startEditorWindow(){
    editorCanvas = document.getElementById("Editor-Scene");
    initGLForEditor(editorCanvas);
    editorShader();

    ambientLightE = new AmbientLight(.5, .5, .5);
    directionalLightE = new DirectionalLight(0, 0, 0, 0, 0, 50);
    pointLightArrayE.push(new PointLight("sun", 0.0, 0.0, 0.0, -10, 0, -50, 50, 0.025, "editor", false));

    webglE.clearColor(0, 0, 0, 1.0);
    webglE.enable(webglE.DEPTH_TEST);

    new LoadObject("Scripts/Shapes/cube.json", "Standard textures/wood.jpg", {
        "name": "editing",
        "x": 0,
        "y": 0,
        "z": -5,
        "r": 1,
        "yRot": 50,
        "yRotSpeed": 275,
        "animateRotation": Math.random() < 0.95,
        "useTexture": false,
        "useCamera": true,
    }, "editor");

}
function renderEditor() {
    drawScene(editorCanvas, webglE, editorObjArray, mvMatrixE, pMatrixE, mvMatrixStackE, shaderProgramE,
        ambientLightE, directionalLightE, pointLightArrayE);
    animateEditor(editorObjArray);
    changeColour();
}
function changeColour(){
    for(var i in editorObjArray) {
        editorObjArray[i].r = redChange;
        editorObjArray[i].g = greenChange;
        editorObjArray[i].b = blueChange;
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
    }
    lastTime = timeNow;
}