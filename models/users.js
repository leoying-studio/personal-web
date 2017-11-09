var mongoose=require('../db').mongoose;
let Utils = require("./../utils/index");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 username:{type: 'string'},
	 password:{type: 'string'},
	 passAgain:{type: 'string'},
	 email: {type: 'string'},
	 serverTime: { type: String, default: Utils.getTime(new Date(), "s")}
});

var User = mongoose.model('users', Scheam);
module.exports = User;