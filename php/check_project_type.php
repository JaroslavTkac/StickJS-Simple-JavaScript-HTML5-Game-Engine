<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 17/03/2018
 * Time: 11:56
 */

// Include connection file
require_once 'connection.php';

$username = $_SESSION['username'];
$user_id = $_SESSION['user_id'];


$sql = "SELECT project_type FROM users_projects WHERE id = ? AND name = ?";

if ($stmt = $mysqli->prepare($sql)) {
    $stmt->bind_param("ss", $param_project_id, $param_project_name);
    //Setting parameters
    $param_project_id = $_GET['project_id'];
    $param_project_name = $_GET['project_name'];

    //Executing SQL
    if ($stmt->execute()) {
        $stmt->store_result();

        if ($stmt->num_rows >= 1) {
            $stmt->bind_result($project_type);

            if ($stmt->fetch()) {
                $projectType = $project_type;
            }
        } else {
            echo "No user projects found";
        }
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }

}
$stmt->close();

$mysqli->close();

?>

