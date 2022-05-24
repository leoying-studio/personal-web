import mongoose from 'mongoose'

const BelongedSchema = new mongoose.Schema({
	cateId:  mongoose.Schema.Types.ObjectId
}, {
	id: false
})

// 定义映射的集合结构模型
const Scheam = new mongoose.Schema({
	title: String,
	description: String,
	// 配图, 说明图
	illustration: String,
	createdAt: {type: Date, default: Date.now},
	updateAt: {type: Date,  default: Date.now},
	// 所属分类
	belonged: [BelongedSchema],
	categories: [
		{
			type: mongoose.Schema.Types.ObjectId, 
			required: true, 
			ref: 'categories'
		}
	],
	// 是否作为推荐
	recommend: {type: Boolean, default: false},
	// 首页推荐图
	recommendPicture: String,
	// 文章内容
	content: String
}, {
	timestamps: {createdAt: 'createdAt', updatedAt: 'updateAt'}
});

// 分页查询
Scheam.static.findById = function(id) {
	return this.findById(id).populate("categories").exec()
} 

Scheam.static.query = function(conditions = {}, pageSize = 10, pageNo = 1) {
	return this.find(conditions).skip(pageSize * pageNo).limit(pageSize).sort({
		_id: -1
	}).exec()
} 

Scheam.static.update = function(data) {
    return this.findByIdAndUpdate(id, {
		$set: data	
	}).exec()
} 

Scheam.static.pullSub = function(id, cateId) {
	return this.update({_id: id}, {$pull: {"belonged": {cateId}}});
} 

Scheam.static.pushSub = function(id, cateId) {
	return this.update({_id: id}, {$pull: {"belonged": {cateId}}});
} 

let Articles = mongoose.model('articles', Scheam);

module.exports = Articles;