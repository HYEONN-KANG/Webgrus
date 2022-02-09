import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./admin.module.css";
import User from "./user/user";

// 관리자 권한 컴포넌트
const Admin = (props) => {
  const navigate = useNavigate();
  // const usersData = useSelector((state) => {
  // 	// console.log(state.sort((a, b) => b.authority - a.authority));  권한 기준 정렬
  // 	return state.sort((a, b) => a.authority - b.authority);
  // });

  const [users, setUsers] = useState();

  useEffect(() => {
    axios.get("/api/users/list").then((res) => {
      console.log(res.data);
      if (!res.data.success) {
        console.log(res.data.reason);
        navigate(-1);
      } else {
        const userData = res.data.userlist.sort((a, b) => a.role - b.role); // 유저 권한 기준 오름차순 정렬
        setUsers(userData);
      }
    });
  }, []);

  // 권한 변경
  const changeAuthority = (userData, authValue) => {
    axios
      .post("/api/users/changeAuth", {
        id: userData.id,
        role: authValue,
      })
      .then((res) => {
        const userData = res.data.userlist.sort((a, b) => a.role - b.role);
        setUsers([...userData]);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 onClick={() => navigate(-1)}>이전 화면으로</h2>
        <input type="search" placeholder="검색"></input>
      </div>
      {users && (
        <ul>
          <li className={styles.listitem}>
            <h3 className={styles.item}>학번(아이디)</h3>
            <h3 className={styles.item}>이름</h3>
            <h3 className={styles.item}>이메일</h3>
            <h3 className={styles.item}>권한</h3>
          </li>
          {users.map((user) => {
            return (
              <User
                key={user.id}
                userData={user}
                changeAuthority={changeAuthority}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default Admin;
