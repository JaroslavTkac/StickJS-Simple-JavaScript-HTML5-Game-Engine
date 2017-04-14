/**
 * Created by jaroslavtkaciuk on 06/04/2017.
 */

var webgl;
var shaderProgram;

var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();
// Animation
var lastTime = 0;
// Frames per Second
var fpsElement;
var fpsNode;
var avgFpsElement;
var avgFpsNode;
var framesPassed = 0;
var fpsSum = 0;
var lastCalledTime = 0;
var fps = 0;
// Environment
var objArray = [];
var lastRendered;
//Lightning
var ambientLight, directionalLight, pointLight;
// Movement
var camera;
var x = 0, y = 0, z = 0, xRotation = 0, yRotation = 0, zRotation = 0;
var keysArray = [];



function initGL(canvas) {
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

function handleLoadedTexture(texture) {
    webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, true);

    webgl.bindTexture(webgl.TEXTURE_2D, texture);
    webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, webgl.RGBA, webgl.UNSIGNED_BYTE, texture.image);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.LINEAR);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.LINEAR_MIPMAP_NEAREST);
    webgl.generateMipmap(webgl.TEXTURE_2D);

    webgl.bindTexture(webgl.TEXTURE_2D, null);
}

function mvPushMatrix() {
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
}

function mvPopMatrix() {
    mvMatrix = mvMatrixStack.pop();
}

function setMatrixUniforms() {
    webgl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    webgl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

    var normalMatrix = mat3.create();
    mat4.toInverseMat3(mvMatrix, normalMatrix);
    mat3.transpose(normalMatrix);
    webgl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

