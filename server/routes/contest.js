const express = require('express');
const router = express.Router();

const today = new Date();
router.get('/writes', (req, res) => {
	res.send([
		{
			id: '11111111',
			src: '../../colors/Pink.jpg',
			title: '제목 1',
			description: '공모전 1 내용',
			author: 'user1',
			date: `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`,
		},
		{
			id: '22222222',
			src: '../../colors/Pink.jpg',
			title: '제목 2',
			description: '공모전 2 내용',
			author: 'user2',
			date: `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`,
		},
		{
			id: '33333333',
			title: '제목 3',
			src: '../../colors/Pink.jpg',
			description: '공모전 3 내용',
			author: 'user3',
			date: `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`,
		},
	]);
});

module.exports = router;
