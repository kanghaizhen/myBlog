var express = require('express');
var router = express.Router();
var db  = require('../db/mongous.js');
var ObjectID = require('../node_modules/mongous/bson/objectid.js').ObjectID;
/* GET home page. */
router.get('/', function(req, res, next) {
  db.find({},function (r){
    list = r.documents;
    res.render('page/index', {
      title: 'myBlog',
      list: list
    });
  })
});

router.get('/login', function(req, res, next) {
  res.render('page/login', {
    title: 'myBlog'
  });
});

router.post('/login', function(req, res, next) {
  var user = {
    username: req.body.username,
    password:req.body.password
  }
  db.findUser(user,function(r){
    if(r.documents.length > 0){
      res.redirect('/admin');
    }else{
      res.status(401).send('用户名或密码错误');
    }
  });
});

router.get('/admin', function(req, res, next) {
  db.find({}, function (r){
    var list = r.documents;
    res.render('admin/index', {
      title: 'myBlog',
      list: list
    });
  });
});

router.post('/delete/:id', function(req, res, next) {
  var id = ObjectID(req.params.id);
  db.remove({'_id':id});
  res.status(200).send('删除成功');
});

router.get('/edit/:id', function(req, res, next) {
  var id = ObjectID(req.params.id);
  db.findOne({"_id":id},function(r){
    var list = r.documents[0];
    res.render('admin/detail', {
      title: 'myBlog',
      list: list
    });
  });
});


router.post('/edit/:id', function(req, res, next) {
  var id = ObjectID(req.params.id),
      data = {
        title: req.body.title,
        name : req.body.name,
        creat: db.getTime()
      }
  db.update(id,data);
  res.redirect('/admin');
});

router.get('/new',function(req, res, next){
  res.render('admin/new',{
    title:"new"
  });
});

router.post('/new', function(req, res, next) {
  var data = {
        title: req.body.title,
        name : req.body.name,
        update: db.getTime()
      }
  db.save(data);
  res.redirect('/admin');
});

module.exports = router;
