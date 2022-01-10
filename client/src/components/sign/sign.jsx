import React, { useRef } from 'react';
import styles from './sign.module.css';
import SideBar from '../sidebar/sideBar';
import { useDispatch } from 'react-redux';

const Sign = (props) => {
	const dispatch = useDispatch();
	const formRef = useRef();
	const sign = (event) => {
		event.preventDefault();
		if (formRef.current.passWord.value === formRef.current.passWordCheck.value) {
			dispatch({
				type: 'ADDUSER',
				data: {
					id: formRef.current.id.value,
					name: formRef.current.name.value,
					email: formRef.current.email.value,
					passWord: formRef.current.passWord.value,
				},
			});
			formRef.current.reset();
		} else {
			formRef.current.passWord.value = '';
			formRef.current.passWordCheck.value = '';
		}
	};
	return (
		<div className={styles.container}>
			<SideBar login={props.login} setLogin={props.setLogin} />
			<div className={styles.formContainer}>
				<form ref={formRef} className={styles.form} onSubmit={sign}>
					<input type="text" name="name" placeholder="이름(실명)" autoFocus />
					<input type="text" name="id" placeholder="학번" />
					<input type="password" name="passWord" placeholder="비밀번호" />
					<input type="password" name="passWordCheck" placeholder="비밀번호 확인" />
					<input type="email" name="email" placeholder="이메일" />
					<input type="submit" value="가입"></input>
				</form>
			</div>
		</div>
	);
};

export default Sign;
