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
            
            echo ('<tr><td>' . $row["pont1"]. '</td><td>' . $row["pont1_2"]. '</td><td>' . $row["pont2"]. '</td><td>' . $row["pont2_2"]. '</td><td><button onclick="deleteFromHistoryByID('.$row["ID"].')">Törlés</button></td><td><button onclick="toMap('.$row["ID"].')">Megnyitás</button></td></tr>');
            
        }
    } else {
        echo "</table>Nincsenek előzmények!";
        
    }

    $conn->close();
    ?>