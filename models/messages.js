var mongoose = require('../db').mongoose;
var Utils = require("./../utils/index");
var Super = require("./super");

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 username:{type: String},
	 message: String,
	 email: {type: String},
	 createdTime: { type: String, default: Utils.time.get() },
	 updateTime: {type: String, default:  Utils.time.get()},
	 createdAt: {type: Date, default: Date.now},
	 updateAt: {type: Date,  default: Date.now},
});

Scheam.plugin(Super.getCategories);
Scheam.set('toJSON', { getters: true, virtuals: false });
Scheam.pre('save', function(next) {
	var now = new Date();
  	this.updateAt = now;
  	next();
});

var Messages = mongoose.model('messages', Scheam);

module.exports = Messages;