var mongoose = require('../db').mongoose;
var ObjectId = mongoose.Schema.ObjectId;
var Super = require('./super');
var Utils = require("./../utils/index");

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	title: String,
	description: String,
	img: String,
	navId: String,
	createdTime: { type: String, default: Utils.time.get() },
	updateTime: {type: String, default:  Utils.time.get()},
	createdAt: {type: Date, default: Date.now},
	updateAt: {type: Date,  default: Date.now},
	categoriesId: [
		{ categoryId: { type:ObjectId }}
	],
	recommend: {type: Boolean, default: false},
	recommendImg: String,
	content: String
}, {
	timestamps: {createdAt: 'createdAt', updatedAt: 'updateAt'}
});

Scheam.plugin(Super.regNav);
Scheam.plugin(Super.regFind);

Scheam.pre('save', function(next) {
	var now = new Date();
  	this.updateAt = now;
  	next();
});


var Article = mongoose.model('articles', Scheam);
module.exports = Article;