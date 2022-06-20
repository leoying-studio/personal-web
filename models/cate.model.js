const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// 定义映射的集合结构模型
const CateSchema = new Schema({
	 // 分类名称
	 label: {
		required: true,
		type: String
	 },
	 value: {
		required: false,
		type: String,
	 },
	 parentId: {
		 type: ObjectId,
		 default: null
	 },
	 createdAt: {type: Date, default: Date.now},
	 updateAt: {type: Date,  default:  Date.now},
});

/**
 * 业务量比较少直接写里面就可以, 否则建议使用loadClass
 */

//删除当前文档
CateSchema.statics.removeById = function(id) {
	return this.findByIdAndRemove(id)
}

// 查找所有的数据
CateSchema.statics.all = function() {
	const query =  this.find({})
	return query.exec()
}

CateSchema.statics.$findByIdAndUpdate = function(id, data) {
	return this.findByIdAndUpdate(id, {
		$set: data	
	}).exec()
}

const Categories = mongoose.model('categories', CateSchema);

export default Categories