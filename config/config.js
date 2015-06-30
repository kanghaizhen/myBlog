var config = {
  port:3000,
  db:{
    host:'localhost',
    port:27017,
    sessionsDb:'session',
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
    section:"session.sessions"
  }
}
module.exports = config;