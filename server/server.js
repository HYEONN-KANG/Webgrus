const express = require('express');
const app = express();
const api = require('./routes/api');
const bodyParser = require('body-parser');
const db = require('./config/db');
const port = 3001; // 포트 넘버
app.use(express.json());

// db 연결
db.connect();

app.use('/posters', express.static('client/public/posters'));
app.use(bodyParser.json());

app.use('/api', api);

// 서버 요청이랑 리액트 라우팅이랑 주소 경로가 겹치면 새로고침시 에러 나네요.
// app.use('/webgrus', test);
// app.use('/notice', notice);
// app.use('/freeBoard', freeBoard);
// app.use('/contest', contest);
// app.use('/users', users);

// 포트 설정
app.listen(port, () => console.log(port));
