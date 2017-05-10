<?php

define('DB_HOST', '127.0.0.1');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'ruiborges');
define('DB_NAME', 'pilaretes');

class connection
{

	public $conn;
	
	public function GetConnection()
	{

		//$this->mConnectionInfo = array("Database"=>"Teste");
		$this->conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
		
		return $this->conn;
	}

	
}
?>