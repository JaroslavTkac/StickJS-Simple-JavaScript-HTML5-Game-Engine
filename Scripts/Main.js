/**
 * Created by jaroslavtkaciuk on 06/04/2017.
 */


function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;
        for(var i in objArray){
            if(objArray[i].animateRotation){
                objArray[i].xRot += (objArray[i].xRotSpeed * elapsed) / 1000.0;
                objArray[i].yRot += (objArray[i].yRotSpeed * elapsed) / 1000.0;
                objArray[i].zRot += (objArray[i].zRotSpeed * elapsed) / 1000.0;
            }
        }
        orbitLight();
    }
    lastTime = timeNow;
}


function drawScene() {
    webgl.viewport(0, 0, webgl.viewportWidth, webgl.viewportHeight);
    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);

    mat4.perspective(60, webgl.viewportWidth / webgl.viewportHeight, 0.1, 150.0, pMatrix);

    mat4.identity(mvMatrix);

    for (var i in objArray){
        //console.log(objArray[i]);
        mvPushMatrix();

        if(!objArray[i].useCamera) {
            mat4.rotate(mvMatrix, degToRad(yRotation), [false, true, false]);
            mat4.translate(mvMatrix, [objArray[i].x + x, objArray[i].y + y, objArray[i].z + z]);
        }
        else{
            mat4.translate(mvMatrix, [objArray[i].x, objArray[i].y, objArray[i].z]);
        }


        //Scaling
        var scaleMatrix = new Float32Array([
            objArray[i].sx,   0.0,  0.0,  0.0,
            0.0,  objArray[i].sy,   0.0,  0.0,
            0.0,  0.0,  objArray[i].sz,   0.0,
            0.0,  0.0,  0.0,  1.0
        ]);
        mat4.multiply(mvMatrix, scaleMatrix);


        objArray[i].rotation();
        objArray[i].draw();


        webgl.drawElements(webgl.TRIANGLES, objArray[i].vertexIndexBuffer.numItems, webgl.UNSIGNED_SHORT, 0);
        mvPopMatrix();
    }
}

function webGLStart() {
    var canvas = document.getElementById("Scene");
    initGL(canvas);
    var shader = new Shader();
    ambientLight = new AmbientLight(0.1, 0.1, 0.1);
    directionalLight = new DirectionalLight(0.15, 0.15, 0.15, 0, 0, 30);
    pointLight = new PointLight(1, 0.5, 0, -10, 0, -30);

    webgl.clearColor(0.0, 0.0, 0.0, 1.0);
    webgl.enable(webgl.DEPTH_TEST);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    //simpleControls(1);
    shooterControls("w", "s", 1);
    var cubeSrc = "Scripts/Shapes/cube.json";
    var cylinderSrc = "Scripts/Shapes/cylinder.json";
    var coneSrc = "Scripts/Shapes/cone.json";
    var simpleSphereSrc = "Scripts/Shapes/simpleSphere.json";
    var sphereSrc = "Scripts/Shapes/sphere.json";

    //camera = new Camera();

    var object;
    var src, geometry;
    var rndObj;

    for(var i = 0; i < 1200; i++) {
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
            "name": String(i),
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
            "useTexture": Math.random() < 0.5,
            "transparency": Math.random() < 0.5,
            "alpha" : Math.random() + 0.4
        });
    }

    new LoadObject(simpleSphereSrc, "Standard textures/sun.jpg", {
        "name": "player",
        "x": 0,
        "y": -1,
        "z": -3,
        "sx": 0.5,
        "sy": 0.5,
        "sz": 0.5,
        "yRot": -20,
        "yRotSpeed": 35,
        //"animateRotation": true,
        "useTexture": true,
        "useCamera": true
    });

    //setTimeout(function () {
        fpsElement = document.getElementById("fps");
        fpsNode = document.createTextNode("");
        avgFpsElement = document.getElementById("avgFps");
        avgFpsNode = document.createTextNode("");
        console.log("Objects loaded in scene: " + objArray.length);
        lastRendered = new LastRendered();
        render();
    //}, 100);
}

function render() {
    requestAnimationFrame(render);
    handleKeys();
    drawScene();
    animate();
    fpsCounter();
    avgFps();
}

function fpsCounter() {
    var delta = (Date.now() - lastCalledTime) / 1000;
    lastCalledTime = Date.now();
    fps = 1 / delta;
    fpsSum += fps;
    fpsElement.appendChild(fpsNode);
    fpsNode.nodeValue = fps.toFixed(1);
}
function avgFps(){
    framesPassed++;
    avgFpsElement.appendChild(avgFpsNode);
    avgFpsNode.nodeValue = (fpsSum/framesPassed).toFixed(2);
}