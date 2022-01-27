const express = require("express");
const router = express.Router();
const test = require("./test");
const notice = require("./notice");
const freeBoard = require("./freeboard");
const contest = require("./contest/contest");
const users = require("./users");
const lectures = require("./lectures/lectures");
const studygroups = require("./studygroup/studygroups");

router.use("/webgrus", test);
router.use("/notice", notice);
router.use("/freeBoard", freeBoard);
router.use("/contest", contest);
router.use("/users", users);
router.use("/lectures", lectures);
router.use("/studygroups", studygroups);

module.exports = router;
