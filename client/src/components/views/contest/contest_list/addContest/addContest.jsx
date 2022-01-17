import axios from 'axios';
import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AddContest = ({ user }) => {
	const today = new Date();
	const textRef = useRef();
	const titleRef = useRef();
	const navigate = useNavigate();

	const writing = () => {
		const newWrite = {
			_id: Date.now(),
			id: 'user.id',
			// 파일 처리 구현해야 함.
			file: '',
			title: titleRef.current.value,
			description: textRef.current.value,
			author: 'user.name',
			date: `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`,
		};

		axios
			.post('/api/contest/addWrite', { newWrite }) //
			.catch(() => {
				alert('글이 제대로 저장되지 않았습니다.');
			});

		navigate('/contest');
	};

	return (
		<form onSubmit={writing}>
			제목 : <input ref={titleRef} type="text"></input>
			내용 : <textarea ref={textRef}></textarea>
			포스터 : <input type="file" name="poster"></input>
			<input type="button" value="글 작성" onClick={writing}></input>
		</form>
	);
};

export default AddContest;
