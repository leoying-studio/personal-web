var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 title:{type: 'string'},
	 caption:{type: 'string'},
	 description:{type: 'string'},
	 apply:{type: Boolean, default: false},
	 serverTime: { type: String, default: Utils.getTime(new Date(), "s")}
});

var Intro = mongoose.model('intro', Scheam);
module.exports = Intro;