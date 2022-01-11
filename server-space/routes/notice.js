const express = require("express");
const router = express.Router();
const Notion = require("../db/notion"); // notion의 스키마 모델
const mongoose = require("mongoose");
const db = require("../db/db");

router.get("/", (req, res) => {
  Notion.find({}, (err, notice) => {
    if (err) return res.json(err);
    res.json(notice);
  });
});

router.post("/create_process", (req, res) => {
  console.log("http://localhost:3001/notice/create_process");

  // const col = db.connect().db("webgrusdb").collection("notice");

  // post 형식으로 받아온 데이터를 변수로 저장
  let post = req.body;
  let new_notion = new Notion();
  new_notion.title = post.title;
  new_notion.desc = post.desc;
  new_notion.author = post.author;

  // 데이터를 db에 추가
  new_notion.save();
  console.log("notice.js 데이터 db에 추가 완료");

  // 추가한 글의 링크를 클라이언트에게 전달
  if (err) {
    res.status(err.status).redirect("/notice/");
  } else {
    // 글을 생성하는데에 성공했으면 해당 글의 상세 페이지로 이동해야함 (수정필수)
    res
      .status(200)
      .send({
        title: new_notion.title,
        desc: new_notion.desc,
        author: new_notion.author,
      })
      .redirect("/");
  }
});

// router.post("/update_process", (req, res) => {
//   let post = req.body;
//   let old_notion = new Notion();
//   old_notion.title = post.old_title;
//   old_notion.desc = post.old_desc;
//   old_notion.author = post.old_author;

// });

router.post("/delete_process", (req, res) => {
  Notion.remove({}, (err, notion) => {
    if (err) return res.json(err);
    res.redirect("/notice/");
  });
});

module.exports = router;
