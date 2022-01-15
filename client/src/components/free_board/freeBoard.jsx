import React, { useEffect, useState } from "react";
import styles from "./freeBoard.module.css";
import Write from "../write/write";
import AddWrite from "../write/addwrite/addWrite";
import axios from "axios";

const FreeBoard = (props) => {
  // user 정보 받아야함.
  const [user, setUser] = useState({ authority: 2 }); // 권한 (컴포넌트로 분리후 props로 받아올 예정)
  const [addWrite, setAddWriting] = useState(false);
  const [writes, setWrites] = useState([]);

  useEffect(() => {
    // 글 목록 불러오기
    axios
      .get("/api/freeBoard/writes") // 글 목록 요청 -> 페이지별 글 나누기(백엔드에서 수행? 프론트에서 수행?)
      .then((res) => {
        setWrites(res.data);
      });
  }, []);

  const writing = () => {
    setAddWriting(true);
  };
  const addWriting = (newWrite) => {
    setAddWriting(false);

    axios
      .post("/api/freeBoard/addWrite", { newWrite }) // 새로운 글(write_id 미포함)
      .then((res) => {
        setWrites(res.data); // 새 글 목록 받아서 저장
        console.log(res);
      });
  };
  const deleteWrite = (writeId) => {
    axios
      .post("/api/freeBoard/deleteWrite", { writeId }) // 글 id 전달
      .then((res) => {
        setWrites(res.data); // 새 글 목록 받아서 저장
      });
  };

  return (
    <div className={styles.container}>
      <section className={styles.freeBoard}>
        <div className={styles.header}>
          <h2>자유게시판</h2>
          <div className={styles.search}>
            <input type="search" placeholder="검색"></input>
            {user.authority === 2 && (
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

export default FreeBoard;
