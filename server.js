const express = require('express');
const app = express();
// vercel 에서 5000을 지원하기 때문에 포트번호를 5000으로 해야 가능
const port = 5000;
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const ObjectId = require('mongodb').ObjectId

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
app.delete('/delete', function(req, res) {
  save.collection('test2').deleteOne({
    _id: ObjectId(req.body.id)
  }, function(err, result) {
    if(err) return console.log(err);
    res.redirect('list')
  })
})
// id 값이 무엇이든 들어갈 수 있음
app.post('/edit/:id', function(req, res) {
  save.collection('test2').findOne({_id: ObjectId(req.params.id)}, function(err, result) {
    if(result) {
      res.render('edit.ejs', {data: result})
    } 
  })
})
app.put('/edit', function(req, res) {
  // 어떤게시물을 수정할껀지, 수정값, 콜백함수
  save.collection('test2').updateOne({_id: ObjectId(req.body.id)}, {
    $set: {
      name: req.body.name,
      age: req.body.age
    }
  }, function(err, result) { 
    res.redirect('/list')
  })
})


// vue로 작업한 작업물 dist 폴더 연결
app.use(express.static(path.join(__dirname, 'home/dist')))

app.get('*', (req, res)=> {
  res.sendFile(path.join(__dirname, 'home/dist/index.html'))
})

module.exports = app;