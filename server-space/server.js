const express = require("express");
const app = express();
const path = require("path");
const index = require("./routes/index");
const notice = require("./routes/notice");
const cors = require("cors");

// app.use(express.static(path.join(__dirname, "../react-space/build")));
// app.get("/", function (request, response) {
//   response.sendFile(path.join(__dirname, "../react-space/build/index.html"));
// });

app.use(cors());
app.use("/", index);
app.use("/notice", notice);

app.listen(3001, function () {
  console.log("nodejs server is running on port 3001");
});
