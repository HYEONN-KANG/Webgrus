const express = require("express");
const app = express();
const path = require("path");
const indexRouter = require("./routes/index");
const noticeRouter = require("./routes/notice");
const cors = require("cors");
const db = require("./db/db");

// app.use(express.static(path.join(__dirname, "../react-space/build")));
// app.get("/", function (request, response) {
//   response.sendFile(path.join(__dirname, "../react-space/build/index.html"));
// });

// mongodb 연결
db.connect();

app.use(cors());
app.use("/", indexRouter);
app.use("/notice", noticeRouter);

app.listen(3001, function () {
  console.log("nodejs server is running on port 3001");
});
