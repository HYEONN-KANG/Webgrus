import React, { useRef } from 'react';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser }) => {
	const navigate = useNavigate();
	const formRef = useRef();

	// 로그인 함수
	const login = (event) => {
		event.preventDefault();
		const id = formRef.current.id.value;
		const passWord = formRef.current.passWord.value;

		axios
			.post('/api/users/login', { id, passWord }) // 로그인요청
			.then((res) => {
				if (res.data.msg === 'login') {
					// 로그인 성공시
					const data = {
						id: res.data.id,
						name: res.data.name,
						email: res.data.email,
						authority: res.data.authority,
					};
					setUser(data);
					console.log('login!');
					navigate('/');
				} else if (res.data.msg === 'wait') {
					alert('승인 심사중');
				}
			});
		// 로그인 실패시 비밀번호 칸 빈칸으로
		formRef.current.passWord.value = '';
		formRef.current.passWord.placeholder = '다시 입력하세요.';
	};

	return (
		<div className={styles.container}>
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
