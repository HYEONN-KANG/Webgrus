import React, { useEffect, useState } from 'react';
import styles from './contest.module.css';
import { useNavigate } from 'react-router-dom';
import ContestWrite from './contest_list/contestWrite';
import ContestDetail from './contest_list/contest_detail/contestDetail';
import axios from 'axios';

const Contest = ({ user }) => {
	const navigate = useNavigate();
	const [showDeatilCheck, setShowDetailCheck] = useState(false); // 세부사항 볼때 true
	const [detail, setDetail] = useState(); // 세부사항 볼 때 공모전 정보
	const [writes, setWrites] = useState([]); // 공모전 글 저장

	useEffect(() => {
		// 글 목록 불러오기
		const page = 1; // 페이지 글 -> 페이지 기능 만들면 고쳐야함
		axios
			.get('/api/contest/writes', { page }) // 페이지 글 목록 요청
			.then((res) => {
				setWrites(res.data);
			});
	}, []);

	// 공모전 클릭시 세부사항 보기
	const showDetail = (object) => {
		setShowDetailCheck(true);
		setDetail(object);
	};

	// 공모전 소개 글 지우기
	const deleteWrite = (writeId) => {
		axios
			.post('/api/contest/deleteWrite', { writeId }) // 글 id 전달
			.then((res) => {
				setWrites(res.data); // 새 글 목록 받아서 저장
			});
	};

	return (
		<div className={styles.container}>
			<section className={styles.contest}>
				<div className={styles.header}>
					<div className={styles.contestTitle}>공모전</div>
					{showDeatilCheck || (
						<form className={styles.search}>
							<input className={styles.searchInput} type="search" placeholder="🔍"></input>
							<input className={styles.searchButton} type="button" value="검색"></input>
							<button
								className={`${showDeatilCheck ? styles.hidden : styles.addWriteButton}`}
								onClick={() => navigate('/contest/addWriting')}
							>
								공모전 글 작성
							</button>
						</form>
					)}
				</div>

				{showDeatilCheck && (
					<div className={styles.detailContainer}>
						<ContestDetail detail={detail} user={user}></ContestDetail>
					</div>
				)}

				<ul className={showDeatilCheck ? styles.hidden : styles.writingList}>
					{Object.keys(writes).map((key) => {
						console.log(writes[key].src);
						return (
							<ContestWrite
								key={key}
								writeIndex={key}
								write={writes[key]}
								user={user}
								showDetail={showDetail}
								deleteWrite={deleteWrite}
							/>
						);
					})}
				</ul>
			</section>
		</div>
	);
};

export default Contest;
