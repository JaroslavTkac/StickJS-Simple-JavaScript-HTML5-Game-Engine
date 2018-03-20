<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 18/03/2018
 * Time: 23:02
 */


// Include connection file
require_once 'connection.php';

// Initialize the session


if(isset($_POST['userId']) && isset($_POST['projectId'])){
    //Check if this project have been published
    $publishedProjectId = 0;
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
            echo json_encode(array('publishedProjectId' => $publishedProjectId,
                'found' => true));
        }
        else{
            echo json_encode(array('publishedProjectId' => $publishedProjectId,
                'found' => false));
        }
    }
    else{
        echo json_encode(array('publishedProjectId' => $publishedProjectId,
            'found' => false));
    }

}
else{
    echo "No session" . $_POST['username'] . " id " . $_POST['userId'] . "   POST " . $_POST['projectId'];
}
$mysqli->close();


