const Comments = require('./../access/comments');
const Articles = require('./../access/articles');
const Categories = require('./../access/categories');

const convert = {
	comments: function(comments) {
		return comments.map(function(comment) {
			let interval = (new Date() - new Date(comment.createdAt)) / 1000 / 60;
			let intervalName = "";
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
	let { categoryId, subId,  pagination} = req.body;
	Articles.list(categoryId, subId, pagination)
	.then(function (collection) {
		req.body.data = collection;
		next();
	});
}

exports.destoryById = function (req, res, next) {
	let { articleId } = req.body;
	Promise.all([
		Articles.destory(articleId),
		Comments.destory(articleId)
	]).then(function (collection) {
		req.body.data = collection;
		next();
	}).catch(next);
}


exports.save = function (req, res, next) {
	let { categoryId, 
		  title, 
		  articleId,
		  description,
		  illustration, 
		  subIds, 
		  content,
		  recommend = false, 
		  recommendFigure = "",   
		 } = req.body;
	subIds = subIds.map((id) => {
		return {id};
	});
	Articles.save(articleId, {
		title,
		description,
		// 配图, 说明图
		illustration,
		categoryId,
		recommend,
		subIds,
		recommendFigure,
		content
	}).then(function (doc) {
		req.body.data = doc;
		next();
	}).catch(next);
}


exports.getDetail = function (req, res, next) {
	let {articleId, pagination} = req.params;
	Promise.all([
		Categories.all(),
		Articles.getArticle(articleId),
		// Comments.list( pagination , articleId ),
		Comments.count()
	]).then(function (collection) {
		req.body.data = {
			categories: collection[0],
			article: collection[1],
			comments: [],
			total: collection[2]
		};
		next();
	}).catch(next);
}


exports.getCommnets = function (req, res, next) {
	let body = req.body;
	let pagination = body.pagination;
	let articleId = body.articleId;
	Comments.list(articleId, pagination)
		.then(function (collection) {
			req.body.data = collection;
			next();
	}).catch(next)
}


exports.addComment = function (req, res, next) {
	Comments.add(req.body).then(function (doc) {
		req.body.data = doc;
		next();
	}).catch(next);
}