var mongoose=require('../db').mongoose;

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 title:"string",
	 caption:"string",
	 descrption:"string",
	 backTitle: "string",
	 backgrounds: [{background:""}]
});

var User = mongoose.model('intro', Scheam);
module.exports = User;