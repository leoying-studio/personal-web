var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 background: String,
	 descrption: {type: 'string'},
	 createdTime: { type: String, default: Utils.time.get() },
	 updateTime: {type: String, default: Utils.time.get()},
	 createdAt: {type: Date, default: Date.now},
	 updateAt: {type: Date,  default: Date.now},
});

Scheam.set('toJSON', { getters: true, virtuals: false });
var Footer = mongoose.model('footer', Scheam);
module.exports = Footer;