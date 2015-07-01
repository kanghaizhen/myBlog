var db  = require('../db/mongous.js');
var ObjectID = require('../node_modules/mongous/bson/objectid.js').ObjectID;
var crypto = require('crypto');

var state = function (req) {
  if (req.session && req.session.user) {
    return true;
  }else{
    return false;
  }
};
exports.index = function (req, res) {
  var count;
  db.findCount(function(r){
    count = r.documents.length > 0 ? r.documents[0].num : 0;
  });
  db.find({},function (r){
    list = r.documents;
    return res.render('page/index', {
      title: 'myBlog',
      num:count,
      state:state(req),
      list: list
    });
  });
};

exports.detail = function(req, res){
  var id = ObjectID(req.params.id);
  db.findOne({"_id":id},function(r){
    var list = r.documents[0];
    return res.render('page/detail', {
      title: 'myBlog',
      state:state(req),
      list: list
    });
  });
}

exports.loginGet = function(req,res){
  return res.render('page/login', {
    title: 'myBlog',
    state: state(req)
  });
}

exports.loginPost = function(req,res){
  var user = {
    username: req.body.username,
    password:req.body.password
  }
  var md5 = crypto.createHash('md5');
  md5.update(user.password);
  user.password = md5.digest('hex');
  db.findUser(user,function(r){
    if(r.documents.length > 0){
      req.session.user = user.username;
      return res.redirect('/admin');
    }else{
      return res.status(401).send('用户名或密码错误');
    }
  });
};

exports.quit = function(req, res, next) {
  req.session.cookie.maxAge = 1;
  res.render('page/login', {
    title: 'myBlog'
  });
};