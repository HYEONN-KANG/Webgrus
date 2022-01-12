import React from 'react';
import SideBar from '../sidebar/sideBar';
import styles from './main.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Main = (props) => {
	const [title, setTitle] = useState('전송실패');

	useEffect(() => {
		axios
			.get('/webgrus/test') //
			.then((res) => {
				setTitle(res.data);
			});
	}, []);

	return (
		<div className={styles.container}>
			<SideBar login={props.login} setLogin={props.setLogin} />
			<div>{title}</div>
		</div>
	);
};

export default Main;
