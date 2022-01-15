const express = require("express");
const router = express.Router();
const Contest = require("../models/contest");

const today = new Date();
router.get("/writes", (req, res) => {
  console.log("공모전 목록 불러오기");
});

router.post("/addWrite", (req, res) => {
  console.log("http://localhost:3001/api/contest/addWrite");

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
          console.log("공모전 가져오기 error 발생");
          return res.json(err);
        }
        console.log("공모전 가져오기 성공");
        res.json(contest);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
