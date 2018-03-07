/**
 * Created by jaroslavtkaciuk on 19/04/2017.
 */


function startEditorWindow() {
    canvasEditorArr.push(document.getElementById("editor-scene"));
    canvasEditorArr.push(document.getElementById("../shapes/cube.json"));
    canvasEditorArr.push(document.getElementById("../shapes/sphere.json"));
    canvasEditorArr.push(document.getElementById("../shapes/cone.json"));
    canvasEditorArr.push(document.getElementById("../shapes/cylinder.json"));
    canvasEditorArr.push(document.getElementById("../shapes/simpleSphere.json"));

    for (let i in canvasEditorArr) {
        initGLForEditor(canvasEditorArr[i]);
        //console.log(webglEditorArr[i]);
    }

    for (let i in webglEditorArr) {
        editorShader(webglEditorArr[i]);
        //console.log(shaderProgramEditorArr[i])
    }

    ambientLightE = new AmbientLight(redAChange, greenAChange, blueAChange);
    directionalLightE = new DirectionalLight(0, 0, 0, 0, 0, 50, false);
    pointLightArrayE.push(new PointLight("lamp", redPChange, greenPChange, bluePChange, 0, 0, -4, 15, 0.02, "editor", false));
    //pointLightArrayE.push(new PointLight("lamp2", 0.3, 0, 0, 0, 0, 4, 0, 0, "editor", false));

    for (let i in webglEditorArr) {
        webglEditorArr[i].clearColor(0, 0, 0, 1.0);
        webglEditorArr[i].enable(webglEditorArr[i].DEPTH_TEST);
    }

    initEditorEnvironment();


}

function initEditorEnvironment() {
    let srcArr = ["../shapes/cube.json", "../shapes/sphere.json", "../shapes/cone.json",
        "../shapes/cylinder.json", "../shapes/simpleSphere.json"];

    new LoadObject("../shapes/cube.json", "../assets/img/textures/sun.jpg", {
        "name": "forEditor",
        "z": -4,
        "yRot": 50,
        "yRotSpeed": 40,
        "animateRotation": true,
        "useTexture": false,
        "useCamera": true,
        "transparency": false,
        "alpha": 1.0,
        "type": "cube"
    }, "editor", webglEditorArr[0]);

    new LoadObject(srcArr[0], "../assets/img/textures/sun.jpg", {
        "name": srcArr[0],
        "z": -3.5,
        "yRot": 50,
        "yRotSpeed": 40,
        "animateRotation": true,
        "useTexture": false,
        "useCamera": true,
        "transparency": false,
        "alpha": 1.0
    }, "preview", webglEditorArr[1]);

    for (let i = 2; i < 6; i++) {
        initPreview(i);
    }

}

function initPreview(i) {
    let srcArr = ["../shapes/cube.json", "../shapes/sphere.json", "../shapes/cone.json",
        "../shapes/cylinder.json", "../shapes/simpleSphere.json"];

    if (((i - 1) - previewObjects) !== 0) {
        setTimeout(function () {
            initPreview(i)
        }, 50);
        return;
    }
    //if older object initialized -> init new object
    new LoadObject(srcArr[i - 1], "../assets/img/textures/sun.jpg", {
        "name": srcArr[i - 1],
        "z": -3.5,
        "yRot": 50,
        "yRotSpeed": 40,
        "animateRotation": true,
        "useTexture": false,
        "useCamera": true,
        "transparency": false,
        "alpha": 1.0
    }, "preview", webglEditorArr[i]);

    // Init loaded user objects
    if (i === 5) {
        setTimeout(function () {
            loadUserData("../shapes/user_shapes", "object");
        }, 50);
    }
}


function renderEditor() {
    drawScene(canvasEditorArr[0], webglEditorArr[0], objEditorArr, mvMatrixE, pMatrixE, mvMatrixStackE, shaderProgramEditorArr[0],
        ambientLightE, directionalLightE, pointLightArrayE);
    animateEditor(objEditorArr);
    changeEditorShapeColor();

    copyEditorToPreview();

    for (let i = 1; i < webglEditorArr.length; i++) {
        drawScene(canvasEditorArr[i], webglEditorArr[i], objPreviewArr.slice(i - 1, i), mvMatrixE, pMatrixE, mvMatrixStackE, shaderProgramEditorArr[i],
            ambientLightE, directionalLightE, pointLightArrayE);
    }

    animateEditor(objPreviewArr);
}

function changeEditorShapeColor() {
    for (let i in objEditorArr) {
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

function changeEditorShapeRotAngle() {
    for (let i in objEditorArr) {
        objEditorArr[i].xRot = xRotSlider;
        objEditorArr[i].yRot = yRotSlider;
        objEditorArr[i].zRot = zRotSlider;
    }
}

function copyEditorToPreview() {
    for (let i in objPreviewArr) {
        objPreviewArr[i].r = objEditorArr[0].r;
        objPreviewArr[i].g = objEditorArr[0].g;
        objPreviewArr[i].b = objEditorArr[0].b;
        objPreviewArr[i].xRot = objEditorArr[0].xRot;
        objPreviewArr[i].yRot = objEditorArr[0].yRot;
        objPreviewArr[i].zRot = objEditorArr[0].zRot;
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
        //let elapsed = timeNow - lastTime;
        for (let i in array) {
            if (array[i].animateRotation) {
                array[i].xRot += (array[i].xRotSpeed * elapsed) / 1000.0;
                array[i].yRot += (array[i].yRotSpeed * elapsed) / 1000.0;
                array[i].zRot += (array[i].zRotSpeed * elapsed) / 1000.0;

            }
        }
        orbitLight(pointLightArrayE);
    }
    lastTime = timeNow;

}

function applyTexture(textureSrc) {
    //console.log(textureSrc);
    objEditorArr[0].useTexture = true;
    objEditorArr[0].texture = webglEditorArr[0].createTexture();
    objEditorArr[0].initTexture(objEditorArr[0].texture, textureSrc, "editor", webglEditorArr[0]);

    if (objPreviewArr.length !== 0) {
        for (let i = 1; i < webglEditorArr.length; i++) {
            objPreviewArr[i - 1].useTexture = true;
            objPreviewArr[i - 1].texture = webglEditorArr[i].createTexture();

            objPreviewArr[i - 1].initTexture(objPreviewArr[i - 1].texture, textureSrc, "preview", webglEditorArr[i]);
        }
    }

}