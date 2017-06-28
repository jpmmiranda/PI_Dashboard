<?php
//setting header to json
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

require_once(dirname(__FILE__).'/connectionEventos.php');

$connection = new connection();
$connection->GetConnection();

if(!$connection->conn){

	die("Connection failed: " . $connection->conn->error);
}
mysqli_set_charset($connection->conn, "utf8");


 // Query that retrieves events
$query = sprintf("SELECT id,title,start,end,description FROM Eventos ORDER BY id;"); 

 
 // Execute the query

//execute query
$result = $connection->conn->query($query);

//loop through the returned data
$data = array();
foreach ($result as $row) {
	$data[] = $row;
}

//free memory associated with result
$result->close();

//close connection
$connection->conn->close();

//now print the data
print json_encode($data,JSON_UNESCAPED_UNICODE);
 // sending the encoded result to success page
?>