var express = require('express');
var router = express.Router();
var db  = require('../db/mongous.js');
var ObjectID = require('../node_modules/mongous/bson/objectid.js').ObjectID;
var auth = require('../controller/auth.js');
var isLogin = require('../controller/isLogin.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  var count
  db.findCount(function(r){
    count = r.documents.length > 0 ? r.documents[0].num : 0;
  });
  db.find({},function (r){
    list = r.documents;
    res.render('page/index', {
      title: 'myBlog',
      num:count,
      state:isLogin.state(req),
      list: list
    });
  })
});

router.get('/login', function(req, res, next) {
  res.render('page/login', {
    title: 'myBlog',
    state: isLogin.state(req)
  });
});

router.post('/login', function(req, res, next) {
  var user = {
    username: req.body.username,
    password:req.body.password
  }
  db.findUser(user,function(r){
    if(r.documents.length > 0){
      req.session.user = user.username;
      res.redirect('/admin');
    }else{
      res.status(401).send('用户名或密码错误');
    }
  });
});

router.get('/quit', function(req, res, next) {
  req.session.cookie.maxAge = 1;
  res.render('page/login', {
    title: 'myBlog'
  });
});

router.get('/admin',auth.userRequired);
router.get('/admin/*',auth.userRequired);

router.get('/admin', function(req, res, next) {
  db.find({}, function (r){
    var list = r.documents;
    res.render('admin/index', {
      title: 'myBlog',
      state:isLogin,
      list: list
    });
  });
});

router.post('/admin/delete/:id', function(req, res, next) {
  var id = ObjectID(req.params.id);
  db.remove({'_id':id});
  res.status(200).send('删除成功');
});

router.get('/admin/edit/:id', function(req, res, next) {
  var id = ObjectID(req.params.id);
  db.findOne({"_id":id},function(r){
    var list = r.documents[0];
    res.render('admin/detail', {
      title: 'myBlog',
      state:isLogin,
      list: list
    });
  });
});


router.post('/admin/edit/:id', function(req, res, next) {
  var id = ObjectID(req.params.id),
      data = {
        title: req.body.title,
        name : req.body.name,
        creat: db.getTime()
      }
  db.update(id,data);
  res.redirect('/admin');
});

router.get('/admin/new',function(req, res, next){
  res.render('admin/new',{
    title:"new",
    state:isLogin
  });
});

router.post('/admin/new', function(req, res, next) {
  var data = {
        title: req.body.title,
        name : req.body.name,
        update: db.getTime()
      }
  db.save(data);
  res.redirect('/admin');
});

module.exports = router;
