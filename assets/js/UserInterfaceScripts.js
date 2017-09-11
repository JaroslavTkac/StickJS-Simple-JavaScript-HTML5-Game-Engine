/**
 * Created by jaroslavtkaciuk on 02/09/2017.
 */

let lastSelectedTexture = "assets/img/textures/sun.jpg";
let currentlySelectedShape = "shapes/cube.json";
let isTextureWillBeUsed;
let isLightWillBeUsed;


$(document).ready(function() {
    let windowWidth = $(window).width();
    let windowHeight = $(window).height();
    let editorHeight = $('#editor-scene').height();
    let previewShapesHeight = $('.shape').height();
    let SceneHeight =  $('#Scene').height();
    let editorBlockHeight = $('#editor-area').height();
    let objectIsEditing = false;
    let nameOfPngFile = "";

    $('#selectable-shapes').css('height', SceneHeight);
    $('#selectable-textures').css('height', SceneHeight);
    $('#selectable-music').css('height', SceneHeight);

    $('#code-area').css('display', 'none');
    $('#code-blocks-container').css('display', 'none');
    $('#code-scene').css('display', 'none');

    $('#saved-shape-container').css('height', (editorBlockHeight * 0.76));
    $('#saved-shape-canvas-container').css('height', (editorBlockHeight * 0.76));

    // Get user content and append page with got data
    //Textures
    loadUserData("assets/img/textures/user_textures", "image");
    //Music
    loadUserData("assets/music/user_music", "music");
    //Saved shapes
    loadUserData("shapes/user_saved_shapes", "savedShapes");


    //Might be error if loading user uploaded object -> need to wait until user objects loaded
    //Init on page reload saved shapes
    loadUserObjectFiles("savedShapes.txt", "shapes/user_shapes_data/");
    //Init on page reload objects that was loaded in scene
    loadUserObjectFiles("liveObjects.txt", "shapes/user_shapes_data/");


    //Texture & Color toggle
    $('#radioBtn a').on('click', function(){
        //console.log("click");
        let sel = $(this).data('title');
        let tog = $(this).data('toggle');
        $('#'+tog).prop('value', sel);

        $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive');
        $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive').addClass('active');
        //console.log(sel);
        if(sel === "Color"){
            objEditorArr[0].useTexture = false;
            for(let i in objPreviewArr){
                objPreviewArr[i].useTexture = false;
            }
            $('#color-picker').css('display', '');
            $('#texture-picker').css('display', 'none');

        }
        else{
            $('#texture-picker').css('display', '');
            $('#texture-picker').css('height', $('#color-picker').height());
            $('#color-picker').css('display', 'none');
            applyTexture(lastSelectedTexture);
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


        if($(this).text() === "Editor"){
            $('#code-area').css('display', 'none');
            $('#code-blocks-container').css('display', 'none');
            $('#code-scene').css('display', 'none');
            $('#saved-shape-container').css('display', '');
            $('#editor-container').css('display', '');

            if(windowHeight === $(document).height() && windowWidth === $(document).width()){
                $('#editor-scene').css('height', editorHeight);
            }
            else{
                $('#editor-scene').css('height', ($('#editor-scene').width() / 2));
            }

            console.log(editorBlockHeight);
        }
        if($(this).text() === "Logic"){
            //let currEditorHeight = $('#editor-area').height();

            $('#saved-shape-container').css('display', 'none');
            $('#editor-container').css('display', 'none');
            $('#code-area').css('display', '');
            $('#code-blocks-container').css('display', '');
            $('#code-scene').css('display', '');

            // $('#code-area').css('height', editorHeight);


        }

        if($(this).text() === "Sound"){
            $('#saved-shape-container').css('display', 'none');
            $('#editor-container').css('display', 'none');
            $('#code-area').css('display', 'none');
            $('#code-blocks-container').css('display', 'none');
            $('#code-scene').css('display', 'none');
            //Sound divs

        }
    });

    //On window resize, properly resize canvas areas
    window.onresize = function(){
        $('.shape').css('height', ($('.shape').width() / 2));
        $('#editor-scene').css('height', ($('#editor-scene').width() / 2));
        SceneHeight =  $('#Scene').height();
        $('#selectable-shapes').css('height', SceneHeight);
        $('#selectable-textures').css('height', SceneHeight);
        $('#selectable-music').css('height', SceneHeight);
        editorBlockHeight = $('#editor-area').height();

        $('#saved-shape-container').css('height', (editorBlockHeight * 0.9));
        $('#saved-shape-canvas-container').css('height', (editorBlockHeight * 0.9));
        console.log($('#saved-shape-container').css('height').valueOf());
    };

    //Drop down menu for selecting what to display (Shapes/Music/Textures)
    $('#select-dropdown-value li a').on('click', function(){
        console.log($(this).text());
        if($(this).text() === "Shapes"){
            $('#selectable-music').css('display', 'none');
            $('#selectable-textures').css('display', 'none');
            $('#selectable-shapes').css('display', '');
            $('.shape').css('height', ($('.shape').width() / 2));
            if(windowHeight === $(document).height() && windowWidth === $(document).width()){
                $('.shape').css('height', previewShapesHeight);
            }
            else{

            }

        }
        if($(this).text() === "Music"){
            $('#selectable-textures').css('display', 'none');
            $('#selectable-shapes').css('display', 'none');
            $('#selectable-music').css('display', '');
        }
        if($(this).text() === "Textures"){
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
    $(document).on('click', '.texture', function(e) {
        e.preventDefault();
        applyTexture($(this).attr("alt"));
        lastSelectedTexture = $(this).attr("alt");
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
            "yRot": 50,
            "yRotSpeed": 275,
            "lighting": isLightWillBeUsed,
            "animateRotation": true,
            "useTexture": isTextureWillBeUsed,
            "useCamera": true,
            "transparency": true,
            "alpha": opacitySlider.option("value")
        }, "editor", webglEditorArr[0]);
    });

    $('#use-combine-ambient').on('click', function (e) {
        if($(this).prop("checked")){
            $('#ambient-light-full').css('display', 'none');
            $('#ambient-light-combined').css('display', '');
        }
        else{
            $('#ambient-light-combined').css('display', 'none');
            $('#ambient-light-full').css('display', '');
        }
    });

    $('#use-animation').on('click', function (e) {
        if($(this).prop("checked")){
            pointLightArrayE[0].alphaInc = 0.02;
        }
        else{
            pointLightArrayE[0].alphaInc = 0.0;
        }
    });

    // TODO ON SAVED SHAPE DELETE DELETE ALL OBJECTS THAT WAS CREATED FROM THAT SHAPE

    //Save shape
    $('#saveShape').on('click', function (e) {
        isTextureWillBeUsed = $('#color-picker').css('display') === 'none';
        isLightWillBeUsed = !!$('#use-light').prop("checked");

        //if shape is edited saving image with existing name
        if(objectIsEditing){
            console.log(nameOfPngFile);
            // if editing save
            saveCanvasImg(nameOfPngFile);

            //console.log(savedShapesArr);
            //console.log("Modified object index in array: " + getSavedShapeElementIndex("shapes/user_saved_shapes/" + nameOfPngFile));
            // delete object from array with same key
            savedShapesArr.splice(getSavedShapeElementIndex("shapes/user_saved_shapes/" + nameOfPngFile), 1);

            waitUntilCanvasImgUploading();
            //console.log(savedShapesArr);
        }
        else{
            saveCanvasImg();
            waitUntilCanvasImgUploading();
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

        if(name === ""){
            //empty name
            $('#add-shape-name-form').addClass('has-error');
            $('#error-explanation').html("Empty name is not allowed");
        }
        else if(findDuplicateName(name)){
            //name already exist
            $('#add-shape-name-form').addClass('has-error');
            $('#error-explanation').html("Name already exist");
        }
        else{
            //everything alright
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
                "yRot": objToAdd.yRot,
                "yRotSpeed": objToAdd.yRotSpeed,
                "lighting": objToAdd.lighting,
                "animateRotation": objToAdd.animateRotation,
                "useTexture": objToAdd.useTexture,
                "transparency": objToAdd.transparency,
                "alpha": objToAdd.alpha
            }, objToAdd.saveTo);

            $('#add-name-modal').modal('toggle');
        }
    });
    //Detect key input (delete error signs in Modal window)
    $('#usr-shape-name').bind('input', function() {
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
    let loadedR, loadedG, loadedB, loadedAlpha;
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

        new LoadObject(currentlySelectedShape, lastSelectedTexture, {
            "name": "forEditor",
            "savedShapeName": objName,
            "z": -4,
            "r": objToEdit.r,
            "g": objToEdit.g,
            "b": objToEdit.b,
            "yRot": 50,
            "yRotSpeed": 275,
            "lighting": objToEdit.lighting,
            "animateRotation": objToEdit.animateRotation,
            "useTexture": objToEdit.useTexture,
            "useCamera": true,
            "transparency": objToEdit.transparency,
            "alpha": objToEdit.alpha
        }, "editor", webglEditorArr[0]);

        waitUntilEditorShapeLoading();
    });
    // Some sort of call back (waiting for editor shape loading)
    function waitUntilEditorShapeLoading(){
        if (editorObjectLoaded === false){
            setTimeout(waitUntilEditorShapeLoading, 50);
            return;
        }
        //console.log(editorObjectLoaded);
        if(objEditorArr[0].useTexture){
            $('#texture-radioBtn').click();
            //set opacity
            opacitySlider.setValue(loadedAlpha);
        }
        else{
            $('#color-radioBtn').click();
            red.setValue(loadedR, true, true);
            green.setValue(loadedG, true, true);
            blue.setValue(loadedB, true, true);
            //set opacity
            opacitySlider.setValue(loadedAlpha);

        }
    }

    /* Sliders */
    // START
    opacitySlider = $('#opacity-slider').roundSlider({
        sliderType: "min-range",
        value: 1.0,
        max: 1.0,
        step: 0.025,
        radius: 90,
        circleShape: "quarter-top-left",
        showTooltip: false,
        handleShape: "square",
        width: 12,
        handleSize: "+8"
    }).data("roundSlider");

    let RGBChange = function() {
        redChange = red.getValue();
        greenChange = green.getValue();
        blueChange = blue.getValue();
        redPChange = redP.getValue();
        greenPChange = greenP.getValue();
        bluePChange = blueP.getValue();
    };
    let RGBAmbientChange = function () {
        if($('#use-combine-ambient').prop("checked")){
            redAChange = combinedALight.getValue();
            greenAChange = combinedALight.getValue();
            blueAChange = combinedALight.getValue();
        }
        else{
            redAChange = redA.getValue();
            greenAChange = greenA.getValue();
            blueAChange = blueA.getValue();
        }
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

    let combinedALight = $("#combined-light").slider().on('slide', RGBAmbientChange).data('slider');
    // END

    //Deleting from html document now unavailable/deleted shapes music or textures
    $(document).on('click', '.overlay-btn-del', function(e) {
        e.preventDefault();
        let file_path = $(this).find('.delete_path').text();
        deleteFileFromServer(file_path);

        $(this).parent().remove();
        $('img').each(function(){
            if($(this).attr("alt") === file_path){
                $(this).parent().parent().remove();
            }
        });
    });
    //Prevent jumping to page beginning
    $(document).on('click', 'img', function(e) {
        e.preventDefault();
    });
    //Prevent page scroll down on space key
    window.onkeydown = function(e) {
        if (e.keyCode === 32 && e.target === document.body) {
            e.preventDefault();
        }
    };


});




