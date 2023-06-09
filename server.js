const express = require('express');
const app = express();
// vercel 에서 5000을 지원하기 때문에 포트번호를 5000으로 해야 가능
const port = 5000;
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('mothod-override');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

require("dotenv").config();

let db;
let save;
const MongoClient = require('mongodb').MongoClient

MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qtjev7k.mongodb.net/`, function(err, client) {
  if(err) return console.log(err);
  db = client.db('sample_mflix');
  save = client.db('test2');
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})

app.get('/write', function(req, res) {
  res.render('write.ejs')
})
app.post('/newpost', function(req, res) {
  const data = {
    name: req.body.name,
    age: req.body.age
  }

  save.collection('test2').insertOne(data, function(arr, result) {
    res.redirect('/list')
  })
})

app.get('/list', function(req, res) {
  save.collection('test2').find().toArray(function(err, result){
    res.render('list.ejs', {data: result})
  })
})

// vue로 작업한 작업물 dist 폴더 연결
app.use(express.static(path.join(__dirname, 'home/dist')))

app.get('*', (req, res)=> {
  res.sendFile(path.join(__dirname, 'home/dist/index.html'))
})

module.exports = app;