var express = require('express');
var router = express.Router();
var HomeProxy = require("./../proxy/home");
var IntrosModel = require("./../models/intros");  
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
router.post("/intro/themes/item/save", function(req, res, next) {
    next();
});


// 根据当前的introId获取下面的主题列表
router.get("/intro/themes/data", function(req, res, next) {
    var body = req.body;
    var currentPage = body.currentPage || 1;
    var start = (currentPage - 1) * 4;
    var end = currentPage * 4;
    IntrosModel.findOne({apply: true}).populate('themes', {slice: [start, end]})
    .then(function(data) {
       res.json(data.themes);
    }).catch(next);
});


// 根据introId 和 themeId 来查询主题详情
router.get("/intro/themes/map/data", Checks.map, function(req, res, next) {
    HomeProxy.getThemeMap(req.body.models, req.body.params).then(function(data) {
        res.send({
            status: true,
            data
        });
    }).catch(next);
});


// 获取时光轴
router.get("/timeline/data", function(req, res, next) {
    var body = req.body;
    var params = Object.keys(body).length > 0 ? body : req.query;
    var pageSize = body.pageSize;
    var currentPage = body.currentPage;
    ArticleProxy.getTimeline({currentPage: params.currentPage, pageSize: params.pageSize}, {year: params.year, month: params.month})
    .then(function(data) {
        res.send({
            status: true,
            data
        });
    }).catch(next);
});

// 删除主题
router.post("/intro/themes/destory", function(req, res, next) {
     var body = req.body;
     var themeId = body.themeId;
     var _id = body.introId;
     IntrosModel.findOne({_id, "themes._id": themeId}).remove(function(err, state) {
        res.send({
            status: true,
            message: "删除成功"
        });
     }).catch(next);
});

router.post("/intro/theme/map/destory", Checks.mapItem, function(req, res, next) {
    IntrosModel.findOne(req.body)
    .remove(function(err, state) {
        res.send({
            status: true,
            message: "删除成功"
        });
    }).catch(next);
});

module.exports = router;
