const express = require('express');
const app = express();
const port = 8080;
const path = require('path');


//  .listen(서버 오픈할 포트번호, 함수)
// listen 함수는 한번만 사용 가능한가봄
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// vue로 작업한 파일 연결 이전
/* 

// 요청은 req
// 응답은 res

app.get('/', (요청, 응답)=> {
  // sendFile - 파일을 보낼 수 있는 함수 
  // __dirname - 현재 파일의 경로
  응답.sendFile(__dirname + '/index.html')
  
})
app.get('/about', (요청, 응답)=> {
  응답.sendFile(__dirname + '/about.html')
})

app.get('/about/example', (요청, 응답)=> {
  // 가장 기본 sendFile 사용하기 이전에 테스트 할 때 사용
  응답.send('어바웃 넘어감')
})


app.get('/skill', (요청, 응답) => {
  응답.sendFile(__dirname + '/skill.html')
})

app.get('/portfolio', (요청, 응답) => {
  응답.sendFile(__dirname + '/portfolio.html')
})
 */

// vue로 작업한 작업물 dist 폴더 연결
// https://expressjs.com/en/starter/static-files.html 참고
app.use(express.static(path.join(__dirname, 'homepagetemplate_/dist')))

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'homepagetemplate_/dist/index.html'))
// })

// 위 코드에서 / 대신 * 를 사용하여 어떤 페이지에서 새로고침을 하여도 동작가능하도록 함 이전에는 세부페이지에서 새로고침하면 vuex 가 실행이 안되었음

app.get('*', (req, res)=> {
  res.sendFile(path.join(__dirname, 'homepagetemplate_/dist/index.html'))
})

module.exports = app;