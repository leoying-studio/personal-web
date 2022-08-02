import mongoose from 'mongoose';
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

export const CateModal = mongoose.model('categories', CateSchema);


/**
 * 业务量比较少直接写里面就可以, 否则建议使用loadClass
 */
export class CateModalAccess {

	//删除当前文档
	static removeById = function(id) {
		return CateModal.findByIdAndRemove(id)
	}

	// 查找所有的数据
	static all = function() {
		const query =  CateModal.find({})
		return query.exec()
	}

	static findByIdAndUpdate = function(id, data) {
		return CateModal.findByIdAndUpdate(id, {
			$set: data	
		}).exec()
	}
}

