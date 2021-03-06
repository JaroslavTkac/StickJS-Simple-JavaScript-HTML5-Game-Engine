<?php

//A list of permitted file extensions
$allowed = array('png', 'jpg', 'obj'/*, 'mp3'*/);

if (isset($_FILES['upl']) && $_FILES['upl']['error'] == 0) {

    $extension = pathinfo($_FILES['upl']['name'], PATHINFO_EXTENSION);
    $path_parts = pathinfo($_FILES['upl']['name']);

    if (!in_array(strtolower($extension), $allowed)) {
        echo json_encode(array('status' => "error"));
        exit;
    }

    $file_name = $path_parts['filename'] . '_' . time() . "_" . $_POST['userId'] . "_" . $_POST['projectId'] . "." . $path_parts['extension'];
    if (move_uploaded_file($_FILES['upl']['tmp_name'], '../uploads/' . $file_name)) {
        echo json_encode(array('extension' => $extension, 'name' => $file_name));
        exit;
    }

    echo $extension . "  " . $path_parts . "  " . $file_name;
}

//Call of image resize
if (isset($_POST['callResizeImage'])) {
    $img = resizeImage($_POST['callResizeImage'][0], $_POST['callResizeImage'][1]/*, $_POST['callResizeImage'][2]*/);
    imagejpeg($img, $_POST['callResizeImage'][0]);
    echo "Image is resized";
}

function resizeImage($file, $extension)
{
    list($width, $height) = getimagesize($file);

    $r = $width / $height;
    $ratioTest = $width - $height;

    //by default 128x128
    $w = 128;
    $h = 128;
    //if file w and h <= 256
    if ($width >= 256 && $height >= 256) {
        $w = 256;
        $h = 256;
    }

    if ($ratioTest != 0) {
        //Then image not 128x128 or etc.
        //Croping image
        if ($width > $height) {
            $width = ceil($width - ($width * abs($r - $w / $h)));
        } else {
            $height = ceil($height - ($height * abs($r - $w / $h)));
        }
        $newWidth = $w;
        $newHeight = $h;
    } else {
        if ($w / $h > $r) {
            $newWidth = $h * $r;
            $newHeight = $h;
        } else {
            $newHeight = $w / $r;
            $newWidth = $w;
        }
    }
    //check png or jpg and select correct one
    if ($extension == "jpg")
        $src = imagecreatefromjpeg($file);
    else
        $src = imagecreatefrompng($file);
    $dst = imagecreatetruecolor($newWidth, $newHeight);
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

    return $dst;
}

//Delete file from server
if (isset($_POST['callDeleteFile'])) {
    echo deleteFile($_POST['callDeleteFile']);
}

//Delete file from server
function deleteFile($file_path)
{
    $allowed = array('png', 'jpg', 'obj', 'mp3', 'json');
    $file = $file_path;
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    if(strpos($file, "scripts/user_converted_code/")){
        if (!unlink($file)) {
            return "Error deleting file: $file";
        }
        else{
            return "Deleted file: $file";
        }
    }
    if (!in_array(strtolower($ext), $allowed)) {
        return "Error, cannot delete file: " . $file;
    }
    if (!unlink($file)) {
        return "Error deleting file: $file";
    }
    else {
        return "Deleted file: $file";
    }

}


//Uploading object after converting to server
if (isset($_POST['callCreateFile'])) {
    echo createFile($_POST['callCreateFile'][0], $_POST['callCreateFile'][1]);
}

//Create json file on server from string
function createFile($data, $name)
{
    $fname = "../shapes/user_shapes/" . $name . ".json";

    $file = fopen($fname, 'w');
    fwrite($file, $data);
    fclose($file);

    return json_encode(array('name' => substr($fname, 3)));
}

//Move file from uploader to needed folder
if (isset($_POST['callMoveFile'])) {
    echo moveFile($_POST['callMoveFile'][0], $_POST['callMoveFile'][1]);
}

//Move file from uploader to needed folder
function moveFile($old_file_path, $new_file_path)
{
    rename($old_file_path, $new_file_path);
    return "File moved";
}

//Calling load user data (textures/music/json) function
if (isset($_POST['callLoadUserData'])) {
    echo loadUserData($_POST['callLoadUserData'], $_POST['userId'], $_POST['projectId']);
}

if (isset($_POST['texturePaths'][0])) {
    echo loadAllTextures($_POST['texturePaths'][0], $_POST['texturePaths'][1], $_POST['userId'], $_POST['projectId']);
}

//Load user data (textures/music/json)
function loadUserData($dir, $userId, $projectId)
{
    $folderContent = array();
    // Open a directory, and read its contents
    if (is_dir($dir)) {
        if ($dh = opendir($dir)) {
            while (($file = readdir($dh)) !== false) {
                if (isFileOwner($file, $userId, $projectId)) {
                    array_push($folderContent, $file);
                }
            }
            closedir($dh);
        }
    }
    //return $dir;
    return json_encode(array('data' => $folderContent/*, 'userId' => $userId, 'prId' => $projectId*/));
}

//Check file owner
function isFileOwner($file, $userId, $projectId)
{
    $explode = explode("_", $file);

    $fileUserId = $explode[sizeof($explode) - 2];
    $fileProjectId = explode(".", $explode[sizeof($explode) - 1])[0];

    if ($fileUserId == $userId && $fileProjectId == $projectId) {
        return true;
    }
    return false;
}

//Load user data (textures/music/json)
function loadAllTextures($dir1, $dir2, $userId, $projectId)
{
    $folderContent = array();
    // Open a directory, and read its contents
    if (is_dir($dir1)) {
        if ($dh = opendir($dir1)) {
            while (($file = readdir($dh)) !== false) {
                if (isFileOwner($file, $userId, $projectId)) {
                    array_push($folderContent, "assets/img/textures/" . $file);
                }
            }
            closedir($dh);
        }
    }
    if (is_dir($dir2)) {
        if ($dh = opendir($dir2)) {
            while (($file = readdir($dh)) !== false) {
                if (isFileOwner($file, $userId, $projectId)) {
                    array_push($folderContent, "assets/img/textures/user_textures/" . $file);
                }
            }
            closedir($dh);
        }
    }
    return json_encode(array('data' => $folderContent/*, 'userId' => $userId, 'prId' => $projectId*/));
}


//Saving JPG file in server
if (isset($_POST['imgBase64'])) {
    $img = $_POST['imgBase64'];
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $fileData = base64_decode($img);


    if ($_POST['imgName'] != null) {
        $fileName = "../shapes/user_saved_shapes/" . $_POST['imgName'];
    } else {
        $fileName = "../shapes/user_saved_shapes/" . time() . "_" . $_POST['userId'] . "_" . $_POST['projectId'] . ".png";
    }


    file_put_contents($fileName, $fileData);

    echo json_encode(array('name' => $fileName, 'passImgName' => $_POST['imgName']));
}

if (isset($_POST['callGetObjectFiles'])) {
    echo getFiles($_POST['callGetObjectFiles'][0], $_POST['callGetObjectFiles'][1]);
}

//Get data from files
function getFiles($file, $dir)
{
    $fileData = file_get_contents($dir . $file);

    if (strlen($fileData) == 0)
        $status = "error";
    else
        $status = "OK";

    return json_encode(array('data' => $fileData, 'status' => $status));
}

//On project delete cleaning all saved user files
if (isset($_POST['userId']) && isset($_POST['cleanFolders']) && isset($_POST['projectId'])) {
    $userId = $_POST['userId'];
    $projectId = $_POST['projectId'];
    $folderContentToDelete = array();

    //preparing textures paths for deleting
    $rawData = getFilesInFolder("../assets/img/textures/user_textures/", $userId, $projectId);
    foreach ($rawData as $item) {
        array_push($folderContentToDelete, $item);
    }

    //preparing json's paths for deleting
    $rawData = getFilesInFolder("../shapes/user_shapes/", $userId, $projectId);
    foreach ($rawData as $item) {
        array_push($folderContentToDelete, $item);
    }

    //preparing savedShapes paths for deleting
    $rawData = getFilesInFolder("../shapes/user_saved_shapes/", $userId, $projectId);
    foreach ($rawData as $item) {
        array_push($folderContentToDelete, $item);
    }

    //preparing music paths for deleting
    $rawData = getFilesInFolder("../assets/music/user_music/", $userId, $projectId);
    foreach ($rawData as $item) {
        array_push($folderContentToDelete, $item);
    }

    //preparing user saved converted code scripts for deleting
    $rawData = getFilesInFolder("../scripts/user_converted_code/", $userId, $projectId);
    foreach ($rawData as $item) {
        array_push($folderContentToDelete, $item);
    }


    $infoArr = array();
    foreach ($folderContentToDelete as $item) {
        array_push($infoArr, deleteFile($item));
    }

    echo json_encode(array('data' => $folderContentToDelete, 'info' => $infoArr));
}


function getFilesInFolder($dir, $userId, $projectId)
{
    $folder = array();
    if (is_dir($dir)) {
        if ($dh = opendir($dir)) {
            while (($file = readdir($dh)) !== false) {
                if (isFileOwner($file, $userId, $projectId)) {
                    array_push($folder, $dir . $file);
                }
            }
            closedir($dh);
        }
    }
    return $folder;
}