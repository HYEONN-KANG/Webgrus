const express = require("express");
const router = express.Router();
const detail = require("./contestDetail");
const Contest = require("../../models/contest");
const multer = require("multer");
const today = new Date(); // 현재 날짜

// 팀원 모집 글 분리
router.use("/detail", detail);

// 공모전 이미지를 저장할 저장소
const storage = multer.diskStorage({
  destination: "../../../data/contestImg/", // 저장할 위치
  filename: function (req, file, cb) {
    cb(null, "imgfile" + Date.now() + path.extname(file.originalname));
  },
});

// 업로드 옵션
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

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
  console.log("req.file ", req.file);
  console.log("req.file.filename", req.file.filename);

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
  console.log(writeId);

  Contest.deleteOne({ _id: writeId }, (err, result) => {
    if (err) console.log("공모전 삭제 실패", err);
    else {
      console.log("공모전 삭제 성공");
      console.log(result);
    }

    Contest.find({}, (err, contest) => {
      // 다시 글 목록을 불러와서 클라이언트로 전달
      if (err) {
        console.log("공모전 목록 가져오기 error 발생");
        return res.json(err);
      }
      console.log("공모전 목록 가져오기 성공");
      res.json(contest);
    });
  });
});

module.exports = router;
