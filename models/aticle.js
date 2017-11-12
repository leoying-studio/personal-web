var mongoose=require('../db').mongoose;
let Utils = require("./../utils/index");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 title: String,
	 description: String,
	 img: {type: 'string'},
	 navId: String,
	 categoriesId: [
		 {id: {type: 'string'}}
	 ],
	 serverTime: { type: String, default: Utils.getTime(new Date(), "s")}
});
var Aticle = mongoose.model('acticle', Scheam);
module.exports = Aticle;

