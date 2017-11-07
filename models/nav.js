var mongoose=require('../db').mongoose;

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 name: string,
	 categories: [
		 {
			 _id: string,
			 name: string,
		 }
	 ]
});

var User = mongoose.model('users', Scheam);
module.exports = User;