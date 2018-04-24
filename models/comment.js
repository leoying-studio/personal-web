var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
var DBSuper = require("./super");

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	username: {type: 'string'},
	content:{type: 'string'},
	detailId: {type: 'string'},
	createdTime: { type: String, default: Utils.getTime(new Date(), "s")},
	createdAt: {default: Date.now, type: Date}
});

Scheam.plugin(DBSuper.regFind);
Scheam.plugin(DBSuper.regNav);
var Comment = mongoose.model('comment', Scheam);

module.exports = Comment;