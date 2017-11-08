var mongoose=require('../db').mongoose;

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 background: string,
	 title: string,
	 descrption: string
});

var Footer = mongoose.model('footer', Scheam);
module.exports = Footer;