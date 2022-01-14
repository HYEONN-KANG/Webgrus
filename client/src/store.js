import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// 사용했다가 현재 미사용.
const reducer = (state, action) => {
	if (state === undefined) {
		return [];
	}
	switch (action.type) {
		case 'ADDUSER':
			const addUser = [...state];
			addUser.push({
				id: action.data.id,
				name: action.data.name,
				email: action.data.email,
				authority: 0,
				passWord: action.data.passWord,
			});
			return addUser;
		case 'CHANGEAUTH':
			const change = [...state];
			change[action.data.key] = {
				id: action.data.id,
				name: action.data.name,
				email: action.data.email,
				authority: action.data.authority,
				passWord: action.data.passWord,
			};
			return change;
		default:
			return state;
	}
};

const store = createStore(reducer, composeWithDevTools());

export default store;
