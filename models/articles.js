var mongoose = require('../db').mongoose;
var ObjectId = mongoose.Schema.ObjectId;
var Super = require('./super');
var Utils = require("./../utils/index");

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	title: String,
	description: String,
	// 配图, 说明图
	illustration: String,
	// 类别Id
	categoryId: ObjectId,
	createdTime: { type: String, default: Utils.time.get() },
	updateTime: {type: String, default:  Utils.time.get()},
	createdAt: {type: Date, default: Date.now},
	updateAt: {type: Date,  default: Date.now},
	// 子类Id
	childrenId: [
		{ id: ObjectId}
	],
	// 是否作为首页推荐
	recommend: {type: Boolean, default: false},
	// 首页推荐图
	recommendFigure: String,
	// 文章内容
	content: String
}, {
	timestamps: {createdAt: 'createdAt', updatedAt: 'updateAt'}
});

Scheam.set('toJSON', { getters: true, virtuals: false });
Scheam.plugin(Super.queryPaging);
Scheam.plugin(Super.getCategories);

Scheam.pre('save', function(next) {
	var now = new Date();
  	this.updateAt = now;
  	next();
});


var Articles = mongoose.model('articles', Scheam);
module.exports = Articles;