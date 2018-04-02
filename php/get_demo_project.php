<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 02/04/2018
 * Time: 11:12
 */

// Include connection file
require 'connection.php';

$demo = [];

$sql = "SELECT id, name
        FROM users_projects 
        WHERE project_type = \"publish\" AND user_id = 1";

if ($stmt = $mysqli->prepare($sql)) {
    //Executing SQL
    if ($stmt->execute()) {
        $stmt->store_result();

        if ($stmt->num_rows >= 1) {
            $stmt->bind_result($project_id, $name);

            if ($stmt->fetch()) {
                array_push($demo, ['demoProjectId' => $project_id]);
                array_push($demo, ['name' => $name]);
                //echo json_encode($demo);
            }
        } else {
            echo "No demo project found";
        }
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }

}
$stmt->close();
$mysqli->close();

?>

