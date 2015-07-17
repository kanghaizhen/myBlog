var qiniu = require('qiniu');
var config = require('../config/config.js');
//返回七牛token
exports.token = function (req, res) {
  qiniu.conf.ACCESS_KEY = config.qn.ACCESS_KEY;
  qiniu.conf.SECRET_KEY = config.qn.SECRET_KEY;
  var uptoken = new qiniu.rs.PutPolicy("myblog");
  var token = uptoken.token();
  res.header("Cache-Control", "max-age=0, private, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  if (token) {
    res.json({
      uptoken: token
    });
  }
};

exports.url = function (req, res) {
  var key = req.body.key;
  var view = req.body.view;
  var bucket;
  if(view){
    bucket = config.qn.bucket+"?"+view;
  }else{
    bucket = config.qn.bucket;
  }
  console.log(bucket);
  var baseUrl = qiniu.rs.makeBaseUrl(bucket, key);
  var policy = new qiniu.rs.GetPolicy();
  var url = policy.makeRequest(baseUrl);
  res.json({url:url});
};