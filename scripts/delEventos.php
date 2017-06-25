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

$id = $_POST['id'];
$query = sprintf("DELETE from Eventos WHERE id='$id';");


//execute query

$connection->conn->query($query) ;

//close connection
$connection->conn->close();

?>

