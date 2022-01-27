import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./views/login/LoginPage/LoginPage";
import Main from "./views/main/main";
import Notice from "./views/notice/notice";
// import Study from "./views/study/study";
import Contest from "./views/contest/contest";
import AddContest from "./views/contest/contest_list/addContest/addContest";
import FreeBoard from "./views/free_board/freeBoard";
import Admin from "./views/admin/admin";
// import Sign from "./views/sign/sign";
import RegisterPage from "./views/register/RegisterPage/RegisterPage";
import SideBar from "./views/sidebar/sideBar";
import Auth from "../hoc/auth";
import LecturePage from "./views/lecture/LecturePage/LecturePage";
import LectureDetailPage from "./views/lecture/LectureDetailPage/LectureDetailPage";
import LectureUploadPage from "./views/lecture/LectureUploadPage/LectureUploadPage";
import LectureEditPage from "./views/lecture/LectureEditPage/LectureEditPage";
import StudyGroupUploadPage from "./views/studygroups/StudyGroupUploadPage/StudyGroupUploadPage.js";
import StudyGroupPage from "./views/studygroups/StudyGroupPage/StudyGroupPage.js";
import StudyGroupDetailPage from "./views/studygroups/StudyGroupDetailPage/StudyGroupDetailPage.js";
import StudyGroupEditPage from "./views/studygroups/StudyGroupEditPage/StudyGroupEditPage";

function App() {
  const [user, setUser] = useState({ authority: "2" }); // 인증 고쳐주시면 지울 코드입니다.

  return (
    <>
      <SideBar user={user} setUser={setUser} />
      <Routes>
        {/* 메인화면 */}
        <Route path="/" element={Auth(Main, null)} />
        공지
        <Route path="/notice" element={Auth(Notice, null)} />
        {/* 강의 */}
        <Route path="/lectures" element={Auth(LecturePage, null)} />
        <Route
          path="/lectures/register"
          element={Auth(LectureUploadPage, null)}
        />
        <Route
          path="/lectures/:lectureId"
          element={Auth(LectureDetailPage, null)}
        />
        <Route
          path="/lectures/:lectureId/edit"
          element={Auth(LectureEditPage, null)}
        />
        {/* 스터디 */}
        {/* <Route path="/study" element={Auth(Study, null)} /> */}
        <Route path="/studygroups" element={Auth(StudyGroupPage, null)} />
        <Route
          path="/studygroups/register"
          element={Auth(StudyGroupUploadPage, null)}
        />
        <Route
          path="/studygroups/:studygroupId"
          element={Auth(StudyGroupDetailPage, null)}
        />
        <Route
          path="/studygroups/:studygroupId/edit"
          element={Auth(StudyGroupEditPage, null)}
        />
        {/* 공모전 */}
        <Route path="/contest" element={Auth(Contest, null)} />
        <Route path="/contest/addWriting" element={Auth(AddContest, null)} />
        {/* 자유게시판 */}
        <Route path="/freeboard" element={Auth(FreeBoard, null)} />
        {/* 관리자 */}
        <Route path="/admin" element={Auth(Admin, null)} />
        {/* 로그인 */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        {/* 회원가입 */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
