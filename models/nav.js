let mongoose=require('../db').mongoose;
let Utils = require("./../utils/index");
// 定义映射的集合结构模型
let Scheam = new mongoose.Schema({
	 name: String,
	 categories: [
		 {
			 _id: {type: 'string'},
			 name: {type: 'string'},
		 }
	 ],
	 serverTime: { type: String, default: Utils.getTime(new Date(), "s")}
});

let Nav = mongoose.model('Nav', Scheam);
module.exports = Nav;