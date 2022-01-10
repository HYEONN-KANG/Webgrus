import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Contest from './components/contest/contest';
import FreeBoard from './components/free_board/freeBoard';
import Lecture from './components/lecture/lecture';
import Login from './components/login/login';
import Main from './components/main/main';
import Notice from './components/notice/notice';
import Sign from './components/sign/sign';
import Study from './components/study/study';
import Admin from './components/admin/admin';
import { Provider } from 'react-redux';
import store from './store';
import { useState } from 'react';

function App() {
	const [login, setLogin] = useState({ authority: 0 });

	return (
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					{/* 메인화면 */}
					<Route path="/" element={<Main login={login} setLogin={setLogin} />} />
					{/* 공지 */}
					<Route path="/notice" element={<Notice login={login} setLogin={setLogin} />} />
					{/* 강의 */}
					<Route path="/lecture" element={<Lecture login={login} setLogin={setLogin} />} />
					{/* 스터디 */}
					<Route path="/study" element={<Study login={login} />} setLogin={setLogin} />
					{/* 공모전 */}
					<Route path="/contest" element={<Contest login={login} setLogin={setLogin} />} />
					{/* 자유게시판 */}
					<Route path="/freeboard" element={<FreeBoard login={login} setLogin={setLogin} />} />
					{/* 관리자 */}
					<Route path="/admin" element={<Admin login={login} setLogin={setLogin} />} />
					{/* 로그인 */}
					<Route path="/login" element={<Login login={login} setLogin={setLogin} />} />
					{/* 회원가입 */}
					<Route path="/sign" element={<Sign login={login} setLogin={setLogin} />} />
				</Routes>
			</Provider>
		</BrowserRouter>
	);
}

export default App;
