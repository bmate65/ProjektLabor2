<?php

header('Content-Type: text/html; charset=utf-8');

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
    
    $pont1 = $_POST['pont1'];
    $pont1_2 = $_POST['pont1_2'];
    $pont2 = $_POST['pont2'];
    $pont2_2 = $_POST['pont2_2'];
    $user = $_POST['email'];

    // Check if the variables exist in table
    $sql = "SELECT * FROM history WHERE pont1='$pont1' and pont1_2='$pont1_2' and pont2='$pont2' and pont2_2='$pont2_2'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $res=1;
        echo json_encode($res);
        //echo "Email already exists.";
    } else {
        // Insert new user into table
        $sql = "INSERT INTO history (pont1,pont1_2,pont2,pont2_2,user)
                VALUES ('$pont1','$pont1_2','$pont2','$pont2_2','$user')";

        if ($conn->query($sql) === TRUE) {
            $res=0;
        echo json_encode($res);
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    
    $conn->close();
?>