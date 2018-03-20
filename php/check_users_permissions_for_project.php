<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 08/03/2018
 * Time: 00:14
 */

// Include connection file
require 'connection.php';

$username = $_SESSION['username'];
$user_id = $_SESSION['user_id'];

if(!empty($username)){
    $sql = "SELECT created_at FROM users_projects WHERE user_id = ? AND id = ? AND name = ?";

    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("sss", $param_user_id, $param_project_id, $param_project_name);
        //Setting parameters
        $param_user_id = $user_id;
        $param_project_id = $_GET['project_id'];
        $param_project_name = $_GET['project_name'];

        //Executing SQL
        if($stmt->execute()){
            $stmt->store_result();

            if($stmt->num_rows >= 1){
                $stmt->bind_result($created_at);

                if($stmt->fetch()){
                    $isUsersProject = true;
                }
            }
            else{
                echo "No user projects found";
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

