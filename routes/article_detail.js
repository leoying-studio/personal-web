var express = require('express');
var router = express.Router();
var ArticleDetailModel = require("./../models/article_detail");

router.post("/submit", (req, res) => {
	var body = req.body;
	var title = body.title;
	var navId = body.navId;
	var articleId = body.articleId;
	var categoriesId = body["categoriesId[]"];
	var content = body.content || "暂无内容";
	if (typeof categoriesId == "string") {
		categoriesId = [categoriesId];
	}
	categoriesId = categoriesId.map(function(item) {
		return {id: item};
	});
	try {
		if (!title) {
			throw new Error("标题不能为空");
		}
		if (!navId) {
			throw new Error("navId不能为空");
		}
		if (!categoriesId) {
			throw new Error("categoriesId不能为空");
		}
		if (!Array.isArray(categoriesId)) {
			throw new Error("categoriesId必须为数组");
		}
		if (!categoriesId.length) {
			throw new Error("请至少选择一个分类");
		}
	}catch(e) {
		req.flash("error", e.message);
		res.redirect("/manager");
	}
	// 开始插入数据
	var articleDetail = new ArticleDetailModel({
		title,
		navId,
		categoriesId,
		articleId,
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

	ArticleDetailModel.find({navId, 'categoriesId.id': params.categoryId, articleId}).then(function() {

	});
});

module.exports = router;