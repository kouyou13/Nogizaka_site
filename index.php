<!-- 初期画面 -->
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <title>乃木坂サイト</title>
  <link rel="stylesheet" href="./css/index_style.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
</head>

<body>


  <div class="index_box">
    <!--<h1>乃木坂クイズ</h1>-->
    <!--<div src='img/title.png'>-->
    <div id="quiz">
      <p>クイズ</p>
    </div>
    <div id="quiz_img">
      <img src="img/index/title.png">
    </div>
    <form action="quiz.php" name="myform" method="post">
      <input type="text" id="user_name" name="user_name" placeholder="ユーザー名" required> <!-- ユーザー名 -->
      <input type="hidden" id="user_id" name="user_id" value=""> <!-- ユーザーID -->
      <input type="hidden" name="question_num" value="0"> <!-- 問題数 -->
      <input type="hidden" name="correct_answers_num" value="0"> <!-- 正解数 -->
      <input type="hidden" name="min_post" value="1"> <!-- 分数 -->
      <input type="hidden" name="sec_post" value="0"> <!-- 秒数 -->
      <!-- <input type="submit" id="start" > -->
      <input id="start_game" type="submit" value="ゲーム開始">
    </form>
  </div>
  <script src="js/index.js"></script>
</body>

</html>