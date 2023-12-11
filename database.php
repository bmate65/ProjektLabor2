
<html>
<body>

<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "elozmenyek";

// Create connection
$conn = mysqli_connect($host, $username, $password,$database);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";


$sql = "SELECT * FROM elozmenyek";
        
        // Executing the query and storing the result
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            
          while ($row = mysqli_fetch_assoc($result)) {
              echo "ID: " . $row["pont1"] . " - Name: " . $row["pont2"] . "
      ";
          }
      } else {
          echo "0 results";
      }
?>