var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
var DBSuper = require("./super");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 title:{type: 'string'},
	 caption:{type: 'string'},
	 headLine: String,
	 description:{type: 'string'},
	 apply:{type: Boolean, default: false},
	 createdTime: { type: String, default: Utils.time.get() },
	 updateTime: {type: String, default:  Utils.time.get()},
	 createdAt: {type: Date, default: Date.now},
	 updateAt: {type: Date,  default: Date.now},
});
Scheam.plugin(DBSuper.regFind);
Scheam.pre('save', function(next) {
	var now = new Date();
  	this.updateAt = now;
  	next();
});

var Intro = mongoose.model('intro', Scheam);
module.exports = Intro;