const express = require('express');
const router = express.Router();
const Validate = require("./../validate/home");
const Home = require('./../business/home');

/**
 * MVC 的c作用很简单，只去拿数据和返回数据，其他一概不管。
 */
router.get("/", Home.getAll, function (req, res, next) {
    res.render('www/index.jade', req.body.data);
});

/* GET home page. */
router.get('/manager', Home.getAllCategories, function (req, res, next) {
    res.render("manager", req.body.data);
});

// 获取介绍信息下的主题
router.get("/intro/themes/data", Home.getThemeCategories, function(req, res, next) {
    res.json(req.body.data);
});


// 获取intro 所有内容项
router.get("/intro/data", Home.getIntro, function (req, res, next) {
    res.json(req.body.data);
});

// 根据introId 和 themeId 来查询主题详情
router.get("/intro/themes/map/data/:themeId", Validate.map, Home.getThemeMap, function(req, res, next) {
    res.json(req.body.data);
});

// 删除主题
router.post("/intro/themes/destory", Home.destroyIntroTheme, function(req, res, next) {
    next();
});

router.post("/intro/themes/item/destory", Validate.mapItem, Home.destoryThemeItem, function(req, res, next) {
    next();
});


/**
 * 设置首页介绍信息
 */
router.post("/intro/save", Validate.intro, Home.setIntro, function (req, res, next) {
    next();
});

/**
 * 首页主题增删查改
 */
 //根据 introId添加主题
router.post("/intro/theme/save", Validate.theme, Home.saveTheme, function(req, res, next) {
    next();
});


// 根据首页themeId进行添加主题项内容
router.post("/intro/themes/item/save", Home.saveThemeItem, function(req, res, next) {
    next();
});

module.exports = router;
