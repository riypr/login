<?php
if (isset($_POST['submit'])) {
    include "connection.php";

    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    $stmt = $conn->prepare("SELECT * FROM user WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $username, $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if ($row) {
        if (password_verify($password, $row["password"])) {
            header("Location: welcome.php");
            exit();
        }
    } 

    echo '<script>
    alert("Invalid username or email");
    window.location.href="login.php";
    </script>';
}
?>
<html>
<head>
    <title>Login</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>
    <div class="form_container">
        <div class="overlay"></div>
        <div class="titlediv">
            <h1 class="title">LOGIN</h1>
            <span class="subtitle">WELCOME BACK!</span>
        </div>

        <form method="POST" action="welcome.php">
            <div class="row grid">
                <div class="row">
                    <label for="username">User Name / Email</label>
                    <input type="text" id="username" name="username" placeholder="Enter User Name or Email" required>
                </div>
                <div class="row">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter Your Password" required>
                </div>
                <div class="row">
                    <input type="submit" id="submitBtn" name="submit" value="Login">
                    <span>Don't have an account? <a href="signup.php">REGISTER</a></span>
                    <span>Go back to home page? <a href="index.php">HOME</a></span>
                </div>
            </div>
        </form>
    </div>
</body>
</html>


