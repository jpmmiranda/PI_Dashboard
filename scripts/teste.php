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

$tipo = $_POST["tipo"];
$inicio = $_POST["de"];
$fim = $_POST["ate"];


//query to get data from the table
if($tipo == 1)
	$query = sprintf("SELECT count(*) as AcessosConcedidos, hour(DataHora) as lab ,EstadoEspiraE as ee, EstadoEspiraS as es FROM RegistoAcessos where DataHora between '$inicio' and '$fim' and ValidacaoAcesso like 'Acesso Concedido' and (EstadoEspiraE like 'Entrada' or EstadoEspiraS like 'Saída') group by hour(DataHora), EstadoEspiraE, EstadoEspiraS;");
else if($tipo == 2)
		$query = sprintf("SELECT count(*) as AcessosConcedidos, hour(DataHora) as lab,EstadoEspiraE as ee, EstadoEspiraS as es FROM RegistoAcessos where DataHora between '$inicio' and '$fim' and ValidacaoAcesso like 'Acesso Concedido' and (EstadoEspiraE like 'Entrada' or EstadoEspiraS like 'Saída') group by hour(DataHora), EstadoEspiraE, EstadoEspiraS;");
else if($tipo == 3)
		$query = sprintf("SELECT count(*) as AcessosConcedidos, day(DataHora) as lab ,EstadoEspiraE as ee, EstadoEspiraS as es FROM RegistoAcessos where DataHora between '$inicio' and '$fim' and ValidacaoAcesso like 'Acesso Concedido' and (EstadoEspiraE like 'Entrada' or EstadoEspiraS like 'Saída') group by day(DataHora), EstadoEspiraE, EstadoEspiraS;");
else if($tipo == 4)
		$query = sprintf("SELECT count(*) as AcessosConcedidos, dayofmonth(DataHora) as lab,EstadoEspiraE as ee, EstadoEspiraS as es FROM RegistoAcessos where DataHora between '$inicio' and '$fim' and ValidacaoAcesso like 'Acesso Concedido' and (EstadoEspiraE like 'Entrada' or EstadoEspiraS like 'Saída') group by dayofmonth(DataHora), EstadoEspiraE, EstadoEspiraS;");
else if($tipo == 5)
		$query = sprintf("SELECT count(*) as AcessosConcedidos, month(DataHora) as lab,EstadoEspiraE as ee, EstadoEspiraS as es FROM RegistoAcessos where year(DataHora) =year('$inicio') and ValidacaoAcesso like 'Acesso Concedido'  and (EstadoEspiraE like 'Entrada' or EstadoEspiraS like 'Saída') group by month(DataHora), EstadoEspiraE, EstadoEspiraS;");

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