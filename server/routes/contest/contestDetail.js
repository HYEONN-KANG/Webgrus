const express = require("express");
const router = express.Router();

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

  res.status(200).send(writes);
});

// 글 추가
router.post("/addWrite", (req, res) => {
  const { newWrite } = req.body;
  writes.push(newWrite);
  res.status(200).send(writes);
});

// 글 삭제
router.post("/deleteWrite", (req, res) => {
  const { writeId } = req.body;

  writes = writes.filter((write) => write._id != writeId);

  res.status(200).send(writes);
});

module.exports = router;
