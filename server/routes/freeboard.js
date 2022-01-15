const express = require("express");
const router = express.Router();
const FreeBoard = require("../models/freeboard"); // freeboard의 스키마 모델

const today = new Date();
router.get("/writes", (req, res) => {
  // 자유게시판 목록 보내주기
  FreeBoard.find({}, (err, notice) => {
    if (err) {
      console.log("자유게시판 목록 가져오기 error 발생");
      return res.json(err);
    }
    console.log("자유게시판 목록 가져오기 성공");
    res.json(notice);
  });
});

router.post("/addWrite", (req, res) => {
  console.log("http://localhost:3001/api/freeboard/addWrite");

  // post 형식으로 받아온 데이터를 변수로 저장
  let post = req.body;
  console.log(post);
  let new_freeboard = new FreeBoard();
  new_freeboard.id = "test user id"; // user id
  new_freeboard.title = post.newWrite.title;
  new_freeboard.description = post.newWrite.description;
  new_freeboard.author = "test user name";
  new_freeboard.date = post.newWrite.date;

  new_freeboard
    .save()
    .then((savedFree) => {
      // 데이터를 db에 추가
      console.log("save 성공", savedFree);

      FreeBoard.find({}, (err, notice) => {
        // 다시 글 목록을 불러와서 클라이언트로 전달
        if (err) {
          console.log("자유게시판 목록 가져오기 error 발생");
          return res.json(err);
        }
        console.log("자유게시판 목록 가져오기 성공");
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
  FreeBoard.remove({ _id: delete_id }, (err) => {
    if (err) console.log("삭제실패", err);
    else console.log("삭제 성공");
  });

  FreeBoard.find({}, (err, notice) => {
    if (err) {
      console.log("자유게시판 목록 가져오기 error 발생");
      return res.json(err);
    }
    console.log("자유게시판 목록 가져오기 성공");
    res.json(notice);
  });
});

module.exports = router;
