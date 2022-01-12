const express = require('express');
const router = express.Router();

const today = new Date();
router.get('/writes', (req, res) => {
	res.send([
		{
			id: '11111111',
			title: '제목 1',
			description: '내용 1',
			author: 'user1',
			date: `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`,
		},
		{
			id: '22222222',
			title: '제목 2',
			description: '내용 2',
			author: 'user2',
			date: `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`,
		},
		{
			id: '33333333',
			title: '제목 3',
			description: '내용 3',
			author: 'user3',
			date: `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`,
		},
	]);
});

module.exports = router;
