<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 21/02/2018
 * Time: 12:32
 */

// Include connection file
require 'connection.php';

// Initialize the session
//session_start();

// Define variables and initialize with empty values
$username = $_SESSION['username'];
$user_id = $_SESSION['user_id'];
$project_data = [];

if(!empty($username) || !empty($projectType)){

    //Preparing SQL

    if((empty($username) && $projectType === "publish") ||
        (!empty($username) && $projectType === "publish")){
        $sql = "SELECT id, name, info, created_at, user_id 
            FROM users_projects 
            WHERE project_type = ?
            ORDER BY created_at DESC";
    }
    if(!empty($username) && $projectType === "general") {
        $sql = "SELECT id, name, info, created_at, user_id 
            FROM users_projects 
            WHERE user_id = ? AND project_type = ?
            ORDER BY created_at DESC";
    }

    if($stmt = $mysqli->prepare($sql)){
        //load users projects fon non logged in users
        if(empty($username) && $projectType === "publish"){
            $stmt->bind_param("s", $param_project_type);
            //Setting parameters
            $param_project_type = $projectType;
        }
        //load USERS projects for logged in users
        if(!empty($username) && $projectType === "publish") {
            $stmt->bind_param("s", $param_project_type);
            //Setting parameters
            $param_project_type = $projectType;
        }
        //load users projects
        if(!empty($username) && $projectType === "general") {
            $stmt->bind_param("ss", $param_user_id, $param_project_type);
            //Setting parameters
            $param_user_id = $user_id;
            $param_project_type = $projectType;
        }
        //Executing SQL
        if($stmt->execute()){
            $stmt->store_result();

            if($stmt->num_rows > 0){
                $stmt->bind_result($project_id, $project_name, $project_info,
                    $project_date, $project_user_id);

                while($stmt->fetch()){
                    array_push($project_data, ['project_id' => $project_id, 'name' => $project_name,
                        'about' => $project_info, 'created' => substr($project_date, 0, 10),
                        'project_belongs_to_user' => $project_user_id]);
                }
            }
            else{
                //echo "No projects found";
            }
        }
        else {
            echo "Oops! Something went wrong. Please try again later.";
        }

    }
    $stmt->close();
}
else{
    echo "Something went wrong.";
}
$mysqli->close();

?>

