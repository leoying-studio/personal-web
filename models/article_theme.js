var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 img: {type: "string"},
	 navId: {type: "string"},
	 serverTime: { type: String, default: Utils.getTime(new Date(), "s")},
	 categoriesId: [
		 {id: {type: 'string'}}
	 ],
});

var ArticleTheme = mongoose.model('article_theme', Scheam);
module.exports = ArticleTheme;