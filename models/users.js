var mongoose = require('../db').mongoose;
var Utils = require("./../utils/index");
var Super = require("./super");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 username:{type: String},
	 nickName:{type: String, default: '暂无'},
	 password:{type: String},
	 passAgain:{type: String},
	 email: {type: String},
	 createdTime: { type: String, default: Utils.time.get() },
	 updateTime: {type: String, default:  Utils.time.get()},
	 createdAt: {type: Date, default: Date.now},
	 updateAt: {type: Date,  default: Date.now},
});

Scheam.plugin(Super.getCategories);


var Users = mongoose.model('users', Scheam);

module.exports = Users;