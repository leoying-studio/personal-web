var mongoose=require('../db').mongoose;

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	 title: "",
	 publishTime: string,
	 videoUrl: string,
	 videoThumbnail: string,
	 img: "",
	 text: "",
	 categoryId: [
		 {id: string}
	 ]
});
var Content = mongoose.model('Content', Scheam);
module.exports = Content;