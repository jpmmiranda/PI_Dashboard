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
$de = $_POST["de"];
$ate = $_POST["ate"];

//query to get data from the table
$query = sprintf("SELECT count(*) total,
	sum(case when ValidacaoAcesso like 'Acesso Concedido' then 1 else 0 end) aceites,
    sum(case when EstadoEspiraE = 'Entrada' and EstadoEspiraS = '' and ValidacaoAcesso like 'Acesso Concedido' then 1 else 0 end) entradas,
    sum(case when EstadoEspiraE = 'Entrada' and EstadoEspiraS = 'Saída' and ValidacaoAcesso like 'Acesso Concedido' then 1 else 0 end) especial,
    sum(case when EstadoEspiraS = 'Saída' and EstadoEspiraE = '' and ValidacaoAcesso like 'Acesso Concedido' then 1 else 0 end) saidas,
    sum(case when (ValidacaoAcesso regexp '^Acesso Nao Concedido' or ValidacaoAcesso regexp '^Acesso Recusado') then 1 else 0 end) recusados
from RegistoAcessos
where Telefone = '$utilizador' and (DataHora between '$de' and '$ate');");

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

