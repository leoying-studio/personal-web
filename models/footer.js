var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 background: {type: 'string'},
	 title: {type: 'string'},
	 descrption: {type: 'string'},
	 createdTime: { type: String, default: Utils.getTime(new Date(), "s")},
	 createdAt: {default: new Date(), type: Date}
});

var Footer = mongoose.model('footer', Scheam);
module.exports = Footer;