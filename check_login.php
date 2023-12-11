<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "elozmenyek";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get email from POST data
    $email = $_POST['email'];
    $password = $_POST['password'];
    // Check if email and pass exists in table
    $sql = "SELECT * FROM user WHERE email = '$email' and password='$password'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        
        $res=true;
        echo json_encode($res);
    } else {
        
        $res=false;
     echo json_encode($res);
    }

    // Close connection
    $conn->close();
?>