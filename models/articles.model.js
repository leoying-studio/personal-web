import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// 定义映射的集合结构模型
const ArticleScheam = new Schema({
	title: String,
	description: String,
	// 配图, 说明图
	illustration: {type: String, default: ""},
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
	content: {
		type: String,
		required: true
	}
}, {
	timestamps: {createdAt: 'createdAt', updatedAt: 'updateAt'}
});

// 分页查询
ArticleScheam.statics.$findByIdAndPopulate = function(id) {
	return this.findById(id).populate("categories").exec()
} 

ArticleScheam.statics.$skip= function(conditions = {},  pageNo = 0, pageSize = 10) {
	return this.find(conditions).skip(pageNo * pageSize).limit(pageSize).sort({
		_id: -1
	}).exec()
} 

ArticleScheam.statics.$findOne = function(id) {
    return this.findOne({_id: id}).exec()
} 

ArticleScheam.statics.$findByIdAndUpdate = function(id, data) {
    return this.findByIdAndUpdate(id, {
		$set: data	
	}).exec()
} 

ArticleScheam.statics.$pullSub = function(id, cateId) {
	return this.findByIdAndUpdate({_id: id, 'categories._id': cateId}, {$pull: {categories: {
		_id: cateId
	}}});
} 

ArticleScheam.statics.$pushSub = async function(id, cateId) {
	return this.findByIdAndUpdate({_id: id}, {
		$push: {
			categories: new ObjectId(cateId)
		}
	});
} 

ArticleScheam.statics.$remove = function(id, data) {
	return this.findByIdAndRemove(id)
}

ArticleScheam.statics.$findRecommend = function() {
	return this.find({
		recommend: true
	})
}

ArticleScheam.statics.$limit3 = function() {
	return this.find({}).limit(3).exec()
}

ArticleScheam.pre('update', function() {
	this.update({},{ $set: { updatedAt: new Date() } });
})

ArticleScheam.statics.$pagingQuery = function(pageNo = 0, pageSize = 9) {
	return this.aggregate([
		{
			$facet: {
				"count": [
					{
						"$count": "total"
					}
				],
				data: [
					{"$skip":pageNo * pageSize},
					{"$limit":pageSize},
					{"$sort": {
						_id: -1
					}}
				]
			}
		}
	]).then((res) => {
		const {count, data} = res[0] || {};
		return {
			data,
			count: count[0].total
		}
	})
}

const Articles = mongoose.model('articles', ArticleScheam);

export default Articles;