var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
var DBSuper = require("./super");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 title:{type: 'string'},
	 caption:{type: 'string'},
	 headLine: String,
	 description:{type: 'string'},
	//  special: [
	// 	 {photo: String, themes: [
	// 		 {p: String}
	// 	 ]}
	//  ],
	 apply:{type: Boolean, default: false},
	 createdTime: { type: String, default: Utils.getTime(new Date(), "s")},
	 createdAt: {default: Date.now, type: Date}
});
Scheam.plugin(DBSuper.regFind);
var Intro = mongoose.model('intro', Scheam);
module.exports = Intro;