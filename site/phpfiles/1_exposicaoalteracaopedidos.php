<?php

require('./fpdf/fpdf.php');

if($_POST['formSubmit'] == "Finalizar"){

define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'root');
define('DB_NAME', 'cmbraga');

$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$mysqli){
	die("Connection failed: " . $mysqli->error);
}

$id=$_POST["identifiscal"];
$horario="Nada";
$fundamentacao="Nada";
if($_POST['escolha'] == "escolha1"){
	$horario=$_POST["horario"];
	$fundamentacao=$_POST["fundamentacao"];
}

$telemovel="Nada";
$telemovel2="Nada";
$motivo="Nada";
if($_POST['escolha'] == "escolha2"){
	$telemovel=$_POST["telemovel"];
	$telemovel2=$_POST["telemovel2"];
	$motivo=$_POST["motivo"];
}

$novo_acesso="Nada";
$acesso_antigo="Nada";
if($_POST['escolha'] == "escolha3"){
	$novo_acesso=$_POST["novo_acesso"];
	$acesso_antigo=$_POST["acesso_antigo"];
}

$matricula_antiga="Nada";
$matricula_nova="Nada";
if($_POST['escolha'] == "escolha4"){
	$matricula_antiga=$_POST["matricula_antiga"];
	$matricula_nova=$_POST["matricula_nova"];
}

$desativaracesso="Nada";
if($_POST['escolha'] == "escolha5"){
	$desativaracesso="Sim";
	$sql = "INSERT INTO alteracoes (idNumIdentFiscal,desativacao) values (".$id.",'".$desativaracesso."')";
}
else{

$sql = "INSERT INTO alteracoes (idNumIdentFiscal,NovoHorario,FundamentacaoHor,TeleAtual,
NovoTele,MotivoContacto,NovoPontoAcesso,AntigoPontoAcesso,MatriculaAntiga,NovaMatricula) 
VALUES (".$id.",'".$horario."','".$fundamentacao."','".$telemovel."','".$telemovel2."','".$motivo."','".$novo_acesso."','".$acesso_antigo."','".$matricula_antiga."','".$matricula_nova."')";
}

$result = $mysqli->query($sql);

	$pdf = new FPDF();
	$pdf->AddPage();
	$pdf->SetFont('Arial','B',20);
	
	$pdf->Cell(0,10,'Formulario de Alteracoes de Dados',0,0,'C');$pdf->Ln();$pdf->Ln();
	$pdf->SetFont('Arial','',12);
	$pdf->Cell(40,10,'Nr de Identificacao Fiscal: ' .$id);$pdf->Ln();
	$pdf->Cell(40,10,'Novo Horario: ' .$horario);$pdf->Ln();
	$pdf->Cell(40,10,'Motivo do novo horario: ' .$fundamentacao);$pdf->Ln();
	$pdf->Cell(40,10,'Contacto atual a alterar: ' .$telemovel);$pdf->Ln();
	$pdf->Cell(40,10,'Novo Contacto: ' .$telemovel2);$pdf->Ln();
	$pdf->Cell(40,10,'Motivo de alteracao do contacto: ' .$motivo);$pdf->Ln();
	$pdf->Cell(40,10,'Novo ponto de acesso: ' .$novo_acesso);$pdf->Ln();
	$pdf->Cell(40,10,'Ponto de acesso a mudar: ' .$acesso_antigo);$pdf->Ln();
	$pdf->Cell(40,10,'Matricula a mudar: ' .$matricula_antiga);$pdf->Ln();
	$pdf->Cell(40,10,'Nova matricula: ' .$matricula_nova);$pdf->Ln();
	$pdf->Cell(40,10,'Desativar o acesso a area pedonal: '.$desativaracesso);$pdf->Ln();
	
	$pdf->Output('C:\xampp\htdocs\formulario\phpfiles\anexos\Alteracoes\FormularioAlteracoes.pdf','F');
	
	$date = date('Ymd');
	$hora = date('His');
	
	$zipFile = "./anexos/Alteracoes/".$id."alteracoes".$date.$hora.".zip";
	$zipArchive = new ZipArchive();

	if (!$zipArchive->open($zipFile, ZIPARCHIVE::CREATE))
		die("Failed to create archive\n");

	$zipArchive->addGlob("./anexos/Alteracoes/*.pdf");
	if (!$zipArchive->status == ZIPARCHIVE::ER_OK)
		echo "falha ao criar o zip\n";

	$zipArchive->close();
	
	unlink('./anexos/Alteracoes/FormularioAlteracoes.pdf');
	
	header('Location: http://localhost:8888/formulario/confirmacao/');
	
	sendMail($id,$date,$hora);
	
}


function sendMail($id,$date,$hora){
	require_once('./phpmailer/class.phpmailer.php');

	
	$email = new PHPMailer();
	$email->From      = 'cmbragaformularios@outlook.pt';
	$email->FromName  = '';
	$email->Subject   = 'Novo Formulario de Alteracao de dados do Nr Fiscal '.$id;
	$email->Body      = 'Alteracao de dados';
	$email->AddAddress('a67740@alunos.uminho.pt');
	

	$email->AddAttachment("./anexos/Alteracoes/".$id."alteracoes".$date.$hora.".zip");

	if($email->Send())
	{
		echo "Your confirmation link has been sent to your e-mail address.";
	}
	else
	{
		echo "Error while sending confirmation link to your e-mail address";
	}
	
}


?>