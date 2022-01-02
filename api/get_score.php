<?php
// scoreテーブル一覧を取得するAPI

  include "db_config.php";

  // $score = $_POST["score"];
  $score = 10;

  try 
  {
    //connect
    $db= new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD);
    $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //eventテーブル一覧を取得
    $stmt = $db->query("SELECT * FROM score inner join user on score.user_id=user.user_id ORDER by score DESC");
    $score = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $db = null;
  }
  catch (PDOException $e)
  {
    echo $e->getMessage();
    exit;
  }
  header('Content-Type: application/json'); // apiにしますよーってやつ
  $json = json_encode($score);
  print ($json);
?>
