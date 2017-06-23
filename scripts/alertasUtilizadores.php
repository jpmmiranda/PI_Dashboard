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



//query to get data from the table
$query = sprintf("SELECT RA.DataHora as dh, ut.Nome as nome, RA.Telefone as tel, ut.TipoUtente as tu, RA.EstadoEspiraE as e, RA.EstadoEspiraS as s, (TIMESTAMPDIFF(minute,RA.DataHora, NOW()) ) as tempo, RA.Pilarete as pilarete
	FROM RegistoAcessos as RA INNER JOIN Utentes as ut on RA.nContribuinte = ut.nContribuinte
	WHERE (RA.DataHora > DATE_SUB(NOW(),INTERVAL 35 HOUR) ) AND RA.ValidacaoAcesso like 'Acesso Concedido' AND ut.TipoUtente != 'Morador com Garagem';");

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

