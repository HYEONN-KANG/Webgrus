const express = require("express");
const router = express.Router();
const Notion = require("../db/notion");

router.post("/create_process", (req, res) => {
  console.log("http://localhost:3001/notice/create_process");
  // post 형식으로 받아온 데이터를 변수로 저장
  // var post = req.body;
  // var notion = new Notion({
  //   title: post.title,
  //   desc: post.desc,
  //   author: post.author,
  //   date: post.date,
  // });

  // var notions = mongoose.model("notions", Notion, "notions");

  var notion = new Notion.model({
    title: "title1",
    desc: "desc1",
    author: "who1",
  });

  // 데이터를 db에 추가
  notion
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });

  // 추가한 글의 링크를 클라이언트에게 전달
  res.send({ title: "this is a create_process" });
});

module.exports = router;
