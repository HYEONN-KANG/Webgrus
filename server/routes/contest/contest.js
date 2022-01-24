const express = require('express');
const router = express.Router();
const detail = require('./contestDetail');
const Contest = require('../../models/contest');
const multer = require('multer');
const path = require('path');
const today = new Date(); // 현재 날짜

// 팀원 모집 글 분리
router.use('/detail', detail);

// multer 선언 및 설정
const uploadFolder = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'client/public/posters/'); // 파일 저장 위치
		},
		filename: function (req, file, cb) {
			cb(null, new Date().valueOf() + path.extname(file.originalname)); //저장될 파일 이름
		},
	}),
});

// 공모전 글 목록
router.get('/writes', (req, res) => {
	Contest.find({}, (err, contest) => {
		if (err) {
			console.log('공모전 목록 가져오기 error 발생');
			return res.json(err);
		}
		console.log('공모전 목록 가져오기 성공');
		res.json(contest);
	});
});

// 공모전 포스터 이미지 저장
router.post('/addPoseter', uploadFolder.single('file'), (req, res) => {
	// console.log("/addPoster 로 들어옴");
	console.log(req.file.path.slice(14));
	res.json(req.file.path.slice(14));
});

// 공모전 소개 글 추가
router.post('/addWrite', (req, res) => {
	console.log('http://localhost:3001/api/notice/addWrite');

	// post 형식으로 받아온 데이터를 변수로 저장
	let post = req.body;
	// console.log(post);
	let new_contest = new Contest();
	new_contest.id = post.id; // user id
	// new_contest.poster = post.newWrite.poster;
	new_contest.title = post.title;
	new_contest.src = post.src; // 포스터 이미지가 저장된 경로
	new_contest.description = post.description;
	new_contest.author = post.author;
	new_contest.date = post.date;

	new_contest
		.save()
		.then((savedContest) => {
			// 데이터를 db에 추가
			console.log('save 성공');
			console.log(savedContest);
			res.json(savedContest);
			// Contest.find({}, (err, contest) => {
			//   // 다시 글 목록을 불러와서 클라이언트로 전달
			//   if (err) {
			//     console.log("공모전 목록 가져오기 error 발생");
			//     return res.json(err);
			//   }
			//   console.log("공모전 목록 가져오기 성공");
			//   res.json(contest);
			// });
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

// 공모전 글 삭제
router.post('/deleteWrite', (req, res) => {
	const { writeId } = req.body;
	console.log(writeId);

	Contest.deleteOne({ _id: writeId }, (err, result) => {
		if (err) console.log('공모전 삭제 실패', err);
		else {
			console.log('공모전 삭제 성공');
			console.log(result);
		}

		Contest.find({}, (err, contest) => {
			// 다시 글 목록을 불러와서 클라이언트로 전달
			if (err) {
				console.log('공모전 목록 가져오기 error 발생');
				return res.json(err);
			}
			console.log('공모전 목록 가져오기 성공');
			res.json(contest);
		});
	});
});

module.exports = router;
