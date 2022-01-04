'use strict';

import {result} from "./result.js";

let counter;
let min_num = 1; // 何分
let sec_num = 0; // 何秒
let question_num = 1; // 問題番号
let score = 0; // 正解数
let answer_flag; // 答えがあっているか
let random_num_tmp = 0; // 問題出題時の乱数
let answer_img_random_num = 0; // 解答画像の乱数
let userid; // ユーザーID
let username = ""; // ユーザー名
const limit_time = 60; // 制限時間
let time = 0;


const title_ele = document.getElementById("title_ele");
const question_ele = document.getElementById("question_ele");
const result_ele = document.getElementById("result_ele");

const modal_container = document.createElement("div");
const corrent_value = document.createElement("p");
const answer_img = document.createElement("img");
const next_submit = document.createElement("input");
const circle_img = document.createElement("input");
const cross_img = document.createElement("input");
const question_num_p = document.createElement("p");
const answer_container = document.createElement("dev");

//get_member.php実行
const Get_memberPOST = () => {
  return $.ajax({
    url: "./api/get_member.php",
    type: "POST",
    cache: false
  });
}

// タイマーの関数
const Count = () => {
  question_num = 1
  counter = setInterval(Timer, 1000); //setInterval(実行する関数、1000ミリ秒ごと)に実行
}

const Timer = () => {
  if(time <= 0){
    min.innerHTML = "00"; //HTMLに反映
    sec.innerHTML = "00"; //HTMLに反映
    circle_img.disabled = true; //押せないようにする
    cross_img.disabled = true; //押せないようにする
    alert('終了！');
    clearInterval(counter);
    while (question_ele.lastChild) {
      question_ele.removeChild(question_ele.lastChild);
    }
    result(userid, username, score);
  }
  else{
    time -= 1;
    min_num = Math.floor(time / 60); //Math.floorは小数点切り捨て
    sec_num = time % 60;
    // console.log(min_num);
    // console.log(sec_num);
    min.innerHTML = ( '00' + min_num ).slice( -2 );
    sec.innerHTML = ( '00' + sec_num ).slice( -2 );
    // min.innerHTML = min_post;
    // sec.innerHTML = sec_post;
  }
}

const UpdataQuestion = () => {
  question_num_p.textContent = "第" + String(question_num) + "問";
  Get_memberPOST().then(function(member_data) {
    if (member_data != null) {
      // console.log(member_data);
      let first_random_num = Math.floor( Math.random() * member_data.length); //0~ メンバー数の乱数 答えに出す人の数
      let second_random_num = Math.floor( Math.random() * member_data.length); //0~ メンバー数の乱数 問題に出す人の数
      let question_kind = Math.floor( Math.random() * 5); //0~4の乱数
      let random_number = Math.floor(Math.random() * 2); //0~1の乱数
      let question_member_name = member_data[first_random_num]["name"];
      let question_text_parts = ""; //問題文の説明文
      let question_text_parts_answer = ""; //正しい説明文
      switch(question_kind){
        case 0: //画像問題
          question_sentence.innerHTML = "これは" + question_member_name + "さんである。";
          question_text_parts_answer = member_data[first_random_num]["face"];
          if (random_number == 0)
            question_text_parts = member_data[first_random_num]["face"];
          else
            question_text_parts = member_data[second_random_num]["face"];
          member_face_img.src = "./member_img/" + question_text_parts;
          break;
        case 1: //年齢問題
          member_face_img.src = "./member_img/" + member_data[first_random_num]["face"];
          question_text_parts_answer = member_data[first_random_num]["age"];
          if (random_number == 0)
            question_text_parts = member_data[first_random_num]["age"];
          else
            question_text_parts = member_data[second_random_num]["age"];
          question_sentence.innerHTML = question_member_name + "さんは" + question_text_parts + "歳である。";
          break;
        case 2: //備考1の問題
          member_face_img.src = "./member_img/" + member_data[first_random_num]["face"];
          question_text_parts_answer = member_data[first_random_num]["birthday"];
          if (random_number == 0)
            question_text_parts = member_data[first_random_num]["birthday"];
          else
            question_text_parts = member_data[second_random_num]["birthday"];
          question_sentence.innerHTML = question_member_name + "さんの生年月日は" + question_text_parts + "である。";
          break;
        case 3: //備考2の問題
          member_face_img.src = "./member_img/" + member_data[first_random_num]["face"];
          question_text_parts_answer = member_data[first_random_num]["birthplace"];
          if (random_number == 0)
            question_text_parts = member_data[first_random_num]["birthplace"];
          else
            question_text_parts = member_data[second_random_num]["birthplace"];
          question_sentence.innerHTML = question_member_name + "さんの出身は" + question_text_parts + "である。";
          break;
        case 4: //備考3の問題
          member_face_img.src = "./member_img/" + member_data[first_random_num]["face"];
          question_text_parts_answer = member_data[first_random_num]["generation"];
          if (random_number == 0)
            question_text_parts = member_data[first_random_num]["generation"];
          else
            question_text_parts = member_data[second_random_num]["generation"];
          question_sentence.innerHTML = question_member_name + "さんは" + question_text_parts + "期生である。";
          break;   
      }
      if(question_text_parts == question_text_parts_answer)
        answer_flag = true; //答えは○
      else
      answer_flag = false; //答えは×
    }
  });
}

export const quiz = (user_id, user_name) => {
  $('body').css({
    backgroundImage: 'url("./img/back1.jpg")' // "" で括っていないとIEでは表示されない
  });
  userid = user_id;
  username = user_name;
  time = limit_time;
  score = 0;
  question_ele.style.padding = "5% 0 0 0";
  result_ele.style.opacity = "0";
  result_ele.style.height = "0";

  const question_container = document.createElement("div");
  question_container.id = "container";
  question_ele.appendChild(question_container);

  // const question_num_p = document.createElement("p");
  question_num_p.id = "question_num";
  question_container.appendChild(question_num_p);
  
  const timer_p = document.createElement("p");
  timer_p.id = "timer";
  timer_p.innerHTML = "残り時間：<span id='min'>01</span>分<span id='sec'>00</span>秒";
  question_container.appendChild(timer_p);
  const min = document.getElementById("min");
  const sec = document.getElementById("sec");

  const question_sentence = document.createElement("p");
  question_sentence.id = "question_sentence";
  question_container.appendChild(question_sentence);

  const member_face_img = document.createElement("img");
  member_face_img.id = "member_face_img";
  question_container.appendChild(member_face_img);

  const button_container = document.createElement("div");
  button_container.id = "circle_cross";
  question_container.appendChild(button_container);

  // const circle_img = document.createElement("input");
  circle_img.type = "image";
  circle_img.id = "circle_img";
  circle_img.src = "./img/circle.jpg";
  circle_img.disabled = false; //押せるようにする
  button_container.appendChild(circle_img);

  // const cross_img = document.createElement("input");
  cross_img.type = "image";
  cross_img.id = "cross_img";
  cross_img.src = "./img/cross.jpg";
  cross_img.disabled = false;
  button_container.appendChild(cross_img);

   // const modal_container = document.createElement("div");
  modal_container.id = "modal";
  question_ele.appendChild(modal_container);
  modal_container.style.display = "none";

  // const answer_container = document.createElement("dev");
  answer_container.id = "answer";
  modal_container.appendChild(answer_container);

  // const corrent_value = document.createElement("p");
  corrent_value.id = "corrent_value";
  answer_container.appendChild(corrent_value);

   // const answer_img = document.createElement("img");
  answer_img.id = "answer_img";
  answer_container.appendChild(answer_img);

   // const next_submit = document.createElement("input");
  next_submit.type = "submit";
  next_submit.id = "next";
  next_submit.value = "次に進む";
  answer_container.appendChild(next_submit);

  Count();

  UpdataQuestion();
}

// ○押した時
circle_img.onclick = function(){
  circle_img.disabled = true; //押せないようにする
  cross_img.disabled = true; //押せないようにする
  if(answer_flag === true){ //正解
    console.log("正解");
    Correct_answer();
  }
  else{ //不正解
    console.log("不正解");
    Incorrect_answer();
  }
}

// x押した時
cross_img.onclick = function(){
  circle_img.disabled = true; //押せないようにする
  cross_img.disabled = true; //押せないようにする
  if(answer_flag === true){ //正解
    console.log("正解");
    Correct_answer();
  }
  else{ //不正解
    console.log("不正解");
    Incorrect_answer();
  }
}

// 正解時
const Correct_answer = () => {
  score++;
  corrent_value.textContent = "正解";
  answer_img_random_num = Math.floor( Math.random() * 6); // 0~5のランダムな整数
  answer_img.src = "./correct_img/" + answer_img_random_num + ".jpg";
  modal_container.style.display = "block";
}

// 不正解時
const Incorrect_answer = () => {
  corrent_value.textContent = "不正解";
  answer_img_random_num = Math.floor( Math.random() * 5) + 5; // 0~4のランダムな整数 + 5
  answer_img.src = "./correct_img/" + answer_img_random_num + ".jpg";
  modal_container.style.display = "block";
}

// 次に進むを押した時
next_submit.onclick = function(){
  modal_container.style.display = "none";
  question_num++;
  circle_img.disabled = false; //押せるようにする
  cross_img.disabled = false;
  UpdataQuestion();
}