/**
 * Created by jaroslavtkaciuk on 06/04/2017.
 */

function AmbientLight(r, g, b){
    this.r = r;
    this.g = g;
    this.b = b;
}
class DirectionalLight{
    constructor(r, g, b, x, y, z){
        this.r = r;
        this.g = g;
        this.b = b;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    changePlace(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
class PointLight{
    constructor(r, g, b, x, y, z){
        this.r = r;
        this.g = g;
        this.b = b;
        this.x = x;
        this.y = y;
        this.z = z;
        this.centerX = x;
        this.centerY = y;
        this.centerZ = z;
        this.alpha = 0;
        this.alphaInc = 0.025;
        this.radius = 55;
        this.name = "sun";
        this.lightSource = new LoadObject("Scripts/Shapes/simpleSphere.json", "Standard textures/sun.jpg", {
            "name" : "sun",
            "x": this.x,
            "y": this.y,
            "z": this.z,
            "sx" : 3.5,
            "sy" : 3.5,
            "sz" : 3.5,
            "yRot" : 10,
            "yRotSpeed" : 45,
            "animateRotation": true,
            "lighting" : false
        });
    }
    changePlace(x, y, z){
        modifyObjByName(this.name).x = x;
        modifyObjByName(this.name).y = y;
        modifyObjByName(this.name).z = z;

        this.x = x;
        this.y = y;
        this.z = z;
    }

}