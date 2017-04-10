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


 // Query that retrieves events
 $requete = "SELECT id,title,start,end FROM Eventos ORDER BY id";

 
 // Execute the query
 $resultat = $connection->bdd->query($requete) or die(print_r($connection->bdd->errorInfo()));

 // sending the encoded result to success page
 echo json_encode($resultat->fetchAll(PDO::FETCH_ASSOC));
?>