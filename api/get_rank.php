<?php
// userテーブル一覧を取得するAPI

  include "db_config.php";

  $score = $_POST["score"];
  // $score = 4;

  // $user_name = "aaa"
  
  try 
  {
    //connect
    $db= new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD);
    $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // echo ("cc");
    //userテーブル一覧を取得
    $stmt = $db->query("SELECT COUNT(*) as rank FROM score WHERE score>{$score}");
    $rank = $stmt->fetch(PDO::FETCH_ASSOC);
    // echo $user_name;

    $db = null;
  }
  catch (PDOException $e)
  {
    echo $e->getMessage();
    exit;
  }
  header('Content-Type: application/json'); // apiにしますよーってやつ
  $json = json_encode($rank["rank"]);
  print ($json);
?>