/**
 * Created by jaroslavtkaciuk on 02/09/2017.
 */

let lastSelectedTexture = "../assets/img/textures/sun.jpg";
let currentlySelectedShape = "../shapes/cube.json";
let isTextureWillBeUsed;
let isLightWillBeUsed;
let aspectR = true;


$(document).ready(function () {
    let windowWidth = $(window).width();
    let windowHeight = $(window).height();
    let editorHeight = $('#editor-scene').height();
    let previewShapesHeight = $('.shape').height();
    let SceneHeight = $('#Scene').height();
    let editorBlockHeight = $('#editor-area').height();
    let rightWindowHeight = $('#left-window').height();
    let objectIsEditing = false;
    let nameOfPngFile = "";

    $('#selectable-shapes').css('height', SceneHeight);
    $('#selectable-textures').css('height', SceneHeight);
    $('#selectable-music').css('height', SceneHeight);

    $('#code-area').css('display', 'none');
    $('#code-blocks-container').css('display', 'none');
    $('#code-scene').css('display', 'none');

    //lightning and opacity
    $('#opacity').css('display', 'none');
    $('#light-control').css('display', 'none');
    $('#light-control-additional').css('display', 'none');

    $('#saved-shape-container').css('height', (editorHeight * 2.76));
    $('#saved-shape-canvas-container').css('height', (editorHeight * 2.76));

    //Change code logic height
    $('#code-blocks-div').css('height', rightWindowHeight * 0.885);
    $('#code-scene-div').css('height', rightWindowHeight * 0.885);


    // Get user content and append page with got data
    //Getting all textures on server for init validation
    getAllAvailableTextures();
    //Textures
    loadUserData("../assets/img/textures/user_textures", "image");
    //Music
    //loadUserData("../assets/music/user_music", "music");
    //Saved shapes
    loadUserData("../shapes/user_saved_shapes", "savedShapes");

    //Loading all user saved options, code and etc.
    loadUserProjectData();

    //On ascpect ration button click
    $('#aspect-ratio').click(function () {
        let left = $('#left-window')[0];
        let right = $('#right-window')[0];
        if (aspectR) {
            left.setAttribute("class", "col-lg-5 col-md-5 col-sm-12 col-xs-12");
            right.setAttribute("class", "col-lg-7 col-md-7 col-sm-12 col-xs-12");
            aspectR = false;
            $(window).trigger('resize');
        }
        else {
            left.setAttribute("class", "col-lg-7 col-md-7 col-sm-12 col-xs-12");
            right.setAttribute("class", "col-lg-5 col-md-5 col-sm-12 col-xs-12");
            aspectR = true;
            $(window).trigger('resize');
        }
    });

    //Display tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });


    //Apply movement changes on checkbox check ON PAGE LOAD
    KeyboardPresets.initAllKeyboard();
    keyboard = new KeyboardPresets("wasd", $('#basic-speed-input').val(), $('#rotation-speed-input').val());

    if ($('#checkSpeed').prop('checked') === true)
        keyboard.enableStandardControls();
    else
        keyboard.disableStandardControls();

    //On movement checkbox click
    $('#checkSpeed').on('click', function () {
        keyboard.speed = $('#basic-speed-input').val();
        keyboard.rotationSpeed = $('#rotation-speed-input').val();
        if ($('#checkSpeed').prop('checked') === true)
            keyboard.enableStandardControls();
        else
            keyboard.disableStandardControls();
    });


    //On How To click open modal with instructions
    $('.nav.navbar-nav > li a').on('click', function () {
        if ($(this).text() === "How To")
            $('#how-to-modal').modal('show');
    });

    //Preparing page for code blocks
    $(window).keydown(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            return false;
        }
    });


    //Texture & Color toggle
    $('#radioBtn a').on('click', function () {
        //console.log("click");
        let sel = $(this).data('title');
        let tog = $(this).data('toggle');
        $('#' + tog).prop('value', sel);

        $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
        $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
        console.log(sel);
        if (sel === "Color") {
            objEditorArr[0].useTexture = false;
            for (let i in objPreviewArr) {
                objPreviewArr[i].useTexture = false;
            }
            $('#color-picker').css('display', '');
            $('#texture-picker').css('display', 'none');

            //lightning and opacity
            $('#opacity').css('display', 'none');
            $('#light-control').css('display', 'none');
            $('#light-control-additional').css('display', 'none');
            $('#rotation-control').css('display', '');
        }
        if (sel === "Texture") {
            $('#texture-picker').css('display', '');
            //$('#texture-picker').css('height', $('#color-picker').height());
            $('#color-picker').css('display', 'none');
            applyTexture(lastSelectedTexture);

            //lightning and opacity
            $('#opacity').css('display', 'none');
            $('#light-control').css('display', 'none');
            $('#light-control-additional').css('display', 'none');
            $('#rotation-control').css('display', '');
        }
        if (sel === "Opacity") {
            $('#color-picker').css('display', 'none');
            $('#texture-picker').css('display', 'none');
            $('#light-control').css('display', 'none');
            $('#light-control-additional').css('display', 'none');
            $('#rotation-control').css('display', '');
            $('#rotation-control').css('margin-top', '8%');
            $('#opacity').css('display', '');
        }
        if (sel === "Lightning") {
            $('#color-picker').css('display', 'none');
            $('#texture-picker').css('display', 'none');
            $('#opacity').css('display', 'none');
            $('#rotation-control').css('display', 'none');
            $('#light-control').css('display', '');
            $('#light-control-additional').css('display', '');
        }

    });

    //
    $(document).ready(function () {
        $(".btn-select").each(function (e) {
            let value = $(this).find("ul li.selected").html();
            if (value !== undefined) {
                $(this).find(".btn-select-input").val(value);
                $(this).find(".btn-select-value").html(value);
            }
        });
    });

    //Editor Navigation bar scripts
    $('.nav.navbar-nav.editor-navbar > li').on('click', function (e) {
        e.preventDefault();
        $('.nav.navbar-nav.editor-navbar > li').removeClass('active');
        $(this).addClass('active');


        if ($(this).text() === "Editor") {
            $('#push-code').css('display', 'none');
            $('#code-scene-div').css('display', 'none');
            $('#code-blocks-div').css('display', 'none');
            $('#clear-code-btn').css('display', 'none');
            $('#upload-code-btn').css('display', 'none');
            $('#push-code-btn').css('display', 'none');

            $('#checkSpeed').css('display', 'none');
            $('#basic-speed-input').css('display', 'none');
            $('#rotation-speed-input').css('display', 'none');

            $('#basic-speed-label').css('display', 'none');
            $('#rotation-speed-label').css('display', 'none');
            $('#checkbox-label').css('display', 'none');

            $('#saved-shape-container').css('display', '');
            $('#editor-container').css('display', '');

            if (windowHeight === $(document).height() && windowWidth === $(document).width()) {
                $('#editor-scene').css('height', editorHeight);
            }
            else {
                $('#editor-scene').css('height', ($('#editor-scene').width() / 2));
            }

            console.log(editorBlockHeight);
        }
        if ($(this).text() === "Logic") {
            $('#saved-shape-container').css('display', 'none');
            $('#editor-container').css('display', 'none');
            $('#code-blocks-div').css('display', '');
            $('#code-scene-div').css('display', '');
            $('#push-code-btn').css('display', '');
            $('#clear-code-btn').css('display', '');
            $('#upload-code-btn').css('display', '');


            $('#checkSpeed').css('display', '');
            $('#basic-speed-input').css('display', '');
            $('#rotation-speed-input').css('display', '');

            $('#basic-speed-label').css('display', '');
            $('#rotation-speed-label').css('display', '');
            $('#checkbox-label').css('display', '');


            intersectArrInit();
            updateAllForNameBlocks();

            let svgArr = document.getElementById("code-logic-scene").children;

            for (let i = 0; i < svgArr.length; i++) {
                getGelementByName(getmktime(svgArr[i])).firstElementChild.setAttribute("opacity", "1");
            }


        }

        /*if ($(this).text() === "Sound") {
            $('#saved-shape-container').css('display', 'none');
            $('#editor-container').css('display', 'none');
            $('#code-area').css('display', 'none');
            $('#code-blocks-container').css('display', 'none');
            $('#code-scene').css('display', 'none');
            $('#code-blocks-div').css('display', 'none');
            $('#code-scene-div').css('display', 'none');
            $('#push-code').css('display', 'none');
            $('#clear-code-btn').css('display', 'none');
            $('#upload-code-btn').css('display', 'none');
            $('#checkSpeed').css('display', 'none');
            $('#basic-speed-input').css('display', 'none');
            $('#rotation-speed-input').css('display', 'none');
            $('#basic-speed-label').css('display', 'none');
            $('#rotation-speed-label').css('display', 'none');
            $('#checkbox-label').css('display', 'none');
            //Sound divs

        }*/
    });
    previewGroupSelection();
    addSvgElementToScene();

    //On window resize, properly resize canvas areas
    window.onresize = function () {
        $('.shape').css('height', ($('.shape').width() / 2));
        $('#editor-scene').css('height', ($('#editor-scene').width() / 2));
        SceneHeight = $('#Scene').height();
        $('#selectable-shapes').css('height', SceneHeight);
        $('#selectable-textures').css('height', SceneHeight);
        $('#selectable-music').css('height', SceneHeight);
        editorBlockHeight = $('#editor-area').height();

        $('#saved-shape-container').css('height', (editorBlockHeight * 0.9));
        $('#saved-shape-canvas-container').css('height', (editorBlockHeight * 0.9));
        console.log($('#saved-shape-container').css('height').valueOf());

        rightWindowHeight = $('#left-window').height();
        $('#code-blocks-div').css('height', rightWindowHeight * 0.885);
        $('#code-scene-div').css('height', rightWindowHeight * 0.885);
    };

    //Drop down menu for selecting what to display (Shapes/Music/Textures)
    $('#select-dropdown-value li a').on('click', function () {
        console.log($(this).text());
        if ($(this).text() === "Shapes") {
            $('#selectable-music').css('display', 'none');
            $('#selectable-textures').css('display', 'none');
            $('#selectable-shapes').css('display', '');
            $('.shape').css('height', ($('.shape').width() / 2));
            if (windowHeight === $(document).height() && windowWidth === $(document).width()) {
                $('.shape').css('height', previewShapesHeight);
            }
            else {

            }

        }
        /*if ($(this).text() === "Music") {
            $('#selectable-textures').css('display', 'none');
            $('#selectable-shapes').css('display', 'none');
            $('#selectable-music').css('display', '');
        }*/
        if ($(this).text() === "Textures") {
            $('#selectable-music').css('display', 'none');
            $('#selectable-shapes').css('display', 'none');
            $('#selectable-textures').css('display', '');
        }
    });

    //Use light check box
    $('#use-light').on('click', function (e) {
        objEditorArr[0].lighting = !!$(this).prop("checked");
    });

    //Applying textures to shape in editor scene on click
    $(document).on('click', '.texture', function (e) {
        e.preventDefault();
        let texture_path = "";
        $(this).attr("alt").substr(3);
        if ($(this).attr("alt").includes("../"))
            texture_path = $(this).attr("alt").substr(3);
        else
            texture_path = $(this).attr("alt");
        applyTexture("../" + texture_path);
        lastSelectedTexture = "../" + texture_path;
    });

    //Add Shape to Editor
    $(document).on('click', '.shape', function (e) {
        e.preventDefault();
        editorObjectLoaded = false;
        nameOfPngFile = "";
        objectIsEditing = false;
        objEditorArr.pop();
        isTextureWillBeUsed = $('#color-picker').css('display') === 'none';
        isLightWillBeUsed = !!$('#use-light').prop("checked");
        currentlySelectedShape = $(this).attr("id");

        new LoadObject($(this).attr("id"), lastSelectedTexture, {
            "name": "forEditor",
            "jsonPath": $(this).attr("id"),
            "z": -4,
            "r": redChange,
            "g": greenChange,
            "b": blueChange,
            "xRot": xRotSlider,
            "yRot": yRotSlider,
            "zRot": zRotSlider,
            "yRotSpeed": 40,
            "lighting": isLightWillBeUsed,
            "animateRotation": true,
            "useTexture": isTextureWillBeUsed,
            "useCamera": true,
            "transparency": true,
            "alpha": opacitySlider.option("value"),
        }, "editor", webglEditorArr[0]);
    });

    $('#use-combine-ambient').on('click', function (e) {
        if ($(this).prop("checked")) {
            $('#ambient-light-full').css('display', 'none');
            $('#ambient-light-combined').css('display', '');
        }
        else {
            $('#ambient-light-combined').css('display', 'none');
            $('#ambient-light-full').css('display', '');
        }
    });

    $('#use-animation').on('click', function (e) {
        if ($(this).prop("checked")) {
            pointLightArrayE[0].alphaInc = 0.02;
        }
        else {
            pointLightArrayE[0].alphaInc = 0.0;
        }
    });

    //Save shape
    $('#saveShape').on('click', function (e) {
        isTextureWillBeUsed = $('#color-picker').css('display') === 'none';
        isLightWillBeUsed = !!$('#use-light').prop("checked");

        //if shape is edited saving image with existing name
        if (objectIsEditing) {
            console.log(nameOfPngFile);
            // if editing save
            saveCanvasImg(nameOfPngFile);

            // delete object from array with same key
            savedShapesArr.splice(getSavedShapeElementIndex("shapes/user_saved_shapes/" + nameOfPngFile), 1);
            waitUntilCanvasImgUploading();
        }
        else {
            saveCanvasImg();
            waitUntilCanvasImgUploading();
            console.log(savedShapesArr);
        }


    });

    /* Add shape to Scene */
    // START
    let objName;
    let objToAdd;
    //Add Shape to Scene on plus icon click
    $(document).on('click', '.overlay-btn-add', function (e) {
        e.preventDefault();
        objName = $(this).find('.add_shape').text();
        objToAdd = getSavedShapeByName(objName);
        //console.log(objToAdd);
        $('#add-name-modal').modal('show');
    });
    //On shape name submitting
    $('#add-shape-name').on('click', function (e) {
        e.preventDefault();
        let name = $(document).find('#usr-shape-name').val();

        if (name === "") {
            //empty name
            $('#add-shape-name-form').addClass('has-error');
            $('#error-explanation').html("Empty name is not allowed");
        }
        else if (findDuplicateName(name)) {
            //name already exist
            $('#add-shape-name-form').addClass('has-error');
            $('#error-explanation').html("Name already exist");
        }
        else {
            //everything alright
            //get type from obj url
            let tmp = objToAdd.shape.split("/");
            let type = tmp[tmp.length - 1].split(".")[0];
            new LoadObject(objToAdd.shape, objToAdd.texture, {
                "name": name,
                "savedShapeName": objName,
                "jsonPath": objToAdd.shape,
                "x": -10 + Math.random() * 15,//objToAdd.x,
                "y": -10 + Math.random() * 15,//objToAdd.y,
                "z": -10 + Math.random() * 15,//objToAdd.z,
                "r": objToAdd.r,
                "g": objToAdd.g,
                "b": objToAdd.b,
                "xRot": objToAdd.xRot,
                "yRot": objToAdd.yRot,
                "zRot": objToAdd.zRot,
                "yRotSpeed": objToAdd.yRotSpeed,
                "lighting": objToAdd.lighting,
                "animateRotation": objToAdd.animateRotation,
                "useTexture": objToAdd.useTexture,
                "transparency": objToAdd.transparency,
                "alpha": objToAdd.alpha,
                "type": type
            }, objToAdd.saveTo);

            $('#add-name-modal').modal('toggle');
            setTimeout(function () {
                saveData();
            }, 1000);
        }
    });
    //Detect key input (delete error signs in Modal window)
    $('#usr-shape-name').bind('input', function () {
        $('#add-shape-name-form').removeClass('has-error');
        $('#error-explanation').html("");
    });
    //On modal closing
    $('#add-name-modal').on('hidden.bs.modal', function () {
        $(document).find('#usr-shape-name').val('');
        $('#add-shape-name-form').removeClass('has-error');
        $('#error-explanation').html("");
        //console.log("Add shape name window closed");
    });
    // END

    //Edit shape
    let loadedR, loadedG, loadedB, loadedAlpha, loadedX, loadedY, loadedZ;
    //Load Shape to Editor
    $(document).on('click', '.overlay-btn-edit', function (e) {
        e.preventDefault();
        objectIsEditing = true;

        let objName = $(this).find('.edit_shape').text();
        let objToEdit = getSavedShapeByName(objName);
        nameOfPngFile = getPngFileName(objName); // get nameOfPngfile in save object

        editorObjectLoaded = false;
        objEditorArr.pop();

        $('#use-light').prop("checked", objToEdit.lighting);

        lastSelectedTexture = objToEdit.texture;
        currentlySelectedShape = objToEdit.shape;
        loadedR = objToEdit.r;
        loadedG = objToEdit.g;
        loadedB = objToEdit.b;
        loadedAlpha = objToEdit.alpha;
        loadedX = objToEdit.xRot;
        loadedY = objToEdit.yRot;
        loadedZ = objToEdit.zRot;

        new LoadObject(currentlySelectedShape, lastSelectedTexture, {
            "name": "forEditor",
            "savedShapeName": objName,
            "z": -4,
            "r": objToEdit.r,
            "g": objToEdit.g,
            "b": objToEdit.b,
            "xRot": loadedX,
            "yRot": loadedY,
            "zRot": loadedZ,
            "yRotSpeed": 40,
            "lighting": objToEdit.lighting,
            "animateRotation": objToEdit.animateRotation,
            "useTexture": objToEdit.useTexture,
            "useCamera": true,
            "transparency": objToEdit.transparency,
            "alpha": objToEdit.alpha,
            "type": objToEdit.type,
        }, "editor", webglEditorArr[0]);

        waitUntilEditorShapeLoading();
    });

    // Some sort of call back (waiting for editor shape loading)
    function waitUntilEditorShapeLoading() {
        if (editorObjectLoaded === false) {
            setTimeout(waitUntilEditorShapeLoading, 50);
            return;
        }
        console.log(editorObjectLoaded);
        console.log(objEditorArr);
        if (objEditorArr[0].useTexture) {
            $('#texture-radioBtn').click();
            //set opacity
            opacitySlider.setValue(loadedAlpha);
        }
        else {
            $('#color-radioBtn').click();
            red.setValue(loadedR, true, true);
            green.setValue(loadedG, true, true);
            blue.setValue(loadedB, true, true);
            //set opacity
            opacitySlider.setValue(loadedAlpha);
            //set xyz rotation
            xSlider.setValue(loadedX, true, true);
            ySlider.setValue(loadedY, true, true);
            zSlider.setValue(loadedZ, true, true);
        }
        saveData();
    }

    /* Sliders */
    // START
    opacitySlider = $('#opacity-slider').roundSlider({
        sliderType: "min-range",
        value: 1.0,
        max: 1.0,
        step: 0.025,
        radius: 90,
        startAngle: 315,
        circleShape: "pie",
        showTooltip: false,
        handleShape: "square",
        width: 12,
        handleSize: "+8"
    }).data("roundSlider");

    let RGBChange = function () {
        redChange = red.getValue();
        greenChange = green.getValue();
        blueChange = blue.getValue();
        redPChange = redP.getValue();
        greenPChange = greenP.getValue();
        bluePChange = blueP.getValue();
    };
    let RGBAmbientChange = function () {
        if ($('#use-combine-ambient').prop("checked")) {
            redAChange = combinedALight.getValue();
            greenAChange = combinedALight.getValue();
            blueAChange = combinedALight.getValue();
        }
        else {
            redAChange = redA.getValue();
            greenAChange = greenA.getValue();
            blueAChange = blueA.getValue();
        }
    };
    let rotateShape = function () {
        xRotSlider = xSlider.getValue();
        yRotSlider = ySlider.getValue();
        zRotSlider = zSlider.getValue();

        //console.log("x: " + xRotSlider + " y: " + yRotSlider + " z: " + zRotSlider);
        changeEditorShapeRotAngle();
    };

    let red = $('#R').slider().on('slide', RGBChange).data('slider');
    let green = $('#G').slider().on('slide', RGBChange).data('slider');
    let blue = $('#B').slider().on('slide', RGBChange).data('slider');

    let redA = $("#R-ambient").slider().on('slide', RGBAmbientChange).data('slider');
    let greenA = $("#G-ambient").slider().on('slide', RGBAmbientChange).data('slider');
    let blueA = $("#B-ambient").slider().on('slide', RGBAmbientChange).data('slider');

    let redP = $("#R-point").slider().on('slide', RGBChange).data('slider');
    let greenP = $("#G-point").slider().on('slide', RGBChange).data('slider');
    let blueP = $("#B-point").slider().on('slide', RGBChange).data('slider');

    let xSlider = $("#X-RotationSlider").slider().on('slide', rotateShape).data('slider');
    let ySlider = $("#Y-RotationSlider").slider().on('slide', rotateShape).data('slider');
    let zSlider = $("#Z-RotationSlider").slider().on('slide', rotateShape).data('slider');


    let combinedALight = $("#combined-light").slider().on('slide', RGBAmbientChange).data('slider');
    // END

    //Deleting on trash bin icon click
    $(document).on('click', '.overlay-btn-del', function (e) {
        e.preventDefault();
        let file_path = $(this).find('.delete_path').text();
        deleteFileFromServer(file_path);
        //
        console.log(objArr);

        deleteSavedImg(file_path);

        $('canvas').each(function () {
            //going through all canvases elements
            //to find saved png's from that object and delete them
            if (file_path.includes("shapes/user_shapes")) {
                let savedImgArr = [];
                for (let i = 0; i < savedShapesArr.length; i++) {
                    console.log("saved img: " + (savedShapesArr[i].value).shape + " ===  " + file_path);
                    if ((savedShapesArr[i].value).shape === file_path)
                        savedImgArr.push(savedShapesArr[i].link);
                }

                for (let i = 0; i < savedImgArr.length; i++) {
                    deleteSavedImg(savedImgArr[i]);
                    deleteFileFromServer(savedImgArr[i]);
                }
            }
        });
        $(this).parent().remove();
        saveData();
        updateAllForNameBlocks();
        getShapesNameInFolder("../shapes/user_shapes");
    });


    function deleteSavedImg(file_path) {
        //If deleted image is pointing to saved object so deleting this element from everything on delete
        $('img').each(function () {
            if ($(this).attr("alt") === file_path) {
                $(this).parent().parent().remove();
                //on saved shape image delete remove from live obj array and saved_shape array
                console.log("file_path: " + file_path);

                let dataLen = savedShapesArr.length;
                let i = 0;
                while (i < dataLen) {
                    if (savedShapesArr[i].link === file_path) {
                        savedShapesArr.splice(i, 1);
                        i = 0;
                        dataLen = savedShapesArr.length;
                    }
                    else {
                        i++;
                    }
                }
                i = 0;
                dataLen = objArr.length;
                while (i < dataLen) {
                    console.log(i + " < " + dataLen);
                    if (objArr[i].savedShapeName === file_path) {
                        objArr.splice(i, 1);
                        i = 0;
                        dataLen = objArr.length;
                    }
                    else {
                        i++;
                    }
                }
            }
            updateAbleToDeleteLiveShapesInSceneList();
        });
    }


    //Save WebGL scene
    $('#save-scene-btn').click(function () {
        saveScene();
    });

    //Reset WebGL scene
    $('#reset-scene-btn').click(function () {
        //clearing scene array
        objArr = [];
        //return camera
        x = 0;
        y = 0;
        z = 0;
        xRotation = 0;
        yRotation = 0;
        zRotation = 0;
        playFrames = false;
        fpsSum = 0;
        //load saved scene
        loadScene();

        console.log(sceneToLoadArr);
        //wait until loaded
        waitUntilSavedSceneDataLoads();
    });
    //Clear WebGL scene
    $('#clear-scene-btn').click(function () {
        objArr = [];
        saveData();
        updateAllForNameBlocks();
    });

    //Disable focus when selecting shape to delete
    $('#deletable-shape-selection').click(function () {
       $(this).blur();
    });


    //Deleting selected shape from scene
    $('#delete-shape-from-scene-btn').click(function () {
        let element = $('#deletable-shape-selection')[0];
        let shapeToDelete = element.options[element.selectedIndex].value;
        for (let i = 0; i < objArr.length; i++){
            if(objArr[i].name === shapeToDelete){
                objArr.splice(i, 1);
            }
        }
    });




    //Prevent jumping to page beginning
    $(document).on('click', 'img', function (e) {
        e.preventDefault();
    });
    //Prevent page scroll down on space key
    window.onkeydown = function (e) {
        if (e.keyCode === 32 && e.target === document.body) {
            e.preventDefault();
        }
    };


});




