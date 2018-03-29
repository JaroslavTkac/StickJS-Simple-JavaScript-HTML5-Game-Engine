/**
 * Created by jaroslavtkaciuk on 06/04/2017.
 */


function animate(array) {
    let timeNow = new Date().getTime();
    if (lastTime !== 0) {
        elapsed = timeNow - lastTime;
        for (let i in array) {
            if (array[i].animateRotation) {
                array[i].xRot += (array[i].xRotSpeed * elapsed) / 1000.0;
                array[i].yRot += (array[i].yRotSpeed * elapsed) / 1000.0;
                array[i].zRot += (array[i].zRotSpeed * elapsed) / 1000.0;
            }
        }
        //orbitLight(pointLight);
    }
    lastTime = timeNow;
}

function drawScene(canvas, webgl, array, mvMatrix, pMatrix, mvMatrixStack, shaderProgram, ambientLight, directionalLight, pointLight) {
    resize(canvas, webgl);
    webgl.viewport(0, 0, webgl.viewportWidth, webgl.viewportHeight);
    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);

    mat4.perspective(75, webgl.viewportWidth / webgl.viewportHeight, 0.1, 1200.0, pMatrix);

    mat4.identity(mvMatrix);


    for (let i in array) {
        mvPushMatrix(mvMatrix, mvMatrixStack);

        if (!array[i].useCamera) {
            mat4.rotate(mvMatrix, degToRad(yRotation), [false, true, false]);
            mat4.translate(mvMatrix, [array[i].x + x, array[i].y + y, array[i].z + z]);
        }
        else {
            mat4.translate(mvMatrix, [array[i].x, array[i].y, array[i].z]);
        }

        //Scaling
        let scaleMatrix = new Float32Array([
            array[i].sx, 0.0, 0.0, 0.0,
            0.0, array[i].sy, 0.0, 0.0,
            0.0, 0.0, array[i].sz, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]);
        mat4.multiply(mvMatrix, scaleMatrix);

        array[i].rotation(mvMatrix);
        array[i].draw(webgl, mvMatrix, pMatrix, shaderProgram, ambientLight, directionalLight, pointLight);

        webgl.drawElements(webgl.TRIANGLES, array[i].vertexIndexBuffer.numItems, webgl.UNSIGNED_SHORT, 0);
        mvMatrix = mvPopMatrix(mvMatrixStack);
    }
}

function webGLStart() {
    canvas = document.getElementById("Scene");
    initGLForScene(canvas);
    mainShader();

    ambientLight = new AmbientLight(0.35, 0.35, 0.35);
    directionalLight = new DirectionalLight(0.05, 0.05, 0.05, 0, 0, 50, false);
    pointLightArray.push(new PointLight("", 0, 0, 0, 20, 0, -30, null, null, null, null));

    pointLight = new PointLight("", 0, 0, 0, 20, 0, -30, null, null, null, null);

    webgl.clearColor(0, 0, 0, 1.0);
    webgl.enable(webgl.DEPTH_TEST);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;


    startEditorWindow();
    loading();
}


function loading() {

    console.log(loadedObjects + " / " + totalObjects);
    if (totalObjects <= loadedObjects) {
        readyToSaveData = true;
        console.log("Objects loaded in scene: " + objArr.length);
        lastRenderedMainScene = new LastRendered();

        if(projectType === "general") {
            fpsElement = document.getElementById("fps");
            fpsNode = document.createTextNode("");
            avgFpsElement = document.getElementById("avgFps");
            avgFpsNode = document.createTextNode("");
            xyzElement = document.getElementById("xyz");
            xyzNode = document.createTextNode("");
        }
        
        render();
    }
    else {
        requestAnimationFrame(loading);
    }
}


function render() {
    requestAnimationFrame(render);
    handleKeys();
    drawScene(canvas, webgl, objArr, mvMatrix, pMatrix, mvMatrixStack, shaderProgram,
        ambientLight, directionalLight, pointLight);
    animate(objArr);
    renderEditor();
    userCode();

    if(playFrames) {
        frameCounter++;
    }

    if(projectType === "general") {
        fpsCounter();
        avgFps();
        displayXYZ();
    }
}

function fpsCounter() {
    let delta = (Date.now() - lastCalledTime) / 1000;
    lastCalledTime = Date.now();
    fps = 1 / delta;
    fpsSum += fps;
    fpsElement.appendChild(fpsNode);
    fpsNode.nodeValue = "Fps: " + fps.toFixed(2);
}
function avgFps(){
    framesPassed++;
    avgFpsElement.appendChild(avgFpsNode);
    avgFpsNode.nodeValue = "Avg. Fps: " + (fpsSum/framesPassed).toFixed(2);
}
function displayXYZ(){
    xyzElement.appendChild(xyzNode);
    xyzNode.nodeValue = "x: " + x.toFixed(2) + " y: " + y.toFixed(2) + " z: " + z.toFixed(2);
}