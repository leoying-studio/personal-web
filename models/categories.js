const mongoose=require('../db').mongoose;
const Utils = require("./../utils/index");
// 定义映射的集合结构模型
const Scheam = new mongoose.Schema({
	 // 一级分类名称
	 name: String,
	 // 二级分类
	 subcategories: [
		 {name: String}
	 ],
	 createdTime: { type: String, default: Utils.time.get() },
	 updateTime: {type: String, default:  Utils.time.get()},
	 createdAt: {type: Date, default: Date.now},
	 updateAt: {type: Date,  default: Date.now},
});


let Categories = mongoose.model('categories', Scheam);

module.exports = Categories;