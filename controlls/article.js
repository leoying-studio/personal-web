var ArticleDAL = require("./../dal/article");
var express = require('express');
var Utils = require("./../utils");
var Body = require("./../config/body");

exports.getPaging = function(req, res, next) {
     var params = req.params;
	 var navId = params.navId;
	 var categoryId = params.categoryId;
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
    params = {
        navId,
        'categoriesId.id': categoryId,
    };
    ArticleDAL.getPaging(params, function(msg) {
        res.render("article/index", new Body(msg));
    });
}