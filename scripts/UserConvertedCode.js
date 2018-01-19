


function userCode() {
    //console.log(fpsSum);
    if(fpsSum === 200 && playFrames){
        console.log("Hello Sum is 200");
    }


    //key press simulation
    for (let i in keysArray) {
        if (keysArray[i].keyPressed) {
            if(keysArray[i].keyName === "q")
                applyChangesToAll(1, 0, 0, 1, 1, 1, null, null, null, null, null, null, 1, 0.5, null,
                    null, null, null, null, null, null, null);
            console.log("keyPressed: " + keysArray[i].keyName);
        }
    }



}