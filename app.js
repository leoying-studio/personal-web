const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const lessMiddleware = require('less-middleware');
const rootPath = __dirname
const publicPath = path.join(rootPath, "public") ;

const db = require('./db')
import routes from './routes'


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

app.use(express.static(publicPath));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes)



module.exports = app;
