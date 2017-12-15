var ArticleDetailDAL = require("./../dal/article_detail");
var express = require('express');
var Utils = require("./../utils");
var Body = require("./../config/body");

exports.get = function(req, res, next) {
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
   } catch(e) {
	   req.flash("error", e.message);
	   return res.redirect("/article");
   }

   ArticleDetailDAL.get({
	   	navId, 
		'categoriesId.id': params.categoryId, 
		articleId
	}, function(doc) {
		doc.article_detail = doc.article_detail || {};
		doc.article_detail.categoryId = params.categoryId;
		doc.article_detail.currentPage = params.currentPage; 
		if (doc.article_detail && doc.article_detail.comment) {
			doc.commentTotal = doc.article_detail.comment.length;
			currentPage -=1;
			var startIndex = currentPage* 15;
			var endIndex = (Number(currentPage)+1)*15;
			doc.article_detail.comment = doc.article_detail.comment.sort({serverTime: 1}).slice(startIndex, endIndex);
		}
		res.render("article_detail/index", new Body(doc));
	});
}

// 提交ajax  查询
exports.submit = function(req, res, next) {
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
		if (!categoriesId) {
			throw new Error("类别id不能为空!");
		}
		if (!content) {
			throw new Error("请输入内容!");
		}
	}catch(e) {
		return res.send(new Body({}, 0, false, e.message));
	}

	categoriesId = JSON.parse(categoriesId).map(function(item) {
		return {id: item.id};
	});

	ArticleDetailDAL.save({
		title,
		navId,
		articleId,
		categoriesId,
		content,
		comment: []
	}).
	then((doc) => {
	   // 成功
	   res.send(new Body(doc));
	}, (error) => {
	  //失败
	   res.send(new Body(null, 0, false, '添加数据失败'))
	});
}


exports.submitComment = function(req, res, next) {
	var body = req.body;
	var username = body.username;
	var content = body.content;
	var conditions = body.conditions;
	conditions["categoriesId.id"] = conditions.categoryId;
	delete conditions.categoryId;
	ArticleDetailDAL.addComment({
		conditions,
		fields: {username,content}
	}, function(err, state) {
		  if (err) {
			 return res.send(new Body(null, 404, false , "发表失败"));
		  }
		  return res.send(new Body(state));
	});
}