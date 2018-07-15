var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
var Super = require("./super");

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 // 标语, 口号
	 slogan: {type: String},
	 // 标题
	 title:{type: String},
	 // 简介
	 intro:{type: String},
	 // 主题顶部概述
	 themeOverview: String,
	 // 主题
	 themes: [
		 {
			illustrating: String, // 主题配图图
			// 内部专题项标题
			headline: String
		 }
	 ],
	 // 是否应用该专题
	 createdTime: { type: String, default: Utils.time.get()},
	 updateTime: {type: String, default:  Utils.time.get()},
	 createdAt: {type: Date, default: Date.now},
	 updateAt: {type: Date,  default: Date.now},
});	


Scheam.plugin(Super.getCategories);
Scheam.plugin(Super.queryPaging);

// Scheam.pre('save', function(next) {
// 	var now = new Date();
// 	this.updateAt = now;
// 	this.updateTime = Utils.time.get();
//   	next();
// });

// Scheam.set('toJSON', { getters: true, virtuals: false });
var Intro = mongoose.model('intro', Scheam);
module.exports = Intro;