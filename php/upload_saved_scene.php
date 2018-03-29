<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 03/03/2018
 * Time: 16:43
 */

// Include connection file
require_once 'connection.php';


if(isset($_POST['projectId']) && isset($_POST['saved_scene_json_data']) && ($_POST['projectType'] === "general")){
    $sql = "UPDATE users_saved_scene SET json_data = ?, ambient_data = ?, point_data = ?  WHERE project_id = ?";

    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("ssss", $param_json_data, $param_ambient_data, $param_point_data, $param_project_id);
        //Setting parameters
        $param_project_id = $_POST['projectId'];
        $param_json_data = $_POST['saved_scene_json_data'];
        $param_ambient_data = $_POST['ambient'];
        $param_point_data = $_POST['point'];

        //Executing SQL
        if($stmt->execute()){
            echo "Saved Scene Table updated";
        }
        else {
            echo "Oops! Something went wrong. Please try again later.";
        }

    }
    $stmt->close();
}
else{
    echo "Something went wrong on upload saved scene... ERROR: pr id " . $_POST['projectId'];
}
$mysqli->close();

?>