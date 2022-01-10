import React, { useState } from 'react';
import styles from './write.module.css';

const Write = ({ deleteWrite, writeIndex, login, write, authority }) => {
	const [toggle, setToggle] = useState(false);

	const toggleDescroption = () => {
		if (toggle) {
			setToggle(false);
		} else {
			setToggle(true);
		}
	};
	const deleteWriteProps = () => {
		deleteWrite(writeIndex);
	};
	return (
		<>
			<li className={styles.write}>
				<input
					type="button"
					className={!toggle ? styles.plusButton : styles.hidden}
					onClick={toggleDescroption}
					value="+"
				/>
				<input
					type="button"
					className={toggle ? styles.plusButton : styles.hidden}
					onClick={toggleDescroption}
					value="-"
				/>
				<h3>{write.title}</h3>
				<h3>{write.author}</h3>
				<h3>{write.date}</h3>
				{(login.id === write.id) | (authority.authority === 2) ? (
					<button onClick={deleteWriteProps} className={styles.delete}>
						삭제
					</button>
				) : (
					<button className={`${styles.zeroOpacity} ${styles.delete}`}></button>
				)}
			</li>
			{toggle && <p className={styles.description}>{write.description}</p>}
		</>
	);
};
export default Write;
