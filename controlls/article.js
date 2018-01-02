var ArticleModel = require("./../models/article");
var ArticleDetailModel = require("./../models/article_detail");
var CommentModel = require("./../models/comment");
var express = require('express');
var Utils = require("./../utils");
var Body = require("./body");

exports.getPaging = function(req, res, next) {
     var params = req.params;
	 var navId = params.navId;
	 var categoryId = params.categoryId;
	 var currentPage = params.currentPage;
	 var page = req.query.page;
	 if (page) {
		 currentPage = page;
	 }

	 try {
		if (!navId) {
			throw new Error("navId不存在");
		} 
		if (!categoryId) {
			throw new Error("cateoryId不存在");
		}
	} catch(e) {
		req.flash("error", e.message);
		res.redirect("/article");
	}

	var conditions = {
		 navId,
		'categoriesId.id': categoryId,
	};

	ArticleModel.findPaging({currentPage}, conditions )
	 .then(function(articles) {
		 ArticleModel.getNavs().then(function(navs) {
			 ArticleModel.count(conditions, function(err, total) {
				   var body = Body({
						params: {
							navId,
							categoryId,
							currentPage,
							total
						},
						navs,
						articles
				   });
				   //res.send(body);
				   if (req.session.user == 'admin' && page) {
					   return res.send(body)
				   }
			       res.render('article/index', body);   
			 });
		 });
	 });
}

// 提交
exports.submit = function(req, res, next) {
	var body = req.body;
	var title = body.title;
	var img = body.img;
	var description = body.description;
	var navId = body.navId;
	var categoriesId = body["categoriesId"];
	if (typeof categoriesId == "string") {
		categoriesId = [categoriesId];
	}
	categoriesId = categoriesId.map(function(id) {
		return {id};
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
	var fields = {
		title,
		img,
		navId,
		categoriesId,
		description
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
}

//修改
exports.update = function(req, res, next) {
	var body = req.body;
	var navId = body.navId;
	var categoryId = body.categoryId;
	var articleId = body.articleId;
	var title = body.title;
	var description = body.description;
	var img = body.img;

	try {
		if (!navId) {
			throw new Error('navId 不能为空');
		}
		if (!categoryId) {
			throw new Error('categoryId 不能为空');
		}
		if (!articleId) {
			throw new Error('articleId 不能为空');
		}
	}catch(e) {
		return res.send(Body({
			code: 'validate',
			data: e.message
		}));
	}
    ArticleModel.update({
		navId,
		'categoriesId.id': categoryId,
		articleId
	}, {
		$set: {
			title,
			description,
			img
		}
	}, function(err , doc) {
		if (err) {
			res.send(Body({
				code: 'unknown'
			}));
		} else {
			res.send(Body(doc));
		}
	});
}


exports.del = function(req, res, next) {
	var query = req.query;
	var navId = query.navId;
	var categoryId = query.categoryId;
	var articleId = query.articleId;
	try {
		if (!navId) {
			throw new Error('navId 不能为空');
		}
		if (!categoryId) {
			throw new Error('categoryId 不能为空');
		}
		if (!articleId) {
			throw new Error('articleId 不能为空');
		}
	}catch(e) {
		return res.send(Body({
			code: 'validate',
			data: e.message
		}));
	}

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
			return item.result.n > 0;
		});
		if (state) {
			res.send(Body(true));
		} else {
			res.send(Body({
				code: 'params',
				msg: '有残留或未删除, 请进行参数检查'
			}));
		}
	}).catch(e => {
		res.render(Body({
			code: 'unknown'
		}));
	});
}