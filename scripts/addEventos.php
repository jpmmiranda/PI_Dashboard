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
$descricao=$_POST['description'];

//query to get data from the table
if($descricao!="")
$query = sprintf("INSERT INTO `Eventos`(`title`, `start`,`end`,`description`) VALUES('$nome','$inicio','$fim','$descricao');"); 
else $query = sprintf("INSERT INTO `Eventos`(`title`, `start`,`end`) VALUES('$nome','$inicio','$fim');"); 

//execute query

$connection->conn->query($query) or die(print_r($connection->bdd->errorInfo()));

//close connection
$connection->conn->close();
?>