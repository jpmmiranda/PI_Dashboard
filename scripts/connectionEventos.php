<?php

define('DB_HOST', '127.0.0.1');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '123321');
define('DB_NAME', 'dashboardeventos');

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
			 $this->bdd = new PDO('mysql:host=127.0.0.1;dbname=dashboardeventos', 'root','123321');
		} catch(Exception $e) {
			  exit('Unable to connect to database.');
			 }
 		return $this->bdd;
	}
}
?>