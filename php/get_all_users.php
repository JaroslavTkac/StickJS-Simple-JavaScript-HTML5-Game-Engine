<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 19/03/2018
 * Time: 20:45
 */

require 'connection.php';

$allUsers = [];
$sql = "SELECT id, username FROM users";

$result = $mysqli->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        array_push($allUsers ,['user_id' => $row['id'], 'username' => $row['username']]);
    }
}
else{
    echo "No users found";
}

$mysqli->close();