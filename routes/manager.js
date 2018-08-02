var express = require('express');
var router = express.Router();
var Validate = require("./../validate/home");
var Home = require('./../business/home');

// 添加导航下的类别
router.get('/redirect/:target', function(req, res, next) {
	var target = req.body.target;
    res.render(target + '.jade');
});


// 根据当前的introId获取下面的主题列表
router.get("/intro/themes/data", Home.getThemeCategories, function(req, res, next) {
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

router.post("/intro/theme/map/destory", Validate.mapItem, Home.destoryThemeItem, function(req, res, next) {
    next();
});

/**
 * 设置首页介绍信息
 */
router.post("/intro/save", Validate.intro, Home.setIntro, function (req, res, next) {
    next();
});


// 获取intro 所有内容项
router.get("/intro/data", Home.getAllIntro, function (req, res, next) {
    res.json(req.body.data);
});


/**
 * 首页主题增删查改
 */
 //根据 introId添加主题
router.post("/intro/themes/save", Validate.theme, Home.saveThemeByIntro, function(req, res, next) {
    next();
});


// 根据首页themeId进行添加主题项内容
router.post("/intro/themes/item/save", Home.saveThemeItem, function(req, res, next) {
    next();
});

module.exports = router;
