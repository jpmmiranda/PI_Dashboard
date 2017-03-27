<?php
require_once('conexaoBD.php');

class theClass
{
   private $mysqli;

  function __construct($mysqli) {
    $this->mysqli = $mysqli;
  }

    function queryAcessosConcedidosMes()
  {
  $query = "SELECT * FROM Acessos";
    $stmt = $this->mysqli->prepare($query);
    stmt->execute();
    $stmt->bind_result($r);

    while($stmt->fetch())
    {
      echo $r . "<br>";
    }
  }
};
?>

//the SQL query to be executed
$query = "SELECT * FROM Acessos";

//storing the result of the executed query
$result = $conn->query($query);

//initialize the array to store the processed data
$jsonArray = array();

//check if there is any data returned by the SQL Query
if ($result->num_rows > 0) {
  //Converting the results into an associative array
  while($row = $result->fetch_assoc()) {
    $jsonArrayItem = array();
    $jsonArrayItem['label'] = $row['player'];
    $jsonArrayItem['value'] = $row['wickets'];
    //append the above created object into the main array.
    array_push($jsonArray, $jsonArrayItem);
  }
}

//Closing the connection to DB
$conn->close();

//set the response content type as JSON
header('Content-type: application/json');
//output the return value of json encode using the echo function. 
echo json_encode($jsonArray);