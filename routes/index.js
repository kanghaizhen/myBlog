var express = require('express');
var router = express.Router();
var db  = require('../db/mongous.js');
var ObjectID = require('../node_modules/mongous/bson/objectid.js').ObjectID;
/* GET home page. */
router.get('/', function(req, res, next) {
  var reply = db.find({},getList),
      list = [];
  function getList(r){
    list = r.documents;
    res.render('page/index', {
      title: 'myBlog',
      list: list
    });
  }
});


router.get('/admin', function(req, res, next) {
  db.find({}, function getList(r){
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
