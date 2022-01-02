<?php
// scoreテーブルに追加するAPI

  include "db_config.php";
  
  $userid = $_POST["user_id"];
  // $userid = 5;
  $score = $_POST["score"];
  // $score = 10;

  // $user_name = "aaa";
  
  try 
  {
    //connect
    $db= new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD);
    $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //scoreテーブル一覧を取得
    $db->exec("INSERT INTO score(`user_id`, `score`) VALUES ('{$userid}',{$score})");

    $db = null;
  }
  catch (PDOException $e)
  {
    echo $e->getMessage();
    exit;
  }
  // header('Content-Type: application/json'); // apiにしますよーってやつ
?>