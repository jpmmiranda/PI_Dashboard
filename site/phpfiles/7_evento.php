<?php

require('./fpdf/fpdf.php');

$info = pathinfo($_FILES['registoVeiculo']['name']);
$ext1 = $info['extension']; // get the extension of the file
$newname = "RegistoVeiculo.".$ext1; 
$target = 'anexos/Evento/'.$newname;
move_uploaded_file( $_FILES['registoVeiculo']['tmp_name'], $target);

$info = pathinfo($_FILES['cartaConducao']['name']);
$ext2 = $info['extension']; // get the extension of the file
$newname = "cartaConducao.".$ext2; 
$target = 'anexos/Evento/'.$newname;
move_uploaded_file( $_FILES['cartaConducao']['tmp_name'], $target);

if($_POST['formSubmit'] == "Submeter Candidatura"){
	
	$id=$_POST["id"];
	
	define('DB_HOST', 'localhost');
	define('DB_USERNAME', 'root');
	define('DB_PASSWORD', 'root');
	define('DB_NAME', 'cmbraga');

	$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

	if(!$mysqli){
		die("Connection failed: " . $mysqli->error);
	}
	
	$sql = "Update requerente set tipoRequerente='Evento' where idNumFiscal=".$id;

	$result = $mysqli->query($sql);
	
	$sql = "SELECT * from cmbraga.requerente where idNumFiscal=".$id;

	$result = $mysqli->query($sql);
	
	$pdf = new FPDF();
	$pdf->AddPage();
	$pdf->SetFont('Arial','B',24);
	setlocale(LC_CTYPE, 'en_US');
	
	while($row = $result->fetch_assoc()) {
		$pdf->Cell(0,10,'Formulario para Evento',0,0,'C');$pdf->Ln();$pdf->Ln();
		$pdf->SetFont('Arial','',18);
		$pdf->Cell(0,10,urldecode(em('Requerente')),0,0,'C');$pdf->Ln();
		$pdf->SetFont('Arial','',12);
		$pdf->Cell(40,10,urldecode(em('Nome: ' . $row["Nome"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Morada: ' . $row["Morada"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Código Postal: ' . $row["CodPostal"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Localidade: ' . $row["Localidade"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Nrº de Identificação Fiscal(NIF) : ' . $row["idNumFiscal"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Nrº de Identificacao Civil: ' . $row["NumIdenCivil"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Telemóvel: ' . $row["Telemovel"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('TeleFax: ' . $row["TelFax"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Email: ' . $row["Email"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Código da Certidão Comercial Permanente: ' . $row["CodCertidaoPermanente"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Tipo do Requerente: ' . $row["tipoRequerente"])));$pdf->Ln();$pdf->Ln();
		$pdf->SetFont('Arial','',18);
		$pdf->Cell(0,10,urldecode(em('Números e Matrículas')),0,0,'C');$pdf->Ln();
		$pdf->SetFont('Arial','',12);
		$pdf->Cell(40,10,urldecode(em('Fundamentação: ' . $row["Fundamentacao"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Número de Telemóvel 1: ' . $row["Numero1"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Número de Telemóvel 2: ' . $row["Numero2"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Número de Telemóvel 3: ' . $row["Numero3"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Número de Telemóvel 4: ' . $row["Numero4"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Matrícula 1: ' . $row["Matricula1"])));$pdf->Ln();
        $pdf->Cell(40,10,urldecode(em('Matrícula 2: ' . $row["Matricula2"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Matrícula 3: ' . $row["Matricula3"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Matrícula 4: ' . $row["Matricula4"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Motivo: ' . $row["Motivo"])));$pdf->Ln();$pdf->Ln();$pdf->Ln();$pdf->Ln();
		$pdf->SetFont('Arial','',18);
		$pdf->Cell(0,10,urldecode(em('Representante')),0,0,'C');$pdf->Ln();
		$pdf->SetFont('Arial','',12);
		$pdf->Cell(40,10,urldecode(em('Nome do Representante: ' . $row["NomeRepresentante"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Nrº de Identificação Civil do Representante: ' . $row["idCivilRepresentante"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Nrº de Identificação Fiscal do Representante: ' . $row["idFiscalRepresentante"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Representante na qualidade de: ' . $row["QualidadeRep"])));$pdf->Ln();
		$pdf->Cell(40,10,urldecode(em('Código para consulta da Procuração Online: ' . $row["CodProcOn"])));
    }
	
	$pdf->Output('C:\xampp\htdocs\formulario\phpfiles\anexos\Evento\FormularioEvento.pdf','F');
	
	$date = date('Ymd');
	$hora = date('His');
	
	$zipFile = "./anexos/Evento/".$id."anexos".$date.$hora.".zip";
	$zipArchive = new ZipArchive();

	if (!$zipArchive->open($zipFile, ZIPARCHIVE::CREATE))
		die("Failed to create archive\n");

	$zipArchive->addGlob("./anexos/Evento/*.pdf");
	$zipArchive->addGlob("./anexos/Evento/*.png");
	$zipArchive->addGlob("./anexos/Evento/*.jpeg");
	$zipArchive->addGlob("./anexos/Evento/*.jpg");
	if (!$zipArchive->status == ZIPARCHIVE::ER_OK)
		echo "falha ao criar o zip\n";

	$zipArchive->close();
	
	unlink('./anexos/Evento/RegistoVeiculo.'.$ext1);
	unlink('./anexos/Evento/cartaConducao.'.$ext2);
	unlink('./anexos/Evento/FormularioEvento.pdf');
	
	header('Location: http://localhost:8888/formulario/confirmacao/');
	
	sendMail($id,$date,$hora);
	
}

function sendMail($id,$date,$hora){
	require_once('./phpmailer/class.phpmailer.php');

	$email = new PHPMailer();
	$email->From      = 'cmbragaformularios@outlook.pt';
	$email->FromName  = '';
	$email->Subject   = 'Novo Formulario para Evento Nr Fiscal '.$id;
	$email->Body      = 'Novo pedido de acesso a zona pedonal do centro de braga durante um evento';
	$email->AddAddress('a67740@alunos.uminho.pt');

	$email->AddAttachment("./anexos/Evento/".$id."anexos".$date.$hora.".zip");

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