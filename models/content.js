var mongoose=require('../db').mongoose;
let Utils = require("./../utils/index");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 title: "",
	 publishTime: {type: 'string'},
	 videoUrl: {type: 'string'},
	 videoThumbnail: {type: 'string'},
	 img: {type: 'string'},
	 text: {type: 'string'},
	 categoryId: [
		 {id: {type: 'string'}}
	 ],
	 serverTime: { type: String, default: Utils.getTime(new Date(), "s")}
});
var Content = mongoose.model('Content', Scheam);
module.exports = Content;