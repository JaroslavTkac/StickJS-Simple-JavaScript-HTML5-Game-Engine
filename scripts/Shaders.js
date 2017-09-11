/**
 * Created by jaroslavtkaciuk on 06/04/2017.
 */
let testFrag =
    "precision mediump float;" +

    "uniform vec4 uColor;"+

    "void main(void) {"+
        "gl_FragColor = vec4(uColor);"+
    "}";

let testVertex =
    "attribute vec3 aVertexPosition;" +

    "uniform mat4 uMVMatrix;"+
    "uniform mat4 uPMatrix;"+

    "void main(void) {"+
        "gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);"+
    "}";


let fragmentShaderGLSL =
    "precision mediump float;" +

    "varying vec2 vTextureCoord;" +
    "varying vec3 vLightWeighting;" +

    "uniform bool uUseTextures;" +

    "uniform float uAlpha;" +
    "uniform sampler2D uSampler;" +
    "uniform vec4 uColor;"+

    "void main(void) {" +
        "vec4 fragmentColor;" +
        "if (uUseTextures) {" +
            "fragmentColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));" +
        "} else {" +
            "fragmentColor = uColor;" +
        "}" +
        "gl_FragColor = vec4(fragmentColor.rgb * vLightWeighting, fragmentColor.a * uAlpha);" +
    "}";
let vertexShaderGLSL =
    "attribute vec3 aVertexPosition;" +
    "attribute vec3 aVertexNormal;" +
    "attribute vec2 aTextureCoord;" +
    "attribute vec4 aVertexColor;" +

    "uniform mat4 uMVMatrix;" +
    "uniform mat4 uPMatrix;" +
    "uniform mat3 uNMatrix;" +

    "uniform vec3 uAmbientColor;" +

    "uniform vec3 uLightingDirection;" +
    "uniform vec3 uDirectionalColor;" +

    "uniform vec3 uPointLightingLocation;" +
    "uniform vec3 uPointLightingColor;" +
    "uniform float uPointLightingIntensity;" +

    "uniform bool uUseLighting;" +

    "varying vec2 vTextureCoord;" +
    "varying vec3 vLightWeighting;" +

    "void main(void) {" +
        "vec4 mvPosition = uMVMatrix * vec4(aVertexPosition, 1.0);" +
        "gl_Position = uPMatrix * mvPosition;" +
        "vTextureCoord = aTextureCoord;" +

        "if (!uUseLighting) {" +
            "vLightWeighting = vec3(1.0, 1.0, 1.0);" +
        "} else {" +
            "vec3 directionalLightDirection = normalize(uLightingDirection - mvPosition.xyz);" +
            "vec3 pointLightDirection = normalize(uPointLightingLocation - mvPosition.xyz);" +

            "float lightDistance = length(uPointLightingLocation - mvPosition.xyz);" +
            "if(lightDistance < 0.0){" +
                "lightDistance = lightDistance * -1.0;" +
            "}" +
            "lightDistance = (uPointLightingIntensity - lightDistance) / uPointLightingIntensity;" +

            "vec3 transformedNormal = uNMatrix * aVertexNormal;" +
            "float directionalLightWeighting = max(dot(transformedNormal, directionalLightDirection), 0.0);" +
            "float pointDirectionalLightWeighting = max(dot(transformedNormal, pointLightDirection), 0.0);" + //pointDirectionalLightWeighting arba lightDistance

            "vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting + " +
                               "uPointLightingColor * (pointDirectionalLightWeighting * lightDistance);" +
        "}" +
    "}";

function getShader(GLSLProgram, type, webgl){
    let shader;
    if(type === "fragment")
        shader = webgl.createShader(webgl.FRAGMENT_SHADER);
    else
        shader = webgl.createShader(webgl.VERTEX_SHADER);

    webgl.shaderSource(shader, GLSLProgram);
    webgl.compileShader(shader);
    return shader;
}

function mainShader() {
    let fragmentShader = getShader(fragmentShaderGLSL, "fragment", webgl);
    let vertexShader = getShader(vertexShaderGLSL, "vertex", webgl);

    shaderProgram = webgl.createProgram();

    webgl.attachShader(shaderProgram, vertexShader);
    webgl.attachShader(shaderProgram, fragmentShader);
    webgl.linkProgram(shaderProgram);

    if (!webgl.getProgramParameter(shaderProgram, webgl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
    webgl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = webgl.getAttribLocation(shaderProgram, "aVertexPosition");
    webgl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.vertexNormalAttribute = webgl.getAttribLocation(shaderProgram, "aVertexNormal");
    webgl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    shaderProgram.textureCoordAttribute = webgl.getAttribLocation(shaderProgram, "aTextureCoord");
    webgl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
    shaderProgram.pMatrixUniform = webgl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = webgl.getUniformLocation(shaderProgram, "uMVMatrix");

    shaderProgram.nMatrixUniform = webgl.getUniformLocation(shaderProgram, "uNMatrix");
    shaderProgram.samplerUniform = webgl.getUniformLocation(shaderProgram, "uSampler");
    shaderProgram.useLightingUniform = webgl.getUniformLocation(shaderProgram, "uUseLighting");
    shaderProgram.useTexturesUniform = webgl.getUniformLocation(shaderProgram, "uUseTextures");
    shaderProgram.ambientColorUniform = webgl.getUniformLocation(shaderProgram, "uAmbientColor");
    shaderProgram.lightingDirectionUniform = webgl.getUniformLocation(shaderProgram, "uLightingDirection");
    shaderProgram.directionalColorUniform = webgl.getUniformLocation(shaderProgram, "uDirectionalColor");
    shaderProgram.pointLightingLocationUniform = webgl.getUniformLocation(shaderProgram, "uPointLightingLocation");
    shaderProgram.pointLightingColorUniform = webgl.getUniformLocation(shaderProgram, "uPointLightingColor");
    shaderProgram.pointLightingIntensityUniform = webgl.getUniformLocation(shaderProgram, "uPointLightingIntensity");

    shaderProgram.colorUniform = webgl.getUniformLocation(shaderProgram, "uColor");
    shaderProgram.alphaUniform = webgl.getUniformLocation(shaderProgram, "uAlpha");
}
function editorShader(webglE) {
    let fragmentShader = getShader(fragmentShaderGLSL, "fragment", webglE);
    let vertexShader = getShader(vertexShaderGLSL, "vertex", webglE);

    shaderProgramE = webglE.createProgram();

    webglE.attachShader(shaderProgramE, vertexShader);
    webglE.attachShader(shaderProgramE, fragmentShader);
    webglE.linkProgram(shaderProgramE);

    if (!webglE.getProgramParameter(shaderProgramE, webglE.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    webglE.useProgram(shaderProgramE);

    shaderProgramE.vertexPositionAttribute = webglE.getAttribLocation(shaderProgramE, "aVertexPosition");
    webglE.enableVertexAttribArray(shaderProgramE.vertexPositionAttribute);


    shaderProgramE.vertexNormalAttribute = webglE.getAttribLocation(shaderProgramE, "aVertexNormal");
    webglE.enableVertexAttribArray(shaderProgramE.vertexNormalAttribute);

    shaderProgramE.textureCoordAttribute = webglE.getAttribLocation(shaderProgramE, "aTextureCoord");
    webglE.enableVertexAttribArray(shaderProgramE.textureCoordAttribute);
    shaderProgramE.pMatrixUniform = webglE.getUniformLocation(shaderProgramE, "uPMatrix");
    shaderProgramE.mvMatrixUniform = webglE.getUniformLocation(shaderProgramE, "uMVMatrix");

    shaderProgramE.nMatrixUniform = webglE.getUniformLocation(shaderProgramE, "uNMatrix");
    shaderProgramE.samplerUniform = webglE.getUniformLocation(shaderProgramE, "uSampler");
    shaderProgramE.useLightingUniform = webglE.getUniformLocation(shaderProgramE, "uUseLighting");
    shaderProgramE.useTexturesUniform = webglE.getUniformLocation(shaderProgramE, "uUseTextures");
    shaderProgramE.ambientColorUniform = webglE.getUniformLocation(shaderProgramE, "uAmbientColor");
    shaderProgramE.lightingDirectionUniform = webglE.getUniformLocation(shaderProgramE, "uLightingDirection");
    shaderProgramE.directionalColorUniform = webglE.getUniformLocation(shaderProgramE, "uDirectionalColor");
    shaderProgramE.pointLightingLocationUniform = webglE.getUniformLocation(shaderProgramE, "uPointLightingLocation");
    shaderProgramE.pointLightingColorUniform = webglE.getUniformLocation(shaderProgramE, "uPointLightingColor");
    shaderProgramE.pointLightingIntensityUniform = webglE.getUniformLocation(shaderProgramE, "uPointLightingIntensity");

    shaderProgramE.colorUniform = webglE.getUniformLocation(shaderProgramE, "uColor");
    shaderProgramE.alphaUniform = webglE.getUniformLocation(shaderProgramE, "uAlpha");

    shaderProgramEditorArr.push(shaderProgramE);
}
/*class Shader {
    constructor(webgl, type){
        if(type === "main") {
            shaderProgram = webgl.createProgram();
            this.initShaders(webgl, shaderProgram); //shaderProgram passed
        }
        if(type === "editor") {
            shaderProgramE = webgl.createProgram();
            this.initShaders(webgl, shaderProgramE); //shaderProgram passed
        }
    }
    getShader(GLSLProgram, type, webgl){
        let shader;
        if(type === "fragment")
            shader = webgl.createShader(webgl.FRAGMENT_SHADER);
        else
            shader = webgl.createShader(webgl.VERTEX_SHADER);
        webgl.shaderSource(shader, GLSLProgram);
        webgl.compileShader(shader);
        return shader;
    }

    initShaders(webgl, shaderProgram) { // shaderProgram
        let fragmentShader = this.getShader(testFrag, "fragment", webgl);
        let vertexShader = this.getShader(testVertex, "vertex", webgl);

        webgl.attachShader(shaderProgram, vertexShader);
        webgl.attachShader(shaderProgram, fragmentShader);
        webgl.linkProgram(shaderProgram);

        if (!webgl.getProgramParameter(shaderProgram, webgl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        webgl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = webgl.getAttribLocation(shaderProgram, "aVertexPosition");
        webgl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        //shaderProgram.vertexNormalAttribute = webgl.getAttribLocation(shaderProgram, "aVertexNormal");
        //webgl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

//        shaderProgram.textureCoordAttribute = webgl.getAttribLocation(shaderProgram, "aTextureCoord");
  //      webgl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

        shaderProgram.pMatrixUniform = webgl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = webgl.getUniformLocation(shaderProgram, "uMVMatrix");
       shaderProgram.nMatrixUniform = webgl.getUniformLocation(shaderProgram, "uNMatrix");
        shaderProgram.samplerUniform = webgl.getUniformLocation(shaderProgram, "uSampler");
        shaderProgram.useLightingUniform = webgl.getUniformLocation(shaderProgram, "uUseLighting");
        shaderProgram.useTexturesUniform = webgl.getUniformLocation(shaderProgram, "uUseTextures");
        shaderProgram.ambientColorUniform = webgl.getUniformLocation(shaderProgram, "uAmbientColor");
        shaderProgram.lightingDirectionUniform = webgl.getUniformLocation(shaderProgram, "uLightingDirection");
        shaderProgram.directionalColorUniform = webgl.getUniformLocation(shaderProgram, "uDirectionalColor");
        shaderProgram.pointLightingLocationUniform = webgl.getUniformLocation(shaderProgram, "uPointLightingLocation");
        shaderProgram.pointLightingColorUniform = webgl.getUniformLocation(shaderProgram, "uPointLightingColor");
        shaderProgram.pointLightingIntensityUniform = webgl.getUniformLocation(shaderProgram, "uPointLightingIntensity");
        shaderProgram.colorUniform = webgl.getUniformLocation(shaderProgram, "uColor");
        //shaderProgram.alphaUniform = webgl.getUniformLocation(shaderProgram, "uAlpha");
    }
}*/

