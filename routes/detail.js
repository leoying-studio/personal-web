var express = require('express');
var router = express.Router();
var ArticleDetailModel = require("./../models/article_detail");
var CommentModel = require("./../models/comment");
var Utils = require("./../utils");
var Validator = require("./../utils/validator");

router.post("/submit", function (req, res) {
	var body = req.body;
	var title = body.title;
	var articleId = body.articleId;
	var content = body.content;
	var validate = Validator([
		{ mode: "required", value: title, message: "标题不能为空" },
		{ mode: "required", value: articleId, message: "文章id不能为空" },
	]);
	if (!validate.status) {
		return res.send({
			message: validate.message,
			status: false
		});
	}

	ArticleDetailModel.findOne({
		articleId
	}, function (err, doc) {
		if (err) {
			req.flash("error", '添加失败');
			return res.redirect("/manager");
		}
		if (!doc) {
			new ArticleDetailModel({
				title,
				articleId,
				content
			}).save(function (err, doc) {
				if (err) {
					return res.send({
						status: false,
						message: "查询错误"
					})
				}
				res.send({
					status: true,
					data: doc,
					message: "success"
				});
			})
		} else {
			ArticleDetailModel.update({
				articleId
			}, { $set: { title, content } }, function (err, state) {
				if (!err && state.n > 0) {
					return res.send(Body(state));
				}
			});
		}
	})

});

router.get("/view/:articleId/:currentPage", function (req, res) {
	var params = req.params;
	var articleId = params.articleId;
	var currentPage = params.currentPage;
	try {
		if (!articleId) {
			throw new Error("articleId不存在");
		}
	} catch (e) {
		req.flash("error", e.message);
		return res.redirect("/article");
	}

	// 操作数据
	ArticleDetailModel.getNavs().then(function (navs) {
		ArticleDetailModel.findOne({
			articleId
		}, function (err, detail) {
			if (!err) {
				if (!detail) {
					res.render('article_detail/index', {
						navs,
						article_detail: {},
						comments: [],
						params: {
							currentPage,
							articleId
						}
					});
				} else {
					var detail = detail.toObject();
					var detailId = detail._id.toJSON();
					var conditions = { detailId };
					CommentModel.findPaging({ currentPage }, conditions)
						.then(function (comments) {
							CommentModel.count(conditions, function (err, total) {
								res.render('article_detail/index', {
									data: {
										navs,
										article_detail: detail,
										comments: { comments, total: total },
										params: {
											currentPage,
											articleId
										}
									}

								});
							});
						});
				}
			} else {
				// 跳转到错误页面
			}
		});
	});
});

router.post("/comment/submit", function (req, res) {
	var body = req.body;
	var username = body.username;
	var content = body.content;
	var detailId = body.detailId;
	var fields = {
		username,
		content,
		detailId
	};
	new CommentModel(fields).save(function (err, comment) {
		if (err) {
			return res.send({
				status: false,
				message: "添加失败"
			});
		}
		res.send({
			status: true,
			data: {comment}
		});
	});
});

router.post("/update", function (req, res) {
	var query = req.query;
	var navId = query.navId;
	var categoryId = query.categoryId;
	var articleId = query.articleId;
	var content = query.content;
	var title = query.title;
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
	ArticleDetailModel.update(conditions, updates, function (err, doc) {
		if (!err) {
			return res.send({
				status: false,
				message: "更新失败"
			})
		}
		return res.send({
			status: true,
			data: {detail: doc}
		})
	});
});

router.post("/del", function (req, res) {
	var query = req.query;
	var navId = query.navId;
	var categoryId = query.categoryId;
	var articleId = query.articleId;
	
	ArticleDetailModel.remove({
		navId,
		'categoriesId.id': categoryId,
		articleId
	}, function (err, doc) {
		if (!err) {
			return res.send(true)
		}
		res.send({
			data: {
				detail: doc,
			},
			message: "success",
			status: true
		});
	});
});

router.get("/detail/get", function () {
	var articleId = req.query.articleId;
	ArticleDetailModel.findOne({ articleId }, function (err, detail) {
		if (err) {
			return res.send(Body({
				code: 'unknow'
			}));
		}
		res.send({
			data: {
				detail: detail || {},
				params: {
					articleId
				}
			},
			message: "success",
			status: true
		});
	});
});

module.exports = router;