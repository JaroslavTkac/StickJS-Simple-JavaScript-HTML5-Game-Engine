<?php
/**
 * Created by PhpStorm.
 * User: jaroslavtkaciuk
 * Date: 19/02/2018
 * Time: 19:36
 */

require '../php/register.php';
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


<div class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="pull-left" href="../index.php"><img style="height: 50px"
                                                          src="../assets/img/design/StickJSlogo.png"></a>
        </div>
        <div class="navbar-collapse collapse" id="navbar-main">
            <ul class="nav navbar-nav">
                <li><a href="../index.php">Home</a>
                </li>
                <li><a href="../index.php#creator-info">About</a>
                </li>
                <li><a href="users_projects.php">Users Projects</a>
                </li>
            </ul>
        </div>
    </div>
</div>

<div class="wrapper" align="center">
    <div class="col-lg-offset-4 col-lg-4 col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4" style="padding-top: 80px">
        <h2>Sign Up</h2>
        <p>Please fill this form to create an account.</p>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>Username</label>
                <input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Password</label>
                <input type="password" name="password" class="form-control" value="<?php echo $password; ?>">
                <span class="help-block"><?php echo $password_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
                <label>Confirm Password</label>
                <input type="password" name="confirm_password" class="form-control"
                       value="<?php echo $confirm_password; ?>">
                <span class="help-block"><?php echo $confirm_password_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Submit">
                <input type="reset" class="btn btn-default" value="Reset">
            </div>
        </form>
    </div>
</div>


<div class="col-lg-12 col-md-12 col-sm-12">
    <hr>
    <footer>
        <p>&copy; Jaroslav Tkaciuk <?php echo date("Y") ?></p>
    </footer>
</div>


<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
<script src="../assets/js/bootstrap.min.js"></script>
</body>
</html>