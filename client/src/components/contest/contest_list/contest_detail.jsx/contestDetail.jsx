import React, { useState } from 'react';
import styles from './contestDetail.module.css';
import Write from '../../../write/write';
import AddWrite from '../../../write/addwrite/addWrite';

const ContestDetail = (props) => {
	const today = new Date();
	const [addWrite, setAddWriting] = useState(false);
	const [writes, setWrites] = useState([
		// 모집 글 2개
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
	]);

	const writing = () => {
		setAddWriting(true);
		console.log(addWrite);
		console.log('w');
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
			<div className={styles.search}>
				{/* <input type="search" placeholder="검색"></input> */}
				{props.authority.authority === 2 && (
					<input type="button" onClick={writing} value="글쓰기"></input>
				)}
			</div>
			<div>{props.detail.description}</div>
			<div>
				<h2>팀원 모집</h2>
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
									authority={props.authority}
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
