<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 19/02/2018
 * Time: 19:36
 */


session_start();

require_once ('../php/login.php');
require_once ('../php/check_project_type.php');

$project_id = $_GET['project_id'];
$project_name = $_GET['project_name'];
$isLoggedIn = false;
$isUsersProject = false;
$projectUserId = 0;

require_once ('../php/get_project_user.php');

if (isset($_SESSION['username']) || !empty($_SESSION['username'])) {
    $isLoggedIn = true;
}

if($projectType === "general" && strlen($_GET['preview']) == 0) {
    // If session variable is not set it will redirect to login page
    if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {
        header("location: index.php");
        exit;
    } else {
        require_once('../php/check_users_permissions_for_project.php');
    }
    if ($isUsersProject) {
        include('../php/get_users_code_file_path.php');
        //echo "newFilePath: " . $newFilePath;
    } else {
        header("location: my_projects.php");
        exit;
    }
}
if(($projectType === "publish" || $projectType == "demo") && strlen($_GET['preview']) > 0){
    include('../php/get_users_code_file_path.php');
}
if($projectType === "general" && strlen($_GET['preview']) > 0){
    if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {
        header("location: index.php");
        exit;
    } else {
        header("location: home.php");
        exit;
    }
}

?>

<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
<head>
    <title><?php echo "StickJS: " . $project_name ?></title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/jquery.roundslider/1.3/roundslider.min.css">
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.8.0/css/bootstrap-slider.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/styles.css">


    <!-- JavaScript Includes -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="../assets/js/jquery.knob.js"></script>

    <!-- jQuery File Upload Dependencies -->
    <script src="../assets/js/jquery.ui.widget.js"></script>
    <script src="../assets/js/jquery.iframe-transport.js"></script>
    <script src="../assets/js/jquery.fileupload.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"
            integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4"
            crossorigin="anonymous"></script>
    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.8.0/bootstrap-slider.min.js"></script>
    <script src="https://cdn.jsdelivr.net/jquery.roundslider/1.3/roundslider.min.js"></script>

    <script>
        let isLoggedIn = "<?php echo $isLoggedIn; ?>";
        let projectType = "<?php echo $projectType; ?>";
        let userId = "<?php echo $_SESSION['user_id']; ?>";
        let projectUserId = "<?php echo $projectUserId; ?>";

        // console.log("$_SESSION userID: " + userId);
        // console.log("isLoggedIn: " + isLoggedIn);
        // console.log("ProjectUserID: " + projectUserId);
        if (!isLoggedIn || userId !== projectUserId){
            userId = projectUserId;
        }
        let projectId = "<?php echo $project_id; ?>";
    </script>

    <!-- My Scripts -->
    <script type="text/javascript" src="../assets/js/UserInterfaceScripts.js"></script>
    <script type="text/javascript" src="../assets/js/UploadHandler.js"></script>
    <script type="text/javascript" src="../scripts/Scripts.js"></script>
    <script type="text/javascript" src="../assets/js/glMatrix-0.9.5.min.js"></script>
    <script type="text/javascript" src="../assets/js/webgl-utils.js"></script>
    <script type="text/javascript" src="../assets/js/WebglHelper.js"></script>
    <script type="text/javascript" src="../scripts/Shaders.js"></script>
    <script type="text/javascript" src="../scripts/Controls.js"></script>
    <script type="text/javascript" src="../scripts/Scene.js"></script>
    <script type="text/javascript" src="../scripts/OptimizeCalls.js"></script>
    <script type="text/javascript" src="../scripts/Audio.js"></script>
    <script type="text/javascript" src="../scripts/Group.js"></script>
    <script type="text/javascript" src="../scripts/Lightning.js"></script>
    <script type="text/javascript" src="../scripts/Animations.js"></script>
    <script type="text/javascript" src="../scripts/UserFunctions.js"></script>
    <script type="text/javascript" src="../scripts/CodeBlocks.js"></script>
    <script type="text/javascript" src="../scripts/BlocksToCode.js"></script>
    <script type="text/javascript" src="<?php echo $newFilePath ; ?>"></script>
    <script type="text/javascript" src="../scripts/EditorMainWindow.js"></script>
    <script type="text/javascript" src="../scripts/Main.js"></script>


</head>
<body onload="webGLStart();">


<div class="navbar navbar-default navbar-static-top" style="margin-bottom: 0">
    <div class="container-fluid">
        <div class="navbar-header">
            <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="pull-left" href="home.php"><img style="height: 50px"
                                                      src="../assets/img/design/StickJSlogo.png"></a>
        </div>
        <div class="navbar-collapse collapse" id="navbar-main">
            <ul class="nav navbar-nav">
                <li><a href="home.php">Home</a>
                </li>
                <li><a href="home.php#creator-info">About</a>
                </li>
                <li><a href="users_projects.php">Users Projects</a>
                </li>
                <li><a href="#">How To</a></li>
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


<!-- How to modal -->
<div class="modal fade" id="how-to-modal" role="dialog" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div align="center" class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" style="alignment: center">How to use StickJS</h4>
            </div>
            <div class="modal-body">
                <h4 align="center">Upload</h4>
                <hr class="update-hr">
                <p>By clicking upload button, you can upload these types of files to server.</p>
                <ul>
                    <li>obj</li>
                    <li>png</li>
                    <li>jpg</li>
                </ul>
                <p><i>StickJS only supports .obj files, that are UV unwrapped (have texture coordinates).</i></p>
                <h4 align="center">Scene control buttons</h4>
                <hr class="update-hr">
                <ul>
                    <li>Aspect Ratio - changes proportions (size) of your scene and editor/code area.</li>
                    <li>Save, Reset, Clear - simply saves current scene, resetting scene to early saved and erasing everything from scene.</li>
                    <li>Play Frames - starts frame counter, used to run any kind of programed animations.</li>
                    <li>Shape To Delete - simply selecting shape by name, which one you want to delete from scene.</li>
                    <li>Upload - used to upload stuff to your project.</li>
                </ul>
                <h4 align="center">Editor</h4>
                <hr class="update-hr">
                <p>There you can modify shapes and save them for following exporting to main scene.</p>
                <p><i>Color, Texture, Opacity and Shape rotation directly have effect on shape before saving.
                        However by clicking on tab Lightning you only affecting shapes that are in editor window.</i></p>
                <h4 align="center">Logic</h4>
                <hr class="update-hr">
                <p>To add block to editor double click on it in left blocks choosing area.</p>
                <p>Blocks construction work by this pattern:</p>
                <ul>
                    <li>Any kind of trigger block</li>
                    <li>Any Loop block</li>
                    <li>And any setter block</li>
                </ul>
                <hr class="update-hr">
                <p><i><strong>Remember</strong></i></p>
                <ul>
                    <li>You cannot join two trigger blocks together.</li>
                    <li>You cannot have multiple triggers in block group.</li>
                    <li>You must have at least one <i><strong>Loop</strong></i> block in block group.</li>
                    <li>You can use <i>Lighting blocks</i> with any kind of loop block.</li>
                </ul>
                <h4 align="center">Buttons</h4>
                <hr class="update-hr">
                <ul>
                    <li>
                        <span class="glyphicon glyphicon-floppy-save"></span> - button to run blocks which are joined with "On Apply" trigger.
                    </li>
                    <li>
                        <span class="glyphicon glyphicon-save-file"></span> - button to upload your code to server.
                    </li>
                    <li>
                        <span class="glyphicon glyphicon-remove"></span> - button to clear all blocks.
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>


<!-- Please Register Modal -->
<div class="modal fade" id="please-register-modal" role="dialog" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div align="center" class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h2 class="modal-title" style="alignment: center">Alert</h2>
            </div>
            <div class="modal-body">
                <p>It is user created project, you cannot drastically change it.
                    Any code uploading is disabled.</p>
                <h3 align="center">Your able to:</h3>
                <hr class="update-hr">
                <ul>
                    <li>Modify all shapes in project scene <strong>only</strong> with
                        "On Apply" trigger, other triggers will have no effect on project.</li>
                    <li>Select and add shapes to scene from currently used by project.</li>
                    <li>Preview user project and run it.</li>
                </ul>
                <h3 align="center">Remember</h3>
                <hr class="update-hr">
                <p>To get full project creation experience please register and create own project.</p>
            </div>
        </div>
    </div>
</div>


<!-- Code Uploaded Plese Reload Page Modal -->
<div class="modal fade" id="code-uploaded-modal" role="dialog" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div align="center" class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h3 class="modal-title" style="alignment: center">Your Code Uploaded To Server</h3>
            </div>
            <div class="modal-body">
                <p>Please reload page to be able to run your code or see any other changes if you used
                    other triggers, not only "On Apply".</p>
            </div>
        </div>
    </div>
</div>


<div class="container-fluid" style="background: #e3eef4">
    <div class="row">
        <!-- Main Scene & Importer -->
        <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12" id="left-window" style="padding: 0 0 0 0">

            <!-- frame rate and x y z coodrinates overlay -->
            <div align="center" id="overlay">
                <div >
                    <span id="fps"></span>
                    <span id="avgFps"></span>
                </div>
                <div>
                    <span id="xyz"></span>
                </div>
            </div>

            <!-- WEB GL Canvas area -->
            <canvas id="Scene" style="border: 3pt black solid"></canvas>

            <!-- Add shape name modal -->
            <div class="modal fade" id="add-name-modal" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div align="center" class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title" style="alignment: center">Enter Object Name</h4>
                        </div>
                        <div align="center" class="modal-body">
                            <form>
                                <div id="add-shape-name-form" class="form-group ">
                                    <label for="usr-shape-name">Name</label>
                                    <input type="text" class="form-control" id="usr-shape-name"
                                           style="width: 100%; border-radius: 2px">
                                    <p id="error-explanation"></p>
                                </div>
                                <button class="btn btn-primary" id="add-shape-name">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Upload and selection navigation bar -->
            <div>
                <nav class="navbar navbar-default navbar-static-top" style="margin: 0 0 0 0;">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-3" aria-expanded="false">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a class="navbar-brand" href="#"><img style="margin-top: -28%; height: 50px"
                                                                  src="../assets/img/design/SelectIcon.png"></a>
                        </div>
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-3">
                            <ul class="nav navbar-nav">
                                <li class="dropdown">
                                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">Select<span
                                                class="caret"></span></a>
                                    <ul class="dropdown-menu" id="select-dropdown-value">
                                        <li><a href="#">Shapes</a></li>
                                        <!--<li><a href="#">Music</a></li>-->
                                        <li><a href="#">Textures</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <label class="btn btn-primary" id="aspect-ratio" style="margin-top: 8px;">
                                        <span class="glyphicon glyphicon-retweet"></span> Aspect Ratio
                                    </label>
                                </li>
                                <li>
                                    <label class="btn btn-primary" id="save-scene-btn"
                                           style="margin-top: 8px; margin-left: 5px">
                                        <span class="glyphicon glyphicon-floppy-save"></span> Save
                                    </label>
                                </li>
                                <li>
                                    <label class="btn btn-primary" id="reset-scene-btn"
                                           style="margin-top: 8px; margin-left: 5px">
                                        <span class="glyphicon glyphicon-refresh"></span> Reset
                                    </label>
                                </li>
                                <li>
                                    <label class="btn btn-primary" id="clear-scene-btn"
                                           style="margin-top: 8px; margin-left: 5px">
                                        <span class="glyphicon glyphicon-remove"></span> Clear
                                    </label>
                                </li>
                                <li>
                                    <label class="btn btn-primary" id="start-frame-btn"
                                           style="margin-top: 8px; margin-left: 5px">
                                        <span class="glyphicon glyphicon-play"></span> Play Frames
                                    </label>
                                </li>
                                <?php
                                if($projectType === "general") {
                                    echo "<li>";
                                    echo "<form id = \"upload\" method = \"post\" action = \"../php/upload.php\" >";
                                    echo "<label class=\"btn btn-primary\" style = \"margin-top: 8px; margin-left: 5px\" >";
                                    echo "<span class=\"glyphicon glyphicon-save-file\" ></span > Upload";
                                    echo "<input type = \"file\" name = \"upl\" accept = \"image/png/jpg/obj/mp3\" style = \"display: none;\">";
                                    echo "</label >";
                                    echo "</form>";
                                    echo "</li>";

                                    echo "<li style=\"margin-top: 4px; margin-left: 5px\">";
                                    echo "<p id='delete-info'>Shape to delete</p><select id=\"deletable-shape-selection\">";
                                    echo "<option value=\"name\">Name</option>";
                                    echo "</select>";
                                    echo "</li>";
                                    echo "<li>";
                                    echo "<label class=\"btn btn-primary\" id=\"delete-shape-from-scene-btn\" style=\"margin-top: 8px; margin-left: 5px\">";
                                    echo "<span class=\"glyphicon glyphicon-trash\"></span>";
                                    echo "</label>";
                                    echo "</li>";

                                }
                                ?>
                            </ul>
                        </div>
                    </div>
                </nav>


                <div id="selectable-shapes">
                    <div class="row" id="selectable-shapes-row" >
                        <div class="col-lg3 col-md-4 col-sm-4 col-xs-6" align="center">
                            <a href="#" class="thumbnail">
                                <canvas class="preview-scene shape" id="../shapes/cube.json"></canvas>
                                <?php
                                if($projectType === "general"){
                                    echo " <a href=\"#\" class=\"btn btn-md overlay-btn disabled\"><span class=\"glyphicon glyphicon-trash\"></span></a>";
                                }
                                ?>
                            </a>
                        </div>
                        <div class="col-lg3 col-md-4 col-sm-4 col-xs-6" align="center">
                            <a href="#" class="thumbnail">
                                <canvas class="preview-scene shape" id="../shapes/sphere.json"></canvas>
                                <?php
                                if($projectType === "general") {
                                    echo "<a href=\"#\" class=\"btn btn-md overlay-btn disabled\"><span class=\"glyphicon glyphicon-trash\"></span></a>";
                                }
                                ?>
                            </a>
                        </div>
                        <div class="col-lg3 col-md-4 col-sm-4 col-xs-6" align="center">
                            <a href="#" class="thumbnail">
                                <canvas class="preview-scene shape" id="../shapes/cone.json"></canvas>
                                <?php
                                if($projectType === "general"){
                                    echo " <a href=\"#\" class=\"btn btn-md overlay-btn disabled\"><span class=\"glyphicon glyphicon-trash\"></span></a>";
                                }
                                ?>
                            </a>
                        </div>
                        <div class="col-lg3 col-md-4 col-sm-4 col-xs-6" align="center">
                            <a href="#" class="thumbnail">
                                <canvas class="preview-scene shape" id="../shapes/cylinder.json"></canvas>
                                <?php
                                if($projectType === "general"){
                                    echo " <a href=\"#\" class=\"btn btn-md overlay-btn disabled\"><span class=\"glyphicon glyphicon-trash\"></span></a>";
                                }
                                ?>
                            </a>
                        </div>
                        <div class="col-lg3 col-md-4 col-sm-4 col-xs-6" align="center">
                            <a href="#" class="thumbnail">
                                <canvas class="preview-scene shape" id="../shapes/simpleSphere.json"></canvas>
                                <?php
                                if($projectType === "general"){
                                    echo " <a href=\"#\" class=\"btn btn-md overlay-btn disabled\"><span class=\"glyphicon glyphicon-trash\"></span></a>";
                                }
                                ?>
                            </a>
                        </div>
                        <div class="col-lg3 col-md-4 col-sm-4 col-xs-6" align="center">
                            <a href="#" class="thumbnail">
                                <canvas class="preview-scene shape" id="../shapes/christmasTree.json"></canvas>
                                <?php
                                if($projectType === "general"){
                                    echo " <a href=\"#\" class=\"btn btn-md overlay-btn disabled\"><span class=\"glyphicon glyphicon-trash\"></span></a>";
                                }
                                ?>
                            </a>
                        </div>
                        <div class="col-lg3 col-md-4 col-sm-4 col-xs-6" align="center">
                            <a href="#" class="thumbnail">
                                <canvas class="preview-scene shape" id="../shapes/pineTree.json"></canvas>
                                <?php
                                if($projectType === "general"){
                                    echo " <a href=\"#\" class=\"btn btn-md overlay-btn disabled\"><span class=\"glyphicon glyphicon-trash\"></span></a>";
                                }
                                ?>
                            </a>
                        </div>
                        <div class="col-lg3 col-md-4 col-sm-4 col-xs-6" align="center">
                            <a href="#" class="thumbnail">
                                <canvas class="preview-scene shape" id="../shapes/simpleTree.json"></canvas>
                                <?php
                                if($projectType === "general"){
                                    echo " <a href=\"#\" class=\"btn btn-md overlay-btn disabled\"><span class=\"glyphicon glyphicon-trash\"></span></a>";
                                }
                                ?>
                            </a>
                        </div>
                        <div class="col-lg3 col-md-4 col-sm-4 col-xs-6" align="center">
                            <a href="#" class="thumbnail">
                                <canvas class="preview-scene shape" id="../shapes/house.json"></canvas>
                                <?php
                                if($projectType === "general"){
                                    echo " <a href=\"#\" class=\"btn btn-md overlay-btn disabled\"><span class=\"glyphicon glyphicon-trash\"></span></a>";
                                }
                                ?>
                            </a>
                        </div>
                    </div>
                </div>
                <div id="selectable-textures" style="display: none;">
                    <div class="row" id="selectable-textures-row">

                    </div>
                </div>

<!--                <div id="selectable-music" style="display: none;">-->
<!--                    <div class="row" id="selectable-music-row">-->
<!---->
<!--                    </div>-->
<!--                </div>-->
            </div>
        </div>

        <!-- Nav Bar Editor/Logic/Sound -->
        <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12" id="right-window" style="padding: 0 0 0 0">
            <nav class="navbar navbar-default navbar-static-top" style="margin-bottom: 0">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-2" aria-expanded="false">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#"><img style="margin-top: -27%; height: 45px"
                                                              src="../assets/img/design/SettingsIcon.png"></a>
                    </div>
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                        <ul class="nav navbar-nav editor-navbar">
                            <li class="active"><a href="#">Editor</a></li>
                            <li><a href="#">Logic</a></li>
                            <!--<li><a href="#">Sound</a></li>-->
                        </ul>
                    </div>
                </div>
            </nav>

            <!-- Editor/Logic/Sound -->
            <div class="container-fluid col-lg-12 col-md-12 col-sm-12 col-xs-12" id="editor-area">
                <!-- EDITOR -->
                <!-- Saved shape Canvas container -->
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" id="saved-shape-container">
                    <div align="center" id="saved-shape-canvas-container">
                        <!-- User saved shapes png preview images -->

                    </div>
                </div>

                <!-- Editor-preview window Color & Texture pickers and more -->
                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9" id="editor-container">
                    <!-- WEB GL Canvas editor area -->
                    <div align="center">
                        <canvas id="editor-scene"></canvas>
                    </div>

                    <!-- Selector between Texture, Color picker and Light setter -->
                    <div align="center" class="form-group" style="padding-bottom: 5%">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="input-group">
                                <div id="radioBtn" class="btn-group">
                                    <a class="btn btn-primary btn-sm active" id="color-radioBtn" data-toggle="picker"
                                       data-title="Color">Color</a>
                                    <a class="btn btn-primary btn-sm notActive" id="texture-radioBtn"
                                       data-toggle="picker" data-title="Texture">Texture</a>
                                    <a class="btn btn-primary btn-sm notActive" id="opacity-radioBtn"
                                       data-toggle="picker" data-title="Opacity">Opacity</a>
                                    <a class="btn btn-primary btn-sm notActive" id="lightning-radioBtn"
                                       data-toggle="picker" data-title="Lightning">Lightning</a>
                                </div>
                                <input type="hidden" name="editor-picker" id="picker">
                            </div>
                        </div>
                    </div>

                    <!-- Color picker -->
                    <div align="center" class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="color-picker">
                        <h4>Color</h4>
                        <p>R &nbsp; &nbsp; <input type="text" class="span2" value="" data-slider-min="0"
                                                  data-slider-max="1" data-slider-step="0.025" data-slider-value="0.5"
                                                  data-slider-id="RC" id="R" data-slider-tooltip="hide"
                                                  data-slider-handle="square"/></p>
                        <p>G &nbsp; &nbsp; <input type="text" class="span2" value="" data-slider-min="0"
                                                  data-slider-max="1" data-slider-step="0.025" data-slider-value="0.5"
                                                  data-slider-id="GC" id="G" data-slider-tooltip="hide"
                                                  data-slider-handle="square"/></p>
                        <p>B &nbsp; &nbsp; <input type="text" class="span2" value="" data-slider-min="0"
                                                  data-slider-max="1" data-slider-step="0.025" data-slider-value="0.5"
                                                  data-slider-id="BC" id="B" data-slider-tooltip="hide"
                                                  data-slider-handle="square"/></p>
                    </div>

                    <!-- Texture picker -->
                    <div align="center" class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="texture-picker"
                         style="display: none;">
                        <h4>Textures</h4>
                        <div class="row" id="texture-picker-row">
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 texture-padding">
                                <a href="#" class="thumbnail">
                                    <img src="../assets/img/textures/sun.jpg" class="img-rounded inline-block texture"
                                         alt="../assets/img/textures/sun.jpg">
                                </a>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 texture-padding">
                                <a href="#" class="thumbnail">
                                    <img src="../assets/img/textures/metal.jpg" class="img-rounded inline-block texture"
                                         alt="../assets/img/textures/metal.jpg">
                                </a>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 texture-padding">
                                <a href="#" class="thumbnail">
                                    <img src="../assets/img/textures/carbon_fiber.jpg"
                                         class="img-rounded inline-block texture"
                                         alt="../assets/img/textures/carbon_fiber.jpg">
                                </a>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 texture-padding">
                                <a href="#" class="thumbnail">
                                    <img src="../assets/img/textures/wood.jpg" class="img-rounded inline-block texture"
                                         alt="../assets/img/textures/wood.jpg">
                                </a>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 texture-padding">
                                <a href="#" class="thumbnail">
                                    <img src="../assets/img/textures/leather.jpg"
                                         class="img-rounded inline-block texture"
                                         alt="../assets/img/textures/leather.jpg">
                                </a>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 texture-padding">
                                <a href="#" class="thumbnail">
                                    <img src="../assets/img/textures/asphalt.jpg"
                                         class="img-rounded inline-block texture"
                                         alt="../assets/img/textures/asphalt.jpg">
                                </a>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 texture-padding">
                                <a href="#" class="thumbnail">
                                    <img src="../assets/img/textures/glass.jpg" class="img-rounded inline-block texture"
                                         alt="../assets/img/textures/glass.jpg">
                                </a>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 texture-padding">
                                <a href="#" class="thumbnail">
                                    <img src="../assets/img/textures/grass.jpg" class="img-rounded inline-block texture"
                                         alt="../assets/img/textures/grass.jpg">
                                </a>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 texture-padding">
                                <a href="#" class="thumbnail">
                                    <img src="../assets/img/textures/lava.jpg" class="img-rounded inline-block texture"
                                         alt="../assets/img/textures/lava.jpg">
                                </a>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 texture-padding">
                                <a href="#" class="thumbnail">
                                    <img src="../assets/img/textures/molten_lava.jpg"
                                         class="img-rounded inline-block texture"
                                         alt="../assets/img/textures/molten_lava.jpg">
                                </a>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 texture-padding">
                                <a href="#" class="thumbnail">
                                    <img src="../assets/img/textures/snow.jpg" class="img-rounded inline-block texture"
                                         alt="../assets/img/textures/snow.jpg">
                                </a>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 texture-padding">
                                <a href="#" class="thumbnail">
                                    <img src="../assets/img/textures/house.png" class="img-rounded inline-block texture"
                                         alt="../assets/img/textures/house.png">
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Opacity slider -->
                    <div align="center" class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="opacity">
                        <h4>Opacity</h4>
                        <div id="opacity-slider" class=".rs-bg-color .rs-range-color .rs-border .rs-handle"></div>
                    </div>

                    <!-- Light sliders -->
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" id="light-control">

                        <div align="center" id="ambient-light-full">
                            <h4>Ambient light</h4>
                            <input type="text" class="span2" value="" data-slider-min="0" data-slider-max="1"
                                   data-slider-step="0.025" data-slider-value="0.5" data-slider-id="RC" id="R-ambient"
                                   data-slider-tooltip="hide" data-slider-handle="square"
                                   data-slider-orientation="vertical"/>
                            <input type="text" class="span2" value="" data-slider-min="0" data-slider-max="1"
                                   data-slider-step="0.025" data-slider-value="0.5" data-slider-id="GC" id="G-ambient"
                                   data-slider-tooltip="hide" data-slider-handle="square"
                                   data-slider-orientation="vertical"/>
                            <input type="text" class="span2" value="" data-slider-min="0" data-slider-max="1"
                                   data-slider-step="0.025" data-slider-value="0.5" data-slider-id="BC" id="B-ambient"
                                   data-slider-tooltip="hide" data-slider-handle="square"
                                   data-slider-orientation="vertical"/>
                        </div>
                        <div align="center" id="ambient-light-combined" style="display: none">
                            <h4>Combined ambient light</h4>
                            <input type="text" class="span2" value="" data-slider-min="0" data-slider-max="1"
                                   data-slider-step="0.025" data-slider-value="0.5" data-slider-id="combined"
                                   id="combined-light" data-slider-tooltip="hide" data-slider-handle="square"
                                   data-slider-orientation="vertical"/>
                        </div>
                        <div align="center" class="checkbox">
                            <label><input id="use-combine-ambient" type="checkbox" value="">Combine sliders</label>
                        </div>
                        <div align="center" class="checkbox">
                            <label><input id="use-light" type="checkbox" name="light" value="lightning" checked>Use
                                Light</label>
                        </div>
                    </div>

                    <!-- Point light sliders -->
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" id="light-control-additional">
                        <div align="center">
                            <h4>Point light</h4>
                            <div>
                                <input type="text" class="span2" value="" data-slider-min="0" data-slider-max="1"
                                       data-slider-step="0.025" data-slider-value="0.2" data-slider-id="RC" id="R-point"
                                       data-slider-tooltip="hide" data-slider-handle="square"
                                       data-slider-orientation="vertical"/>
                                <input type="text" class="span2" value="" data-slider-min="0" data-slider-max="1"
                                       data-slider-step="0.025" data-slider-value="0.2" data-slider-id="GC" id="G-point"
                                       data-slider-tooltip="hide" data-slider-handle="square"
                                       data-slider-orientation="vertical"/>
                                <input type="text" class="span2" value="" data-slider-min="0" data-slider-max="1"
                                       data-slider-step="0.025" data-slider-value="0.2" data-slider-id="BC" id="B-point"
                                       data-slider-tooltip="hide" data-slider-handle="square"
                                       data-slider-orientation="vertical"/>
                                <div align="center">
                                    <div align="center" class="checkbox">
                                        <label><input id="use-animation" type="checkbox" value="animation" checked>Use
                                            Animation</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Rotation sliders -->
                    <div align="center" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" id="rotation-control">
                        <h4>Shape rotation</h4>
                        <p>X &nbsp; &nbsp; <input type="text" class="span2" value="" data-slider-min="0"
                                                  data-slider-max="360" data-slider-step="2" data-slider-value="0"
                                                  data-slider-id="XC" id="X-RotationSlider" data-slider-tooltip="hide"
                                                  data-slider-handle="round"/></p>
                        <p>Y &nbsp; &nbsp; <input type="text" class="span2" value="" data-slider-min="0"
                                                  data-slider-max="360" data-slider-step="2" data-slider-value="40"
                                                  data-slider-id="XC" id="Y-RotationSlider" data-slider-tooltip="hide"
                                                  data-slider-handle="round"/></p>
                        <p>Z &nbsp; &nbsp; <input type="text" class="span2" value="" data-slider-min="0"
                                                  data-slider-max="360" data-slider-step="2" data-slider-value="0"
                                                  data-slider-id="XC" id="Z-RotationSlider" data-slider-tooltip="hide"
                                                  data-slider-handle="round"/></p>
                    </div>

                    <!-- Button to save object -->
                    <div align="center" class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom: 2.5%">
                        <?php
                        if($projectType == "general") {
                            echo "<button id=\"saveShape\" class=\"btn btn-primary btn-sm add-your-shape-button\">";
                            echo "<span class=\"glyphicon glyphicon-floppy-save\"></span> Save";
                            echo "</button>";
                        }
                        ?>
                    </div>
                </div>
                <!-- END EDITOR -->

                <!-- LOGIC -->

                <!-- CODE BLOCKS -->
                <div id="code-blocks-div" class="col-lg-3 col-md-4 col-sm-3 col-xs-3" style="display: none">
                    <!-- SELECTION BOX -->
                    <svg id="code-logic-selector"
                         xmlns="http://www.w3.org/2000/svg"
                         version="1.1"
                         width="250px" height="3200px">

                        <!-- TRIGGERS -->
                        <text x="45" y="15" fill="#ea640b" transform="scale(1.5)">Triggers</text>
                        <!-- On Save Code -->
                        <g transform="matrix(1 0 0 1 0 30)"
                           class="trigger">
                            <path d="M 0 34.652 L 199.879 34.73 C 258.782 34.137 245.231
                                     -0.498 200 0.005 L 31.522 0.005 L 0 34.652 Z" fill="green" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="50" y="24" font-size="20">
                                On Apply Code
                            </text>
                            <text class="code-id"
                                  x="0" y="0">on start</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- On Frame Start -->
                        <g transform="matrix(1 0 0 1 0 90)"
                           class="trigger">
                            <path d="M 0 34.652 L 199.879 34.73 C 258.782 34.137 245.231
                                     -0.498 200 0.005 L 31.522 0.005 L 0 34.652 Z" fill="green" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="30" y="24" font-size="20">
                                Frames
                            </text>
                            <foreignObject x="100" y="6" width="60" height="30">
                                <select class="code-selection-inequality-operator" title="Key selection">
                                    <option value=">">></option>
                                    <option value="<"><</option>
                                    <option value="!==">!==</option>
                                    <option value="===">===</option>
                                    <option value=">=">>=</option>
                                    <option value="<="><=</option>
                                </select>
                            </foreignObject>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="frame" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">on frame</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- On Key Down -->
                        <g transform="matrix(1 0 0 1 0 150)"
                           class="trigger">
                            <path d="M 0 34.652 L 199.879 34.73 C 258.782 34.137 245.231
                                     -0.498 200 0.005 L 31.522 0.005 L 0 34.652 Z" fill="green" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="30" y="24" font-size="20">
                                Key Down
                            </text>
                            <foreignObject x="145" y="6" width="90" height="30">
                                <select class="code-selection" title="Key selection">
                                    <option value="w">W</option>
                                    <option value="a">A</option>
                                    <option value="s">S</option>
                                    <option value="d">D</option>
                                    <option value="q">Q</option>
                                    <option value="e">E</option>
                                    <option value="lshift">Lshift</option>
                                    <option value="space">Space</option>
                                    <option value="r">R</option>
                                    <option value="t">T</option>
                                    <option value="g">G</option>
                                    <option value="v">V</option>
                                    <option value="z">Z</option>
                                    <option value="c">C</option>
                                    <option value="x">X</option>
                                </select>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">on key</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- On Key Up -->
                        <g transform="matrix(1 0 0 1 0 210)"
                           class="trigger">
                            <path d="M 0 34.652 L 199.879 34.73 C 258.782 34.137 245.231
                                     -0.498 200 0.005 L 31.522 0.005 L 0 34.652 Z" fill="green" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="30" y="24" font-size="20">
                                Key Up
                            </text>
                            <foreignObject x="145" y="6" width="90" height="30">
                                <select class="code-selection" title="Key selection">
                                    <option value="w">W</option>
                                    <option value="a">A</option>
                                    <option value="s">S</option>
                                    <option value="d">D</option>
                                    <option value="q">Q</option>
                                    <option value="e">E</option>
                                    <option value="lshift">Lshift</option>
                                    <option value="space">Space</option>
                                    <option value="r">R</option>
                                    <option value="t">T</option>
                                    <option value="g">G</option>
                                    <option value="v">V</option>
                                    <option value="z">Z</option>
                                    <option value="c">C</option>
                                    <option value="x">X</option>
                                </select>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">on keyup</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- On every Frame Repeat -->
                        <g transform="matrix(1 0 0 1 0 270)"
                           class="trigger">
                            <path d="M 0 34.652 L 199.879 34.73 C 258.782 34.137 245.231
                                     -0.498 200 0.005 L 31.522 0.005 L 0 34.652 Z" fill="green" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="30" y="24" font-size="20">
                                Repeat at Fr.
                            </text>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="frame" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">on repeat</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- On X -->
                        <g transform="matrix(1 0 0 1 0 330)"
                           class="trigger">
                            <path d="M 0 34.652 L 199.879 34.73 C 258.782 34.137 245.231
                                     -0.498 200 0.005 L 31.522 0.005 L 0 34.652 Z" fill="green" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="30" y="24" font-size="20">
                                On X
                            </text>
                            <foreignObject x="100" y="6" width="60" height="30">
                                <select class="code-selection-inequality-operator" title="Key selection">
                                    <option value=">">></option>
                                    <option value="<"><</option>
                                    <option value="!==">!==</option>
                                    <option value="===">===</option>
                                    <option value=">=">>=</option>
                                    <option value="<="><=</option>
                                </select>
                            </foreignObject>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="coordinate" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">on x</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- On Y -->
                        <g transform="matrix(1 0 0 1 0 390)"
                           class="trigger">
                            <path d="M 0 34.652 L 199.879 34.73 C 258.782 34.137 245.231
                                     -0.498 200 0.005 L 31.522 0.005 L 0 34.652 Z" fill="green" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="30" y="24" font-size="20">
                                On Y
                            </text>
                            <foreignObject x="100" y="6" width="60" height="30">
                                <select class="code-selection-inequality-operator" title="Key selection">
                                    <option value=">">></option>
                                    <option value="<"><</option>
                                    <option value="!==">!==</option>
                                    <option value="===">===</option>
                                    <option value=">=">>=</option>
                                    <option value="<="><=</option>
                                </select>
                            </foreignObject>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="coordinate" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">on y</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- On Z -->
                        <g transform="matrix(1 0 0 1 0 450)"
                           class="trigger">
                            <path d="M 0 34.652 L 199.879 34.73 C 258.782 34.137 245.231
                                     -0.498 200 0.005 L 31.522 0.005 L 0 34.652 Z" fill="green" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="30" y="24" font-size="20">
                                On Z
                            </text>
                            <foreignObject x="100" y="6" width="60" height="30">
                                <select class="code-selection-inequality-operator" title="Key selection">
                                    <option value=">">></option>
                                    <option value="<"><</option>
                                    <option value="!==">!==</option>
                                    <option value="===">===</option>
                                    <option value=">=">>=</option>
                                    <option value="<="><=</option>
                                </select>
                            </foreignObject>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="coordinate" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">on z</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- END TRIGGERS -->

                        <!-- LOOPS -->
                        <text x="45" y="340" fill="#ea640b" transform="scale(1.5)">Loops</text>
                        <!-- For every element -->
                        <g transform="matrix(1 0 0 1 0 520)"
                           class="">
                            <path d="M 12.062 34.73 L 215.922 34.154 C 245.481 33.561 240.969
                                     -0.498 215.922 0.005 L 0 0.416 L 12.062 34.73 Z" fill="#7673d6" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                For Every Shape
                            </text>
                            <text class="code-id"
                                  x="0" y="0">for all</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- For every specific type of element -->
                        <g transform="matrix(1 0 0 1 0 580)"
                           class="">
                            <path d="M 12.062 34.73 L 215.922 34.154 C 245.481 33.561 240.969
                                     -0.498 215.922 0.005 L 0 0.416 L 12.062 34.73 Z" fill="#7673d6" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                For Every
                            </text>
                            <foreignObject x="130" y="6" width="90" height="30">
                                <select class="code-selection select-specific-svg" title="Select Shape Type">
                                    <option value="cube">Cube</option>
                                    <option value="sphere">Sphere</option>
                                    <option value="simpleSphere">S.Sphere</option>
                                    <option value="cone">Cone</option>
                                    <option value="house">House</option>
                                    <option value="simpleTree">S.Tree</option>
                                    <option value="pineTree">Pine Tree</option>
                                    <option value="christmasTree">Ch.Tree</option>
                                </select>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">for specific</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- For every element with specific name -->
                        <g transform="matrix(1 0 0 1 0 640)"
                           class="">
                            <path d="M 12.062 34.73 L 215.922 34.154 C 245.481 33.561 240.969
                                     -0.498 215.922 0.005 L 0 0.416 L 12.062 34.73 Z" fill="#7673d6" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                For Specific
                            </text>
                            <foreignObject x="130" y="6" width="90" height="30">
                                <select class="code-selection select-name-svg" title="Select Shape Name">
                                    <option value="name">Name</option>
                                </select>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">for name</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- END LOOPS -->

                        <!-- SETTERS -->
                        <text x="45" y="465" fill="#ea640b" transform="scale(1.5)">Setters</text>
                        <!-- Set X -->
                        <g transform="matrix(1 0 0 1 0 710)"
                           class="">
                            <path d="M 7.625 34.731 L 136.49 34.155 C 155.176 33.562 152.324
                                    -0.496 136.49 0.006 L 0 0.418 L 7.625 34.731 Z" fill="#d068f9" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set X
                            </text>
                            <foreignObject x="80" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="coordinate" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set x</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set Y -->
                        <g transform="matrix(1 0 0 1 0 770)"
                           class="">
                            <path d="M 7.625 34.731 L 136.49 34.155 C 155.176 33.562 152.324
                                    -0.496 136.49 0.006 L 0 0.418 L 7.625 34.731 Z" fill="#d068f9" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set Y
                            </text>
                            <foreignObject x="80" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="coordinate" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set y</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set Z -->
                        <g transform="matrix(1 0 0 1 0 830)"
                           class="">
                            <path d="M 7.625 34.731 L 136.49 34.155 C 155.176 33.562 152.324
                                    -0.496 136.49 0.006 L 0 0.418 L 7.625 34.731 Z" fill="#d068f9" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set Z
                            </text>
                            <foreignObject x="80" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="coordinate" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set z</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set SX -->
                        <g transform="matrix(1 0 0 1 0 890)"
                           class="">
                            <path d="M 7.625 34.731 L 136.49 34.155 C 155.176 33.562 152.324
                                    -0.496 136.49 0.006 L 0 0.418 L 7.625 34.731 Z" fill="#4da558" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set SX
                            </text>
                            <foreignObject x="85" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="size" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set sx</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set SY -->
                        <g transform="matrix(1 0 0 1 0 950)"
                           class="">
                            <path d="M 7.625 34.731 L 136.49 34.155 C 155.176 33.562 152.324
                                    -0.496 136.49 0.006 L 0 0.418 L 7.625 34.731 Z" fill="#4da558" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set SY
                            </text>
                            <foreignObject x="85" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="size" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set sy</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set SZ -->
                        <g transform="matrix(1 0 0 1 0 1010)"
                           class="">
                            <path d="M 7.625 34.731 L 136.49 34.155 C 155.176 33.562 152.324
                                    -0.496 136.49 0.006 L 0 0.418 L 7.625 34.731 Z" fill="#4da558" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set SZ
                            </text>
                            <foreignObject x="85" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="size" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set sz</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set XRot -->
                        <g transform="matrix(1 0 0 1 0 1070)"
                           class="">
                            <path d="M 10.197 34.73 L 182.538 34.154 C 207.527 33.561 203.713
                                    -0.497 182.538 0.005 L 0 0.417 L 10.197 34.73 Z" fill="orange" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                X Rotation
                            </text>
                            <foreignObject x="120" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set xrot</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set YRot -->
                        <g transform="matrix(1 0 0 1 0 1130)"
                           class="">
                            <path d="M 10.197 34.73 L 182.538 34.154 C 207.527 33.561 203.713
                                    -0.497 182.538 0.005 L 0 0.417 L 10.197 34.73 Z" fill="orange" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Y Rotation
                            </text>
                            <foreignObject x="120" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set yrot</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set ZRot -->
                        <g transform="matrix(1 0 0 1 0 1190)"
                           class="">
                            <path d="M 10.197 34.73 L 182.538 34.154 C 207.527 33.561 203.713
                                    -0.497 182.538 0.005 L 0 0.417 L 10.197 34.73 Z" fill="orange" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Z Rotation
                            </text>
                            <foreignObject x="120" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set zrot</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set X Rotation Speed -->
                        <g transform="matrix(1 0 0 1 0 1250)"
                           class="">
                            <path d="M 12.062 34.73 L 215.922 34.154 C 245.481 33.561 240.969
                                     -0.498 215.922 0.005 L 0 0.416 L 12.062 34.73 Z" fill="#a86508" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                X Rot. Speed
                            </text>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set xrotspeed</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set Y Rotation Speed -->
                        <g transform="matrix(1 0 0 1 0 1310)"
                           class="">
                            <path d="M 12.062 34.73 L 215.922 34.154 C 245.481 33.561 240.969
                                     -0.498 215.922 0.005 L 0 0.416 L 12.062 34.73 Z" fill="#a86508" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Y Rot. Speed
                            </text>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set yrotspeed</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set Z Rotation Speed -->
                        <g transform="matrix(1 0 0 1 0 1370)"
                           class="">
                            <path d="M 12.062 34.73 L 215.922 34.154 C 245.481 33.561 240.969
                                     -0.498 215.922 0.005 L 0 0.416 L 12.062 34.73 Z" fill="#a86508" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Z Rot. Speed
                            </text>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set zrotspeed</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set R -->
                        <g transform="matrix(1 0 0 1 0 1430)"
                           class="">
                            <path d="M 7.625 34.731 L 136.49 34.155 C 155.176 33.562 152.324
                                    -0.496 136.49 0.006 L 0 0.418 L 7.625 34.731 Z" fill="#c10023" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set R
                            </text>
                            <foreignObject x="80" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set r</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set G -->
                        <g transform="matrix(1 0 0 1 0 1490)"
                           class="">
                            <path d="M 7.625 34.731 L 136.49 34.155 C 155.176 33.562 152.324
                                    -0.496 136.49 0.006 L 0 0.418 L 7.625 34.731 Z" fill="#009102" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set G
                            </text>
                            <foreignObject x="80" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set g</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set B -->
                        <g transform="matrix(1 0 0 1 0 1550)"
                           class="">
                            <path d="M 7.625 34.731 L 136.49 34.155 C 155.176 33.562 152.324
                                    -0.496 136.49 0.006 L 0 0.418 L 7.625 34.731 Z" fill="#036bba" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set B
                            </text>
                            <foreignObject x="80" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set b</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set Ambient R -->
                        <g transform="matrix(1 0 0 1 0 1610)"
                           class="">
                            <path d="M 12.062 34.73 L 215.922 34.154 C 245.481 33.561 240.969
                                     -0.498 215.922 0.005 L 0 0.416 L 12.062 34.73 Z" fill="#c10023" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set Ambient R
                            </text>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set ambientr</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set Ambient G -->
                        <g transform="matrix(1 0 0 1 0 1670)"
                           class="">
                            <path d="M 12.062 34.73 L 215.922 34.154 C 245.481 33.561 240.969
                                     -0.498 215.922 0.005 L 0 0.416 L 12.062 34.73 Z" fill="#009102" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set Ambient G
                            </text>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set ambientg</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set Ambient B -->
                        <g transform="matrix(1 0 0 1 0 1730)"
                           class="">
                            <path d="M 12.062 34.73 L 215.922 34.154 C 245.481 33.561 240.969
                                     -0.498 215.922 0.005 L 0 0.416 L 12.062 34.73 Z" fill="#036bba" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set Ambient B
                            </text>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set ambientb</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set Point R -->
                        <g transform="matrix(1 0 0 1 0 1790)"
                           class="">
                            <path d="M 12.062 34.73 L 215.922 34.154 C 245.481 33.561 240.969
                                     -0.498 215.922 0.005 L 0 0.416 L 12.062 34.73 Z" fill="#c10023" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set Point &#9728 R
                            </text>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set pointr</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set Point G -->
                        <g transform="matrix(1 0 0 1 0 1850)"
                           class="">
                            <path d="M 12.062 34.73 L 215.922 34.154 C 245.481 33.561 240.969
                                     -0.498 215.922 0.005 L 0 0.416 L 12.062 34.73 Z" fill="#009102" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set Point &#9728 G
                            </text>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set pointg</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set Point B -->
                        <g transform="matrix(1 0 0 1 0 1910)"
                           class="">
                            <path d="M 12.062 34.73 L 215.922 34.154 C 245.481 33.561 240.969
                                     -0.498 215.922 0.005 L 0 0.416 L 12.062 34.73 Z" fill="#036bba" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set Point &#9728 B
                            </text>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set pointb</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set Point X -->
                        <g transform="matrix(1 0 0 1 0 1970)"
                           class="">
                            <path d="M 12.062 34.73 L 215.922 34.154 C 245.481 33.561 240.969
                                     -0.498 215.922 0.005 L 0 0.416 L 12.062 34.73 Z" fill="#e2c531" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set Point &#9728 X
                            </text>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set pointx</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set Point Y -->
                        <g transform="matrix(1 0 0 1 0 2030)"
                           class="">
                            <path d="M 12.062 34.73 L 215.922 34.154 C 245.481 33.561 240.969
                                     -0.498 215.922 0.005 L 0 0.416 L 12.062 34.73 Z" fill="#e2c531" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set Point &#9728 Y
                            </text>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set pointy</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set Point Z -->
                        <g transform="matrix(1 0 0 1 0 2090)"
                           class="">
                            <path d="M 12.062 34.73 L 215.922 34.154 C 245.481 33.561 240.969
                                     -0.498 215.922 0.005 L 0 0.416 L 12.062 34.73 Z" fill="#e2c531" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Set Point &#9728 Z
                            </text>
                            <foreignObject x="160" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set pointz</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>

                        <g transform="matrix(1 0 0 1 0 2150)"
                           class="">
                            <path d="M 10.197 34.73 L 182.538 34.154 C 207.527 33.561 203.713
                                    -0.497 182.538 0.005 L 0 0.417 L 10.197 34.73 Z" fill="#3cc6d8" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Opacity
                            </text>
                            <foreignObject x="120" y="4" width="60" height="30">
                                <form>
                                    <input class="code-input" title="value" type="text" value="0"/>
                                </form>
                            </foreignObject>
                            <text class="code-id"
                                  x="0" y="0">set opacity</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Set to camera -->
                         <g transform="matrix(1 0 0 1 0 2210)"
                           class="">
                            <path d="M 10.197 34.73 L 182.538 34.154 C 207.527 33.561 203.713
                                    -0.497 182.538 0.005 L 0 0.417 L 10.197 34.73 Z" fill="#7b7c7c" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Assign Camera
                            </text>
                            <text class="code-id"
                                  x="0" y="0">set camera</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>
                        <!-- Unset to camera -->
                         <g transform="matrix(1 0 0 1 0 2270)"
                            class="">
                             <path d="M 10.197 34.73 L 182.538 34.154 C 207.527 33.561 203.713
                                     -0.497 182.538 0.005 L 0 0.417 L 10.197 34.73 Z" fill="#7b7c7c" stroke="black"
                                   stroke-width="2"></path>
                             <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                 Retract Camera
                             </text>
                             <text class="code-id"
                                   x="0" y="0">set camerafalse</text>
                             <text class="mktime"
                                   x="0" y="0"></text>
                             <text class="myChild"
                                   x="0" y="0"></text>
                             <text class="myFather"
                                   x="0" y="0"></text>
                         </g>
                         <!-- Don't use animation -->
                          <g transform="matrix(1 0 0 1 0 2330)"
                              class="">
                               <path d="M 12.062 34.73 L 215.922 34.154 C 245.481 33.561 240.969
                                        -0.498 215.922 0.005 L 0 0.416 L 12.062 34.73 Z" fill="#7b7c7c" stroke="black"
                                     stroke-width="2"></path>
                               <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                   Don't Use Animation
                               </text>
                               <text class="code-id"
                                     x="0" y="0">set animationfalse</text>
                               <text class="mktime"
                                     x="0" y="0"></text>
                               <text class="myChild"
                                     x="0" y="0"></text>
                               <text class="myFather"
                                     x="0" y="0"></text>
                           </g>
                           <!-- Use animation -->
                          <g transform="matrix(1 0 0 1 0 2390)"
                             class="">
                              <path d="M 10.197 34.73 L 182.538 34.154 C 207.527 33.561 203.713
                                      -0.497 182.538 0.005 L 0 0.417 L 10.197 34.73 Z" fill="#7b7c7c" stroke="black"
                                    stroke-width="2"></path>
                              <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                  Use Animation
                              </text>
                              <text class="code-id"
                                    x="0" y="0">set animationtrue</text>
                              <text class="mktime"
                                    x="0" y="0"></text>
                              <text class="myChild"
                                    x="0" y="0"></text>
                              <text class="myFather"
                                    x="0" y="0"></text>
                          </g>
                          <!-- Sum values -->
                         <g transform="matrix(1 0 0 1 0 2450)"
                            class="">
                             <path d="M 10.197 34.73 L 182.538 34.154 C 207.527 33.561 203.713
                                     -0.497 182.538 0.005 L 0 0.417 L 10.197 34.73 Z" fill="#7b7c7c" stroke="black"
                                   stroke-width="2"></path>
                             <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                 Sum All Values
                             </text>
                             <text class="code-id"
                                   x="0" y="0">set sumvalues</text>
                             <text class="mktime"
                                   x="0" y="0"></text>
                             <text class="myChild"
                                   x="0" y="0"></text>
                             <text class="myFather"
                                   x="0" y="0"></text>
                         </g>
                        <!-- Reset Frame Counter -->
                        <g transform="matrix(1 0 0 1 0 2510)"
                           class="">
                            <path d="M 10.197 34.73 L 182.538 34.154 C 207.527 33.561 203.713
                                     -0.497 182.538 0.005 L 0 0.417 L 10.197 34.73 Z" fill="#7b7c7c" stroke="black"
                                  stroke-width="2"></path>
                            <text class="basic-text-over-svg" x="20" y="24" font-size="20">
                                Reset Frames
                            </text>
                            <text class="code-id"
                                  x="0" y="0">set resetframes</text>
                            <text class="mktime"
                                  x="0" y="0"></text>
                            <text class="myChild"
                                  x="0" y="0"></text>
                            <text class="myFather"
                                  x="0" y="0"></text>
                        </g>


                         <!-- END SETTERS -->
                    </svg>
                </div>

                <!-- CODE SCENE-->
                <div id="code-scene-div" class="col-lg-9 col-md-8 col-sm-9 col-xs-9" style="display: none">
                    <svg id="code-logic-scene"
                         xmlns="http://www.w3.org/2000/svg"
                         version="1.1"
                         width="1000px" height="3000px">

                        <g class="nonjoinable trash-bin" transform="matrix(1 0 0 1 0 -20)" stroke="black"
                           stroke-width="2" style="position: absolute">
                            <path transform="scale(1.0)" d="M50,32.319c5.584,0,11.004,0.191,16.11,0.568c4.538,0.335,8.688,0.807,12.335,1.403c0.187,0.031,0.371,0.061,0.555,0.092
                                    l-4.644,56.935c-5.156,0.662-10.919,1.095-17.117,1.284H42.793c-6.229-0.189-11.992-0.622-17.148-1.284L21,34.382
                                    c0.184-0.031,0.369-0.062,0.556-0.092c3.645-0.596,7.794-1.067,12.333-1.403C38.994,32.51,44.415,32.319,50,32.319 M49.998,53.771
                                    l-9.977-9.96c-1.075-1.072-2.503-1.663-4.022-1.663s-2.947,0.59-4.022,1.663c-1.075,1.074-1.667,2.501-1.667,4.02
                                    c0,1.517,0.592,2.943,1.667,4.016l9.974,9.957l-9.974,9.956c-1.075,1.073-1.667,2.5-1.667,4.017c0,1.518,0.592,2.944,1.667,4.019
                                    c1.075,1.072,2.504,1.663,4.023,1.663c1.518,0,2.946-0.591,4.021-1.663l9.976-9.958l9.979,9.958
                                    c1.076,1.072,2.505,1.663,4.024,1.663s2.947-0.591,4.021-1.663c1.076-1.074,1.668-2.501,1.668-4.019
                                    c0-1.517-0.592-2.943-1.668-4.018l-9.975-9.955l9.975-9.957c1.075-1.072,1.668-2.499,1.668-4.016c0-1.518-0.592-2.946-1.668-4.02
                                    c-1.074-1.072-2.503-1.663-4.022-1.663s-2.948,0.59-4.022,1.663L49.998,53.771 M50,31.319c-5.645,0-11.119,0.197-16.185,0.571
                                    c-4.522,0.334-8.721,0.809-12.42,1.413c-0.498,0.081-0.986,0.165-1.465,0.252l4.785,58.648c4.94,0.666,10.983,1.183,18.048,1.398
                                    h14.476c7.063-0.216,13.107-0.732,18.048-1.398l4.783-58.648c-0.479-0.087-0.966-0.171-1.465-0.252
                                    c-3.699-0.604-7.896-1.079-12.422-1.413C61.117,31.516,55.645,31.319,50,31.319L50,31.319z M49.998,55.185l10.685-10.666
                                    c0.916-0.914,2.116-1.371,3.316-1.371s2.4,0.457,3.316,1.371c1.832,1.829,1.832,4.792,0,6.62L56.632,61.804l10.684,10.663
                                    c1.832,1.829,1.832,4.791,0,6.62c-0.915,0.914-2.115,1.371-3.314,1.371c-1.201,0-2.401-0.457-3.318-1.371L49.998,68.424
                                    L39.315,79.087C38.399,80.001,37.2,80.458,36,80.458c-1.201,0-2.401-0.457-3.317-1.371c-1.831-1.829-1.831-4.791,0-6.62
                                    l10.683-10.663L32.684,51.139c-1.831-1.827-1.831-4.791,0-6.62c0.916-0.914,2.115-1.371,3.315-1.371c1.2,0,2.4,0.457,3.316,1.371
                                    L49.998,55.185L49.998,55.185z"></path>
                            <text class="code-id"
                                  x="50" y="50">TRASHBIN</text>
                            <text class="mktime"
                                  x="50" y="50">trashbin</text>
                            <text class="myChild"
                                  x="50" y="50"></text>
                            <text class="myFather"
                                  x="50" y="50"></text>
                        </g>

                    </svg>
                </div>
                <div align="center">
                    <div id="logic-buttons" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label class="btn btn-primary" id="push-code-btn" data-toggle="tooltip" data-placement="top"
                               title="Apply your code" style="display: none">
                            <span class="glyphicon glyphicon-floppy-save"></span>
                        </label>
                        <?php
                        if($projectType == "general") {
                            echo "<label class=\"btn btn-primary\" id=\"upload-code-btn\" data-toggle=\"tooltip\" data-placement=\"top\"";
                            echo "title=\"Upload your code to server\" style=\"display: none\">";
                            echo "<span class=\"glyphicon glyphicon-save-file\"></span>";
                            echo "</label>";
                            echo "<label class=\"btn btn-primary\" id=\"clear-code-btn\" data-toggle=\"tooltip\" data-placement=\"top\"";
                            echo "title=\"Clear code area\" style=\"display: none\">";
                            echo "<span class=\"glyphicon glyphicon-remove\"></span>";
                            echo "</label>";
                        }
                        ?>

                        <label id="checkbox-label" class="form-check-speed-usage" for="checkSpeed"
                               style="display: none">Standard Movement</label>
                        <input type="checkbox" class="form-check-speed-usage" id="checkSpeed" style="display: none"
                               checked>

                        <label id="basic-speed-label" for="basic-speed-input" style="display: none">Speed:</label>
                        <input class="rounded-input" id="basic-speed-input" value="0.5" placeholder="1.2"
                               style="display: none">

                        <label id="rotation-speed-label" for="rotation-speed-input" style="display: none">Rot
                            Speed:</label>
                        <input class="rounded-input" id="rotation-speed-input" value="1.4" placeholder="0.2"
                               style="display: none">

                    </div>


                </div>
                <!-- END LOGIC -->

            </div><!-- Editor area closing tag -->

        </div><!-- Nav Bar Editor area closing tag -->


    </div>


</div>


</body>
</html>