<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 31/03/2018
 * Time: 10:35
 */

// Include connection file
require_once 'connection.php';


if(isset($_POST['projectId']) && isset($_POST['ambient']) && ($_POST['projectType'] === "general")){
    $sql = "UPDATE users_projects_lighting_setup 
            SET ambient_data = ?, point_data = ? WHERE project_id = ?";

    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("sss", $param_ambient_data, $param_point_data, $param_project_id);
        //Setting parameters
        $param_project_id = $_POST['projectId'];
        $param_ambient_data = $_POST['ambient'];
        $param_point_data = $_POST['point'];

        //Executing SQL
        if($stmt->execute()){
            echo "Lighting Setup Table updated";
        }
        else {
            echo "Oops! Something went wrong. Please try again later.";
        }

    }
    $stmt->close();
}
else{
    echo "Something went wrong on upload lighting setup... ERROR: pr id " . $_POST['projectId'];
}
$mysqli->close();

?>