import React from 'react';
import styles from './contestWrite.module.css';

// 공모전 소개 글
const ContestWrite = ({ showDetail, write, user, deleteWrite }) => {
	// 공모전 세부사항 들어가기
	const handleShowDetail = () => {
		showDetail(write);
	};

	// 글 지우기
	const handleDeleteWrite = () => {
		deleteWrite(write._id);
	};

	return (
		<li className={styles.container}>
			<div className={styles.poster} onClick={handleShowDetail}>
				<img src={write.src} alt="이미지"></img>
				<span className={styles.dday}>D-day 계산하기</span>
			</div>
			<h2>{write.title}</h2>
			{(user.authority === '2') | (user.id === write.id) && (
				<button onClick={handleDeleteWrite}>삭제</button>
			)}
		</li>
	);
};

export default ContestWrite;
