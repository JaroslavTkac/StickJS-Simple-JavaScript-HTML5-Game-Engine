/**
 * Created by jaroslavtkaciuk on 28/11/2017.
 */

$(document).ready(function() {

    //Apply Code Button
    $('#push-code-btn').click(function () {
        getDataOfSvgInScene();
        parsingBlocks();
        saveData();
        saveSvgCodeScene();
        codeToAdd = "function userCode() { ";
    });

    //Upload Code Button
    $('#upload-code-btn').click(function () {
        saveSvgCodeScene();
        codeToAdd = "function userCode() { ";
    });

    //Play Frames Button
    $('#start-frame-btn').click(function () {
        playFrames = true;
        fpsSum = 0;
        console.log("Frames = " + fpsSum);
    });

    //Clear Code Button
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
        saveSvgCodeScene();
    });



});


let codeToAdd = "function userCode() { ";

function parsingBlocks() {
    let cluster = [];

    //going through clusters of blocks
    for (let i = 0; i < codeArray.length; i++){
        //getting first cluster
        cluster = codeArray[i];
        switch (cluster[0].codeID) {
            case "on start":  //WORKING
                console.log("--On Start--");
                searchingFirstLoopWithoutCodeUploading(cluster, 1);
                break;
            case "on frame": //WORKING
                console.log("--On Frame--");
                console.log(cluster);
                console.log(cluster[0].value);
                searchingFirstLoopWithCodeUploading(cluster, 1, cluster[0].value, "onFrame");
                break;
            case "on repeat":
                console.log("--On Repeat--");
                console.log(cluster);
                console.log(cluster[0].value);
                searchingFirstLoopWithCodeUploading(cluster, 1, cluster[0].value, "onRepeat");
                break;
            case "on key":
                console.log("--On Key--");
                searchingFirstLoopWithCodeUploading(cluster, 1, cluster[0].value, "onKey");
                break;
            case "on x":
                console.log("--On X--");
                searchingFirstLoopWithCodeUploading(cluster, 1, cluster[0].value, "onX");
                break;
            case "on y":
                console.log("--On Y--");
                searchingFirstLoopWithCodeUploading(cluster, 1, cluster[0].value, "onY");
                break;
            case "on z":
                console.log("--On Z--");
                searchingFirstLoopWithCodeUploading(cluster, 1, cluster[0].value, "onZ");
                break;
        }
    }

}
function searchingFirstLoopWithoutCodeUploading(cluster, index){
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
            console.log("LOOP: for name");
            analyzingCodeCluster(j, cluster, "name", cluster[j].value);
            break;
        }
    }
}
function searchingFirstLoopWithCodeUploading(cluster, index, triggerValue, triggerType){
    for(let j = index; j < cluster.length; j++){
        console.log(cluster[j].codeID);
        if(cluster[j].codeID === "for all"){
            console.log("LOOP: for all");
            analyzingCodeClusterForUploading(j, cluster, "basic", undefined, triggerValue, triggerType);
            break;
        }
        if(cluster[j].codeID === "for specific"){
            console.log("LOOP: for specific");
            analyzingCodeClusterForUploading(j, cluster, "specific", cluster[j].value, triggerValue, triggerType);
            break;
        }
        if(cluster[j].codeID === "for name"){
            console.log("LOOP: for name");
            analyzingCodeClusterForUploading(j, cluster, "name", cluster[j].value, triggerValue, triggerType);
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
        useAnimation = null, sumAllValues = null;
    let alreadyApplied = false;

    console.log("Value: " + value); // value is object type or name

    //===Works ONLY one of 3 ifs at one cluster analyzing===
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
                    case "set sumvalues":
                        console.log("set sumvalues");
                        sumAllValues = true;
                        break;
                }
            }
            else{
                //if found loop block -> applying changes
                //Saving all gained data
                applyChangesToAll(x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                    ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency, sumAllValues);
                alreadyApplied = true;
                searchingFirstLoopWithoutCodeUploading(cluster, i);
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
                    case "set sumvalues":
                        console.log("set sumvalues");
                        sumAllValues = true;
                        break;
                }
            }
            else{
                //if found loop block -> applying changes
                //Saving all gained data
                applyChangesToSpecificType(value, x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                    ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency, sumAllValues);
                alreadyApplied = true;
                searchingFirstLoopWithoutCodeUploading(cluster, i);
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
                    case "set sumvalues":
                        console.log("set sumvalues");
                        sumAllValues = true;
                        break;
                }
            }
            else{
                //if found loop block -> applying changes
                //Saving all gained data
                applyChangesToSpecificObject(value, x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                    ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency, sumAllValues);
                alreadyApplied = true;
                searchingFirstLoopWithoutCodeUploading(cluster, i);
            }
        }
    }


    if(!alreadyApplied) {
        if (loopType === "basic")
            applyChangesToAll(x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency, sumAllValues);
        if (loopType === "specific")
            applyChangesToSpecificType(value, x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency, sumAllValues);
        if (loopType === "name")
            applyChangesToSpecificObject(value, x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed, yRotSpeed, zRotSpeed, r, g, b,
                ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency, sumAllValues);
    }
}
function analyzingCodeClusterForUploading(index, cluster, loopType, value, triggerValue, triggerType) {
    let x = null, y = null, z = null,
        sx = null, sy = null, sz = null,
        xRot = null, yRot = null, zRot = null,
        xRotSpeed = null, yRotSpeed = null, zRotSpeed = null,
        opacity = null, transparency = null, camera = null,
        r = null, g = null, b = null,
        ambientR = null, ambientG = null, ambientB = null,
        useAnimation = null, sumAllValues = null;
    let alreadyApplied = false;
    let functionToPass = "";

    console.log("Value: " + value); // value is object type or name

    //===Works ONLY one of 3 ifs at one cluster analyzing===
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
                    case "set sumvalues":
                        console.log("set sumvalues");
                        sumAllValues = true;
                        break;
                }
            }
            else{
                //if found loop block ->
                //Saving all gained data into string


                functionToPass = parseDataForFunctionToPass("applyChangesToAll(", x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed,
                    yRotSpeed, zRotSpeed, r, g, b, ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency, sumAllValues);
                //DAUG SKIRTINGU TRIGERIU IFU
                if(triggerType === "onFrame")
                    onFrameConvert(triggerValue, functionToPass);


                alreadyApplied = true;
                searchingFirstLoopWithCodeUploading(cluster, i, triggerValue, triggerType);
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
                    case "set sumvalues":
                        console.log("set sumvalues");
                        sumAllValues = true;
                        break;
                }
            }
            else{
                //if found loop block ->
                //Saving all gained data into string

                functionToPass = parseDataForFunctionToPass("applyChangesToSpecificType(", x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed,
                    yRotSpeed, zRotSpeed, r, g, b, ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency, value, sumAllValues);
                if(triggerType === "onFrame")
                    onFrameConvert(triggerValue, functionToPass);

                alreadyApplied = true;
                searchingFirstLoopWithCodeUploading(cluster, i, triggerValue, triggerType);
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
                    case "set sumvalues":
                        console.log("set sumvalues");
                        sumAllValues = true;
                        break;
                }
            }
            else{
                //if found loop block ->
                //Saving all gained data into string

                if (triggerType === "onFrame") {
                    functionToPass = parseDataForFunctionToPass("applyChangesToSpecificObject(", x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed,
                        yRotSpeed, zRotSpeed, r, g, b, ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency, value, sumAllValues);
                    onFrameConvert(triggerValue, functionToPass);
                }

                alreadyApplied = true;
                searchingFirstLoopWithCodeUploading(cluster, i, triggerValue, triggerType);
            }
        }
    }


    if(!alreadyApplied) {
        if (loopType === "basic"){
            if (triggerType === "onFrame") {
                functionToPass = parseDataForFunctionToPass("applyChangesToAll(", x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed,
                    yRotSpeed, zRotSpeed, r, g, b, ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency, sumAllValues);

                onFrameConvert(triggerValue, functionToPass);
            }
        }

        if (loopType === "specific") {
            if (triggerType === "onFrame") {
                functionToPass = parseDataForFunctionToPass("applyChangesToSpecificType(", x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed,
                    yRotSpeed, zRotSpeed, r, g, b, ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency, sumAllValues, value);

                onFrameConvert(triggerValue, functionToPass);
            }
        }

        if (loopType === "name"){
            if (triggerType === "onFrame") {
                functionToPass = parseDataForFunctionToPass("applyChangesToSpecificObject(", x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed,
                    yRotSpeed, zRotSpeed, r, g, b, ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency, umAllValues, value);

                onFrameConvert(triggerValue, functionToPass);
            }
        }
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
function parseDataForFunctionToPass(method, x, y, z, sx, sy, sz, xRot, yRot, zRot, xRotSpeed, yRotSpeed, zRotSpeed,
                                    r, g, b, ambientR, ambientG, ambientB, useAnimation, camera, opacity, transparency, sumAllValues, value){
    let data = method;

    //x y z
    //----------
    if(x !== null)
        x = x.toString() + ",";
    else
        x = "null,";

    if(y !== null)
        y = y.toString() + ",";
    else
        y = "null,";

    if(z !== null)
        z = z.toString() + ",";
    else
        z = "null,";
    //sx sy sz
    //----------
    if(sx !== null)
        sx = sx.toString() + ",";
    else
        sx = "null,";

    if(sy !== null)
        sy = sy.toString() + ",";
    else
        sy = "null,";

    if(sz !== null)
        sz = sz.toString() + ",";
    else
        sz = "null,";
    //xRot yRot zRot
    //----------
    if(xRot !== null)
        xRot = xRot.toString() + ",";
    else
        xRot = "null,";

    if(yRot !== null)
        yRot = yRot.toString() + ",";
    else
        yRot = "null,";

    if(zRot !== null)
        zRot = zRot.toString() + ",";
    else
        zRot = "null,";
    //xRotSpeed yRotSpeed zRotSpeed
    //----------
    if(xRotSpeed !== null)
        xRotSpeed = xRotSpeed.toString() + ",";
    else
        xRotSpeed = "null,";

    if(yRotSpeed !== null)
        yRotSpeed = yRotSpeed.toString() + ",";
    else
        yRotSpeed = "null,";

    if(zRotSpeed !== null)
        zRotSpeed = zRotSpeed.toString() + ",";
    else
        zRotSpeed = "null,";
    //r g b
    //----------
    if(r !== null)
        r = r.toString() + ",";
    else
        r = "null,";

    if(g !== null)
        g = g.toString() + ",";
    else
        g = "null,";

    if(b !== null)
        b = b.toString() + ",";
    else
        b = "null,";
    //rambient gambient bambient
    //----------
    if(ambientR !== null)
        ambientR = ambientR.toString() + ",";
    else
        ambientR = "null,";

    if(ambientG !== null)
        ambientG = ambientG.toString() + ",";
    else
        ambientG = "null,";

    if(ambientB !== null)
        ambientB = ambientB.toString() + ",";
    else
        ambientB = "null,";
    //other
    //---------
    if(useAnimation !== null)
        useAnimation = useAnimation.toString() + ",";
    else
        useAnimation = "null,";

    if(camera !== null)
        camera = camera.toString() + ",";
    else
        camera = "null,";

    if(opacity !== null)
        opacity = opacity.toString() + ",";
    else
        opacity = "null,";

    if(transparency !== null)
        transparency = transparency.toString() + ",";
    else
        transparency = "null,";

    if(sumAllValues !== null)
        sumAllValues = sumAllValues.toString() + ",";
    else
        sumAllValues = "null,";



    if(value !== undefined) {
        value = value.toString() + ",";
        data += value + x + y + z + sx + sy + sz + xRot + yRot + zRot + xRotSpeed + yRotSpeed + zRotSpeed +
            r + g + b + ambientR + ambientG + ambientB + useAnimation + camera + opacity + transparency + sumAllValues + ");";
    }
    else{
        data += x + y + z + sx + sy + sz + xRot + yRot + zRot + xRotSpeed + yRotSpeed + zRotSpeed +
            r + g + b + ambientR + ambientG + ambientB + useAnimation + camera + opacity + transparency + sumAllValues + ");";
    }

    return data;
}
function onFrameConvert(triggerValue, functionToPass){
    let ifStatement = "if(fpsSum ===" + triggerValue + "&& playFrames){ ";

    codeToAdd += ifStatement + functionToPass + "}";
    console.log(codeToAdd);
}
function onKeyPressConvert(){

}
//TODO pries uploada stringo reikia uzmesti } -> skliaustus uzdaryti user code funkcija
