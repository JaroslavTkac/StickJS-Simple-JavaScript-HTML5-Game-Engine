
var fragmentShaderGSLS_perFragmentLightning =
    "precision mediump float;" +

    "varying vec2 vTextureCoord;" +
    "varying vec3 vTransformedNormal;" +
    "varying vec3 vPosition;" +

    "uniform bool uUseTextures;" +
    "uniform bool uUseLighting;" +

    "uniform vec3 uAmbientColor;" +

    "uniform vec3 uLightingDirection;" +
    "uniform vec3 uDirectionalColor;" +

    "uniform vec3 uPointLightingLocation;" +
    "uniform vec3 uPointLightingColor;" +

    "uniform float uAlpha;" +

    "uniform sampler2D uSampler;" +

    "void main(void) {" +
        "vec3 lightWeighting" +
        "if (!uUseLighting) {" +
            "lightWeighting = vec3(1.0, 1.0, 1.0);" +
        "} else {" +
            "vec3 pointLightDirection = normalize(uPointLightingLocation - mvPosition.xyz);" +
            "vec3 directionalLightDirection = normalize(uLightingDirection - mvPosition.xyz);" +

            "float directionalLightWeighting = max(dot(normalize(transformedNormal), directionalLightDirection), 0.0);" +
            "float pointDirectionalLightWeighting = max(dot(normalize(transformedNormal), pointLightDirection), 0.0);" +

            "vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting + " +
            "uPointLightingColor * pointDirectionalLightWeighting;" +
        "}" +

        "vec4 fragmentColor;" +
        "if (uUseTextures) {" +
            "fragmentColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));" +
        "} else {" +
            "fragmentColor = vec4(1.0, 1.0, 1.0, 1.0);" +
        "}" +
        "fragmentColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));" +
        "gl_FragColor = vec4(fragmentColor.rgb * lightWeighting, fragmentColor.a * uAlpha);" +
    "}";

var vertexShaderGSLS_perFragmentLightning =
    "attribute vec3 aVertexPosition;" +
    "attribute vec3 aVertexNormal;" +
    "attribute vec2 aTextureCoord;" +

    "uniform mat4 uMVMatrix;" +
    "uniform mat4 uPMatrix;" +
    "uniform mat3 uNMatrix;" +

    "varying vec2 vTextureCoord;" +
    "varying vec3 vTransformedNormal;" +
    "varying vec4 vPosition;" +

    "void main(void) {" +
        "vPosition = uMVMatrix * vec4(aVertexPosition, 1.0);" +
        "gl_Position = uPMatrix * vPosition;" +
        "vTextureCoord = aTextureCoord;" +
        "vTransformedNormal = uNMatrix * aVertexNormal;" +
    "}";
