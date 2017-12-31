var ArticleDetailModel = require("./../models/article_detail");
var CommentModel = require("./../models/comment");
var express = require('express');
var Utils = require("./../utils");
var Body = require("./Body");

exports.get = function (req, res, next) {
	var params = req.params;
	var navId = params.navId;
	var categoryId = params.categoryId;
	var articleId = params.articleId;
	var currentPage = params.currentPage;
	try {
		if (!navId) {
			throw new Error("navId不存在");
		}
		if (!categoryId) {
			throw new Error("cateoryId不存在");
		}
		if (!articleId) {
			throw new Error("articleId不存在");
		}
	} catch (e) {
		req.flash("error", e.message);
		return res.redirect("/article");
	}

	// 操作数据
	ArticleDetailModel.getNavs().then(function (navs) {
		var pageStart = (currentPage - 1) * 10;
		var pageEnd = currentPage * 10;
		ArticleDetailModel.findOne({
			navId,
			'categoriesId.id': categoryId,
			articleId
		}, function (err, detail) {
			if (!err) {
				if (!detail) {
					res.render('article_detail/index', Body({
						navs,
						article_detail: {},
						comments: []
					}));
				} else {
					var conditions = {
						navId,
						'categoriesId.id': categoryId,
						articleId
					};
					CommentModel.findPaging({ currentPage }, conditions)
						.then(function (comments) {
							CommentModel.count(conditions, function () {
								res.render('article_detail/index', Body({
									navs,
									article_detail: detail,
									comments
								}));
							});
						});
				}
			} else {
				// 跳转到错误页面

			}
		});


	});
}

// 提交ajax  查询
exports.submit = function (req, res, next) {
	var query = req.query;
	var title = query.title;
	var navId = query.navId;
	var articleId = query.articleId;
	var categoriesId = query.categoriesId;
	var content = query.content;
	try {
		if (!title) {
			throw new Error("标题不能为空");
		}
		if (!navId) {
			throw new Error("navId不能为空");
		}
		if (!categoriesId) {
			throw new Error("类别id不能为空!");
		}
		if (!content) {
			throw new Error("请输入内容!");
		}
	} catch (e) {
		return res.send(Body({
			code: 'validate',
			Body: e.message
		}));
	}

	categoriesId = JSON.parse(categoriesId).map(function (item) {
		return { id: item.id };
	});

	new ArticleDetailModel({
		title,
		navId,
		articleId,
		categoriesId,
		content,
		comment: []
	}).save(function (err, doc) {
		if (!err) {
			return res.send(Body(doc));
		}
		res.send(Body({
			code: 'unknown'
		}))
	})
}


exports.submitComment = function (req, res, next) {
	var query = req.query;
	var username = query.username;
	var content = query.content;
	var navId = query.navId;
	var categoriesId = query.categoriesId;
	var articleId = query.articleId;
	var fields = {
		navId,
		categoriesId,
		articleId,
		username,
		content
	};

	new CommentModel(fields).save(function(err, doc) {
		if (err) {
			return res.send(Body({
				code: 'unknown'
			}));
		}
		return res.render('article_detail/index', Body(doc));
	});
}

// 删除
exports.del = function (req, res, next) {
	var query = req.query;
	var navId = query.navId;
	var categoryId = query.categoryId;
	var articleId = query.articleId;
	try {
		if (!navId) {
			throw new Error('导航id不能为空');
		}
		if (!categoryId) {
			throw new Error('类别不能为空');
		}
		if (!articleId) {
			throw new Error('文章Id不能为空');
		}
	} catch (e) {
		return res.send(Body({
			code: 'validate'
		}))
	}
	ArticleDetailModel.remove({
		navId,
		'categoriesId.id': categoryId,
		articleId
	}, function (err) {
		if (!err) {
			return res.send(true)
		}
		res.send(Body({
			code: 'operation',
			msg: '可能未查询到该条信息'
		}));
	});
}

// 修改
exports.update = function (req, res, next) {
	var query = req.query;
	var navId = query.navId;
	var categoryId = query.categoryId;
	var articleId = query.articleId;
	var content = query.content;
	var title = query.title;
	// 参数验证
	try {
		if (!navId) {
			throw new Error('navId不能为空');
		}
		if (!categoryId) {
			throw new Error("categoryId不能为空");
		}
		if (!articleId) {
			throw new Error("articleId不能为空");
		}
		if (!content) {
			throw new Error("content不能为空");
		}
	} catch (e) {
		res.send(Body({
			code: 'validate',
			msg: e.message
		}));
	}
	// 数据操作
	var conditions = {
		navId,
		articleId,
		'categoriesId.id': categoryId
	};
	var updates = {
		$set: {
			title: title,
			content: content
		}
	};
	ArticleDetailModel.update(conditions, updates, function (err, state) {
		if (!err) {
			return res.send(Body(doc))
		}
		res.send(Body({
			code: 'operation',
			msg: '可能未查询到该条信息'
		}));
	});
}