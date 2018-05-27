var mongoose=require('../db').mongoose;
var ObjectId = mongoose.Schema.ObjectId;
var Utils = require("./../utils/index");
var Super = require("./super");

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	username: {type: 'string'},
	content:{type: 'string'},
	articleId: {type: ObjectId},
	createdTime: { type: String, default: Utils.time.get() },
	createdAt: {type: Date, default: Date.now},
});

Scheam.plugin(Super.queryPaging);
Scheam.plugin(Super.getCategories);

Scheam.pre('save', function(next) {
	var now = new Date();
  	this.updateAt = now;
  	next();
});
Scheam.set('toJSON', { getters: true, virtuals: false });
var Comment = mongoose.model('comments', Scheam);

module.exports = Comment;