# Webgrus

- 루트, client, server 디렉토리에서 npm install, 이후 npm run dev 입력 시 클라이언트, 서버가 동시에 실행됩니다.

---

**_ 수정한 부분 _**

- client

1. components/LoginPage/LoginPage : email => id로 변수이름 변경, 입력칸도 같이 수정
2. components/NavBar/Sections/RightMenu : "승인 대기 중" 상태 추가
3. components/RegisterPage/RegisterPage : id 추가, phoneNumber 삭제, 입력칸도 같이 수정완료
4. 제 컴퓨터에서 실행 시 오류가 발생하는거 같아서 일단은 package.json의 scripts 부분, "start": "react-scripts --openssl-legacy-provider start"로 변경해놓았습니다.

- server

1. routes/users : /auth 요청 시 유효성 검사(isValidToken)를 추가했습니다.
2. routes/users : 로그인, 회원가입 전체적으로 수정
3. 토큰 시크릿키는 config/tokenkey.js로 옮겼습니다, 공용 db도 설정.
4. User 모델 스키마 변수명 통일

---

**_ 로그인 시 _**

- Admin 계정 (권한 : 2) id: 11111111 or 22222222 password: 11111111 or 22222222

- 승인된 계정 (권한 : 1) id: 33333333 password: 33333333

- 승인 대기 중인 계정 (권한 : 0) 회원가입하고 로그인

---

**_ 아직 추가하지 못한 사항 _**

유저 목록 가져와서(/api/admin/userlist), 권한 변경(/api/admin/changeAuth)
