/**
 * Created by jaroslavtkaciuk on 06/04/2017.
 */

//Main Scene
let webgl;
let shaderProgram;

let mvMatrix = mat4.create();
let mvMatrixStack = [];
let pMatrix = mat4.create();
//Editor window
let webglEditorArr = [];
let webglE;
let shaderProgramEditorArr = [];
let shaderProgramE;


let mvMatrixE = mat4.create();
let mvMatrixStackE = [];
let pMatrixE = mat4.create();
//let editorObjectLoaded = false;
let opacitySlider;
// Animation
let lastTime = 0;
// Frames per Second
let fpsElement;
let fpsNode;
let avgFpsElement;
let avgFpsNode;
let framesPassed = 0;
let fpsSum = 0;
let lastCalledTime = 0;
let fps = 0;
// Environment
let objArr = [];
let objEditorArr = [];
let objPreviewArr = [];
let lastRenderedMainScene, lastRenderedEditorScene;
let sound;
//Lightning
let ambientLight, directionalLight;
let pointLightArray = [];

let ambientLightE, directionalLightE;
let pointLightArrayE = [];
// Movement
let x = 0, y = 0, z = 0, xRotation = 0, yRotation = 0, zRotation = 0;
let keysArray = [];
let keyboard;
//Loading
let loadedObjects = 0;
let previewObjects = 0;
let totalObjects = 0;
let editorObjectLoaded = false;
let loaderElement;
let loaderNode;

let canvas;
//let editorCanvas;
let canvasEditorArr = [];

let elapsed = 0;
//Change Colour in Editor
let redChange = 0.5, blueChange = 0.5, greenChange = 0.5,
    redAChange = 0.5, blueAChange = 0.5, greenAChange = 0.5,
    redPChange = 0.2, bluePChange = 0.2, greenPChange = 0.2;
//Rotation Sliders
let xRotSlider = 0, yRotSlider = 0, zRotSlider = 0;


function initGLForScene(canvas) {
    try {
        webgl = canvas.getContext("experimental-webgl");
        webgl.viewportWidth = canvas.width;
        webgl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!webgl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}
function initGLForEditor(canvas) {
    try {
        if(webglEditorArr.length === 0)
            webglE = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
        else
            webglE = canvas.getContext("experimental-webgl");
        webglE.viewportWidth = canvas.width;
        webglE.viewportHeight = canvas.height;
        webglEditorArr.push(webglE);
    } catch (e) {
    }
    if (!webglE) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}
function resize(canvas, webgl) {
    // Lookup the size the browser is displaying the canvas.
    let displayWidth  = canvas.clientWidth;
    let displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    if (canvas.width  !== displayWidth ||
        canvas.height !== displayHeight) {

        // Make the canvas the same size
        canvas.width  = displayWidth;
        canvas.height = displayHeight;
    }
    webgl.viewportWidth = displayWidth;
    webgl.viewportHeight = displayHeight;
}
function handleLoadedTextureMain(texture) {
    webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, true);

    webgl.bindTexture(webgl.TEXTURE_2D, texture);
    webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, webgl.RGBA,   webgl.UNSIGNED_BYTE, texture.image);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.LINEAR);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.LINEAR_MIPMAP_NEAREST);
    webgl.generateMipmap(webgl.TEXTURE_2D);

    webgl.bindTexture(webgl.TEXTURE_2D, null);
}
function handleLoadedTextureEditor(texture, webglParam) {
    //for (let i in webglEditorArr) {
    webglParam.pixelStorei(webglParam.UNPACK_FLIP_Y_WEBGL, true);

    webglParam.bindTexture(webglParam.TEXTURE_2D, texture);
    webglParam.texImage2D(webglParam.TEXTURE_2D, 0, webglParam.RGBA, webglParam.RGBA, webglParam.UNSIGNED_BYTE, texture.image);
    webglParam.texParameteri(webglParam.TEXTURE_2D, webglParam.TEXTURE_MAG_FILTER, webglParam.LINEAR);
    webglParam.texParameteri(webglParam.TEXTURE_2D, webglParam.TEXTURE_MIN_FILTER, webglParam.LINEAR_MIPMAP_NEAREST);
    webglParam.generateMipmap(webglParam.TEXTURE_2D);

    webglParam.bindTexture(webglParam.TEXTURE_2D, null);
    //}

}
function mvPushMatrix(mvMatrix, mvMatrixStack) {
    let copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
}
function mvPopMatrix(mvMatrixStack) {
    return mvMatrixStack.pop();
}
function setMatrixUniforms(webgl, shaderProgram, mvMatrix, pMatrix) {
    webgl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    webgl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

    let normalMatrix = mat3.create();
    mat4.toInverseMat3(mvMatrix, normalMatrix);
    mat3.transpose(normalMatrix);
    webgl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
}
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
