var express = require('express');
var router = express.Router();
var Checks = require("./../checks/articles");
var Articles = require('./../business/articles');

// 新增
router.post("/add", Checks.save, Articles.save, function(req, res, next) {
	// 开始插入数据
	next();
});

// 查询
router.get("/view/:categoryId/:childId/:pagination", Checks.query, Articles.getPage, function(req, res)　{
	res.json(req.body.data);
}); 

// ajax查询文章列表
router.get("/data", Checks.query, Articles.getPage, function(req, res, next)　{
	res.json(req.body.data);
}); 


// 删除
router.post("/delete", Checks.delete, Articles.destoryById, function(req, res, next) {
	next();
}); 

// 修改
router.post("/update", Checks.save, function(req, res, next) {
	next();
});


router.get("/detail/view/:articleId/:pagination", Checks.detail, Articles.getDetail, function(req, res) {
	next();
});

/**
 * 获取评论信息
 */
router.get("/comments", Checks.detail, function(req, res) {
	next();
});	

/**
 * 添加评论
 */
router.post("/comment/add", Checks.comments, Articles.addComment, function (req, res, next) {
	next();
});

module.exports = router;