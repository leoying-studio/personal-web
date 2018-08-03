var express = require('express');
var router = express.Router();
var Validate = require("./../validate/home");
var Home = require('./../business/home');

/**
 * MVC 的c作用很简单，只去拿数据和返回数据，其他一概不管。
 */
router.get("/", Home.getAll, function (req, res, next) {
    res.render('index.jade', req.body.data);
});

/* GET home page. */
router.get('/manager', Home.getAllCategories, function (req, res, next) {
    res.render("manager", req.body.data);
});

// 获取介绍信息下的主题
router.get("/intro/themes/data", Home.getThemeCategories, function(req, res, next) {
    res.json(req.body.data);
});

module.exports = router;
