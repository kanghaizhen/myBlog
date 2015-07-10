var $ = require("mongous").Mongous;
var config = require('../config/config.js');
var list = config.collection.list;
var user = config.collection.user;
var count = config.collection.count;
var session = config.collection.session;
var db = {
  update  : function(id,data){
    $(list).update({"_id":id},data);
  },
  save : function(data){
    if(data){
      $(list).save(data);
      $(count).update({},{$inc: {num: 1}});
    }
  },
  find : function(data,callback){
    var data = data || {};
    $(list).find(data, {}, {sort: {update: -1}},function(r){
      if(callback)callback(r);
    });
  },
  findOne : function(data,callback){
    var data = data || {};
    $(list).find(1,data,function(r){
      if(callback)callback(r);
    });
  },
  findUser : function(data,callback){
    var data = data || {};
    $(user).find(1,data,function(r){
      if(callback)callback(r);
    });
  },
  remove:function(data){
    if(data){
      $(list).remove(data);
      $(count).update({},{$inc: {num: -1}});
    }
  },
  getTime: function(){
    var time = new Date(),
        year = time.getFullYear(),
        month = time.getMonth()+1,
        date = time.getDate(),
        h = time.getHours(),
        m = time.getMinutes(),
        s = time.getSeconds();
    return year +"-"+month+"-"+date+" "+h+":"+m+":"+s;
  },
  findCount: function(callback){
    $(count).find(1,{},function(r){
      if(callback)callback(r);
    })
  }
}
module.exports = db;