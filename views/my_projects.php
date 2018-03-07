<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 19/02/2018
 * Time: 19:36
 */


// Initialize the session
session_start();

// If session variable is not set it will redirect to login page
if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {
    header("location: ../index.php");
    exit;
} else {
    require_once('../php/get_projects.php');
}
?>

<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <title>StickJS - My Projects</title>
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
    <script src="../assets/js/CreateProjects.js"></script>

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
            <a class="pull-left" href="#"><img style="height: 50px" src="../assets/img/design/StickJSlogo.png"></a>
        </div>
        <div class="navbar-collapse collapse" id="navbar-main">
            <ul class="nav navbar-nav">
                <li><a href="home.php">Home</a>
                </li>
                <li><a href="home.php#creator-info">About</a>
                </li>
            </ul>
            <form class="navbar-right">
                <div align="center" style="color: white; font-size: 16px; font-family: Helvetica, Arial, sans-serif">
                    <?php echo "Welcome, " . "<b>" . $_SESSION['username'] . "</b>" ?>
                </div>
                <div align="center" class="form-group">

                    <ul class="nav navbar-nav">
                        <a id="register-link" href="my_projects.php">My Projects</a>
                    </ul>
                    <ul class="nav navbar-nav">
                        <a id="register-link" href="../php/logout.php">Logout</a>
                    </ul>
                </div>

            </form>
        </div>
    </div>
</div>


<div class="container-fluid" style="background: #e3eef4">
    <h1 align="center">My projects</h1>

    <div align="center">
        <label class="btn btn-primary" id="new-project-btn">
            <span class="glyphicon glyphicon-plus"></span> New Project
        </label>
    </div>


    <div id="user-projects" class="col-sm-12">

        <?php
        $color_switcher = 0;
        $color_array = array('primary', 'info', 'success', 'warning', 'danger');
        foreach ($project_data as $data) {
            echo "<div class=\"bs-calltoaction bs-calltoaction-" . $color_array[$color_switcher] . "\">";
            echo "<div class=\"row\">";
            echo "<div class=\"col-md-9 cta-contents\">";
            echo "<h1 class=\"cta-title col-lg-9 col-md-9\">" . $data['name'] . "</h1>";
            echo "<p class=\"col-lg-3 col-md-3\">Created at: " . $data['created'] . "</p>";
            echo "<div class=\"cta-desc col-lg-12 col-md-12\">";
            echo "<p>" . $data['about'] . "</p>";
            echo "</div>";
            echo "</div>";
            echo "<div class=\"col-md-3 cta-button\">";
            echo "<a href=\"editor.php?project_id=" . $data['project_id'] . "&project_name=" . $data['name'] . "\" class=\"btn btn-lg btn-block btn-" . $color_array[$color_switcher] . "\">Open</a>";
            echo "<a href=\"#\" id=\"" . $data['project_id'] . "\" class=\"del-project-btn btn btn-lg btn-block btn-" . $color_array[$color_switcher] . "\">Delete</a>";
            echo "</div>";
            echo "</div>";
            echo "</div>";
            $color_switcher++;
            if ($color_switcher % 5 == 0)
                $color_switcher = 0;
        }

        ?>


    </div>


    <!-- New project Modal -->
    <div class="modal fade" id="new-project-modal" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div align="center" class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" style="alignment: center">New Project</h4>
                </div>
                <div align="center" class="modal-body">
                    <div id="new-project-form" class="form-group ">
                        <label for="usr-project-name">Name</label>
                        <input type="text" class="form-control" id="usr-project-name"
                               style="width: 100%; border-radius: 2px">
                        <p id="error-explanation"></p>
                        <label for="usr-project-about">About Project</label>
                        <textarea class="form-control" id="usr-project-about"
                                  style="resize: none; width: 100%; height: 200px; border-radius: 2px">...</textarea>
                    </div>
                    <button class="btn btn-primary" id="create-new-project-btn">Create Project</button>
                </div>
            </div>
        </div>
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