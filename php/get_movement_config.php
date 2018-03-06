<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 03/03/2018
 * Time: 14:13
 */
// Include connection file
require_once 'connection.php';

$movement_data = [];
if(isset($_POST['projectId'])){
    $sql = "SELECT standard_movement, speed, rotation_speed
            FROM users_projects_movement_config 
            WHERE project_id = ?";

    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("s", $param_project_id);
        //Setting parameters
        $param_project_id = $_POST['projectId'];

        //Executing SQL
        if($stmt->execute()){
            $stmt->store_result();

            if($stmt->num_rows >= 1){
                $stmt->bind_result($useMovement, $speed, $rotationSpeed);

                if($stmt->fetch()){
                    array_push($movement_data, ['useMovement' => $useMovement, 'speed' => $speed, 'rotationSpeed' => $rotationSpeed]);
                    echo json_encode($movement_data);
                }
            }
            else{
                echo "No movement speed config found";
            }
        }
        else {
            echo "Oops! Something went wrong. Please try again later.";
        }

    }
    $stmt->close();
}
else{
    echo "ERROR on get live objects";
}
$mysqli->close();

?>

