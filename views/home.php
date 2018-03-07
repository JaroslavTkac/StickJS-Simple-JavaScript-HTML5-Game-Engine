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
}
?>

<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <title>StickJS</title>
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
                    <?php echo "Welcome, " . "<b>" . "ID: " . $_SESSION['user_id'] . "  " . $_SESSION['username'] . "</b>" ?>
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

<!-- Carousel -->
<div id="theCarousel" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
        <li data-target="#theCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#theCarousel" data-slide-to="1"></li>
        <li data-target="#theCarousel" data-slide-to="2"></li>
    </ol>

    <!-- Define the text to place over the image -->
    <div class="carousel-inner">
        <div class="item active">
            <div class="slide1"></div>
            <div class="carousel-caption">
                <h1>Update 0.9.1</h1>
                <h3>Meet the alpha version of Blockly Code</h3>
                <br>
                <br>
                <br>
                <h2><a href="#update-log" class="btn btn-primary btn-sm">More info</a></h2>
            </div>
        </div>
        <div class="item">
            <div class="slide2"></div>
            <div class="carousel-caption">
                <h1>Experiencing difficulties?</h1>
                <br>
                <p>Do not know how to start?</p>
                <br>
                <h2><a href="demo.php" class="btn btn-primary btn-sm">Check our example</a></h2></div>
        </div>
        <div class="item">
            <div class="slide3"></div>
            <div class="carousel-caption">
                <h1>Update 0.9.0</h1>
                <h3>New UI/UX</h3>
                <h3>New interactive preview icons</h3>
                <h3>.obj loader / Import your models</h3>
                <h2><a href="#update-log" class="btn btn-primary btn-sm">More info</a></h2>
            </div>
        </div>
    </div>

    <!-- Set the actions to take when the arrows are clicked -->
    <a class="left carousel-control" href="#theCarousel" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left"> </span>
    </a>
    <a class="right carousel-control" href="#theCarousel" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right"></span>
    </a>
</div>

<hr>

<div class="jumbotron about">
    <div class="container-fluid">
        <div class="row">
            <h1 class="col-md-12 title">StickJS - easy & fun way to create simple 3D scenes</h1>
            <p class="col-md-push-3 col-md-6 "><strong>StickJS</strong> is some sort of Scratch, which allows for kids
                create simple games or scenes
                not just in 2D, but now also in 3D. Main feature of this engine is that it's developed
                on webgl, that support all modern browsers and you do not need to write code just simply
                combine blocks and get your result. It's as simple as it seems to be. Even 1th grade school
                student should be able to use it. In my opinion, this project could be great tool for teachers,
                who want to involve students in programing.</p>
            <div class="title col-md-12" style="text-align: center">
                <p class="col-md-push-3 col-md-6 " style="padding-top: 2%"><strong>StickJS</strong> source code you can
                    find
                    <a href="https://github.com/JaroslavTkac/StickJS-Simple-JavaScript-HTML5-Game-Engine">here</a> on my
                    github page.</p>
            </div>
            <div class="title col-md-12" style="text-align: center">
                <h2>Common don't be shy, try our example!</h2>
                <a href="demo.php" class="btn btn-primary btn-sm">Check our example</a>
            </div>
        </div>
    </div>
</div>

<hr>

<div class="jumbotron creator" id="creator-info">
    <div class="container">
        <div class="row">
            <h1 class="title col-md-12">Project Author</h1>.
            <div align="center" class="col-md-5 col-sm-12 col-xs-12">
                <img class="featurette-image img-fluid mx-auto img-circle" style="height: 250px"
                     src="../assets/img/design/Author.jpg" alt="Author photo">
            </div>
            <div class="col-md-7 col-sm-12 col-xs-12">
                <p>My name is Jaroslav Tkaciuk.
                    I am 4th course student of Vilnius university and it is my project.</p>
            </div>

        </div>
    </div>
</div>

<hr>

<div class="jumbotron update">
    <div class="container">
        <div class="row">
            <h1 class="title col-md-12">Update log</h1>
            <div id="update-log">
                <h2>0.9.1.2</h2>
                <hr class="update-hr">
                <ul>
                    <li>All three loops now working correctly.</li>
                    <li>Added 2 more buttons to blockly code section for future features.</li>
                    <li>Added 2 new setter blocks.</li>
                    <li>Now user created <b>blockly code</b> is automatically saving on server every 5 seconds and also
                        after any produced action with blocks.
                    </li>
                </ul>
                <h2>0.9.1.1</h2>
                <hr class="update-hr">
                <ul>
                    <li>Now possible to enlarge coding area with "Aspect ration" button.</li>
                    <li>Now you can save scene and reload it at anytime.</li>
                    <li>Opacity and Assign camera blocks now working correctly.</li>
                    <li>Minor fixes.</li>
                </ul>
                <h2>0.9.1.0</h2>
                <hr class="update-hr">
                <ul>
                    <li>Integrated alpha version of <b>blockly code</b>.</li>
                    <li>Improved web page loading speed, by compresing used images.</li>
                    <li>Minor bug fixes & security improvements.</li>
                    <li>Github link added to about section.</li>
                </ul>
                <h2>0.9.0.4</h2>
                <hr class="update-hr">
                <ul>
                    <li>Now you can upload any size texture, not only 128x128, 256x256, etc.</li>
                    <li>Editor UI/UX improvements, now editor section is less over crowded.</li>
                    <li>Added support for Q and E keys.</li>
                    <li>Added instruction how to use StickJS.</li>
                </ul>
                <h2>0.9.0.3</h2>
                <hr class="update-hr">
                <ul>
                    <li>Navigation bars fixed, now they do not overlaps other content.</li>
                    <li>Fixed bug, when uncached editor web page received thousands of WEBGL rendering errors from
                        shapes preview window.
                    </li>
                </ul>
                <h2>0.9.0.2</h2>
                <hr class="update-hr">
                <ul>
                    <li>Fixed bug, when after page refresh saved shape image name was ".".</li>
                </ul>
                <h2>0.9.0.1</h2>
                <hr class="update-hr">
                <ul>
                    <li>Updated shapes deleting, now when deleting shape from selectable window, shape also deleting
                        from everywhere.
                    </li>
                    <li>Bug fixes.</li>
                </ul>
                <h2>0.9.0.0</h2>
                <hr class="update-hr">
                <ul>
                    <li>New UX/UI.</li>
                    <li>Now instead of images of shapes you can actually see object in 3D and modify all objects at
                        once.
                    </li>
                    <li>Now you can import your objects in .obj format, but objects should be unwrapped and only one
                        object per file.
                    </li>
                    <li>Now you can import music files. (only mp3 files are supported)</li>
                    <li>Now you can import jpg and png files and use them as textures.</li>
                    <li>Now it's possible to save designed object from editor.</li>
                    <li>Now user before adding object give name to that object.</li>
                    <li>Now user can modify all objects at one, which were created from basic one.</li>
                    <li>Now everything (objects) that user made in his project saving as txt file in JSON format.</li>
                </ul>
                <hr class="update-hr">
            </div>
        </div>
    </div>
</div>


<hr>
<footer>
    <p>&copy; Jaroslav Tkaciuk <?php echo date("Y") ?></p>
</footer>


<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
<script src="../assets/js/bootstrap.min.js"></script>
</body>
</html>