'use strict';

import {quiz} from "./quiz.js";

let userid;
let username = "";
let message_text = "";
let score = 0; // 正解数
const title_ele = document.getElementById("title_ele");
const question_ele = document.getElementById("question_ele");
const result_ele = document.getElementById("result_ele");

//get_user.php実行
const Get_userPOST = (parameter) => {
  return $.ajax({
    url: "./api/get_user.php",
    type: "POST",
    data: parameter,
    cache: false
  });
}

export const main = () => {
  $('body').css({
    backgroundImage: 'url("./img/index/back10.png")' // "" で括っていないとIEでは表示されない
  });

  title_ele.style.padding = "20% 0 0 0";
  question_ele.style.padding = "0";
  result_ele.style.opacity = "0";
  result_ele.style.height = "0";

  const quiz_text = document.createElement("p");
  quiz_text.id = "quiz_text";
  quiz_text.textContent = "クイズ";
  title_ele.appendChild(quiz_text);

  const text_div = document.createElement("div");
  text_div.id = "text_div";
  title_ele.appendChild(text_div);

  const title_img = document.createElement("img");
  title_img.id = "title_img";
  title_img.src = "./img/index/title.png";
  text_div.appendChild(title_img);

  const br_ele = document.createElement("br");
  text_div.appendChild(br_ele);

  const user_name_input = document.createElement("input");
  user_name_input.type = "text";
  user_name_input.id = user_name_input.name = "user_name";
  user_name_input.placeholder = "ユーザー名";
  user_name_input.required = true;
  text_div.appendChild(user_name_input);

  const start_btn = document.createElement("button");
  start_btn.id = "start_game";
  start_btn.textContent = "ゲーム開始";
  text_div.appendChild(start_btn);
  start_btn.onclick = () => {
    username = user_name_input.value;
    if (username.length == 0){
      alert("ユーザー名が入力されていません。");
    }
    else{
      message_text = username + "でゲームを始めますか？";
      if (!confirm(message_text)) {
        // 処理を中断
        return false;
      }
      else{
        title_ele.style.padding = 0;
        console.log(username);
        const parameter = {
          user_name : username
        }
        Get_userPOST(parameter).then(function(user_data) {
          userid = user_data[0]["user_id"];
          while (title_ele.lastChild) {
            title_ele.removeChild(title_ele.lastChild);
          }
          console.log(userid);
          console.log(username);
          quiz(userid, username);
        });
      }
    }
  }

}