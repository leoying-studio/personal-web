var express = require('express');
var router = express.Router();
var ArticleDetailModel = require("./../models/article_detail");
var Body = require("./../config/body");
var Article = require("./../models/article");

router.post("/submit", (req, res) => {
	var body = req.body;
	var title = body.title;
	var navId = body.navId;
	var articleId = body.articleId;
	var categoriesId = body.categoriesId;
	var content = body.content;
	try {
		if (!title) {
			throw new Error("标题不能为空");
		}
		if (!navId) {
			throw new Error("navId不能为空");
		}
		if (!categoryId) {
			throw new Error("类别id不能为空!");
		}
		if (!content) {
			throw new Error("请输入内容!");
		}
	}catch(e) {
		req.flash("error", e.message);
		res.redirect("/manager");
	}

	var articleDetail = new ArticleDetailModel({
			title,
			navId,
			categoryId,
			articleId,
			categoriesId,
			content
		});
		articleDetail.save(function(err, current) {
			if (err) {
				req.flash("error", "添加文章详情失败");
			} else {
				req.flash("success", "添加成功");
			}
			res.redirect("/manager");
		});
	});

router.get("/view/:navId/:cateoryId/:articleId", function(req, res) {
	 var params = req.params;
	 try {
		if (!params.navId) {
			throw new Error("navId不存在");
		}
		if (!params.cateoryId) {
			throw new Error("cateoryId不存在");
		}
		if (!params.articleId) {
			throw new Error("articleId不存在");
		}
	} catch(e) {
		if (err) {
			req.flash("error", e.message);
		}
		res.redirect("/article");
	}

	ArticleDetailModel.find({navId, 'categoriesId.id': params.categoryId, articleId}).exec(function(error, coll) {
		if (erro) {
			req.flash("error", '请求失败');
			res.redirect("/article");
		}
		const body = new Body(coll);
		res.render("/article/article_detail", body);
	});
});

module.exports = router;