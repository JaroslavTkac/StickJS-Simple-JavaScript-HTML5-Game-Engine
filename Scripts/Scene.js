/**
 * Created by jaroslavtkaciuk on 06/04/2017.
 */


class LoadObject{
    constructor(shapeSrc, imageSrc, properties, saveTo){
        if(!(saveTo === "editor"))
            totalObjects ++;
        this.shape = null;
        this.loadJSON(shapeSrc, imageSrc, this, properties, saveTo);
    }
    loadJSON(shapeSrc, imageSrc, object, properties, saveTo) {
        let request = new XMLHttpRequest();
        request.open("GET", shapeSrc);

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if(request.status === 404) {
                    console.info(shapeSrc + " does not exist");
                }
                else {
                    let buffer;
                    if(saveTo === undefined || saveTo === "objArray") {
                        saveTo = "objArray";
                        buffer = initBuffers(JSON.parse(request.responseText), webgl);
                    }
                    else
                        buffer = initBuffers(JSON.parse(request.responseText), webglE);
                    object.shape = new CreateShape(buffer, imageSrc, saveTo);
                    return initProperties(object.shape, properties, saveTo);
                }
            }
        };
        request.send();
    }
}

class CreateShape{
    constructor(buffer, imageSrc, saveTo){
        this.buffer = buffer;
        this.vertexPositionBuffer = this.buffer["vertexPositionBuffer"];
        this.vertexNormalBuffer = this.buffer["vertexNormalBuffer"];
        this.vertexTextureCoordBuffer = this.buffer["vertexTextureCoordBuffer"];
        this.vertexIndexBuffer = this.buffer["vertexIndexBuffer"];
        this.useTexture = imageSrc !== undefined; //true when address exist
        this.textureSrc = imageSrc;
        this.name = "object";
        this.useCamera = false;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.sx = 1.0;
        this.sy = 1.0;
        this.sz = 1.0;
        this.alpha = 0.5;
        this.transparency = false;
        this.lighting = true;
        this.xRot = 0;
        this.yRot = 0;
        this.zRot = 0;
        this.animateRotation = false;
        this.xRotSpeed = 0;
        this.yRotSpeed = 0;
        this.zRotSpeed = 0;
        this.r = 0;
        this.g = 1;
        this.b = 0;
        if(saveTo === "objArray") {
            this.lastRendered = "main";
            this.texture = webgl.createTexture();
        }
        else {
            this.lastRendered = "editor";
            this.texture = webglE.createTexture();
        }
        this.initTexture(this.texture, this.textureSrc, saveTo);
    }
    initTexture(texture, src, saveTo) {
        if(this.useTexture) {
            texture.image = new Image();
            texture.image.onload = function () {
                if(saveTo === "objArray") {
                    handleLoadedTextureMain(texture);
                }
                else {
                    handleLoadedTextureEditor(texture);
                }
            };
            texture.image.src = src;
        }
    }
    draw(webgl, mvMatrix, pMatrix, shaderProgram, ambientLight, directionalLight, pointLightArray){
        if(this.lastRendered === "main") {
            glBindVertexBuffer(webgl, this.vertexPositionBuffer, shaderProgram, lastRenderedMainScene);

            glBindNormalBuffer(webgl, this.vertexNormalBuffer, shaderProgram, lastRenderedMainScene);
             glBindTextureBuffer(webgl, this.vertexTextureCoordBuffer, shaderProgram, lastRenderedMainScene);
             glBindTexture(webgl, this.texture, shaderProgram, lastRenderedMainScene);

             //Use Texture or Color
             glUseTexture(webgl, this.useTexture, shaderProgram, lastRenderedMainScene);

            glUseColor(webgl, this.r, this.g, this.b, shaderProgram, lastRenderedMainScene);
            //webgl.uniform4f(shaderProgram.colorUniform, this.r, this.g, this.b, 1);


            if (this.name === "editing") {
                console.log(this.r + " " + this.g + " " + this.b);
            }
            glPointLightIntensity(webgl, 250, shaderProgram, lastRenderedMainScene);

             //Transparency
             if (this.transparency)
             glTransparent(webgl, this.transparency, this.alpha, shaderProgram, lastRenderedMainScene);
             else
             glNonTransparent(webgl, this.transparency, 1.0, shaderProgram, lastRenderedMainScene);

             //Lighting
             glLighting(webgl, this.lighting, shaderProgram, lastRenderedMainScene);
             if (this.lighting) {
             //Ambient
             glAmbientLight(webgl, ambientLight.r, ambientLight.g, ambientLight.b, shaderProgram, lastRenderedMainScene);

             //Directional
             glDirectionalLightLocation(webgl, directionalLight.x, directionalLight.y, directionalLight.z, shaderProgram, lastRenderedMainScene);
             glDirectionalLight(webgl, directionalLight.r, directionalLight.g, directionalLight.b, shaderProgram, lastRenderedMainScene);

             //Point
             for(let i in pointLightArray) {
             glPointLightLocation(webgl, pointLightArray[i].x, pointLightArray[i].y, pointLightArray[i].z, shaderProgram, lastRenderedMainScene);
             glPointLight(webgl, pointLightArray[i].r, pointLightArray[i].g, pointLightArray[i].b, shaderProgram, lastRenderedMainScene);
             }
             }
            glBindBuffer(webgl, this.vertexIndexBuffer, lastRenderedMainScene);
        }
        else{
            glBindVertexBuffer(webgl, this.vertexPositionBuffer, shaderProgram, lastRenderedEditorScene);

            glBindNormalBuffer(webgl, this.vertexNormalBuffer, shaderProgram, lastRenderedEditorScene);
             glBindTextureBuffer(webgl, this.vertexTextureCoordBuffer, shaderProgram, lastRenderedEditorScene);
             glBindTexture(webgl, this.texture, shaderProgram, lastRenderedEditorScene);

             //Use Texture or Color
             glUseTexture(webgl, this.useTexture, shaderProgram, lastRenderedEditorScene);

            glUseColor(webgl, this.r, this.g, this.b, shaderProgram, lastRenderedEditorScene);


            if (this.name === "editing") {
                console.log(this.r + " " + this.g + " " + this.b);
            }
            glPointLightIntensity(webgl, 250, shaderProgram, lastRenderedEditorScene);

             //Transparency
             if (this.transparency)
             glTransparent(webgl, this.transparency, this.alpha, shaderProgram, lastRenderedEditorScene);
             else
             glNonTransparent(webgl, this.transparency, 1.0, shaderProgram, lastRenderedEditorScene);

             //Lighting
             glLighting(webgl, this.lighting, shaderProgram, lastRenderedEditorScene);
             if (this.lighting) {
             //Ambient
             glAmbientLight(webgl, ambientLight.r, ambientLight.g, ambientLight.b, shaderProgram, lastRenderedEditorScene);

             //Directional
             glDirectionalLightLocation(webgl, directionalLight.x, directionalLight.y, directionalLight.z, shaderProgram, lastRenderedEditorScene);
             glDirectionalLight(webgl, directionalLight.r, directionalLight.g, directionalLight.b, shaderProgram, lastRenderedEditorScene);

             //Point
             for(let i in pointLightArray) {
             glPointLightLocation(webgl, pointLightArray[i].x, pointLightArray[i].y, pointLightArray[i].z, shaderProgram, lastRenderedEditorScene);
             glPointLight(webgl, pointLightArray[i].r, pointLightArray[i].g, pointLightArray[i].b, shaderProgram, lastRenderedEditorScene);
             }
             }
            glBindBuffer(webgl, this.vertexIndexBuffer, lastRenderedEditorScene);
        }

        setMatrixUniforms(webgl, shaderProgram, mvMatrix, pMatrix);
    }
    rotation(mvMatrix) {
        if(!this.animateRotation) {
            mat4.rotate(mvMatrix, degToRad(this.xRot), [true, false, false]);
            mat4.rotate(mvMatrix, degToRad(this.yRot), [false, true, false]);
            mat4.rotate(mvMatrix, degToRad(this.zRot), [false, false, true]);
        }
        else {
            mat4.rotate(mvMatrix, degToRad(this.xRot), [true, false, false]);
            mat4.rotate(mvMatrix, degToRad(this.yRot), [false, true, false]);
            mat4.rotate(mvMatrix, degToRad(this.zRot), [false, false, true]);
        }
    }
}
function initBuffers(object, webgl) {
    var vertexPositionBuffer = webgl.createBuffer();
    var vertexNormalBuffer = webgl.createBuffer();
    var vertexTextureCoordBuffer = webgl.createBuffer();
    var vertexIndexBuffer = webgl.createBuffer();

    webgl.bindBuffer(webgl.ARRAY_BUFFER, vertexNormalBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(object.normals), webgl.STATIC_DRAW);
    vertexNormalBuffer.itemSize = 3;
    vertexNormalBuffer.numItems = object.normals.length / 3;

    webgl.bindBuffer(webgl.ARRAY_BUFFER, vertexTextureCoordBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(object.texturecoords), webgl.STATIC_DRAW);
    vertexTextureCoordBuffer.itemSize = 2;
    vertexTextureCoordBuffer.numItems = object.texturecoords.length / 2;

    webgl.bindBuffer(webgl.ARRAY_BUFFER, vertexPositionBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(object.vertices), webgl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = 3;
    vertexPositionBuffer.numItems = object.vertices.length / 3;

    webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
    webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.faces), webgl.STATIC_DRAW);
    vertexIndexBuffer.itemSize = 1;
    vertexIndexBuffer.numItems = object.faces.length;

    return {
        "vertexPositionBuffer": vertexPositionBuffer,
        "vertexNormalBuffer": vertexNormalBuffer,
        "vertexTextureCoordBuffer": vertexTextureCoordBuffer,
        "vertexIndexBuffer": vertexIndexBuffer
    };

}
function initProperties(object, properties, saveTo){
    if(properties["name"] !== undefined)
        object.name = properties["name"];

    if(properties["useCamera"] !== undefined)
        object.useCamera = properties["useCamera"];

    if(properties["x"] !== undefined)
        object.x = properties["x"];
    if(properties["y"] !== undefined)
        object.y = properties["y"];
    if(properties["z"] !== undefined)
        object.z = properties["z"];

    if(properties["r"] !== undefined)
        object.r = properties["r"];
    if(properties["g"] !== undefined)
        object.g = properties["g"];
    if(properties["b"] !== undefined)
        object.b = properties["b"];

    if(properties["sx"] !== undefined)
        object.sx = properties["sx"];
    if(properties["sy"] !== undefined)
        object.sy = properties["sy"];
    if(properties["sz"] !== undefined)
        object.sz = properties["sz"];

    if(properties["xRot"] !== undefined)
        object.xRot = properties["xRot"];
    if(properties["yRot"] !== undefined)
        object.yRot = properties["yRot"];
    if(properties["zRot"] !== undefined)
        object.zRot = properties["zRot"];

    if(properties["xRotSpeed"] !== undefined)
        object.xRotSpeed = properties["xRotSpeed"];
    if(properties["yRotSpeed"] !== undefined)
        object.yRotSpeed = properties["yRotSpeed"];
    if(properties["zRotSpeed"] !== undefined)
        object.zRotSpeed = properties["zRotSpeed"];

    if(properties["animateRotation"] !== undefined)
        object.animateRotation = properties["animateRotation"];

    if(properties["useTexture"] !== undefined)
        object.useTexture = properties["useTexture"];
    if(properties["textureSrc"] !== undefined)
        object.textureSrc = properties["textureSrc"];
    if(properties["alpha"] !== undefined)
        object.alpha = properties["alpha"];
    if(properties["transparency"] !== undefined)
        object.transparency = properties["transparency"];
    if(properties["lighting"] !== undefined)
        object.lighting = properties["lighting"];


    if(saveTo === "objArray") {
        objArray.push(object);
        loadedObjects++;
    }
    if(saveTo === "editor") {
        console.log(object);
        //console.log(object.vertexIndexBuffer);
        editorObjArray.push(object);
        //console.log(editorObjArray.size);
    }
}
function modifyObjByName(name){
    for (let i in objArray)
        if(objArray[i].name === name)
            return objArray[i];
}
