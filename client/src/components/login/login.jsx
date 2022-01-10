import React, { useEffect, useRef } from 'react';
import styles from './login.module.css';
import SideBar from '../sidebar/sideBar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
	// const users = useSelector((state) => state); // redux
	const [userData, setUserData] = useState([]);
	const navigate = useNavigate();
	const formRef = useRef();

	useEffect(() => {
		axios.get('/users').then((res) => {
			console.log(res.data);
			setUserData(res.data);
		});
	}, []);

	const login = (event) => {
		event.preventDefault();
		const id = formRef.current.id.value;
		const passWord = formRef.current.passWord.value;
		let check = false;
		for (let i = 0; i < userData.length; i++) {
			if ((id === String(userData[i].id)) & (passWord === String(userData[i].passWord))) {
				check = true;
				props.setLogin({ ...userData[i] });
				navigate('/');
				break;
			}
		}
		if (!check) {
			alert('학번 또는 비밀번호가 틀립니다.');
			formRef.current.passWord.value = '';
		}
	};

	return (
		<div className={styles.container}>
			<SideBar login={props.login} setLogin={props.setLogin} />
			<div className={styles.formContainer}>
				<form ref={formRef} className={styles.form} onSubmit={login}>
					<input type="text" name="id" placeholder="학번" autoFocus />
					<input type="password" name="passWord" placeholder="비밀번호" />
					<input type="submit" value="로그인"></input>
				</form>
			</div>
		</div>
	);
};

export default Login;
