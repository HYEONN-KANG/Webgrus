const express = require("express");
const router = express.Router();

router.get("/create_process", (req, res) => {
  console.log("http://localhost:3001/notice/create_process");
  // post 형식으로 받아온 데이터를 변수로 저장
  var post = req.body;
  var title = post.title;
  var desc = post.desc;
  var author = post.author;

  // 데이터를 db에 추가

  // 추가한 글의 링크를 클라이언트에게 전달
  res.send({ title: "this is a create_process" });
});

module.exports = router;
