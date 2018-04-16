var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 descrption:{type: 'string'},
	 articleId: {type: 'string'},
	 categoryId:{type: 'string'},
	 createdTime: { type: String, default: Utils.getTime(new Date(), "s")},
	 createdAt: {default: new Date(), type: Date}
});

var TimeLine = mongoose.model('timeline', Scheam);
module.exports = TimeLine;