import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './sideBar.module.css';

const SideBar = ({ login, setLogin }) => {
	const navigate = useNavigate();
	const [authority, setAuthority] = useState({ authority: 0 });
	const logOut = () => {
		setLogin({ authority: 0 });
		navigate('/');
	};
	useEffect(() => {
		setAuthority(login.authority);
	}, [login]);

	return (
		<nav className={styles.nav}>
			<div className={styles.bar}>
				<h2 className={styles.webGrus} onClick={() => navigate('/')}>
					Webgrus
				</h2>
				<h3 onClick={() => navigate('/notice')}>공지</h3>
				<h3 onClick={() => navigate('/lecture')}>강의</h3>
				<h3 onClick={() => navigate('/study')}>스터디</h3>
				<h3 onClick={() => navigate('/contest')}>공모전</h3>
				<h3 onClick={() => navigate('/freeboard')}>자유게시판</h3>
			</div>
			<div>
				{authority === 2 && (
					<>
						<h3 onClick={() => navigate('/admin')}>회원 관리</h3>
						<h3 onClick={logOut}>로그아웃</h3>
					</>
				)}
				{authority === 1 && <h3 onClick={logOut}>로그아웃</h3>}
				{authority === 0 && (
					<>
						<h3 onClick={() => navigate('/login')}>로그인</h3>
						<h3 onClick={() => navigate('/sign')}>회원가입</h3>
					</>
				)}
			</div>
		</nav>
	);
};

export default SideBar;
