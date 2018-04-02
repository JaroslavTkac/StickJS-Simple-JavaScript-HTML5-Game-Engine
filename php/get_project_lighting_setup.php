<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 31/03/2018
 * Time: 10:36
 */

// Include connection file
require_once 'connection.php';

$lightData = [];
if(isset($_POST['projectId'])){
    $sql = "SELECT ambient_data, point_data
            FROM users_projects_lighting_setup 
            WHERE project_id = ?";

    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("s", $param_project_id);
        //Setting parameters
        $param_project_id = $_POST['projectId'];

        //Executing SQL
        if($stmt->execute()){
            $stmt->store_result();

            if($stmt->num_rows >= 1){
                $stmt->bind_result($ambient_data, $point_data);

                if($stmt->fetch()){
                    array_push($lightData, ['ambient' => $ambient_data, 'point' => $point_data]);
                    echo json_encode($lightData);
                }
            }
            else{
                echo "project id : " . $_POST['projectId'] . "\n</br>";
                echo "No lighting setup found";
            }
        }
        else {
            echo "Oops! Something went wrong. Please try again later.";
        }

    }
    $stmt->close();
}
else{
    echo "ERROR on get lighting setup";
}
$mysqli->close();

?>

