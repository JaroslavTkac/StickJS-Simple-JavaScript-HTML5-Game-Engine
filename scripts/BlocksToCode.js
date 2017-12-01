/**
 * Created by jaroslavtkaciuk on 28/11/2017.
 */

$(document).ready(function() {

    $('#push-code-btn').click(function () {
        getDataOfSvgInScene();
        parsingBlocks();
        saveData();
        saveSvgCodeScene();
    });


    $('#upload-code-btn').click(function () {
        //saveSvgCodeScene();
    });

    $('#clear-code-btn').click(function () {
        let svgArr = document.getElementById("code-logic-scene").children;
        //cleaning old svg elements
        while(svgArr.length !== 1){
            for (let i = 0; i < svgArr.length; i++){
                if(getmktime(svgArr[i]) !== "trashbin"){
                    $(svgArr[i]).remove().end();
                }
            }
            svgArr = document.getElementById("code-logic-scene").children;
        }
        /*for (let i = 0; i < svgArr.length; i++){
            if(getmktime(svgArr[i]) !== "trashbin"){
                $(svgArr[i]).remove().end();
            }
        }*/

        saveSvgCodeScene();
    });



});


let codeToAdd = "";

function parsingBlocks() {
    let cluster = [];

    //going through clusters of blocks
    for (let i = 0; i < codeArray.length; i++){
        //getting first cluster
        cluster = codeArray[i];
        switch (cluster[0].codeID) {
            case "on start":
                console.log("--On Start--");
                searchingFirstLoop(cluster, 1);
                break;
            case "on frame":
                console.log("--On Frame--");
                searchingFirstLoop(cluster, 1);
                break;
            case "on key":
                console.log("--On Key--");
                searchingFirstLoop(cluster, 1);
                break;
            case "on x":
                console.log("--On X--");
                searchingFirstLoop(cluster, 1);
                break;
            case "on y":
                console.log("--On Y--");
                searchingFirstLoop(cluster, 1);
                break;
            case "on z":
                console.log("--On Z--");
                searchingFirstLoop(cluster, 1);
                break;
        }



    }

}
function searchingFirstLoop(cluster, index){
    for(let j = index; j < cluster.length; j++){
        console.log(cluster[j].codeID);
        if(cluster[j].codeID === "for all"){
            console.log("LOOP: for all");
            analyzingCodeCluster(j, cluster, "basic");
            break;
        }
        if(cluster[j].codeID === "for specific"){
            console.log("LOOP: for specific");
            analyzingCodeCluster(j, cluster, "specific", cluster[j].value);
            break;
        }
        if(cluster[j].codeID === "for name"){
            console.log("LOOP: for all");
            analyzingCodeCluster(j, cluster, "name", cluster[j].value);
            break;
        }
    }
}

function analyzingCodeCluster(index, cluster, loopType, value) {
    let x = null, y = null, z = null,
        sx = null, sy = null, sz = null,
        xRot = null, yRot = null, zRot = null,
        xRotSpeed = null, yRotSpeed = null, zRotSpeed = null,
        opacity = null, transparency = null, camera = null,
        r = null, g = null, b = null,
        ambientR = null, ambientG = null, ambientB = null,
        useAnimation = null;
    let alreadyApplied = false;

    console.log("Value: " + value); // value is object type or name

    if(loopType === "basic") {
        //if TRIGGER is On Start & LOOP is For EVERY SHAPE
        for (let i = index + 1; i < cluster.length; i++) {
            if(!isLoop(cluster[i].codeID)){
                switch (cluster[i].codeID) {
                    case "set x":
                        console.log("set x");
                        x = cluster[i].value;
                        break;
                    case "set y":
                        console.log("set y");
                        y = cluster[i].value;
                        break;
                    case "set z":
                        console.log("set z");
                        z = cluster[i].value;
                        break;
                    case "set sx":
                        console.log("set sx");
                        sx = cluster[i].value;
                        break;
                    case "set sy":
                        console.log("set sy");
                        sy = cluster[i].value;
                        break;
                    case "set sz":
                        console.log("set sz");
                        sz = cluster[i].value;
                        break;
                    case "set xrot":
                        console.log("set xrot");
                        xRot = cluster[i].value;
                        break;
                    case "set yrot":
                        console.log("set yrot");
                        yRot = cluster[i].value;
                        break;
                    case "set zrot":
                        console.log("set zrot");
                        zRot = cluster[i].value;
                        break;
                    case "set r":
                        console.log("set r");
                        r = cluster[i].value;
                        break;
                    case "set g":
                        console.log("set g");
                        g = cluster[i].value;
                        break;
                    case "set b":
                        console.log("set b");
                        b = cluster[i].value;
                        break;
                    case "set opacity":
                        console.log("set opacity");
                        opacity = Math.abs(cluster[i].value);
                        transparency = ((opacity >= 0) && (opacity < 1));
                        break;
                    case "set camera":
                        console.log("set camera");
                        camera = true;
                        break;
                    case "set camerafalse":
                        console.log("set camerafalse");
                        camera = false;
                        break;
                    case "set ambientr":
                        console.log("set ambientr");
                        ambientR = cluster[i].value;
                        break;
                    case "set ambientg":
                        console.log("set ambientg");
                        ambientG = cluster[i].value;
                        break;
                    case "set ambientb":
                        console.log("set ambientb");
                        ambientB = cluster[i].value;
                        break;
                    case "set xrotspeed":
                        console.log("set xrotspeed");
                        xRotSpeed = cluster[i].value;
                        break;
                    case "set yrotspeed":
                        console.log("set yrotspeed");
                        yRotSpeed = cluster[i].value;
                        break;
                    case "set zrotspeed":
                        console.log("set zrotspeed");
                        zRotSpeed = cluster[i].value;
                        break;
                    case "set animationfalse":
                        console.log("set animationfalse");
                        useAnimation = false;
                        break;
                    case "set animationtrue":
                        console.log("set animationtrue");
                        useAnimation = true;
                        break;
                }
            }
            else{
                //if found loop block -> applying changes
                //Saving all gained data
                applyChangesToAll(x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                    ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency);
                /*x = null; y = null; z = null;
                sx = null; sy = null; sz = null;
                xRot = null; yRot = null; zRot = null;
                xRotSpeed = null; yRotSpeed = null; zRotSpeed = null;
                opacity = null; transparency = null; camera = null;
                r = null; g = null; b = null;
                ambientR = null; ambientG = null; ambientB = null;
                useAnimation = null;*/
                alreadyApplied = true;
                searchingFirstLoop(cluster, i);
            }
        }
    }
    if(loopType === "specific") {
        //if TRIGGER is On Start & LOOP is For EVERY selected[TYPE]
        for (let i = index + 1; i < cluster.length; i++) {
            if(!isLoop(cluster[i].codeID)){
                switch (cluster[i].codeID) {
                    case "set x":
                        console.log("set x");
                        x = cluster[i].value;
                        break;
                    case "set y":
                        console.log("set y");
                        y = cluster[i].value;
                        break;
                    case "set z":
                        console.log("set z");
                        z = cluster[i].value;
                        break;
                    case "set sx":
                        console.log("set sx");
                        sx = cluster[i].value;
                        break;
                    case "set sy":
                        console.log("set sy");
                        sy = cluster[i].value;
                        break;
                    case "set sz":
                        console.log("set sz");
                        sz = cluster[i].value;
                        break;
                    case "set xrot":
                        console.log("set xrot");
                        xRot = cluster[i].value;
                        break;
                    case "set yrot":
                        console.log("set yrot");
                        yRot = cluster[i].value;
                        break;
                    case "set zrot":
                        console.log("set zrot");
                        zRot = cluster[i].value;
                        break;
                    case "set r":
                        console.log("set r");
                        r = cluster[i].value;
                        break;
                    case "set g":
                        console.log("set g");
                        g = cluster[i].value;
                        break;
                    case "set b":
                        console.log("set b");
                        b = cluster[i].value;
                        break;
                    case "set opacity":
                        console.log("set opacity");
                        opacity = Math.abs(cluster[i].value);
                        transparency = ((opacity >= 0) && (opacity < 1));
                        break;
                    case "set camera":
                        console.log("set camera");
                        camera = true;
                        break;
                    case "set camerafalse":
                        console.log("set camerafalse");
                        camera = false;
                        break;
                    case "set ambientr":
                        console.log("set ambientr");
                        ambientR = cluster[i].value;
                        break;
                    case "set ambientg":
                        console.log("set ambientg");
                        ambientG = cluster[i].value;
                        break;
                    case "set ambientb":
                        console.log("set ambientb");
                        ambientB = cluster[i].value;
                        break;
                    case "set xrotspeed":
                        console.log("set xrotspeed");
                        xRotSpeed = cluster[i].value;
                        break;
                    case "set yrotspeed":
                        console.log("set yrotspeed");
                        yRotSpeed = cluster[i].value;
                        break;
                    case "set zrotspeed":
                        console.log("set zrotspeed");
                        zRotSpeed = cluster[i].value;
                        break;
                    case "set animationfalse":
                        console.log("set animationfalse");
                        useAnimation = false;
                        break;
                    case "set animationtrue":
                        console.log("set animationtrue");
                        useAnimation = true;
                        break;
                }
            }
            else{
                //if found loop block -> applying changes
                //Saving all gained data
                applyChangesToSpecificType(value, x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                    ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency);
                alreadyApplied = true;
                searchingFirstLoop(cluster, i);
            }
        }
    }
    if(loopType === "name") {
        //if TRIGGER is On Start & LOOP is For EVERY selected[TYPE]
        for (let i = index + 1; i < cluster.length; i++) {
            if(!isLoop(cluster[i].codeID)){
                switch (cluster[i].codeID) {
                    case "set x":
                        console.log("set x");
                        x = cluster[i].value;
                        break;
                    case "set y":
                        console.log("set y");
                        y = cluster[i].value;
                        break;
                    case "set z":
                        console.log("set z");
                        z = cluster[i].value;
                        break;
                    case "set sx":
                        console.log("set sx");
                        sx = cluster[i].value;
                        break;
                    case "set sy":
                        console.log("set sy");
                        sy = cluster[i].value;
                        break;
                    case "set sz":
                        console.log("set sz");
                        sz = cluster[i].value;
                        break;
                    case "set xrot":
                        console.log("set xrot");
                        xRot = cluster[i].value;
                        break;
                    case "set yrot":
                        console.log("set yrot");
                        yRot = cluster[i].value;
                        break;
                    case "set zrot":
                        console.log("set zrot");
                        zRot = cluster[i].value;
                        break;
                    case "set r":
                        console.log("set r");
                        r = cluster[i].value;
                        break;
                    case "set g":
                        console.log("set g");
                        g = cluster[i].value;
                        break;
                    case "set b":
                        console.log("set b");
                        b = cluster[i].value;
                        break;
                    case "set opacity":
                        console.log("set opacity");
                        opacity = Math.abs(cluster[i].value);
                        transparency = ((opacity >= 0) && (opacity < 1));
                        break;
                    case "set camera":
                        console.log("set camera");
                        camera = true;
                        break;
                    case "set camerafalse":
                        console.log("set camerafalse");
                        camera = false;
                        break;
                    case "set ambientr":
                        console.log("set ambientr");
                        ambientR = cluster[i].value;
                        break;
                    case "set ambientg":
                        console.log("set ambientg");
                        ambientG = cluster[i].value;
                        break;
                    case "set ambientb":
                        console.log("set ambientb");
                        ambientB = cluster[i].value;
                        break;
                    case "set xrotspeed":
                        console.log("set xrotspeed");
                        xRotSpeed = cluster[i].value;
                        break;
                    case "set yrotspeed":
                        console.log("set yrotspeed");
                        yRotSpeed = cluster[i].value;
                        break;
                    case "set zrotspeed":
                        console.log("set zrotspeed");
                        zRotSpeed = cluster[i].value;
                        break;
                    case "set animationfalse":
                        console.log("set animationfalse");
                        useAnimation = false;
                        break;
                    case "set animationtrue":
                        console.log("set animationtrue");
                        useAnimation = true;
                        break;
                }
            }
            else{
                //if found loop block -> applying changes
                //Saving all gained data
                applyChangesToSpecificObject(value, x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                    ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency);
                alreadyApplied = true;
                searchingFirstLoop(cluster, i);
            }
        }
    }


    if(!alreadyApplied) {
        if (loopType === "basic")
            applyChangesToAll(x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency);
        if (loopType === "specific")
            applyChangesToSpecificType(value, x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency);
        if (loopType === "name")
            applyChangesToSpecificObject(value, x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency);
    }
}

function isLoop(block){
    if(block === "for all"){
        console.log("FOUND LOOP: for all");
        return true;
    }
    if(block === "for specific"){
        console.log("FOUND LOOP: for specific");
        return true;
    }
    if(block === "for name"){
        console.log("FOUND LOOP: for all");
        return true;
    }
    return false;
}
function getDataFromBlock(block){
    switch (block) {
        case "on start":
            console.log("--On Start--");
            searchingFirstLoop(cluster);
            break;
        case "on frame":
            console.log("--On Frame--");
            searchingFirstLoop(cluster);
            break;
        case "on key":
            console.log("--On Key--");
            searchingFirstLoop(cluster);
            break;
        case "on x":
            console.log("--On X--");
            searchingFirstLoop(cluster);
            break;
        case "on y":
            console.log("--On Y--");
            searchingFirstLoop(cluster);
            break;
        case "on z":
            console.log("--On Z--");
            searchingFirstLoop(cluster);
            break;
    }
}
