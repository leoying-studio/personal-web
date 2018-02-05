var express = require('express');
var router = express.Router();
var ArticleModel = require("./../models/article");
var NavModel = require("./../models/nav");
var ArticleDetailModel = require("./../models/article_detail");
var CommentModel = require("./../models/comment");
var Utils = require("./../utils");
var Validator = require("./../utils/validator");
var ArticleProxy = require("./../proxy/article");
// 新增
router.post("/submit", function() {
	var body = req.body;
	var title = body.title;
	var img = body.img;
	var description = body.description;
	var navId = body.navId;
	var recommend = body.recommend || false;
	var categoriesId = body["categoriesId"];
	var recommendImg = body.recommendImg; 

	var validate = Validator([
		{mode: "required", value: title, message: "标题不能为空"},
		{mode: "required", value: categoriesId, message: "分类id不能为空", type: String}
	]);
	if (!validate.status) {
		req.flash("error", validate.message);
		res.redirect("/manager");
	}
	categoriesId = categoriesId.map(function(id) {
		return {id};
	});

	// 开始插入数据
	var fields = {
		title,
		img,
		navId,
		categoriesId,
		description,
		recommend,
		recommendImg: recommendImg || ""
	};
    new ArticleModel(fields).save(function(err, article) {
		if (!err) {
			 // 插入成功
			req.flash("success", "添加文章列表成功!");
			return res.redirect("/manager");
		}
		req.flash("error", "添加文章列表失败!");
		res.redirect("manager");
	});
});

// 查询
router.get("/view/:navId/:categoryId/:currentPage",function(req, res)　{
	var params = req.params;
	var navId = params.navId;
	var categoryId = params.categoryId;
	var currentPage = params.currentPage;
	var page = req.query.page;
	var conditions = {
		 navId,
		'categoriesId.id': categoryId,
	};
	ArticleProxy.list(conditions, currentPage, function(data) {
		data.params = {
			navId,
			categoryId,
 			currentPage,
		};
		res.render("article/index", data);
	});
}); 


// ajax查询文章列表
router.get("/list",function(req, res)　{
	var query = req.query;
	var navId = query.navId;
	var categoryId = query.categoryId;
	var currentPage = Number(query.skip);
	var page = req.query.page;
	var conditions = {
		 navId,
		'categoriesId.id': categoryId,
	};
	ArticleProxy.list(conditions, currentPage, function(data) {
		res.send(data);
	});
}); 

// 删除
router.post("/delete", function(req, res) {
	var body = req.body;
	var navId = body.navId;
	var categoryId = body.categoryId;
	var articleId = body.articleId;

	var conditions = {
		navId,
		'categoriesId.id': categoryId,
		articleId
	};

	var articleCondtion = {
		 navId,
		'categoriesId.id': categoryId,
		_id: articleId
	};
	// 清除关联数据
	Promise.all([
		CommentModel.remove(conditions),
		ArticleDetailModel.remove(conditions),
		ArticleModel.remove(articleCondtion)
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
	}).catch(e => {
		res.send({
			status: false,
			message: "出现异常"
		});
	});
}); 

// 修改
router.post("/update", function(req, res) {
	var body = req.body;
	var navId = body.navId;
	var categoryId = body.categoryId;
	var articleId = body.articleId;
	var title = body.title;
	var description = body.description;
	var img = body.img;

    ArticleModel.update({
		navId,
		'categoriesId.id': categoryId,
		_id:articleId
	}, {
		$set: {
			title,
			description,
			img
		}
	}, function(err , state) {
		if (err) {
			return res.send({
				message: "更新失败",
				status: false
			});
		} 
		if (state.n > 0) {
			res.send({
				message: "更新成功",
				status: true
			});
		}
	});
});

module.exports = router;