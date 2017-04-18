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

$utilizador = $_POST["utilizador"];

//query to get data from the table
$query = sprintf("SELECT count(*) total,
    sum(case when EstadoEspiraE = 1 then 1 else 0 end) entradas,
    sum(case when EstadoEspiraS = 1 then 1 else 0 end) saidas
from RegistoAcessos
where Telefone = '$utilizador' and ValidacaoAcesso like 'Acesso Concedido';");

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
print json_encode($data);
?>