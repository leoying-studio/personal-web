var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
var Super = require("./super");

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 themeId: String,
     discriptiveGraph: String, //配图
     // 内部项标题
     presentation: String,
	 // 是否应用该专题
	 createdTime: { type: String, default: Utils.time.get()},
	 updateTime: {type: String, default:  Utils.time.get()},
	 createdAt: {type: Date, default: Date.now},
	 updateAt: {type: Date,  default: Date.now},
});	


Scheam.plugin(Super.getCategories);
Scheam.plugin(Super.queryPaging);

var Themes = mongoose.model('themes', Scheam);
module.exports = Themes;