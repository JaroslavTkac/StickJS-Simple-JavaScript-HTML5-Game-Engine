/**
 * Created by jaroslavtkaciuk on 12/04/2017.
 */
class LastRendered{
    constructor(){
        this.vertexPositionBuffer = null;
        this.vertexNormalBuffer = null;
        this.vertexTextureCoordBuffer = null;
        this.vertexIndexBuffer = null;
        this.texture = null;
        this.useTexture = null;
        this.alpha = null;
        this.transparency = null;
        this.r = null;
        this.g = null;
        this.b = null;
        this.lighting = null;
        this.ambientR = null;
        this.ambientG = null;
        this.ambientB = null;
        this.directionalR = null;
        this.directionalG = null;
        this.directionalB = null;
        this.directionalX = null;
        this.directionalY = null;
        this.directionalZ = null;
        this.pointR = null;
        this.pointG = null;
        this.pointB = null;
        this.pointX = null;
        this.pointY = null;
        this.pointZ = null;
        this.pointLightIntensity = null;
    }
}

function glBindVertexBuffer(webgl, value){
    if(lastRendered.vertexPositionBuffer !== value) {
        webgl.bindBuffer(webgl.ARRAY_BUFFER, value);
        webgl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, value.itemSize, webgl.FLOAT, false, 0, 0);

        lastRendered.vertexPositionBuffer = value;
    }
}
function glBindNormalBuffer(webgl, value){
    if(lastRendered.vertexNormalBuffer !== value) {
        webgl.bindBuffer(webgl.ARRAY_BUFFER, value);
        webgl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, value.itemSize, webgl.FLOAT, false, 0, 0);

        lastRendered.vertexNormalBuffer = value;
    }
}
function glBindTextureBuffer(webgl, value){
    if(lastRendered.vertexTextureCoordBuffer !== value){
        webgl.bindBuffer(webgl.ARRAY_BUFFER, value);
        webgl.vertexAttribPointer(shaderProgram.textureCoordAttribute, value.itemSize, webgl.FLOAT, false, 0, 0);
        webgl.activeTexture(webgl.TEXTURE0);

        lastRendered.vertexTextureCoordBuffer = value;
    }
}
function glBindBuffer(webgl, value){
    if(lastRendered.vertexIndexBuffer !== value){
        webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, value);

        lastRendered.vertexIndexBuffer = value;
    }
}
function glBindTexture(webgl, value){
    if(lastRendered.texture !== value){
        webgl.bindTexture(webgl.TEXTURE_2D, value);
        webgl.uniform1i(shaderProgram.samplerUniform, 0);

        lastRendered.texture = value;
    }
}
function glUseTexture(webgl, value){
    if(lastRendered.useTexture !== value){
        webgl.uniform1i(shaderProgram.useTexturesUniform, value);

        lastRendered.useTexture = value;
    }
}
function glUseColor(webgl, r, g, b) {
    if(lastRendered.r !== r || lastRendered.g !== g || lastRendered.b !== b) {
        webgl.uniform4f(shaderProgram.colorUniform, r, g, b, 1);

        lastRendered.r = r;
        lastRendered.g = g;
        lastRendered.b = b;
    }
}
function glTransparent(webgl, value, alphaValue){
    if(lastRendered.transparency !== value) {
        webgl.blendFunc(webgl.SRC_ALPHA, webgl.ONE);
        webgl.enable(webgl.BLEND);
        webgl.disable(webgl.DEPTH_TEST);

        lastRendered.transparency = value;
    }
    if (lastRendered.alpha !== value) {
        webgl.uniform1f(shaderProgram.alphaUniform, alphaValue);

        lastRendered.alpha = alphaValue;
    }
}
function glNonTransparent(webgl, value, alphaValue){
    if(lastRendered.alpha !== alphaValue) {
        webgl.uniform1f(shaderProgram.alphaUniform, alphaValue);

        lastRendered.alpha = alphaValue;
    }
    if(lastRendered.transparency !== value) {
        webgl.disable(webgl.BLEND);
        webgl.enable(webgl.DEPTH_TEST);

        lastRendered.transparency = value;
    }
}
function glLighting(webgl, value){
    if(lastRendered.lighting !== value){
        webgl.uniform1i(shaderProgram.useLightingUniform, value);

        lastRendered.lighting = value;
    }
}
function glAmbientLight(webgl, r, g, b){
    if(lastRendered.ambientR !== r || lastRendered.ambientG !== g || lastRendered.ambientB !== b){
        webgl.uniform3f(shaderProgram.ambientColorUniform, r, g, b);

        lastRendered.ambientR = r;
        lastRendered.ambientG = g;
        lastRendered.ambientB = b;
    }
}
function glDirectionalLight(webgl, r, g, b){
    if(lastRendered.directionalR !== r || lastRendered.directionalG !== g || lastRendered.directionalB !== b){
        webgl.uniform3f(shaderProgram.directionalColorUniform, r, g, b);

        lastRendered.directionalR = r;
        lastRendered.directionalG = g;
        lastRendered.directionalB = b;
    }
}
function glDirectionalLightLocation(webgl, x, y, z){
    if(lastRendered.directionalX !== x || lastRendered.directionalY !== y || lastRendered.directionalZ !== z){
        webgl.uniform3fv(shaderProgram.lightingDirectionUniform, vec3.scale([x, y, z], -1));

        lastRendered.directionalX = x;
        lastRendered.directionalY = y;
        lastRendered.directionalZ = z;
    }
}
function glPointLight(webgl, r, g, b){
    if(lastRendered.pointR !== r || lastRendered.pointG !== g || lastRendered.pointB !== b){
        webgl.uniform3f(shaderProgram.pointLightingColorUniform, r, g, b);

        lastRendered.pointR = r;
        lastRendered.pointG = g;
        lastRendered.pointB = b;
    }
}
function glPointLightLocation(webgl, x, y, z){
    if(lastRendered.pointX !== x || lastRendered.pointY !== y || lastRendered.pointZ !== z){
        webgl.uniform3f(shaderProgram.pointLightingLocationUniform, x, y, z);

        lastRendered.pointX = x;
        lastRendered.pointY = y;
        lastRendered.pointZ = z;
    }
}
function glPointLightIntensity(webgl, value){
    if(lastRendered.pointLightIntensity !== value){
        webgl.uniform1f(shaderProgram.pointLightingIntensityUniform, value);

        lastRendered.pointLightIntensity = value;
    }
}
