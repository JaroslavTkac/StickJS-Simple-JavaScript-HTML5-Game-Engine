<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 13/02/2018
 * Time: 19:47
 */


// Initialize the session
session_start();

// Unset all of the session variables
$_SESSION = array();

// Destroy the session.
session_destroy();

header("location: ../index.php");