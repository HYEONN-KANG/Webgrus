import React, { useEffect, useState } from 'react';
import styles from './contest.module.css';
import SideBar from '../sidebar/sideBar';
import { useNavigate } from 'react-router-dom';
import ContestWrite from './contest_list/contestWrite';
import ContestDetail from './contest_list/contest_detail.jsx/contestDetail';
import axios from 'axios';

const Contest = (props) => {
	const navigate = useNavigate();
	const [authority, setAuthority] = useState({ authority: 0 }); // 권한(admin은 2)
	const [showDeatilCheck, setShowDetailCheck] = useState(false);
	const [detail, setDetail] = useState();
	const [writes, setWrites] = useState([]);

	useEffect(() => {
		// 권한 체크
		if ((props.login.authority === 2) | (props.login.authority === 1)) {
			setAuthority({ authority: props.login.authority });
		} else {
			alert('권한이 없습니다.');
			navigate('/');
		}
	}, [props.login.authority, navigate]);

	useEffect(() => {
		// 글 목록 불러오기
		axios
			.get('/contest/writes') // 글 목록 요청
			.then((res) => {
				setWrites(res.data);
			});
	}, []);

	const showDetail = (object) => {
		setShowDetailCheck(true);
		setDetail(object);
	};

	return (
		<div className={styles.container}>
			<SideBar login={props.login} setLogin={props.setLogin} />
			<section className={styles.contest}>
				<div className={styles.header}>
					<h2>공모전</h2>
					{showDeatilCheck || (
						<div className={styles.search}>
							<input type="search" placeholder="검색"></input>
							{authority.authority === 2 && (
								<input type="button" onClick={() => {}} value="글쓰기"></input>
							)}
						</div>
					)}
				</div>
				{showDeatilCheck && (
					<div className={styles.detailContainer}>
						<ContestDetail
							detail={detail}
							login={props.login}
							authority={authority}
						></ContestDetail>
					</div>
				)}

				<ul className={showDeatilCheck ? styles.hidden : styles.writinglist}>
					{Object.keys(writes).map((key) => {
						return (
							<ContestWrite
								key={key}
								writeIndex={key}
								login={props.login}
								write={writes[key]}
								//deleteWrite={deleteWrite}
								showDetail={showDetail}
								authority={authority}
							/>
						);
					})}
				</ul>
			</section>
		</div>
	);
};

export default Contest;
