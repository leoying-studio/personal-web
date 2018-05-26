var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 name: String,
	 children: [
		 {name: String}
	 ],
	 createdTime: { type: String, default: Utils.time.get() },
	 updateTime: {type: String, default:  Utils.time.get()},
	 createdAt: {type: Date, default: Utils.time.difference()},
	 updateAt: {type: Date,  default: Utils.time.difference()},
});

Scheam.set('toJSON', { getters: true, virtuals: false });

Scheam.pre('save', function(next) {
	var now = new Date();
  	this.updateAt = now;
  	next();
});

var Nav = mongoose.model('categories', Scheam);
module.exports = Nav;