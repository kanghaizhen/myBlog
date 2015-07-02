var db  = require('../db/mongous.js');
var ObjectID = require('../node_modules/mongous/bson/objectid.js').ObjectID;

exports.userRequired = function (req, res, next) {
  if (!req.session || !req.session.user) {
    return res.redirect('/login')
  }
  next();
};

exports.index = function (req, res) {
  db.find({}, function (r){
    var list = r.documents;
    return res.render('admin/index', {
      title: 'myBlog',
      state:true,
      list: list
    });
  });
};

exports.delete = function (req, res) {
  var id = ObjectID(req.params.id);
  db.remove({'_id':id});
  return res.status(200).send('删除成功');
};

exports.detail = function (req, res) {
  var id = req.params.id;
  if(id){
    var _id = ObjectID(id);
    db.findOne({"_id":_id},function(r){
      var list = r.documents[0];
      return res.render('admin/detail', {
        title: 'myBlog',
        state:true,
        list: list
      });
    });
  }else{
    return res.render('admin/detail',{
      title:"new",
      list:false,
      state:true
    });
  }
};

exports.edit = function(req, res){
  var data = {
        title  : req.body.title,
        author : req.body.author,
        summary: req.body.summary,
        countent: req.body.countent,
        creat  : db.getTime()
      },
  id = req.params.id;
  if(id){
    var _id = ObjectID(id);
    db.update(_id,data);
  }else{
    db.save(data);
  }
  return res.redirect('/admin');
};