const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const lessMiddleware = require('less-middleware');
const session = require('express-session');
const rootPath = __dirname
const publicPath = path.join(rootPath, "public") ;
const config = require('./config')
const routes = require("./routes")
require("./db")
/**
 *  处理session
 */
const useSession = session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        // 如果不设置maxAge，则退出关闭浏览器tab，当前cookie就会过期
        maxAge: 1000 * 3600 * 24
    }
})
app.use(useSession)

/**
 *  处理Less
 */
app.use(lessMiddleware('/public/styles', {
    dest: '/public',
    force: true,
    debug: true,
    pathRoot: rootPath,
    preprocess: {
        path: function(pathname, req) {
            return pathname.replace(path.sep + 'styles' + path.sep, path.sep)
        }
      }
}));

/**
 *  处理静态文件和路由
 */
app.use(express.static(publicPath));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes.default)

module.exports = app;
