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



/* Values received via ajax */
$id = $_POST['id'];
$title = $_POST['title'];
$start = $_POST['start'];
$end = $_POST['end'];
$desc = $_POST['desc'];
$flag = $_POST['flag'];

if($flag==1){

	$query = sprintf("UPDATE Eventos SET title='$title', description='$desc' WHERE id='$id';");
	
}else{
 	// update the records
 	$query = sprintf("UPDATE Eventos SET title='$title', start='$start', end='$end', description='$desc' WHERE id='$id';");

}

//execute query

$connection->conn->query($query) ;

//close connection
$connection->conn->close();
?>