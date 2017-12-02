var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require("connect-flash");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config = require("./config");
// 自定义引入


var home = require('./routes/home');
var login = require('./routes/login');
var register = require('./routes/register');
var manager = require('./routes/manager');
var nav = require('./routes/nav');
var article = require('./routes/article');
var article_detail = require('./routes/article_detail');
var banner = require('./routes/banner');
// var acticle = require('./routes/acticle');
// var db = require('./db');
// var MongoStore=require('connect-mongo')(session);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// session 中间件
app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true,// 强制更新 session
  saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}));
// 放在所有的路由上面,这样就能把所有的路由req 过滤一遍，否则是没有办法获取到flash这个方法的
app.use(flash());
// 设置模板变量
// 添加模板必需的三个变量
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

app.use('/', home);
app.use('/manager', manager);
app.use("/login", login);
app.use("/register", register);
app.use("/nav", nav);
app.use("/article", article);
app.use("/banner", banner);
app.use("/article/article_detail", article_detail);
// app.use("/acticle", acticle);
// app.use('/users', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.use(session({
//     secret:"users-session-signature",
//     store:new MongoStore({
//        mongooseConnection:db.dbConnection
//     })
// }));


module.exports = app;
