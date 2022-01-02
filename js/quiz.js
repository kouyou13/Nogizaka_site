'use strict';
// 時間制限

// let time = 60;
let counter;
// min_post = Math.floor(time / 60); //Math.floorは小数点切り捨て
// sec_post = time % 60;
const min = document.getElementById('min');
const sec = document.getElementById('sec');

const question_sentence = document.getElementById("question_sentence"); //問題文
const container_div = document.getElementById("container");
const member_face_img = document.getElementById("member_face_img"); //顔画像
const answer_img = document.getElementById("answer_img"); //正解画面の画像
let random_num_tmp = 0;
const corrent_value = document.getElementById("corrent_value");


const circle = document.getElementById('circle_img');
const cross = document.getElementById('cross_img');
const modal = document.getElementById('modal');
const next_button = document.getElementById('next');


let answer_flag = false;

//get_member.php実行
const Get_memberPOST = () => {
  return $.ajax({
    url: "./api/get_member.php",
    type: "POST",
    cache: false
  });
}

// タイマーの関数
function Count(){
  counter = setInterval(Timer, 1000); //setInterval(実行する関数、1000ミリ秒ごと)に実行
}

function Timer(){
  if(time <= 0){
    min.innerHTML = 0; //HTMLに反映
    sec.innerHTML = 0; //HTMLに反映
    circle.disabled = true; //押せないようにする
    cross.disabled = true; //押せないようにする
    alert('終了！');
    clearInterval(counter);
    // 同じウィンドウ

    $('#finish_form').submit();

    // location.href = "result.php?correct_answers_num=" + correct_answers_num + "&";
    
    // 別のウィンドウ
    // open( "result.php", "_blank" ) ;
  }
  else{
    time -= 1;
    min_post = Math.floor(time / 60); //Math.floorは小数点切り捨て
    sec_post = time % 60;
    min.innerHTML = ( '00' + min_post ).slice( -2 );
    sec.innerHTML = ( '00' + sec_post ).slice( -2 );
    // min.innerHTML = min_post;
    // sec.innerHTML = sec_post;
  }
}

// 正解したとき
function Correct_answer(){
  random_num_tmp = Math.floor( Math.random() * 6); //1~6の乱数
  answer_img.src = "correct_img/" + String(random_num_tmp) + ".jpg";

  correct_answers_num++;
  
  corrent_value.innerHTML  = '正解';

  const new_input_correct_answers_num = document.createElement('input');
  new_input_correct_answers_num.name = 'correct_answers_num';
  new_input_correct_answers_num.value = correct_answers_num;
  new_input_correct_answers_num.type = 'hidden';
  next_button.before(new_input_correct_answers_num);

  const new_input_min = document.createElement('input');
  new_input_min.name = 'min_post';
  new_input_min.value = min_post;
  new_input_min.type = 'hidden';
  next_button.before(new_input_min);
  
  const new_input_sec = document.createElement('input');
  new_input_sec.name = 'sec_post';
  new_input_sec.value = sec_post;
  new_input_sec.type = 'hidden';
  next_button.before(new_input_sec);

  modal.style.display = 'block';
}

//不正解したとき
function Incorrect_answer(){
  random_num_tmp = Math.floor( Math.random() * 4); //7~10の乱数
  answer_img.src = "correct_img/" + String(random_num_tmp + 6) + ".jpg";

  corrent_value.innerHTML = '不正解';

  const new_input_correct_answers_num = document.createElement('input');
  new_input_correct_answers_num.name = 'correct_answers_num';
  new_input_correct_answers_num.value = correct_answers_num;
  new_input_correct_answers_num.type = 'hidden';
  next_button.before(new_input_correct_answers_num);

  const new_input_min = document.createElement('input');
  new_input_min.name = 'min_post';
  new_input_min.value = min_post;
  new_input_min.type = 'hidden';
  next_button.before(new_input_min);
  
  const new_input_sec = document.createElement('input');
  new_input_sec.name = 'sec_post';
  new_input_sec.value = sec_post;
  new_input_sec.type = 'hidden';
  next_button.before(new_input_sec);

  modal.style.display = 'block';
}


let parameter = {
  "user_name" : user_name
};
Get_memberPOST(parameter).then(function(data) {
  let member_data = data;
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
        member_face_img.src = "member_img/" + question_text_parts;
        break;
      case 1: //年齢問題
        member_face_img.src = "member_img/" + member_data[first_random_num]["face"];
        question_text_parts_answer = member_data[first_random_num]["age"];
        if (random_number == 0)
          question_text_parts = member_data[first_random_num]["age"];
        else
          question_text_parts = member_data[second_random_num]["age"];
        question_sentence.innerHTML = question_member_name + "さんは" + question_text_parts + "歳である。";
        break;
      case 2: //備考1の問題
        member_face_img.src = "member_img/" + member_data[first_random_num]["face"];
        question_text_parts_answer = member_data[first_random_num]["birthday"];
        if (random_number == 0)
          question_text_parts = member_data[first_random_num]["birthday"];
        else
          question_text_parts = member_data[second_random_num]["birthday"];
        question_sentence.innerHTML = question_member_name + "さんの生年月日は" + question_text_parts + "である。";
        break;
      case 3: //備考2の問題
        member_face_img.src = "member_img/" + member_data[first_random_num]["face"];
        question_text_parts_answer = member_data[first_random_num]["birthplace"];
        if (random_number == 0)
          question_text_parts = member_data[first_random_num]["birthplace"];
        else
          question_text_parts = member_data[second_random_num]["birthplace"];
        question_sentence.innerHTML = question_member_name + "さんの出身は" + question_text_parts + "である。";
        break;
      case 4: //備考3の問題
        member_face_img.src = "member_img/" + member_data[first_random_num]["face"];
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

function imgClick_circle() { //○を押したとき
  if(answer_flag === true){ //正解
    console.log("正解");
    Correct_answer();
  }
  else{ //不正解
    console.log("不正解");
    Incorrect_answer();
  }
}

function imgClick_cross() { //×を押したとき
  if(answer_flag === true){ //不正解
    console.log("不正解");
    Incorrect_answer();
  }
  else{ //正解
    console.log("正解");
    Correct_answer();
  }
}

Count(); //タイマー