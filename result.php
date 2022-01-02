<!-- 結果？ランキング？画面 -->
<?php
  include "api/db_config.php";
  $rank = 1;
  
  if(!empty($_POST)){
    $user_id = $_POST["user_id"]; //ユーザーID
    $user_name = $_POST["user_name"]; //ユーザー名
    $correct_answers_num = $_POST["correct_answers_num"]; //得点
  }
  else{
    header("Location:https://web18424.azurewebsites.net/Nogizaka/index.php");
  }

  try 
  {
    //connect
    $db= new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD);
    $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $db->query("SELECT id, score FROM score WHERE user_id={$user_id}");
    $score_id = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if(isset($score_id[0]["id"]))
      $db->exec("UPDATE score SET score = {$correct_answers_num} WHERE user_id = {$user_id}");
    else
      $db->exec("INSERT INTO score(user_id, score) VALUES({$user_id}, {$correct_answers_num})");
    
    
    //scoreテーブル一覧を取得
    $stmt = $db->query("SELECT * FROM score ORDER BY score DESC");
    $score = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt = $db->query("SELECT * FROM user");
    $user = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stmt = $db->query("SELECT COUNT( * ) as uf FROM score WHERE score >= {$correct_answers_num}");
    $user_rank = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $db = null;
  }
  catch (PDOException $e)
  {
    echo $e->getMessage();
    exit;
  }
?>

<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <title>乃木坂サイト</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <link rel="stylesheet" href="css/result_style.css">
  <script type="text/javascript">
    const user_name = "<?php echo $user_name; ?>";
  </script>
</head>

<body>
  <div class="result">
    <?php echo "<p>{$user_name}さんは{$user_rank['uf']}位（{$correct_answers_num}点）でした。</p>" ?>
    <div id="result">
      <div class="botton">
        <form id="onemore_form" action="quiz.php" method="post">
          <input type="hidden" name="user_name" value="<?php echo $user_name; ?>">
          <input type="hidden" name="question_num" value="0">
          <input type="hidden" name="correct_answers_num" value="0">
          <input type="hidden" name="min_post" value="1">
          <input type="hidden" name="sec_post" value="0">
          <input id ="onemore" type="submit" value="もう一度">
        </form>
        <form action="index.php" method="post">
          <input id="finish" type="submit" value="終了">
        </form>
      </div>
      <div id="table_div">
        <table class="wTable">
          <tr>
            <th>順位</th>
            <th>ユーザー名</th>
            <th>スコア</th>
          </tr>
          <?php
            foreach($score as $s){
              foreach($user as $u){
                if($rank == 6)
                break;
                $user_name = $u["name"];
                if($s["user_id"] == $u["user_id"]){
                  echo "<tr><td>{$rank}</td><td>{$user_name}</td><td>{$s['score']}</td></tr>";
                  $rank++;
                  break;
                }
              }
            }
          ?>
        </table>
      </div>
    </div>
  </div>
  <script src="js/result.js"></script>
</body>

</html>