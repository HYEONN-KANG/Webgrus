import React, { useRef } from "react";
import axios from "axios";

const AddWrite = ({ login, writes, addWriting }) => {
  const today = new Date();
  const textRef = useRef();
  const titleRef = useRef();

  const writing = () => {
    // /notice/create_process 로 서버한테 POST로 데이터를 전달
    // author는 로그인 정보를 아직 불러오지 못해 임의로 지정한 상태
    axios
      .post("/notice/create_process", {
        title: titleRef.current.value,
        description: textRef.current.value,
        author: "test author",
        date: `${today.getFullYear()}. ${
          today.getMonth() + 1
        }. ${today.getDate()}`,
      })
      .catch((err) => {
        console.log(err);
      });

    // /notice로 가서, creat한 공지 내용을 확대한 상태의 화면이로 이동해야함 (아직 미완)
  };

  return (
    <form>
      <p>
        제목 <input ref={titleRef} type="text"></input>
      </p>
      <p>
        내용 <textarea ref={textRef}></textarea>
      </p>
      <p>
        <input type="button" value="글 작성" onClick={writing}></input>
      </p>
    </form>
  );
};

export default AddWrite;
