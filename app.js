const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db')
import routes from './routes'

const staticPath = path.join(__dirname, "/public")

const lessMiddleware = require('less-middleware');
app.use(lessMiddleware(staticPath));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes)
app.use(express.static(staticPath));
module.exports = app;
