import React, { useEffect, useState } from "react";
import styles from "./notice.module.css";
import Write from "../write/write";
import AddWrite from "../write/addwrite/addWrite";
import axios from "axios";

const Notice = ({ user }) => {
  const [addWrite, setAddWriting] = useState(false);
  const [writes, setWrites] = useState([]);

  useEffect(() => {
    // 글 목록 불러오기
    const page = 1; // 페이지에 대당하는 파라미터(	ex 1페이지의 글 목록 주세요)
    axios
      .get("/api/notice/writes", { page }) // 글 목록 요청 -> 페이지별 글 나누기
      .then((res) => {
        setWrites(res.data);
      });
  }, []);

  // 글쓰기 모드
  const writing = () => {
    setAddWriting(true);
  };

  // 글쓰고 추가 요청
  const addWriting = (newWrite) => {
    setAddWriting(false);

    axios
      .post("/api/notice/addWrite", { newWrite }) // 새로운 글(write_id 미포함)
      .then((res) => {
        setWrites(res.data); // 새 글 목록 받아서 저장
        console.log(res);
      });
  };

  // 글 삭제 요청
  const deleteWrite = (writeId) => {
    axios
      .post("/api/notice/deleteWrite", { writeId }) // 글 id 전달
      .then((res) => {
        setWrites(res.data); // 새 글 목록 받아서 저장
      });
  };

  return (
    <div className={styles.container}>
      <section className={styles.notice}>
        <div className={styles.header}>
          <h2>공지사항</h2>
          <div className={styles.search}>
            <input type="search" placeholder="검색"></input>
            {user.authority === "2" && (
              <input type="button" onClick={writing} value="글쓰기"></input>
            )}
          </div>
        </div>
        {addWrite && (
          <AddWrite writes={writes} user={user} addWriting={addWriting} />
        )}
        {addWrite || (
          <ul className={styles.writingList}>
            {Object.keys(writes).map((key) => {
              return (
                <Write
                  key={key}
                  writeIndex={key}
                  user={user}
                  write={writes[key]}
                  deleteWrite={deleteWrite}
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
