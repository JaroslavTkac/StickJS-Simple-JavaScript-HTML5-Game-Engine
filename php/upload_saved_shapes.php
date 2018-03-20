<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 23/02/2018
 * Time: 12:34
 */

// Include connection file
require_once 'connection.php';


if(isset($_POST['projectId']) && isset($_POST['saved_shapes_json_data']) && ($_POST['projectType'] === "general")){
    $sql = "UPDATE users_saved_shapes SET json_data = ? WHERE project_id = ?";

    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("ss", $param_json_data, $param_project_id);
        //Setting parameters
        $param_project_id = $_POST['projectId'];
        $param_json_data = $_POST['saved_shapes_json_data'];

        //Executing SQL
        if($stmt->execute()){
            echo "Saved Shapes Table updated";
        }
        else {
            echo "Oops! Something went wrong. Please try again later.";
        }

    }
    $stmt->close();
}
else{
    echo "Something went wrong on upload saved shapes... ERROR: pr id " . $_POST['projectId'];
}
$mysqli->close();

?>