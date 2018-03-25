<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 16/03/2018
 * Time: 12:24
 */

require 'connection.php';
include_once ('upload.php');


//Creating new project


if (isset($_POST['userId']) && isset($_POST['projectId'])) {

    $sql = "SELECT name, info 
            FROM users_projects
            WHERE id = " . $_POST['projectId'] . " 
            AND user_id = " . $_POST['userId'];

    $result = $mysqli->query($sql);

    if ($result->num_rows == 1) {
        // output data of each row
        if ($row = $result->fetch_assoc()) {
            $project_name = $row['name'];
            $project_info = $row['info'];
            echo json_encode(array('name' => $row['name'],
                'about' => $row['info'], 'created' => substr($row['created_at'], 0, 10)));

            $sql = "INSERT INTO users_projects (name, info, user_id, project_type) 
                    VALUES (?, ?, ?, ?)";

            if ($stmt = $mysqli->prepare($sql)) {
                $stmt->bind_param("ssss", $param_project_name, $param_about_project, $param_user_id, $param_project_type);
                //Setting parameters
                $param_project_name = $project_name;
                $param_about_project = $project_info;
                $param_user_id = $_POST['userId'];
                $param_project_type = "publish";

                //Executing SQL
                if ($stmt->execute()) {
                    $sql = "SELECT id, name, info, created_at 
                            FROM users_projects 
                            WHERE user_id = " . $param_user_id . " 
                            ORDER BY created_at DESC
                            LIMIT 1";
                    $result = $mysqli->query($sql);

                    if ($result->num_rows == 1) {
                        // output data of each row
                        if ($row = $result->fetch_assoc()) {
                            $project_id = $row['id'];
                            echo json_encode(array('project_id' => $row['id'], 'name' => $row['name'],
                                'about' => $row['info'], 'created' => substr($row['created_at'], 0, 10)));
                        } else {
                            echo "Oops! Something went wrong. Please try again later.";
                        }
                    }
                    //prepare child tables
                    //Creating and copying all data to new tables
                    echo "\n";

                    $filesPathsToChange = copyAllUsersUploadedProjectFiles($_POST['userId'], $_POST['projectId'], $project_id);

                    createDataInUserTableWithCopiedJSONData("users_live_objects", $mysqli, $_POST['projectId'], $project_id, $filesPathsToChange);
                    createDataInUserTableWithCopiedJSONData("users_saved_shapes", $mysqli, $_POST['projectId'], $project_id, $filesPathsToChange);
                    createDataInUserTableWithCopiedJSONData("users_saved_scene", $mysqli, $_POST['projectId'], $project_id, $filesPathsToChange);
                    createDataInUserTableWithCopiedJSONData("users_saved_svg_scene", $mysqli, $_POST['projectId'], $project_id, $filesPathsToChange);

                    createUserDataInProjectMovementConfigTable($mysqli, $_POST['projectId'], $project_id);
                    createUserDataInConvertedCodeTable($mysqli, $_POST['projectId'], $project_id, $param_user_id);


                    //Add data to published projects data
                    $sql = "INSERT INTO users_published_projects (published_project_id, original_project_id) 
                            VALUES (" . $project_id . "," . $_POST['projectId'] . ")";
                    $result = $mysqli->query($sql);

                }

            }
            $stmt->close();
        } else {
            echo "Oops! Something went wrong. Please try again later.";
        }
    }
}

//On project publishing duplicating uploaded user files, for independent from original project storage on server
function copyAllUsersUploadedProjectFiles($userId, $oldProjectId, $newProjectId)
{
    $userFiles = getAllUsersUploadedProjectFiles($userId, $oldProjectId, $newProjectId);

    $mappedArr = array();

    for ($i = 0; $i < sizeof($userFiles['originalFiles']); $i++){
        if (!copy($userFiles['originalFiles'][$i], $userFiles['newFiles'][$i])) {
            echo "failed to copy " . $userFiles['originalFiles'][$i] . " ...\n";
        }
        array_push($mappedArr, array($userFiles['originalFiles'][$i] => $userFiles['newFiles'][$i]));
    }
    return $mappedArr;
}

function getAllUsersUploadedProjectFiles($userId, $oldProjectId, $newProjectId)
{
    echo "UserId: " . $userId ."\nOldProjectId: " . $oldProjectId . "\nNewProjectId: " . $newProjectId . "\n";

    $folderContent = array();

    //Getting user textures
    $rawData = getFilesInFolder("../assets/img/textures/user_textures/", $userId, $oldProjectId);
    foreach ($rawData as $item) {
        array_push($folderContent, $item);
    }

    //Getting json's paths
    $rawData = getFilesInFolder("../shapes/user_shapes/", $userId, $oldProjectId);
    foreach ($rawData as $item) {
        array_push($folderContent, $item);
    }

    //Getting savedShapes paths
    $rawData = getFilesInFolder("../shapes/user_saved_shapes/", $userId, $oldProjectId);
    foreach ($rawData as $item) {
        array_push($folderContent, $item);
    }

    $newFiles = array();

    foreach ($folderContent as $item) {
        $newFileName = "";
        $explode = explode("_", $item);
        for ($i = 0; $i < sizeof($explode) - 1; $i++){
            $newFileName .= $explode[$i] . "_";
        }
        $fileExtension = explode(".", $explode[sizeof($explode) - 1]);
        $newFileName .=  $newProjectId . "." . $fileExtension[1];
        array_push($newFiles, $newFileName);
        //echo $newFileName . "\n";
    }
    return array('originalFiles' => $folderContent, 'newFiles' => $newFiles);
}

function createDataInUserTableWithCopiedJSONData($tableName, $mysqli, $projectIdCopyFrom, $projectIdToAdd, $pathToChange)
{
    $sql = "SELECT json_data 
            FROM " . $tableName . " 
            WHERE project_id = " . $projectIdCopyFrom . " 
            ORDER BY created_at DESC
            LIMIT 1";
    $result = $mysqli->query($sql);

    if ($result->num_rows == 1) {
        // output data of each row
        if ($row = $result->fetch_assoc()) {
            $json_data = $row['json_data'];

            //Modifying json_data
            //Replacing original paths with new ones, specially created for published project
            foreach ($pathToChange as $inner){
                foreach ($inner as $key => $value) {
                    //echo "Key: $key  Value: $value\n";
                    $json_data = str_replace($key,$value,$json_data);
                }
            }

            $sql = "INSERT INTO " . $tableName . " (project_id, json_data) VALUES (" . $projectIdToAdd . "," . json_encode($json_data) . ")";
            $mysqli->query($sql);
        } else {
            echo $sql;
            echo "\nError ADDING data in " . $tableName . "\n";
        }
    } else {
        echo $sql;
        echo "\nError SELECTING data in " . $tableName . "\n";
    }
}


function createUserDataInProjectMovementConfigTable($mysqli, $projectIdCopyFrom, $projectIdToAdd)
{
    $sql = "SELECT standard_movement, speed, rotation_speed 
            FROM users_projects_movement_config
            WHERE project_id = " . $projectIdCopyFrom . " 
            ORDER BY created_at DESC
            LIMIT 1";
    $result = $mysqli->query($sql);

    if ($result->num_rows == 1) {
        // output data of each row
        if ($row = $result->fetch_assoc()) {

            $sql = "INSERT INTO users_projects_movement_config 
                    (project_id, standard_movement, speed, rotation_speed) 
                    VALUES (" . $projectIdToAdd . "," . $row['standard_movement'] . ","
                . $row['speed'] . "," . $row['rotation_speed'] . ")";
            $mysqli->query($sql);
        } else {
            echo $sql;
            echo "\nError ADDING data in users_projects_movement_config \n";
        }
    } else {
        echo $sql;
        echo "\nError SELECTING data in users_projects_movement_config \n";
    }
}


function createUserDataInConvertedCodeTable($mysqli, $projectIdCopyFrom, $projectIdToAdd, $userId)
{
    $sql = "SELECT new_js_file_path, code
            FROM users_converted_code
            WHERE project_id = " . $projectIdCopyFrom . " 
            ORDER BY created_at DESC
            LIMIT 1";
    $result = $mysqli->query($sql);

    if ($result->num_rows == 1) {
        // output data of each row
        if ($row = $result->fetch_assoc()) {
            $file = $row['new_js_file_path'];
            $code = $row['code'];

            echo "file: " . $file . "\n";

            $newFile = copyUsersConvertedCodeFile($file, $userId, $projectIdToAdd);
            echo "newFile: " . $newFile . "\n";


            $sql = "INSERT INTO users_converted_code 
                    (project_id, old_js_file_path, new_js_file_path, code) 
                    VALUES (" . $projectIdToAdd . ",\"" . $newFile . "\",\""
                . $newFile . "\",\"" . $code . "\")";
            $mysqli->query($sql);
        } else {
            echo $sql;
            echo "\nError ADDING data in users_converted_code \n";
        }
    } else {
        echo $sql;
        echo "\nError SELECTING data in users_converted_code \n";
    }
}


function copyUsersConvertedCodeFile($file, $userId, $projectId)
{
    $newFileForCopy = $file . "_copy";
    if (!copy($file, $newFileForCopy)) {
        echo "failed to copy $file \n";
    } else {
        $newFile = "../scripts/user_converted_code/UserConvertedCode_" . mktime()
            . "_" . $userId . "_" . $projectId . ".js";
        rename($newFileForCopy, $newFile);
        return $newFile;
    }
    return "";
}







