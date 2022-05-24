import mongoose from 'mongoose'
// 定义映射的集合结构模型
const Scheam = new mongoose.Schema({
	title: String,
	description: String,
	// 配图, 说明图
	illustration: String,
	createdAt: {type: Date, default: Date.now},
	updateAt: {type: Date,  default: Date.now},
	// 所属分类
	belonged: [
		mongoose.Schema.Types.ObjectId,
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

Scheam.static.setId = function(data) {
    return this.findByIdAndUpdate(id, {
		$set: data	
	}).exec()
} 

let Articles = mongoose.model('articles', Scheam);

module.exports = Articles;