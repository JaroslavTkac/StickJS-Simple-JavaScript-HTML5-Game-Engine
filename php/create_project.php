<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 23/02/2018
 * Time: 12:34
 */

// Include connection file
require_once 'connection.php';

// Initialize the session


if(isset($_POST['userId']) && isset($_POST['projectName'])){
    $sql = "INSERT INTO users_projects (name, info, user_id, project_type) VALUES (?, ?, ?, ?)";

    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("ssss", $param_project_name, $param_about_project, $param_user_id, $param_project_type);
        //Setting parameters
        $param_project_name = $_POST['projectName'];
        $param_about_project = $_POST['about'];
        $param_user_id = $_POST['userId'];
        $param_project_type = "general";

        //Executing SQL
        if($stmt->execute()){
            $sql = "SELECT id, name, info, created_at 
                    FROM users_projects 
                    WHERE user_id = " . $param_user_id . " 
                    ORDER BY created_at DESC
                    LIMIT 1";
            $result = $mysqli->query($sql);

            if ($result->num_rows == 1) {
                // output data of each row
                if($row = $result->fetch_assoc()) {
                    $project_id = $row['id'];
                    echo json_encode(array('project_id' => $row['id'], 'name' => $row['name'],
                        'about' => $row['info'], 'created' => substr($row['created_at'], 0, 10)));
                }
                else{
                    echo "Oops! Something went wrong. Please try again later.";
                }
            }
            //prepare child tables
            $sql = "INSERT INTO users_live_objects (project_id, json_data) VALUES (" . $project_id . ", \"[]\" )";
            $result = $mysqli->query($sql);

            $sql = "INSERT INTO users_saved_shapes (project_id, json_data) VALUES (" . $project_id . ", \"[]\" )";
            $result = $mysqli->query($sql);

            $sql = "INSERT INTO users_saved_scene (project_id, json_data) VALUES (" . $project_id . ", \"[]\" )";
            $result = $mysqli->query($sql);

            $sql = "INSERT INTO users_saved_svg_scene (project_id, json_data) VALUES (" . $project_id . ", \"[]\" )";
            $result = $mysqli->query($sql);

            $sql = "INSERT INTO users_projects_movement_config (project_id) VALUES (" . $project_id . ")";
            $result = $mysqli->query($sql);

            //TODO sugalvoti kaip cia su failais zaisti
            $sql = "INSERT INTO users_projects_movement_config (project_id, js_file_path, code) 
            VALUES (" . $project_id . ",\"UserConvertedCode.js\"," . "function userCode() {} )";
            $result = $mysqli->query($sql);

        }
        else {
            echo "Oops! Something went wrong. Please try again later.";
        }

    }
    $stmt->close();
}
else{
    echo "No session" . $_POST['username'] . " id " . $_POST['userId'] . "   POST " . $_POST['projectName'];
}
$mysqli->close();





?>