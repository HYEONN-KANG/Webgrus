import React, { useRef } from 'react';
import styles from './user.module.css';

const User = ({ uni, userData, changeAuthority }) => {
	const authRef = useRef();

	const changeAuth = () => {
		changeAuthority(uni, userData, parseInt(authRef.current.value));
	};

	return (
		<li className={styles.listitem}>
			<h3 className={styles.item}>{userData.id}</h3>
			<h3 className={styles.item}>{userData.name}</h3>
			<h3 className={styles.item}>{userData.email}</h3>
			<select ref={authRef} className={styles.item} name="authority" onChange={changeAuth}>
				<option>{userData.authority}</option>
				<option>0</option>
				<option>1</option>
				<option>2</option>
			</select>
		</li>
	);
};

export default User;
