let mongoose=require('../db').mongoose;
let Utils = require("./../utils/index");
// 定义映射的集合结构模型
let Scheam = new mongoose.Schema({
	 title:{type: 'string'},
	 caption:{type: 'string'},
	 descrption:{type: 'string'},
	 backTitle: {type: 'string'},
	 backgrounds: [{background:{type: 'string'}}],
	 serverTime: { type: String, default: Utils.getTime(new Date(), "s")}
});

let Intro = mongoose.model('intro', Scheam);
module.exports = Intro;