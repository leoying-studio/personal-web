import mongoose from 'mongoose'
const ObjectId = Schema.Types.ObjectId;
// 定义映射的集合结构模型
const Scheam = new mongoose.Schema({
	title: String,
	description: String,
	// 配图, 说明图
	illustration: String,
	createdAt: {type: Date, default: Date.now},
	updateAt: {type: Date,  default: Date.now},
	// 所属分类
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
Scheam.static.findByIdAndPopulate = function(id) {
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
	return this.findByIdAndUpdate({_id: id, 'categories._id': cateId}, {$pull: {categories: {
		_id: cateId
	}}});
} 

Scheam.static.pushSub = async function(id, cateId) {
	return this.findByIdAndUpdate({_id: id}, {
		$push: {
			categories: new ObjectId(cateId)
		}
	});
} 

CateSchema.statics.remove = function(id, data) {
	return this.findByIdAndRemove(id)
}

const Articles = mongoose.model('articles', Scheam);

export default Articles;