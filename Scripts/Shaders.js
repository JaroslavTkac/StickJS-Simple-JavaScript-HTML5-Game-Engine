/**
 * Created by jaroslavtkaciuk on 06/04/2017.
 */

var fragmentShaderGSLS =
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

var vertexShaderGSLS =
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
            "vec3 pointLightDirection = normalize(uPointLightingLocation - mvPosition.xyz);" +
            "vec3 directionalLightDirection = normalize(uLightingDirection - mvPosition.xyz);" +

            "vec3 transformedNormal = uNMatrix * aVertexNormal;" +
            "float directionalLightWeighting = max(dot(transformedNormal, directionalLightDirection), 0.0);" +
            "float pointDirectionalLightWeighting = max(dot(transformedNormal, pointLightDirection), 0.0);" +

            "vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting + " +
                                "uPointLightingColor * pointDirectionalLightWeighting;" +
        "}" +
    "}";

class Shader {
    constructor(){
        this.initShaders();
    }
    getShader(gslsProgram, type){
        var shader;
        if(type == "fragment")
            shader = webgl.createShader(webgl.FRAGMENT_SHADER);
        else
            shader = webgl.createShader(webgl.VERTEX_SHADER);
        webgl.shaderSource(shader, gslsProgram);
        webgl.compileShader(shader);
        return shader;
    }
    initShaders() {
        var fragmentShader = this.getShader(fragmentShaderGSLS, "fragment");
        var vertexShader = this.getShader(vertexShaderGSLS, "vertex");

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
        shaderProgram.colorUniform = webgl.getUniformLocation(shaderProgram, "uColor");
        shaderProgram.alphaUniform = webgl.getUniformLocation(shaderProgram, "uAlpha");

    }
}

