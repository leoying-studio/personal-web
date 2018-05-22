var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
var DBSuper = require("./super");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 headline: String,
	 homeFigure: String,
	 themes: [
		 {presentation: String, photo: String}
	 ],
	 createdTime: { type: String, default: Utils.time.get() },
	 updateTime: {type: String, default:  Utils.time.get()},
	 createdAt: {type: Date, default: Date.now},
	 updateAt: {type: Date,  default: Date.now},
});

Scheam.plugin(DBSuper.regNav);
Scheam.plugin(DBSuper.regFind);
Scheam.pre('save', function(next) {
	var now = new Date();
  	this.updateAt = now;
  	next();
});

var User = mongoose.model('special ', Scheam);

module.exports = User;