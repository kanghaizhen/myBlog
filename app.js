var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var session = require('express-session');
var MongoStore   = require('connect-mongo')(session);

var config = require('./config/config.js');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: config.session.secret,
  name: config.session.name,
  cookie: {
    maxAge:config.session.maxTime
  },
  resave           : false,
  saveUninitialized: true,
  store: new MongoStore({   //创建新的mongodb数据库
    host: config.db.host,    //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
    port: config.db.port,          //数据库的端口号
    db  : config.db.sessionsDb        //数据库的名称。
  })
}));

app.use('/', routes);
app.use('/admin', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('page/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('page/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
