import React, { useState } from 'react';
import styles from './contestDetail.module.css';
import Write from '../../../write/write';
import AddWrite from '../../../write/addwrite/addWrite';
import axios from 'axios';
import { useEffect } from 'react';

const ContestDetail = ({ detail, user }) => {
	const [addWrite, setAddWriting] = useState(false);
	const [writes, setWrites] = useState([]);

	useEffect(() => {
		// 모집 글 목록 불러오기
		axios
			.get('/api/contest/detail/writes', {
				params: {
					id: detail.id, // 해당 공모전 글의 모집 글 요청
				},
			})
			.then((res) => {
				setWrites(res.data);
			});
	}, []);

	const writing = () => {
		setAddWriting(true);
	};

	const addWriting = (newWrite) => {
		setAddWriting(false);
		axios
			.post('/api/contest/detail/addWrite', { newWrite }) // 새로운 글(write_id 미포함)
			.then((res) => {
				setWrites(res.data); // 새 글 목록 받아서 저장
			});
	};
	const deleteWrite = (writeId) => {
		axios
			.post('/api/contest/detail/deleteWrite', { writeId }) // 글 id 전달
			.then((res) => {
				setWrites(res.data); // 새 글 목록 받아서 저장 (rerender)
			});
	};
	return (
		<div className={styles.container}>
			<div className={styles.search}>
				{/* <input type="search" placeholder="검색"></input> */}
				{user.authority === '2' && <input type="button" onClick={writing} value="글쓰기"></input>}
			</div>
			<div>{detail.description}</div>
			<div>
				<h2>팀원 모집</h2>
				{addWrite && <AddWrite writes={writes} user={user} addWriting={addWriting} />}
				{addWrite || (
					<ul className={styles.writingList}>
						{Object.keys(writes).map((key) => {
							return (
								<Write
									key={key}
									writeIndex={key}
									write={writes[key]}
									deleteWrite={deleteWrite}
									user={user}
								/>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
};

export default ContestDetail;
