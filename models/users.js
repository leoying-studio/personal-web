var mongoose = require('../db').mongoose;
var Utils = require("./../utils/index");
var DBSuper = require("./super");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 username:{type: 'string'},
	 nickName:{type: 'string', default: '暂无'},
	 password:{type: 'string'},
	 passAgain:{type: 'string'},
	 email: {type: 'string'},
	 createdTime: { type: String, default: Utils.getTime(new Date(), "s")},
	 createdAt: {type: Date, default: Date.now}
});

Scheam.plugin(DBSuper.regNav);

var User = mongoose.model('users', Scheam);
module.exports = User;