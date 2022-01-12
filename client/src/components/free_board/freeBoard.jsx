import React, { useEffect, useState } from 'react';
import styles from './freeBoard.module.css';
import SideBar from '../sidebar/sideBar';
import Write from '../write/write';
import AddWrite from '../write/addwrite/addWrite';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FreeBoard = (props) => {
	const navigate = useNavigate();
	const [authority, setAuthority] = useState({ authority: 0 });
	const [addWrite, setAddWriting] = useState(false);
	const [writes, setWrites] = useState([
		// {
		// 	id: '',
		// 	title: '',
		// 	description: '',
		// 	author: '',
		// 	date: ``,
		// },
	]);

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
			.get('/notice/writes') // 글 목록 요청
			.then((res) => {
				setWrites(res.data);
			});
	}, []);

	useEffect(() => {
		return () => setWrites(null);
	}, []);

	const writing = () => {
		// 메모리 누수 에러 메세지 해결
		setAddWriting(true);
	};

	const addWriting = (newWrites) => {
		setAddWriting(false);
		setWrites(newWrites);
	};
	const deleteWrite = (writeIndex) => {
		const data = [...writes];
		data.pop(writeIndex);
		setWrites(data);
	};

	return (
		<div className={styles.container}>
			<SideBar login={props.login} setLogin={props.setLogin} />
			<section className={styles.notice}>
				<div className={styles.header}>
					<h2>공지사항</h2>
					<div className={styles.search}>
						<input type="search" placeholder="검색"></input>
						{authority.authority === 2 && (
							<input type="button" onClick={writing} value="글쓰기"></input>
						)}
					</div>
				</div>
				{addWrite && <AddWrite writes={writes} login={props.login} addWriting={addWriting} />}
				{addWrite || (
					<ul className={styles.writingList}>
						{Object.keys(writes).map((key) => {
							return (
								<Write
									key={key}
									writeIndex={key}
									login={props.login}
									write={writes[key]}
									deleteWrite={deleteWrite}
									authority={authority}
								/>
							);
						})}
					</ul>
				)}
			</section>
		</div>
	);
};

export default FreeBoard;
