/**
 * Created by jaroslavtkaciuk on 06/04/2017.
 */


function animate(array) {
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
        spaceImitation();
    }
    lastTime = timeNow;
}
var pyramidVertexPositionBuffer;

function initBuffers1() {
    pyramidVertexPositionBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, pyramidVertexPositionBuffer);
    var vertices = [
        // Front face
        0.0,  1.0,  0.0,
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,

        // Right face
        0.0,  1.0,  0.0,
        1.0, -1.0,  1.0,
        1.0, -1.0, -1.0,

        // Back face
        0.0,  1.0,  0.0,
        1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,

        // Left face
        0.0,  1.0,  0.0,
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0
    ];
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(vertices), webgl.STATIC_DRAW);
    pyramidVertexPositionBuffer.itemSize = 3;
    pyramidVertexPositionBuffer.numItems = 12;
}


function drawScene(canvas, webgl, array, mvMatrix, pMatrix, mvMatrixStack, shaderProgram, ambientLight, directionalLight, pointLightArray) {
    resize(canvas, webgl);
    webgl.viewport(0, 0, webgl.viewportWidth, webgl.viewportHeight);
    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);

    mat4.perspective(60, webgl.viewportWidth / webgl.viewportHeight, 0.1, 800.0, pMatrix);

    mat4.identity(mvMatrix);


    //------
    /*mat4.translate(mvMatrix, [0.0, 0.0, -4.0]);

    webgl.bindBuffer(webgl.ARRAY_BUFFER, pyramidVertexPositionBuffer);
    webgl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, pyramidVertexPositionBuffer.itemSize, webgl.FLOAT, false, 0, 0);

    webgl.uniform4f(shaderProgram.colorUniform, redChange, greenChange, blueChange, 1);
    webgl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    webgl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

    webgl.drawArrays(webgl.TRIANGLES, 0, pyramidVertexPositionBuffer.numItems);*/
    //----

    for (let i in array){
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
            array[i].sx,   0.0,  0.0,  0.0,
            0.0,  array[i].sy,   0.0,  0.0,
            0.0,  0.0,  array[i].sz,   0.0,
            0.0,  0.0,  0.0,  1.0
        ]);
        mat4.multiply(mvMatrix, scaleMatrix);

        array[i].rotation(mvMatrix);
        array[i].draw(webgl, mvMatrix, pMatrix, shaderProgram, ambientLight, directionalLight, pointLightArray);

        webgl.drawElements(webgl.TRIANGLES, array[i].vertexIndexBuffer.numItems, webgl.UNSIGNED_SHORT, 0);
        mvMatrix = mvPopMatrix(mvMatrixStack);
    }
}

function webGLStart() {
    canvas = document.getElementById("Scene");
    let loaderPlace = document.getElementById("loading");
    loaderPlace.style.left = canvas.width;
    loaderPlace.style.top = canvas.height/2;
    initGLForScene(canvas);
    mainShader();
    //initBuffers();

    ambientLight = new AmbientLight(0.35, 0.35, 0.35);
    directionalLight = new DirectionalLight(0.05, 0.05, 0.05, 0, 0, 50, false);
    pointLightArray.push(new PointLight("sun", 0.3, 0.2, 0.1, -10, 0, -50, 50, 0.025, "objArray", true));


    webgl.clearColor(0, 0, 0, 1.0);
    webgl.enable(webgl.DEPTH_TEST);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;


    keyboard = new KeyboardPresets("wasd", 0.5, 1.4);
    keyboard.shooterControls();



   /* sound = new Sound();
    sound.addSong(new Song("Standard sounds/rotation_engine.mp3", "rotationEngine"));
    sound.addSong(new Song("Standard sounds/space_engine.mp3", "spaceEngine"));
    sound.addSong(new Song("Standard sounds/space_ambient.mp3", "spaceAmbient"));


    sound.getSongByName("rotationEngine").sound.volume = 0.35;
    sound.getSongByName("spaceAmbient").repeat();
    sound.getSongByName("spaceAmbient").sound.volume = 0.10;
    sound.getSongByName("spaceAmbient").play();


    getKeyByName("w").songName = "spaceEngine";
    getKeyByName("w").useSong = true;

    getKeyByName("s").songName = "spaceEngine";
    getKeyByName("s").useSong = true;

    getKeyByName("a").songName = "rotationEngine";
    getKeyByName("a").useSong = true;

    getKeyByName("d").songName = "rotationEngine";
    getKeyByName("d").useSong = true;

    getKeyByName("shift").songName = "rotationEngine";
    getKeyByName("shift").useSong = true;

    getKeyByName("space").songName = "rotationEngine";
    getKeyByName("space").useSong = true;*/


    //TODO Grupavimas


    world(1000);
    demoPlayer();

    loaderElement = document.getElementById("loading-progress");
    loaderNode = document.createTextNode("");
    loading();

}

function loading(){
    console.log(loadedObjects + " / " + totalObjects);
    if(totalObjects <= loadedObjects) {
        var element = document.getElementById("loading");
        element.outerHTML = "";
        delete element;

        fpsElement = document.getElementById("fps");
        fpsNode = document.createTextNode("");
        avgFpsElement = document.getElementById("avgFps");
        avgFpsNode = document.createTextNode("");
        console.log("Objects loaded in scene: " + objArray.length);
        lastRenderedMainScene = new LastRendered();
        lastRenderedEditorScene = new LastRendered();
        startEditorWindow();
        render();
    }
    else{
        loaderElement.appendChild(loaderNode);
        loaderNode.nodeValue = ((loadedObjects/totalObjects)*100).toFixed(0) + "%";
        requestAnimationFrame(loading);
    }
}

function render() {
    requestAnimationFrame(render);
    handleKeys();
    drawScene(canvas, webgl, objArray, mvMatrix, pMatrix, mvMatrixStack, shaderProgram,
        ambientLight, directionalLight, pointLightArray);
    animate(objArray);
    fpsCounter();
    avgFps();
    renderEditor();

}

function world(size) {
    var cubeSrc = "Scripts/Shapes/cube.json";
    var cylinderSrc = "Scripts/Shapes/cylinder.json";
    var coneSrc = "Scripts/Shapes/cone.json";
    var simpleSphereSrc = "Scripts/Shapes/simpleSphere.json";
    var sphereSrc = "Scripts/Shapes/sphere.json";

    var object;
    var src, geometry;
    var rndObj;
    console.log("world size: " + size);
    for(var i = 0; i < size; i++) {

        rndObj = Math.floor(Math.random() * 4) + 1;
        switch (rndObj){
            case 1:
                src = "Standard textures/metal.jpg";
                break;
            case 2:
                src = "Standard textures/leather.jpg";
                break;
            case 3:
                src = "Standard textures/carbon_fiber.jpg";
                break;
            case 4:
                src = "Standard textures/wood.jpg";
                break;
        }
        rndObj = Math.floor(Math.random() * 5) + 1;
        switch (rndObj){
            case 1:
                geometry = cubeSrc;
                break;
            case 2:
                geometry = cylinderSrc;
                break;
            case 3:
                geometry = coneSrc;
                break;
            case 4:
                geometry = simpleSphereSrc;
                break;
            case 5:
                geometry = sphereSrc;
                break;
        }
        object = new LoadObject(geometry, src, {
            "name": Math.random() < 0.95 ? "stars" : String(i),
            "x": -52 + Math.random() * 75,
            "y": -22 + Math.random() * 45,
            "z": -50 - Math.random() * 50,
            "r": Math.random(),
            "g": Math.random(),
            "b": Math.random(),
            "xRot": -20 + Math.random() * 60,
            "yRot": -20 + Math.random() * 60,
            "zRot": -20 + Math.random() * 60,
            "xRotSpeed": Math.random() * 35,
            "yRotSpeed": Math.random() * 35,
            "zRotSpeed": Math.random() * 35,
            "animateRotation": Math.random() < 0.95,
            "useTexture": Math.random() > 0.5,
            "alpha" : Math.random() + 0.4
        });
    }
}

function demoPlayer() {
    new LoadObject("Scripts/Shapes/cylinder.json", "Standard textures/metal.jpg", {
        "name": "back",
        "x": 0,
        "y": -1,
        "z": -2.5,
        "sx": 0.4,
        "sy": 0.5,
        "sz": 0.8,
        "xRot": -90,
        "yRot": -10,
        "yRotSpeed": 10,
        "useTexture": true,
        "useCamera": true
    },);
    new LoadObject("Scripts/Shapes/cube.json", "Standard textures/metal.jpg", {
        "name": "wingL",
        "x": -0.8,
        "y": -0.7,
        "z": -2,
        "sx": 0.5,
        "sy": 0.04,
        "sz": 0.25,
        "useTexture": true,
        "useCamera": true
    });
    new LoadObject("Scripts/Shapes/cube.json", "Standard textures/metal.jpg", {
        "name": "wingR",
        "x": 0.8,
        "y": -0.7,
        "z": -2,
        "sx": 0.5,
        "sy": 0.04,
        "sz": 0.25,
        "useTexture": true,
        "useCamera": true
    });
    new LoadObject("Scripts/Shapes/cone.json", "Standard textures/metal.jpg", {
        "name": "wingRCone",
        "x": 1.75,
        "y": -0.85,
        "z": -2.55,
        "sx": 0.3,
        "sy": 0.3,
        "sz": 0.6,
        "xRot": -90,
        "yRot": 10,
        "yRotSpeed": 10,
        "animateRotation": true,
        "useTexture": true,
        "useCamera": true
    });
    new LoadObject("Scripts/Shapes/cone.json", "Standard textures/metal.jpg", {
        "name": "wingLCone",
        "x": -1.75,
        "y": -0.85,
        "z": -2.55,
        "sx": 0.3,
        "sy": 0.3,
        "sz": 0.6,
        "xRot": -90,
        "yRot": 10,
        "yRotSpeed": -10,
        "animateRotation": true,
        "useTexture": true,
        "useCamera": true
    });
}