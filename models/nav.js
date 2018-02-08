var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 name: String,
	 categories: [
		 {name: String}
	 ],
	 serverTime: { type: String, default: Utils.getTime(new Date(), "s")}
});

Scheam.set('toJSON', { getters: true, virtuals: false });

var Nav = mongoose.model('Nav', Scheam);
module.exports = Nav;