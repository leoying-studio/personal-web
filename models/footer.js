const mongoose=require('../db').mongoose;
const Utils = require("./../utils/index");
// 定义映射的集合结构模型
let Scheam = new mongoose.Schema({
	 background: String,
	 descrption: {type: 'string'},
	 createdTime: { type: String, default: Utils.time.get() },
	 updateTime: {type: String, default: Utils.time.get()},
	 createdAt: {type: Date, default: Date.now},
	 updateAt: {type: Date,  default: Date.now},
});


let footer = mongoose.model('footer', Scheam);
module.exports = footer;