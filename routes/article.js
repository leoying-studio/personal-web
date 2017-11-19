var express = require('express');
var router = express.Router();
var ArticleModel = require("./../models/article");

router.post("/submit", (req, res) => {
	var body = req.body;
	var title = body.title;
	var img = body.img;
	var description = body.description;
	var navId = body.navId;
	var categoriesId = body["categoriesId[]"];
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
	var article = new ArticleModel({
		title,
		img,
		navId,
		categoriesId,
		description
	});
	article.save(function(err, current) {
		if (err) {
			req.flash("error", "添加当前文章失败");
		} else {
			req.flash("success", "添加成功");
		}
		res.redirect("/manager");
	});
});

module.exports = router;