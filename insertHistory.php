<?php
    // Your database credentials
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "elozmenyek";


    // Create a new connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get the id of the record to be deleted from the 'history' table
    $id = $_POST['ID']; // replace with the actual id you want to delete
    

    $sql = "SELECT * FROM history WHERE ID='$id'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    echo json_encode($row);
    //echo "pont1: {$row['pont1']} pont1_2: {$row['pont1_2']} pont2: {$row['pont2']} pont2_2: {$row['pont2_2']}";

    

    // Close the statement and connection
    
    $conn->close();
?>