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


$inicio = $_POST["de"];
$fim = $_POST["ate"];
$listados = $_POST["listados"];


if($listados==null) $listados=".*";

//query to get data from the table
$query = sprintf("SELECT count(*) as AcessosConcedidos, RA.telefone as telemovel
	FROM RegistoAcessos as RA inner join Utentes as UT
		on RA.nContribuinte = UT.nContribuinte 
		where (DataHora between '$inicio' and '$fim') and UT.TipoUtente REGEXP '$listados' and ValidacaoAcesso like 'Acesso Concedido' group by RA.telefone order by AcessosConcedidos desc limit 10;");

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