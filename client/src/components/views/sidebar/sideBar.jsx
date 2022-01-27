import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./sideBar.module.css";

const SideBar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [authority, setAuthority] = useState({ authority: "0" });

  // 로그아웃
  const logOut = () => {
    setUser({ authority: "0" });
    navigate("/");
  };

  // 유저 정보 확인 업데이트
  useEffect(() => {
    setAuthority({ ...authority, authority: user.authority });
  }, [user]);

  // 유저 권한에 따라 다른 ui를 보여줌.
  return (
    <nav className={styles.nav}>
      <div className={styles.bar}>
        <h2 className={styles.webGrus} onClick={() => navigate("/")}>
          Webgrus
        </h2>
        <h3 onClick={() => navigate("/notice")}>공지</h3>
        <h3 onClick={() => navigate("/lectures")}>강의</h3>
        <h3 onClick={() => navigate("/studygroups")}>스터디</h3>
        <h3 onClick={() => navigate("/contest")}>공모전</h3>
        <h3 onClick={() => navigate("/freeboard")}>자유게시판</h3>
      </div>
      <div>
        {authority.authority === "2" && (
          <>
            <h3 onClick={() => navigate("/admin")}>회원 관리</h3>
            <h3 onClick={logOut}>로그아웃</h3>
          </>
        )}
        {authority.authority === "1" && <h3 onClick={logOut}>로그아웃</h3>}
        {authority.authority === "0" && (
          <>
            <h3 onClick={() => navigate("/login")}>로그인</h3>
            <h3 onClick={() => navigate("/register")}>회원가입</h3>
          </>
        )}
      </div>
    </nav>
  );
};

export default SideBar;
