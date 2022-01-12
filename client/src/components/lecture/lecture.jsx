import React, { useEffect, useState } from 'react';
import styles from './lecture.module.css';
import SideBar from '../sidebar/sideBar';
import { useNavigate } from 'react-router-dom';

const Lecture = (props) => {
	const navigate = useNavigate();
	const [authority, setAuthority] = useState({ authority: 0 }); // 권한(admin은 2)

	useEffect(() => {
		// 권한 체크
		if ((props.login.authority === 2) | (props.login.authority === 1)) {
			setAuthority({ authority: props.login.authority });
		} else {
			alert('권한이 없습니다.');
			navigate('/');
		}
	}, [props.login.authority, navigate]);
	return (
		<div className={styles.container}>
			<SideBar login={props.login} setLogin={props.setLogin} />
			<div>Lecture</div>
		</div>
	);
};

export default Lecture;
