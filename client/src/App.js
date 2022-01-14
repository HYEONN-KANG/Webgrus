import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { useState } from "react";
import Login from "./components/login/login";
import Main from "./components/main/main";
import Notice from "./components/notice/notice";
import Sign from "./components/sign/sign";
import store from "./store";
import SideBar from "./components/sidebar/sideBar";
import Auth from "./components/authCheck/auth";
import {
  addContest,
  admin,
  contest,
  freeBoard,
  lecture,
  study,
} from "./components/authCheck/routeComponent";

function App() {
  const [user, setUser] = useState({ authority: "2" }); // 유저 정보 개선 필요.

  return (
    <Provider store={store}>
      <SideBar user={user} setUser={setUser} />
      <Routes>
        {/* 메인화면 */}
        <Route path="/" element={<Main />} />
        {/* 공지 */}
        <Route path="/notice" element={<Notice user={user} />} />
        {/* 강의 */}
        <Route
          path="/lecture"
          element={<Auth Component={lecture} user={user} cpAuth={"1"} />}
        />
        {/* 스터디 */}
        <Route
          path="/study"
          element={<Auth Component={study} user={user} cpAuth={"1"} />}
        />
        {/* 공모전 */}
        <Route
          path="/contest"
          element={<Auth Component={contest} user={user} cpAuth={"1"} />}
        />
        <Route
          path="/contest/addWriting"
          element={<Auth Component={addContest} user={user} cpAuth={"1"} />}
        />
        {/* 자유게시판 */}
        <Route
          path="/freeboard"
          element={<Auth Component={freeBoard} user={user} cpAuth={"1"} />}
        />
        {/* 관리자 */}
        <Route
          path="/admin"
          element={<Auth Component={admin} user={user} cpAuth={"2"} />}
        />
        {/* 로그인 */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        {/* 회원가입 */}
        <Route path="/sign" element={<Sign />} />
      </Routes>
    </Provider>
  );
}

export default App;
