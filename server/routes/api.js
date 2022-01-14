const express = require("express");
const router = express.Router();
const test = require("./test");
const notice = require("./notice");
const freeBoard = require("./freeboard");
const contest = require("./contest/contest");
const users = require("./users");

router.use("/webgrus", test);
router.use("/notice", notice);
router.use("/freeBoard", freeBoard);
router.use("/contest", contest);
router.use("/users", users);

module.exports = router;
