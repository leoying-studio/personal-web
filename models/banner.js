var mongoose=require('../db').mongoose;

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 title:"string",
	 caption:"string",
	 description:"string",
	 background: "string"
});

var Banner = mongoose.model('banner', Scheam);
module.exports = User;