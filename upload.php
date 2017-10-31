<?php

//A list of permitted file extensions
$allowed = array('png', 'jpg', 'obj', 'mp3');

if(isset($_FILES['upl']) && $_FILES['upl']['error'] == 0){

	$extension = pathinfo($_FILES['upl']['name'], PATHINFO_EXTENSION);
    $path_parts = pathinfo($_FILES['upl']['name']);

	if(!in_array(strtolower($extension), $allowed)){
		echo json_encode( array( 'status' => "error") );
		exit;
	}

    $file_name = $path_parts['filename'].'_'.time().'.'.$path_parts['extension'];
	if(move_uploaded_file($_FILES['upl']['tmp_name'], 'uploads/' . $file_name)){
        echo json_encode( array( 'extension' => $extension, 'name' => $file_name) );
		exit;
	}

	echo $extension . "  " . $path_parts . "  " . $file_name;
}

//Call of image resize
if (isset($_POST['callResizeImage'])) {
    $img = resizeImage($_POST['callResizeImage'][0], $_POST['callResizeImage'][1], $_POST['callResizeImage'][2], TRUE);
    imagejpeg($img, "uploads/" . $_POST['callResizeImage'][0] . '_' .time() . ".jpg");
    echo "image resized";
}

//Image resize to 128x128 to do not break css

//TODO IMG resize to squere

function resizeImage($file, $w, $h, $crop=TRUE) {
    list($width, $height) = getimagesize($file);
    $r = $width / $height;
    if ($crop) {
        if ($width > $height) {
            $width = ceil($width-($width*abs($r-$w/$h)));
        } else {
            $height = ceil($height-($height*abs($r-$w/$h)));
        }
        $newwidth = $w;
        $newheight = $h;
    } else {
        if ($w/$h > $r) {
            $newwidth = $h*$r;
            $newheight = $h;
        } else {
            $newheight = $w/$r;
            $newwidth = $w;
        }
    }
    $src = imagecreatefromjpeg($file);
    $dst = imagecreatetruecolor($newwidth, $newheight);
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

    return $dst;
}

//Delete file from server
if (isset($_POST['callDeleteFile'])) {
    echo deleteFile($_POST['callDeleteFile']);
}

//Delete file from server
function deleteFile($file_path) {
    $file = $file_path;
    if (!unlink($file))
        return "Error deleting file: $file";
    else
        return "Deleted file: $file";
}

//Uploading object after converting to server
if (isset($_POST['callCreateFile'])) {
    echo createFile($_POST['callCreateFile'][0], $_POST['callCreateFile'][1]);
}

//Create file on server from string
function createFile($data, $name){
    $fname = "shapes/user_shapes/" . $name . ".json";

    $file = fopen($fname, 'w');
    fwrite($file, $data);
    fclose($file);

    return json_encode( array('name' => $fname) );
}

//Move file from uploader to needed folder
if (isset($_POST['callMoveFile'])){
    echo moveFile($_POST['callMoveFile'][0], $_POST['callMoveFile'][1]);
}

//Move file from uploader to needed folder
function moveFile($old_file_path, $new_file_path){
    rename($old_file_path, $new_file_path);
    return "File moved";
}

//Calling load user data (textures/music/json) function
if (isset($_POST['callLoadUserData'])){
    echo loadUserData($_POST['callLoadUserData']);
}
//Load user data (textures/music/json)
function loadUserData($dir){
    $folderContent = array();
    // Open a directory, and read its contents
    if (is_dir($dir)){
        if ($dh = opendir($dir)){
            while (($file = readdir($dh)) !== false){
                //echo "filename:" . $file . "<br>";
                array_push($folderContent, $file);
            }
            closedir($dh);
        }
    }
    return json_encode( array('data' => $folderContent) );
}

//Saving JPG file in server
if (isset($_POST['imgBase64'])){
    $img = $_POST['imgBase64'];
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $fileData = base64_decode($img);


    if($_POST['imgName'] != null) {
        $fileName = "shapes/user_saved_shapes/" . $_POST['imgName'];
    }
    else {
        $fileName = "shapes/user_saved_shapes/" . time() . ".png";
    }


    file_put_contents($fileName, $fileData);

    echo json_encode( array('name' => $fileName, 'passImgName' => $_POST['imgName']) );
}
//Saving user data about all objects and shapes
if (isset($_POST['savedShape'])){
    $savedShapeData = $_POST['savedShape'];
    $objectData = $_POST['objectData'];

    file_put_contents("shapes/user_shapes_data/savedShapes.txt", $savedShapeData);
    file_put_contents("shapes/user_shapes_data/liveObjects.txt", $objectData);

    echo json_encode( array('savedData' => $savedShapeData, 'objectData' => $objectData) );
}

if (isset($_POST['callGetObjectFiles'])){
    echo getFiles($_POST['callGetObjectFiles'][0], $_POST['callGetObjectFiles'][1]);
}
//Get data from files
function getFiles($file, $dir){
    $fileData = file_get_contents($dir . $file);

    if (strlen($fileData) == 0)
        $status = "error";
    else
        $status = "OK";

    return json_encode( array('data' => $fileData, 'status' => $status) );
}