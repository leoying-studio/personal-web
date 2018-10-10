const mongoose = require('../db').mongoose;
const Super = require('./super');
const Utils = require("./../utils/index");

// 定义映射的集合结构模型
let Scheam = new mongoose.Schema({
	title: String,
	description: String,
	// 配图, 说明图
	illustration: String,
	createdTime: { type: String, default: Utils.time.get() },
	updateTime: {type: String, default:  Utils.time.get()},
	createdAt: {type: Date, default: Date.now},
	updateAt: {type: Date,  default: Date.now},
	categoryId: String,
	// 子类Id
	subIds: [
		{ id: mongoose.Schema.Types.ObjectId}
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


Scheam.plugin(Super.queryPaging);
Scheam.plugin(Super.getCategories);


let Articles = mongoose.model('articles', Scheam);
module.exports = Articles;