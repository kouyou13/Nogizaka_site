'use strict';

import {main} from "./index.js";
import {quiz} from "./quiz.js";


let i, j; // カウンター
let userid; // ユーザーID
let username; // ユーザー名
let score; // スコア
let rank; // 順位

const title_ele = document.getElementById("title_ele");
const question_ele = document.getElementById("question_ele");
const result_ele = document.getElementById("result_ele");

const text_p = document.createElement("p");
const result_table = document.createElement("table");
const retry_btn = document.createElement("input");
const finish_btn = document.createElement("input");
let parameter = {};

//get_score.php実行
const Get_scorePOST = (parameter) => {
  return $.ajax({
    url: "./api/get_score.php",
    type: "POST",
    data: parameter,
    cache: false
  });
}

//get_rank.php実行
const Get_rankPOST = (parameter) => {
  return $.ajax({
    url: "./api/get_rank.php",
    type: "POST",
    data: parameter,
    cache: false
  });
}

// insert_score.php実行
const Insert_scorePOST = (parameter) => {
  return $.ajax({
    url: "./api/insert_score.php",
    type: "POST",
    data: parameter,
    cache: false
  });
}

const ranking = () => {
  const tbody = document.createElement("tbody");
  result_table.appendChild(tbody);
  let body_tr = document.createElement("tr");
  let rank_td = document.createElement("td");
  let name_td = document.createElement("td");
  let score_td = document.createElement("td");
  parameter = {
    user_name : username
  }
  Get_scorePOST(parameter).then(function(score_data) {
    for(i=0; i<score_data.length-1; i++){
      if (i<5){
        body_tr = document.createElement("tr");
        rank_td = document.createElement("td");
        name_td = document.createElement("td");
        score_td = document.createElement("td");
        
        rank_td.textContent = String(i+1);
        body_tr.appendChild(rank_td);
        name_td.textContent = score_data[i]["name"];
        body_tr.appendChild(name_td);
        score_td.textContent = score_data[i]["score"];
        body_tr.appendChild(score_td);
        tbody.appendChild(body_tr);
      }
    }
  });
}

export const result = (user_id, user_name, score_post) => {
  userid = user_id;
  username = user_name;
  score = score_post;

  parameter = {
    user_id : userid,
    score : score
  }
  Insert_scorePOST(parameter).then(function() {
    console.log("insert");
  });

  parameter = {
    score : score
  }
  Get_rankPOST(parameter).then(function(rank_data){
    rank = rank_data;
    text_p.textContent = username + "さんは" + rank + "位（" + score + "点）でした．";
  });

  result_ele.style.opacity = "1";
  question_ele.style.padding = "5% 0 0 0";
  result_ele.style.height = "80vh";

  // const text_p = document.createElement("p");
  text_p.id = "result_text";
  result_ele.appendChild(text_p);

  const btn_div = document.createElement("div");
  btn_div.id = "btn_div";
  result_ele.appendChild(btn_div);

  // const retry_btn = document.createElement("input");
  retry_btn.id = "retry";
  retry_btn.type = "submit";
  retry_btn.value = "もう一度";
  btn_div.appendChild(retry_btn);

  // const finish_btn = document.createElement("input");
  finish_btn.id = "finish";
  finish_btn.type = "submit";
  finish_btn.value = "終了";
  btn_div.appendChild(finish_btn);

  
  const table_div = document.createElement("div");
  table_div.id = "table_div";
  result_ele.appendChild(table_div);

  // const result_table = document.createElement("table");
  result_table.id = "result_table";
  table_div.appendChild(result_table);
  while (result_table.lastChild) {
    result_table.removeChild(result_table.lastChild);
  }
  
  const thead = document.createElement("thead");
  result_table.appendChild(thead);

  const head_tr = document.createElement("tr");
  const rank_th = document.createElement("th");
  const name_th = document.createElement("th");
  const score_th = document.createElement("th");
  rank_th.textContent = "順位";
  head_tr.appendChild(rank_th);
  name_th.textContent = "ユーザー名";
  head_tr.appendChild(name_th);
  score_th.textContent = "スコア";
  head_tr.appendChild(score_th);
  thead.appendChild(head_tr);
  ranking();
}

retry_btn.onclick = function(){
  while (result_ele.lastChild) {
    result_ele.removeChild(result_ele.lastChild);
  }
  quiz(userid, username);
}

finish_btn.onclick = function(){
  while (result_ele.lastChild) {
    result_ele.removeChild(result_ele.lastChild);
  }
  main();
}