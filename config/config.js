var config = {
  port:3000,
  db:{
    host:'localhost',
    port:27017,
    user:"admin",
    password:"admin",
    db:'myblog'
  },
  session:{
    secret:'test',
    name:'test',
    maxTime: 1 * 1 * 60 * 60 * 1000
  },
  collection:{
    list:"myblog.list",
    user:"myblog.user",
    count:"myblog.count",
    session:"myblog.sessions"
  },
  qn:{
    ACCESS_KEY:"IgNciQw1VZYaHwX-6u9tBlqRF4ptK9WisMRB-Zn6",
    SECRET_KEY:"zL7Q8qJzHdPRx2C28xjZCz_Z_e5ioww9OCAr9lfR",
    bucket:"7xk6ll.com1.z0.glb.clouddn.com"
  }
}
if (process.env.VCAP_SERVICES) {
  console.log(process.env.VCAP_SERVICES)
  var mongodb_config = JSON.parse(process.env.VCAP_SERVICES).mongodb[0].credentials;
  config.host = mongodb_config.hostname;
  config.port = mongodb_config.port;
  config.user = mongodb_config.username;
  config.password = mongodb_config.password;
  config.database = mongodb_config.name;
}
module.exports = config;