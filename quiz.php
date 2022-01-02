<!-- クイズ画面 -->
<?php
  include "api/db_config.php";
  if(!empty($_POST)){
    $user_name = $_POST["user_name"]; //ユーザー名
    $question_num = $_POST["question_num"] + 1; //何問目か
    $correct_answers_num = $_POST["correct_answers_num"]; //正解数
  
    $min_post = $_POST["min_post"]; //分数
    $sec_post = $_POST["sec_post"] - 1; //秒数    
  }

  else{
    header("Location:https://web18424.azurewebsites.net/Nogizaka/index.php");
  }

  try 
  {
    //connect
    $db= new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD);
    $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //eventテーブル一覧を取得
    $stmt = $db->query("SELECT * FROM user WHERE name='{$user_name}'");
    $user = $stmt->fetchAll(PDO::FETCH_ASSOC);

    
    if(empty($user[0]["user_id"])){
      $db->exec("INSERT INTO user(name) VALUES('{$user_name}')");
      
      $stmt = $db->query("SELECT * FROM user WHERE name='{$user_name}'");
      $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    $user_id = $user[0]["user_id"];

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
  <link rel="stylesheet" href="css/quiz_style.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script type="text/javascript">
    let user_name = "<?php echo $user_name; ?>"; //ユーザー名
    let question_num = <?php echo $question_num; ?>; //何問目か
    let correct_answers_num = <?php echo $correct_answers_num; ?>; //正解数
    let min_post = <?php echo $min_post; ?>; //分数
    let sec_post = <?php echo $sec_post; ?>; //秒数
    let time = min_post * 60 + sec_post; //秒表記
  </script>
</head>

<body>
  <div id="main">
    <div id="modal">
      <div id="answer">
        <h2 id="corrent_value"></h2>
        <img id="answer_img">
        <!-- 正解不正解を表示 -->
        <form action='quiz.php' method='POST'>
          <input type="hidden" name="user_id" value="<?php echo $user_id; ?>">
          <input type="hidden" name="user_name" value="<?php echo $user_name; ?>">
          <input type="hidden" name="question_num" value="<?php echo $question_num; ?>">
          <input type="hidden" name="correct_answers_num" value="<?php echo $correct_answers_num; ?>">
          <input type='submit' id='next' name='next' value='次に進む'>
        </form>
      </div>
    </div>

    <div id="container" class="container">
      <div id="top_var">
        <div id="print_question_num">
          <?php echo "<p>第{$question_num}問</p>" ?>
        </div>
        <div id='time'>
          <p>残り
            <span id='min'>01</span> 分
            <span id='sec'>00</span> 秒
          </p>
        </div>
      </div>
        <p id="question_sentence"></p> <!-- 問題文 -->
        <img id="member_face_img"></img> 
        <div class="circle_cross">
          <input type='image' id='circle_img' name='circle' src='img/circle.jpg' value='○' onclick='imgClick_circle();'>
        <!--</div>
        <div>-->
          <input type='image' id='cross_img' name='cross' src='img/cross.jpg' value='×' onclick='imgClick_cross();'>
        </div>
      </div>
    </div>

    <form id="finish_form" action="result.php" method="post" style="display:none">
      <input type="hidden" name="user_id" value="<?php echo $user_id; ?>">
      <input type="hidden" name="user_name" value="<?php echo $user_name; ?>">
      <input type="hidden" name="correct_answers_num" value="<?php echo $correct_answers_num; ?>">
      <input type="submit" id="finish">
    </form>
    <script src="js/quiz.js">
    </script>
  </div>
</body>

</html>