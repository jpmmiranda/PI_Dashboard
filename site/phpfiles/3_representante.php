<?php


if($_POST['formSubmit'] == "Seguinte"){

define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'root');
define('DB_NAME', 'cmbraga');

$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$mysqli){
	die("Connection failed: " . $mysqli->error);
}

$name="Nada";
$idcivil="0";
$idfiscal="0";

$id=$_POST["id"];
$name=$_POST["nome"];
$idcivil=$_POST["id_Civil"];
$idfiscal=$_POST["id_Fiscal"];
$codigo=$_POST["codigo"];
if (empty($codigo)) $codigo = 'Nada';
$tipo=$_POST["tipo"];

$sql = "Update requerente set NomeRepresentante='".$name."',idCivilRepresentante='".$idcivil."',
idFiscalRepresentante='".$idfiscal."',QualidadeRep='".$tipo."',CodProcOn='".$codigo."' where idNumFiscal=".$id;

$result = $mysqli->query($sql);

header('Location: http://localhost:8888/formulario/numeros-e-matriculas/');	
}

if($_POST['formSubmit'] == "Retroceder"){
	
	header('Location: http://localhost:8888/formulario/requerente/');	
}

?>