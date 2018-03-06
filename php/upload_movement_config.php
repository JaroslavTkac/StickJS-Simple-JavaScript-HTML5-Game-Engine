<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 03/03/2018
 * Time: 18:39
 */

// Include connection file
require_once 'connection.php';


if(isset($_POST['projectId']) && isset($_POST['useMovement'])){
    $sql = "UPDATE users_projects_movement_config 
            SET standard_movement = ?, speed = ?, rotation_speed = ? WHERE project_id = ?";

    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("ssss", $param_standard_movement, $param_speed, $param_rotation_speed, $param_project_id);
        //Setting parameters
        $param_project_id = $_POST['projectId'];
        $param_standard_movement = $_POST['useMovement'];
        $param_speed = $_POST['movementSpeed'];
        $param_rotation_speed = $_POST['movementRotation'];

        //Executing SQL
        if($stmt->execute()){
            echo "Movement Config Table updated";
        }
        else {
            echo "Oops! Something went wrong. Please try again later.";
        }

    }
    $stmt->close();
}
else{
    echo "Something went wrong on upload movement config... ERROR: pr id " . $_POST['projectId'];
}
$mysqli->close();

?>