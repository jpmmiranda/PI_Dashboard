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

$id = $_POST['id'];
$sql = "DELETE from Eventos WHERE id=".$id;
$q = $connection->bdd->prepare($sql);
$q->execute();

?>

