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

$tele1 = "null";
if (!empty($_POST["tele1"])) {
    $tele1 = $_POST["tele1"];
}
$tele2 = "null";
 if (!empty($_POST["tele2"])) {
    $tele2 = $_POST["tele2"];
}
$tele3 = "null";
 if (!empty($_POST["tele3"])) {
    $tele3 = $_POST["tele3"];
}
$tele4 = "null";
 if (!empty($_POST["tele4"])) {
    $tele4 = $_POST["tele4"];
}
$mat1 = "Nada";
 if (!empty($_POST["mat1"])) {
    $mat1 = $_POST["mat1"];
}
$mat2 = "Nada";
 if (!empty($_POST["mat2"])) {
    $mat2 = $_POST["mat2"];
}
$mat3 = "Nada";
 if (!empty($_POST["mat3"])) {
    $mat3 = $_POST["mat3"];
}
$mat4 = "Nada";
 if (!empty($_POST["mat4"])) {
    $mat4 = $_POST["mat4"];
}

$fundamentacao="Nada";
$rua="Nada";
$motivo="Nada";
$fundamentacao=$_POST["fundamentacao"];
$rua=$_POST["rua"];
$motivo=$_POST["motivo"];
$id=$_POST["id"];


$sql = "Update requerente set Fundamentacao='".$fundamentacao."',RuaAcesso='".$rua."',Motivo='".$motivo."'
,Numero1=".$tele1.",Numero2=".$tele2.",Numero3=".$tele3.",Numero4=".$tele4."
,Matricula1='".$mat1."',Matricula2='".$mat2."',Matricula3='".$mat3."',Matricula4='".$mat4."' where idNumFiscal=".$id;

$result = $mysqli->query($sql);

header('Location: http://localhost:8888/formulario/tipo-de-utilizador/');

}


?>