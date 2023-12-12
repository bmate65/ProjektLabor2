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
    echo $id;
    // Delete the record
    $sql = 'DELETE  FROM history WHERE ID = ?';

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo "Record deleted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
?>