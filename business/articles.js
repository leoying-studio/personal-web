var Comments = require('./../access/comments');
var Articles = require('./../access/articles');
var Categories = require('./../access/categories');

exports.getPage = function(req, res, next) {
	var body = req.body;
	Articles.list(body.categoryId, body.pagination)
	.then(function(collection) {
		req.body.data = collection;
		next();
	});	
}

exports.destoryById = function(req, res, next) {
	var body = req.body;
	Promise.all([
		Articles.destory(body.id),
		Comments.destory(body.id)
	]).then(function(collection) {
		req.body.data = collection;
		next();
	}).catch(next);
}


exports.save = function(req, res, next) {
	var body = req.body;
	Articles.save(req.body._id, {
		title: body.title,
		description: body.description,
		// 配图, 说明图
		illustration: body.illustration,
		categories,
		recommend,
		recommendFigure: String,
		content
	}).then(function(doc) {
		req.body.data = doc;
		next();
	}).catch(next);
}


exports.getDetail = function(req, res, next) {
	var body = req.body;
	var pagination = body.pagination;
	var articleId = body.articleId;
	Promise.all([
		Categories.all(),
		Articles.getArticle(articleId),
		Comments.list({ pagination }, { articleId }),
		Comments.count()
	]).then(function(collection) {
		req.body.data = {
			categories: collection[0],
			article: collection[1],
			comments: collection[2],
			total: collection[3]
		};
		next();
	}).catch(next);
}
