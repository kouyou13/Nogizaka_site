'use strict';
$(function () {
  $('#onemore_form').submit(function () {
    const text = user_name + "でゲームを始めますか？";
    // ②ダイアログを出していいえを選択したら…
    if (!confirm(text)) {
      // 処理を中断
      return false;
    }
  });
});


