<?php
//setting header to json
header('Content-Type: application/json');

//database
require_once(dirname(__FILE__).'/connection.php');

$connection = new connection();
$connection->GetConnection();

if(!$connection->conn){
	die("Connection failed: " . $connection->conn->error);
}

mysqli_set_charset($connection->conn, "utf8");

$inicio = $_POST["de"];
$fim = $_POST["ate"];
//query to get data from the table
$query = sprintf("SELECT count(*) as AcessosConcedidos, Pilarete, EstadoEspiraE as ee, EstadoEspiraS as es  FROM RegistoAcessos where (DataHora between '$inicio' and '$fim')  and ValidacaoAcesso regexp '^Acesso Concedido' and (EstadoEspiraE like 'Entrada' or EstadoEspiraS like 'Saída')   group by Pilarete,EstadoEspiraE, EstadoEspiraS order by AcessosConcedidos desc ;");

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
print json_encode($data, JSON_UNESCAPED_UNICODE);
?>