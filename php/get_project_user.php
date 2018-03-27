<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 27/03/2018
 * Time: 12:31
 */

// Include connection file
require 'connection.php';

if(!empty($projectType) && !empty($project_id)){

    //Preparing SQL
    $sql = "SELECT user_id 
            FROM users_projects 
            WHERE id = ?";

    if($stmt = $mysqli->prepare($sql)){

        $stmt->bind_param("s", $param_project_id);
        //Setting parameters
        $param_project_id = $project_id;

        //Executing SQL
        if($stmt->execute()){
            $stmt->store_result();

            if($stmt->num_rows > 0){
                $stmt->bind_result( $project_user_id);

                if($stmt->fetch()){
                   $projectUserId = $project_user_id;
                }
            }
        }
        else {
            echo "Oops! Something went wrong. Please try again later. get project user";
        }

    }
    $stmt->close();
}
else{
    echo "Something went wrong.";
}
$mysqli->close();

?>

