var express = require('express');
var router = express.Router();
var Checks = require("./../checks/home");
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


/**
 * 设置首页介绍信息
 */
router.post("/intro/save", Checks.intro, Home.saveIntro, function (req, res, next) {
    next();
});


// 消灭这条推荐数据
router.post("/intro/destory", Checks.introId, Home.destroyIntro, function(req, res, next) {
    next();
}); 


// 获取intro 所有内容项
router.get("/intro/data", Home.getAllIntros, function (req, res, next) {
    res.json(req.body.data);
});



/**
 * 首页主题增删查改
 */
 //根据 introId添加主题
router.post("/intro/themes/save", Checks.theme, Home.saveThemeByIntro, function(req, res, next) {
    next();
});

// 根据首页themeId进行添加主题项内容
router.post("/intro/themes/item/save", Home.saveThemeItem, function(req, res, next) {
    next();
});

// 根据当前的introId获取下面的主题列表
router.get("/intro/themes/data", Home.getThemeCategories, function(req, res, next) {
    res.json(req.body.data);
});

// 根据introId 和 themeId 来查询主题详情
router.get("/intro/themes/map/data", Checks.map, Home.getThemeMap, function(req, res, next) {
    res.json(req.body.data);
});

// 删除主题
router.post("/intro/themes/destory", Home.destroyIntroTheme, function(req, res, next) {
    next();
});

router.post("/intro/theme/map/destory", Checks.mapItem, Home.destoryThemeItem, function(req, res, next) {
    next();
});

module.exports = router;
