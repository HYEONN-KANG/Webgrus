import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './admin.module.css';
import User from './user/user';

const Admin = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const usersData = useSelector((state) => {
		// console.log(state.sort((a, b) => b.authority - a.authority));  권한 기준 정렬
		return state.sort((a, b) => a.authority - b.authority);
	}); // userdata
	const [authority, setAuthority] = useState({ check: 2 }); // 권한(admin은 2)

	useEffect(() => {
		// 권한 체크
		if (authority.check === 2) {
			//pass
		} else {
			alert('권한이 없습니다.');
			navigate('/');
		}
	}, [authority.check, navigate]);

	const changeAuthority = (key, userData, authValue) => {
		// 권한 변경
		dispatch({
			type: 'CHANGEAUTH',
			data: {
				key: key,
				id: userData.id,
				name: userData.name,
				email: userData.email,
				authority: authValue,
				passWord: userData.passWord,
			},
		});
	};

	return (
		<>
			<div className={styles.header}>
				<h2 onClick={() => navigate(-1)}>이전 화면으로</h2>
				<input type="search" placeholder="검색"></input>
			</div>
			<ul>
				<li className={styles.listitem}>
					<h3 className={styles.item}>학번(아이디)</h3>
					<h3 className={styles.item}>이름</h3>
					<h3 className={styles.item}>이메일</h3>
					<h3 className={styles.item}>권한</h3>
				</li>
				{Object.keys(usersData).map((key) => {
					return (
						<User key={key} uni={key} userData={usersData[key]} changeAuthority={changeAuthority} />
					);
				})}
			</ul>
		</>
	);
};
export default Admin;
