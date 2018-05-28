var express = require('express');
var router = express.Router();
var ArticlesModel = require("./../models/articles");
var CommentsModel = require("./../models/comments");
var Utils = require("./../utils");
var Validator = require("./../utils/validator");
var ArticlesProxy = require("./../proxy/articles");

// 新增
router.post("/submit", function(req, res, next) {
	var body = req.body;
	var title = body.title;
	var img = body.img;
	var description = body.description;
	var categoryId = body.categoryId;		
	var recommend = body.recommend || false;
	var childrenId = body["childrenId"] || [];
	var content = body.content;
	var recommendImg = body.recommendImg || "";
	if (typeof childrenId === "string") {
		childrenId = childrenId.split(",");
	}
	var validate = Validator([
		{mode: "required", value: title, message: "标题不能为空"},
		{mode: "required, len", conditions: {min: 10}, value: content, message: "文章内容不能少于十个字符"},
		{mode: "len", type: Array, message: "请至少选择一个分类", conditions: {min: 1}, value: childrenId}
	]);
	if (!validate.status) {
		req.body.message = validate.message;
		return next();
	}
	childrenId = childrenId.map(function(id) {
		return {id};
	});
	// 开始插入数据
	var fields = {
		title,
		img,
		categoryId,
		childrenId,
		description,
		recommend,
		recommendImg,
		content
	};
    new ArticlesModel(fields).save(function(err, doc) {
		if (err) {
			return next(err);
		}
		req.body.data = doc;
		next();
	}).catch(next);
});

// 查询
router.get("/view/:navId/:categoryId/:currentPage",function(req, res)　{
	var params = req.params;
	var categoryId = params.categoryId;
	var childId = params.childId;
	var pagination = params.pagination;
	var conditions = {
		categoryId,
		'childrenId.id': childId,
	};
	ArticlesProxy.list(conditions, pagination, true)
	.then(function(data) {
		var body = {
			categries: data[0],
			total: data[1],
			childId,
			pagination
		};
		res.render("article/index", body);
	});
}); 

// ajax查询文章列表
router.get("/data", function(req, res, next)　{
	var query = req.query;
	var categoryId = query.categoryId;
	var childId = query.childId;
	var currentPage = query.page;
	var conditions = {
		 categoryId,
		'childrenId.id': childId,
	};
	ArticlesProxy.list(conditions, currentPage, function(data) {
		res.send({
			status: true,
			data: data.articles,
			total: data.total
		});
	}).catch(next);
}); 

//查询所有文章列表
router.get("/data/all", function(req, res) {
	var currentPage = req.query.page;
	ArticlesModel.queryPaging({currentPage}, {})
	.then(function(collections) {
		res.send({
			status: true,
			data: collections
		});	
	});
});

// 删除
router.post("/delete", function(req, res, next) {
	var body = req.body;
	var articleId = body.articleId;

	// 清除关联数据
	Promise.all([
		ArticlesModel.remove({_id: articleId}),
		CommentModel.remove({articleId}),
	]).then( values => {
		var state = values.every(function(item) {
			return item.result.ok == 1;
		});
		if (state) {
			res.send({
				status: true,
				message: "success"
			});
		} else {
			res.send({
				status: false,
				message: "删除错误"
			});
		}
	}).catch(next);
}); 

// 修改
router.post("/update", function(req, res, next) {
	var body = req.body;
	var title = body.title;
	var img = body.img;
	var description = body.description;
	var recommend = body.recommend || false;
	var categoriesId = body["categoriesId"] || [];
	var content = body.content;
	var recommendImg = body.recommendImg || "";
	var articleId = body.articleId;
	var validate = Validator([
		{mode: "required",value:categoriesId, message: "请至少选择一个分类", type: Array},
		{mode: "required", value: title, message: "标题不能为空"},
		{mode: "required", value: img, message: "缩略图不能为空"},
		{mode: "required", value: description, message: "文章说明不能为空"},
		{mode: "required, len", value: content, message: "文章内容不能少于十个字", conditions: {min: 10}}
	]);
	if (!validate.status) {
		req.body.message = validate.message;
		return next();
	}
	categoriesId = categoriesId.map(function(category) {
		return {id: category}
	});
    ArticlesModel.update({
		_id:articleId
	}, {
		$set: {
			title,
			img,
			description,
			recommend,
			categoriesId,
			content,
			recommendImg
		}
	}, function(err , state) {
		if (state.n > 0) {
			res.send({
				status: true,
				msg: '更新成功'
			})
		} else {
			res.send({
				status: false,
				msg: err.message
			})
		}
	}).catch(next);
});


router.get("/detail/view/:articleId/:currentPage", function(req, res) {
	var params = req.params;
	var articleId = params.articleId;
	var currentPage = params.currentPage;
	ArticlesModel.getCategories().lean().then(function(navs) {
		ArticlesProxy.detail({articleId}, currentPage, function(data) {
			data.params = {
				articleId,
				currentPage
			};
			data.navs = navs;
			res.render("detail", data);
		});
	});
});

router.get("/comments", function(req, res) {
	var body = req.body;
	var articleId = body.articleId;
	var currentPage = body.skip;
	CommentModel.queryPaging({articleId}, {currentPage}).then(function(collections) {
		res.send(collections);
	}).catch(next);
});	

router.post("/comment/submit", function (req, res, next) {
	var body = req.body;
	var username = body.username;
	var content = body.content;
	var articleId = body.articleId;
	var validate = Validator([
		{mode: "required", value: username, message: "用户名不能为空"},
		{mode: "required, len", value: content, message: "评论内容不能少于10个字符", conditions: {min: 10}}
	]);
	if (!validate.status) {
		return res.send({
			status: false,
			message: validate.message
		});
	}
	var fields = {
		username,
		content,
		articleId
	};
	new CommentModel(fields).save(function (err, doc) {
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