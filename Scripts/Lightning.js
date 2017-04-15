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
        this.name = "directional";
        /*new LoadObject("Scripts/Shapes/sphere.json", "Standard textures/sun.jpg", {
            "name" : this.name,
            "x": this.x,
            "y": this.y,
            "z": this.z,
            "sx" : 20,
            "sy" : 20,
            "sz" : 20,
            "yRot" : 15,
            "yRotSpeed" : 5,
            "zRot" : 5,
            "zRotSpeed" : 2,
            "animateRotation": true,
            "lighting" : false
        });*/
    }
    changePlace(x, y, z){
       /* modifyObjByName(this.name).x = x;
        modifyObjByName(this.name).y = y;
        modifyObjByName(this.name).z = z;*/

        this.x = x;
        this.y = y;
        this.z = z;
    }
}
class PointLight{
    constructor(name, r, g, b, x, y, z, radius, alphaInc){
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
        this.alphaInc = alphaInc;
        this.radius = radius;
        this.name = name;
        new LoadObject("Scripts/Shapes/simpleSphere.json", "Standard textures/sun.jpg", {
            "name" : this.name,
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