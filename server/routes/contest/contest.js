const express = require("express");
const router = express.Router();
const detail = require("./contestDetail");
const today = new Date(); // 현재 날짜

// DB
let writes = [
  {
    _id: "1", // 글 id
    id: "11111111", // user id
    src: "",
    title: "제목 1",
    description: "공모전 1 내용",
    author: "user1",
    date: `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`,
  },
  {
    _id: "2",
    id: "22222222",
    src: "",
    title: "제목 2",
    description: "공모전 2 내용",
    author: "user2",
    date: `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`,
  },
  {
    _id: "3",
    id: "33333333",
    title: "제목 3",
    src: "",
    description: "공모전 3 내용",
    author: "user3",
    date: `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`,
  },
];

// 팀원 모집 글 분리
router.use("/detail", detail);

// 공모전 글 목록
router.get("/writes", (req, res) => {
  const page = req.query.page; // 페이지 요청

  res.send(writes);
});

// 공모전 소개 글 추가 (파일 전달 미구현)
router.post("/addWrite", (req, res) => {
  const { newWrite } = req.body;
  writes.push(newWrite);

  res.status(200);
});

// 공모전 글 삭제
router.post("/deleteWrite", (req, res) => {
  const { writeId } = req.body;

  writes = writes.filter((write) => write._id != writeId);

  res.status(200).send(writes);
});

module.exports = router;
