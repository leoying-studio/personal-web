var mongoose=require('../db').mongoose;
var Utils = require("./../utils/index");
var detailSchema = new mongoose.Schema({
	 title: String,
	 navId: String,
	 categoriesId: [
		 {id: {type: 'string'}}
	 ],
	 articleId: String,
	 content: String,
	 comment: [
		 {username: {type: String}, publishTime: {type: String, default: Utils.getTime(new Date(), "s")}, content: {type: String}}
	 ],
	 serverTime: { type: String, default: Utils.getTime(new Date(), "s")}
});
var AticleDetail = mongoose.model('article_detail', detailSchema);
module.exports = AticleDetail;