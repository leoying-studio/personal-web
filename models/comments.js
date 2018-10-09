const mongoose=require('../db').mongoose;
const ObjectId = mongoose.Schema.ObjectId;
const Utils = require("./../utils/index");
const Super = require("./super");

// 定义映射的集合结构模型
const Scheam = new mongoose.Schema({
	username: {type: 'string'},
	content:{type: 'string'},
	// 文章的id
	articleId: {type: ObjectId},
	createdTime: { type: String, default: Utils.time.get() },
	createdAt: {type: Date, default: Date.now},
});

Scheam.plugin(Super.queryPaging);
Scheam.plugin(Super.getCategories);


const Comment = mongoose.model('comments', Scheam);

module.exports = Comment;