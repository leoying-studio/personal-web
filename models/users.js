const mongoose = require('../db').mongoose;
const Utils = require("./../utils/index");
const Super = require("./super");
// 定义映射的集合结构模型
let Scheam = new mongoose.Schema({
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


let Users = mongoose.model('users', Scheam);

module.exports = Users;