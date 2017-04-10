<?php

define('DB_HOST', '127.0.0.1');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'ruiborges');
define('DB_NAME', 'dashboardEventos');

class connection
{

	public $conn;
	public $bdd;
	
	public function GetConnection()
	{

		//$this->mConnectionInfo = array("Database"=>"Teste");
		$this->conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
		
		return $this->conn;
	}

	public function GetConnectionPDO(){
		 try {
			 $this->bdd = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USERNAME, $DB_PASSWORD);
		} catch(Exception $e) {
			  exit('Unable to connect to database.');
			 }
 		return $this->bdd;
	}
}
?>