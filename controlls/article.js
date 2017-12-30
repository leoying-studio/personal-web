var ArticleDAL = require("./../dal/article");
var express = require('express');
var Utils = require("./../utils");
var Body = require("./body");

exports.getPaging = function(req, res, next) {
     var params = req.params;
	 var navId = params.navId;
	 var categoryId = params.categoryId;
	 var currentPage = params.currentPage;
	 var admin = params.admin;
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
    ArticleDAL.getPaging(null , conditions , function(msg) {
		msg.params = {
			navId,
			categoryId,
			currentPage
		};
		if (admin == "true") {
			res.send(msg.articles);
		} else {
			res.render("article/index", Body(msg));
		}
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
	var article = {
		title,
		img,
		navId,
		categoriesId,
		description
	};
	ArticleDAL.submit(article)
	.then( (articles, command) => {
		 // 插入成功
		 req.flash("success", "添加文章列表成功!");
		 res.redirect("/manager");
	}, () => {
		// 失败
		req.flash("error", "添加文章列表失败!");
		res.redirect("manager");
	});
	
}