var ArticleDetailDAL = require("./../dal/article_detail");
var express = require('express');
var Utils = require("./../utils");
var Body = require("./../config/body");

exports.get = function(req, res, next) {
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

   ArticleDetailDAL.get({
	   	navId, 
		'categoriesId.id': params.categoryId, 
		articleId
	}).then( 
	 (doc) => {

		}, 
	 (err) => {

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
		content
	}).
	then((doc) => {
	   // 成功
	   res.render(new Body(doc));
	}, (error) => {
	  //失败
	   res.render(new Body(null, 0, false, '添加数据失败'))
	});

}