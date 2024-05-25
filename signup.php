<?php
if (isset($_POST['submit'])) {
    include "connection.php";
    
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $cpassword = trim($_POST['cpassword']);
    
    // Check if username or email already exists
    $stmt = $conn->prepare("SELECT * FROM user WHERE username=? OR email=?");
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $count = $result->num_rows;

    if ($count == 0) {
        if ($password === $cpassword) {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("INSERT INTO user (username, email, password) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $username, $email, $hash);
            $stmt->execute();

            header("Location: login.php");
            exit();
        } else {
            echo '<script>
            alert("Passwords do not match!");
            window.location.href="signup.php";
            </script>';
        }
    } else {
        echo '<script>
        alert("Username or email already exists!");
        window.location.href="signup.php";
        </script>';
    }
}
?>
<html>
<head>
    <title>Register</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>
    <div class="form_container">
        <div class="overlay"></div>
        <div class="titlediv">
            <h1 class="title">REGISTER</h1>
            <span class="subtitle">THANKS FOR CHOOSING US!</span>
        </div>

        <form method="POST" action="login.php">
            <div class="row grid">
                <div class="row">
                    <label for="username">User Name</label>
                    <input type="text" id="username" name="username" placeholder="Enter User Name" required>
                </div>
                <div class="row">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="Enter Your Email" required>
                </div>
                <div class="row">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter Your Password" required>
                </div>
                <div class="row">
                    <label for="cpassword">Confirm Password</label>
                    <input type="password" id="cpassword" name="cpassword" placeholder="Confirm Your Password" required>
                </div>
                <div class="row">
                    <input type="submit" id="submitBtn" name="submit" value="Register">
                    <span>Have an account already? <a href="login.php">LOGIN</a></span>
                    <span>Go back to Home page? <a href="index.php">HOME</a></span>
                </div>
            </div>
        </form>
    </div>
</body>
</html>

