const express = require("express");
const router = express.Router();

// 유저 정보 기록 (DB가 없어서..)
const users = [
  {
    id: "1",
    name: "webgrus",
    email: "webgrus@gmail.com",
    authority: "2",
    passWord: "1",
  },
  {
    id: "11111111",
    name: "user1",
    email: "user1@gmail.com",
    authority: "1",
    passWord: "11111111",
  },
];

// 유저 리스트 받아오기(admin에서 사용)
router.get("/list", (req, res) => {
  res.send(users);
});

// admin에서 유저 권한 수정
router.post("/change", (req, res) => {
  const { id, authority } = req.body;

  for (let i = 0; i < users.length; i++) {
    // 유저 권한 수정
    if (users[i].id === id) {
      users[i].authority = authority;
    }
  }

  res.send(users);
});

// 회원 가입
router.post("/sign", (req, res) => {
  const { id, name, passWord, email } = req.body;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      return res.json({ msg: "idDuplicate" });
    }
  }
  users.push({ id, name, passWord, email, authority: "0" });
  res.status(200).json({ msg: "signed !" });
});

// 로그인 (아직 유효성 체크 X)
router.post("/login", (req, res) => {
  const { id, passWord } = req.body;

  for (let i = 0; i < users.length; i++) {
    if (
      (users[i].id === id) &
      (users[i].passWord === passWord) &
      ((users[i].authority === "2") | (users[i].authority === "1"))
    ) {
      return res.status(200).json({
        msg: "login",
        id: users[i].id,
        name: users[i].name,
        email: users[i].email,
        authority: users[i].authority,
      });
    } else if (
      (users[i].id === id) &
      (users[i].passWord === passWord) &
      (users[i].authority === "0")
    ) {
      return res.json({ msg: "wait" });
    }
  }
});

module.exports = router;
