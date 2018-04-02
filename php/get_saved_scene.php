<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 03/03/2018
 * Time: 14:14
 */


// Include connection file
require_once 'connection.php';

$sceneData = array();
if(isset($_POST['projectId'])){
    $sql = "SELECT json_data, ambient_data, point_data
            FROM users_saved_scene 
            WHERE project_id = ?";

    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("s", $param_project_id);
        //Setting parameters
        $param_project_id = $_POST['projectId'];

        //Executing SQL
        if($stmt->execute()){
            $stmt->store_result();

            if($stmt->num_rows >= 1){
                $stmt->bind_result($json_data, $ambient_data, $point_data);

                if($stmt->fetch()){
                    array_push($sceneData, ['jsonData' => $json_data, 'ambient' => $ambient_data, 'point' => $point_data]);
                    echo json_encode($sceneData);
                    //echo json_encode([$json_data, $ambient_data]);
                }
            }
            else{
                echo "No live objects found";
            }
        }
        else {
            echo "Oops! Something went wrong. Please try again later.";
        }

    }
    $stmt->close();
}
else{
    echo "ERROR on get saved scene";
}
$mysqli->close();

?>

