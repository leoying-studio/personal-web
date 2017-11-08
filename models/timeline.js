var mongoose=require('../db').mongoose;

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 descrption: string,
	 articleId: string
});

var TimeLine = mongoose.model('timeline', Scheam);
module.exports = TimeLine;