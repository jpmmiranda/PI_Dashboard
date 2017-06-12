<?php
//setting header to json
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
//database
require_once(dirname(__FILE__).'/connection.php');

$connection = new connection();
$connection->GetConnection();

if(!$connection->conn){
	die("Connection failed: " . $connection->conn->error);
}

mysqli_set_charset($connection->conn, "utf8");

$utilizador = $_POST["utilizador"];



//query to get data from the table
$query = sprintf("SELECT Utentes.Nome as nome, Utentes.Morada as morada, Utentes.Localidade as localidade, 
	Acessos.numTelf as telemovel, Utentes.Email as email, Utentes.ProcessoGD as processo, 
	Utentes.TipoUtente as tipo, Utentes.nContribuinte as contribuinte 
	FROM Utentes INNER JOIN Acessos ON Acessos.Contribuinte = Utentes.nContribuinte
		where Acessos.numTelf = '$utilizador' ");

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
?>

