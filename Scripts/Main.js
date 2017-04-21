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
        spaceImitation(elapsed);

        //sound


    }
    lastTime = timeNow;
}


function drawScene() {
    webgl.viewport(0, 0, webgl.viewportWidth, webgl.viewportHeight);
    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);

    mat4.perspective(60, webgl.viewportWidth / webgl.viewportHeight, 0.1, 800.0, pMatrix);

    mat4.identity(mvMatrix);

    for (var i in objArray){
        //console.log(objArray[i]);
        mvPushMatrix();

        if (!objArray[i].useCamera) {
            mat4.rotate(mvMatrix, degToRad(yRotation), [false, true, false]);
            mat4.translate(mvMatrix, [objArray[i].x + x, objArray[i].y + y, objArray[i].z + z]);
        }
        else {
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

var group;

function webGLStart() {
    var canvas = document.getElementById("Scene");
    var loaderPlace = document.getElementById("loading");
    loaderPlace.style.left = canvas.width/2.5;
    loaderPlace.style.top = canvas.height/4;
    initGL(canvas);
    new Shader();
    ambientLight = new AmbientLight(0.25, 0.25, 0.25);
    directionalLight = new DirectionalLight(0.15, 0.15, 0.15, 0, 0, 50);
    pointLightArray.push(new PointLight("sun", 0.6, 0.2, 0.1, -10, 0, -50, 50, 0.025));

    webgl.clearColor(0.0, 0.0, 0.0, 1.0);
    webgl.enable(webgl.DEPTH_TEST);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;


    keyboard = new KeyboardPresets("wasd", 0.5, 1.4);
    keyboard.shooterControls();



    sound = new Sound();
    sound.addSong(new Song("Standard sounds/rotation_engine.aiff", "rotationEngine"));
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


    //TODO Grupavimas
    //group = new Group("player");
    /*group.add(new LoadObject("Scripts/Shapes/cylinder.json", "Standard textures/metal.jpg", {
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
        //"animateRotation": true,
        "useTexture": true,
        "useCamera": true
    }));*/

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
        lastRendered = new LastRendered();
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
    drawScene();
    animate();
    fpsCounter();
    avgFps();
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
            "useTexture": Math.random() > 0.7,
            "alpha" : Math.random() + 0.4
        });
    }
}

function demoPlayer() {
    //totalObjects += 5;
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
        //"animateRotation": true,
        "useTexture": true,
        "useCamera": true
    });
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