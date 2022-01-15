const express = require("express");
const router = express.Router();
const detail = require("./contestDetail");
const Contest = require("../../models/contest");
const today = new Date(); // 현재 날짜

// 팀원 모집 글 분리
router.use("/detail", detail);

// 공모전 글 목록
router.get("/writes", (req, res) => {
  Contest.find({}, (err, contest) => {
    if (err) {
      console.log("공모전 목록 가져오기 error 발생");
      return res.json(err);
    }
    console.log("공모전 목록 가져오기 성공");
    res.json(contest);
  });
});

// 공모전 소개 글 추가 (파일 전달 미구현)
router.post("/addWrite", (req, res) => {
  console.log("http://localhost:3001/api/notice/addWrite");

  // post 형식으로 받아온 데이터를 변수로 저장
  let post = req.body;
  console.log(post);
  let new_contest = new Contest();
  new_contest.id = "test user id"; // user id
  new_contest.poster = post.newWrite.poster;
  new_contest.title = post.newWrite.title;
  new_contest.description = post.newWrite.description;
  new_contest.author = "test user name";
  new_contest.date = post.newWrite.date;

  new_contest
    .save()
    .then((savedContest) => {
      // 데이터를 db에 추가
      console.log("save 성공", savedContest);

      Contest.find({}, (err, contest) => {
        // 다시 글 목록을 불러와서 클라이언트로 전달
        if (err) {
          console.log("공모전 목록 가져오기 error 발생");
          return res.json(err);
        }
        console.log("공모전 목록 가져오기 성공");
        res.json(contest);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// 공모전 글 삭제
router.post("/deleteWrite", (req, res) => {
  const { writeId } = req.body;

  writes = writes.filter((write) => write._id != writeId);

  res.status(200).send(writes);
});

module.exports = router;
