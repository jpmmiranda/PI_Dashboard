<?php
//setting header to json
header('Content-Type: application/json');

//database
define('DB_HOST', '127.0.0.1');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'ruiborges');
define('DB_NAME', 'pilaretes');
/*define('DB_HOST', '127.0.0.1');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '123321');
define('DB_NAME', 'pilaretesbd');*/

//get connection
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$mysqli){
	die("Connection failed: " . $mysqli->error);
}

$tipo = $_POST["tipo"];
$inicio = $_POST["de"];
$fim = $_POST["ate"];


//query to get data from the table
if($tipo == 1)
	$query = sprintf("SELECT count(*) as AcessosConcedidos, hour(DataHora) as x FROM RegistoAcessos where DataHora between '$inicio' and '$fim' and ValidacaoAcesso like 'Acesso Concedido' group by hour(DataHora);");
else if($tipo == 2)
		$query = sprintf("SELECT count(*) as AcessosConcedidos, hour(DataHora) as x FROM RegistoAcessos where DataHora between '$inicio' and '$fim' and ValidacaoAcesso like 'Acesso Concedido' group by hour(DataHora);");
else if($tipo == 3)
		$query = sprintf("SELECT count(*) as AcessosConcedidos, weekday(DataHora) as x FROM RegistoAcessos where DataHora between '$inicio' and '$fim' and ValidacaoAcesso like 'Acesso Concedido' group by weekday(DataHora);");
else if($tipo == 4)
		$query = sprintf("SELECT count(*) as AcessosConcedidos, dayofmonth(DataHora) as x FROM RegistoAcessos where DataHora between '$inicio' and '$fim' and ValidacaoAcesso like 'Acesso Concedido' group by dayofmonth(DataHora);");
else 
		$query = sprintf("SELECT count(*) as AcessosConcedidos, monthName(DataHora) as x FROM RegistoAcessos where year(DataHora) =year('$inicio') and ValidacaoAcesso like 'Acesso Concedido' group by month(DataHora);");

//execute query
$result = $mysqli->query($query);

//loop through the returned data
$data = array();
foreach ($result as $row) {
	$data[] = $row;
}

//free memory associated with result
$result->close();

//close connection
$mysqli->close();

//now print the data
print json_encode($data);
?>