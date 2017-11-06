var mongoose=require('../db').mongoose;

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 username:"string",
	 password:"string",
	 passAgain:"string",
	 email: "string"
});

var User = mongoose.model('users', Scheam);
module.exports = User;