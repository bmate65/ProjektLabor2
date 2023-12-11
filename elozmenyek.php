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


    $email = $_POST['email'];
    // Execute SQL query
    $sql = "SELECT * FROM history WHERE user='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Output data of each row
        while($row = $result->fetch_assoc()) {
            
            echo json_encode('<tr onclick="toMap('.$row["ID"].')"><td>' . $row["pont1"]. '</td><td>' . $row["pont2"]. '</td><td>' . $row["user"].'</td></tr>');
            
        }
    } else {
        echo "Nincs semmi";
        
    }

    $conn->close();
    ?>