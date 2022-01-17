import React from 'react';
import styles from './main.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Main = (props) => {
	const [title, setTitle] = useState('서버 연결 실패');

	useEffect(() => {
		axios
			.get('/api/webgrus/test') //
			.then((res) => {
				setTitle(res.data);
			});
	}, []);

	return (
		<div className={styles.container}>
			<div>{title}</div>
		</div>
	);
};

export default Main;
