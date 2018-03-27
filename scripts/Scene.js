/**
 * Created by jaroslavtkaciuk on 06/04/2017.
 */


class LoadObject {
    constructor(shapeSrc, imageSrc, properties, saveTo, webglParam) {
        //if(!(saveTo === "editor") && !(saveTo === "preview"))
        totalObjects++;
        this.shape = null;

        this.loadJSON(shapeSrc, imageSrc, this, properties, saveTo, webglParam);
    }

    loadJSON(shapeSrc, imageSrc, object, properties, saveTo, webglParam) {
        let request = new XMLHttpRequest();
        request.open("GET", shapeSrc);

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 404) {
                    console.info(shapeSrc + " does not exist");
                }
                else {
                    let buffer;
                    if (saveTo === undefined || saveTo === "objArr") {
                        saveTo = "objArr";
                        buffer = initBuffers(JSON.parse(request.responseText), webgl);
                        object.shape = new CreateShape(buffer, imageSrc, saveTo, webgl);
                    }
                    else {
                        buffer = initBuffers(JSON.parse(request.responseText), webglParam);
                        object.shape = new CreateShape(buffer, imageSrc, saveTo, webglParam);
                    }
                    return initProperties(object.shape, properties, saveTo);
                }
            }
        };
        request.send();
    }
}

class CreateShape {
    constructor(buffer, imageSrc, saveTo, webglParam) {
        this.buffer = buffer;
        this.vertexPositionBuffer = this.buffer["vertexPositionBuffer"];
        this.vertexNormalBuffer = this.buffer["vertexNormalBuffer"];
        this.vertexTextureCoordBuffer = this.buffer["vertexTextureCoordBuffer"];
        this.vertexIndexBuffer = this.buffer["vertexIndexBuffer"];
        this.useTexture = imageSrc !== undefined; //true when address exist
        this.textureSrc = imageSrc;
        this.name = "object";
        this.savedShapeName = "none";
        this.jsonPath = "none";
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
        this.r = 0.5;
        this.g = 0.5;
        this.b = 0.5;
        this.type = "none";
        //this.textureLoading = false;
        if (saveTo === "objArr") {
            this.lastRendered = "main";
            this.texture = webglParam.createTexture();
        }
        if (saveTo === "editor") {
            this.lastRendered = "editor";
            this.texture = webglParam.createTexture();
        }
        if (saveTo === "preview") {
            this.lastRendered = "editor";
            this.texture = webglParam.createTexture();
        }
        this.initTexture(this.texture, this.textureSrc, saveTo, webglParam);
    }

    initTexture(texture, src, saveTo, webglParam) {
        if (this.useTexture) {
            texture.image = new Image();
            texture.image.onload = function () {
                if (saveTo === "objArr") {
                    handleLoadedTextureMain(texture);
                }
                else {
                    handleLoadedTextureEditor(texture, webglParam);
                }
            };
            texture.image.src = src;
        }
    }

    draw(webgl, mvMatrix, pMatrix, shaderProgram, ambientLight, directionalLight, pointLightArray) {
        if (this.lastRendered === "main") {
            glBindVertexBuffer(webgl, this.vertexPositionBuffer, shaderProgram, lastRenderedMainScene);

            glBindNormalBuffer(webgl, this.vertexNormalBuffer, shaderProgram, lastRenderedMainScene);
            glBindTextureBuffer(webgl, this.vertexTextureCoordBuffer, shaderProgram, lastRenderedMainScene);
            glBindTexture(webgl, this.texture, shaderProgram, lastRenderedMainScene);

            //Use Texture or Color
            glUseTexture(webgl, this.useTexture, shaderProgram, lastRenderedMainScene);

            glUseColor(webgl, this.r, this.g, this.b, shaderProgram, lastRenderedMainScene);

            glPointLightIntensity(webgl, 250, shaderProgram, lastRenderedMainScene);

            //Transparency
            if (this.transparency)
                glTransparent(webgl, this.transparency, 1.0, shaderProgram, lastRenderedMainScene); //this.alpha
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
                for (let i in pointLightArray) {
                    glPointLightLocation(webgl, pointLightArray[i].x, pointLightArray[i].y, pointLightArray[i].z, shaderProgram, lastRenderedMainScene);
                    glPointLight(webgl, pointLightArray[i].r, pointLightArray[i].g, pointLightArray[i].b, shaderProgram, lastRenderedMainScene);
                }
            }
            glBindBuffer(webgl, this.vertexIndexBuffer, lastRenderedMainScene);
        }
        else {
            //glBindVertexBuffer(webgl, this.vertexPositionBuffer, shaderProgram, lastRenderedEditorScene);
            webgl.bindBuffer(webgl.ARRAY_BUFFER, this.vertexPositionBuffer);
            webgl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, webgl.FLOAT, false, 0, 0);

            //glBindNormalBuffer(webgl, this.vertexNormalBuffer, shaderProgram, lastRenderedEditorScene);
            webgl.bindBuffer(webgl.ARRAY_BUFFER, this.vertexNormalBuffer);
            webgl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.vertexNormalBuffer.itemSize, webgl.FLOAT, false, 0, 0);

            //glBindTextureBuffer(webgl, this.vertexTextureCoordBuffer, shaderProgram, lastRenderedEditorScene);
            webgl.bindBuffer(webgl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
            webgl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.vertexTextureCoordBuffer.itemSize, webgl.FLOAT, false, 0, 0);
            webgl.activeTexture(webgl.TEXTURE0);

            //glBindTexture(webgl, this.texture, shaderProgram, lastRenderedEditorScene);
            webgl.bindTexture(webgl.TEXTURE_2D, this.texture);
            webgl.uniform1i(shaderProgram.samplerUniform, 0);

            //Use Texture or Color
            //glUseTexture(webgl, this.useTexture, shaderProgram, lastRenderedEditorScene);
            webgl.uniform1i(shaderProgram.useTexturesUniform, this.useTexture);

            //glUseColor(webgl, this.r, this.g, this.b, shaderProgram, lastRenderedEditorScene);
            webgl.uniform4f(shaderProgram.colorUniform, this.r, this.g, this.b, 1);

            //glPointLightIntensity(webgl, 250, shaderProgram, lastRenderedEditorScene);
            webgl.uniform1f(shaderProgram.pointLightingIntensityUniform, 250);

            //Transparency
            if (this.transparency) {
                //glTransparent(webgl, this.transparency, this.alpha, shaderProgram, lastRenderedEditorScene);
                webgl.blendFunc(webgl.SRC_ALPHA, webgl.ONE);
                webgl.enable(webgl.BLEND);
                webgl.disable(webgl.DEPTH_TEST);
                webgl.uniform1f(shaderProgram.alphaUniform, this.alpha);
            }
            else {
                //glNonTransparent(webgl, this.transparency, 1.0, shaderProgram, lastRenderedEditorScene);
                webgl.disable(webgl.BLEND);
                webgl.enable(webgl.DEPTH_TEST);
                webgl.uniform1f(shaderProgram.alphaUniform, 1.0);
            }

            //Lighting
            //glLighting(webgl, this.lighting, shaderProgram, lastRenderedEditorScene);
            webgl.uniform1i(shaderProgram.useLightingUniform, this.lighting);
            if (this.lighting) {
                //Ambient
                //glAmbientLight(webgl, ambientLight.r, ambientLight.g, ambientLight.b, shaderProgram, lastRenderedEditorScene);
                webgl.uniform3f(shaderProgram.ambientColorUniform, ambientLight.r, ambientLight.g, ambientLight.b);

                //Directional
                //glDirectionalLightLocation(webgl, directionalLight.x, directionalLight.y, directionalLight.z, shaderProgram, lastRenderedEditorScene);
                webgl.uniform3fv(shaderProgram.lightingDirectionUniform, vec3.scale([directionalLight.x, directionalLight.y, directionalLight.z], -1));
                //glDirectionalLight(webgl, directionalLight.r, directionalLight.g, directionalLight.b, shaderProgram, lastRenderedEditorScene);
                webgl.uniform3f(shaderProgram.directionalColorUniform, directionalLight.r, directionalLight.g, directionalLight.b);

                //Point
                for (let i in pointLightArray) {
                    //glPointLightLocation(webgl, pointLightArray[i].x, pointLightArray[i].y, pointLightArray[i].z, shaderProgram, lastRenderedEditorScene);
                    webgl.uniform3f(shaderProgram.pointLightingLocationUniform, pointLightArray[i].x, pointLightArray[i].y, pointLightArray[i].z);
                    //glPointLight(webgl, pointLightArray[i].r, pointLightArray[i].g, pointLightArray[i].b, shaderProgram, lastRenderedEditorScene);
                    webgl.uniform3f(shaderProgram.pointLightingColorUniform, pointLightArray[i].r, pointLightArray[i].g, pointLightArray[i].b);
                }
            }
            //glBindBuffer(webgl, this.vertexIndexBuffer, lastRenderedEditorScene);
            webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
        }
        setMatrixUniforms(webgl, shaderProgram, mvMatrix, pMatrix);
    }

    rotation(mvMatrix) {
        //if(!this.animateRotation) {
        mat4.rotate(mvMatrix, degToRad(this.xRot), [true, false, false]);
        mat4.rotate(mvMatrix, degToRad(this.yRot), [false, true, false]);
        mat4.rotate(mvMatrix, degToRad(this.zRot), [false, false, true]);
        /* }
         else {
             mat4.rotate(mvMatrix, degToRad(this.xRot), [true, false, false]);
             mat4.rotate(mvMatrix, degToRad(this.yRot), [false, true, false]);
             mat4.rotate(mvMatrix, degToRad(this.zRot), [false, false, true]);
         }*/
    }
    setColorR(r){
        if(r >= 1){
            this.r = 1;
        }
        if(r <= 0){
            this.r = 0;
        }
    }
    setColorB(b){
        if(b >= 1){
            this.b = 1;
        }
        if(b <= 0){
            this.b = 0;
        }
    }
    setColorG(g){
        if(g >= 1){
            this.g = 1;
        }
        if(g <= 0){
            this.g = 0;
        }
    }
    setOpacity(opacity){
        if(opacity >= 1){
            this.alpha = 1;
        }
        if(opacity <= 0){
            this.alpha = 0;
        }
    }
}

function initBuffers(object, webgl) {
    let vertexPositionBuffer = webgl.createBuffer();
    let vertexNormalBuffer = webgl.createBuffer();
    let vertexTextureCoordBuffer = webgl.createBuffer();
    let vertexIndexBuffer = webgl.createBuffer();

    //console.log(webgl);
    //console.log(object);

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

function initProperties(object, properties, saveTo) {
    if (properties["name"] !== undefined)
        object.name = properties["name"];
    if (properties["savedShapeName"] !== undefined)
        object.savedShapeName = properties["savedShapeName"];
    if (properties["jsonPath"] !== undefined)
        object.jsonPath = properties["jsonPath"];

    if (properties["useCamera"] !== undefined)
        object.useCamera = properties["useCamera"];

    if (properties["x"] !== undefined)
        object.x = properties["x"];
    if (properties["y"] !== undefined)
        object.y = properties["y"];
    if (properties["z"] !== undefined)
        object.z = properties["z"];

    if (properties["r"] !== undefined)
        object.r = properties["r"];
    if (properties["g"] !== undefined)
        object.g = properties["g"];
    if (properties["b"] !== undefined)
        object.b = properties["b"];

    if (properties["sx"] !== undefined)
        object.sx = properties["sx"];
    if (properties["sy"] !== undefined)
        object.sy = properties["sy"];
    if (properties["sz"] !== undefined)
        object.sz = properties["sz"];

    if (properties["xRot"] !== undefined)
        object.xRot = properties["xRot"];
    if (properties["yRot"] !== undefined)
        object.yRot = properties["yRot"];
    if (properties["zRot"] !== undefined)
        object.zRot = properties["zRot"];

    if (properties["xRotSpeed"] !== undefined)
        object.xRotSpeed = properties["xRotSpeed"];
    if (properties["yRotSpeed"] !== undefined)
        object.yRotSpeed = properties["yRotSpeed"];
    if (properties["zRotSpeed"] !== undefined)
        object.zRotSpeed = properties["zRotSpeed"];

    if (properties["animateRotation"] !== undefined)
        object.animateRotation = properties["animateRotation"];

    if (properties["useTexture"] !== undefined)
        object.useTexture = properties["useTexture"];
    if (properties["textureSrc"] !== undefined)
        object.textureSrc = properties["textureSrc"];
    if (properties["alpha"] !== undefined)
        object.alpha = properties["alpha"];
    if (properties["transparency"] !== undefined)
        object.transparency = properties["transparency"];
    if (properties["lighting"] !== undefined)
        object.lighting = properties["lighting"];
    if (properties["type"] !== undefined)
        object.type = properties["type"];


    if (saveTo === "objArr") {
        objArr.push(object);
        loadedObjects++;
        updateAbleToDeleteLiveShapesInSceneList();
    }
    if (saveTo === "editor") {
        objEditorArr.push(object);
        loadedObjects++;
        editorObjectLoaded = true;
    }
    if (saveTo === "preview") {
        objPreviewArr.push(object);
        loadedObjects++;
        previewObjects++;
        uploadedObjectLoadedSuccessfully = true;
    }
}

function modifyObjByName(name) {
    for (let i in objArr)
        if (objArr[i].name === name)
            return objArr[i];
}
