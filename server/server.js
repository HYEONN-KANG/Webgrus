const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const test = require("./routes/test");
const notice = require("./routes/notice");
const freeBoard = require("./routes/freeboard");
const contest = require("./routes/contest");
const port = 3001; // 포트 넘버
const db = require("./db");

// db 연결
db.connect();

app.use(bodyParser.json());

app.use("/webgrus", test);
app.use("/notice", notice);
app.use("/freeboard", freeBoard);
app.use("/contest", contest);

app.get("/users", (req, res) => {
  res.send([
    // 유저 정보 기록 (삭제 예정)
    {
      id: "1",
      name: "webgrus",
      email: "webgrus@gmail.com",
      authority: 2,
      passWord: 1,
    },
    {
      id: "11111111",
      name: "user1",
      email: "user1@gmail.com",
      authority: 1,
      passWord: 11111111,
    },
    {
      id: "22222222",
      name: "user2",
      email: "user2@gmail.com",
      authority: 0,
      passWord: 22222222,
    },
    {
      id: "33333333",
      name: "user3",
      email: "user3@gmail.com",
      authority: 0,
      passWord: 33333333,
    },
  ]);
});

app.get("/", (req, res) => {
  res.send("/경로로 보내면 이상한 데이터가 오네요");
});

// 포트 설정
app.listen(port, () => console.log(port));
