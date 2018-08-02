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
var app = express();
var Throw = require('./interceptor/throw');
// 自定义引入
// var connect = require('connect')
var sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
      /* Options */
      src: path.join(__dirname, "/public/sass")
    , dest: __dirname + '/public/css'
    , debug: true
    , outputStyle: 'expanded'
    , prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/> 
  }));
app.use(express.static(path.join(__dirname, "/public")))


var users = require('./routes/users');
var categories = require('./routes/categories');
var home = require('./routes/home');
var articles = require('./routes/articles');
var manager = require('./routes/manager');
// var detail = require('./routes/detail');
// var db = require('./db');
// var MongoStore=require('connect-mongo')(session);


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


app.use(function(req, res, next) {
  if (Object.keys(req.body).length) {
      return next();
  } else if (Object.keys(req.query).length) {
      req.body = req.query;
      return next();
  } else {
     req.body = req.params;
     next();
  }
});

app.use('/', home);
app.use("/users", users);
app.use("/categories", categories);
app.use("/articles", articles);
app.use("/manager", manager);

// 自定义中间件抛出消息
app.use(Throw.abnormal);
app.use(Throw.message.success);
app.use(Throw.message.error);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



module.exports = app;
