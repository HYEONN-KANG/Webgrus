import React from 'react';
import Admin from '../admin/admin';
import Contest from '../contest/contest';
import AddContest from '../contest/contest_list/addContest/addContest';
import FreeBoard from '../free_board/freeBoard';
import Lecture from '../lecture/lecture';
import Study from '../study/study';

export const lecture = (user) => {
	return <Lecture user={user} />;
};
export const study = (user) => {
	return <Study user={user} />;
};
export const contest = (user) => {
	return <Contest user={user} />;
};
export const addContest = (user) => {
	return <AddContest user={user} />;
};
export const freeBoard = (user) => {
	return <FreeBoard user={user} />;
};
export const admin = () => {
	return <Admin />;
};
