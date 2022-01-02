'use strict';

//get_user.php実行
function Get_userPOST(parameter) {
  return $.ajax({
    url: "api/get_user.php",
    type: "POST",
    data: parameter,
    catch: false
  });
}

$(function () {
  // ①submit()に関数をバインド
  $('form').submit(function () {
    const user_name = document.getElementById("user_name");

    let user_name_text = user_name.value;
    let text = user_name_text + "でゲームを始めますか？";
    // ②ダイアログを出していいえを選択したら…
    if (!confirm(text)) {
      // 処理を中断
      return false;
    }
  });
});
