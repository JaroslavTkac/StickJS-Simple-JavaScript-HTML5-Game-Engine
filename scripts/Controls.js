/**
 * Created by jaroslavtkaciuk on 06/04/2017.
 */


class KeyboardPresets {
    constructor(controlsType, speed, rotationSpeed) {
        this.controlsType = controlsType;
        this.speed = speed;
        this.rotationSpeed = rotationSpeed;
        this.shooterControlsEnabled = false;
    }

    static initAllKeyboard() {
        for (let i = 97; i < 123; i++)
            keysArray.push(new Key(String.fromCharCode(i)));
        keysArray.push(new Key("space"), new Key("shift"));

        console.log("Key Array:");
        console.log(keysArray);
    }

    enableStandardControls() {
        this.shooterControlsEnabled = true;
        for (let i = 0; i < keysArray.length; i++)
            switch (keysArray[i].keyName) {
                case "w":
                    keysArray[i].z = parseFloat(this.speed);
                    break;
                case "s":
                    keysArray[i].z = parseFloat(-this.speed);
                    break;
                case "a":
                    keysArray[i].yRot = parseFloat(-this.rotationSpeed);
                    break;
                case "d":
                    keysArray[i].yRot = parseFloat(this.rotationSpeed);
                    break;
                case "q":
                    keysArray[i].x = parseFloat(this.speed);
                    break;
                case "e":
                    keysArray[i].x = parseFloat(-this.speed);
                    break;
                case "space":
                    keysArray[i].y = parseFloat(-this.speed);
                    break;
                case "shift":
                    keysArray[i].y = parseFloat(this.speed);
                    break;
            }
    }

    disableStandardControls() {
        this.shooterControlsEnabled = false;
        for (let i = 0; i < keysArray.length; i++)
            switch (keysArray[i].keyName) {
                case "w":
                    keysArray[i].z = 0;
                    break;
                case "s":
                    keysArray[i].z = 0;
                    break;
                case "a":
                    keysArray[i].yRot = 0;
                    break;
                case "d":
                    keysArray[i].yRot = 0;
                    break;
                case "q":
                    keysArray[i].x = 0;
                    break;
                case "e":
                    keysArray[i].x = 0;
                    break;
                case "space":
                    keysArray[i].y = 0;
                    break;
                case "shift":
                    keysArray[i].y = 0;
                    break;
            }
    }


    simpleControls() {
        let w, s, a, d;
        if (this.controlsType === "arrows") {
            w = new Key("uarrow");
            w.z = this.speed;
            s = new Key("darrow");
            s.z = -this.speed;
            a = new Key("larrow");
            a.x = this.speed;
            d = new Key("rarrow");
            d.x = -this.speed;
        }
        else {
            w = new Key("w");
            w.z = this.speed;
            s = new Key("s");
            s.z = -this.speed;
            a = new Key("a");
            a.x = this.speed;
            d = new Key("d");
            d.x = -this.speed;
        }
        let space = new Key("space");
        space.y = -this.speed;
        let shift = new Key("shift");
        shift.y = this.speed;
        let q = new Key("q");
        q.yRot = -this.rotationSpeed;
        let e = new Key("e");
        e.yRot = this.rotationSpeed;
        keysArray.push(w, s, a, d, space, shift, q, e);
    }

    shooterControlsV2() {
        this.shooterControlsEnabled = true;
        let w, s, a, d, q, e;
        if (this.controlsType === "arrows") {
            w = new Key("uarrow");
            w.z = this.speed;
            s = new Key("darrow");
            s.z = -this.speed;
            a = new Key("larrow");
            a.yRot = -this.rotationSpeed;
            d = new Key("rarrow");
            d.yRot = this.rotationSpeed;
            q = new Key("q");
            q.x = this.speed;
            e = new Key("e");
            e.x = -this.speed;
        }
        else {
            w = new Key("w");
            w.z = this.speed;
            w.sound = true;
            s = new Key("s");
            s.z = -this.speed;
            a = new Key("a");
            a.yRot = -this.rotationSpeed;
            d = new Key("d");
            d.yRot = this.rotationSpeed;
            q = new Key("q");
            q.x = this.speed;
            e = new Key("e");
            e.x = -this.speed;
        }
        let space = new Key("space");
        space.y = -this.speed;
        let shift = new Key("shift");
        shift.y = this.speed;
        keysArray.push(w, s, a, d, q, e, space, shift);
    }

}

class Key {
    constructor(name) {
        this.keyPressed = false;
        this.keyUp = false;
        this.keyName = "undefined";
        this.keyCode = -1;
        this.initializeKeyboardCodes();
        if (name in this.keyCodes) {
            this.keyCode = this.keyCodes[name];
            this.keyName = name;
        }
        //console.log("Name: " + this.keyName + "  value: " + this.keyCode);
        this.songName = "";
        this.useSong = false;
        this.z = 0;
        this.x = 0;
        this.y = 0;
        this.xRot = 0;
        this.yRot = 0;
        this.zRot = 0;
    }

    initializeKeyboardCodes() {
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

    playSound() {
        if (sound !== undefined)
            if (sound.getSongByName(this.songName) !== undefined)
                sound.getSongByName(this.songName).play();
    }

    doNotPlaySound() {
        if (sound !== undefined)
            if (sound.getSongByName(this.songName) !== undefined)
                sound.getSongByName(this.songName).stop();
    }

    doAction() {
        if (this.keyPressed) {
            if (keyboard.shooterControlsEnabled)
                this.shooterControlsValidation(keyboard.speed, keyboard.controlsType);
            x += this.x;
            y += this.y;
            z += this.z;
            xRotation += this.xRot;
            yRotation += this.yRot;
            zRotation += this.zRot;
            //if(this.useSong)
            //this.playSound();
        }
    }

    shooterControlsValidation(speed, type) {
        yRotation = yRotation % 360;
        let delta = yRotation / 90;
        let forward = "w", backward = "s";
        if (type === "arrows") {
            forward = "uarrow";
            backward = "darrow";
        }

        if (this.keyName === forward) {
            if (yRotation >= -90 && yRotation <= 90) {
                this.x = -speed * delta;
                this.z = speed - Math.abs(this.x);
                return
            }
        }
        if (this.keyName === backward) {
            if (yRotation >= -90 && yRotation <= 90) {
                this.x = speed * delta;
                this.z = -(speed - Math.abs(this.x));
                return
            }
        }
        if (this.keyName === forward) {
            if (yRotation > 90 && yRotation <= 180) {
                this.z = -((speed * delta) - speed);
                this.x = -(speed - Math.abs(this.z));
                return
            }
        }
        if (this.keyName === backward) {
            if (yRotation > 90 && yRotation <= 180) {
                this.z = ((speed * delta) - speed);
                this.x = (speed - Math.abs(this.z));
                return
            }
        }
        if (this.keyName === forward) {
            if (yRotation >= -180 && yRotation < -90) {
                this.z = (speed * delta) + speed;
                this.x = (speed - Math.abs(this.z));
                return
            }
        }
        if (this.keyName === backward) {
            if (yRotation >= -180 && yRotation < -90) {
                this.z = Math.abs((speed * delta) + speed);
                this.x = -(speed - Math.abs(this.z));
                return
            }
        }
        if (this.keyName === forward) {
            if (yRotation > 180 && yRotation <= 270) {
                this.x = ((speed * delta) - 2 * speed);
                this.z = -(speed - Math.abs(this.x));
                return
            }
        }
        if (this.keyName === backward) {
            if (yRotation > 180 && yRotation <= 270) {
                this.x = -((speed * delta) - 2 * speed);
                this.z = (speed - Math.abs(this.x));
                return
            }
        }
        if (this.keyName === forward) {
            if (yRotation >= -270 && yRotation < -180) {
                this.x = ((speed * delta) + 2 * speed);
                this.z = -(speed - Math.abs(this.x));
                return
            }
        }
        if (this.keyName === backward) {
            if (yRotation >= -270 && yRotation < -180) {
                this.x = -((speed * delta) + 2 * speed);
                this.z = (speed - Math.abs(this.x));
                return
            }
        }
        if (this.keyName === forward) {
            if (yRotation > 270 && yRotation <= 360) {
                this.z = ((speed * delta) - 3 * speed);
                this.x = (speed - Math.abs(this.z));
                return
            }
        }
        if (this.keyName === backward) {
            if (yRotation > 270 && yRotation <= 360) {
                this.z = -((speed * delta) - 3 * speed);
                this.x = -(speed - Math.abs(this.z));
                return
            }
        }
        if (this.keyName === forward) {
            if (yRotation >= -360 && yRotation < -270) {
                this.z = Math.abs((speed * delta) + 3 * speed);
                this.x = -(speed - Math.abs(this.z));
                return
            }
        }
        if (this.keyName === backward) {
            if (yRotation >= -360 && yRotation < -270) {
                this.z = ((speed * delta) + 3 * speed);
                this.x = (speed - Math.abs(this.z));
            }
        }
    }
}


function handleKeyDown(event) {
    for (let i in keysArray) {
        if (keysArray[i].keyCode === event.keyCode) {
            keysArray[i].keyPressed = true;


            //console.log("keyPressed: " + keysArray[i].keyName);
            //if(keysArray[i].useSong)
            //keysArray[i].playSound();
        }
    }
}

function handleKeyUp(event) {
    for (let i in keysArray) {
        if (keysArray[i].keyCode === event.keyCode) {
            keysArray[i].keyPressed = false;
            keysArray[i].keyUp = true;


            //if(keysArray[i].useSong)
            //keysArray[i].doNotPlaySound();
        }
    }
}

function handleKeys() {
    for (let i in keysArray) {
        keysArray[i].doAction();
    }
}