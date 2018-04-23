<?php

class MyDB extends SQLite3 {
      function __construct() {
         $this->open('electron.db');
      }
      
      function getjson(){
		  $arr = array();
		  $sql = 'SELECT * FROM electro_comment';
          $stmt = $this->prepare($sql);
          $ret = $this->query($sql);

	      while($row = $ret->fetchArray(SQLITE3_ASSOC) ) {
		      $arr[] = $row;
	      }
	      $this->close();
	      return json_encode($arr, JSON_UNESCAPED_UNICODE);   
	  }
	  
	  function tbl_init(){

              $ret = $this->exec('CREATE TABLE IF NOT EXISTS electro_comment (
				  ID INT PRIMARY KEY,
				  NAME TEXT NOT NULL,
				  COMMENT TEXT NOT NULL
			  )');
        
          if(!$ret){
			  return $this->lastErrorMsg()."\n";
		  } else {
			  //return "success";
		  }
	  }
      
   }
   
   $db = new MyDB();
   if(!$db) {
      echo $db->lastErrorMsg()."\n";
   }

    $db->tbl_init();

    //echo $db->getjson();

if($_POST){
	if(isset($_POST['del'])){
		$sql = 'DELETE FROM electro_comment WHERE ID = '.$_POST['id'];
		
		$stmt = $db->prepare($sql);
		$ret = $db->query($sql);
		
		echo $db->getjson();
		return false;
	}
	$id = $_POST['id'];
    $name = $_POST['name'];
    $comment = $_POST['comment'];
    $sql = 'INSERT INTO electro_comment VALUES ('.$id.', "'.$name.'", "'.$comment.'")';
    
    $stmt = $db->prepare($sql);
    $ret = $db->query($sql);

   if(!$ret) {
      echo $db->lastErrorMsg()."\n";
   } else {
      echo $db->getjson();
  }
} else {
	echo $db->getjson();
}
 
?>

