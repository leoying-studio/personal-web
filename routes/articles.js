var express = require('express');
var router = express.Router();
var ArticlesModel = require("./../models/articles");
var CommentsModel = require("./../models/comments");
var Utils = require("./../utils");
var Checks = require("./../Checks/articles");
var ArticlesProxy = require("./../proxy/articles");

// 新增
router.post("/add", Checks.save, function(req, res, next) {
	// 开始插入数据
	ArticlesModel.create(req.body, function(err, doc) {
		if (err) {
			return next();
		}
		req.body.data = doc;
		next();
	}).catch(next);
});

// 查询
router.get("/view/:categoryId/:childId/:pagination", Checks.query, function(req, res)　{
	ArticlesProxy.list(req.body, req.params, true)
	.then(function(data) {
		var body = {
			categories: data[0],
			total: data[1],
			childId,
			pagination
		};
		res.render("article/index", body);
	});
}); 

// ajax查询文章列表
router.get("/data", Checks.query, function(req, res, next)　{
	ArticlesProxy.list(req.body, req.params, function(collections) {
		req.body.data = {
			data: collections[0],
			total: collections[1]
		};
		next();
	}).catch(next);
}); 


// 删除
router.post("/delete", Checks.delete, function(req, res, next) {
	Promise.all([
		ArticlesModel.findOneAndRemove({_id: req.body.articleId}),
		CommentModel.findOneAndRemove(req.body),
	]).then( collections => {
		req.body.data = {
			article: collections[0],
			comments: collections[1]
		};
		next();
	}).catch(next);
}); 

// 修改
router.post("/update", Checks.save, function(req, res, next) {
	var articleId = req.body.article;
    ArticlesModel.findByIdAndUpdate( articleId ,{
		$set: req.body,
	}, function(err , doc) {
		if (err) {
			return next();
		}
		req.body.data = doc;
		next();
	}).catch(next);
});


router.get("/detail/view/:articleId/:pagination", Checks.detail, function(req, res) {
	ArticlesModel.getCategories().then(function(categories) {
		ArticlesProxy.detail(req.body, req.params.pagination, function(data) {
			data.params = {
				articleId,
				pagination
			};
			data.navs = navs;
			var body = {
				data,
				params: {
					articleId: req.body.articleId,
					pagination: req.params.pagination
				}
			};
			res.render("detail", data);
		});
	});
});


/**
 * 获取评论信息
 */
router.get("/comments", Checks.detail, function(req, res) {
	CommentsModel.queryPaging(req.body, req.params).then(function(collections) {
		req.body.data = collections;
		next();
	}).catch(next);
});	


/**
 * 添加评论
 */
router.post("/comment/add", Checks.comments, function (req, res, next) {
	CommentsModel.create(req.body, function(err, doc) {
		if (err) {
			return next();
		}
		req.body = {
			data: comment,
			message: '评论成功'
		}
		next();
	}).catch(next);
});

module.exports = router;