var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 title: {type: "string"},
	 caption: {type: "string"},
	 description:{type: 'string'},
	 background:{type: 'string'},
	 serverTime: { type: String, default: Utils.getTime(new Date(), "s")}
});

var Banner = mongoose.model('banner', Scheam);
module.exports = Banner;