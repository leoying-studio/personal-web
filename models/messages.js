let mongoose = require('../db').mongoose;
let Utils = require("./../utils/index");
let Super = require("./super");

// 定义映射的集合结构模型
let Scheam = new mongoose.Schema({
	 username:{type: String},
	 message: String,
	 email: {type: String},
	 createdTime: { type: String, default: Utils.time.get() },
	 updateTime: {type: String, default:  Utils.time.get()},
	 createdAt: {type: Date, default: Date.now},
	 updateAt: {type: Date,  default: Date.now},
});

Scheam.plugin(Super.getCategories);


let Messages = mongoose.model('messages', Scheam);

module.exports = Messages;