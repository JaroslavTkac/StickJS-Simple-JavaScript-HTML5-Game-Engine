<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 16/03/2018
 * Time: 11:29
 */


// Initialize the session
session_start();

$isLoggedIn = true;

$projectType = "publish";
require_once ('../php/get_projects.php');
require_once ('../php/get_all_users.php');

// If session variable is not set it will redirect to login page
if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {
    $isLoggedIn = false;
    $userId = 0;
}
else{
    $userId = $_SESSION['user_id'];
}

?>

<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <title>StickJS - Users Projects</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <!-- Bootstrap CSS -->
    <link rel="stylesheet" type="text/css" href="../assets/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/styles.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/projects_styles.css">

    <!-- JavaScript Includes -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="../assets/js/jquery.knob.js"></script>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"
            integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4"
            crossorigin="anonymous"></script>
    <script src="../assets/js/bootstrap.min.js"></script>


    <script>
        let userId = "<?php echo $_SESSION['user_id']; ?>";
    </script>
    <script src="../scripts/Scripts.js"></script>
    <script src="../assets/js/PublishedProjects.js"></script>

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
            }
            else {
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

<div class="container-fluid" style="background: #e3eef4">
    <h1 align="center">Users Projects</h1>



    <div id="user-projects" class="col-sm-12">


        <?php
        $author = "empty";
        $color_switcher = 0;
        $color_array = array('primary', 'info', 'success', 'warning', 'danger');

        foreach ($project_data as $data) {
            //sql get authors needed map IDs to names
            foreach ($allUsers as $value) {
                if($value['user_id'] == $data['project_belongs_to_user']){
                    $author = $value['username'];
                    break;
                }
            }
            echo "<div class=\"bs-calltoaction bs-calltoaction-" . $color_array[$color_switcher] . "\">";
            echo "<div class=\"row\">";
            echo "<div class=\"col-md-9 cta-contents\">";
            echo "<h1 class=\"cta-title col-lg-9 col-md-9\">" . $data['name'] . "</h1>";
            echo "<p class=\"col-log-3 col-md-3\">Author: " . $author . "</p>";
            echo "<p class=\"col-lg-3 col-md-3\">Created at: " . $data['created'] . "</p>";
            echo "<div class=\"cta-desc col-lg-12 col-md-12\">";
            echo "<p>" . $data['about'] . "</p>";
            echo "</div>";
            echo "</div>";
            echo "<div class=\"col-md-3 cta-button\">";
            echo "<a href=\"editor.php?project_id=" . $data['project_id'] . "&project_name=" . $data['name'] . "&preview=" . $data['name'] . "\" class=\"btn btn-lg btn-block btn-" . $color_array[$color_switcher] . "\">Open</a>";
            if($userId === $data['project_belongs_to_user']) {
                echo "<a href=\"#\" id=\"" . $data['project_id'] . "\" class=\"del-project-btn btn btn-lg btn-block btn-" . $color_array[$color_switcher] . "\">Delete</a>";
            }
            echo "</div>";
            echo "</div>";
            echo "</div>";
            $color_switcher++;
            if ($color_switcher % 5 == 0)
                $color_switcher = 0;
        }

        ?>


    </div>



</div>


<hr>
<footer>
    <p>&copy; Jaroslav Tkaciuk <?php echo date("Y") ?></p>
</footer>


<!-- My Scripts -->
<!-- <script type="text/javascript" src="../assets/js/CreateProjects.js"></script>
-->
</body>
</html>