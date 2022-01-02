<?php
// userテーブル一覧を取得するAPI

  include "db_config.php";
  
  $user_name = $_POST["user_name"];

  // $user_name = "aaa";
  
  try 
  {
    //connect
    $db= new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD);
    $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //userテーブル一覧を取得
    $stmt = $db->query("SELECT * FROM user WHERE name='{$user_name}'");
    $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // echo $user_name;

    if(empty($user[0]["user_id"])){
      $db->exec("INSERT INTO user(name) VALUES('{$user_name}')");
      
      $stmt = $db->query("SELECT * FROM user WHERE name='{$user_name}'");
      $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    $db = null;
  }
  catch (PDOException $e)
  {
    echo $e->getMessage();
    exit;
  }
  header('Content-Type: application/json'); // apiにしますよーってやつ
  $json = json_encode($user);
  print ($json);
?>