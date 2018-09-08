var express = require('express');
var router = express.Router();
var Validate = require("./../validate/articles");
var Articles = require('./../business/articles');

// 保存，新增或者编辑
router.post("/save", Validate.save, Articles.save, function(req, res, next) {
	// 开始插入数据
	next();
});

// 查询
router.get("/view/:categoryId/:subId/:pagination", Validate.query, Articles.getPage, function(req, res)　{
	res.json(req.body.data);
}); 

// ajax查询文章列表
router.get("/data", Validate.query, Articles.getPage, function(req, res, next)　{
	res.json(req.body.data);
}); 


// 删除
router.post("/delete", Validate.delete, Articles.destoryById, function(req, res, next) {
	next();
}); 


router.get("/detail/view/:articleId/:pagination", Validate.detail, Articles.getDetail, function(req, res) {
	next();
});

/**
 * 获取评论信息
 */
router.get("/comments", Validate.detail, function(req, res) {
	next();
});	

/**
 * 添加评论
 */
router.post("/comment/add", Validate.comments, Articles.addComment, function (req, res, next) {
	next();
});

module.exports = router;