const express = require('express');
const app = express();
// vercel 에서 5000을 지원하기 때문에 포트번호를 5000으로 해야 가능
const port = 5000;
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}))

require("dotenv").config();

app.set('view engine', 'ejs')


let db;
let save;

const MongoClient = require('mongodb').MongoClient

MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qtjev7k.mongodb.net/`, function(err, client) {
  if(err) return console.log(err);

  // 몽고 디비가 성공이 되면

  db = client.db('sample_mflix');
  save = client.db('test2');


  //  .listen(서버 오픈할 포트번호, 함수)
  // listen 함수는 한번만 사용 가능한가봄
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})

app.get('/write', function(req, res) {
  res.render('write.ejs')
})
app.post('/newpost', function(req, res) {
  // console.log(req.body)
  const data = {
    name: req.body.name,
    age: req.body.age
  }

  save.collection('test2').insertOne(data, function(arr, result) {

  })
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
// app.use(express.static(path.join(__dirname, 'home/dist')))

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'homepagetemplate_/dist/index.html'))
// })

// 위 코드에서 / 대신 * 를 사용하여 어떤 페이지에서 새로고침을 하여도 동작가능하도록 함 이전에는 세부페이지에서 새로고침하면 vuex 가 실행이 안되었음

// app.get('*', (req, res)=> {
//   res.sendFile(path.join(__dirname, 'home/dist/index.html'))
// })

// vercel로 배포하기 위해서는 아래 코드와
// vercel.json 파일 필요
// + git submodule로 하위폴더를 서브모듈화 해두면 깃허브상에서 하위 폴더를 못들어가기 때문에 dist 폴더내용은 따로 밖으로 빼내야 가능 (난 home 이라는 폴더에 넣음)
module.exports = app;