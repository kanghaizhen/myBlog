var $ = require("mongous").Mongous;
var db = {
  update  : function(id,data){
    $("myblog.list").update({"_id":id},data)
  },
  save : function(data){
    if(data){
      $("myblog.list").save(data);
    }
  },
  find : function(data,callback){
    var data = data || {};
    $("myblog.list").find(data,function(r){
      if(callback)callback(r);
    });
  },
  findOne : function(data,callback){
    var data = data || {};
    $("myblog.list").find(1,data,function(r){
      if(callback)callback(r);
    });
  },
  remove:function(data){
    if(data){
      $("myblog.list").remove(data);
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
  }
}
module.exports = db;