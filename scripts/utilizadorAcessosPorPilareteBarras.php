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
$inicio = $_POST["de"];
$fim = $_POST["ate"];

//query to get data from the table

$query = sprintf("SELECT Pilarete as pilarete,
    sum(case when EstadoEspiraE = 'Entrada' and ValidacaoAcesso like 'Acesso Concedido' then 1 else 0 end) entradas,
    sum(case when EstadoEspiraS = 'Saída' and ValidacaoAcesso like 'Acesso Concedido' then 1 else 0 end) saidas
		from RegistoAcessos
		where Telefone = '$utilizador' and (DataHora between '$inicio' and '$fim') and (EstadoEspiraE = 'Entrada' OR EstadoEspiraS = 'Saída') group by(pilarete);");


//query to get data from the table
/*$query = sprintf("SELECT count(*) as AcessosConcedidos, Pilarete, EstadoEspiraE as ee, EstadoEspiraS as es  
			FROM RegistoAcessos 
			where (DataHora between '$inicio' and '$fim') and Telefone = '$utilizador'and ValidacaoAcesso regexp '^Acesso Concedido' and (EstadoEspiraE like 'Entrada' or EstadoEspiraS like 'Saída')   group by Pilarete,EstadoEspiraE, EstadoEspiraS ;");
*/
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