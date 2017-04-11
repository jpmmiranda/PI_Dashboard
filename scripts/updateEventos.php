<?php
//setting header to json
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

require_once(dirname(__FILE__).'/connectionEventos.php');

$connection = new connection();
$connection->GetConnectionPDO();

if(!$connection->bdd){

	die("Connection failed: " . $connection->bdd->error);
}



/* Values received via ajax */
$id = $_POST['id'];
$title = $_POST['title'];
$start = $_POST['start'];
$end = $_POST['end'];

 // update the records
$sql = "UPDATE Eventos SET title=?, start=?, end=? WHERE id=?";
$q = $connection->bdd->prepare($sql);
$q->execute(array($title,$start,$end,$id));

?>