import React, { useEffect, useState } from "react";
import styles from "./notice.module.css";
import SideBar from "../sidebar/sideBar";
import Write from "../write/write";
import AddWrite from "../write/addwrite/addWrite";
import axios from "axios";

const Notice = (props) => {
  const [authority, setAuthority] = useState({ authority: 2 });
  const [addWrite, setAddWriting] = useState(false);
  const [writes, setWrites] = useState([]);

  useEffect(() => {
    // 권한 체크
    if (props.login.authority === 2) {
      setAuthority({ authority: 2 });
    }
  }, [props.login.authority]);

  useEffect(() => {
    // 글 목록 불러오기
    axios
      .get("/notice/writes") // 글 목록 요청
      .then((res) => {
        setWrites(res.data);
      });
  }, []);

  const writing = () => {
    setAddWriting(true);
  };

  const addWriting = (newWrites) => {
    setAddWriting(false);
    setWrites(newWrites);
  };
  const deleteWrite = (writeIndex) => {
    const data = [...writes];
    console.log(writes);
    console.log(data);
    data.pop(writeIndex);
    setWrites(data);
    console.log(writeIndex);
    // /notice/delete_process 로 삭제할 글의 _id를 보낸다.
    // axios
    //   .post("/notice/delete_process", {

    //   })
    //   .catch((err) => {
    //     console.log(err);
    // });
  };

  return (
    <div className={styles.container}>
      <SideBar login={props.login} setLogin={props.setLogin} />
      <section className={styles.notice}>
        <div className={styles.header}>
          <h2>공지사항</h2>
          <div className={styles.search}>
            <input type="search" placeholder="검색"></input>
            {authority.authority === 2 && (
              <input type="button" onClick={writing} value="글쓰기"></input>
            )}
          </div>
        </div>
        {addWrite && (
          <AddWrite
            writes={writes}
            login={props.login}
            addWriting={addWriting}
          />
        )}
        {addWrite || (
          <ul className={styles.writingList}>
            {Object.keys(writes).map((key) => {
              return (
                <Write
                  key={key}
                  writeIndex={key}
                  login={props.login}
                  write={writes[key]}
                  deleteWrite={deleteWrite}
                  authority={authority}
                />
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Notice;
