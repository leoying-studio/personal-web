var express = require('express');
var router = express.Router();
var ArticlesModel = require("./../models/articles");
var CommentsModel = require("./../models/comments");
var Utils = require("./../utils");
var Check = require("./../checks/articles");
var ArticlesProxy = require("./../proxy/articles");

// 新增
router.post("/add", Check.save, function(req, res, next) {
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
router.get("/view/:navId/:categoryId/:currentPage", Check.query, function(req, res)　{
	ArticlesProxy.list(conditions, pagination, true)
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
router.get("/data", Check.query, function(req, res, next)　{
	ArticlesProxy.list(conditions, currentPage, function(collections) {
		req.body.data = {
			data: collections[0],
			total: collections[1]
		};
		next();
	}).catch(next);
}); 


// 删除
router.post("/delete", function(req, res, next) {
	var body = req.body;
	var articleId = body.articleId;
	// 清除关联数据
	Promise.all([
		ArticlesModel.findOneAndRemove({_id: articleId}),
		CommentModel.findOneAndRemove({articleId}),
	]).then( collections => {
		req.body.data = {
			article: collections[0],
			comments: collections[1]
		};
		next();
	}).catch(next);
}); 

// 修改
router.post("/update", Check.save, function(req, res, next) {
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


router.get("/detail/view/:articleId/:pagination", Check.detail, function(req, res) {
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



router.get("/comments", Check.detail, function(req, res) {
	CommentsModel.queryPaging({articleId}, {currentPage}).then(function(collections) {
		res.send(collections);
	}).catch(next);
});	


router.post("/comment/add", Check.comments, function (req, res, next) {
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