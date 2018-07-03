var Comments = require('./../access/comments');
var Articles = require('./../access/articles');
var Categories = require('./../access/categories');

var convert = {
	comments: function(comments) {
		return comments.map(function(comment) {
			var interval = (new Date() - new Date(comment.createdAt)) / 1000 / 60;
			var intervalName = "";
			if (interval < 1) {
				intervalName = "刚刚";
			} else if(interval < 60) {
				intervalName = Math.floor(interval) + '分钟前';
			} else if (interval > 60 && interval < 24 * 60) {
				intervalName = Math.floor(interval / 60) + '小时前';
			} else if (interval >= 24 * 60 && interval < 24 * 60 * 7) {
				intervalName = Math.floor(interval / 24 / 60) + '天前';
			} else {
				intervalName = comment.createdTime
			}
			return {
				username: comment.username,
				content: comment.content,
				intervalName
			};
		});
	}
}

exports.getPage = function (req, res, next) {
	var body = req.body;
	Articles.list(body.categoryId, body.pagination)
		.then(function (collection) {
			req.body.data = collection;
			next();
		});
}

exports.destoryById = function (req, res, next) {
	var body = req.body;
	Promise.all([
		Articles.destory(body.id),
		Comments.destory(body.id)
	]).then(function (collection) {
		req.body.data = collection;
		next();
	}).catch(next);
}


exports.save = function (req, res, next) {
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
	}).then(function (doc) {
		req.body.data = doc;
		next();
	}).catch(next);
}


exports.getDetail = function (req, res, next) {
	var body = req.body;
	var pagination = body.pagination;
	var articleId = body.articleId;
	Promise.all([
		Categories.all(),
		Articles.getArticle(articleId),
		Comments.list({ pagination }, { articleId }),
		Comments.count()
	]).then(function (collection) {
		req.body.data = {
			categories: collection[0],
			article: collection[1],
			comments: convert.comments(collection[2]),
			total: collection[3]
		};
		next();
	}).catch(next);
}


exports.getCommnets = function (req, res, next) {
	var body = req.body;
	var pagination = body.pagination;
	var articleId = body.articleId;
	Comments.list(articleId, pagination)
		.then(function (collection) {
			req.body.data = collection;
			next();
		});
}


exports.addComment = function (req, res, next) {
	var body = req.body;
	Comments.add(req.body).then(function (doc) {
		req.body.data = doc;
		next();
	});
}