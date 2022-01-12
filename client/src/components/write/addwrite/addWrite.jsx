import React, { useRef } from 'react';

const AddWrite = ({ login, writes, addWriting }) => {
	const today = new Date();
	const textRef = useRef();
	const titleRef = useRef();

	const writing = () => {
		const newWrites = [...writes];
		newWrites.push({
			id: login.id,
			title: titleRef.current.value,
			description: textRef.current.value,
			author: login.name,
			date: `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`,
		});

		addWriting(newWrites);
	};

	return (
		<form>
			제목 <input ref={titleRef} type="text"></input>
			내용 <textarea ref={textRef}></textarea>
			<input type="button" value="글 작성" onClick={writing}></input>
		</form>
	);
};

export default AddWrite;
