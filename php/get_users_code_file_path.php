<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 08/03/2018
 * Time: 20:49
 */

// Include connection file
require 'connection.php';


$sql = "SELECT new_js_file_path, old_js_file_path, code
            FROM users_converted_code 
            WHERE project_id = ?";

if ($stmt = $mysqli->prepare($sql)) {
    $stmt->bind_param("s", $param_project_id);
    //Setting parameters
    $param_project_id = $project_id;
    //Executing SQL
    if ($stmt->execute()) {
        $stmt->store_result();

        if ($stmt->num_rows >= 1) {
            $stmt->bind_result($new_js_file_path, $old_js_file_path, $code);

            if ($stmt->fetch()) {
                $newFilePath = $new_js_file_path;

                if ($old_js_file_path != "../scripts/UserConvertedCode.js") {
                    //update data in file
                    file_put_contents($old_js_file_path, $code);
                    rename($old_js_file_path, $newFilePath);
                } else {
                    //create file
                    //write data in it
                    file_put_contents($newFilePath, $code);
                }

            }
        } else {
            $newFilePath = "../scripts/UserConvertedCode.js";
            return $newFilePath;
        }
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }

}
$stmt->close();

$mysqli->close();


?>