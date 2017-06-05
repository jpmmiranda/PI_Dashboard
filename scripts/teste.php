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

$tipo = $_POST["tipo"];
$inicio = $_POST["de"];
$fim = $_POST["ate"];
$listados = $_POST["listados"];
if($listados==null)$listados=".*";


//query to get data from the table
if($tipo == 1)
	$query = sprintf("SELECT count(*) as AcessosConcedidos, hour(DataHora) as lab ,EstadoEspiraE as ee, EstadoEspiraS as es, TipoUtente
		 FROM RegistoAcessos as RA inner join Utentes as UT
			on RA.nContribuinte = UT.nContribuinte
		 where DataHora between '$inicio' and '$fim' and ValidacaoAcesso like 'Acesso Concedido' and (EstadoEspiraE like 'Entrada' or EstadoEspiraS like 'Saída') and UT.TipoUtente REGEXP '$listados' group by hour(DataHora), EstadoEspiraE, EstadoEspiraS, TipoUtente;");
else if($tipo == 2)
		$query = sprintf("SELECT count(*) as AcessosConcedidos, DataHora as dh, day(DataHora) as lab,EstadoEspiraE as ee, EstadoEspiraS as es, TipoUtente FROM RegistoAcessos as RA inner join Utentes as UT
			on RA.nContribuinte = UT.nContribuinte
		where DataHora between '$inicio' and '$fim' and ValidacaoAcesso like 'Acesso Concedido' and (EstadoEspiraE like 'Entrada' or EstadoEspiraS like 'Saída')and UT.TipoUtente REGEXP '$listados'  group by day(DataHora), EstadoEspiraE, EstadoEspiraS, TipoUtente order by DataHora;");
else if($tipo == 3)
		$query = sprintf("SELECT count(*) as AcessosConcedidos,DataHora as dh, day(DataHora) as lab ,EstadoEspiraE as ee, EstadoEspiraS as es, TipoUtente FROM RegistoAcessos as RA inner join Utentes as UT
			on RA.nContribuinte = UT.nContribuinte 
		where DataHora between '$inicio' and '$fim' and ValidacaoAcesso like 'Acesso Concedido' and (EstadoEspiraE like 'Entrada' or EstadoEspiraS like 'Saída') and UT.TipoUtente REGEXP '$listados' group by day(DataHora), EstadoEspiraE, EstadoEspiraS, TipoUtente order by DataHora;");
else if($tipo == 4)
		$query = sprintf("SELECT count(*) as AcessosConcedidos, DataHora as dh,dayofmonth(DataHora) as lab,EstadoEspiraE as ee, EstadoEspiraS as es, TipoUtente FROM RegistoAcessos as RA inner join Utentes as UT
			on RA.nContribuinte = UT.nContribuinte 
		where DataHora between '$inicio' and '$fim' and ValidacaoAcesso like 'Acesso Concedido' and (EstadoEspiraE like 'Entrada' or EstadoEspiraS like 'Saída') and UT.TipoUtente REGEXP '$listados' group by dayofmonth(DataHora), EstadoEspiraE, EstadoEspiraS, TipoUtente order by DataHora;");
else if($tipo == 5)
		$query = sprintf("SELECT count(*) as AcessosConcedidos, month(DataHora) as lab,EstadoEspiraE as ee, EstadoEspiraS as es, TipoUtente FROM RegistoAcessos as RA inner join Utentes as UT
			on RA.nContribuinte = UT.nContribuinte 
		where year(DataHora) =year('$inicio') and ValidacaoAcesso like 'Acesso Concedido'  and (EstadoEspiraE like 'Entrada' or EstadoEspiraS like 'Saída') and UT.TipoUtente REGEXP '$listados' group by month(DataHora), EstadoEspiraE, EstadoEspiraS, TipoUtente;");

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