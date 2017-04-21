/**
 * Created by jaroslavtkaciuk on 06/04/2017.
 */


class LoadObject{
    constructor(shapeSrc, imageSrc, properties){
        totalObjects ++;
        this.shape = null;
        this.loadJSON(shapeSrc, imageSrc, this, properties);
    }
    loadJSON(shapeSrc, imageSrc, object, properties) {
        var request = new XMLHttpRequest();
        request.open("GET", shapeSrc);

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if(request.status === 404) {
                    console.info(shapeSrc + " does not exist");
                }
                else {
                    var buffer = initBuffers(JSON.parse(request.responseText));
                    object.shape = new CreateShape(buffer, imageSrc);
                    return initProperties(object.shape, properties);
                }
            }
        };
        request.send();
    }

}

class CreateShape{
    constructor(buffer, imageSrc){
        this.buffer = buffer;
        this.vertexPositionBuffer = this.buffer["vertexPositionBuffer"];
        this.vertexNormalBuffer = this.buffer["vertexNormalBuffer"];
        this.vertexTextureCoordBuffer = this.buffer["vertexTextureCoordBuffer"];
        this.vertexIndexBuffer = this.buffer["vertexIndexBuffer"];
        this.texture = webgl.createTexture();
        this.useTexture = imageSrc !== undefined; //true when address exist
        this.textureSrc = imageSrc;
        this.initTexture(this.texture, this.textureSrc);
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
    }
    initTexture(texture, src) {
        if(this.useTexture) {
            texture.image = new Image();
            texture.image.onload = function () {
                handleLoadedTexture(texture)
            };
            texture.image.src = src;
        }
    }
    draw(){
        glBindVertexBuffer(webgl, this.vertexPositionBuffer);
        glBindNormalBuffer(webgl, this.vertexNormalBuffer);
        glBindTextureBuffer(webgl, this.vertexTextureCoordBuffer);
        glBindTexture(webgl, this.texture);

        //Use Texture or Color
        glUseTexture(webgl, this.useTexture);
        glUseColor(webgl, this.r, this.g, this.b);

        glPointLightIntensity(webgl, 250);

        //Transparency
        if (this.transparency)
            glTransparent(webgl, this.transparency, this.alpha);
        else
            glNonTransparent(webgl, this.transparency, 1.0);

        //Lighting
        glLighting(webgl, this.lighting);
        if (this.lighting) {
            //Ambient
            glAmbientLight(webgl, ambientLight.r, ambientLight.g, ambientLight.b);

            //Directional
            glDirectionalLightLocation(webgl, directionalLight.x, directionalLight.y, directionalLight.z);
            glDirectionalLight(webgl, directionalLight.r, directionalLight.g, directionalLight.b);

            //Point
            for(var i in pointLightArray) {
                glPointLightLocation(webgl, pointLightArray[i].x, pointLightArray[i].y, pointLightArray[i].z);
                glPointLight(webgl, pointLightArray[i].r, pointLightArray[i].g, pointLightArray[i].b);
            }
        }
        glBindBuffer(webgl, this.vertexIndexBuffer);

        setMatrixUniforms();
    }
    rotation() {
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
function initBuffers(object) {
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
function initProperties(object, properties){
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

    objArray.push(object);
    loadedObjects++;
}
function modifyObjByName(name){
    for (var i in objArray)
        if(objArray[i].name == name)
            return objArray[i];
}
