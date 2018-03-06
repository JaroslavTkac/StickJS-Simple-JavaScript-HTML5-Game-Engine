<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 21/02/2018
 * Time: 12:32
 */

// Include connection file
require_once 'connection.php';

// Initialize the session
//session_start();

// Define variables and initialize with empty values
$username = $_SESSION['username'];
$user_id = $_SESSION['user_id'];
$project_data = [];

if(!empty($username)){

    //Preparing SQL

    $sql = "SELECT id, name, info, created_at FROM users_projects WHERE user_id = ?";

    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("s", $param_user_id);
        //Setting parameters
        $param_user_id = $user_id;

        //Executing SQL
        if($stmt->execute()){
            $stmt->store_result();

            if($stmt->num_rows >= 1){
                $stmt->bind_result($project_id, $project_name, $project_info, $project_date);


                while($stmt->fetch()){
                    array_push($project_data, ['project_id' => $project_id, 'name' => $project_name, 'about' => $project_info, 'created' => substr($project_date, 0, 10)]);
                }
            }
            else{
                echo "No projects found";
            }
        }
        else {
            echo "Oops! Something went wrong. Please try again later.";
        }

    }
    $stmt->close();
}
else{
    echo "No session";
}
$mysqli->close();

?>

