
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require("connect-flash");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require("./config");
const app = express();
const db = require('./db')
import routes from './routes'
const Throw = require('./interceptor/throw');
const lessMiddleware  =  require("less-middleware")

// const a = {
//   src: path.join(__dirname, "public", "less"),
//   dest: path.join(__dirname, "public", "css"),
//   compress: true,
//   prefix: ".css",
//   force: true
// }

const lessCompie = lessMiddleware("/public")
app.use(lessCompie);

app.use(express.static(path.join(__dirname, "/public")));

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
app.use("/", routes)


// session 中间件
// app.use(session({
//   name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
//   secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
//   resave: true,// 强制更新 session
//   saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
//   cookie: {
//     maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
//   },
//   store: new MongoStore({// 将 session 存储到 mongodb
//     url: config.mongodb// mongodb 地址
//   })
// }));

// 放在所有的路由上面,这样就能把所有的路由req 过滤一遍，否则是没有办法获取到flash这个方法的
// app.use(flash());
// // 设置模板变量
// // 添加模板必需的三个变量
// app.use(function (req, res, next) {
//   res.locals.user = req.session.user;
//   res.locals.success = req.flash('success').toString();
//   res.locals.error = req.flash('error').toString();
//   next();
// });


// 自定义中间件抛出消息
// app.use(Throw.abnormal);
// app.use(Throw.message.success);
// app.use(Throw.message.error);


module.exports = app;
