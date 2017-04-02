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

//query to get data from the table
$query = sprintf("SELECT count(*) as AcessosConcedidos, month(DataHora), year(DataHora) as year FROM RegistoAcessos where YEAR(datahora) = YEAR(CURDATE())-1 or YEAR(datahora) = YEAR(CURDATE())-2 and ValidacaoAcesso like 'Acesso Concedido' group by month(DataHora), year(DataHora);");

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