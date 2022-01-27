import React, { useEffect, useState } from 'react';
import styles from './freeBoard.module.css';
import Write from '../write/write';
import AddWrite from '../write/addwrite/addWrite';
import axios from 'axios';
import SelectPage from '../write/selectPage/selectPage';
import EditWrite from '../write/editWrite/editWrite';

const FreeBoard = ({ user }) => {
	const [addWrite, setAddWriting] = useState(false);
	const [editWrite, setEditWriting] = useState({
		write: '',
		status: false,
	});
	const [writes, setWrites] = useState([]);

	useEffect(() => {
		// 글 목록 불러오기
		pageChange(1); // 처음엔 1페이지 불러오기
	}, []);

	// 해당 페이지 글 보여주기
	const pageChange = (page) => {
		axios
			.get('/api/freeBoard/writes', { params: { page } }) // 글 목록 요청 -> 페이지별 글 나누기
			.then((res) => {
				setWrites(res.data);
				console.log(res.data);
			});
	};

	// 글쓰기 보이게
	const writing = () => {
		setAddWriting(true);
	};

	// 수정 페이지 보이게 + 수정할 글 정보 저장
	const editing = (write) => {
		setEditWriting((state) => {
			return { ...state, status: true, write: write };
		});
	};

	// 글 수정 요청
	const editWriting = (editWrite) => {
		console.log(editWrite); // 원래 글 양식에서 제목과 내용만 수정된 object

		// todo 글 수정 요청 이 부분을 서버에서 해주시면 될 것 같습니다.
		// axios
		// 	.post('/api/freeBoard/editWrite', { editWrite }) //
		// 	.then((res) => {
		// 		setWrites(res.data); // 1페이지 글 목록 받아서 저장
		// 		console.log(res);
		// 	});
	};

	// 글쓰고 추가 요청
	const addWriting = (newWrite) => {
		setAddWriting(false);

		axios
			.post('/api/freeBoard/addWrite', { newWrite }) //
			.then((res) => {
				setWrites(res.data); // 1페이지 글 목록 받아서 저장
			});
	};

	// 글 삭제 요청
	const deleteWrite = async (writeId) => {
		await axios
			.post('/api/freeBoard/deleteWrite', { writeId }) // 글 id 전달
			.then((res) => {
				setWrites(res.data); // 1페이지 글 목록 받아서 저장
			});
	};

	return (
		<div className={styles.container}>
			<section className={styles.freeBoard}>
				<div className={styles.header}>
					<h2>공지사항</h2>
					<div className={styles.search}>
						<input type="search" placeholder="검색"></input>
						{user.authority === '2' && (
							<input type="button" onClick={writing} value="글쓰기"></input>
						)}
					</div>
				</div>
				{editWrite.status && <EditWrite write={editWrite.write} editWriting={editWriting} />}
				{addWrite && <AddWrite writes={writes.writes} user={user} addWriting={addWriting} />}
				{addWrite || (
					<ul className={`${editWrite.status ? styles.hidden : styles.writingList}`}>
						{writes.writes &&
							Object.keys(writes.writes).map((key) => {
								return (
									<Write
										key={key}
										writeIndex={key}
										user={user}
										write={writes.writes[key]}
										editing={editing}
										deleteWrite={deleteWrite}
									/>
								);
							})}
					</ul>
				)}
				{addWrite || (
					<div className={`${editWrite.status ? styles.hidden : styles.none}`}>
						{writes.pages &&
							// 전달 받은 페이지의 수 만큼 페이지 이동 버톤 만들기
							[...Array(writes.pages)].map((n, index) => {
								return <SelectPage key={index} page={index} pageChange={pageChange} />;
							})}
					</div>
				)}
			</section>
		</div>
	);
};

export default FreeBoard;
