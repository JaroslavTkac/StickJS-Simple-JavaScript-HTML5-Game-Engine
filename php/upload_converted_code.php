<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 08/03/2018
 * Time: 20:40
 */

// Include connection file
require_once 'connection.php';

$new_js_file_path = "";

if(isset($_POST['projectId']) && isset($_POST['codeToUpload']) && ($_POST['projectType'] === "general")){
    $sql = "SELECT new_js_file_path 
                  FROM users_converted_code 
                  WHERE project_id = " . $_POST['projectId'] . " 
                  ORDER BY created_at DESC
                  LIMIT 1";
    $result = $mysqli->query($sql);

    if ($result->num_rows == 1) {
        // output data of each row
        if($row = $result->fetch_assoc()) {
            $new_js_file_path = $row['new_js_file_path'];
        }
        else{
            echo "Oops! Something went wrong on getting old js file path.";
            exit;
        }
    }

    $sql = "UPDATE users_converted_code SET code = ?, new_js_file_path = ?, old_js_file_path = ? WHERE project_id = ?";

    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("ssss", $param_code, $param_new_js_file_path, $param_old_js_file_path, $param_project_id);
        //Setting parameters
        $param_code = $_POST['codeToUpload'];
        $param_old_js_file_path = $new_js_file_path;
        $param_new_js_file_path = "../scripts/user_converted_code/UserConvertedCode_" . mktime()
            . "_" . $_POST['userId'] . "_" . $_POST['projectId'] . ".js";
        $param_project_id = $_POST['projectId'];

        //Executing SQL
        if($stmt->execute()){
            echo "Users Converted Code Table updated";
        }
        else {
            echo "Oops! Something went wrong. Please try again later.";
        }

    }
    $stmt->close();
}
else{
    echo "Something went wrong on upload users converted code... ERROR: pr id " . $_POST['projectId'];
}
$mysqli->close();

?>