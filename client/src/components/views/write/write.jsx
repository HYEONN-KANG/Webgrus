import React, { useState } from 'react';
import styles from './write.module.css';

const Write = ({ deleteWrite, user, write }) => {
	const [toggle, setToggle] = useState(false);

	// 글 접었다 폈다 하는 기능
	const toggleDescroption = () => {
		if (toggle) {
			setToggle(false);
		} else {
			setToggle(true);
		}
	};

	// 글 삭제
	const deleteWriteProps = () => {
		deleteWrite(write._id);
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
				{(user.id === write.id) | (user.authority === '2') ? (
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
