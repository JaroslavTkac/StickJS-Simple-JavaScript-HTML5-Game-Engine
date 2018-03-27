/**
 * Created by jaroslavtkaciuk on 27/08/2017.
 */

let objectJSON;
let uploaded;
let savedShapeImg = "";
let savedShapesArr = [];
let liveLoadedShapesArr = [];
let sceneToLoadArr = [];
let availableTexturesOnServer = [];
let uploadedObjectLoadedSuccessfully = false;
let uploadedObjectsToInit = [];
let initializeIndex = 0;


// Some sort of call back (waiting for editor shape loading)
function waitUntilWebglInitialized() {
    //waiting before webgl is initing, loading textures
    if (webgl === undefined) {
        setTimeout(waitUntilWebglInitialized, 100);
        return;
    }
    if(!texturesLoaded || texturesLoaded === undefined){
        setTimeout(waitUntilWebglInitialized, 100);
        return;
    }

    let textureToApplySrc = "../assets/img/textures/sun.jpg";
    //initialized -> init objects
    for (let i = 0; i < liveLoadedShapesArr.length; i++) {
        /*console.log("-------------");
        console.log(liveLoadedShapesArr);
        console.log("REAL TEXTURE: " + liveLoadedShapesArr[i].textureSrc);
        console.log("-------------");
        console.log("available texture array");
        console.log(availableTexturesOnServer);*/
        if(liveLoadedShapesArr[i].textureSrc.indexOf("user_textures") !== -1){
            //check for texture availability../assets/img/textures
            for (let j = 0; j < availableTexturesOnServer.length; j++) {
                if (liveLoadedShapesArr[i].textureSrc === ("../" + availableTexturesOnServer[j])) {
                    textureToApplySrc = liveLoadedShapesArr[i].textureSrc;
                    break;
                }
                else {
                    textureToApplySrc = "../assets/img/textures/sun.jpg";
                }
            }
        }
        else{
            textureToApplySrc = liveLoadedShapesArr[i].textureSrc;
        }

        /*console.log("-------------");
        console.log("INITING OBJECT WITH: " + textureToApplySrc);
        console.log("-------------");*/
        new LoadObject(liveLoadedShapesArr[i].jsonPath, textureToApplySrc, {
            "name": liveLoadedShapesArr[i].name,
            "savedShapeName": liveLoadedShapesArr[i].savedShapeName,
            "jsonPath": liveLoadedShapesArr[i].jsonPath,
            "x": liveLoadedShapesArr[i].x,
            "y": liveLoadedShapesArr[i].y,
            "z": liveLoadedShapesArr[i].z,
            "sx": liveLoadedShapesArr[i].sx,
            "sy": liveLoadedShapesArr[i].sy,
            "sz": liveLoadedShapesArr[i].sz,
            "r": liveLoadedShapesArr[i].r,
            "g": liveLoadedShapesArr[i].g,
            "b": liveLoadedShapesArr[i].b,
            "xRot": liveLoadedShapesArr[i].xRot,
            "xRotSpeed": liveLoadedShapesArr[i].xRotSpeed,
            "yRot": liveLoadedShapesArr[i].yRot,
            "yRotSpeed": liveLoadedShapesArr[i].yRotSpeed,
            "zRot": liveLoadedShapesArr[i].zRot,
            "zRotSpeed": liveLoadedShapesArr[i].zRotSpeed,
            "lighting": liveLoadedShapesArr[i].lighting,
            "animateRotation": liveLoadedShapesArr[i].animateRotation,
            "useTexture": liveLoadedShapesArr[i].useTexture,
            "textureSrc": liveLoadedShapesArr[i].textureSrc,
            "useCamera": liveLoadedShapesArr[i].useCamera,
            "transparency": liveLoadedShapesArr[i].transparency,
            "alpha": liveLoadedShapesArr[i].alpha,
            "type": liveLoadedShapesArr[i].type
        }, liveLoadedShapesArr[i].saveTo);

    }

}

function getShapesNameInFolder(dir) {
    $.ajax({
        url: "../php/upload.php",
        type: "POST",
        data: {
            callLoadUserData: dir,
            projectId: projectId,
            userId: userId
        },
        success: function (response) {
            let content = JSON.parse(response);
            ///let data = "";
            let folderContent = [];
            let tmp;

            //getting array of ACTUAL files in folder
            for (let i = 0; i < content['data'].length; i++) {
                tmp = content['data'][i].split('.');
                if (tmp[tmp.length - 1] === "json")
                    folderContent.push(tmp[0]);
            }
            console.log("FOLDER:");
            console.log(folderContent);
            userUploadedShapesNamesArray = [];
            userUploadedShapesNamesArray = folderContent;
            updateAllForSpecificBlocks();
        }
    });

}

function getAllAvailableTextures() {
    $.ajax({
        type: "POST",
        url: "../php/upload.php",
        data: {
            texturePaths: ["../assets/img/textures", "../assets/img/textures/user_textures"],
            projectId: projectId,
            userId: userId
        },
        success: function (response) {
            let content = JSON.parse(response);
            let tmp;
            console.log("Available Textures");
            console.log(content);

            //getting array of textures files in folders
            for (let i = 0; i < content['data'].length; i++) {
                tmp = content['data'][i].split('.');
                if (tmp[tmp.length - 1] === "png" || tmp[tmp.length - 1] === "jpg")
                    availableTexturesOnServer.push(tmp[0] + "." + tmp[1]);
            }
            texturesLoaded = true;
        },
        error: function (response) {
            console.log("Error occurred on texture folder reading");
        }
    });
}

function loadUserData(dir, type) {
    $.ajax({
        url: "../php/upload.php",
        type: "POST",
        data: {
            callLoadUserData: dir,
            projectId: projectId,
            userId: userId
        },
        success: function (response) {
            let content = JSON.parse(response);
            let data = "";
            let folderContent = [];
            let tmp;

            //getting array of ACTUAL files in folder
            for (let i = 0; i < content['data'].length; i++) {
                tmp = content['data'][i].split('.');
                if (tmp[tmp.length - 1] === "png" || tmp[tmp.length - 1] === "jpg" ||
                    tmp[tmp.length - 1] === "mp3" || tmp[tmp.length - 1] === "json")
                    folderContent.push(content['data'][i]);
            }
            console.log("Type: " + type);
            console.log(folderContent);
            console.log(content);


            if (type === "object") {
                uploadedObjectsToInit = folderContent;
                uploadedObjectInitSequence(projectType, folderContent);
            }
            //after successful file location change appending html document
            for (let i = 0; i < folderContent.length; i++) {
                //console.log(content['data'][i]);
                if (type === "image") {
                    $('#texture-picker-row').append(
                        "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-6 texture-padding\">" +
                        "<a href=\"#\" class=\"thumbnail\" >" +
                        "<img src=\"../assets/img/textures/user_textures/" + folderContent[i] + "\" class=\"img-rounded inline-block texture\" " +
                        "alt=\"assets/img/textures/user_textures/" + folderContent[i] + "\">" +
                        "</a>" +
                        "</div>");
                    if (projectType === "general") {
                        data = "<div align=\"center\" class=\"col-lg-4 col-md-4 col-sm-4 col-xs-6 texture-padding\">" +
                            "<a href=\"#\" class=\"thumbnail\" >" +
                            "<img src=\"../assets/img/textures/user_textures/" + folderContent[i] + "\" class=\"img-rounded inline-block\" " +
                            "alt=" + folderContent[i] + "\">" +
                            "<a href=\"#\" class=\"btn btn-md overlay-btn-del\">" +
                            "<span class=\"glyphicon glyphicon-trash\"></span>" +
                            "<span class=\"delete_path\" style=\"display: none\">../assets/img/textures/user_textures/" + folderContent[i] + "</span></a>" +
                            "</a>" +
                            "</div>";
                    }
                    if (projectType === "publish"){
                        data = "<div align=\"center\" class=\"col-lg-4 col-md-4 col-sm-4 col-xs-6 texture-padding\">" +
                            "<a href=\"#\" class=\"thumbnail\" >" +
                            "<img src=\"../assets/img/textures/user_textures/" + folderContent[i] + "\" class=\"img-rounded inline-block\" " +
                            "alt=" + folderContent[i] + "\">" +
                            "</div>";
                    }
                    $('#selectable-textures-row').append(data);
                }
                if (type === "music") {
                    /*data = "<div align=\"center\" class=\"col-lg-3 col-md-3 col-sm-4 col-xs-6\">" +
                        "<a href=\"#\" class=\"thumbnail\" >" +
                        "<img src=\"../assets/img/design/audio_file.png\" class=\"img-rounded inline-block\" " +
                        "alt=\"../assets/img/design/audio_file.png\">" +
                        "</a>" +
                        "<p>" + getOriginalFileName(folderContent[i]) + ".mp3" + "</p>" +
                        "<a href=\"#\" class=\"btn btn-md overlay-btn-del\">" +
                        "<span class=\"glyphicon glyphicon-trash\"></span>" +
                        "<span class=\"delete_path\" style=\"display: none\">../assets/music/user_music/" + folderContent[i] + "</span></a>" +
                        "</div>";
                    $('#selectable-music-row').append(data);*/
                }
                if (type === "savedShapes") {
                    if (projectType === "general") {
                        data = "<div align=\"center\">" +
                            "<a href=\"#\" class=\"thumbnail\" >" +
                            "<img src=\"../shapes/user_saved_shapes/" + folderContent[i] + "\" class=\"img-rounded inline-block\" " +
                            "alt=\"../shapes/user_saved_shapes/" + folderContent[i] + "\">" +
                            "</a>" +
                            // Add btn
                            "<a href=\"#\" class=\"btn btn-md overlay-btn overlay-btn-add\">" +
                            "<span class=\"glyphicon glyphicon-plus\"></span>" +
                            "<span class=\"add_shape\" style=\"display: none\">../shapes/user_saved_shapes/" + folderContent[i] + "</span>" +
                            "</a>" +
                            // Edit btn
                            "<a href=\"#\" class=\"btn btn-md overlay-btn overlay-btn-edit\">" +
                            "<span class=\"glyphicon glyphicon-wrench\"></span>" +
                            "<span class=\"edit_shape\" style=\"display: none\">../shapes/user_saved_shapes/" + folderContent[i] + "</span>" +
                            "</a>" +
                            // Delete btn
                            "<a href=\"#\" class=\"btn btn-md overlay-btn overlay-btn-del\">" +
                            "<span class=\"glyphicon glyphicon-trash\"></span>" +
                            "<span class=\"delete_path\" style=\"display: none\">../shapes/user_saved_shapes/" + folderContent[i] + "</span>" +
                            "</a>" +
                            "</div>";
                    }
                    if (projectType === "publish") {
                        data = "<div align=\"center\">" +
                            "<a href=\"#\" class=\"thumbnail\" >" +
                            "<img src=\"../shapes/user_saved_shapes/" + folderContent[i] + "\" class=\"img-rounded inline-block\" " +
                            "alt=\"../shapes/user_saved_shapes/" + folderContent[i] + "\">" +
                            "</a>" +
                            // Add btn
                            "<a href=\"#\" class=\"btn btn-md overlay-btn overlay-btn-add\">" +
                            "<span class=\"glyphicon glyphicon-plus\"></span>" +
                            "<span class=\"add_shape\" style=\"display: none\">../shapes/user_saved_shapes/" + folderContent[i] + "</span>" +
                            "</a>" +
                            // Edit btn
                            "<a href=\"#\" class=\"btn btn-md overlay-btn overlay-btn-edit\">" +
                            "<span class=\"glyphicon glyphicon-wrench\"></span>" +
                            "<span class=\"edit_shape\" style=\"display: none\">../shapes/user_saved_shapes/" + folderContent[i] + "</span>" +
                            "</a>" +
                            "</div>";
                    }
                    $('#saved-shape-canvas-container').append(data);
                }
            }

        }
    });
}


function uploadedObjectInitSequence(projectType, objects){
    let data = "";
    let i = 0;
    if(initializeIndex !== objects.length) {
        i = initializeIndex;
        if (projectType === "general") {
            data = "<div align=\"center\" class=\"col-lg3 col-md-4 col-sm-4 col-xs-6\">" +
                "<a href=\"#\" class=\"thumbnail\">" +
                "<canvas class=\"preview-scene shape\" id=\"" + "../shapes/user_shapes/" + objects[i] + "\" ></canvas>" +
                "<a href=\"#\" class=\"btn btn-md overlay-btn overlay-btn-del\">" +
                "<span class=\"glyphicon glyphicon-trash\"></span>" +
                "<span class=\"delete_path\" style=\"display: none\">../shapes/user_shapes/" + objects[i] + "</span></a>" +
                "</a>" +
                "</div>";
        }
        if (projectType === "publish") {
            data = "<div align=\"center\" class=\"col-lg3 col-md-4 col-sm-4 col-xs-6\">" +
                "<a href=\"#\" class=\"thumbnail\">" +
                "<canvas class=\"preview-scene shape\" id=\"" + "../shapes/user_shapes/" + objects[i] + "\" ></canvas>" +
                "</div>";
        }
        $('#selectable-shapes-row').append(data);

        uploadedObjectLoadedSuccessfully = false;
        //init every UPLOADED object for webgl here
        initUploadedObject("../shapes/user_shapes/" + objects[i]);

        //Waiting till object is not fully initialized
        waitUntilUserUploadedObjectIsLoadedSuccessfully();
    }
    else {
        //When all objects is finally initialized
        //Getting user saved shapes names for code blocks
        getShapesNameInFolder("../shapes/user_shapes");
    }
}

function waitUntilUserUploadedObjectIsLoadedSuccessfully(){
    if (!uploadedObjectLoadedSuccessfully) {
        setTimeout(waitUntilUserUploadedObjectIsLoadedSuccessfully, 50);
        return;
    }
    //When object initialized calling again function to init second object
    if(initializeIndex !== uploadedObjectsToInit.length) {
        initializeIndex++;
        uploadedObjectInitSequence(projectType, uploadedObjectsToInit);
    }
}

//Upload file (images/sound/object)
$(function () {
    'use strict';
    $('#upload').fileupload({
        url: "../php/upload.php",
        dataType: 'json',
        formData: {
            projectId: projectId,
            userId: userId
        },
        done: function (e, data) {
            console.log(data);
            uploaded = JSON.parse(JSON.stringify(data.result));
            console.log(uploaded);
            //if object instantly starting conversion
            if (uploaded['extension'] === 'obj') {
                convert("../uploads/" + uploaded['name']);
            }
            //if image run php script to relocate file to user_textures
            //and appending html document
            if (uploaded['extension'] === 'jpg' || uploaded['extension'] === 'png') {
                let imgName = uploaded['name'];
                //image resizing
                $.ajax({
                    url: "../php/upload.php",
                    type: "POST",
                    data: {"callResizeImage": ["../uploads/" + imgName, uploaded['extension']]},
                    success: function (response) {
                        console.log(response);
                        $.ajax({
                            url: "../php/upload.php",
                            type: "POST",
                            data: {"callMoveFile": ["../uploads/" + imgName, "../assets/img/textures/user_textures/" + imgName]},
                            success: function (response) {
                                //console.log(response);
                                //after successful file location change appending html document
                                $('#texture-picker-row').append(
                                    "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-6 texture-padding\">" +
                                    "<a href=\"#\" class=\"thumbnail\" >" +
                                    "<img src=\"../assets/img/textures/user_textures/" + imgName + "\" class=\"img-rounded inline-block texture\" " +
                                    "alt=\"assets/img/textures/user_textures/" + imgName + "\">" +
                                    "</a>" +
                                    "</div>");
                                let data = "<div align=\"center\" class=\"col-lg-3 col-md-4 col-sm-4 col-xs-6 texture-padding\">" +
                                    "<a href=\"#\" class=\"thumbnail\" >" +
                                    "<img src=\"../assets/img/textures/user_textures/" + imgName + "\" class=\"img-rounded inline-block\" " +
                                    "alt=" + imgName + "\">" +
                                    "<a href=\"#\" class=\"btn btn-md overlay-btn-del\">" +
                                    "<span class=\"glyphicon glyphicon-trash\"></span>" +
                                    "<span class=\"delete_path\" style=\"display: none\">../assets/img/textures/user_textures/" + imgName + "</span></a>" +
                                    "</a>" +
                                    "</div>";
                                $('#selectable-textures-row').append(data);
                                saveData();
                            }
                        });
                    }
                });
                //transferring image to destination location

            }
            //if music run php script to relocate file to user_music
            //and appending html document
            if (uploaded['extension'] === 'mp3') {
                /*let musicName = uploaded['name'];
                //transferring music file to destination location
                $.ajax({
                    url: "../php/upload.php",
                    type: "POST",
                    data: {"callMoveFile": ["uploads/" + musicName, "assets/music/user_music/" + musicName]},
                    success: function (response) {
                        //console.log(response);
                        //after successful file location change appending html document
                        let data = "<div align=\"center\" class=\"col-lg-3 col-md-3 col-sm-4 col-xs-6\">" +
                            "<a href=\"#\" class=\"thumbnail\" >" +
                            "<img src=\"assets/img/design/audio_file.png\" class=\"img-rounded inline-block\" " +
                            "alt=\"../assets/img/design/audio_file.png\">" +
                            "</a>" +
                            "<p>" + getOriginalFileName(musicName) + ".mp3" + "</p>" +
                            "<a href=\"#\" class=\"btn btn-md overlay-btn-del\">" +
                            "<span class=\"glyphicon glyphicon-trash\"></span>" +
                            "<span class=\"delete_path\" style=\"display: none\">../assets/music/user_music/" + musicName + "</span></a>" +
                            "</div>";
                        $('#selectable-music-row').append(data);
                        saveData();
                    }
                });*/
            }

        },
        error: function (e, data) {
            console.log("error");
            console.log(data);
            console.log(e);
        }
    })
});

//Convert Object
function convert(file_path) {
    jQuery.get(file_path, function (data) {
        let objectData = data;
        let vertices = [], normals = [], textures = [], raw = {};
        raw.verts = [];
        raw.norms = [];
        raw.textures = [];
        raw.hashindices = {};
        raw.faces = [];
        raw.index = 0;

        let lines = objectData.split('\n');

        let vertexRegex = /^v\s/;
        let normalRegex = /^vn\s/;
        let textureRegex = /^vt\s/;
        let faceRegex = /^f\s/;

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            let elements = line.split(/\s+/);
            elements.shift();

            if (vertexRegex.test(line)) {
                vertices.push.apply(vertices, elements);
            } else if (normalRegex.test(line)) {
                normals.push.apply(normals, elements);
            } else if (textureRegex.test(line)) {
                textures.push.apply(textures, elements);
            } else if (faceRegex.test(line)) {
                let quad = false;
                for (let j = 0, eleLen = elements.length; j < eleLen; j++) {
                    if (j === 3 && !quad) {
                        j = 2;
                        quad = true;
                    }
                    if (elements[j] in raw.hashindices) {
                        raw.faces.push(raw.hashindices[elements[j]]);
                    }
                    else {
                        let vertex = elements[j].split('/');
                        // vertex position
                        raw.verts.push(+vertices[(vertex[0] - 1) * 3]);
                        raw.verts.push(+vertices[(vertex[0] - 1) * 3 + 1]);
                        raw.verts.push(+vertices[(vertex[0] - 1) * 3 + 2]);
                        // vertex textures
                        if (textures.length) {
                            raw.textures.push(+textures[(vertex[1] - 1) * 2]);
                            raw.textures.push(+textures[(vertex[1] - 1) * 2 + 1]);
                        }
                        // vertex normals
                        raw.norms.push(+normals[(vertex[2] - 1) * 3]);
                        raw.norms.push(+normals[(vertex[2] - 1) * 3 + 1]);
                        raw.norms.push(+normals[(vertex[2] - 1) * 3 + 2]);

                        raw.hashindices[elements[j]] = raw.index;
                        raw.faces.push(raw.index);
                        raw.index += 1;
                    }
                    if (j === 3 && quad) {
                        raw.faces.push(raw.hashindices[elements[0]]);
                    }
                }
            }
        }

        let convertedVertices = raw.verts;
        let convertedNormals = raw.norms;
        let convertedTextures = raw.textures;
        let convertedFaces = raw.faces;

        let readyJSON = {
            "vertices": convertedVertices,
            "normals": convertedNormals,
            "texturecoords": convertedTextures,
            "faces": convertedFaces
        };
        objectJSON = JSON.stringify(readyJSON);

        //Validate generated object before saving on server
        if (readyJSON.texturecoords.length === 0) {
            alert(getOriginalFileName(uploaded['name']) + ".obj do not have texture coordinates, please unwrap it in Blender before uploading");
            deleteFileFromServer("../uploads/" + uploaded['name']);
        }
        else
            saveObject(file_path);
    });
}

//Save converted object to shapes folder & call deletion of uploaded .obj file
function saveObject(file_path) {
    let tmpFile_name = file_path.split("/");
    let file_name = tmpFile_name[tmpFile_name.length - 1].substring(0, tmpFile_name[tmpFile_name.length - 1].length - 4);
    //console.log(file_name);
    $.ajax({
        url: "../php/upload.php",
        type: "POST",
        data: {"callCreateFile": [objectJSON, file_name]},
        success: function (response) {
            //console.log("Converted and Saved successfully");
            console.log(JSON.parse(response)['name']);
            //Append html document with new object
            let data = "<div align=\"center\" class=\"col-lg3 col-md-4 col-sm-4 col-xs-6\">" +
                "<a href=\"#\" class=\"thumbnail\">" +
                "<canvas class=\"preview-scene shape\" id=\"../" + JSON.parse(response)['name'] + "\" ></canvas>" +
                "<a href=\"#\" class=\"btn btn-md overlay-btn overlay-btn-del\">" +
                "<span class=\"glyphicon glyphicon-trash\"></span>" +
                "<span class=\"delete_path\" style=\"display: none\">../" + JSON.parse(response)['name'] + "</span></a>" +
                "</a>" +
                "</div>";
            $('#selectable-shapes-row').append(data);
            //and run js scripts to init webgl
            console.log("BEFORE INIT PASSING " + JSON.parse(response)['name']);
            initUploadedObject("../" + JSON.parse(response)['name']);

            deleteFileFromServer("../uploads/" + uploaded['name']);

            getShapesNameInFolder("../shapes/user_shapes");

            saveData();
        }
    });
}

//Initializing user uploaded object (creating webgl context and so on) preparing for visualization
function initUploadedObject(file_path) {
    canvasEditorArr.push(document.getElementById(file_path));

    initGLForEditor(canvasEditorArr[canvasEditorArr.length - 1]);//init only for him

    editorShader(webglEditorArr[webglEditorArr.length - 1]);//init only for him

    webglEditorArr[webglEditorArr.length - 1].clearColor(0, 0, 0, 1.0);
    webglEditorArr[webglEditorArr.length - 1].enable(webglEditorArr[webglEditorArr.length - 1].DEPTH_TEST);

    new LoadObject(file_path, "../assets/img/textures/sun.jpg", {
        "name": "forPreview",
        "z": -4,
        "yRot": 50,
        "yRotSpeed": 40,
        "animateRotation": true,
        "useTexture": false,
        "useCamera": true,
        "transparency": false,
        "alpha": 1.0
    }, "preview", webglEditorArr[webglEditorArr.length - 1]); // new webgl index here
    //console.log(file_path + " Successfully added to preview scene");
}

//Delete file from server
function deleteFileFromServer(file_path) {
    console.log(file_path);
    $.ajax({
        url: "../php/upload.php",
        type: "POST",
        data: {"callDeleteFile": file_path},
        success: function (response) {
            console.log("Successfully deleted");
            console.log(response);
        },
        error: function (response) {
            console.log("Error on deleting");
            console.log(response);
        }
    });
}

//Save canvas to image
function saveCanvasImg(imgName) {
    let imgData = document.getElementById('editor-scene').toDataURL('image/png', 1.0);
    if (!(imgName === undefined)) {
        console.log("as param will be passed: " + imgName);
    }
    else {
        console.log("New png file will be created");
    }
    $.ajax({
        type: "POST",
        url: "../php/upload.php",
        data: {
            imgBase64: imgData,
            imgName: imgName,
            projectId: projectId,
            userId: userId
        }
    }).done(function (response) {
        console.log(response);
        console.log(JSON.parse(response));

        savedShapeImg = JSON.parse(response)['name'];


        //Change old previewed image to new
        if (!(imgName === undefined)) {

            $('img').each(function () {
                if ($(this).attr("src") === savedShapeImg) {
                    $(this).attr('src', '');
                    $(this).attr('src', savedShapeImg);
                    //let tmpImg = $(this);
                    //let tmpImg = $(this).parent().parent();
                    //$(this).parent().parent().remove();
                }
            });
        }
        else {
            let data = "<div align=\"center\">" +
                "<a href=\"#\" class=\"thumbnail\" >" +
                "<img src=\"" + savedShapeImg + "\" class=\"img-rounded inline-block\" " +
                "alt=\"" + savedShapeImg + "\">" +
                "</a>" +
                // Add btn
                "<a href=\"#\" class=\"btn btn-md overlay-btn overlay-btn-add\">" +
                "<span class=\"glyphicon glyphicon-plus\"></span>" +
                "<span class=\"add_shape\" style=\"display: none\">" + savedShapeImg + "</span>" +
                "</a>" +
                // Edit btn
                "<a href=\"#\" class=\"btn btn-md overlay-btn overlay-btn-edit\">" +
                "<span class=\"glyphicon glyphicon-wrench\"></span>" +
                "<span class=\"edit_shape\" style=\"display: none\">" + savedShapeImg + "</span>" +
                "</a>" +
                // Delete btn
                "<a href=\"#\" class=\"btn btn-md overlay-btn overlay-btn-del\">" +
                "<span class=\"glyphicon glyphicon-trash\"></span>" +
                "<span class=\"delete_path\" style=\"display: none\">" + savedShapeImg + "</span>" +
                "</a>" +
                "</div>";
            $('#saved-shape-canvas-container').append(data);
        }
        saveData();
    });
}

//Sending every 5 sec user data to server
setInterval(function () {
    saveData();
}, 5000); // every 5 sec*/

//Saving main important data
function saveData() {
    //console.log("Saving all data");
    if(projectType === "general" && readyToSaveData) {
        console.log(projectType);
        saveSavedShapes();
        saveLiveObjects();
        saveSvgCodeScene();
        saveMovementConfig();
    }
}

//Load all user projects data
function loadUserProjectData() {
    loadSavedShapes();
    loadUserLiveObjects();
    loadSvgCodeScene();
    loadMovementConfig();
}


//Saving user project movement config
function saveMovementConfig() {
    let useMovement;

    if ($('#checkSpeed').prop('checked') === true)
        useMovement = 1;
    else
        useMovement = 0;

    $.ajax({
        url: "../php/upload_movement_config.php",
        type: "POST",
        data: {
            projectId: projectId,
            useMovement: useMovement,
            movementSpeed: $('#basic-speed-input').val(),
            movementRotation: $('#rotation-speed-input').val(),
            projectType: projectType
        },
        success: function (response) {
            //console.log(response);
        }
    });
}

//Loading user project selected movement config
function loadMovementConfig() {
    $.ajax({
        url: "../php/get_movement_config.php",
        type: "POST",
        data: {
            projectId: projectId
        },
        success: function (response) {
            let data = JSON.parse(response);
            //console.log(response);

            if (data[0].useMovement === 1) {
                $('#checkSpeed').prop('checked', true);
                keyboard.enableStandardControls();
            }
            else {
                $('#checkSpeed').prop('checked', false);
                keyboard.disableStandardControls();
            }

            $('#basic-speed-input').val(data[0].speed);
            $('#rotation-speed-input').val(data[0].rotationSpeed);

        }
    });
}


//Uploading user code to server
function uploadUserConvertedCode() {
    $.ajax({
        url: "../php/upload_converted_code.php",
        type: "POST",
        data: {
            projectId: projectId,
            userId: userId,
            codeToUpload: codeToAdd,
            projectType: projectType
        },
        success: function (response) {
            console.log("Response of update");
            console.log(response);
        }
    });
}


//Saving all SVG SCENE elements
function saveSvgCodeScene() {
    let svgCodeScene = [];
    let svgArr = document.getElementById("code-logic-scene").children;

    for (let i = 0; i < svgArr.length; i++) {
        if (getmktime(svgArr[i]) !== "trashbin") {
            svgCodeScene.push({
                data: svgArr[i].outerHTML, value: getDataFromSvgForm(svgArr[i]),
                value2: getOperatorDataFromSvgForm(svgArr[i])
            });
        }
    }
    let data = JSON.stringify(svgCodeScene);


    $.ajax({
        url: "../php/upload_saved_svg_scene.php",
        type: "POST",
        data: {
            projectId: projectId,
            saved_svg_scene: data,
            svgArr_len: svgArr.length,
            projectType: projectType
        },
        success: function (response) {
            //console.log(response);
            //console.log("svgArr.len: " + svgArr.length);
        }
    });
}

//Loading saved SVG SCENE elements
function loadSvgCodeScene() {
    $.ajax({
        url: "../php/get_saved_svg_scene.php",
        type: "POST",
        data: {
            projectId: projectId
        },
        success: function (response) {
            let data = JSON.parse(response);

            let svgArr = document.getElementById("code-logic-scene").children;
            //cleaning old svg elements
            while (svgArr.length !== 1) {
                for (let i = 0; i < svgArr.length; i++) {
                    if (getmktime(svgArr[i]) !== "trashbin") {
                        $(svgArr[i]).remove().end();
                    }
                }
                svgArr = document.getElementById("code-logic-scene").children;
            }

            for (let i = 0; i < data.length; i++) {
                $("#code-logic-scene").append(data[i].data).html($("#code-logic-scene").html());
            }
            //Restoring data
            svgArr = document.getElementById("code-logic-scene").children;
            for (let i = 1; i < svgArr.length; i++) {
                if (data[i - 1].value !== undefined) {
                    if (svgArr[i].getElementsByClassName("code-selection").length > 0)
                        setSelectedValue(svgArr[i].getElementsByClassName("code-selection")[0], data[i - 1].value);
                    if (svgArr[i].getElementsByClassName("code-selection-inequality-operator").length > 0)
                        setSelectedValue(svgArr[i].getElementsByClassName("code-selection-inequality-operator")[0], data[i - 1].value2);
                    if (svgArr[i].getElementsByClassName("code-input").length > 0)
                        svgArr[i].getElementsByClassName("code-input")[0].value = data[i - 1].value;
                }
            }

            //Check or some block data are not corrupted with NaN value
            //if so restore object coordinates to 30;30
            for (let i = 0; i < svgArr.length; i++){
                if(isNaN(getSvgElementX(svgArr[i])) || isNaN(getSvgElementY(svgArr[i]))){
                    let currentMatrix = svgArr[i].getAttributeNS(null, "transform").slice(7, -1).split(' ');

                    currentMatrix[4] = 30;
                    currentMatrix[5] = 30;
                    svgArr[i].setAttributeNS(null, "transform", "matrix(" + currentMatrix.join(' ') + ")");
                }

            }
        }
    });
}

//Saving scene by btn click for multiple use dooring project -> Saving WebGL main scene
function saveScene() {
    /*let toSave = [];
    for (let i = 0; i < objArr.length; i++){
        if(objArr[i].name !== "------NotSaveToDB------"){
            toSave.push(objArr[i]);
        }
    }*/

    //Send to server user object data
    let obj_data = JSON.stringify(objArr);

    $.ajax({
        url: "../php/upload_saved_scene.php",
        type: "POST",
        data: {
            projectId: projectId,
            saved_scene_json_data: obj_data,
            projectType: projectType
        },
        success: function (response) {
            //console.log("saved scene");
            //console.log(response);
        }
    });
}

//Loading from DB user saved scene by btn click
function loadScene() {
    $.ajax({
        url: "../php/get_saved_scene.php",
        type: "POST",
        data: {
            projectId: projectId
        },
        success: function (response) {
            //console.log("load saved scene from db");
            //console.log(response);
            sceneToLoadArr = JSON.parse(response);

            if (sceneToLoadArr.length === 0) {
                sceneToLoadArr = null;
            }
        }
    });
}

//Saving all user saved shapes -> basically references of object parameters for images
function saveSavedShapes() {
    //Send to server user object data
    let saved_data = JSON.stringify(savedShapesArr);

    if(saved_data.length > 2 && savedShapesArr.length > 0) {
        $.ajax({
            url: "../php/upload_saved_shapes.php",
            type: "POST",
            data: {
                projectId: projectId,
                saved_shapes_json_data: saved_data,
                projectType: projectType
            },
            success: function (response) {
                //console.log(response);
            }
        });
    }
}

//Loading from DB all user saved shapes -> references for saved canvas IMGs
function loadSavedShapes() {
    $.ajax({
        url: "../php/get_saved_shapes.php",
        type: "POST",
        data: {
            projectId: projectId
        },
        success: function (response) {
            let savedDataToInit = JSON.parse(response);

            for (let i = 0; i < savedDataToInit.length; i++) {
                savedShapesArr.push(savedDataToInit[i]);
            }
            console.log("savedShapeArr");
            console.log(savedShapesArr);
        }
    });
}

//Saving user live objects -> objects that are init'ed in scene
function saveLiveObjects() {
   /* let toSave = [];
    for (let i = 0; i < objArr.length; i++){
        if(objArr[i].name !== "------NotSaveToDB------"){
            toSave.push(objArr[i]);
        }
    }*/

    //Send to server user object data
    let obj_data = JSON.stringify(objArr);

    $.ajax({
        url: "../php/upload_live_objects.php",
        type: "POST",
        data: {
            projectId: projectId,
            live_objects_json_data: obj_data,
            projectType: projectType
        },
        success: function (response) {
            //console.log(response);
        }
    });
}

//Loading from DB all user live objects
function loadUserLiveObjects() {
    $.ajax({
        url: "../php/get_live_objects.php",
        type: "POST",
        data: {
            projectId: projectId
        },
        success: function (response) {
            //console.log(response);
            let savedDataToInit = JSON.parse(response);

            for (let i = 0; i < savedDataToInit.length; i++) {
                liveLoadedShapesArr.push(savedDataToInit[i]);
            }

            waitUntilWebglInitialized();
        }
    });
}

//Get original file name
function getOriginalFileName(current_file_name) {
    let tmpName = current_file_name.split("_");
    let getFileOriginalName = "";
    for (let k = 0; k < tmpName.length - 3; k++) {
        getFileOriginalName += tmpName[k];
    }
    return getFileOriginalName;
}

//Del path from png file and get only file name
function getPngFileName(current_file_name) {
    let tmpName = current_file_name.split("/");
    return tmpName[tmpName.length - 1];
}