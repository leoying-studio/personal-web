var Validator = require('./validator');

exports.save = function(req, res, next) {
	var body = req.body;
	var rules = [
		{
			value: body.title, 
			name: '标题', 
			type: String
		},
		{
			rule: {
				rule: {min: 10, max: Infinity},
				message: '文章内容不能少于十个字符'
			},
            name: '文章内容',
			value: body.content,
			type: String
		},
		{
			rules: {
				rule: {min: 1},
				message: "请至少选择一个分类"
			}, 
            type: Array,
            name: '分类',
			value: body.subIds
		},
		{
			value: body.categoryId,
			name: '类别Id',
			type: String
		},
		{
			// 文章配图
			value: body.illustration,
			name: '文章配图',
			type: String
		},
		{
			rule: {min: 10,  message: '文章说明应不少于10个字符'},
			value: body.description,
			name: '文章说明',
			type: String
		}
	];
    if (body.recommend) {
		rules.push({
			value: body.recommendFigure,
			type: String,
			name: '推荐图'
		});
	}
	var validate = Validator(rules);
	if (!validate.status) {
		return res.send(validate);
    }
    next();
}


exports.query = function(req, res, next) {
	var params = req.query;
	var rules = [
		{
			value: params.categoryId,
			type: String,
			name: '类别Id'
		},
		{
			value: params.childId,
			type: String,
			name: '子类Id'
		},
		{
			value: params.pagination,
			type: Number,
			name: '页码'
		}
	];
	var validate = Validator(rules);
	if (!validate) {
		req.body.message = validate.message;
		return validate.send(validate);
	}
	next();
}


exports.delete = function(req, res, next) {
	var body = req.body;
	var rules  = [
		{
			value: body.articleId,
			type: String,
			name: '文章Id'
		}
	];
	var validate = Validator(rules);
	if (!validate) {
		return res.send(validate);
	}
	next();
}


exports.detail = function(req, res, next) {
	var rules = [
		{
			value: params.articleId,
			type: String,
			name: '文章Id'
		},
		{
			value: params.pagination,
			type: Number,
			name: '页码'
		}
	];
	var validate = Validator(rules);
	if (!validate) {
		return res.send(validate);
	}
	req.body = {
		articleId: params.articleId,
	}
	req.params = {
		pagination: params.pagination
	}
	next();
}

exports.comments = function(req, res, next) {
	var body = req.body;
	var rules = [
		{
			value: body.articleId,
			type: String,
			name: '文章Id'
		},
		{
			value: body.username,
			type: String,
			name: '用户名称'
		},
		{
			value: body.content,
			type: Number,
			name: '评论内容'
		}
	];
	var validate = Validator(rules);
	if (!validate) {
		return res.send(validate);
	}
	req.body = {
		articleId: body.articleId,
		username: body.username,
		content: body.content
	}
	next();
}