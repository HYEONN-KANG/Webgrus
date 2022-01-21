import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const AddContest = ({ user }) => {
  const today = new Date();
  const textRef = useRef();
  const titleRef = useRef();
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  // const [loading, setLoading] = useState();

  const writing = async (event) => {
    // event.preventDafault();

    const fileSrc = await axios.post("/api/contest/addPoseter", file); // 이미지 파일 저장 및 경로 리턴
    const newWrite = {
      id: "user id",
      src: fileSrc.data || "",
      title: titleRef.current.value,
      description: textRef.current.value,
      author: "user name",
      date: `${today.getFullYear()}. ${
        today.getMonth() + 1
      }. ${today.getDate()}`,
    };

    axios
      .post("/api/contest/addWrite", { newWrite }) // 글 추가
      .then(navigate(-1))
      .catch(() => {
        alert("글이 제대로 저장되지 않았습니다.");
      });
  };

  const handelPoster = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    // for (let value of formData.values()) { // formData는 그냥 콘솔로 안보여서 value 확인하는 방법
    // 	console.log(value);
    // }
    // const response = await axios.post('/api/contest/testing', formData);
    setFile(formData);
  };

  return (
    <form onSubmit={writing}>
      제목 : <input ref={titleRef} type="text"></input>
      내용 : <textarea ref={textRef}></textarea>
      포스터 :{" "}
      <input
        type="file"
        name="poster"
        accept="image/*"
        onChange={handelPoster}
      ></input>
      <input type="submit" value="글 작성"></input>
    </form>
  );
};

export default AddContest;
