<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 26/02/2018
 * Time: 00:22
 */


// Include connection file
require_once 'connection.php';

// Initialize the session


if(isset($_POST['userId']) && isset($_POST['projectId'])){
    $publishedProjectId = 0;
    //Check if this project have been published
    $sql = "SELECT published_project_id  
            FROM users_published_projects 
            WHERE original_project_id = " . $_POST['projectId'] . "
            ORDER BY created_at DESC
            LIMIT 1";

    $result = $mysqli->query($sql);

    if ($result->num_rows == 1) {
        // output data of each row
        if($row = $result->fetch_assoc()) {
            //If found project delete it
            $publishedProjectId = $row['published_project_id'];
        }
        else{
            echo "Oops! Something went wrong. Please try again later.";
        }
    }


    //Deleting MAIN project
    $sql = "DELETE FROM users_projects WHERE id = ? AND user_id = ?";

    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("ss", $param_project_id, $param_user_id);
        //Setting parameters

        $param_user_id = $_POST['userId'];
        $param_project_id = $_POST['projectId'];

        //Executing SQL
        if($stmt->execute()){
            echo json_encode(array('publishedProjectId' => $publishedProjectId,
                'info' => "Project with id: " . $param_project_id . " DELETED"));
        }
        else {
            echo "Oops! Something went wrong. Please try again later.";
        }

    }
    $stmt->close();
}
else{
    echo "No session" . $_POST['username'] . " id " . $_POST['userId'] . "   POST " . $_POST['projectId'];
}
$mysqli->close();


