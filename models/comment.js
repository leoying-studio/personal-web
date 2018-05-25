var mongoose=require('../db').mongoose;
var mongoScheam = mongoose,Scheam;
var Utils = require("./../utils/index");
var DBSuper = require("./super");

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	username: {type: 'string'},
	content:{type: 'string'},
	articleId: {type: mongoScheam.Types.ObjectId},
	createdTime: { type: String, default: Utils.time.get() },
	createdAt: {type: Date, default: Date.now},
});

Scheam.plugin(DBSuper.regFind);
Scheam.plugin(DBSuper.regNav);

Scheam.pre('save', function(next) {
	var now = new Date();
  	this.updateAt = now;
  	next();
});

var Comment = mongoose.model('comment', Scheam);

module.exports = Comment;