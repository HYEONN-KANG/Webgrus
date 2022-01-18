const express = require("express");
const router = express.Router();
const Notion = require("../models/notion"); // notion의 스키마 모델

const today = new Date();
router.get("/writes", (req, res) => {
  Notion.find({}, (err, notice) => {
    if (err) {
      console.log("공지목록 가져오기 error 발생");
      return res.json(err);
    }
    console.log("공지목록 가져오기 성공");
    res.json(notice);
  });
});

router.post("/addWrite", (req, res) => {
  // console.log("http://localhost:3001/api/notice/addWrite");

  // post 형식으로 받아온 데이터를 변수로 저장
  let post = req.body;
  console.log(post);
  let new_notion = new Notion();
  new_notion.id = "test user id"; // user id
  new_notion.title = post.newWrite.title;
  new_notion.description = post.newWrite.description;
  new_notion.author = "test user name";
  new_notion.date = post.newWrite.date;

  new_notion
    .save()
    .then((savedNotion) => {
      // 데이터를 db에 추가
      console.log("save 성공", savedNotion);

      Notion.find({}, (err, notice) => {
        // 다시 글 목록을 불러와서 클라이언트로 전달
        if (err) {
          console.log("공지목록 가져오기 error 발생");
          return res.json(err);
        }
        console.log("공지목록 가져오기 성공");
        res.json(notice);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/deleteWrite", (req, res) => {
  // post 형식으로 받아온 데이터를 변수로 저장
  let post = req.body;
  console.log(post);

  let delete_id = post.writeId; // 삭제할 글의 아이디

  // document 삭제
  Notion.remove({ _id: delete_id }, (err) => {
    if (err) console.log("삭제실패", err);
    else console.log("삭제 성공");
  });

  Notion.find({}, (err, notice) => {
    if (err) {
      console.log("공지목록 가져오기 error 발생");
      return res.json(err);
    }
    console.log("공지목록 가져오기 성공");
    res.json(notice);
  });
});

module.exports = router;
