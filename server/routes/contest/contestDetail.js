const express = require("express");
const contestDetail = require("../../models/contestDetail");
const router = express.Router();
const Contest = require("../../models/contestDetail"); // contest의 스키마 모델

const today = new Date(); // 현재 날짜

// DB
let writes = [
  {
    _id: "1", // 글 id
    id: "11111111", // user_id
    title: "제목 1",
    description: "내용 1",
    author: "user1",
    date: `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`,
  },
  {
    _id: "2",
    id: "22222222",
    title: "제목 2",
    description: "내용 2",
    author: "user2",
    date: `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`,
  },
  {
    _id: "3",
    id: "33333333",
    title: "제목 3",
    description: "내용 3",
    author: "user3",
    date: `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`,
  },
];

// 글 목록 받아오기
router.get("/writes", (req, res) => {
  const { id } = req.query.id; // 공모전 아이디

  // 공모전의 아이디를 가지고 DB에서 찾아 꺼내왔다 치고..
  Contest.find({ id: id }, (err, result) => {
    if (err) {
      console.log("공모전 상세 가져오기 에러 발생");
      return res.json(err);
    }
    console.log("공모전 상세 가져오기 성공");
    res.json(result);
  });
});

// 글 추가
router.post("/addWrite", (req, res) => {
  console.log("공모전 상세 글 추가 페이지 들어옴");
  let post = req.body;
  // console.log(post);
  let new_content = new contestDetail();
  new_content.contestid = post.detail._id; // 공모전 글 아이디
  new_content.title = post.newWrite.title;
  new_content.description = post.newWrite.description;
  new_content.date = post.newWrite.date;

  new_content
    .save()
    .then((savedContent) => {
      console.log("공모전 상세 추가 성공");

      Contest.find({ contestid: post.detail._id }, (err, result) => {
        if (err) {
          console.log("공모전 상세 가져오기 에러 발생");
          return res.json(err);
        }
        console.log("공모전 상세 가져오기 성공");
        res.json(result);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// 글 삭제
router.post("/deleteWrite", (req, res) => {
  let post = req.body;
  // console.log(post);
  let writeId = post.writeId;

  // 글 삭제
  contestDetail.deleteOne({ _id: writeId }, (err, result) => {
    if (err) console.log("공모전 상세글 삭제 실패", err);
    else {
      console.log("공모전 상세 글 삭제 성공");
    }
  });

  // 다시 공모전의 상세내용 글 불러오기
  let contestid = post.detail._id;
  contestDetail.find({ contestid: contestid }, (err, result) => {
    if (err) {
      console.log("공모전 상세 가져오기 에러 발생");
      return res.json(err);
    }
    console.log("공모전 상세 가져오기 성공");
    res.json(result);
  });
});

module.exports = router;
