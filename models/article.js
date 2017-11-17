var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 title: {type: "string"},
	 description: {type: "string"},
	 img: {type: "string"},
	 navId: {type: "string"},
	 serverTime: { type: String, default: Utils.getTime(new Date(), "s")},
	 categoriesId: [
		 {id: {type: 'string'}}
	 ],
});
var Article = mongoose.model('article', Scheam);
module.exports = Article;