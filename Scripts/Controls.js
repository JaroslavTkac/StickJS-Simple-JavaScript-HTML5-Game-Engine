/**
 * Created by jaroslavtkaciuk on 06/04/2017.
 */
class Key{
    constructor(name, fpsControlsSpeed){
        this.keyPressed = false;
        this.keyName = "undefined";
        this.keyCode = -1;
        this.initializeKeyboardCodes();
        if (name in this.keyCodes) {
            this.keyCode = this.keyCodes[name];
            this.keyName = name;
        }
        //console.log("Name: " + this.keyName + "  value: " + this.keyCode);
        this.fpsControlsSpeed = fpsControlsSpeed;
        this.z = 0;
        this.x = 0;
        this.y = 0;
        this.xRot = 0;
        this.yRot = 0;
        this.zRot = 0;
    }

    initializeKeyboardCodes(){
        this.keyCodes = {
            "tab": 9,
            "enter": 13,
            "shift": 16,
            "ctrl": 17,
            "alt": 18,
            "space": 32,
            "larrow": 37,
            "uarrow": 38,
            "rarrow": 39,
            "darrow": 40,
            "0": 48,
            "1": 49,
            "2": 50,
            "3": 51,
            "4": 52,
            "5": 53,
            "6": 54,
            "7": 55,
            "8": 56,
            "9": 57,
            "a": 65,
            "b": 66,
            "c": 67,
            "d": 68,
            "e": 69,
            "f": 70,
            "g": 71,
            "h": 72,
            "i": 73,
            "j": 74,
            "k": 75,
            "l": 76,
            "m": 77,
            "n": 78,
            "o": 79,
            "p": 80,
            "q": 81,
            "r": 82,
            "s": 83,
            "t": 84,
            "u": 85,
            "v": 86,
            "w": 87,
            "x": 88,
            "y": 89,
            "z": 90
        };
    }

    doAction(){
        if(this.keyPressed) {
            this.shooterControlsValidation();
            x += this.x;
            y += this.y;
            z += this.z;
            xRotation += this.xRot;
            yRotation += this.yRot;
            zRotation += this.zRot;
        }
    }
    shooterControlsValidation(){
        var speed = this.fpsControlsSpeed;
        yRotation = yRotation % 360;
        var delta = yRotation/90;

        if(this.keyName == "w"){
            if(yRotation >= -90 && yRotation <= 90){
                this.x = - speed * delta;
                this.z = speed - Math.abs(this.x);
                return
            }
        }
        if(this.keyName == "s"){
            if(yRotation >= -90 && yRotation <= 90){
                this.x = speed * delta;
                this.z = - (speed - Math.abs(this.x));
                return
            }
        }
        if(this.keyName == "w"){
            if(yRotation > 90 && yRotation <= 180){
                this.z = - ((speed * delta) - speed);
                this.x = - (speed - Math.abs(this.z));
                return
            }
        }
        if(this.keyName == "s"){
            if(yRotation > 90 && yRotation <= 180){
                this.z = ((speed * delta) - speed);
                this.x = (speed - Math.abs(this.z));
            }
        }
        if(this.keyName == "w"){
            if(yRotation >= -180 && yRotation < -90){
                this.z = (speed * delta) + speed;
                this.x = (speed - Math.abs(this.z));
                return
            }
        }
        if(this.keyName == "s"){
            if(yRotation >= -180 && yRotation < -90){
                this.z = Math.abs((speed * delta) + speed);
                this.x = - (speed - Math.abs(this.z));
                return
            }
        }
        if(this.keyName == "w"){
            if(yRotation > 180 && yRotation <= 270){
                this.x = ((speed * delta) - 2*speed);
                this.z = - (speed - Math.abs(this.x));
            }
        }
        if(this.keyName == "s"){
            if(yRotation > 180 && yRotation <= 270){
                this.x = - ((speed * delta) - 2*speed);
                this.z = (speed - Math.abs(this.x));
            }
        }
        if(this.keyName == "w"){
            if(yRotation >= -270 && yRotation < -180){
                this.x = ((speed * delta) + 2*speed);
                this.z = - (speed - Math.abs(this.x));
            }
        }
        if(this.keyName == "s"){
            if(yRotation >= -270 && yRotation < -180){
                this.x = - ((speed * delta) + 2*speed);
                this.z = (speed - Math.abs(this.x));
            }
        }
        if(this.keyName == "w"){
            if(yRotation > 270 && yRotation <= 360){
                this.z = ((speed * delta) - 3*speed);
                this.x = (speed - Math.abs(this.z));
                return
            }
        }
        if(this.keyName == "s"){
            if(yRotation > 270 && yRotation <= 360){
                this.z = -((speed * delta) - 3*speed);
                this.x = - (speed - Math.abs(this.z));
                return
            }
        }
        if(this.keyName == "w"){
            if(yRotation >= -360 && yRotation < -270){
                this.z = Math.abs((speed * delta) + 3*speed);
                this.x = -(speed - Math.abs(this.z));
                return
            }
        }
        if(this.keyName == "s"){
            if(yRotation >= -360 && yRotation < -270){
                this.z = ((speed * delta) + 3*speed);
                this.x = (speed - Math.abs(this.z));
            }
        }
    }

}
function simpleControls(speed){
    var w = new Key("w");
    w.z = speed;
    var s = new Key("s");
    s.z = -speed;
    var a = new Key("a");
    a.x = speed;
    var d = new Key("d");
    d.x = -speed;
    var space = new Key("space");
    space.y = -speed;
    var shift = new Key("shift");
    shift.y = speed;
    var q = new Key("q");
    q.yRot = -2;
    var e = new Key("e");
    e.yRot = 2;
    keysArray.push(w, s, a , d, space, shift, q, e);
}
function shooterControls(forwardKey, backwardKey, speed){
    var w = new Key(forwardKey, speed);
    var s = new Key(backwardKey, speed);
    var a = new Key("a");
    a.yRot = -3.5;
    var d = new Key("d");
    d.yRot = 3.5;
    var space = new Key("space");
    space.y = -1;
    var shift = new Key("shift");
    shift.y = 1;
    keysArray.push(w, s, a , d, space, shift);
}
function handleKeyDown(event) {
    for (var i in keysArray) {
        if (keysArray[i].keyCode == event.keyCode) {
            keysArray[i].keyPressed = true;
        }
    }
}
function handleKeyUp(event) {
    for (var i in keysArray) {
        if (keysArray[i].keyCode == event.keyCode) {
            keysArray[i].keyPressed = false;
        }
    }
}
function handleKeys() {
    for (var i in keysArray) {
        keysArray[i].doAction();
    }
}