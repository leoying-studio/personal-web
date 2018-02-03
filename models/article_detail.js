var mongoose=require('../db').mongoose;
var DBSuper = require('./super');
var Utils = require("./../utils/index");
var Schema = new mongoose.Schema({
	 title: String,
	//  navId: String,
	//  categoriesId: [
	// 	 {id: {type: 'string'}}
	//  ],
	 articleId: String,
	 content: String,
	 serverTime: { type: String, default: Utils.getTime(new Date(), "s")}
});

Schema.plugin(DBSuper.regNav);



var AticleDetail = mongoose.model('article_detail', Schema);
module.exports = AticleDetail;