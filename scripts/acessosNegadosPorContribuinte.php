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

//query to get data from the table
$query = sprintf("SELECT count(*) as AcessosNaoConcedidos, nContribuinte FROM RegistoAcessos where year(DataHora)=2016 and (ValidacaoAcesso regexp '^Acesso Nao Concedido' or ValidacaoAcesso regexp '^Acesso Recusado') group by nContribuinte order by AcessosNaoConcedidos desc limit 10;");

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