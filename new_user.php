<?php
    $servername = "localhost";
    $username = "root";
    $password2 = "";
    $dbname = "elozmenyek";

    // Create connection
    $conn = new mysqli($servername, $username, $password2, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get email and password from POST data
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if email exists in table
    $sql = "SELECT * FROM user WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $res='Az email cim foglalt!';
        echo json_encode($res);
        //echo "Email already exists.";
    } else {
        // Insert new user into table
        $sql = "INSERT INTO user (email, password, lakcim)
                VALUES ('$email', '$password','NULL')";

        if ($conn->query($sql) === TRUE) {
            $res='Sikeres regisztracio!';
        echo json_encode($res);
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    
    $conn->close();
?>