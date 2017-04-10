<?php
//setting header to json
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
//database
require_once(dirname(__FILE__).'/connectionEventos.php');

$connection = new connection();
$connection->GetConnection();

if(!$connection->conn){

	die("Connection failed: " . $connection->conn->error);
}

$inicio = $_POST['start'];
$fim =$_POST['end'];
$nome=$_POST['title'];
//query to get data from the table
$query = sprintf("INSERT INTO `Eventos`(`nome`, `inicio`,`fim`) VALUES('$nome','$inicio','$fim');"); 
//execute query

$connection->conn->query($query);

//close connection
$connection->conn->close();
?>