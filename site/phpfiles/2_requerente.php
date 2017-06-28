<?php


if($_POST['formSubmit'] == "Enviar"){

define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'root');
define('DB_NAME', 'cmbraga');

$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
if(!$mysqli){
	die("Connection failed: " . $mysqli->error);
}

$name="Nada";
$morada="Nada";
$codpostal="0";
$localidade="Nada";
$idcivil="0";
$idfiscal="0";
$telemovel="0";
$telefone="0";
$telefax="0";
$email="Nada";
$cccp="Nada";
$representante="Nao";

$name=$_POST["nome"];
$morada=$_POST["morada"];
$codpostal=$_POST["cod_postal"];
$localidade=$_POST["localidade"];
$idcivil=$_POST["id_Civil"];
$idfiscal=$_POST["id_Fiscal"];
$telemovel=$_POST["telemovel"];
$telefone=$_POST["telefone"];
$telefax=$_POST["telefax"];
$email=$_POST["email"];
$cccp=$_POST["CCCP"];
$representante=$_POST["representante"];

echo "id: ".$idfiscal;
$sql = "INSERT INTO requerente (idNumFiscal,Nome,Morada,CodPostal,Localidade,NumIdenCivil,Telemovel,TelFax,Email,CodCertidaoPermanente) 
VALUES (".$idfiscal.",'".$name."','".$morada."','".$codpostal."','".$localidade."','".$idcivil."','".$telemovel."','".$telefax."','".$email."','".$cccp."')";

$result = $mysqli->query($sql);

if($representante=="sim"){
	header('Location: http://localhost:8888/formulario/representante/');
}
else{
	header('Location: http://localhost:8888/formulario/numeros-e-matriculas/');
}

	
}else{
	header('Location: http://localhost:8888/formulario/pagina-informativa/');
}


?>