<?php
//setting header to json
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
//database
require_once(dirname(__FILE__).'/connectionEventos.php');

$connection = new connection();
$connection->GetConnection();

if(!$connection->conn){

	die("Connection failed: " . $connection->conn->error);
}
mysqli_set_charset($connection->conn, "utf8");


$inicio = $_POST['start'];
$fim =$_POST['end'];
$nome=$_POST['title'];
$descricao=$_POST['description'];

//query to get data from the table
if($descricao!=""){
$query = sprintf("INSERT INTO `Eventos`(`title`, `start`,`end`,`description`) VALUES('$nome','$inicio','$fim','$descricao');"); 
$query .= sprintf("SELECT * from Eventos order by id desc limit 1;"); 

}
else{
$query = sprintf("INSERT INTO `Eventos`(`title`, `start`,`end`) VALUES('$nome','$inicio','$fim');"); 
$query .= sprintf("SELECT * from Eventos order by id desc limit 1;"); 

}

//execute query
$data = array();

// Execute multi query
if (mysqli_multi_query($connection->conn,$query))
{
  do
    {
    // Store first result set
    if ($result=mysqli_store_result($connection->conn)) {
      // Fetch one and one row

      while ($row=mysqli_fetch_row($result))
        {
			$data[] = $row[0];
        }
      // Free result set
      mysqli_free_result($result);
      }
    }
  while (mysqli_next_result($connection->conn));
}

//free memory associated with result

//close connection
$connection->conn->close();

//now print the data
print json_encode($data,JSON_UNESCAPED_UNICODE);
//close connection
?>