import React from 'react';
import styles from './contestWrite.module.css';

const ContestWrite = (props) => {
	// 	deleteWrite, writeIndex, login, write, authority;

	const showDetail = () => {
		props.showDetail(props.write);
	};

	return (
		<li className={styles.container}>
			<div className={styles.poster} onClick={showDetail}>
				<img src={props.write.src} alt="이미지"></img>
				<span className={styles.dday}>D-day 계산하기</span>
			</div>
			<h2>{props.write.title}</h2>
		</li>
	);
};

export default ContestWrite;
