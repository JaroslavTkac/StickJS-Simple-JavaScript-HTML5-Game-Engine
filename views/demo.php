<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 19/02/2018
 * Time: 19:36
 */

// Initialize the session
session_start();

$isLoggedIn = true;
// If session variable is not set it will redirect to login page
if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {
    //header("location: ../index.php");
    //exit;
    $isLoggedIn = false;
}
?>

<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <title>StickJS - Demo Project</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <!-- Bootstrap CSS -->
    <link rel="stylesheet" type="text/css" href="../assets/css/bootstrap.css">
    <link rel="stylesheet" href="../assets/css/styles.css">

</head>
<body>


<div class="navbar navbar-default navbar-static-top" data-spy="affix" data-offset-top="80" style="margin-bottom: 0">
    <div class="container-fluid">
        <div class="navbar-header">
            <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="pull-left" href="
            <?php
            if ($isLoggedIn)
                echo "home.php";
            else
                echo "../index.php"
            ?>
            "><img style="height: 50px" src="../assets/img/design/StickJSlogo.png"></a>
        </div>
        <div class="navbar-collapse collapse" id="navbar-main">
            <ul class="nav navbar-nav">
                <li><a href="
                <?php
                    if ($isLoggedIn)
                        echo "home.php";
                    else
                        echo "../index.php"
                    ?>
                        ">Home</a>
                </li>
                <li><a href="
                <?php
                    if ($isLoggedIn)
                        echo "home.php#creator-info";
                    else
                        echo "../index.php#creator-info"
                    ?>">About</a>
                </li>
                <li><a href="users_projects.php">Users Projects</a>
                </li>
            </ul>
            <?php
            if ($isLoggedIn) {
                echo "<form class=\"navbar-right\">";
                echo "<div align=\"center\" style=\"color: white; font-size: 16px; font-family: Helvetica, Arial, sans-serif\">";
                echo "Welcome, " . "<b>" . $_SESSION['username'] . "</b>";
                echo "</div>";
                echo "<div align=\"center\" class=\"form-group\">";
                echo "<ul class=\"nav navbar-nav\" >";
                echo "<a id = \"register-link\" href = \"my_projects.php\" > My Projects </a >";
                echo "</ul >";
                echo "<ul class=\"nav navbar-nav\" >";
                echo "<a id = \"register-link\" href = \"../php/logout.php\" > Logout</a >";
                echo "</ul >";
                echo "</div>";
                echo "</form>";
            } else {
                require_once("../php/login.php");
                echo "<form class=\"navbar-form navbar-right\" action=\"" . htmlspecialchars($_SERVER["PHP_SELF"]) . "\" method=\"post\">";
                echo "<div class=\"form-group\" style=\"margin-right: 3.5px\">";
                echo "<ul class=\"nav navbar-nav\">";
                echo "<a id=\"register-link\" href=\"../views/registration.php\">Register</a>";
                echo "</ul>";
                echo "</div>";
                echo "<div class=\"form-group\" style=\"margin-right: 4px\">";
                echo "<input type=\"text\" name=\"username\" class=\"form-control\" placeholder=\"Username\" value=\"" . $username . "\">";
                echo "</div>";
                echo "<div class=\"form-group\" style=\"margin-right: 4px\">";
                echo "<input type=\"password\" name=\"password\" class=\"form-control\" placeholder=\"Password\">";
                echo "</div>";
                echo "<button type=\"submit\" class=\"btn btn-primary\" value=\"Login\">Sign In</button>";
                echo "</from>";
            }
            ?>
        </div>
    </div>
</div>

<h4>DEMO PROJECT</h4>


<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
<script src="../assets/js/bootstrap.min.js"></script>
</body>
</html>