var mongoose = require('../db').mongoose;
var DBSuper = require('./super');
var Utils = require("./../utils/index");

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	title: String,
	description: String,
	img: String,
	navId: String,
	articleId: String,
	createdTime: { type: String, default: Utils.getTime(new Date(), "s") },
	updateTime: {type: String, default: Utils.getTime(new Date(), 's')},
	createdAt: {type: Date, default: Date.now},
	updateAt: {type: Date, default: Date.now},
	categoriesId: [
		{ id: String }
	],
	recommend: {type: Boolean, default: false},
	recommendImg: String,
	content: String
});

Scheam.plugin(DBSuper.regNav);
Scheam.plugin(DBSuper.regFind);

var Article = mongoose.model('article', Scheam);
module.exports = Article;